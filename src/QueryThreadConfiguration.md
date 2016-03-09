
### Configuring Query Thread Pool

You can change the size of thread pool dedicated to query operations using the `pool-size` property. Each query consumes a single thread from a Generic Operations ThreadPool on each Hazelcast member - let's call it the query-orchestrating thread.  That thread is blocked throughout the whole execution-span of a query on the member.

The query-orchestrating thread will use the threads from the query-thread pool in two cases:

- if you run a `PagingPredicate` - since each page is run as a separate task,
- if you set the system property `hazelcast.query.predicate.parallel.evaluation` to true - since the predicates are evaluated in parallel.

Please see [Filtering with Paging Predicates](#filtering-with-paging-predicates) and [System Properties](#system-properties) sections for information on paging predicates and for description of the above system property.


Below is an example of that declarative configuration.

```xml
<executor-service name="hz:query">
  <pool-size>100</pool-size>
</executor-service>
```

Below is the equivalent programmatic configuration.

```java
Config cfg = new Config();
cfg.getExecutorConfig("hz:query").setPoolSize(100);
```
