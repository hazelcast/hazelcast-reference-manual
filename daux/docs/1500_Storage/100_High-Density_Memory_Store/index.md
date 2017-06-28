
<font color="##153F75">**Hazelcast IMDG Enterprise HD**</font>
<br></br>

By default, data structures in Hazelcast store data on heap in serialized form for highest data compaction; yet, these data structures are still subject to Java Garbage Collection (GC). Modern hardware has much more available memory. If you want to make use of that hardware and scale up by specifying higher heap sizes, GC becomes an increasing problem: the application faces long GC pauses that make the application unresponsive. Also, you may get out of memory errors if you fill your whole heap. Garbage collection, which is the automatic process that manages application’s runtime memory, often forces you into configurations where multiple JVMs with small heaps (sizes of 2-4GB per member) run on a single physical hardware device to avoid garbage collection pauses. This results in oversized clusters to hold the data and leads to performance level requirements.

In <font color="##153F75">**Hazelcast IMDG Enterprise HD**</font>, the High-Density Memory Store is Hazelcast’s new enterprise in-memory storage solution. It solves garbage collection limitations so that applications can exploit hardware memory more efficiently without the need of oversized clusters. High-Density Memory Store is designed as a pluggable memory manager which enables multiple memory stores for different data structures. These memory stores are all accessible by a common access layer that scales up to terabytes of the main memory on a single JVM by minimizing the GC pressure. High-Density Memory Store enables predictable application scaling and boosts performance and latency while minimizing garbage collection pauses.

This foundation includes, but is not limited to, storing keys and values next to the heap in a native memory region.

High-Density Memory Store is currently provided for the following Hazelcast features and implementations:

- [Map](/06_Distributed_Data_Structures/00_Map/04_Using_High-Density_Memory_Store_with_Map.md)
- JCache Implementation
- [Near Cache](/19_Performance/04_Near_Cache)
- [Hot Restart Persistence](/13_Storage/02_Hot_Restart_Persistence)
- [Java Client](/14_Hazelcast_Java_Client/03_Using_High-Density_Memory_Store_with_Java_Client.md), when using the Near Cache for client
- Web Session Replications
- Hibernate 2nd Level Caching
