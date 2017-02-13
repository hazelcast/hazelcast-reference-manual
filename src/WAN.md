# WAN

<font color="#3981DB">**Hazelcast IMDG Enterprise**</font>

<br></br>

## WAN Replication

There could be cases where you need to synchronize multiple Hazelcast clusters to the same state. Hazelcast WAN Replication allows you to keep multiple Hazelcast clusters in sync by replicating their state over WAN environments such as the Internet.

Imagine you have different data centers in New York, London and Tokyo each running an independent Hazelcast cluster. Every cluster
would be operating at native speed in their own LAN (Local Area Network), but you also want some or all record sets in
these clusters to be replicated to each other: updates in the Tokyo cluster should also replicate to London and New York and updates
in the New York cluster are to be synchronized to the Tokyo and London clusters.

This chapter explains how you can replicate the state of your clusters over Wide Area Network (WAN) through Hazelcast WAN Replication.

<br></br>
***RELATED INFORMATION***

*You can download the white paper **Hazelcast on AWS: Best Practices for Deployment** from
<a href="http://hazelcast.com/resources/hazelcast-on-aws-best-practices-for-deployment/" target="_blank">Hazelcast.com</a>.*
