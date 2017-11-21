
For huge clusters or high data mutation rates, you might need to increase the replication queue size. The default queue
size for replication queues is `10000`. This means, if you have heavy put/update/remove rates, you might exceed the queue size
so that the oldest, not yet replicated, updates might get lost. Note that a separate queue is used for each WAN Replication configured for IMap and ICache.
 
Queue capacity can be set for each target cluster by modifying related `WanPublisherConfig`.

You can change this property using the declarative configuration as shown below.

```xml
...
 <wan-replication name="my-wan-cluster">
    <wan-publisher group-name="london">
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
 WanPublisherConfig publisherConfig = new WanPublisherConfig();
 ...
 publisherConfig.setQueueCapacity(15000);
 wanConfig.addWanPublisherConfig(publisherConfig);
...
``` 

