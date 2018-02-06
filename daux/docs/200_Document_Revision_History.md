
This chapter lists the changes made to this document from the previous release.


![image](images/NoteSmall.jpg)***NOTE:*** *Please refer to the <a href="http://docs.hazelcast.org/docs/release-notes/" target="_blank">Release Notes</a> for the new features, enhancements and fixes performed for each Hazelcast IMDG release.*


|Chapter/Section|Description|
|:-------|:-----------|
| Distributed Data Structures and <br> Distributed Computing| Added content for new quorum aware data structures: IExecutorService, DurableExecutorService, IScheduledExecutorService, MultiMap, ISet, IList, Ringbuffer, Replicated Map, Cardinality Estimator, IAtomicLong, IAtomicReference, ISemaphore, ICountdownLatch.
|[FlakeIdGenerator](/800_Distributed_Data_Structures/1450_FlakeIdGenerator.md)| Added a new section.
|[Configuring Query Thread Pool](/1100_Distributed_Query/100_How_Distributed_Query_Works/600_Configuring_Query_Thread_Pool.md)|Added "Query Requests from Clients" as a new section.|
|[Entry Processor](/1000_Distributed_Computing/400_Entry_Processor)|Added [Respecting Locks on Single Keys](/1000_Distributed_Computing/400_Entry_Processor/100_Performing_Fast_In-Memory_Map_Operations.md) as a new section.
| [Hazelcast JCache](/1300_Hazelcast_JCache)|Added Supported JCache Versions as a new section.
| [Hazelcast Clients](/1600_Hazelcast_Clients/100_Java_Client)| Added [Configuring Reliable Topic at Client Side](/1600_Hazelcast_Clients/100_Java_Client/300_Configuration/800_Other_Configurations.md) as a new section.|
|[System Properties](/2700_System_Properties)|Added definitions for the following new properties: <br> - hazelcast.partition.migration.fragments.enabled <br> - hazelcast.mastership.claim.member.list.version.increment