
### Defining WAN Replication

The current WAN Replication implementation supports two different operation modes.

- **Active-Passive:** This mode is mostly used for failover scenarios where you want to replicate an active cluster to one
  or more passive clusters, for the purpose of maintaining a backup.

- **Active-Active:** Every cluster is equal, each cluster replicate to all other clusters. This is normally used to connect
  different clients to different clusters for the sake of the shortest path between client and server.

Let's see how we can declaratively configure WAN Replication from the New York cluster to target the London and Tokyo clusters:

```xml
<hazelcast>
...
  <!-- No Delay Replication Configuration -->
  <wan-replication name="my-wan-cluster">
    <target-cluster group-name="tokyo" group-password="tokyo-pass">
      <replication-impl>
         com.hazelcast.enterprise.wan.replication.WanNoDelayReplication
      </replication-impl>
      <end-points>
        <address>10.2.1.1:5701</address>
        <address>10.2.1.2:5701</address>
      </end-points>
    </target-cluster>
  </wan-replication>

  <!-- Batch Replication Configuration -->
  <wan-replication name="my-wan-cluster-batch" snapshot-enabled="false">
    <target-cluster group-name="london" group-password="london-pass">
      <replication-impl>
         com.hazelcast.enterprise.wan.replication.WanBatchReplication
      </replication-impl>
      <end-points>
        <address>10.3.5.1:5701</address>
        <address>10.3.5.2:5701</address>
      </end-points>
    </target-cluster>
  </wan-replication>
...
</hazelcast>
```

The following are the definitions for the configuration elements:

- `name`: Name for your WAN replication configuration.
- `snapshot-enabled`: Only valid when used with `WanBatchReplication`. When set to `true`, only the latest events (based on key) are selected and sent in a batch. 
- `target-cluster`: Configures target cluster's group name and password.
- `replication-impl`: Name of the class implementation for the Enterprise WAN replication.
- `end-points`: IP addresses of the cluster members for which the Enterprise WAN replication is implemented.


And the following is the equivalent programmatic configuration snippet:

```java
Config config = new Config();

//No delay replication config
WanReplicationConfig wrConfig = new WanReplicationConfig();
WanTargetClusterConfig  wtcConfig = wrConfig.getWanTargetClusterConfig();

wrConfig.setName("my-wan-cluster");
wtcConfig.setGroupName("tokyo").setGroupPassword("tokyo-pass");
wtcConfig.setReplicationImpl("com.hazelcast.enterprise.wan.replication.WanNoDelayReplication");

List<String> endpoints = new ArrayList<String>();
endpoints.add("10.2.1.1:5701");
endpoints.add("10.2.1.1:5701");
wtcConfig.setEndpoints(endpoints);
config.addWanReplicationConfig(wrConfig);

//Batch Replication Config
WanReplicationConfig wrConfig = new WanReplicationConfig();
WanTargetClusterConfig  wtcConfig = wrConfig.getWanTargetClusterConfig();

wrConfig.setName("my-wan-cluster-batch");
wrConfig.setSnapshotEnabled(false);
wtcConfig.setGroupName("london").setGroupPassword("london");
wtcConfig.setReplicationImpl("com.hazelcast.enterprise.wan.replication.WanBatchReplication");

List<String> batchEndpoints = new ArrayList<String>();
batchEndpoints.add("10.3.5.1:5701");
batchEndpoints.add("10.3.5.2:5701");
wtcConfig.setEndpoints(batchEndpoints);
config.addWanReplicationConfig(wrConfig);
```


Using this configuration, the cluster running in New York is replicating to Tokyo and London. The Tokyo and London clusters should
have similar configurations if you want to run in Active-Active mode.

If the New York and London cluster configurations contain the `wan-replication` element and the Tokyo cluster does not, it means
New York and London are active endpoints and Tokyo is a passive endpoint.

#### WAN Replication Implementations

Hazelcast offers two different WAN replication implementations: 

- `WanNoDelayReplication` 
- `WanBatchReplication`

As you see in the above configuration examples, these implementations are configured using the `replication-impl` element (in the declarative configuration) or the method `setReplicationImpl` (in the programmatic configuration).


The implementation `WanNoDelayReplication` sends replication events to the target cluster as soon as they are generated.

The implementation `WanBatchReplication`, on the other hand, waits until:

-  a pre-defined number of replication events are generated, (please refer to the [Wan Replication Batch Size section](#wan-replication-batch-size)).
- or a pre-defined amount of time is passed (please refer to the [Wan Replication Batch Frequency section](#wan-replication-batch-frequency)).



