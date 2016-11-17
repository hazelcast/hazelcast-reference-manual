
## Near Cache

Map or Cache entries in Hazelcast are partitioned across the cluster members. Hazelcast clients do not have local data at all. Suppose you read the key `k` a number of times from a Hazelcast client or `k` is owned by another member in your cluster. Then each `map.get(k)` will be a remote operation, which creates a lot of network trips. If you have a data structure that is mostly read, then you should consider creating a local Near Cache, so that reads are speed up and less network traffic is created. 

These benefits do not come for free, please consider the following trade-offs:

- Nodes with a Near Cache will have to hold the extra cached data, which increases memory consumption.
- If invalidation is enabled and entries are updated frequently, then invalidations will be costly.
- Near Cache breaks the strong consistency guarantees; you might be reading stale data.

Near Cache is highly recommended for data structures that are mostly read.

In a client/server system you must enable the Near Cache separately on the client, without the need to configure it on the member. Please note that Near Cache configuration is specific to the member or client itself: a data structure on a member may not have Near Cache configured while the same data structure on a client may have Near Cache configured. They also can have different Near Cache configurations.

If you are using Near Cache, you should take into account that your hits to the keys in the Near Cache are not reflected as hits to the original keys on the primary members. This has for example an impact on IMap's maximum idle seconds or time-to-live seconds expiration. Therefore, even though there is a hit on a key in Near Cache, your original key on the primary member may expire.

![image](images/NoteSmall.jpg) ***NOTE:*** *Near Cache works only when you access data via `map.get(k)` or `cache.get(k)` methods. Data returned using a predicate is not stored in the Near Cache.*

### Hazelcast data structures with Near Cache support

The following matrix shows the Hazelcast data structures with Near Cache support. Please have a look at the next section for a detailed explanation of `cache-local-entries` and `local-update-policy`.

| Data structure          | Near Cache Support | `cache-local-entries` | `local-update-policy` |
|:------------------------|:-------------------|:----------------------|:----------------------|
| IMap member             | yes                | yes                   | no                    |
| IMap client             | yes                | no                    | no                    |
| JCache member           | no                 | no                    | no                    |
| JCache client           | yes                | no                    | yes                   |
| ReplicatedMap member    | no                 | no                    | no                    |
| ReplicatedMap client    | yes                | no                    | no                    |
| TransactionalMap member | limited            | no                    | no                    |
| TransactionalMap client | no                 | no                    | no                    |

![image](images/NoteSmall.jpg) ***NOTE:*** *Even though lite members do not store any data for Hazelcast data structures, you can enable Near Cache on lite members for faster reads.*

### Near Cache configuration

The following shows the configuration for the Hazelcast Near Cache.

**Declarative**:

```xml
<near-cache name="myDataStructure">
  <in-memory-format>(OBJECT|BINARY|NATIVE)</in-memory-format>
  <invalidate-on-change>(false|true)</invalidate-on-change>
  <time-to-live-seconds>(0..INT_MAX)</time-to-live-seconds>
  <max-idle-seconds>(0..INT_MAX)</max-idle-seconds>
  <eviction eviction-policy="(LRU|LFU|RANDOM|NONE)"
            max-size-policy="(ENTRY_COUNT
              |USED_NATIVE_MEMORY_SIZE|USED_NATIVE_MEMORY_PERCENTAGE
              |FREE_NATIVE_MEMORY_SIZE|FREE_NATIVE_MEMORY_PERCENTAGE"
            size="(0..INT_MAX)"/>
  <cache-local-entries>(false|true)</cache-local-entries>
  <local-update-policy>(INVALIDATE|CACHE)</local-update-policy>
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

NearCacheConfig nearCacheConfig = new NearCacheConfig()
  .setName("myDataStructure")
  .setInMemoryFormat(InMemoryFormat.BINARY|OBJECT|NATIVE)
  .setInvalidateOnChange(true|false)
  .setTimeToLiveSeconds(0..INT_MAX)
  .setMaxIdleSeconds(0..INT_MAX)
  .setEvictionConfig(evictionConfig)
  .setCacheLocalEntries(true|false)
  .setLocalUpdatePolicy(LocalUpdatePolicy.INVALIDATE|CACHE);

// configure for IMap, TransactionalMap or lite members
Config config = new Config();
config.getMapConfig("myDataStructure").setNearCacheConfig(nearCacheConfig);

// configure for IMap, ReplicatedMap or JCache clients
ClientConfig clientConfig = new ClientConfig();
clientConfig.addNearCacheConfig(nearCacheConfig);
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
- `eviction`: is used to specify the eviction behavior when you use High-Density Memory Store for your Near Cache. It has the following attributes:
  - `eviction-policy`: Eviction policy configuration. Available values are as follows:
	- `LRU`: Least Recently Used (default value).
	- `LFU`: Least Frequently Used.
	- `NONE`: No items will be evicted and the property max-size will be ignored. You still can combine it with `time-to-live-seconds` and `max-idle-seconds` to evict items from the Near Cache.
	- `RANDOM`: A random item will be evicted.
  - `max-size-policy`: Maximum size policy for eviction of the Near Cache. Available values are as follows:
	* `ENTRY_COUNT`: Maximum entry count per Near Cache (default value).
	* `USED_NATIVE_MEMORY_SIZE`: Maximum used native memory size in megabytes (`NATIVE` in-memory format only).
	* `USED_NATIVE_MEMORY_PERCENTAGE`: Maximum used native memory percentage (`NATIVE` in-memory format only).
	* `FREE_NATIVE_MEMORY_SIZE`: Minimum free native memory size in megabytes (`NATIVE` in-memory format only).
	* `FREE_NATIVE_MEMORY_PERCENTAGE`: Minimum free native memory percentage (`NATIVE` in-memory format only).
  - `size`: Maximum size of the Near Cache used for `max-size-policy`. When this is reached the Near Cache is evicted based on the policy defined. Any integer between `0` and `Integer.MAX_VALUE`. `0` means `Integer.MAX_VALUE`. Its default value is `0`.
 - `cache-local-entries`: Specifies whether the local entries will be cached. It can be useful when in-memory format for Near Cache is different from that of the map. By default, it is disabled. Is just available on Hazelcast members, not on Hazelcast clients (which have no local entries).
 - `local-update-policy`: Specifies the update policy of the local Near Cache. Is just available on JCache clients. Available values are as follows:
   - `INVALIDATE`: Does not update the local Near Cache. Will invalidate the local Near Cache eventually (default value).
   - `CACHE`: Updates the local Near Cache immediately after the put operation completes.

### Near Cache configuration examples

The following are configuration examples for IMap Near Caches for Hazelcast members and clients.
```xml
<hazelcast>
  <map name="mostlyReadMap">
    <near-cache>
      <in-memory-format>BINARY</in-memory-format>
      <invalidate-on-change>true</invalidate-on-change>
      <eviction eviction-policy="LFU" max-size-policy="ENTRY_COUNT" size="5000"/>
      <cache-local-entries>true</cache-local-entries>
    </near-cache>
  </map>
