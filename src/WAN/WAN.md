# WAN

<font color="#3981DB">**Hazelcast Enterprise**</font>
<br></br>

This chapter explains how you can replicate the state of your clusters over Wide Area Network (WAN) environments.

## WAN Replication

There are cases where you need to synchronize multiple clusters to the same state. Synchronization of clusters, also known as
WAN Replication, is mainly used for replicating state of different clusters over WAN environments like
the Internet. 

Imagine you have different data centers in New York, London and Tokyo each running an independent Hazelcast cluster. Every cluster
would be operating at native speed in their own LAN (Local Area Network), but you also want some or all recordsets in
these clusters to be replicated to each other: updates in the Tokyo cluster should also replicate to London and New York, in the meantime updates
in the New York cluster are synchronized to the Tokyo and London clusters.

