


### Managing Cluster States

With the release of 3.6, Hazelcast introduces two new operations to manage the states of your cluster. These operations can be performed using the new methods `changeClusterState()` and `shutdown()` which are added to the <a href="https://github.com/hazelcast/hazelcast/blob/master/hazelcast/src/main/java/com/hazelcast/core/Cluster.java" target="_blank">Cluster interface</a>.

By changing the state of your cluster, you can allow/restrict several cluster operations or change the behavior of those operations. Hazelcast clusters have the following states:

- `ACTIVE`: This is the default cluster state. Cluster continues to operate without restrictions.
- `FROZEN`: In this state, partition table is frozen and partition assignments are not performed. Cluster does not accept new members but if an existing member leaves, it can join back. Other operations in the cluster, except migration, continue without restrictions. You cannot change the state of a cluster to FROZEN when migration/replication tasks are being performed.
- `PASSIVE`: In this state, partition table is frozen and partition assignments are not performed. Cluster does not accept new members but if an existing member leaves, it can join back. Only replication and cluster heartbeat tasks are allowed. You cannot change the state of a cluster to PASSIVE when migration/replication tasks are being performed.
- `IN_TRANSITION`: It shows that the state of the cluster is in transition. You cannot set your cluster's state as IN_TRANSITION explicitly. It is a temporary and intermediate state. During this state, cluster does not accept new members and migration/replication tasks are paused.

The following snippet is from the `Cluster` interface showing the new methods used to manage your cluster's states.


```java
public interface Cluster {
...
...
    ClusterState getClusterState();
    void changeClusterState(ClusterState newState);
    void changeClusterState(ClusterState newState, TransactionOptions transactionOptions);
    void shutdown();
    void shutdown(TransactionOptions transactionOptions);
```

Please refer to the <a href="https://github.com/hazelcast/hazelcast/blob/master/hazelcast/src/main/java/com/hazelcast/core/Cluster.java" target="_blank">Cluster interface</a> for information on these methods.