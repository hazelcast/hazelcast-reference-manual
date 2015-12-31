
### WAN Replication Batch Maximum Delay

When using `WanBatchReplication` if the number of WAN replication events generated does not reach [WAN Replication Batch Size](#wan-replication-batch-size),
they are sent to the target cluster after a certain amount of time is passed.

Default value of for this duration is `1` seconds.

Maximum delay can be set for each target cluster by modifying related `WanTargetClusterConfig`.

You can change this property by XML config (where xxx is the maximum delay in milliseconds),

```xml
...
 <wan-replication name="my-wan-cluster">
    <target-cluster group-name="london" group-password="london-pass">
        ...
        <batch-max-delay-millis>xxx</batch-max-delay-millis>
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
 targetClusterConfig.setBatchMaxDelayMillis(xxx);
 wanConfig.addTargetClusterConfig(targetClusterConfig)
...
``` 

