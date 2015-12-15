
### Listening for Partition Lost Events

Hazelcast provides fault-tolerance by keeping multiple copies of your data. For each partition, one of your cluster members become owner and some of the other members become replica members based on your configuration. Nevertheless, data loss may occur if a few members crash simultaneously.

Let`s consider the following example with three members: N1, N2, N3 for a given partition-0. N1 is owner of partition-0, N2 and N3 are the first and second replicas respectively. If N1 and N2 crash simultaneously, partition-0 loses its data that is configured with less than 2 backups.
For instance, if we configure a map with 1 backup, that map loses its data in partition-0 since both owner and first replica of partition-0 have crashed. However, if we configure our map with 2 backups, it does not lose any data since a copy of partition-0's data for the given map
also resides in N3. 

The Partition Lost Listener notifies for possible data loss occurrences with the information of how many replicas are lost for a partition. It listens to `PartitionLostEvent` instances. Partition lost events are dispatched per partition. 

Partition loss detection is done after a member crash is detected by the other members and the crashed member is removed from the cluster. Please note that false-positive `PartitionLostEvent` instances may be fired on the network split errors. 

#### Writing a Partition Lost Listener Class

To write a Partition Lost Listener, you implement the PartitionLostListener interface and its `partitionLost` method, which is invoked when a partition loses its owner and all backups.

The following is an example Partition Lost Listener class. 

```java
    public class ConsoleLoggingPartitionLostListener implements PartitionLostListener {
        @Override
        public void partitionLost(PartitionLostEvent event) {
            System.out.println(event);
        }
    } 
```

When a `PartitionLostEvent` is fired, the partition lost listener given above outputs the partition ID, the replica index that is lost and the member that has detected the partition loss. The following is an example output.

```
com.hazelcast.partition.PartitionLostEvent{partitionId=242, lostBackupCount=0, 
eventSource=Address[192.168.2.49]:5701}
```

#### Registering Partition Lost Listeners

After you create your class, you can configure your cluster programmatically or declaratively to include the partition lost listener. Below is an example of its programmatic configuration.

```java
HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
hazelcastInstance.getPartitionService().addPartitionLostListener( new ConsoleLoggingPartitionLostListener() );
```

The following is an example of the equivalent declarative configuration. 

```xml
<hazelcast>
   ...
  <partition-lost-listeners>
     <partition-lost-listener>
        com.your-package.ConsoleLoggingPartitionLostListener
     </partition-lost-listener>
 </partition-lost-listeners>
   ...
</hazelcast>
```


