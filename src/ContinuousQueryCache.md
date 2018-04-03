## Continuous Query Cache

A continuous query cache is used to cache the result of a continuous query. After the construction of a continuous query cache, all changes on the underlying `IMap` are immediately reflected to this cache as a stream of events. Therefore, this cache will be an always up-to-date view of the `IMap`. You can create a continuous query cache either on the client or member.

### Keeping Query Results Local and Ready

A continuous query cache is beneficial when you need to query the distributed `IMap` data in a very frequent and fast way. By using a continuous query cache, the result of the query will always be ready and local to the application.

### Accessing Continuous Query Cache from Member

The following code snippet shows how you can access a continuous query cache from a member.
     
```java
QueryCacheConfig queryCacheConfig = new QueryCacheConfig("cache-name");
queryCacheConfig.getPredicateConfig().setImplementation(new OddKeysPredicate());
       
MapConfig mapConfig = new MapConfig("map-name");
mapConfig.addQueryCacheConfig(queryCacheConfig);
       
Config config = new Config();
config.addMapConfig(mapConfig);
      
HazelcastInstance node = Hazelcast.newHazelcastInstance(config);
IEnterpriseMap<Integer, String> map = (IEnterpriseMap) node.getMap("map-name");
       
QueryCache<Integer, String> cache = map.getQueryCache("cache-name");
```     

### Accessing Continuous Query Cache from Client Side

The following code snippet shows how you can access a continuous query cache from the client side.
The difference in this code from the member side code above is that you configure and instantiate
a client instance instead of a member instance.

     
```java
QueryCacheConfig queryCacheConfig = new QueryCacheConfig("cache-name");
queryCacheConfig.getPredicateConfig().setImplementation(new OddKeysPredicate());
       
ClientConfig clientConfig = new ClientConfig();
clientConfig.addQueryCacheConfig("map-name", queryCacheConfig);
      
HazelcastInstance client = HazelcastClient.newHazelcastClient(clientConfig);
IEnterpriseMap<Integer, Integer> clientMap = (IEnterpriseMap) client.getMap("map-name");
       
QueryCache<Integer, Integer> cache = clientMap.getQueryCache("cache-name");
```

### Features of Continuous Query Cache

The following features of continuous query cache are valid for both the member and client.

* The initial query that is run on the existing `IMap` data during the continuous query cache construction can be enabled/disabled according to the supplied predicate via `QueryCacheConfig.setPopulate()`.
* Continuous query cache allows you to run queries with indexes, and perform event batching and coalescing.
* A continuous query cache is evictable. Note that a continuous query cache has a default maximum capacity of 10000. If you need a non-evictable cache, you should configure the eviction via `QueryCacheConfig.setEvictionConfig()`.
* A listener can be added to a continuous query cache using `QueryCache.addEntryListener()`.
* `IMap` events are reflected in continuous query cache in the same order as they were generated on map entries. Since events are created on entries stored in partitions, ordering of events is maintained based on the ordering within the partition. You can add listeners to capture lost events using `EventLostListener` and you can recover lost events with the method `QueryCache.tryRecover()`.
Recovery of lost events largely depends on the size of the buffer on Hazelcast members. Default buffer size is 16 per partition; i.e. 16 events per partition can be maintained in the buffer. If the event generation is high, setting the buffer size to a higher number will provide better chances of recovering lost events. You can set buffer size with `QueryCacheConfig.setBufferSize()`.
You can use the following example code for a recovery case.

    ```java
       
    QueryCache queryCache = map.getQueryCache("cache-name", new SqlPredicate("this > 20"), true);
    queryCache.addEntryListener(new EventLostListener() {
        @Override
        public void eventLost(EventLostEvent event) {
            queryCache.tryRecover();
        }
    }, false);
    ```
   
* You can populate a continuous query cache with only the keys of its entries and retrieve the subsequent values directly via `QueryCache.get()` from the underlying `IMap`. This helps to decrease the initial population time when the values are very large.

### Configuring Continuous Query Cache

You can configure continuous query cache declaratively or programmatically; the latter is mostly explained in the previous section. The parent configuration element is `<query-caches>` which should be placed within your `<map>` configuration. You can create your query caches using the  `<query-cache>` sub-element under `<query-caches>`.

The following is an example declarative configuration.


```
<map>
   <query-caches>
      <query-cache name="myContQueryCache">
         <include-value>true</include-value>
         <predicate type="class-name">com.hazelcast.examples.ExamplePredicate</predicate>
         <entry-listeners>
            <entry-listener>...</entry-listener>
         </entry-listeners>
         <in-memory-format>BINARY</in-memory-format>
         <populate>true</populate>
		  <coalesce>false</coalesce>
		  <batch-size>2</batch-size>
		  <delay-seconds>3</delay-seconds>
		  <buffer-size>32</buffer-size>
		  <eviction size="1000" max-size-policy="ENTRY_COUNT" eviction-policy="LFU"/>
		  <indexes>
			 <index ordered="true">...</index>
		  </indexes>
	   </query-cache>
    </query-caches>
</map>
```

Here are the descriptions of configuration elements and attributes:

* `name`: Name of your continuous query cache.
* `<include-value>`: Specifies whether the value will be cached too. Its default value is true.
* `<predicate>`: Predicate to filter events which will be applied to the query cache.
* `<entry-listeners>`: Adds listeners (listener classes) for your query cache entries. Please see the [Registering Map Listeners section](#registering-map-listeners).
* `<in-memory-format>`: Type of the data to be stored in your query cache. Please see the [Setting In-Memory Format section](#setting-in-memory-format). Its default value is BINARY.
* `<populate>`: Specifies whether the initial population of your query cache is enabled. Its default value is true.
* `<coalesce>`: Specifies whether the coalescing of your query cache is enabled. Its default value is false.
* `<delay-seconds>`: Minimum time in seconds that an event waits in the member's buffer. Its default value is 0.
* `<batch-size>`: Batch size used to determine the number of events sent in a batch to your query cache. Its default value is 1.
* `<buffer-size>`: Maximum number of events which can be stored in a partition buffer. Its default value is 16.
* `<eviction>`: Configuration for the eviction of your query cache. Please see the [Configuring Map Eviction section](#configuring-map-eviction).
* `<indexes>`: Indexes for your query cache defined by using this element's `<index>` sub-elements. Please see the [Configuring IMap Indexes section](#configuring-imap-indexes).

Please take the following configuration considerations and publishing logic into account:

If  `<delay-seconds>` is equal to or smaller than **0**, then `<batch-size>` loses its function. Each time there is an event, all the entries in the buffer are pushed to the subscriber.

If `<delay-seconds>` is bigger than **0**, the following logic applies:

* If `<coalesce>` is set to **true**, the buffer is checked for an event with the same key; if so, it is overridden by the current event. Then:
 * The current size of the buffer is checked: if the current size of the buffer is equal to or larger than `<batch-size>`, then the events counted as much as the `<batch-size>` are pushed to the subscriber. Otherwise, no events are sent.
 * After finishing with checking `<batch-size>`, the `<delay-seconds>` is checked. The buffer is scanned from the oldest to youngest entries; all the entries that are older than `<delay-seconds>` are pushed to the subscriber.

