
### Queue Capacity

For huge clusters or high data mutation rates, you might need to increase the replication queue size. The default queue
size for replication queues is `10000`. This means, if you have heavy put/update/remove rates, you might exceed the queue size
so that the oldest, not yet replicated, updates might get lost. Note that a separate queue is used for each WAN Replication configured for IMap and ICache.
 
Queue capacity can be set for each target cluster by modifying related `WanTargetClusterConfig`.

You can change this property using the declarative configuration as shown below.

```xml
...
 <wan-replication name="my-wan-cluster">
    <target-cluster group-name="london" group-password="london-pass">
        ...
        <queue-capacity>15000</queue-capacity>
        ...
    </target-cluster>
 </wan-replication>
...
```

And, the following is the equivalent programmatic configuration:

```java
...
 WanReplicationConfig wanConfig = config.getWanReplicationConfig("my-wan-cluster");
 WanTargetClusterConfig targetClusterConfig = new WanTargetClusterConfig();
 ...
 targetClusterConfig.setQueueCapacity(15000);
 wanConfig.addTargetClusterConfig(targetClusterConfig)
...
``` 

