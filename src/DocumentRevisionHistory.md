

# Document Revision History

This chapter lists the changes made to this document from the previous release.

<br></br>
![image](images/NoteSmall.jpg)***NOTE:*** *Please refer to the <a href="http://docs.hazelcast.org/docs/release-notes/" target="_blank">Release Notes</a> for the new features, enhancements and fixes performed for each Hazelcast release.*

<br></br>

|Chapter|Section|Description|
|:-------|:-------|:-----------|
|[Chapter 1 - Preface](#preface)||Updated the architecture diagram.|
|[Chapter 3 - Getting Started](#getting-started)||[Deploying on Microsoft Azure](#deploying-on-microsoft-azure) and [Deploying On Pivotal Cloud Foundry](#deploying-on-pivotal-cloud-foundry) added as a new sections.|
|[Chapter 5 - Understanding Configuration](#understanding-configuration)||Added as a new chapter to provide the fundamentals of Hazelcast configuration.
|[Chapter 6 - Setting Up Clusters](#setting-up-clusters)||Added as a new chapter to provide all Hazelcast clusters related information.
||[Discovering Native Clients](#discovering-native-clients)|Added as a new section to explain Hazelcast's multicast discovery plugin.
||[Discovering Members with jclouds](#discovering-members-with-jclouds)|Section's content moved to its own repo since this feature has become a Hazelcast plugin. You can find its repo's link in this section.
||[Discovering Members within EC2 Cloud](#discovering-members-within-ec2-cloud)|Section's content moved to its own repo since this feature has become a Hazelcast plugin. You can find its repo's link in this section.
||[Discovering Members within Azure Cloud](#discovering-members-within-azure-cloud)|Added as a new section.
||[Partition Group Configuration](#partition-group-configuration)|Added explanations of the new member group types ZONE_AWARE and SPI.
|[Chapter 7 - Distributed Data Structures](#distributed-data-structures)|[Replicated Map](#replicated-map)|[Replicating instead of Partitioning](#replicating-instead-of-partitioning) updated by adding a note related to replicated map usage in a lite member. The whole section enhanced.
||[Lock](#lock)| Added explanations related to the maximum lease time for locks.
||[Map](#map)| Added the new section [Custom Eviction Policy](#custom-eviction-policy) to explain how a customized eviction policy can be plugged.<br></br>[Listening to Map Entries with Predicates](#listening-to-map-entries-with-predicates) section updated by adding the explanation of a new system property (`hazelcast.map.entry.filtering.natural.event.types`) that allows better continuous query implementations.
|[Chapter 9 - Distributed Computing](#distributed-computing)|[Using Indexes](#using-indexes)| Added as a new section.
||[Durable Executor Service](#durable-executor-service)|Added as a new section to describe Hazelcast's newly introduced data structure, Durable Executor Service.
|[Chapter 10 - Distributed Query](#distributed-query)|[ValueExtractor with Portable Serialization](#valueExtractor-with-portable-serialization)| Added as a new section.
|||Explanation for the `__key` attribute added under [Querying with SQL](#querying-with-sql) section.
|[Chapter 11 - Transactions](#transactions)|[Integrating into J2EE](#integrating-into-j2ee)| Added information related to class loaders.
|[Chapter 12 - Hazelcast JCache](#hazelcast-jcache)|[ICache Configuration](#icache-configuration)| Added description of the new element `disable-per-entry-invalidation-events`.
||[JCache - Hazelcast Instance Integration](#jcache-hazelcast-instance-integration)| Added as a new section.
||[JCache Eviction](#jcache-eviction)| [Custom Eviction Policies](#custom-eviction-policies) added as a new section.
|[Chapter 13 - Integrated Clustering](#integrated-clustering)|[Web Session Replication](#web-session-replication)| Updated Tomcat and Jetty based web session replication sections since they have become Hazelcast plugins. These sections' content is moved to their own repos. You can find these repos' links in the related sections.
||[Hibernate Second Level Cache](#hibernate-second-level-cache)|Section's content moved to its own repo since this feature has become a Hazelcast plugin. You can find its repo's link in this section.
||[Spring Integration](#spring-integration)|[Configuring Hazelcast Transaction Manager](#configuring-hazelcast-transaction-manager) added as a new section.
|[Chapter 14 - Storage](#storage)|[Hot Restart Persistence](#hot-restart-persistence)|Added the new section [Hot Restart Performance Considerations](#hot-restart-performance-considerations) to summarize the results of performance tests of Hot Restart Persistence.
||[Configuring High-Density Memory Store](#configuring-high-density-memory-store)|Enhanced the content for `allocator-type` configuration element.
|[Chapter 15 - Hazelcast Java Client](#hazelcast-java-client)||Enhanced the definition for the property `hazelcast.client.invocation.timeout.seconds`.
||[Feature Comparison](#hazelcast-clients-feature-comparison)|Updated to reflect the latest feature developments.
||[Client System Properties](#client-system-properties)|Added description for the property `hazelcast.client.max.concurrent.invocations`.
|[Chapter 16 - Other Client and Language Implementations](#other-client-and-language-implementations)||Content of C++ and .NET clients updated so that the reader is directed to the GitHub repositories of these clients.
|[Chapter 17 - Serialization](#serialization)||Removed `java.lang.Enum` from the default types since it is not among the default serializers.
|[Chapter 18 - Management](#management)|[Management Center](#management-center)|Added information explaining how to configure Hazelcast Management Center when it is deployed onto an SSL-enabled web container.<br></br>Added information explaining the "Update License" button.
||[Clustered JMX via Management Center](#clustered-jmx-via-management-center)| List of attributes updated by adding the Replicated Map attributes.
||[Hazelcast CLI](#hazelcast-cli)|Added as a new section.
||[Safety Checking Cluster Members](#safety-checking-cluster-members)|Updated the content to reflect the improvements in graceful shutdown feature.
|[Chapter 19 - Security](#security)|[SSL](#ssl)|Added information explaining the performance overhead for the clients when they use SSL.
||[Encryption](#encryption)|Added a note about the encryption at the client side.
|[Chapter 22 - WAN](#wan)||Updated to reflect the improvement which is the ability of generic WAN replication endpoint configurations.<br></br>Cleared the content related to `WanNoDelayReplication`  since this implementation has been removed, and added a note under the [Defining WAN Replication section](#defining-wan-replication).
||[Synchronizing WAN Target Cluster](#synchronizing-wan-target-cluster)|Added as a new section.
||[Solace Integration](#solace-integration)|Added as a new section explaining how to integrate Hazelcast WAN replication with Solace messaging appliances.
|[Chapter 26 - System Properties](#system-properties)||Added definitions for the new properties: <br></br>- `hazelcast.partition.migration.stale.read.disabled`<br></br>- `hazelcast.map.entry.filtering.natural.event.types`<br></br>- `hazelcast.internal.map.expiration.cleanup.operation.count`<br></br>- `hazelcast.internal.map.expiration.cleanup.percentage`<br></br>- `hazelcast.internal.map.expiration.task.period.seconds`|
|[Chapter 29 - FAQ](#frequently-asked-questions)||Added new questions/answers.|
|[Chapter 30 - Glossary](#glossary)||Added new glossary items.|



<br> </br>
