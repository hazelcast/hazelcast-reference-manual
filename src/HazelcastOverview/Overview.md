# Hazelcast Overview


Hazelcast is an open source In-Memory Data Grid (IMDG). 
It provides elastically scalable distributed In-Memory computing, widely recognized as the fastest and most scalable
approach to application performance. Hazelcast does this in open source.
More importantly, Hazelcast makes distributed computing simple by offering distributed implementations of many
developer friendly interfaces from Java such as Map, Queue, ExecutorService, Lock, and JCache. For example, the Map
interface provides an In-Memory Key Value store which confers many of the advantages of NoSQL in terms of developer
friendliness and developer productivity.

In addition to distributing data In-Memory, Hazelcast provides a convenient set of APIs to access the CPUs in your
cluster for maximum processing speed.
Hazelcast is designed to be lightweight and easy to use. Since Hazelcast is delivered as a compact library (JAR) and
since it has no external dependencies other than Java, it easily plugs into your software solution and provides
distributed data structures and distributed computing utilities.

Hazelcast is highly scalable and available (100% operational, never failing). Distributed applications can use
Hazelcast for distributed caching, synchronization, clustering, processing, pub/sub messaging, etc. Hazelcast is
implemented in Java and has clients for Java, C/C++, .NET and REST. Hazelcast also speaks memcache protocol. It plugs into Hibernate and can easily be used with any existing database system.

If you are looking for In-Memory speed, elastic scalability, and the developer friendliness of NoSQL, Hazelcast is a
great choice.

**Hazelcast is simple**

Hazelcast is written in Java with no other dependencies. It exposes the same API from the familiar Java util package,
exposing the same interfaces. Just add `hazelcast.jar` to your classpath, and you can quickly enjoy JVMs clustering
and you can start building scalable applications.

**Hazelcast is Peer-to-Peer**

Unlike many NoSQL solutions, Hazelcast is peer-to-peer. There is no master and slave; there is no single point of
failure. All nodes store equal amounts of data and do equal amounts of processing. You can embed Hazelcast in your
existing application or use it in client and server mode where your application is a client to Hazelcast nodes.

**Hazelcast is scalable**

Hazelcast is designed to scale up to hundreds and thousands of nodes. Simply add new nodes and they will
automatically discover the cluster and will linearly increase both memory and processing capacity. The nodes maintain
a TCP connection between each other and all communication is performed through this layer.

**Hazelcast is fast**

Hazelcast stores everything in-memory. It is designed to perform very fast reads and updates.

**Hazelcast is redundant**

Hazelcast keeps the backup of each data entry on multiple nodes. On a node failure, the data is restored from the
backup and the cluster will continue to operate without downtime.

## Sharding in Hazelcast

Hazelcast shards are called Partitions. By default, Hazelcast has 271 partitions. Given a key, we serialize, hash
and mode it with the number of partitions to find the partition the key belongs to. The partitions themselves are
distributed equally among the members of the cluster. Hazelcast also creates the backups of partitions and distributes
them among nodes for redundancy.

<br></br>
***RELATED INFORMATION***

*Please refer to the [Data Partitioning section](#data-partitioning) for more information on how Hazelcast partitions
your data.*


## Hazelcast Topology

You can deploy a Hazelcast cluster in two ways: Embedded or Client/Server.

If you have an application whose main focal point is asynchronous or high performance computing and lots of task
executions, then Embedded deployment is useful. In this type, members include both the application and Hazelcast data and services. The advantage of the Embedded deployment is having a low-latency data access.

See the below illustration.

![](images/P2Pcluster.jpg)



In the Client/Server deployment, Hazelcast data and services are centralized in one or more server members and they are accessed by the application through clients. 
You can have a cluster of server members that can be independently created and scaled. Your clients communicate with
these members to reach to Hazelcast data and services on them. Hazelcast provides native clients (Java, .NET and C++), Memcache
clients and REST clients. 
See the below illustration.

![](images/CSCluster.jpg)

Client/Server deployment has advantages including more predictable and reliable Hazelcast performance, easier identification of problem causes, and most importantly, better scalability. 
When you need to scale in this deployment type, just add more Hazelcast server members. You can address client and server scalability concerns separately.

If you want low-latency data access, as it is in the Embedded deployment, and you also want the scalability advantages of the Client/Server deployment, you can consider to define near caches for your clients. This enables the frequently used data to be kept in the client's local memory. Please refer to the [Client Near Cache Configuration section](#client-near-cache-configuration).

