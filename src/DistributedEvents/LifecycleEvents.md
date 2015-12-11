
### Listening for Lifecycle Events

The Lifecycle Listener notifies for the following events:

- `STARTING`: A member is starting.
- `STARTED`: A member started.
- `SHUTTING_DOWN`: A member is shutting down.
- `SHUTDOWN`: A member's shutdown has completed.
- `MERGING`: A member is merging with the cluster.
- `MERGED`: A member's merge operation has completed.
- `CLIENT_CONNECTED`: A Hazelcast Client connected to the cluster.
- `CLINET_DISCONNECTED`: A Hazelcast Client disconnected from the cluster.


The following is an example Lifecycle Listener class.


```java
public class NodeLifecycleListener implements LifecycleListener {
     @Override
     public void stateChanged(LifecycleEvent event) {
       System.err.println(event);
     }
}
```

This listener is local to an individual member (node). It notifies the application that uses Hazelcast about the events mentioned above for a particular member. 

#### Adding Lifecycle Listeners

After you create your class, you can configure your cluster programmatically or declaratively to include the lifecycle listener. Below is an example of its programmatic configuration.

```java
HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
hazelcastInstance.getLifecycleService().addLifecycleListener( new NodeLifecycleListener() );
```

The following is an example of the equivalent declarative configuration. 

```xml
<hazelcast>
   ...
   <listeners>
      <listener type="membership-listener">
         com.your-package.NodeLifecycleListener
      </listener>
   </listeners>
   ...
</hazelcast>
```



