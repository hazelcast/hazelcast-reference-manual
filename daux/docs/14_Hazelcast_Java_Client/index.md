
There are currently three ways to connect to a running Hazelcast cluster natively:

* Native Java Client
* Native C++ Client
* Native .NET Client

Please also check the [Other Client and Language Implementations](/15_Other_Client_and_Language_Implementations).

Native Clients enable you to perform almost all Hazelcast operations without being a member of the cluster. It connects to one of the cluster members and delegates all cluster wide operations to it (_dummy client_), or it connects to all of them and delegates operations smartly (_smart client_). When the relied cluster member dies, the client will transparently switch to another live member.

Hundreds or even thousands of clients can be connected to the cluster. By default, there are *core count* * *10* threads on the server side that will handle all the requests, e.g., if the server has 4 cores, there will be 40 threads.

Imagine a trading application where all the trading data are stored and managed in a Hazelcast cluster with tens of members. Swing/Web applications at the traders' desktops can use Native Clients to access and modify the data in the Hazelcast cluster.

Currently, Hazelcast has Java, C++ and .NET Clients as native clients. This chapter describes the Java Client.

<br><br>
![image](../images/NoteSmall.jpg) ***IMPORTANT:*** *Starting with the release 3.5, a new Java Native Client Library is introduced in the release package. This library contains clients which use the new Hazelcast Open Binary Client Protocol.*

* *For 3.5.x releases: You can use the new client experimentally with the library `hazelcast-client-new`. This library does not exist for the releases before 3.5. Please do not use this library with the Hazelcast clusters from 3.6.x and higher releases since it is not compatible with those releases.* 
* *For 3.6.x releases: You can use the new client with the library `hazelcast-client`. The old client's library is `hazelcast-client-legacy`, and you can still use it.*
* *For 3.7.x and higher releases: There is no more old client for these releases. The only one is the `hazelcast-client` library, which includes clients implemented with the Hazelcast Open Binary Client Protocol.*

