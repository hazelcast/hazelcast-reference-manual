Welcome to the Hazelcast IMDG (In-Memory Data Grid) Reference Manual. This manual includes concepts, instructions, and samples to guide you on how to use Hazelcast and build Hazelcast IMDG applications.

As the reader of this manual, you must be familiar with the Java programming language and you should have installed your preferred Integrated Development Environment (IDE).


Hazelcast is an open source In-Memory Data Grid (IMDG). 
It provides elastically scalable distributed In-Memory computing, widely recognized as the fastest and most scalable
approach to application performance. Hazelcast does this in open source.
More importantly, Hazelcast makes distributed computing simple by offering distributed implementations of many
developer-friendly interfaces from Java such as Map, Queue, ExecutorService, Lock, and JCache. For example, the Map
interface provides an In-Memory Key Value store which confers many of the advantages of NoSQL in terms of developer
friendliness and developer productivity.

In addition to distributing data In-Memory, Hazelcast provides a convenient set of APIs to access the CPUs in your
cluster for maximum processing speed.
Hazelcast is designed to be lightweight and easy to use. Since Hazelcast is delivered as a compact library (JAR) and
since it has no external dependencies other than Java, it easily plugs into your software solution and provides
distributed data structures and distributed computing utilities.

Hazelcast is highly scalable and available. Distributed applications can use
Hazelcast for distributed caching, synchronization, clustering, processing, pub/sub messaging, etc. Hazelcast is
implemented in Java and has clients for Java, C/C++, .NET and REST. Hazelcast also speaks Memcached protocol. It plugs into Hibernate and can easily be used with any existing database system.

If you are looking for In-Memory speed, elastic scalability, and the developer friendliness of NoSQL, Hazelcast is a
great choice.

**Hazelcast is Simple**

Hazelcast is written in Java with no other dependencies. It exposes the same API from the familiar Java util package,
exposing the same interfaces. Just add `hazelcast.jar` to your classpath and you can quickly enjoy JVMs clustering
and start building scalable applications.

**Hazelcast is Peer-to-Peer**

Unlike many NoSQL solutions, Hazelcast is peer-to-peer. There is no master and slave; there is no single point of
failure. All members store equal amounts of data and do equal amounts of processing. You can embed Hazelcast in your
existing application or use it in client and server mode where your application is a client to Hazelcast members.

**Hazelcast is Scalable**

Hazelcast is designed to scale up to hundreds and thousands of members. Simply add new members and they will
automatically discover the cluster and will linearly increase both memory and processing capacity. The members maintain
a TCP connection between each other and all communication is performed through this layer.

**Hazelcast is Fast**

Hazelcast stores everything in-memory. It is designed to perform very fast reads and updates.

**Hazelcast is Redundant**

Hazelcast keeps the backup of each data entry on multiple members. On a member failure, the data is restored from the
backup and the cluster will continue to operate without downtime.

