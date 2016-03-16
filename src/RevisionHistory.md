

# Document Revision History

This chapter lists the changes made to this document from the previous release.

<br></br>
![image](images/NoteSmall.jpg)***NOTE:*** *Please refer to the <a href="http://docs.hazelcast.org/docs/release-notes/" target="_blank">Release Notes</a> for the new features, enhancements and fixes performed for each Hazelcast release. You can also find information on upgrading Hazelcast from previous releases in the Release Notes document.*

<br></br>

|Chapter|Section|Description|
|:-------|:-------|:-----------|
|[Chapter 1 - Preface](#preface)||Added Hazelcast Architecture as a new section. Renamed the section Product Naming as Hazelcast Editions and updated its content by adding the new edition "Hazelcast Enterprise HD".|
|[Chapter 3 - Getting Started](#getting-started)|[Phone Home](#phone-home)|Added as a new section to explain phone home data.|
||[Deploying using Docker](#deploying-using-docker)|Added as a new section to describe how you can deploy your Hazelcast projects using the Docker platform.
||[Using the Scripts in the Package](#using-the-scripts-in-the-package)|Added as a new section explaining the scripts you have when you download Hazelcast.
|[Chapter 5 - Hazelcast Clusters](#hazelcast-clusters)|[Discovering Members with jclouds](#discovering-members-with-jclouds)|Added as a new section to explain how you can enable Hazelcast to discover your members with jclouds&reg;.|
|[Chapter 6 - Distributed Data Structures](#distributed-data-structures)|[Map](#map)|[Evicting Map Entries](#evicting-map-entries) section updated by adding the definition for the `min-eviction-check-millis` property. The section [Understanding Map Eviction](#understanding-map-eviction) added for a more clearer explanation of the eviction mechanism.<br></br> [Setting In Memory Format section](#setting-in-memory-format) updated by adding the information on how to configure Hazelcast Map to use High-Density Memory Store.<br></br> [Creating Near Cache for Map](#creating-near-cache-for-map) updated by adding a note related to enabling near caches on a lite member.<br></br>[Using High-Density Memory Store with Near Cache](#using-high-density-memory-store-with-near-cache) added as a new section.<br></br>[Required configuration changes when using NATIVE](#required-configuration-changes-when-using-native) added as a new section.<br></br>[Using High-Density Memory Store with Map](#using-high-density-memory-store-with-map) added as a new section.<br></br>The section previously known as Continuous Query moved under the Map section with the name [Listening to Map Entries with Predicates](#listening-to-map-entries-with-predicates).<br></br>[Near Cache Invalidation](#near-cache-invalidation) added as a new section.
||[Lock](#lock)|Added the explanation for the method `tryLock` with lease.
||[Replicated Map](#replicated-map)|[Replicating instead of Partitioning](#replicating-instead-of-partitioning) updated by adding a note related to replicated map usage in a lite member. The whole section enhanced.
|[Chapter 7 - Distributed Events](#distributed-events)|| Whole chapter improved and new sections added explaining how to register listeners.
|[Chapter 8 - Distributed Computing](#distributed-computing)|[Selecting Members for Task Execution](#selecting-members-for-task-execution)| Added a paragraph on how to select a lite member.
|[Chapter 9 - Distributed Query](#distributed-query)|[Filtering with Paging Predicates](#filtering-with-paging-predicates)| The note stating that the random page accessing is not supported removed, since it is now supported with this release.
|[Chapter 10 - Transactions](#transactions)|[ONE_PHASE vs. TWO_PHASE](#one_phase-vs-two_phase)| Added as a new section explaining the trade offs between these two transaction types.
||[Creating a Transaction Interface](#creating-a-transaction-interface)|Replaced the transaction type name LOCAL with ONE_PHASE. Updated the definitions of transaction types.
||[Integrating into J2EE](#integrating-into-j2ee)| Added information related to class loaders.
|[Chapter 11 - Hazelcast JCache](#hazelcast-jcache)|[ICache Partition Lost Listener](#icache-partition-lost-listener)| Added as a new section explaining how to listen when a partition is lost in a Hazelcast JCache implementation.
||[JCache Split-Brain](#jcache-split-brain)|Added as a new section.
|[Chapter 12 - Integrated Clustering](#integrated-clustering)|[Web Session Replication](#web-session-replication)|[Marking Transient Attributes](#marking-transient-attributes) added as a new section.|
||[Spring Integration](#spring-integration)|[Declarative Hazelcast JCache Based Caching Configuration](#declarative-hazelcast-jcache-based-caching-configuration) added as a new section.
||[Hibernate Second Level Cache](#hibernate-second-level-cache)|Added additional information related to Hibernate Native Client mode to the introduction paragraph of the [Setting Client/Server for Hibernate section](#setting-client-server-for-hibernate).|
|[Chapter 13 - Storage](#storage)|[Hot Restart Persistence](#hot-restart-persistence)|Added as a new section to explain how Hazelcast's Hot Restart feature works and its design details.|
|[Chapter 14 - Hazelcast Java Client](#hazelcast-java-client)|[Hazelcast Clients Feature Comparison](#hazelcast-clients-feature-comparison)|Added as a new section.
||[Client Network Configuration](#client-network-configuration)|Updated by adding the definition of the new IAM role configuration element.
|[Chapter 15 - Other Client Implementations](#other-client-implementations)|[Windows C++ Client](#windows-c-client)|Updated by adding static/dynamic library related flag information.
|[Chapter 16 - Serialization](#serialization)||Whole chapter reviewed after serialization improvements and [Global Serializer](#global-serializer) added as a new section.
|[Chapter 17 - Management](#management)|[Defining a Cluster Quorum](#defining-a-cluster-quorum)|Added information on quorum support for caches. Added the definition of the new configuration element `quorum-ref` to [ICache Configuration section](#icache-configuration).|
||[Management Center](#management-center)|A note on how to see the cache statistics on the Management Center added under the [Caches section](#monitoring-caches).<br></br>[Replicated Maps](#monitoring-replicated-maps) added as a new section.<br><br> Added the information explaining the new e-mail notification mechanism to [Creating Alerts](#creating-alerts).<br></br>[Monitoring WAN Replication](#monitoring-wan-replication) added as a new section.<br></br>[Hot Restart](#hot-restart) added as a new section.<br></br>[Getting Started to Management Center](#getting-started-to-management-center) added as a new section to explain the licensing mechanism, selecting clusters and how to create administrator user credentials.
||[Monitoring with JMX](#monitoring-with-jmx)|[MBean Naming for Hazelcast Data Structures](#mbean-naming-for-hazelcast-data-structures) and [Connecting to JMX Agent](#connecting-to-jmx-agent) added as new sections.
||[Enabling Lite Members](#enabling-lite-members)|Added as a new section. Also [Data Partitioning](#data-partitioning) and [Partition Table](#partition-table) sections  updated to include Lite Member related information.
||[Using the Script cluster.sh](#using-the-script-cluster-sh)|Added as a new section explaining this cluster management script that comes when you download Hazelcast. 
||[Using REST API for Cluster Management](#using-rest-api-for-cluster-management)|Added as a new section explaining how you can use REST commands to manage your cluster. 
|[Chapter 18 - Security](#security)|[SSL](#ssl)|First paragraph updated to include the information that SSL is capable of securing socket level communication between Hazelcast members and clients too.
|[Chapter 21 - WAN](#wan)||Whole chapter updated and new content added.|
|[Chapter 22 - OSGI](#osgi)||Added as a new chapter.|
|[Chapter 23 - Hazelcast Configuration](#hazelcast-configuration)||Improved by adding missing configuration elements and attributes. Added [Quorum Configuration](#quorum-configuration) section.|
||[Network Configuration](#network-configuration)|[Join](#join) section updated by adding the explanation for `discovery-strategies` element.
||[System Properties](#system-properties)|Added/updated system properties:<br></br> `hazelcast.unsafe.mode`,  `hazelcast.io.input.thread.count`, `hazelcast.io.output.thread.count`, `hazelcast.query.optimizer.type`, `hazelcast.io.thread.count`, `hazelcast.discovery.public.ip.enabled`.
|[Chapter 24 - Extending Hazelcast](#extending-hazelcast)||This title added as a chapter to include the section previously present as "User Defined Services".|
||[Discovery SPI](#discovery-spi)|Added as a new section.
||[Config Properties SPI](#config-properties-spi)|Added as a new section.
|[Chapter 28 - FAQ](#frequently-asked-questions)||Added new questions/answers.|
|[Chapter 29 - Glossary](#glossary)||Added new glossary items.|






<br> </br>
