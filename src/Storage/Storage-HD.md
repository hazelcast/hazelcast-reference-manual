
# Storage

This chapter describes Hazelcast's High-Density Memory Store and Hot Restart Persistence features along with their configurations, and gives recommendations on the storage sizing.

## High-Density Memory Store

<font color="##153F75">**Hazelcast Enterprise HD**</font>
<br></br>

Hazelcast High-Density Memory Store is Hazelcast's enterprise grade backend storage solution. It is currently provided for the following Hazelcast features and implementations:

- [Map](#using-high-density-memory-store-with-map) and [near cache](#using-high-density-memory-store-with-near-cache)
- JCache Implementation
- [Hot Restart Persistence](#hot-restart-persistence)
- Java Client, when using the near cache for client
- [Web Session Replications](#using-high-density-memory-store)
- Hibernate 2nd Level Caching
- Continuous Query Cache


By default, Hazelcast offers a production ready, low garbage collection (GC) pressure, storage backend. Serialized keys and values are still stored in the standard Java map, such as data structures on the heap. The data structures are stored in serialized form for the highest data compaction, and are still subject to Java Garbage Collection.

In <font color="##153F75">**Hazelcast Enterprise HD**</font>, the High-Density Memory Store is built around a pluggable memory manager which enables multiple memory stores. These memory stores are all accessible using a common access layer that scales up to Terabytes of main memory on a single JVM. At the same time, by further minimizing the GC pressure, High-Density Memory Store enables predictable application scaling and boosts performance and latency while minimizing pauses for Java Garbage Collection.

This foundation includes, but is not limited to, storing keys and values next to the heap in a native memory region.

