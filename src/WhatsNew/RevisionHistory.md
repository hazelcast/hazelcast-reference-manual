

## Document Revision History

|Chapter|Section|Description|
|:-------|:-------|:-----------|
|[Chapter 6 - Distributed Data Structures](#distributed-data-structures)|[Map](#map)|[Map Eviction](#map-eviction) section updated by adding the definition for the `min-eviction-check-millis` property. The section [Understanding Map Eviction](#understanding-map-eviction) added for a more clearer explanation of the eviction mechanism.|
|[Chapter 11 - Transactions](#transactions)|[ONE_PHASE vs. TWO_PHASE](#one_phase-vs-two_phase)| Added as a new section explaining the trade offs between these two transaction types.
||[Creating a Transaction Interface](#creating-a-transaction-interface)|Replaced the transaction type name LOCAL with ONE_PHASE. Updated the definitions of transaction types. 
|[Chapter 12 - Hazelcast JCache](#hazelcast-jcache)|[ICache Partition Lost Listener](#icache-partition-lost-listener)| Added as a new section explaining how to listen when a partition is lost in a Hazelcast JCache implementation.
|[Chapter 13 - Integrated Clustering](#integrated-clustering)|[Web Session Replication](#web-session-replication)|[Marking Transient Attributes](#marking-transient-attributes) added as a new section.|
||[Hibernate Second Level Cache](#hibernate-second-level-cache)|Added additional information related to Hibernate Native Client mode to the introduction paragraph of the [Setting Client/Server for Hibernate section](#setting-client-server-for-hibernate).|
|[Chapter 15 - Hazelcast Java Client](#hazelcast-java-client)|[Hazelcast Clients Feature Comparison](#hazelcast-clients-feature-comparison)|Added as a new section.
||[Client Network Configuration](#client-network-configuration)|Updated by adding the definition of the new IAM role configuration element.
|[Chapter 18 - Management](#management)|[Cluster Quorum](#cluster-quorum)|Added information on quorum support for caches. Added the definition of the new configuration element `quorum-ref` to [ICache Configuration section](#icache-configuration).|
||[Management Center](#management-center)|A note on how to see the cache statistics on the Management Center added under the [Caches section](#caches).<br></br>[Replicated Maps](#replicated-maps) added as a new section.<br><br> Added the information explaining the new e-mail notification mechanism to the [Alerts section](#alerts).
||[Monitoring with JMX](#monitoring-with-jmx)|[MBean Naming for Hazelcast Data Structures](#mbean-naming-for-hazelcast-data-structures) and [Connecting to JMX Agent](#connecting-to-jmx-agent) added as new sections.
|[Chapter 23 - Hazelcast Configuration](#hazelcast-configuration)||Improved by adding missing configuration elements and attributes. Added [Quorum Configuration](#quorum-configuration) section.|
||[System Properties](#system-properties)|Added the new system properties `hazelcast.unsafe.mode`,  `hazelcast.io.input.thread.count` and `hazelcast.io.output.thread.count`. Updated the definition of `hazelcast.io.thread.count`.
|[Chapter 27 - FAQ](#frequently-asked-questions)||Added new questions/answers.|
|[Chapter 28 - Glossary](#glossary)||Added new glossary items.|






<br> </br>


