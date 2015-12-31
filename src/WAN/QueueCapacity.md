
### WAN Replication Queue Capacity

For huge clusters or high data mutation rates, you might need to increase the replication queue size. The default queue
size for replication queues is `10000`. This means, if you have heavy put/update/remove rates, you might exceed the queue size
so that the oldest, not yet replicated, updates might get lost.
 
Queue capacity can be set for each target cluster by modifying related `WanTargetClusterConfig`.

You can change this property by XML config (where xxx is the queue capacity),

```xml
...
 <wan-replication name="my-wan-cluster">
    <target-cluster group-name="london" group-password="london-pass">
        ...
        <queue-capacity>xxx</queue-capacity>
        ...
    </target-cluster>
 </wan-replication>
...
```

or programmatically

```java
...
 WanReplicationConfig wanConfig = config.getWanReplicationConfig("my-wan-cluster");
 WanTargetClusterConfig targetClusterConfig = new WanTargetClusterConfig();
 ...
 targetClusterConfig.setQueueCapacity(xxx);
 wanConfig.addTargetClusterConfig(targetClusterConfig)
...
``` 

