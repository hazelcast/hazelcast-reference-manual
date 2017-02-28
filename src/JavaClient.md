# Hazelcast Java Client

There are currently three ways to connect to a running Hazelcast cluster natively:

* Native Java Client
* Native C++ Client
* Native .NET Client

Please also check the [Other Client and Language Implementations](#other-client-and-language-implementations).

Native Clients enable you to perform almost all Hazelcast operations without being a member of the cluster. It connects to one of the cluster members and delegates all cluster wide operations to it (_dummy client_), or it connects to all of them and delegates operations smartly (_smart client_). When the relied cluster member dies, the client will transparently switch to another live member.

Hundreds or even thousands of clients can be connected to the cluster. By default, there are *core count* * *10* threads on the server side that will handle all the requests, e.g., if the server has 4 cores, there will be 40 threads.

Imagine a trading application where all the trading data are stored and managed in a Hazelcast cluster with tens of members. Swing/Web applications at the traders' desktops can use Native Clients to access and modify the data in the Hazelcast cluster.

Currently, Hazelcast has Java, C++ and .NET Clients as native clients. This chapter describes the Java Client.

<br><br>
![image](images/NoteSmall.jpg) ***IMPORTANT:*** *Starting with the release 3.5, a new Java Native Client Library is introduced in the release package. This library contains clients which use the new Hazelcast Open Binary Client Protocol.*

* *For 3.5.x releases: You can use the new client experimentally with the library `hazelcast-client-new`. This library does not exist for the releases before 3.5. Please do not use this library with the Hazelcast clusters from 3.6.x and higher releases since it is not compatible with those releases.* 
* *For 3.6.x releases: You can use the new client with the library `hazelcast-client`. The old client's library is `hazelcast-client-legacy`, and you can still use it.*
* *For 3.7.x and higher releases: There is no more old client for these releases. The only one is the `hazelcast-client` library, which includes clients implemented with the Hazelcast Open Binary Client Protocol.*

<br><br>

## Hazelcast Clients Feature Comparison

Before detailing the Java Client, this section provides the below comparison matrix to show which features are supported by the Hazelcast **native** clients.


Feature|Java Client|.NET Client|C++ Client
-|-|-
Map|Yes|Yes|Yes
Queue|Yes|Yes|Yes
Set|Yes|Yes|Yes
List|Yes|Yes|Yes
MultiMap|Yes|Yes|Yes
Replicated Map|Yes|No|No
Ringbuffer|Yes|Yes|No
Topic|Yes|Yes|Yes
Reliable Topic|Yes|No|Yes
JCache|Yes|No|No
Cardinality Estimator|Yes|No|No
Projections|Yes|No|No
Fast Aggregations|Yes|No|no
Lock|Yes|Yes|Yes
Condition|Yes|No|No
Semaphore|Yes|Yes|Yes
AtomicLong|Yes|Yes|Yes
AtomicReference|Yes|Yes|Yes
IdGenerator|Yes|Yes|Yes
CountDownLatch|Yes|Yes|Yes
Distributed Executor Service|Yes|No|No
Event Listeners|Yes|Yes|Yes
Sub-Listener Interfaces for Map ListenerMap|Yes|No|No
Entry Processor|Yes|Yes|Yes
Transactional Map|Yes|Yes|Yes
Transactional MultiMap|Yes|Yes|Yes
Transactional Queue|Yes|Yes|Yes
Transactional List|Yes|Yes|Yes
Transactional Set|Yes|Yes|Yes
Query (Predicates)|Yes|Yes|Yes
Paging Predicates|Yes|No|No
Support Built-in Predicates as defined in Java client|Yes|Yes|Yes
Continuous Query Caching|Yes|No|No
Listener with Predicate|Yes|Yes|Yes
MapReduce|Yes|No|No
Hot Restart|Yes (with a near cache)|No|No
Client Configuration Import|Yes|No|No
Hazelcast Client Protocol|Yes|Yes|Yes
Fail Fast on Invalid Configuration|Yes|No|No
Near Cache|Yes|Yes|No
Heartbeat|Yes|Yes|Yes
Declarative Configuration|Yes|Yes|No
Programmatic Configuration|Yes|Yes|Yes
SSL Support|Yes|Yes|No
XA Transactions|Yes|No|No
Smart Client|Yes|Yes|Yes
Dummy Client|Yes|Yes|Yes
Lifecycle Service|Yes|Yes|Yes
DataSerializable|Yes|Yes|Yes
IdentifiedDataSerializable|Yes|Yes|Yes
Portable|Yes|Yes|Yes



<br><br>