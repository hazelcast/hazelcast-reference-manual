
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

<font color="##153F75">**Hazelcast IMDG Enterprise HD**</font>
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

Keep in mind that you should have already enabled the High-Density Memory Store usage for your cluster. Please see the [Configuring High-Density Memory Store section](/13_Storage/00_High-Density_Memory_Store/00_Configuring_High-Density_Memory_Store.md).

Note that a map and its Near Cache can independently use High-Density Memory Store. For example, if your map does not use High-Density Memory Store, its Near Cache can still use it.

