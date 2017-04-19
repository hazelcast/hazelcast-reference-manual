
The following shows the configuration for the Hazelcast Near Cache.

**Declarative**:

```xml
<near-cache name="myDataStructure">
  <in-memory-format>(OBJECT|BINARY|NATIVE)</in-memory-format>
  <invalidate-on-change>(true|false)</invalidate-on-change>
  <time-to-live-seconds>(0..INT_MAX)</time-to-live-seconds>
  <max-idle-seconds>(0..INT_MAX)</max-idle-seconds>
  <eviction eviction-policy="(LRU|LFU|RANDOM|NONE)"
            max-size-policy="(ENTRY_COUNT
              |USED_NATIVE_MEMORY_SIZE|USED_NATIVE_MEMORY_PERCENTAGE
              |FREE_NATIVE_MEMORY_SIZE|FREE_NATIVE_MEMORY_PERCENTAGE"
            size="(0..INT_MAX)"/>
  <cache-local-entries>(false|true)</cache-local-entries>
  <local-update-policy>(INVALIDATE|CACHE_ON_UPDATE)</local-update-policy>
  <preloader enabled="(true|false)"
             directory="nearcache-example"
             store-initial-delay-seconds="(0..INT_MAX)"
             store-interval-seconds="(0..INT_MAX)"/>
</near-cache>
```

The element `<near-cache>` has an optional attribute `name` whose default value is `default`.

**Programmatic**:

```java
EvictionConfig evictionConfig = new EvictionConfig()
  .setMaximumSizePolicy(MaxSizePolicy.ENTRY_COUNT
    |USED_NATIVE_MEMORY_SIZE|USED_NATIVE_MEMORY_PERCENTAGE
    |FREE_NATIVE_MEMORY_SIZE|FREE_NATIVE_MEMORY_PERCENTAGE);
  .setEvictionPolicy(EvictionPolicy.LRU|LFU|RANDOM|NONE);
  .setSize(0..INT_MAX);

NearCachePreloaderConfig preloaderConfig = new NearCachePreloaderConfig()
  .setEnabled(true|false)
  .setDirectory("nearcache-example")
  .setStoreInitialDelaySeconds(0..INT_MAX)
  .setStoreIntervalSeconds(0..INT_MAX);

NearCacheConfig nearCacheConfig = new NearCacheConfig()
  .setName("myDataStructure")
  .setInMemoryFormat(InMemoryFormat.BINARY|OBJECT|NATIVE)
  .setInvalidateOnChange(true|false)
  .setTimeToLiveSeconds(0..INT_MAX)
  .setMaxIdleSeconds(0..INT_MAX)
  .setEvictionConfig(evictionConfig)
  .setCacheLocalEntries(true|false)
  .setLocalUpdatePolicy(LocalUpdatePolicy.INVALIDATE|CACHE_ON_UPDATE)
  .setPreloaderConfig(preloaderConfig);
```

The class <a href="https://github.com/hazelcast/hazelcast/blob/master/hazelcast/src/main/java/com/hazelcast/config/NearCacheConfig.java" target="_blank">NearCacheConfig</a> is used for all supported Hazelcast data structures on members and clients.

Following are the descriptions of all configuration elements:

- `in-memory-format`: Specifies in which format data will be stored in your Near Cache. Note that a map's in-memory format can be different from that of its Near Cache. Available values are as follows:
  - `BINARY`: Data will be stored in serialized binary format (default value).
  - `OBJECT`: Data will be stored in deserialized form.
  - `NATIVE`: Data will be stored in the Near Cache that uses Hazelcast's High-Density Memory Store feature. This option is available only in Hazelcast IMDG Enterprise HD. Note that a map and its Near Cache can independently use High-Density Memory Store. For example, while your map does not use High-Density Memory Store, its Near Cache can use it.
