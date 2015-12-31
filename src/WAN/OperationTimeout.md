
### WAN Replication Response Timeout

After a replication event is sent to the target cluster, the source member waits for an acknowledgement that event has reached the target.
If confirmation is not received inside a timeout duration window, the event is resent to the target cluster.

Default value of this duration is `60000` milliseconds.

You can change this duration depending on your network latency for each target cluster by modifying related `WanTargetClusterConfig`.. 

You can change this property by XML config (where xxx is the response timeout duration in milliseconds),

```xml
...
 <wan-replication name="my-wan-cluster">
    <target-cluster group-name="london" group-password="london-pass">
        ...
        <response-timeout-millis>xxx</response-timeout-millis>
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
 targetClusterConfig.setResponseTimeoutMillis(xxx);
 wanConfig.addTargetClusterConfig(targetClusterConfig)
...
``` 

