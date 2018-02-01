
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


#### Query Requests from Clients

When dealing with the query requests coming from the clients to your members, Hazelcast offers the following system properties to tune your thread pools:

- `hazelcast.clientengine.thread.count` which is the number of threads to process non-partition-aware client requests, like `map.size()` and executor tasks. Its default value is the number of cores multiplied by 20.
- `hazelcast.clientengine.query.thread.count` which is the number of threads to process query requests coming from the clients. Its default value is the number of cores.

If there are a lot of query request from the clients, you may want to increase the value of `hazelcast.clientengine.query.thread.count`. In addition to this tuning, you may also consider increasing the value of `hazelcast.clientengine.thread.count` if the CPU load in your system is not high and there is plenty of free memory.