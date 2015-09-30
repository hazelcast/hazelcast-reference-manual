
## Elastic Memory (High-Density Memory First Generation)

By default, Hazelcast stores your distributed data (map entries, queue items) into Java heap which is subject to garbage collection (GC). As your heap gets bigger, garbage collection might cause your application to pause tens of seconds, badly effecting your application performance and response times. Elastic Memory (High-Density Memory First Generation) is Hazelcast with off-heap memory storage to avoid GC pauses. Even if you have terabytes of cache in-memory with lots of updates, GC will have almost no effect; resulting in more predictable latency and throughput.

Here are the steps to enable Elastic Memory:

- Set the maximum direct memory JVM can allocate, e.g. `java -XX:MaxDirectMemorySize=60G`.
- Enable Elastic Memory by setting the `hazelcast.elastic.memory.enabled` property to true.
- Set the total direct memory size for HazelcastInstance by setting the `hazelcast.elastic.memory.total.size` property. Size can be in MB or GB and abbreviation can be used, such as 60G and 500M.
- Set the chunk size by setting the `hazelcast.elastic.memory.chunk.size` property. Hazelcast will partition the entire off-heap memory into chunks. Default chunk size is 1K.
- You can enable `sun.misc.Unsafe` based off-heap storage implementation instead of `java.nio.DirectByteBuffer` based one, by setting the `hazelcast.elastic.memory.unsafe.enabled` property to true. Default value is false.
- Configure maps that will use Elastic Memory by setting `InMemoryFormat` to NATIVE. Default value is BINARY.

Below is the declarative configuration.

```xml
<hazelcast>
  ...
  <map name="default">
    ...
    <in-memory-format>NATIVE</in-memory-format>
  </map>
</hazelcast>
```

And, the programmatic configuration:

```java
MapConfig mapConfig = new MapConfig();
mapConfig.setInMemoryFormat( InMemoryFormat.NATIVE );
```

And, the following are the High-Density Memory First Generation related system properties.

|Property|Default Value|Type|Description|
|:-------|:-------|:-----------|
|`hazelcast.elastic.memory.enabled`|false|bool|Enables/disables Elastic Memory usage.
|`hazelcast.elastic.memory.total.size`|128|int|Elastic Memory storage total size in MB or GB.
|`hazelcast.elastic.memory.chunk.size`|1|int|Elastic Memory storage chunk size in KB.
|`hazelcast.elastic.memory.shared.storage`|false|bool|Enables/disables Elastic Memory shared storage.
|`hazelcast.elastic.memory.unsafe.enabled`|false|bool|Enables/disables usage of `sun.misc.Unsafe` when allocating, reading and modifying off-heap storage.



