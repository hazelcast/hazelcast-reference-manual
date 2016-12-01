

# Document Revision History

This chapter lists the changes made to this document from the previous release.

<br></br>
![image](images/NoteSmall.jpg)***NOTE:*** *Please refer to the <a href="http://docs.hazelcast.org/docs/release-notes/" target="_blank">Release Notes</a> for the new features, enhancements and fixes performed for each Hazelcast release.*

<br></br>

|Chapter|Section|Description|
|:-------|:-------|:-----------|
|[Chapter 7 - Rolling Member Upgrades](#rolling-member-upgrades)||Added as a new chapter.
|[Chapter 8 - Distributed Data Structures](#distributed-data-structures)|[Ringbuffer](#ringbuffer)|Added [Ringbuffer with Persistent Datastore](#ringbuffer-with-persistent-datastore) as a new section.
|||Added [Overview of Hazelcast Distributed Objects](#overview-of-hazelcast-distributed-objects), [Loading and Destroying a Distributed Object](#loading-and-destroying-a-distributed-object) and [Controlling Partitions](#controlling-partitions) as new sections.  
|[Chapter 10 - Distributed Computing](#distributed-computing)|[Entry Processor](#entry-processor)| Added a warning to the introduction.
|[Chapter 11 - Distributed Query](#distributed-query)||Explanation for the `__key` attribute added under [Querying with SQL](#querying-with-sql) section.
||[Fast-Aggregations](#fast-aggregations)|Added as a new section.
||[Projections](#projections)|Added as a new section.
|[Chapter 15 - Storage](#storage)|[Hot Restart Persistence](#hot-restart-persistence)|Added example scenarios to give more idea on how the restart process and force start works.<br></br> Added the new configuration element `parallelism`. <br></br> Added the new section Moving/Copying Hot Restart Data. <br></br> Added the new section Partial Start and the new configuration element `cluster-data-recovery-policy`.
||[Hazelcast Striim](#hazelcast-striim)| Added as a new section.
|[Chapter 19 - Management](#management)|[Diagnostics](#diagnostics)|Added as a new section to explain the diagnostic utility of Hazelcast.|
|||Partial start related content added to [Using REST API for Cluster Management](#using-rest-api-for-cluster-management) and [Using the Script cluster.sh](#using-the-script-clustersh) sections.
||[Using the Script cluster.sh](#using-the-script-clustersh)| Updated by adding new operations and parameters related to Rolling Member Upgrade procedures.
|[Chapter 21 - Performance](#performance)|[Near Cache](#near-cache)|Added as a new section to consolidate all near cache related content in the Reference Manual.|
|[Chapter 22 - Hazelcast Simulator](#hazelcast-simulator)||Moved the content to Simulator's own GitHub repository at [Hazelcast Simulator](https://github.com/hazelcast/hazelcast-simulator/blob/master/README.md).|
|[Chapter 27 - System Properties](#system-properties)||Added definitions for the following new properties: <br></br>- `hazelcast.compatibility.3.6.server` and `hazelcast.compatibility.3.6.client`: Please refer to the [Upgrading from 3.x section](#upgrading-from-3-x).<br></br> - `hazelcast.http.healthcheck.enabled`: Enabler for A simple HTTP based health check utility. Please refer to the [System Properties chapter](#system-properties).  |
|[Chapter 30 - FAQ](#frequently-asked-questions)||Added new questions/answers.|
|[Chapter 31 - Glossary](#glossary)||Added new glossary items.|



<br> </br>
