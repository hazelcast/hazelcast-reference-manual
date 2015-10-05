

### Considerations for Replicated Map

Replicated map has an anti-entropy system, which will converge values to a common one if some of the nodes are missing replication updates.

Replicated map does not guarantee eventual consistency because there are some edge cases which fails to provide consistency.

Replicated map uses internal partition system of Hazelcast in order to serialize updates happening on the same key at the same time. This happens by sending updates of the same key to the same Hazelcast node in the cluster.

Due to asynchronous nature of replication, Hazelcast node could die before successfully replicating write to other nodes after sending write completed response it's caller in the write process. In this scenario, Hazelcast's internal partition system will promote one of the replicas of the partition as the primary one. The new primary partition won't have the latest write since died member couldn't successfully replicated the update. This will leave system in a state that caller is the only one has the update and rest of the cluster don't. In such case even anti-entropy system simply couldn't converge the value since source of truth information lost for the update. This leads to a break in the eventual consistency because different values can be read from the system for the same key.

Other than aforementioned scenario, it will behave like an eventually consistent system with read-your-writes consistency.
