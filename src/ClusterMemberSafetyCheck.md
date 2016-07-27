
### Safety Checking Cluster Members

To prevent data loss when shutting down a cluster member, Hazelcast provides a graceful shutdown feature. You perform this shutdown by calling the method `HazelcastInstance.shutdown()`. With Hazelcast version 3.7, the master node migrates all of the replicas owned by the shutdown-requesting node to the other running (not initiated shutdown) nodes in the cluster. After these migrations are completed, the shutting down node will not be owner or a backup of any partition anymore. It means that you can shutdown any number of Hazelcast nodes in a cluster concurrently with no data loss.

Please note that shutting down nodes wait for a pre-defined amount of time for the master to migrate their partition replicas. You can specify this graceful shutdown timeout duration via `hazelcast.graceful.shutdown.max.wait` and it is 10 minutes by default. If migrations are not completed within this duration, shut down may continue non-gracefully and lead to data loss. Therefore, you should choose your own timeout duration considering size of the data in your cluster.

#### Ensuring Safe State with PartitionService

As with improvements in the graceful shutdown precedure in Hazelcast version 3.7, the following methods are not needed to perform graceful shutdown. Nevertheless, you can use them to check current safety status of the partitions in your cluster.


```java
public interface PartitionService {
   ...
   ...
    boolean isClusterSafe();
    boolean isMemberSafe(Member member);
    boolean isLocalMemberSafe();
    boolean forceLocalMemberToBeSafe(long timeout, TimeUnit unit);
}
```

The method `isClusterSafe` checks whether the cluster is in a safe state. It returns `true` if there are no active partition migrations and all backups are sync for each partition.

The method `isMemberSafe` checks whether a specific member is in a safe state. This check controls if the all backups of partitions of the given member are sync with the primary ones. Once it returns `true`, the given member is safe and it can be shut down without data loss.

Similarly, the method `isLocalMemberSafe` does the same check for the local member. The method `forceLocalMemberToBeSafe` forces the owned and backup partitions to be synchronized, making the local member safe.

![image](images/NoteSmall.jpg) ***NOTE:*** *These methods are available starting with Hazelcast 3.3.*

***RELATED INFORMATION***

*For more code samples please refer to <a href="https://github.com/hazelcast/hazelcast-code-samples/tree/master/monitoring/cluster/src/main/java" target="_blank">PartitionService Code Samples</a>*.
<br></br>
