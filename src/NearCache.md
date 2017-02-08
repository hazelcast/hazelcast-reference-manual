
## Near Cache

Map or Cache entries in Hazelcast are partitioned across the cluster members. Hazelcast clients do not have local data at all. Suppose you read the key `k` a number of times from a Hazelcast client or `k` is owned by another member in your cluster. Then each `map.get(k)` or `cache.get(k)` will be a remote operation, which creates a lot of network trips. If you have a data structure that is mostly read, then you should consider creating a local Near Cache, so that reads are sped up and less network traffic is created. 

These benefits do not come for free, please consider the following trade-offs:

- Members with a Near Cache will have to hold the extra cached data, which increases memory consumption.
- If invalidation is enabled and entries are updated frequently, then invalidations will be costly.
- Near Cache breaks the strong consistency guarantees; you might be reading stale data.

Near Cache is highly recommended for data structures that are mostly read.

In a client/server system you must enable the Near Cache separately on the client, without the need to configure it on the server. Please note that Near Cache configuration is specific to the server or client itself: a data structure on a server may not have Near Cache configured while the same data structure on a client may have Near Cache configured. They also can have different Near Cache configurations.

If you are using Near Cache, you should take into account that your hits to the keys in the Near Cache are not reflected as hits to the original keys on the primary members. This has for example an impact on IMap's maximum idle seconds or time-to-live seconds expiration. Therefore, even though there is a hit on a key in Near Cache, your original key on the primary member may expire.

![image](images/NoteSmall.jpg) ***NOTE:*** *Near Cache works only when you access data via `map.get(k)` or `cache.get(k)` methods. Data returned using a predicate is not stored in the Near Cache.*

### Hazelcast Data Structures with Near Cache Support

The following matrix shows the Hazelcast data structures with Near Cache support. Please have a look at the next section for a detailed explanation of `cache-local-entries`, `local-update-policy` and `preloader`.

| Data structure          | Near Cache Support | `cache-local-entries` | `local-update-policy` | `preloader` |
|:------------------------|:-------------------|:----------------------|:----------------------|:------------|
| IMap member             | yes                | yes                   | no                    | no          |
| IMap client             | yes                | no                    | no                    | yes         |
| JCache member           | no                 | no                    | no                    | no          |
| JCache client           | yes                | no                    | yes                   | yes         |
| ReplicatedMap member    | no                 | no                    | no                    | no          |
| ReplicatedMap client    | yes                | no                    | no                    | no          |
| TransactionalMap member | limited            | no                    | no                    | no          |
| TransactionalMap client | no                 | no                    | no                    | no          |

![image](images/NoteSmall.jpg) ***NOTE:*** *Even though lite members do not store any data for Hazelcast data structures, you can enable Near Cache on lite members for faster reads.*

