# Hazelcast Java Client

There are currently three ways to connect to a running Hazelcast cluster:

* Native Clients (Java, C++, .NET)
* [Memcache Client](#memcache-client)
* [REST Client](#rest-client)

Native Clients enable you to perform almost all Hazelcast operations without being a member of the cluster. It connects to one of the cluster members and delegates all cluster wide operations to it (_dummy client_), or it connects to all of them and delegates operations smartly (_smart client_). When the relied cluster member dies, the client will transparently switch to another live member.

There can be hundreds, even thousands of clients connected to the cluster. By default, there are *core count* * *10* threads on the server side that will handle all the requests (e.g. if the server has 4 cores, it will be 40).

Imagine a trading application where all the trading data are stored and managed in a Hazelcast cluster with tens of nodes. Swing/Web applications at the traders' desktops can use Native Clients to access and modify the data in the Hazelcast cluster.

Currently, Hazelcast has Native Java, C++ and .NET Clients available. This chapter describes the Java Client.

<br><br>
![image](images/NoteSmall.jpg) ***IMPORTANT:*** *Starting with the Hazelcast 3.5. release, a new client library is introduced in the release package: `hazelcast-client-new-<version>.jar`. This new Java native client library has the support for different versions of clients in a Hazelcast cluster. This support is not valid for the releases before 3.5.*

## Hazelcast Clients Feature Comparison

Before detailing the Java Client, this section provides the below comparison matrix to show which features are supported by the Hazelcast clients.

Feature|Java Client|.NET Client|C++ Client
-|-|-
Map|&#9745;|&#9745;|&#9745;
Queue|&#9745;|&#9745;|&#9745;
Set|&#9745;|&#9745;|&#9745;
List|&#9745;|&#9745;|&#9745;
MultiMap|&#9745;|&#9745;|&#9745;
Replicated Map|&#9745;|&#9747;|&#9747;
Topic|&#9745;|&#9745;|&#9745;
MapReduce|&#9745;|&#9747;|&#9747;
Lock|&#9745;|&#9745;|&#9745;
Semaphore|&#9745;|&#9745;|&#9745;
AtomicLong|&#9745;|&#9745;|&#9745;
AtomicReference|&#9745;|&#9745;|&#9745;
IdGenerator|&#9745;|&#9745;|&#9745;
CountDownLatch|&#9745;|&#9745;|&#9745;
Transactional Map|&#9745;|&#9745;|&#9745;
Transactional MultiMap|&#9745;|&#9745;|&#9745;
Transactional Queue|&#9745;|&#9745;|&#9745;
Transactional List|&#9745;|&#9745;|&#9745;
Transactional Set|&#9745;|&#9745;|&#9745;
JCache|&#9745;|&#9747;|&#9747;
Ringbuffer|&#9745;|&#9747;|&#9747;
Reliable Topic|&#9747;|&#9747;|&#9747;
Client Configuration Import|&#9745;|&#9747;|&#9747;
Hazelcast Client Protocol|&#9745;|&#9745;|&#9745;
Fail Fast on Invalid Conviguration|&#9745;|&#9747;|&#9747;
Sub-Listener Interfaces for Map ListenerMap|&#9745;|&#9747;|&#9747;
Continuous Query Caching|&#9745;|&#9747;|&#9747;
Distributed Executor Service|&#9745;|&#9747;|&#9747;
Query|&#9745;|&#9745;|&#9745;
Near Cache|&#9745;|&#9745;|&#9747;
Heartbeat|&#9745;|&#9745;|&#9745;
Declarative Configuration|&#9745;|&#9745;|&#9747;
Programmatic Configuration|&#9745;|&#9745;|&#9745;
SSL Support|&#9745;|&#9747;|&#9747;
XA Transactions|&#9745;|&#9747;|&#9747;
Smart Client|&#9745;|&#9745;|&#9745;
Dummy Client|&#9745;|&#9745;|&#9745;
Lifecycle Service|&#9745;|&#9745;|&#9745;
Event Listeners|&#9745;|&#9745;|&#9745;
DataSerializable|&#9745;|&#9745;|&#9745;
IdentifiedDataSerializable|&#9745;|&#9745;|&#9745;
Portable|&#9745;|&#9745;|&#9745;



<br><br>