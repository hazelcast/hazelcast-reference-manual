
### Batch Maximum Delay

When using `WanBatchReplication` if the number of WAN replication events generated does not reach [Batch Size](#batch-size),
they are sent to the target cluster after a certain amount of time is passed. You can set this duration in milliseconds using this batch maximum delay configuration. Default value of for this duration is 1 second (1000 milliseconds).

Maximum delay can be set for each target cluster by modifying related `WanTargetClusterConfig`.

You can change this property using the declarative configuration as shown below.

```xml
...
 <wan-replication name="my-wan-cluster">
    <target-cluster group-name="london" group-password="london-pass">
        ...
        <batch-max-delay-millis>2000</batch-max-delay-millis>
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
 targetClusterConfig.setBatchMaxDelayMillis(2);
 wanConfig.addTargetClusterConfig(targetClusterConfig)
...
``` 

