## Continuous Query Cache

<font color="#3981DB">**Hazelcast Enterprise**</font>

<br></br>

A continuous query cache is used to cache the result of a continuous query. After the construction of a continuous query cache, all changes on the underlying `IMap` are immediately reflected to this cache as a stream of events. Therefore, this cache will be an always up-to-date view of the `IMap`. You can create a continuous query cache either on the client or member.

### Keeping Query Results Local and Ready

A continuous query cache is beneficial when you need to query the distributed `IMap` data in a very frequent and fast way. By using a continuous query cache, the result of the query will always be ready and local to the application.

### Accessing Continuous Query from Member

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

### Accessing Continuous Query from Client Side

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

### Features of Continuous Query

The following features of continuous query cache are valid for both the member and client.

* The initial query that is run on the existing `IMap` data during the continuous query cache construction can be enabled/disabled according to the supplied predicate via `QueryCacheConfig#setPopulate`.
* Continuous query cache allows you to run queries with indexes, and perform event batching and coalescing.
* A continuous query cache is evictable. Note that a continuous query cache has a default maximum capacity of 10000. If you need a non-evictable cache, you should configure the eviction via `QueryCacheConfig#setEvictionConfig`.
* A listener can be added to a continuous query cache using `QueryCache#addEntryListener`.
* `IMap` events are reflected in continuous query cache in the same order as they were generated on map entries. Since events are created on entries stored in partitions, ordering of events is maintained based on the ordering within the partition. You can add listeners to capture lost events using `EventLostListener` and you can recover lost events with the method `QueryCache#tryRecover`.
Recovery of lost events largely depends on the size of the buffer on Hazelcast members. Default buffer size is 16 per partition; i.e. 16 events per partition can be maintained in the buffer. If the event generation is high, setting the buffer size to a higher number will provide better chances of recovering lost events. You can set buffer size with `QueryCacheConfig#setBufferSize`.
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
   
* You can configure continuous query cache declaratively or programmatically.
* You can populate a continuous query cache with only the keys of its entries and retrieve the subsequent values directly via `QueryCache#get` from the underlying `IMap`. This helps to decrease the initial population time when the values are very large.
<br></br>





