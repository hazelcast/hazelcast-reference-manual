

## Sharding in Hazelcast

Hazelcast shards are called Partitions. By default, Hazelcast has 271 partitions. Given a key, we serialize, hash
and mode it with the number of partitions to find the partition which the key belongs to. The partitions themselves are
distributed equally among the members of the cluster. Hazelcast also creates the backups of partitions and distributes
them among members for redundancy.

<br></br>
***RELATED INFORMATION***

*Please refer to the [Data Partitioning section](#data-partitioning) for more information on how Hazelcast partitions
your data.*