</hazelcast>
```
```xml
<hazelcast-client>
  <map name="mostlyReadMap"/>

  <near-cache name="mostlyReadMap">
    <in-memory-format>OBJECT</in-memory-format>
    <invalidate-on-change>false</invalidate-on-change>
    <time-to-live-seconds>600</time-to-live-seconds>
    <max-idle-seconds>100</max-idle-seconds>
    <eviction eviction-policy="NONE" max-size-policy="ENTRY_COUNT" size="10000"/>
  </near-cache>
</hazelcast-client>
```

The following is a configuration example for a JCache Near Cache for a Hazelcast client.  
```xml
<hazelcast-client>
  <near-cache name="mostlyReadCache">
    <in-memory-format>OBJECT</in-memory-format>
    <invalidate-on-change>true</invalidate-on-change>
    <eviction eviction-policy="LRU" max-size-policy="ENTRY_COUNT" size="10000"/>
    <local-update-policy>CACHE</local-update-policy>
  </near-cache>
</hazelcast-client>
```

<font color="##153F75">**Hazelcast Enterprise HD**</font><br/>
The following is a configuration example for an IMap High-Density Near Cache for a Hazelcast member.
```xml
<hazelcast>
  <map name="mostlyReadHDMap">
    <near-cache>
      <in-memory-format>NATIVE</in-memory-format>
      <eviction eviction-policy="LFU" max-size-policy="USED_NATIVE_MEMORY_PERCENTAGE" size="90"/>
      <cache-local-entries>true</cache-local-entries>
    </near-cache>
  </map>
</hazelcast>
```
Keep in mind that you should have already enabled the High-Density Memory Store usage for your cluster. Please see the [Configuring High-Density Memory Store section](#configuring-high-density-memory-store).

Note that a map and its Near Cache can independently use High-Density Memory Store. For example, if your map does not use High-Density Memory Store, its Near Cache can still use it.

!!!!!!!!!!!!!!!!!!

You can create Near Cache on the client side by providing a configuration per map name, as shown below.

```java
ClientConfig clientConfig = new ClientConfig();
CacheConfig nearCacheConfig = new NearCacheConfig();
nearCacheConfig.setName("mapName");
clientConfig.addNearCacheConfig(nearCacheConfig);
```

You can use wildcards for the map name, as shown below.

```java
nearCacheConfig.setName("map*");
nearCacheConfig.setName("*map");
```

The following is an example declarative configuration for Near Cache. 

```xml
</hazelcast-client>
	...
	<near-cache name="MENU">
		<max-size>2000</max-size>
		<time-to-live-seconds>0</time-to-live-seconds>
		<max-idle-seconds>0</max-idle-seconds>
		<eviction-policy>LFU</eviction-policy>
		<invalidate-on-change>true</invalidate-on-change>
		<in-memory-format>OBJECT</in-memory-format>
	</near-cache>
	...
</hazelcast-client>
```

Name of Near Cache on the client side must be the same as the name of IMap on the server for which this Near Cache is being created.

Near Cache can have its own `in-memory-format` which is independent of the `in-memory-format` of the servers.

!!!!!!!!!!!!!!!!!!

### Near Cache Invalidation

When you enable invalidations on Near Cache, either programmatically via `NearCacheConfig#setInvalidateOnChange` or declaratively via `<invalidate-on-change>true</invalidate-on-change>`, when entries are updated or removed from an entry in the underlying IMap, corresponding entries are removed from Near Caches to prevent stale reads.
This is called Near Cache invalidation.

Invalidations can be sent from members to client Near Caches or to member Near Caches, either individually or in batches. Default behavior is sending in batches. If there are lots of mutating operations such as put/remove on IMap, it is advised that you make invalidations in batches. This reduces the network traffic and keeps the eventing system less busy.

You can use the following system properties to configure the Near Cache invalidation:

- `hazelcast.map.invalidation.batch.enabled`: Enable or disable batching. Default value is true. When it is set to false, all invalidations are sent immediately.
- `hazelcast.map.invalidation.batch.size`: Maximum number of invalidations in a batch. Default value is 100.
- `hazelcast.map.invalidation.batchfrequency.seconds`: If we cannot reach the configured batch size, a background process sends invalidations periodically. Default value is 10 seconds.

If there are a lot of clients or many mutating operations, batching should remain enabled and the batch size should be configured with the `hazelcast.map.invalidation.batch.size` system property to a suitable value.
