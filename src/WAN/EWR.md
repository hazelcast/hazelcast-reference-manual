### Replication implementations

Enterprise WAN replication has two different replication implementations. These are `WanNoDelayReplication` and `WanBatchReplication` implementations.
You can configure them using the configuration element `replication-impl`, as shown below.

```xml
<hazelcast>
  <wan-replication name="my-wan-cluster">
    <target-cluster group-name="tokyo" group-password="tokyo-pass">
      <replication-impl>com.hazelcast.enterprise.wan.replication.WanNoDelayReplication</replication-impl>
      ...
    </target-cluster>
  </wan-replication>
</hazelcast>
```

```xml
<hazelcast>
  <wan-replication name="my-wan-cluster">
    <target-cluster group-name="tokyo" group-password="tokyo-pass">
      <replication-impl>com.hazelcast.enterprise.wan.replication.WanBatchReplication</replication-impl>
      ...
    </target-cluster>
  </wan-replication>
</hazelcast>
```

`WanNoDelayReplication` sends replication events to the target cluster as soon as they are generated.
`WanBatchReplication` waits until:

-  a pre-defined number of replication events are generated, (please refer to the [Wan Replication Batch Size section](#wan-replication-batch-size)).
- or a pre-defined amount of time is passed (please refer to the [Wan Replication Batch Frequency section](#wan-replication-batch-frequency)).

