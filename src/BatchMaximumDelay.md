
### Batch Maximum Delay

When using `WanBatchReplication` if the number of WAN replication events generated does not reach [Batch Size](#batch-size),
they are sent to the target cluster after a certain amount of time is passed. You can set this duration in milliseconds using this batch maximum delay configuration. Default value of for this duration is 1 second (1000 milliseconds).

Maximum delay can be set for each target cluster by modifying related `WanPublisherConfig`.

You can change this property using the declarative configuration as shown below.

```xml
...
 <wan-replication name="my-wan-cluster">
    <wan-publisher group-name="london">
        ...
        <properties>
            ...
            <property name="batch.max.delay.millis">2000</property>
            ... 
        </properties>
        ...
    </wan-publisher>
 </wan-replication>
...
```

And, the following is the equivalent programmatic configuration:

```java
...
 WanReplicationConfig wanConfig = config.getWanReplicationConfig("my-wan-cluster");
 WanPublisherConfig publisherConfig = new WanPublisherConfig();
 ...
 Map<String, Comparable> props = publisherConfig.getProperties();
 props.put("batch.max.delay.millis", 2000);
 wanConfig.addWanPublisherConfig(publisherConfig)
...
``` 

