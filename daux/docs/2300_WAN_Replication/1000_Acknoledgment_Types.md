
Starting with Hazelcast 3.6, WAN replication supports different acknowledgment (ACK) types for each target cluster group.
You can choose from 2 different ACK type depending on your consistency requirements. The following ACK types are supported:
 
- `ACK_ON_RECEIPT`: A batch of replication events is considered successful as soon as it is received by the target cluster. This option does not guarantee that the received event is actually applied but it is faster.
- `ACK_ON_OPERATION_COMPLETE`: This option guarantees that the event is received by the target cluster and it is applied. It is more time consuming. But it is the best way if you have strong consistency requirements.

Following is an example configuration:

```xml
<wan-replication name="my-wan-cluster">
  <wan-publisher group-name="test-cluster-1">
    ...
    <properties>
        <property name="ack.type">ACK_ON_OPERATION_COMPLETE</property>
    </properties>
  </wan-publisher>
</wan-replication>
```

![image](../images/NoteSmall.jpg) ***NOTE:*** *`ack.type` configuration is optional. Its default value is `ACK_ON_RECEIPT`*.



