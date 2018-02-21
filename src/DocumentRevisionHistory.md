

# Document Revision History

This chapter lists the changes made to this document from the previous release.

<br>
![image](images/NoteSmall.jpg)***NOTE:*** *Please refer to the <a href="http://docs.hazelcast.org/docs/rn/" target="_blank">Release Notes</a> for the new features, enhancements and fixes performed for each Hazelcast release.*

<br></br>

|Chapter|Section|Description|
|:-------|:-------|:-----------|
| Distributed Data Structures and <br> Distributed Computing|| Added content for the data structures that now support Split-Brain Protection: IExecutorService, DurableExecutorService, IScheduledExecutorService, MultiMap, ISet, IList, Ringbuffer, Replicated Map, Cardinality Estimator, IAtomicLong, IAtomicReference, ISemaphore, ICountdownLatch.
|[Distributed Data Structures](#distributed-data-structures)|[FlakeIdGenerator](#flakeidgenerator)| Added as a new section.
||[PN-Counter](pn-counter)|Added as a new section.
|[Distributed Query](#distributed-query)|[Queries Requests from Client](#query-requests-from-clients)|Added as a new section.|
|[Distributed Computing](#distributed-computing)|[Entry Processor](#entry-processor)|Added [Respecting Locks on Single Keys](#respecting-locks-on-single-keys) as a new section.
| [Hazelcast JCache](#hazelcast-jcache)||Added [Supported JCache Versions](#supported-jcache-versions) as a new section.
|[Hazelcast Clients](#hazelcast-clients)||Added [Configuring Reliable Topic at Client Side](#configuring-reliable-topic-at-client-side) as a new section.
|[Management](#management)|| Added [Using Health Check on F5 BIG-IP LTM](#using-health-check-on-f5-big-ip-ltm) as a new section.
|[System Properties](#system-properties)||Added definitions for the new properties: <br> - hazelcast.partition.migration.fragments.enabled <br> - hazelcast.mastership.claim.member.list.version.increment |
