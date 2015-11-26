
# Network Partitioning - Split Brain Syndrome

Imagine that you have 10-node cluster and that the network is divided into two in a way that 4 servers cannot see the other 6. As a result, you end up having two separate clusters: 4-node cluster and 6-node cluster. Members in each sub-cluster think that the other nodes are dead even though they are not. This situation is called Network Partitioning (a.k.a. *Split-Brain Syndrome*).

However, these two clusters have a combination of the 271 (using default) primary and backup partitions. It’s very likely that not all of the 271 partitions, including both primaries and backups, exist in both mini-clusters.
Therefore, from each mini-cluster’s perspective, data has been lost as some partitions no longer exist (they exist on the other segment).

