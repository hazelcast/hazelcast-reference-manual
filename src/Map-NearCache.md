

### Creating Near Cache for Map

Map entries in Hazelcast are partitioned across the cluster. Imagine that you are reading the key `k` so many times and `k` is owned by another member in your cluster. Each `map.get(k)` will be a remote operation, meaning lots of network trips. If you have a map that is read-mostly, then you should consider creating a near cache for the map so that reads can be much faster and consume less network traffic. All these benefits do not come free. When using near cache, you should consider the following issues:

- Cluster members will have to hold extra cached data, which increases memory consumption.
- If invalidation is turned on and entries are updated frequently, then invalidations will be costly.
- Near cache breaks the strong consistency guarantees; you might be reading stale data.

Near cache is highly recommended for the maps that are read-mostly. Here is a near cache configuration for a map:

```xml
<hazelcast>
  ...
  <map name="my-read-mostly-map">
    ...
    <near-cache>

      <!--
         Storage type of near cache entries. Available values are BINARY, OBJECT and NATIVE.
         NATIVE is available only for Hazelcast Enterprise. Default value is BINARY.
      -->
       <in-memory-format>BINARY</in-memory-format>

      <!--
        Maximum size of the near cache. When max-size is reached,
        cache is evicted based on the policy defined.
        Any integer between 0 and Integer.MAX_VALUE. 0 means
        Integer.MAX_VALUE. Default is 0.
      -->
      <max-size>5000</max-size>
      
      <!--
        Maximum number of seconds for each entry to stay in the near cache. Entries that are
        older than this period is automatically evicted from the near cache.
        Any integer between 0 and Integer.MAX_VALUE. 0 means infinite. Default is 0.
      -->
      <time-to-live-seconds>0</time-to-live-seconds>

      <!--
        Maximum number of seconds each entry can stay in the near cache as untouched (not read).
        Entries that are not read more than this period is removed
        from the near cache.
        Any integer between 0 and Integer.MAX_VALUE. 0 means
        Integer.MAX_VALUE. Default is 0.
      -->
      <max-idle-seconds>60</max-idle-seconds>

      <!--
        Valid values are:
        NONE (no extra eviction, <time-to-live-seconds> may still apply),
        LRU  (Least Recently Used),
        LFU  (Least Frequently Used).
        NONE is the default.
        Regardless of the eviction policy used, <time-to-live-seconds> will still apply.
      -->
      <eviction-policy>LRU</eviction-policy>

      <!--
        Should the cached entries are evicted if the entries are updated or removed.
        Values can be true of false. Default is true.
      -->
      <invalidate-on-change>true</invalidate-on-change>

      <!--
        You may also want local entries to be cached.
        This is useful when in memory format for near cache is different from
        the map's near cache.
        By default it is disabled (false).
      -->
      <cache-local-entries>false</cache-local-entries>

      <!--
        Note that you have to use this eviction config with NATIVE memory format.
      -->
       <eviction size="1000" max-size-policy="ENTRY_COUNT" eviction-policy="LFU"/>
    </near-cache>
  </map>
</hazelcast>
```


Programmatically, near cache configuration is done by using the class <a href="https://github.com/hazelcast/hazelcast/blob/master/hazelcast/src/main/java/com/hazelcast/config/NearCacheConfig.java" target="_blank">NearCacheConfig</a>. And this class is used both in the cluster members and clients. In a client/server system, you must enable the near cache separately on the client, without needing to configure it on the member. For information on how to create a near cache on a client (native Java client), please see [Configuring Client Near Cache](#configuring-client-near-cache). Please note that near cache configuration is specific to the member or client itself, a map in a member may not have near cache configured while the same map in a client may have near cache configured.

If you are using near cache, you should take into account that your hits to the keys in near cache are not reflected as hits to the original keys on the remote members; this has an impact on IMap's maximum idle seconds or time-to-live seconds expiration. Therefore, even though there is a hit on a key in near cache, your original key on the remote member may expire.

![image](images/NoteSmall.jpg) ***NOTE:*** *Near cache works only when you access data via `map.get(k)` methods.  Data returned using a predicate is not stored in the near cache.*

![image](images/NoteSmall.jpg) ***NOTE:*** *Even though lite members do not store any data for Hazelcast data structures, you can enable near cache on lite members for faster reads.*


#### Near Cache Invalidation

When you enable invalidations on near cache either by programmatically via `NearCacheConfig#setInvalidateOnChange` or by declaratively via `<invalidate-on-change>true</invalidate-on-change>`, upon updating or removing an entry from the underlying IMap, corresponding entries are removed from near caches to prevent stale reads.
This is called near cache invalidation. 

Invalidation can be sent from members to client near caches or member near caches either individually or in batches.
Default behavior is sending in batches. If there are lots of mutating operations such as put/remove on IMap, making invalidations in batches is advised.
This reduces the network traffic and keeps the eventing system less busy.

You can use the following system properties to configure the near cache invalidation :

- `hazelcast.map.invalidation.batch.enabled`: Enable or disable batching. Default value is true. When it is set to false, all invalidations are sent immediately.
- `hazelcast.map.invalidation.batch.size`: Maximum number of invalidations in a batch. Default value is 100.
- `hazelcast.map.invalidation.batchfrequency.seconds`: If we cannot reach the configured batch size, a background process sends invalidations periodically. Default value is 10 seconds.

If there are a lot of clients or so many mutating operations, batching should remain enabled and the batch size should be configured with the `hazelcast.map.invalidation.batch.size` system property to a suitable value.

#### Using High-Density Memory Store with Near Cache

<font color="##153F75">**Hazelcast Enterprise HD**</font>
<br></br>

Hazelcast offers High-Density Memory Store for the near caches in your maps. You can enable your near cache to use the High-Density Memory Store by simply setting the in-memory format to `NATIVE`. The following snippet is the declarative configuration example.


```xml
<hazelcast>
  ...
  <map name="my-read-mostly-map">
    ...
    <near-cache>
       ...
       <in-memory-format>NATIVE</in-memory-format>
       ...
    </near-cache>
    ...  
  </map>
</hazelcast>  
```

Keep in mind that you should have already enabled the High-Density Memory Store usage for your cluster. Please see the [Configuring High-Density Memory Store section](#configuring-high-density-memory-store).

Note that a map and its near cache can independently use High-Density Memory Store. For example, while your map does not use High-Density Memory Store, its near cache can use it.

