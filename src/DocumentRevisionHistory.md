

# Document Revision History

This chapter lists the changes made to this document from the previous release.

<br></br>
![image](images/NoteSmall.jpg)***NOTE:*** *Please refer to the <a href="http://docs.hazelcast.org/docs/release-notes/" target="_blank">Release Notes</a> for the new features, enhancements and fixes performed for each Hazelcast release.*

<br></br>

|Chapter|Section|Description|
|:-------|:-------|:-----------|
|[Chapter 6 - Setting Up Clusters](#setting-up-clusters)|[User Code Deployment](#user-code-deployment)|Added as a new section to explain Hazelcast's distributed class loading feature.
|[Chapter 7 - Rolling Member Upgrades](#rolling-member-upgrades)||Added as a new chapter.
|[Chapter 8 - Distributed Data Structures](#distributed-data-structures)|[Queue](#queue)| Updated  by adding split-brain protection content.
||[Ringbuffer](#ringbuffer)|Added [Ringbuffer with Persistent Datastore](#ringbuffer-with-persistent-datastore) as a new section.
||[Locking Maps](#locking-maps)| Updated by adding split-brain protection content.
|||Added [Overview of Hazelcast Distributed Objects](#overview-of-hazelcast-distributed-objects), [Loading and Destroying a Distributed Object](#loading-and-destroying-a-distributed-object) and [Controlling Partitions](#controlling-partitions) as new sections.
||[Lock](#lock)| Updated by adding split-brain protection content.
||[Cardinality Estimator Service](#cardinality-estimator-service)| Added as a new section.
||[Removing Bulk Map Entries with Predicates](#removing-bulk-map-entries-with-predicates)|Added as a new section.
||[Forced Eviction](#forced-eviction)| Added as a new section.
|[Chapter 10 - Distributed Computing](#distributed-computing)|[Entry Processor](#entry-processor)| - Added a warning to the introduction.<br>- Added Entry Processor Optimizations as a new section explaining Offloadable and Readonly entry processors.
||[Scheduled Executor Service](#scheduled-executor-service)| Added as a new section.
|[Chapter 11 - Distributed Query](#distributed-query)||Explanation for the `__key` attribute added under [Querying with SQL](#querying-with-sql) section.
||[Fast-Aggregations](#fast-aggregations)|Added as a new section.
||[Projections](#projections)|Added as a new section.
|[Chapter 13 - Hazelcast JCache](#hazelcast-jcache)|[Scoping to Join Clusters](#scoping-to-join-clusters)|Enhanced the content to explain and give examples about the Hazelcast instance creations during cache manager starts.
|[Chapter 15 - Storage](#storage)|[Hot Restart Persistence](#hot-restart-persistence)|Added example scenarios to give more idea on how the restart process and force start works.<br></br> Added the new configuration element `parallelism`. <br></br> Added the new section Moving/Copying Hot Restart Data. <br></br> Added the new section Partial Start and the new configuration element `cluster-data-recovery-policy`. <br></br> Added the new section [Hot Backup](#hot-backup).
||[Hazelcast Striim](#hazelcast-striim-hot-cache)| Added as a new section.
|[Chapter 18 - Serialization](#serialization)|[Implementing Portable Serialization](#implementing-portable-serialization)|[Ordering Consistency for writePortable](#ordering-consistency-for-writeportable) added as a new section.|
|[Chapter 19 - Management](#management)|[Diagnostics](#diagnostics)|Added as a new section to explain the diagnostic utility of Hazelcast.|
|||Added [LDAP](#ldap-authentication), [Active Directory](#active-directory-authentication) and [JAAS Authentication](#jaas-authentication) as new sections.
||[LDAP-Active Directory Authentication](#ldap-active-directory-authentication)|Added as a new section.
|||Partial start related content added to [Using REST API for Cluster Management](#using-rest-api-for-cluster-management) and [Using the Script cluster.sh](#using-the-script-clustersh) sections.
||[Using the Script cluster.sh](#using-the-script-clustersh)| Updated by adding new operations and parameters related to Rolling Member Upgrade procedures.
||[Enabling SSL for Clustered JMX](#enabling-ssl-for-clustered-jmx)|Added as a new section.
||[Using Management Center with TLS/SSL Only](#using-management-center-with-tlsssl-only)|Added as a new section.
|[Chapter 20 - Security](#security)|[SSL](#ssl)|Added "Authenticating Mutually" as a new section.|
|[Chapter 21 - Performance](#performance)|[Near Cache](#near-cache)|Added as a new section to consolidate all near cache related content in the Reference Manual. Added also the new contents, [Near Cache Eventual Consistency](#near-cache-eventual-consistency) and [Near Cache Preloader](#near-cache-preloader).|
||[Back Pressure](#back-pressure)|Added the section [Client Side](#client-side) explaining how you can control the number of maximum concurrent invocations at the client side.
|[Chapter 22 - Hazelcast Simulator](#hazelcast-simulator)||Moved the content to Simulator's own GitHub repository at [Hazelcast Simulator](https://github.com/hazelcast/hazelcast-simulator/blob/master/README.md).|
|[Chapter 27 - System Properties](#system-properties)||Added definitions for the following new properties: <br></br>- `hazelcast.compatibility.3.6.server` and `hazelcast.compatibility.3.6.client`: Please refer to the [Upgrading from 3.x section](#upgrading-from-3-x).<br></br> - `hazelcast.http.healthcheck.enabled`: Enabler for a simple HTTP based health check utility. Please refer to the [System Properties chapter](#system-properties). <br></br> - `hazelcast.invalidation.max.tolerated.miss.count` <br></br> - `hazelcast.invalidation.reconciliation.interval.seconds` <br></br> - `hazelcast.map.invalidation.batchfrequency.seconds` <br></br> - `hazelcast.map.invalidation.batch.enabled` <br></br> - `hazelcast.map.invalidation.batch.size`<br></br> - `hazelcast.hidensity.check.freememory`
|[Chapter 30 - FAQ](#frequently-asked-questions)||Added new questions/answers.|
|[Chapter 31 - Glossary](#glossary)||Added new glossary items.|



<br> </br>
