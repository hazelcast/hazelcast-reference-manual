

### MapReduce Deprecation

This section informs Hazelcast users about the MapReduce deprecation, it's motivation and replacements.


#### Motivation

We've decided to deprecate the MapReduce framework in Hazelcast IMDG 3.8. The MapReduce framework provided the distributed computing model and it was used to back the old Aggregations system. Unfortunately the implementation didn't live up to the expectations and adoption wasn't high, so it never got out of Beta status. Apart from that the current shift in development away from M/R-like processing to a more near-realtime, streaming approach left us with the decision to deprecate and finally remove the MapReduce framework from Hazelcast IMDG. With that said, we want to introduce the successors and replacements; Fast Aggregations on top of Query infrastructure and the Hazelcast Jet distributed computing platform.

#### Built-In Aggregations

MapReduce is a very powerful tool, however it's demanding in terms of space, time and bandwidth. We realized that we don't need so much power when we simply want to find out a simple metric such as the number of entries matching a predicate. Therefore, the built-in aggregations were rebuilt on top of the existing Query infrastructure (count, sum, min, max, mean, variance) which automatically leverages any matching query index. The aggregations are computed in tho phases:

- 1st phase: on each member (scatter)
- 2nd phase: one member aggregates responses from members (gather)

It is not as flexible as a full-blown M/R system due to the 2nd phase being single-member, and the input can be massive in some use cases. The member doing the 2nd step needs enough capacity to hold all intermediate results from all members from the 1st step, but in practice it is sufficient for many aggregation tasks like "find average" or "find highest" and other common examples.

The benefits are:

- Improved performance
- Simplified API 
- Utilization of existing indexes


