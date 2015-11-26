

### Considerations for Replicated Map

Replicated map has an anti-entropy system, which will converge values to a common one if some of the members are missing replication updates.

Replicated map does not guarantee eventual consistency because there are some edge cases which fails to provide consistency.

Replicated map uses internal partition system of Hazelcast in order to serialize updates happening on the same key at the same time. This happens by sending updates of the same key to the same Hazelcast member in the cluster.

Due to asynchronous nature of replication, a Hazelcast member could die before successfully replicating a "write" operation to other members, after sending the "write completed" response to it's caller during the write process. In this scenario, Hazelcast's internal partition system will promote one of the replicas of the partition as the primary one. The new primary partition will not have the latest "write" since the died member could not successfully replicate the update. This will leave the system in a state that the caller is the only one that has the update and the rest of the cluster have not. In this case even the anti-entropy system simply could not converge the value since the source of true information is lost for the update. This leads to a break in the eventual consistency because different values can be read from the system for the same key.

Other than the aforementioned scenario, it will behave like an eventually consistent system with read-your-writes consistency.
