## Cluster Events


### Listening for Member Events

The Membership Listener interface has methods that are invoked for the following events.

- `memberAdded`: A new member is added to the cluster.
- `memberRemoved`: An existing member leaves the cluster.
- `memberAttributeChanged`: An attribute of a member is changed. Please refer to [Defining Member Attributes](#defining-member-attributes) to learn about member attributes.

To write a Membership Listener class, you implement the MembershipListener interface and its methods.

The following is an example Membership Listener class.

```java
public class ClusterMembershipListener implements MembershipListener {

  public void memberAdded(MembershipEvent membershipEvent) {
    System.err.println("Added: " + membershipEvent);
  }

  public void memberRemoved(MembershipEvent membershipEvent) {
    System.err.println("Removed: " + membershipEvent);
  }

  public void memberAttributeChanged(MemberAttributeEvent memberAttributeEvent) {
    System.err.println("Member attribute changed: " + memberAttributeEvent);
  }
}
```

When a respective event is fired, the membership listener outputs the addresses of the members that joined and left, and also which attribute changed on which member.

#### Registering Membership Listeners

After you create your class, you can configure your cluster to include the membership listener. Below is an example using the method `addMembershipListener`.

```java
HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
hazelcastInstance.getCluster().addMembershipListener( new ClusterMembershipListener() );
```

With the above approach, there is the possibility of missing events between the creation of the instance and registering the listener. To overcome this race condition, Hazelcast allows you to register listeners in the configuration. You can register listeners using declarative, programmatic, or Spring configuration, as shown below.

The following is an example programmatic configuration.

```java
Config config = new Config();
config.addListenerConfig(
new ListenerConfig( "com.your-package.ClusterMembershipListener" ) );
```


The following is an example of the equivalent declarative configuration. 

```xml
<hazelcast>
   ...
   <listeners>
      <listener>
         com.your-package.ClusterMembershipListener
      </listener>
   </listeners>
   ...
</hazelcast>
```

The following is an example of the equivalent Spring configuration.

```
<hz:listeners>
 <hz:listener class-name="com.your-package.ClusterMembershipListener"/>
 <hz:listener implementation="MembershipListener"/>
</hz:listeners>
```



### Listening for Distributed Object Events

The Distributed Object Listener methods `distributedObjectCreated` and `distributedObjectDestroyed` are invoked when a distributed object is created and destroyed throughout the cluster. To write a Distributed Object Listener class, you implement the DistributedObjectListener interface and its methods.

The following is an example Distributed Object Listener class.


```java
public class SampleDistObjListener implements DistributedObjectListener {

  @Override
  public void distributedObjectCreated(DistributedObjectEvent event) {
    DistributedObject instance = event.getDistributedObject();
    System.out.println("Created " + instance.getName() + ", service=" + instance.getServiceName());
  }

  @Override
  public void distributedObjectDestroyed(DistributedObjectEvent event) {
    System.out.println("Destroyed " + event.getObjectName() + ", service=" + event.getServiceName());
  }
}
```

When a respective event is fired, the distributed object listener outputs the event type, the object name and a service name (for example, for a Map object the service name is `"hz:impl:mapService"`).

#### Registering Distributed Object Listeners


After you create your class, you can configure your cluster to include distributed object listeners. Below is an example using the method `addDistributedObjectListener`. You can also see this portion in the above class creation.

```java
HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
SampleDistObjListener sample = new SampleDistObjListener();

hazelcastInstance.addDistributedObjectListener( sample );
```

With the above approach, there is the possibility of missing events between the creation of the instance and registering the listener. To overcome this race condition, Hazelcast allows you to register the listeners in the configuration. You can register listeners using declarative, programmatic, or Spring configuration, as shown below.

The following is an example programmatic configuration.

```java
config.addListenerConfig(
new ListenerConfig( "com.your-package.SampleDistObjListener" ) );
```


The following is an example of the equivalent declarative configuration. 

```xml
<hazelcast>
   ...
   <listeners>
	  <listener>
	  com.your-package.SampleDistObjListener
      </listener>
   </listeners>
   ...
</hazelcast>
```

The following is an example of the equivalent Spring configuration.

```
<hz:listeners>
   <hz:listener class-name="com.your-package.SampleDistObjListener"/>
   <hz:listener implementation="DistributedObjectListener"/>
</hz:listeners>
```




### Listening for Migration Events

The Migration Listener interface has methods that are invoked for the following events:

- `migrationStarted`: A partition migration is started.
- `migrationCompleted`: A partition migration is completed.
- `migrationFailed`: A partition migration failed.

To write a Migration Listener class, you implement the MigrationListener interface and its methods.

The following is an example Migration Listener class.


```java
public class ClusterMigrationListener implements MigrationListener {
     @Override
     public void migrationStarted(MigrationEvent migrationEvent) {
       System.err.println("Started: " + migrationEvent);
     }
    @Override
     public void migrationCompleted(MigrationEvent migrationEvent) {
       System.err.println("Completed: " + migrationEvent);
     }
     @Override
     public void migrationFailed(MigrationEvent migrationEvent) {
       System.err.println("Failed: " + migrationEvent);
     }
}     
```

When a respective event is fired, the migration listener outputs the partition ID, status of the migration, the old member and the new member. The following is an example output.

```
Started: MigrationEvent{partitionId=98, oldOwner=Member [127.0.0.1]:5701,
newOwner=Member [127.0.0.1]:5702 this} 
```

#### Registering Migration Listeners

After you create your class, you can configure your cluster to include migration listeners. Below is an example using the method `addMigrationListener`.

```java
HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();

PartitionService partitionService = hazelcastInstance.getPartitionService();
partitionService.addMigrationListener( new ClusterMigrationListener() );
```

With the above approach, there is the possibility of missing events between the creation of the instance and registering the listener. To overcome this race condition, Hazelcast allows you to register the listeners in the configuration. You can register listeners using declarative, programmatic, or Spring configuration, as shown below.

The following is an example programmatic configuration.

```java
config.addListenerConfig( 
new ListenerConfig( "com.your-package.ClusterMigrationListener" ) );
```


The following is an example of the equivalent declarative configuration. 

```xml
<hazelcast>
   ...
   <listeners>
	  <listener>
	  com.your-package.ClusterMigrationListener
      </listener>
   </listeners>
   ...
</hazelcast>
```

The following is an example of the equivalent Spring configuration.

```
<hz:listeners>
   <hz:listener class-name="com.your-package.ClusterMigrationListener"/>
   <hz:listener implementation="MigrationListener"/>
</hz:listeners>
```



### Listening for Partition Lost Events

Hazelcast provides fault-tolerance by keeping multiple copies of your data. For each partition, one of your cluster members becomes the owner and some of the other members become replica members, based on your configuration. Nevertheless, data loss may occur if a few members crash simultaneously.

Let`s consider the following example with three members: N1, N2, N3 for a given partition-0. N1 is owner of partition-0, and N2 and N3 are the first and second replicas respectively. If N1 and N2 crash simultaneously, partition-0 loses its data that is configured with less than two backups.
For instance, if we configure a map with one backup, that map loses its data in partition-0 since both owner and first replica of partition-0 have crashed. However, if we configure our map with two backups, it does not lose any data since a copy of partition-0's data for the given map
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

When a `PartitionLostEvent` is fired, the partition lost listener given above outputs the partition ID, the replica index that is lost, and the member that has detected the partition loss. The following is an example output.

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



### Listening for Lifecycle Events

The Lifecycle Listener notifies for the following events:

- `STARTING`: A member is starting.
- `STARTED`: A member started.
- `SHUTTING_DOWN`: A member is shutting down.
- `SHUTDOWN`: A member's shutdown has completed.
- `MERGING`: A member is merging with the cluster.
- `MERGED`: A member's merge operation has completed.
- `CLIENT_CONNECTED`: A Hazelcast Client connected to the cluster.
- `CLIENT_DISCONNECTED`: A Hazelcast Client disconnected from the cluster.


The following is an example Lifecycle Listener class.


```java
public class NodeLifecycleListener implements LifecycleListener {
     @Override
     public void stateChanged(LifecycleEvent event) {
       System.err.println(event);
     }
}
```

This listener is local to an individual member. It notifies the application that uses Hazelcast about the events mentioned above for a particular member. 

#### Registering Lifecycle Listeners


After you create your class, you can configure your cluster to include lifecycle listeners. Below is an example using the method `addLifecycleListener`.

```java
HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
hazelcastInstance.getLifecycleService().addLifecycleListener( new NodeLifecycleListener() );
```

With the above approach, there is the possibility of missing events between the creation of the instance and registering the listener. To overcome this race condition, Hazelcast allows you to register the listeners in the configuration. You can register listeners using declarative, programmatic, or Spring configuration, as shown below.

The following is an example programmatic configuration.

```java
config.addListenerConfig(
new ListenerConfig( "com.your-package.NodeLifecycleListener" ) );
```


The following is an example of the equivalent declarative configuration. 

```xml
<hazelcast>
   ...
   <listeners>
	  <listener>
	  com.your-package.NodeLifecycleListener
      </listener>
   </listeners>
   ...
</hazelcast>
```

The following is an example of the equivalent Spring configuration.

```
<hz:listeners>
   <hz:listener class-name="com.your-package.NodeLifecycleListener"/>
   <hz:listener implementation="LifecycleListener"/>
</hz:listeners>
```



### Listening for Clients

The Client Listener is used by the Hazelcast cluster members. It notifies the cluster members when a client is connected to or disconnected from the cluster.

To write a client listener class, you implement the `ClientListener` interface and its methods `clientConnected` and `clientDisconnected`,
which are invoked when a client is connected to or disconnected from the cluster. You can add your client listener as shown below.

```
hazelcast.getClientService().addClientListener(SampleClientListener);
```

The following is the equivalent declarative configuration.

```xml
<listeners>
   <listener>
      com.your-package.SampleClientListener
   </listener>
</listeners>
```

The following is the equivalent configuration in the Spring context.

```xml
<hz:listeners>
   <hz:listener class-name="com.your-package.SampleClientListener"/>
   <hz:listener implementation="com.your-package.SampleClientListener"/>
</hz:listeners>
```



<br></br>
![image](images/NoteSmall.jpg) ***NOTE:*** *You can also add event listeners to a Hazelcast client. Please refer to [Client Listenerconfig](#configuring-client-listeners) for the related information.*





