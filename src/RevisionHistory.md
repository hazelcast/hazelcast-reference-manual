

# Document Revision History

This chapter lists the changes made to this document from the previous release.

<br></br>
![image](images/NoteSmall.jpg)***NOTE:*** *Please refer to the <a href="http://docs.hazelcast.org/docs/release-notes/" target="_blank">Release Notes</a> for the new features, enhancements and fixes performed for each Hazelcast release.*

<br></br>

|Chapter|Section|Description|
|:-------|:-------|:-----------|
|[Chapter 1 - Preface](#preface)||Updated the architecture diagram.|
|[Chapter 5 - Understanding Configuration](#understanding-configuration)||Added as a new chapter to provide the fundamentals of Hazelcast configuration.
|[Chapter 6 - Setting Up Clusters](#setting-up-clusters)||Added as a new chapter to provide all Hazelcast clusters related information.
|[Chapter 7 - Distributed Data Structures](#distributed-data-structures)|[Replicated Map](#replicated-map)|[Replicating instead of Partitioning](#replicating-instead-of-partitioning) updated by adding a note related to replicated map usage in a lite member. The whole section enhanced.
||[Lock](#lock)| Added explanations related to the maximum lease time for locks.
||[Map](#map)| Added the new section [Custom Eviction Policy](#custom-eviction-policy) to explain how a customized eviction policy can be plugged.
|[Chapter 10 - Distributed Query](#distributed-query)|[ValueExtractor with Portable Serialization](#valueExtractor-with-portable-serialization)| Added as a new section.
|[Chapter 11 - Transactions](#transactions)|[Integrating into J2EE](#integrating-into-j2ee)| Added information related to class loaders.
|[Chapter 12 - Hazelcast JCache](#hazelcast-jcache)|[ICache Configuration](#icache-configuration)| Added description of the new element `disable-per-entry-invalidation-events`.
||[JCache - Hazelcast Instance Integration](#jcache-hazelcast-instance-integration)| Added as a new section.
|[Chapter 14 - Storage](#storage)|[Hot Restart Persistence](#hot-restart-persistence)|Added the new section [Hot Restart Performance Considerations](#hot-restart-performance-considerations) to summarize the results of performance tests of Hot Restart Persistence.
||[Configuring High-Density Memory Store](#configuring-high-density-memory-store)|Enhanced the content for `allocator-type` configuration element.
|[Chapter 15 - Hazelcast Java Client](#hazelcast-java-client)||Enhanced the definition for the property `hazelcast.client.invocation.timeout.seconds`.
|[Chapter 16 - Other Client Implementations](#other-client-implementations)|[C++ Client](#c-client)|Added the new sections [Serialization Support](#serialization-support) and [Raw Pointer API](#raw-pointer-api).
|[Chapter 18 - Management](#management)|[Management Center](#management-center)|Added information explaining how to configure Hazelcast Management Center when it is deployed onto an SSL-enabled web container.
|[Chapter 26 - System Properties](#system-properties)||Added definition for the new property `hazelcast.partition.migration.stale.read.disabled`.|
|[Chapter 29 - FAQ](#frequently-asked-questions)||Added new questions/answers.|
|[Chapter 30 - Glossary](#glossary)||Added new glossary items.|



<br> </br>
