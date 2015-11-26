
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


