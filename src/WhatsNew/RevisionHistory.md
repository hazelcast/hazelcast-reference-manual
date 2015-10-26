

## Document Revision History

|Chapter|Section|Description|
|:-------|:-------|:-----------|
|[Chapter 3 - Getting Started](#getting-started)|[Phoning Home](#phoning-home)|Added as a new section to explain phone home data.|
|[Chapter 5 - Hazelcast Clusters](#hazelcast-clusters)|[Discovering Members with jclouds](#discovering-members-with-jclouds)|Added as a new section to explain how you can enable Hazelcast to discover your members with jclouds&reg;.|
|[Chapter 6 - Distributed Data Structures](#distributed-data-structures)|[Map](#map)|[Map Eviction](#map-eviction) section updated by adding the definition for the `min-eviction-check-millis` property. The section [Understanding Map Eviction](#understanding-map-eviction) added for a more clearer explanation of the eviction mechanism.<br> [Setting In Memory Format section](#setting-in-memory-format) updated by adding the information on how to configure Hazelcast Map to use High-Density Memory Store.|
|[Chapter 9 - Distributed Query](#distributed-query)|[Filtering with Paging Predicates](#filtering-with-paging-predicates)| The note stating that the random page accessing is not supported removed, since it is now supported with this release.
|[Chapter 10 - Transactions](#transactions)|[ONE_PHASE vs. TWO_PHASE](#one_phase-vs-two_phase)| Added as a new section explaining the trade offs between these two transaction types.
||[Creating a Transaction Interface](#creating-a-transaction-interface)|Replaced the transaction type name LOCAL with ONE_PHASE. Updated the definitions of transaction types. 
|[Chapter 11 - Hazelcast JCache](#hazelcast-jcache)|[ICache Partition Lost Listener](#icache-partition-lost-listener)| Added as a new section explaining how to listen when a partition is lost in a Hazelcast JCache implementation.
||[JCache Split-Brain](#jcache-split-brain)|Added as a new section.
|[Chapter 12 - Integrated Clustering](#integrated-clustering)|[Web Session Replication](#web-session-replication)|[Marking Transient Attributes](#marking-transient-attributes) added as a new section.|
||[Spring Integration](#spring-integration)|[Declarative Hazelcast JCache Based Caching Configuration](#declarative-hazelcast-jcache-based-caching-configuration) added as a new section.
||[Hibernate Second Level Cache](#hibernate-second-level-cache)|Added additional information related to Hibernate Native Client mode to the introduction paragraph of the [Setting Client/Server for Hibernate section](#setting-client-server-for-hibernate).|
|[Chapter 14 - Hazelcast Java Client](#hazelcast-java-client)|[Hazelcast Clients Feature Comparison](#hazelcast-clients-feature-comparison)|Added as a new section.
||[Client Network Configuration](#client-network-configuration)|Updated by adding the definition of the new IAM role configuration element.
|[Chapter 15 - Other Client Implementations](#other-client-implementations)|[Windows C++ Client](#windows-c++-client)|Updated by adding static/dynamic library related flag information.
|[Chapter 17 - Management](#management)|[Defining a Cluster Quorum](#defining-a-cluster-quorum)|Added information on quorum support for caches. Added the definition of the new configuration element `quorum-ref` to [ICache Configuration section](#icache-configuration).|
||[Management Center](#management-center)|A note on how to see the cache statistics on the Management Center added under the [Caches section](#monitoring-caches).<br></br>[Replicated Maps](#monitoring-replicated-maps) added as a new section.<br><br> Added the information explaining the new e-mail notification mechanism to [Creating Alerts](#creating-alerts).
||[Monitoring with JMX](#monitoring-with-jmx)|[MBean Naming for Hazelcast Data Structures](#mbean-naming-for-hazelcast-data-structures) and [Connecting to JMX Agent](#connecting-to-jmx-agent) added as new sections.
|[Chapter 21 - WAN](#wan)||[WAN Replication Event Filtering API section](#wan-replication-event-filtering-api) and [WAN Replication Acknowledge Types section](#wan-replication-acknowledge-types) added as new sections to explain the improvements performed for Hazelcast WAN replication feature.|
|[Chapter 22 - Hazelcast Configuration](#hazelcast-configuration)||Improved by adding missing configuration elements and attributes. Added [Quorum Configuration](#quorum-configuration) section.|
||[Network Configuration](#network-configuration)|[Join](#join) section updated by adding the explanation for `discovery-strategies` element.
||[System Properties](#system-properties)|Added the new system properties `hazelcast.unsafe.mode`,  `hazelcast.io.input.thread.count`, `hazelcast.io.output.thread.count` and `hazelcast.query.optimizer.type`. Updated the definition of `hazelcast.io.thread.count`.
|[Chapter 23 - Extending Hazelcast](#extending-hazelcast)||This title added as a chapter to include the section previously present as "User Defined Services".|
||[Discovery SPI](#discovery-spi)|Added as a new section.
||[Config Properties SPI](#config-properties-spi)|Added as a new section.
|[Chapter 27 - FAQ](#frequently-asked-questions)||Added new questions/answers.|
|[Chapter 28 - Glossary](#glossary)||Added new glossary items.|






<br> </br>


