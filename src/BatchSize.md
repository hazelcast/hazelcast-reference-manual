
### Batch Size

When `WanBatchReplication` is preferred as the replication implementation, the maximum size of events that are sent in a single batch can be changed 
depending on your needs. Default value for batch size is `500`.

Batch size can be set for each target cluster by modifying related `WanTargetClusterConfig`.

You can change this property using the declarative configuration as shown below.

```xml
...
 <wan-replication name="my-wan-cluster">
    <target-cluster group-name="london" group-password="london-pass">
        ...
        <batch-size>1000</batch-size>
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
 targetClusterConfig.setBatchSize(1000);
 wanConfig.addTargetClusterConfig(targetClusterConfig)
...
``` 

