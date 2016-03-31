
### Acknowledgment Types

Starting with 3.6, WAN replication supports different acknowledgment (ACK) types for each target cluster group.
You can choose from 2 different ACK type depending on your consistency requirements. The following ACK types are supported:
 
- `ACK_ON_RECEIPT`: Events that are received by target cluster that are considered as successful. This option does not guarantee that the received event is actually applied but it is faster.
- `ACK_ON_OPERATION_COMPLETE`: This option guarantees that the event is received by the target cluster and it is applied. It is more time consuming. But it is the best way if you have strong consistency requirements.

Following is an example configuration:

```xml
<wan-replication name="my-wan-cluster">
  <target-cluster group-name="test-cluster-1" group-password="test-pass">
    ...
    <acknowledge-type>ACK_ON_OPERATION_COMPLETE</acknowledge-type>
  </target-cluster>
</wan-replication>
```

![image](images/NoteSmall.jpg) ***NOTE:*** *`acknowledge-type` configuration is optional. Its default value is `ACK_ON_RECEIPT`*.