- `invalidate-on-change`: Specifies whether the cached entries are evicted when the entries are updated or removed. Its default value is true.
- `time-to-live-seconds`: Maximum number of seconds for each entry to stay in the Near Cache. Entries that are older than this period are automatically evicted from the Near Cache. Regardless of the eviction policy used, `time-to-live-seconds` still applies. Any integer between 0 and `Integer.MAX_VALUE`. 0 means infinite. Its default value is 0.
- `max-idle-seconds`: Maximum number of seconds each entry can stay in the Near Cache as untouched (not read). Entries that are not read more than this period are removed from the Near Cache. Any integer between 0 and `Integer.MAX_VALUE`. 0 means `Integer.MAX_VALUE`. Its default value is 0.
- `eviction`: Specifies the eviction behavior when you use High-Density Memory Store for your Near Cache. It has the following attributes:
  - `eviction-policy`: Eviction policy configuration. Available values are as follows:
	* `LRU`: Least Recently Used (default value).
	* `LFU`: Least Frequently Used.
	* `NONE`: No items will be evicted and the property max-size will be ignored. You still can combine it with `time-to-live-seconds` and `max-idle-seconds` to evict items from the Near Cache.
	- `RANDOM`: A random item will be evicted.
  - `max-size-policy`: Maximum size policy for eviction of the Near Cache. Available values are as follows:
	* `ENTRY_COUNT`: Maximum size based on the entry count in the Near Cache (default value).
	* `USED_NATIVE_MEMORY_SIZE`: Maximum used native memory size of the specified Near Cache in MB to trigger the eviction. If the used native memory size exceeds this threshold, the eviction is triggered.  Available only for `NATIVE` in-memory format. This is supported only by Hazelcast IMDG Enterprise.
	* `USED_NATIVE_MEMORY_PERCENTAGE`: Maximum used native memory percentage of the specified Near Cache to trigger the eviction. If the native memory usage percentage (relative to maximum native memory size) exceeds this threshold, the eviction is triggered. Available only for `NATIVE` in-memory format. This is supported only by Hazelcast IMDG Enterprise.
	* `FREE_NATIVE_MEMORY_SIZE`: Minimum free native memory size of the specified Near Cache in MB to trigger the eviction. If free native memory size goes below this threshold, eviction is triggered. Available only for `NATIVE` in-memory format. This is supported only by Hazelcast IMDG Enterprise.
	* `FREE_NATIVE_MEMORY_PERCENTAGE`: Minimum free native memory percentage of the specified Near Cache to trigger eviction. If free native memory percentage (relative to maximum native memory size) goes below this threshold, eviction is triggered. Available only for `NATIVE` in-memory format. This is supported only by Hazelcast IMDG Enterprise.
  - `size`: Maximum size of the Near Cache used for `max-size-policy`. When this is reached the Near Cache is evicted based on the policy defined. Any integer between `1` and `Integer.MAX_VALUE`. This value has different defaults, depending on the data structure.
	* `IMap`: Its default value is `Integer.MAX_VALUE` for on-heap maps and `10000` for the `NATIVE` in-memory format.
	* `JCache`: Its default value is `10000`.
- `cache-local-entries`: Specifies whether the local entries will be cached. It can be useful when in-memory format for Near Cache is different from that of the map. By default, it is disabled. Is just available on Hazelcast members, not on Hazelcast clients (which have no local entries).
- `local-update-policy`: Specifies the update policy of the local Near Cache. Is just available on JCache clients. Available values are as follows:
   - `INVALIDATE`: Does not update the local Near Cache. Will invalidate the local Near Cache eventually (default value).
   - `CACHE_ON_UPDATE`: Updates the local Near Cache immediately after the put operation completes.
- `preloader`: Specifies if the Near Cache should store and pre-load its keys for a faster re-population after a Hazelcast client restart. Is just available on IMap and JCache clients. It has the following attributes:
  - `enabled`: Specifies whether the preloader for this Near Cache is enabled or not, `true` or `false`.
  - `directory`: Specifies the parent directory for the preloader of this Near Cache. The filenames for the preloader storage will be generated from the Near Cache name. You can additionally specify the parent directory to have multiple clients on the same machine with the same Near Cache names.
  - `store-initial-delay-seconds`: Specifies the delay in seconds until the keys of this Near Cache are stored for the first time. Its default value is `600`.
  - `store-interval-seconds`: Specifies the interval in seconds in which the keys of this Near Cache are stored. Its default value is `600`. 