You can refer to [Fast Aggregations](#fast-aggregations) for examples. If you need a more powerful tool like MapReduce, then there is Hazelcast Jet!

#### Distributed Computation with Jet

Hazelcast Jet is the new distributed computing framework build on top of Hazelcast IMDG. It uses directed acyclic graphs (DAG) to model relationships between individual steps in the data processing pipeline. 
Conceptually speaking, the MapReduce model simply states that distributed computation on a large dataset can be boiled down to two kinds of computation steps - a map step and a reduce step. One pair of map and reduce does one level of aggregation over data. Complex computations typically require multiple such steps. Multiple M/R-steps essentially form a DAG of operations, so that a DAG execution model boils down to a generalization of the MapReduce model.
Therefore it is always possible to rewrite a MapReduce application to Hazelcast Jet DAG or "pipeline of tasks" without conceptual changes.

Benefits:

- M/R steps are completely isolated (by definition). With the whole computation modeled as a DAG, the Jet scheduler can optimize the operation pipeline
- Hazelcast Jet provides a convenient high-level API (distributed j.u.stream). The code stays compact but also offers a more concrete API to leverage the full power of DAGs. 

##### Moving MapReduce Tasks to Hazelcast Jet


We'll use the example of the "word count" application which summarizes a set of documents into a mapping from each word to the total number of its occurrences in the documents. This involves both a mapping stage where one document is transformed into a stream of words and a reducing stage that performs a COUNT DISTINCT operation on the stream and populates a Hazelcast IMap with the results.

This is the word count code in MapReduce (also available on [hazlcast-jet-code-samples](https://github.com/hazelcast/hazelcast-jet-code-samples/blob/master/core/mapreduce-migration/src/main/java/WordCountCoreApi.java)):

```java
JobTracker t = hz.getJobTracker("word-count");
IMap<Long, String> documents = hz.getMap("documents");
LongSumAggregation<String, String> aggr = new LongSumAggregation<>();
Map<String, Long> counts =
        t.newJob(KeyValueSource.fromMap(documents))
         .mapper((Long x, String document, Context<String, Long> ctx) ->
                 Stream.of(document.toLowerCase().split("\\W+"))
                       .filter(w -> !w.isEmpty())
                       .forEach(w -> ctx.emit(w, 1L)))
         .combiner(aggr.getCombinerFactory())
         .reducer(aggr.getReducerFactory())
         .submit()
         .get();
```

Jet's Core API is strictly lower-level than MapReduce's because it can be used to build the entire infrastructure that can drive MapReduce's mapper, combiner, and reducer, fully preserving the semantics of the MapReduce job. However, this approach to migrating your code to Jet is not a good option because the MapReduce API enforces a quite suboptimal computation model.
The simplest approach is implementing the job in terms of Jet's java.util.stream support (Jet JUS for short):

```java
IStreamMap<String, String> documents = jet.getMap("documents");
IMap<String, Long> counts = documents
        .stream()
        .flatMap(m -> Stream.of(m.getValue().toLowerCase().split("\\W+"))
                            .filter(w -> !w.isEmpty()))
        .collect(DistributedCollectors.toIMap(w -> w, w -> 1L, (left, right) -> left + right));
```

This can be taken as a general template to express a MapReduce job in terms of Jet JUS: the logic of the mapper is inside flatMap and the logic of both the combiner and the reducer is inside collect. Jet will automatically apply the optimization where the data stream is first "combined" locally on each member, then the partial results "reduced" in the final step, after sending across the network.

Keep in mind that MapReduce and java.util.stream use the same terminology, but with quite different meaning: in JUS the final step is called "combine" (MapReduce calls it "reduce") and the middle step is called "reduce" (MapReduce calls this one "combine"). MapReduce's "combine" collapses the stream in fixed-size batches, whereas in Jet JUS "reduce" collapses the complete local dataset and sends just a single item per distinct key to the final step. In Jet JUS, the final "combine" step combines just one partial result per member into the total result, whereas in MR the final step "reduces" all the one-per-batch items to the final result. Therefore, in Jet there are only O(distinct-key-count) items sent over the network whereas in MapReduce it is still O(total-item-count) with just a linear scaling factor equal to the configured batch size.

A complete example of the word count done with the Streams API can be found in the hazelcast-jet-code-samples 
repository, located in the "java.util.stream/wordcount-j.u.s" module in the file WordCount.java. A minor difference is that the code on GitHub stores the documents line by line, with the effect of a finer-grained distribution across the cluster.

To better understand how the JUS pipeline is executed by Jet, take a look at the file WordCount.java in the "core/wordcount" module, which builds the same DAG as the Jet JUS implementation, but using the Jet Core API. Here is a somewhat simplified DAG from this sample:

```java
DAG dag = new DAG();
Vertex source = dag.newVertex("source", Processors.readMap("documents"))
                   .localParallelism(1);
Vertex map = dag.newVertex("map", Processors.flatMap(
           (String document) -> traverseArray(document.split("\\W+"))));
Vertex reduce = dag.newVertex("reduce", Processors.groupAndAccumulate(
           () -> 0L, (count, x) -> count + 1));
Vertex combine = dag.newVertex("combine", Processors.groupAndAccumulate(
           Entry::getKey,
           () -> 0L,
           (Long count, Entry<String, Long> wordAndCount) ->
                     count + wordAndCount.getValue())
);
Vertex sink = dag.newVertex("sink", writeMap("counts"));
 
dag.edge(between(source, map))
   .edge(between(map, reduce).partitioned(wholeItem(), HASH_CODE))
   .edge(between(reduce, combine).partitioned(entryKey()).distributed())
   .edge(between(combine, sink));
```

It is a simple cascade of vertices: source -> map -> reduce -> combine -> sink and matches quite closely the workflow of a MapReduce job. On each member, a distinct slice of data (IMap partitions stored locally) is ingested by the source vertex and sent to map on the local member. The output of map are words and they travel over a partitioned edge to reduce. Note that, as opposed to MapReduce, a single instance of a processor doesn't count occurrences of just one word, but is responsible for entire partitions. There are only as many processors as configured by the localParallelism property. This is one of several examples where Jet's DAG exposes performance-critical attributes of the computation to the user.

Another example of this can be seen in arguments passed to partitioned(wholeItem(), HASH_CODE). The user has precise control over the partitioning key as well as the algorithm used to map the key to a partition ID. In this case we use the whole item (the word) as the key and apply the fast HASH_CODE strategy, which derives the partition ID from the object's hashCode().

The reduce → combine edge is both partitioned and distributed. Whereas each cluster member has its own reduce processor for any given word, there is only one combine processor in the entire cluster for a given word. This is where network traffic happens: reduce sends its local results for a word to that one combine processor in the cluster. Note that here we didn't specify HASH_CODE: it is not guaranteed to be safe on a distributed edge because on the target member the hashcode can come out differently. For many value classes (like String and Integer) it is guaranteed to work, though, because their hashCode  explicitly specifies the function used. By default Jet applies the slower but safer Hazelcast strategy: 1. serialize, 2. compute the MurmurHash3 of the resulting blob. It is up to the user to ensure that the faster strategy is safe, or to provide a custom strategy.

In the above example we can see many out-of-the-box processors being used:

- readMap to ingest the data from an IMap
- flatMap to perform a flat-map operation on incoming items (closely corresponds to MapReduce's mapper)
- groupAndAccumulate to perform the reduction and combining

There are some more in the Processors class.
For even more flexibility we'll now show how you can implement a processor on your own (also available in the Code Samples repository):

```java
public class MapReduce {
 
    public static void main(String[] args) throws Exception {
        Jet.newJetInstance();
        JetInstance jet = Jet.newJetInstance();
        try {
            DAG dag = new DAG();
            Vertex source = dag.newVertex("source", readMap("sourceMap"));
            Vertex map = dag.newVertex("map", MapP::new);
            Vertex reduce = dag.newVertex("reduce", ReduceP::new);
            Vertex combine = dag.newVertex("combine", CombineP::new);
            Vertex sink = dag.newVertex("sink", writeMap("sinkMap"));
            dag.edge(between(source, map))
               .edge(between(map, reduce).partitioned(wholeItem(), HASH_CODE))
               .edge(between(reduce, combine).partitioned(entryKey()).distributed())
               .edge(between(combine, sink.localParallelism(1)));
            jet.newJob(dag).execute().get();
        } finally {
            Jet.shutdownAll();
        }
    }
 
    private static class MapP extends AbstractProcessor {
        private final FlatMapper<Entry<Long, String>, String> flatMapper = flatMapper(
                (Entry<Long, String> e) -> new WordTraverser(e.getValue())
        );
 
        @Override
        protected boolean tryProcess0(@Nonnull Object item) {
            return flatMapper.tryProcess((Entry<Long, String>) item);
        }
    }
 
    private static class WordTraverser implements Traverser<String> {
 
        private final StringTokenizer tokenizer;
 
        WordTraverser(String document) {
            this.tokenizer = new StringTokenizer(document.toLowerCase());
        }
 
        @Override
        public String next() {
            return tokenizer.hasMoreTokens() ? tokenizer.nextToken() : null;
        }
    }
 
    private static class ReduceP extends AbstractProcessor {
        private final Map<String, Long> wordToCount = new HashMap<>();
        private final Traverser<Entry<String, Long>> resultTraverser =
                lazy(() -> traverseIterable(wordToCount.entrySet()));
 
        @Override
        protected boolean tryProcess0(@Nonnull Object item) {
            wordToCount.compute((String) item, (x, count) -> 1 + (count != null ? count : 0L));
            return true;
        }
 
        @Override
        public boolean complete() {
            return emitCooperatively(resultTraverser);
        }
    }
 
    private static class CombineP extends AbstractProcessor {
        private final Map<String, Long> wordToCount = new HashMap<>();
        private final Traverser<Entry<String, Long>> resultTraverser =
                lazy(() -> traverseIterable(wordToCount.entrySet()));
 
        @Override
        protected boolean tryProcess0(@Nonnull Object item) {
            final Entry<String, Long> e = (Entry<String, Long>) item;
            wordToCount.compute(e.getKey(),
                    (x, count) -> e.getValue() + (count != null ? count : 0L));
            return true;
        }
 
        @Override
        public boolean complete() {
            return emitCooperatively(resultTraverser);
        }
    }
}
```

One of the challenges of implementing a custom Processor is cooperativeness: it must back off as soon as there is no more room in the output buffer (the outbox). This example shows how to make use of another line of convenience provided at this lower level, which takes care of almost all the mechanics involved. One gotcha is that a simple for-loop must be converted to a stateful iterator-style object, like WordTraverser in the above code. To make this conversion as painless as possible we chose to not require a Java Iterator, but defined our own Traverser interface with just a single method to implement. This means that Traverser is a functional interface and can often be implemented with a one-liner lambda.

#### Jet Compared with New Aggregations

Hazelcast has native support for aggregation operations on the contents of its distributed data structures. They operate on the assumption that the aggregating function is commutative and associative, which allows the two-tiered approach where first the local data is aggregated, then all the local subresults sent to one member, where they are combined and returned to the user. This approach works quite well as long as the result is of manageable size. Many interesting aggregations produce an O(1) result and for those, the native aggregations are a good match.

The main area where native aggregations may not be sufficient are operations that group the data by key and produce results of size O(keyCount). The architecture of Hazelcast aggregations is not well adapted to this use case, although it will still work even for moderately-sized results (up to 100 MB, as a ballpark figure). Beyond these numbers, and whenever something more than a single aggregation step is needed, Jet becomes the preferred choice. In the mentioned use case Jet helps because it doesn't send entire hashtables in serialized form and materialize all the results on the user's machine, but rather streams the key-value pairs directly into a target IMap. Since it is a distributed structure, it doesn't focus its load on a single member.

Jet's DAG paradigm offers much more than the basic map-reduce-combine cascade. Among other setups it can compose several such cascades and also perform co-grouping, joining, and many other operations in complex combinations.
