
# Storage

This chapter describes Hazelcast's High-Density Memory Store and Hot Restart Persistence features along with their configurations, and gives recommendations on the storage sizing.

## High-Density Memory Store

<font color="##153F75">**Hazelcast Enterprise HD**</font>
<br></br>

By default, data structures in Hazelcast store data on heap in serialized form for highest data compaction; yet, these data structures are still subject to Java Garbage Collection (GC). Modern hardware has much more available memory. If you want to make use of that hardware and scale up by specifying higher heap sizes, GC becomes an increasing problem: the application faces long GC pauses that make the application unresponsive. Also, you may get out of memory errors if you fill your whole heap. Garbage collection, which is the automatic process that manages application’s runtime memory, often forces you into configurations where multiple JVMs with small heaps (sizes of 2-4GB per node) run on a single physical hardware device to avoid garbage collection pauses. This results in oversized clusters to hold the data and leads to performance level requirements.

In <font color="##153F75">**Hazelcast Enterprise HD**</font>, the High-Density Memory Store is Hazelcast’s new enterprise in-memory storage solution. It solves garbage collection limitations so that applications can exploit hardware memory more efficiently without the need of oversized clusters. High-Density Memory Store is designed as a pluggable memory manager which enables multiple memory stores for different data structures. These memory stores are all accessible by a common access layer that scales up to terabytes of the main memory on a single JVM by minimizing the GC pressure. High-Density Memory Store enables predictable application scaling and boosts performance and latency while minimizing garbage collection pauses.

This foundation includes, but is not limited to, storing keys and values next to the heap in a native memory region.

High-Density Memory Store is currently provided for the following Hazelcast features and implementations:

- [Map](#using-high-density-memory-store-with-map) and [near cache](#using-high-density-memory-store-with-near-cache)
- JCache Implementation
- [Hot Restart Persistence](#hot-restart-persistence)
- Java Client, when using the near cache for client
- [Web Session Replications](#using-high-density-memory-store)
- Hibernate 2nd Level Caching