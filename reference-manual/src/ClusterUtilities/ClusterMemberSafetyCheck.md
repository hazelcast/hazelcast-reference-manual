
### Safety Checking Cluster Members

To prevent data loss when shutting down a cluster member, Hazelcast provides a graceful shutdown feature. You perform this shutdown by calling the method `HazelcastInstance.shutdown()`. Once this method is called, it checks the following conditions to ensure the member is safe to shutdown.

- There is no active migration.
- At least one backup of partitions are synced with primary ones.

Even if the above conditions are not met, `HazelcastInstance.shutdown()` will force them to be completed. When this method eventually returns, the member has been brought to a safe state and it can be shut down without any data loss. 

#### Ensuring Safe State with PartitionService

What if you want to be sure that your **cluster** is in a safe state, as in safe to shutdown without any data loss? For example, you may have some use cases like rolling upgrades, development/testing, or other logic that requires a cluster/member to be safe. 

To provide this safety, Hazelcast offers the `PartitionService` interface with the methods `isClusterSafe`, `isMemberSafe`, `isLocalMemberSafe` and `forceLocalMemberToBeSafe`. These methods can be deemed as decoupled pieces from the method `Hazelcast.shutdown`. 


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

The method `isClusterSafe` checks whether the cluster is in a safe state. It returns `true` if there are no active partition migrations and there are sufficient backups for each partition. Once it returns `true`, the cluster is safe and a node can be shut down without data loss.

The method `isMemberSafe` checks whether a specific member is in a safe state. This check controls if the first backups of partitions of the given member are synced with the primary ones. Once it returns `true`, the given member is safe and it can be shut down without data loss. 

Similarly, the method `isLocalMemberSafe` does the same check for the local member. The method `forceLocalMemberToBeSafe` forces the owned and backup partitions to be synchronized, making the local member safe.

![image](images/NoteSmall.jpg) ***NOTE:*** *These methods are available starting with Hazelcast 3.3.*


#### Example PartitionService Code


```java
PartitionService partitionService = hazelcastInstance.getPartitionService();
if (partitionService.isClusterSafe()) {
  hazelcastInstance.shutdown(); // or terminate
}
```

OR 

```java
PartitionService partitionService = hazelcastInstance.getPartitionService();
if (partitionService.isLocalMemberSafe()) {
  hazelcastInstance.shutdown(); // or terminate
}
```
<br></br>
***RELATED INFORMATION***

*For more code samples please refer to <a href="https://github.com/hazelcast/hazelcast-code-samples/tree/master/monitoring/cluster/src/main/java" target="_blank">PartitionService Code Samples</a>*.
<br></br>