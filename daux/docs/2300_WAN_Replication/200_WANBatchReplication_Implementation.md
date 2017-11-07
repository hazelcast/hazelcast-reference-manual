
Hazelcast offers `WANBatchReplication` implementation for the WAN replication.

As you see in the above configuration examples, this implementation is configured using the `class-name` element (in the declarative configuration) or the method `setClassName` (in the programmatic configuration).

The implementation `WANBatchReplication` waits until:

-  a pre-defined number of replication events are generated, (please refer to the [Batch Size section](03_Batch_Size.md)).
- or a pre-defined amount of time is passed (please refer to the [Batch Maximum Delay section](04_Batch_Maximum_Delay.md)).

![image](../images/NoteSmall.jpg)***NOTE:*** *`WANNoDelayReplication` implementation has been removed. You can still achieve this behavior by setting the batch size to `1` while configuring your WAN replication.*


