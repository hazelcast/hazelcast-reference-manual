
### Batch Size

The maximum size of events that are sent in a single batch can be changed 
depending on your needs. Default value for batch size is `500`.

Batch size can be set for each target cluster by modifying related `WanPublisherConfig`.

Below is the declarative configuration for changing the value of the property:

```xml
...
 <wan-replication name="my-wan-cluster">
    <wan-publisher group-name="london">
        ...
        <properties>
            ...
            <property name="batch.size">1000</property>
            ...
        </properties>
        ...
    </wan-publisher>
 </wan-replication>
...
```

And, following is the equivalent programmatic configuration:

```java
...
 WanReplicationConfig wanConfig = config.getWanReplicationConfig("my-wan-cluster");
 WanPublisherConfig publisherConfig = new WanPublisherConfig();
 ...
 Map<String, Comparable> props = publisherConfig.getProperties();
 props.put("batch.size", 1000);
 wanConfig.addWanPublisherConfig(publisherConfig)
...
``` 

<br></br>
![image](images/NoteSmall.jpg)***NOTE:*** *`WanNoDelayReplication` implementation has been removed. You can still achieve this behavior by setting the batch size to `1` while configuring your WAN replication.*
<br></br>
