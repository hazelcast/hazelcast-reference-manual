
# Network Partitioning - Split-Brain Syndrome

In general, network partitioning is a network failure that causes the members to split into multiple groups such that a member in a group cannot communicate with members in other groups. In a partition scenario, all sides of the original cluster will operate independently assuming members in other sides are failed. Network partitioning is also called as _Split-Brain Syndrome_.

Even though this communication failure is called as _network partitioning_, in practice a process or an entire OS that's suspending/pausing very long can cause communication interruptions. If these interruptions take long enough time to assume that the other side is crashed, the cluster splits into multiple partitions and they start operating independently. That's why any communication failure/interruption long enough can be classified as network partitioning.

Moreover, communication failures don't have to be symmetrical. A network failure can interrupt only one side of the channel or a suspended process/member may not even observe the rest as crashed. That kind of network partitioning can be called as _partial network partitioning_.

## Dealing with Network Partitions

Hazelcast handles network partitions using the following solutions:

- Split-Brain Protection (Quorums): Split-Brain Protection could be used when consistency is the major concern on a network partitioning. It requires a minimum cluster size to keep a particular data structure available. When cluster size is below the defined quorum size, then subsequent operations will be rejected with a `QuorumException`. See [Split-Brain Protection section](#split-brain-protection).

- Split-Brain Recovery (Merge Policies): Split-Brain Recovery is to make data structures available and operational on both sides of a network partition, and merge their data once the network partitioning problem is resolved. See [Split-Brain Recovery section](#split-brain-recovery).
