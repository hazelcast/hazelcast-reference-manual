
This chapter lists the changes made to this document from the previous release.


![image](images/NoteSmall.jpg)***NOTE:*** *Please refer to the <a href="http://docs.hazelcast.org/docs/release-notes/" target="_blank">Release Notes</a> for the new features, enhancements and fixes performed for each Hazelcast IMDG release.*


|Chapter/Section|Description|
|:-------|:-----------|
|[User Code Deployment](/04_Setting_Up_Clusters/07_User_Code_Deployment.md)|Added as a new section to explain Hazelcast's distributed class loading feature.
|[Rolling Member Upgrades](/05_Rolling_Member_Upgrades.md)|Added as a new chapter.
|[Map Eviction](/06_Distributed_Data_Structures/00_Map/02_Map_Eviction.md)|Updated by adding the forced eviction content.
|[Removing Bulk Map Entries with Predicates](/06_Distributed_Data_Structures/00_Map/11_Removing_Bulk_Map_Entries_with_Predicates.md)|Added as a new section.
|[Queue](/06_Distributed_Data_Structures/01_Queue)| Updated  by adding split-brain protection content.
|[Ringbuffer](/06_Distributed_Data_Structures/06_Ringbuffer)|Added [Ringbuffer with Persistent Datastore](/06_Distributed_Data_Structures/06_Ringbuffer/03_Ringbuffer_with_Persistent_Datastore.md) as a new section.
|[Locking Maps](/06_Distributed_Data_Structures/00_Map/07_Locking_Maps.md)| Updated by adding split-brain protection content.
|[Distributed Data Structures](/06_Distributed_Data_Structures/index.md)| Loading and Destroying a Distributed Object and Controlling Partitions added as new sections.
|[Lock](/06_Distributed_Data_Structures/09_Lock.md)| Updated by adding split-brain protection content.
|[Cardinality Estimator](/06_Distributed_Data_Structures/16_Cardinality_Estimator_Service.md)| Added as a new section.
|[Entry Processor](/08_Distributed_Computing/03_Entry_Processor/index.md)| Added a warning to the introduction.
|[Scheduled Executor Service](/08_Distributed_Computing/02_Scheduled_Executor_Service.md)| Added as a new section.
|[Querying with SQL](/09_Distributed_Query/00_How_Distributed_Query_Works/02_Querying_with_SQL.md)| Added explanation for the `__key` attribute.
|[Fast-Aggregations](/09_Distributed_Query/05_Fast_Aggregations)|Added as a new section.
|[Projections](/09_Distributed_Query/06_Projections)|Added as a new section.
|[Hot Restart Persistence](/13_Storage/02_Hot_Restart_Persistence)|Added example scenarios to give more idea on how the restart process and force start works. Added the new configuration element `parallelism`. Added the new section Moving/Copying Hot Restart Data. Added the new section Partial Start and the new configuration element `cluster-data-recovery-policy`. Added the new section [Hot Backup](/13_Storage/02_Hot_Restart_Persistence/09_Hot_Backup.md).
|[Hazelcast Striim](/13_Storage/03_Hazelcast_Striim_Hot_Cache.md)| Added as a new section.
|[Diagnostics](/17_Management/04_Diagnostics)|Added as a new section to explain the diagnostic utility of Hazelcast.|
|[LDAP-Active Directory Authentication](/17_Management/06_Management_Center/02_LDAP-Active_Directory_Authentication.md)|Added as a new section.
|[Using REST API for Cluster Management](/17_Management/03_Cluster_Utilities/03_Using_REST_API_for_Cluster_Management.md) and [Using the Script cluster.sh](/17_Management/03_Cluster_Utilities/02_Using_the_Script_cluster.sh.md)| Added partial start related content.
|[Using the Script cluster.sh](/17_Management/03_Cluster_Utilities/02_Using_the_Script_cluster.sh.md)| Updated by adding new operations and parameters related to Rolling Member Upgrade procedures.
|[Near Cache](/19_Performance/04_Near_Cache)|Added as a new section to consolidate all near cache related content in the Reference Manual. Added also the new contents, [Near Cache Eventual Consistency](/19_Performance/04_Near_Cache/06_Near_Cache_Eventual_Consistency.md) and [Near Cache Preloader](/19_Performance/04_Near_Cache/07_Near_Cache_Preloader.md).|
|[Implementing Portable Serialization](/16_Serialization/04_Implementing_Portable_Serialization)|[Ordering Consistency for writePortable](/16_Serialization/04_Implementing_Portable_Serialization/03_Ordering_Consistency_for_writePortable.md) added as a new section.|
|[Back Pressure](/19_Performance/01_Back_Pressure.md)|Added the section Client Side explaining how you can control the number of maximum concurrent invocations at the client side.
|[Hazelcast Simulator](/20_Hazelcast_Simulator.md)|Moved the content to Simulator's own GitHub repository at [Hazelcast Simulator](https://github.com/hazelcast/hazelcast-simulator/blob/master/README.md).|
|[System Properties](/25_System_Properties.md)|Added definitions for the following new properties: `hazelcast.compatibility.3.6.server` and `hazelcast.compatibility.3.6.client` (Please refer to the [Upgrading from 3.x section](/01_Getting_Started/04_Upgrading_From_3x.md)), `hazelcast.http.healthcheck.enabled` (Enabler for a simple HTTP based health check utility. Please refer to the [System Properties chapter](/25_System_Properties.md)), `hazelcast.invalidation.max.tolerated.miss.count`, `hazelcast.invalidation.reconciliation.interval.seconds`,  `hazelcast.map.invalidation.batchfrequency.seconds`, `hazelcast.map.invalidation.batch.enabled`, `hazelcast.map.invalidation.batch.size`, `hazelcast.hidensity.check.freememory`.
|[FAQ](/28_FAQ.md)|Added new questions/answers.|
|[Glossary](/29_Glossary)|Added new glossary items.|
