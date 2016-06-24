
### Defining WAN Replication

Hazelcast supports two different operation modes of WAN Replication:

- **Active-Passive:** This mode is mostly used for failover scenarios where you want to replicate an active cluster to one
  or more passive clusters, for the purpose of maintaining a backup.

- **Active-Active:** Every cluster is equal, each cluster replicates to all other clusters. This is normally used to connect
  different clients to different clusters for the sake of the shortest path between client and server.

Below is an example of declarative configuration of WAN Replication from New York cluster to target the London and Tokyo clusters:

```xml
<hazelcast>
...
  <!-- No Delay Replication Configuration -->
  <wan-replication name="my-wan-cluster">
      <wan-publisher group-name="tokyo">
          <class-name>com.hazelcast.enterprise.wan.replication.WanNoDelayReplication</class-name>
          <queue-full-behavior>DISCARD_AFTER_MUTATION</queue-full-behavior>
          <queue-capacity>10000</queue-capacity>
          <properties> 
              <property name="group.password">tokyo-pass</property>
              <property name="response.timeout.millis">5000</property>
              <property name="ack.type">ACK_ON_OPERATION_COMPLETE</property>
              <property name="endpoints">10.2.1.1:5701, 10.2.1.2:5701</property>
          </properties>
      </wan-publisher>
  <wan-replication>

  <!-- Batch Replication Configuration -->
  <wan-replication name="my-wan-cluster-batch">
      <wan-publisher group-name="london">
          <class-name>com.hazelcast.enterprise.wan.replication.WanBatchReplication</class-name>
          <queue-full-behavior>THROW_EXCEPTION</queue-full-behavior>
          <queue-capacity>1000</queue-capacity>
          <properties>
              <property name="batch.size">500</property>
              <property name="batch.max.delay.millis">1000</property>
              <property name="snapshot.enabled">false</property>
              <property name="response.timeout.millis">60000</property>
              <property name="ack.type">ACK_ON_OPERATION_COMPLETE</property>
              <property name="endpoints">10.3.5.1:5701, 10.3.5.2:5701</property>
              <property name="group.password">london-pass</property>
          </properties>
      </wan-publisher>
  <wan-replication>
...
</hazelcast>
```

Following are the definitions of configuration elements:

- `name`: Name of your WAN Replication. This name is referenced in IMap or ICache configuration when you add WAN Replication for these data structures (using the element <wan-replication-ref> in the configuration of IMap or ICache).
- `group-name`: Configures target cluster's group name.
- `class-name`: Name of the class implementation for the WAN replication.
- `queue-full-behavior`: Policy to be applied when WAN Replication event queues are full.
- `queue-capacity`: Size of the queue of events. Its default value is 10000.
- `batch.size`: Only valid when used with `WanBatchReplication`. Maximum size of events that are sent to the target cluster in a single batch.
- `batch.max.delay.millis`: Only valid when used with `WanBatchReplication`. Maximum amount of time to be waited before sending a batch of events in case `batch.size` is not reached. 
- `snapshot.enabled`: Only valid when used with `WanBatchReplication`. When set to `true`, only the latest events (based on key) are selected and sent in a batch.
- `response.timeout.millis`: Time in milliseconds to be waited for the acknowledgment of a sent WAN event to target cluster. 
- `ack.type`: Acknowledgment type for each target cluster.
- `endpoints`: IP addresses of the cluster members for which the WAN replication is implemented.
- `group.password`: Configures target cluster's group password.



And the following is the equivalent programmatic configuration snippet:

```java
Config config = new Config();

//No delay replication config
WanReplicationConfig wrConfig = new WanReplicationConfig();
WanPublisherConfig  publisherConfig = wrConfig.getWanPublisherConfig();

wrConfig.setName("my-wan-cluster");
publisherConfig.setGroupName("tokyo");
publisherConfig.setClassName("com.hazelcast.enterprise.wan.replication.WanNoDelayReplication");

Map<String, Comparable> props = publisherConfig.getProperties();
props.put("group.password", "tokyo-pass");
props.put("endpoints", "10.2.1.1:5701, 10.2.1.2:5701");
config.addWanReplicationConfig(wrConfig);

//Batch Replication Config
WanReplicationConfig wrConfig = new WanReplicationConfig();
WanPublisherConfig  publisherConfig = wrConfig.getWanPublisherConfig();

wrConfig.setName("my-wan-cluster-batch");
publisherConfig.setGroupName("london");
publisherConfig.setClassName("com.hazelcast.enterprise.wan.replication.WanBatchReplication");

Map<String, Comparable> props = publisherConfig.getProperties();
props.put("group.password", "london-pass");
props.put("snapshot.enabled", false);
props.put("endpoints", "10.3.5.1:5701,10.3.5.2:5701"); 
config.addWanReplicationConfig(wrConfig);
```


Using this configuration, the cluster running in New York will replicate to Tokyo and London. The Tokyo and London clusters should
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

-  a pre-defined number of replication events are generated, (please refer to the [Batch Size section](#batch-size)).
- or a pre-defined amount of time is passed (please refer to the [Batch Maximum Delay section](#batch-maximum-delay)).



