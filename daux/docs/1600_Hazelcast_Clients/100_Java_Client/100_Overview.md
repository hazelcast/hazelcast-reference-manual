
The Java client is the most full featured Hazelcast native client. It is offered both with Hazelcast IMDG and Hazelcast IMDG Enterprise.  The main idea behind the Java client is to provide the same Hazelcast functionality by proxying each operation through a Hazelcast member. It can access and change distributed data, and it can listen to distributed events of an already established Hazelcast cluster from another Java application.


Please also check the [Other Client and Language Implementations](/1600_Hazelcast_Clients/600_Other_Client_and_Language_Implementations.md).

Hundreds or even thousands of clients can be connected to the cluster. By default, there are *core count* * *10* threads on the server side that will handle all the requests, e.g., if the server has 4 cores, there will be 40 threads.

Imagine a trading application where all the trading data are stored and managed in a Hazelcast cluster with tens of members. Swing/Web applications at the traders' desktops can use clients to access and modify the data in the Hazelcast cluster.


<br><br>
![image](../../images/NoteSmall.jpg) ***IMPORTANT:*** *Starting with Hazelcast 3.5, a new Java Native Client Library is introduced in the release package. This library contains clients which use the new Hazelcast Open Binary Client Protocol.*

* *For 3.5.x releases: You can use the new client experimentally with the library `hazelcast-client-new`. This library does not exist for the releases before 3.5. Please do not use this library with the Hazelcast clusters from 3.6.x and higher releases since it is not compatible with those releases.* 
* *For 3.6.x releases: You can use the new client with the library `hazelcast-client`. The old client's library is `hazelcast-client-legacy`, and you can still use it.*
* *For 3.7.x and higher releases: There is no more old client for these releases. The only one is the `hazelcast-client` library, which includes clients implemented with the Hazelcast Open Binary Client Protocol.*


##### Feature Comparison for Hazelcast Clients

Please refer to <a href="http://hazelcast.org/clients-languages/" target="_blank">Feature Comparison Matrix</a> to see the features implemented across the clients and language APIs.


##### Sample Codes for Clients


Please refer to <a href="https://github.com/hazelcast/hazelcast-code-samples/tree/master/clients" target="_blank">Client Code Samples</a>.


