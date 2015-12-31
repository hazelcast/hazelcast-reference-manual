
### WAN Replication Batch Size

When `WanBatchReplication` is preferred as the replication implementation, the maximum size of events that are sent in a single batch can be changed 
depending on your needs. Default value for batch size is `500`.

Batch size can be set for each target cluster by modifying related `WanTargetClusterConfig`.

You can change this property by XML config (where xxx is the maximum delay in milliseconds),

```xml
...
 <wan-replication name="my-wan-cluster">
    <target-cluster group-name="london" group-password="london-pass">
        ...
        <batch-size>xxx</batch-size>
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
 targetClusterConfig.setBatchSize(xxx);
 wanConfig.addTargetClusterConfig(targetClusterConfig)
...
``` 

