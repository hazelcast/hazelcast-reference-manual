
### Response Timeout

After a replication event is sent to the target cluster, the source member waits for an acknowledgement of the delivery of the event to the target.
If the confirmation is not received inside a timeout duration window, the event is resent to the target cluster. Default value of this duration is `60000` milliseconds.

You can change this duration depending on your network latency for each target cluster by modifying related `WanTargetClusterConfig`.

Below is an example of declarative configuration:

```xml
...
 <wan-replication name="my-wan-cluster">
    <target-cluster group-name="london" group-password="london-pass">
        ...
        <response-timeout-millis>70000</response-timeout-millis>
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
 targetClusterConfig.setResponseTimeoutMillis(70000);
 wanConfig.addTargetClusterConfig(targetClusterConfig)
...
``` 