### Configuring Near Cache

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
  .setMaxSizePolicy(MaxSizePolicy.ENTRY_COUNT
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
  - `NATIVE`: Data will be stored in the Near Cache that uses Hazelcast's High-Density Memory Store feature. This option is available only in Hazelcast Enterprise HD. Note that a map and its Near Cache can independently use High-Density Memory Store. For example, while your map does not use High-Density Memory Store, its Near Cache can use it.
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
	* `USED_NATIVE_MEMORY_SIZE`: Maximum used native memory size of the specified Near Cache in MB to trigger the eviction. If the used native memory size exceeds this threshold, the eviction is triggered.  Available only for `NATIVE` in-memory format. This is supported only by Hazelcast Enterprise.
	* `USED_NATIVE_MEMORY_PERCENTAGE`: Maximum used native memory percentage of the specified Near Cache to trigger the eviction. If the native memory usage percentage (relative to maximum native memory size) exceeds this threshold, the eviction is triggered. Available only for `NATIVE` in-memory format. This is supported only by Hazelcast Enterprise.
	* `FREE_NATIVE_MEMORY_SIZE`: Minimum free native memory size of the specified Near Cache in MB to trigger the eviction. If free native memory size goes below this threshold, eviction is triggered. Available only for `NATIVE` in-memory format. This is supported only by Hazelcast Enterprise.
	* `FREE_NATIVE_MEMORY_PERCENTAGE`: Minimum free native memory percentage of the specified Near Cache to trigger eviction. If free native memory percentage (relative to maximum native memory size) goes below this threshold, eviction is triggered. Available only for `NATIVE` in-memory format. This is supported only by Hazelcast Enterprise.
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

### Near Cache Configuration Examples

This section shows some configuration examples for different Hazelcast data structures.

#### Near Cache Example for IMap

The following are configuration examples for IMap Near Caches for Hazelcast members and clients.

```xml
<hazelcast>
  <map name="mostlyReadMap">
    <in-memory-format>BINARY</in-memory-format>
    <near-cache>
      <in-memory-format>OBJECT</in-memory-format>
      <invalidate-on-change>false</invalidate-on-change>
      <time-to-live-seconds>600</time-to-live-seconds>
      <eviction eviction-policy="NONE" max-size-policy="ENTRY_COUNT" size="5000"/>
      <cache-local-entries>true</cache-local-entries>
    </near-cache>
  </map>
</hazelcast>
```

```java
EvictionConfig evictionConfig = new EvictionConfig()
  .setEvictionPolicy(EvictionPolicy.NONE)
  .setMaximumSizePolicy(MaxSizePolicy.ENTRY_COUNT)
  .setSize(5000);

NearCacheConfig nearCacheConfig = new NearCacheConfig()
  .setInMemoryFormat(InMemoryFormat.OBJECT)
  .setInvalidateOnChange(false)
  .setTimeToLiveSeconds(600)
  .setEvictionConfig(evictionConfig);

Config config = new Config();
config.getMapConfig("mostlyReadMap")
  .setInMemoryFormat(InMemoryFormat.BINARY)
  .setNearCacheConfig(nearCacheConfig);
```

The Near Cache configuration for maps on members is a child of the map configuration, so you do not have to define the map name in the Near Cache configuration.

```xml
<hazelcast-client>
  <near-cache name="mostlyReadMap">
    <in-memory-format>OBJECT</in-memory-format>
    <invalidate-on-change>true</invalidate-on-change>
    <eviction eviction-policy="LRU" max-size-policy="ENTRY_COUNT" size="50000"/>
  </near-cache>
</hazelcast-client>
```

```java
EvictionConfig evictionConfig = new EvictionConfig()
  .setEvictionPolicy(EvictionPolicy.LRU)
  .setMaximumSizePolicy(MaxSizePolicy.ENTRY_COUNT)
  .setSize(50000);

NearCacheConfig nearCacheConfig = new NearCacheConfig()
  .setName("mostlyReadMap")
  .setInMemoryFormat(InMemoryFormat.OBJECT)
  .setInvalidateOnChange(true)
  .setEvictionConfig(evictionConfig);

ClientConfig clientConfig = new ClientConfig()
  .addNearCacheConfig(nearCacheConfig);
```

The Near Cache on the client side must have the same name as the data structure on the member for which this Near Cache is being created. You can use wildcards, so in this example `mostlyRead*` would also match the map `mostlyReadMap`.

A Near Cache can have its own `in-memory-format` which is independent of the `in-memory-format` of the data structure.

#### Near Cache Example for JCache Clients

The following is a configuration example for a JCache Near Cache for a Hazelcast client.
 
```xml
<hazelcast-client>
  <near-cache name="mostlyReadCache">
    <in-memory-format>OBJECT</in-memory-format>
    <invalidate-on-change>true</invalidate-on-change>
    <eviction eviction-policy="LRU" max-size-policy="ENTRY_COUNT" size="30000"/>
    <local-update-policy>CACHE_ON_UPDATE</local-update-policy>
  </near-cache>
</hazelcast-client>
```

```java
EvictionConfig evictionConfig = new EvictionConfig()
  .setEvictionPolicy(EvictionPolicy.LRU)
  .setMaximumSizePolicy(MaxSizePolicy.ENTRY_COUNT)
  .setSize(30000);

NearCacheConfig nearCacheConfig = new NearCacheConfig()
  .setName("mostlyReadCache")
  .setInMemoryFormat(InMemoryFormat.OBJECT)
  .setInvalidateOnChange(true)
  .setEvictionConfig(evictionConfig)
  .setLocalUpdatePolicy(LocalUpdatePolicy.CACHE_ON_UPDATE);

ClientConfig clientConfig = new ClientConfig()
  .addNearCacheConfig(nearCacheConfig);
```

#### Example for Near Cache with High-Density Memory Store

<font color="##153F75">**Hazelcast Enterprise HD**</font>
<br><br/>

The following is a configuration example for an IMap High-Density Near Cache for a Hazelcast member.

```xml
<hazelcast>
  <map name="mostlyReadMapWithHighDensityNearCache">
    <in-memory-format>OBJECT</in-memory-format>
    <near-cache>
      <in-memory-format>NATIVE</in-memory-format>
      <eviction eviction-policy="LFU" max-size-policy="USED_NATIVE_MEMORY_PERCENTAGE" size="90"/>
    </near-cache>
  </map>
</hazelcast>
```

```java
EvictionConfig evictionConfig = new EvictionConfig()
  .setEvictionPolicy(EvictionPolicy.LFU)
  .setMaximumSizePolicy(MaxSizePolicy.USED_NATIVE_MEMORY_PERCENTAGE)
  .setSize(90);

NearCacheConfig nearCacheConfig = new NearCacheConfig()
  .setInMemoryFormat(InMemoryFormat.NATIVE)
  .setEvictionConfig(evictionConfig);

Config config = new Config();
config.getMapConfig("mostlyReadMapWithHighDensityNearCache")
  .setInMemoryFormat(InMemoryFormat.OBJECT)
  .setNearCacheConfig(nearCacheConfig);
```

Keep in mind that you should have already enabled the High-Density Memory Store usage for your cluster. Please see the [Configuring High-Density Memory Store section](#configuring-high-density-memory-store).

Note that a map and its Near Cache can independently use High-Density Memory Store. For example, if your map does not use High-Density Memory Store, its Near Cache can still use it.

### Near Cache Eviction

In the scope of Near Cache, eviction means evicting (clearing) the entries selected according to the given `eviction-policy` when the specified `max-size-policy` has been reached.

The `max-size-policy` defines the state when the Near Cache is full and determines whether the eviction should be triggered. The `size` is either interpreted as entry count, memory size or percentage, depending on the chosen policy.

Once the eviction is triggered the configured `eviction-policy` determines which, if any, entries must be evicted.

### Near Cache Expiration

Expiration means the eviction of expired records. A record is expired: 

- if it is not touched (accessed/read) for `max-idle-seconds`
- `time-to-live-seconds` passed since it is put to Near Cache

The actual expiration is performed in two cases:

- When a record is accessed: it is checked if the record is expired or not. If it is expired, it is evicted and `null` is returned as the value to the caller.
- In the background: there is an expiration task that periodically (currently 5 seconds) scans records and evicts the expired records.

### Near Cache Invalidation

Invalidation is the process of removing an entry from the Near Cache when its value is updated or it is removed from the original data structure (to prevent stale reads). Near Cache invalidation happens asynchronously at the cluster level, but synchronously at the current member. This means that the Near Cache is invalidated within the whole cluster after the modifying operation is finished, but updated from the current member before the modifying operation is done. A modifying operation can be an EntryProcessor, an explicit update or remove as well as an expiration or eviction. Generally, whenever the state of an entry changes in the record store by updating its value or removing it, the invalidation event is sent for that entry.

Invalidations can be sent from members to client Near Caches or to member Near Caches, either individually or in batches. Default behavior is sending in batches. If there are lots of mutating operations such as put/remove on data structures, it is advised that you configure batch invalidations. This reduces the network traffic and keeps the eventing system less busy, but may increase the delay of individual invalidations.

You can use the following system properties to configure the Near Cache invalidation:

- `hazelcast.map.invalidation.batch.enabled`: Enable or disable batching. Default value is `true`. When it is set to `false`, all invalidations are sent immediately.
- `hazelcast.map.invalidation.batch.size`: Maximum number of invalidations in a batch. Default value is `100`.
- `hazelcast.map.invalidation.batchfrequency.seconds`: If the collected invalidations do not reach the configured batch size, a background process sends them periodically. The default value is `10` seconds.

If there are a lot of clients or many mutating operations, batching should remain enabled and the batch size should be configured with the `hazelcast.map.invalidation.batch.size` system property to a suitable value.

### Near Cache Eventual Consistency

Near Caches are invalidated by invalidation events. Invalidation events can be lost due to the fire-and-forget fashion of eventing system. If an event is lost, reads from Near Cache can indefinitely be stale.

To solve this problem, starting with the release of 3.8, Hazelcast provides eventually consistent behavior for IMap/JCache Near Caches by detecting invalidation losses.
After detection of an invalidation loss, stale data will be made unreachable and Near Cache's `get` calls to that data will be directed to underlying IMap/JCache to fetch the fresh data.

You can configure eventual consistency with the system properties below (same properties are valid for both member and client side Near Caches):

- `hazelcast.invalidation.max.tolerated.miss.count`: Default value is 10. If missed invalidation count is bigger than this value, relevant cached data will be made unreachable. 
- `hazelcast.invalidation.reconciliation.interval.seconds`: Default value is 60 seconds. This is a periodic task that scans cluster members periodically to compare generated invalidation events with the received ones from Near Cache.

### Near Cache Preloader

The Near Cache preloader is a functionality to store the keys from a Near Cache to provide a fast re-population of the previous hot data set after a Hazelcast Client has been restarted. It is available on IMap and JCache clients.

The Near Cache preloader stores the keys (not the values) of Near Cache entries in regular intervals. You can define the initial delay via `store-initial-delay-seconds`, e.g., if you know that your hot data set will need some time to build up. You can configure the interval via `store-interval-seconds` which determines how often the key-set will be stored. The persistence will not run continuously. Whenever the storage is scheduled, it will be performed on the actual keys in the Near Cache.
 
The Near Cache preloader will be triggered on the first initialization of the data structure on the client, e.g., `client.getMap("myNearCacheMap")`. This schedules the preloader, which will work in the background, so your application is not blocked. The storage will be enabled after the loading is completed.

The configuration parameter `directory` is optional. If you omit it the directory name the base folder will be the user working directory (normally where the JVM was started or configured with the system property `user.dir`). The storage filenames will always be created from the Near Cache name. So even if you use a wildcard name in the Near Cache Configuration, the preloader filenames will be unique. 

![image](images/NoteSmall.jpg) ***NOTE:*** *If you run multiple Hazelcast clients with enabled Near Cache preloader on the same machine, you have to configure a unique storage filename for each client or run them from different user directories. If two clients would write into the same file, only the first client will succeed. The following clients will throw an exception as soon as the Near Cache preloader is triggered.*
