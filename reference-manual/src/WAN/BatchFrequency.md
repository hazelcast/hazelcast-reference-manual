
### WAN Replication Batch Frequency

When using `WanBatchReplication` if the number of WAN replication events generated does not reach [WAN Replication Batch Size](#wan-replication-batch-size),
they are sent to the target cluster after a certain amount of time is passed.

Default value of for this duration is `5` seconds.

To change the `WanBatchReplication` batch sending frequency, set `hazelcast.enterprise.wanrep.
batchfrequency.seconds` property.

You can set the property on the command line (where xxx is the batch sending frequency in seconds),

```plain
-Dhazelcast.enterprise.wanrep.batchfrequency.seconds=xxx
```

or by setting the properties inside the `hazelcast.xml` (where xxx is the requested batch sending frequency):

```xml
<hazelcast>
  <properties>
    <property name="hazelcast.enterprise.wanrep.batchfrequency.seconds">xxx</property>
  </properties>
</hazelcast>
``` 

