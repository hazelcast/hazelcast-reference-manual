### ICache Configuration

As mentioned in the [JCache Declarative Configuration section](#jcache-declarative-configuration), the Hazelcast ICache extension offers
additional configuration properties over the default JCache configuration. These additional properties include internal storage format, backup counts, eviction policy and quorum reference.

The declarative configuration for ICache is a superset of the previously discussed JCache configuration:

```xml
<cache>
  <!-- ... default cache configuration goes here ... -->
  <backup-count>1</backup-count>
  <async-backup-count>1</async-backup-count>
  <in-memory-format>BINARY</in-memory-format>
  <eviction size="10000" max-size-policy="ENTRY_COUNT" eviction-policy="LRU" />
  <partition-lost-listeners>
     <partition-lost-listener>CachePartitionLostListenerImpl</partition-lost-listener>
 </partition-lost-listeners>
 <quorum-ref>quorum-name</quorum-ref>
</cache>
```

- `backup-count`: Number of synchronous backups. Those backups are executed before the mutating cache operation is finished. The mutating operation is blocked. `backup-count` default value is 1.
- `async-backup-count`: Number of asynchronous backups. Those backups are executed asynchronously so the mutating operation is not blocked and it will be done immediately. `async-backup-count` default value is 0.  
- `in-memory-format`: Internal storage format. For more information, please see the [In Memory Format section](#setting-in-memory-format). Default is `BINARY`.
- `eviction`: Defines the used eviction strategies and sizes for the cache. For more information on eviction, please see the [JCache Eviction](#jcache-eviction).
  - `size`: Maximum number of records or maximum size in bytes depending on the `max-size-policy` property. Size can be any integer between `0` and `Integer.MAX_VALUE`. Default max-size-policy is `ENTRY_COUNT` and default size is `10.000`.
  - `max-size-policy`: Maximum size. If maximum size is reached, the cache is evicted based on the eviction policy. Default max-size-policy is `ENTRY_COUNT` and default size is `10.000`. The following eviction policies are available:
    - `ENTRY_COUNT`: Maximum number of cache entries in the cache. **Available on heap based cache record store only.**
    - `USED_NATIVE_MEMORY_SIZE`: Maximum used native memory size in megabytes per cache for each Hazelcast instance. **Available on High-Density Memory cache record store only.**
    - `USED_NATIVE_MEMORY_PERCENTAGE`: Maximum used native memory size percentage per cache for each Hazelcast instance. **Available on High-Density Memory cache record store only.**
    - `FREE_NATIVE_MEMORY_SIZE`: Minimum free native memory size in megabytes for each Hazelcast instance. **Available on High-Density Memory cache record store only.**
    - `FREE_NATIVE_MEMORY_PERCENTAGE`: Minimum free native memory size percentage for each Hazelcast instance. **Available on High-Density Memory cache record store only.**
  - `eviction-policy`: Eviction policy which compares values to find the best matching eviction candidate. Default is `LRU`.
    - `LRU`: Less Recently Used - finds the best eviction candidate based on the lastAccessTime.
    - `LFU`: Less Frequently Used - finds the best eviction candidate based on the number of hits.
- `partition-lost-listeners` : Defines listeners for dispatching partition lost events for the cache. For more information, please see the [ICache Partition Lost Listener section](#icache-partition-lost-listener).
- `quorum-ref` : Name of quorum configuration that you want this cache to use.

Since `javax.cache.configuration.MutableConfiguration` misses the above additional configuration properties, Hazelcast ICache extension
provides an extended configuration class called `com.hazelcast.config.CacheConfig`. This class is an implementation of `javax.cache.configuration.CompleteConfiguration` and all the properties shown above can be configured
using its corresponding setter methods.


<br></br>
![image](images/NoteSmall.jpg) ***NOTE:*** *At the client side, ICache can be configured only programmatically.*
<br></br>



***RELATED INFORMATION***

*Please refer to the [Cache Configuration section](#cache-configuration) for a full description of ICache configuration.*
