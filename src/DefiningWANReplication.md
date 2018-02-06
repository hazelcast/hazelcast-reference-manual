
### Defining WAN Replication

Hazelcast supports two different operation modes of WAN Replication:

- **Active-Passive:** This mode is mostly used for failover scenarios where you want to replicate an active cluster to one
  or more passive clusters, for the purpose of maintaining a backup.

- **Active-Active:** Every cluster is equal, each cluster replicates to all other clusters. This is normally used to connect
  different clients to different clusters for the sake of the shortest path between client and server.
  
There are two different ways of defining the WAN replication endpoints:

- Static endpoints
- Discovery SPI

You can use at most one of these when defining a single WAN publisher.

#### Defining WAN Replication Using Static Endpoints

Below is an example of declarative configuration of WAN Replication from New York cluster to target the London cluster:

```xml
<hazelcast>
...
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
              <property name="discovery.period">20</property>
              <property name="executorThreadCount">2</property>
          </properties>
      </wan-publisher>
  </wan-replication>
...
</hazelcast>
```

Following are the definitions of configuration elements:

- `name`: Name of your WAN Replication. This name is referenced in IMap or ICache configuration when you add WAN Replication for these data structures (using the element <wan-replication-ref> in the configuration of IMap or ICache).
- `group-name`: Configures target cluster's group name.
- `class-name`: Name of the class implementation for the WAN replication.
- `queue-full-behavior`: Policy to be applied when WAN Replication event queues are full.
- `queue-capacity`: Size of the queue of events. Its default value is 10000.
- `batch.size`: Maximum size of events that are sent to the target cluster in a single batch. Its default value is 500.
- `batch.max.delay.millis`: Maximum amount of time, in milliseconds, to be waited before sending a batch of events in case `batch.size` is not reached. Its default value is 1000.
- `snapshot.enabled`: When set to `true`, only the latest events (based on key) are selected and sent in a batch. Its default value is `false`.
- `response.timeout.millis`: Time in milliseconds to be waited for the acknowledgment of a sent WAN event to target cluster. Its default value is 60000.
- `ack.type`: Acknowledgment type for each target cluster.
- `endpoints`: IP addresses and ports of the cluster members for which the WAN replication is implemented. These endpoints are not necessarily the entire target cluster and WAN does not perform the discovery of other members in the target cluster. It only expects that these IP addresses (or at least some of them) are available.
- `group.password`: Configures target cluster's group password.

Other relevant properties are:
 
- `discovery.period`: Period in seconds in which WAN tries to reestablish connections to failed endpoints. Default is 10 (seconds).
- `executorThreadCount`: The number of threads that the `WanBatchReplication` executor will have. The executor is used to send WAN events to the endpoints and ideally you want to have one thread per endpoint. If this property is omitted and you have specified the `endpoints` property, this will be the case. If necessary you can manually define the number of threads that the executor will use. Once the executor has been initialized there is thread affinity between the discovered endpoints and the executor threads - all events for a single endpoint will go through a single executor thread, preserving event order. It is important to determine which number of executor threads is a good value. Failure to do so can lead to performance issues - either contention on a too small number of threads or wasted threads that will not be performing any work. 

And the following is the equivalent programmatic configuration snippet:

```java
Config config = new Config();

WanReplicationConfig wrConfig = new WanReplicationConfig();
wrConfig.setName("my-wan-cluster-batch");

WanPublisherConfig publisherConfig = new WanPublisherConfig();
publisherConfig.setGroupName("london");
publisherConfig.setClassName("com.hazelcast.enterprise.wan.replication.WanBatchReplication");
publisherConfig.setQueueFullBehavior(WANQueueFullBehavior.THROW_EXCEPTION);
publisherConfig.setQueueCapacity(1000);

Map<String, Comparable> props = publisherConfig.getProperties();
props.put("batch.size", 500);
props.put("batch.max.delay.millis", 1000);
props.put("snapshot.enabled", false);
props.put("response.timeout.millis", 60000);
props.put("ack.type", WanAcknowledgeType.ACK_ON_OPERATION_COMPLETE.toString());
props.put("endpoints", "10.3.5.1:5701,10.3.5.2:5701");
props.put("group.password", "london-pass");
props.put("discovery.period", "20");
props.put("executorThreadCount", "2");

wrConfig.addWanPublisherConfig(publisherConfig);
config.addWanReplicationConfig(wrConfig);
```

Using this configuration, the cluster running in New York will replicate to Tokyo and London. The Tokyo and London clusters should
have similar configurations if you want to run in Active-Active mode.

If the New York and London cluster configurations contain the `wan-replication` element and the Tokyo cluster does not, it means
New York and London are active endpoints and Tokyo is a passive endpoint.

#### Defining WAN Replication Using Discovery SPI

In addition to defining target cluster endpoints with static IP addresses, you can configure WAN to work with the discovery SPI and determine the endpoint IP addresses at runtime. This allows you to use WAN with endpoints on various cloud infrastructures (such as Amazon EC2) where the IP address is not known in advance. Typically you will use a readily available discovery SPI plugin such as <a href="https://github.com/hazelcast/hazelcast-aws" target="_blank">Hazelcast AWS EC2 discovery plugin</a> or similar. For more advanced cases, you can provide your own discovery SPI implementation with custom logic for determining the WAN target endpoints such as looking up the endpoints in some service registry.
 
Following is an example of setting up the WAN replication with the EC2 discovery plugin. You must have the <a href="https://github.com/hazelcast/hazelcast-aws" target="_blank">Hazelcast AWS EC2 discovery plugin</a> on the classpath.

```xml
<hazelcast>
...
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
              <property name="group.password">london-pass</property>
              <property name="discovery.period">20</property>
              <property name="maxEndpoints">5</property>
              <property name="executorThreadCount">5</property>
          </properties>
          <discovery-strategies>
              <discovery-strategy enabled="true" class="com.hazelcast.aws.AwsDiscoveryStrategy">
                  <properties>
                      <property name="access-key">test-access-key</property>
                      <property name="secret-key">test-secret-key</property>
                      <property name="region">test-region</property>
                      <property name="iam-role">test-iam-role</property>
                      <property name="host-header">ec2.test-host-header</property>
                      <property name="security-group-name">test-security-group-name</property>
                      <property name="tag-key">test-tag-key</property>
                      <property name="tag-value">test-tag-value</property>
                      <property name="connection-timeout-seconds">10</property>
                      <property name="hz-port">5702</property>
                  </properties>
              </discovery-strategy>
          </discovery-strategies>
      </wan-publisher>
  </wan-replication>
...
</hazelcast>
```

The `hz-port` property defines the port on which the target endpoint is running. The default port 5701 is used if this property is not defined. This is needed because the Amazon API which the AWS plugin uses does not provide the port on which Hazelcast is running, only the IP address. For some other discovery SPI implementations, this might not be necessary and it might discover the port as well, e.g., by looking up in a service registry. 

The other properties are the same as when using the `aws` element. In case of EC2 discovery you can configure the WAN replication using the `aws` element. You may use either of these, but not both at the same time.

```xml
<hazelcast>
...
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
              <property name="group.password">london-pass</property>
              <property name="discovery.period">20</property>
              <property name="maxEndpoints">5</property>
              <property name="executorThreadCount">5</property>
          </properties>
          <aws enabled="true">
              <access-key>my-access-key</access-key>
              <secret-key>my-secret-key</secret-key>
              <iam-role>dummy</iam-role>
              <region>us-west-1</region>
              <host-header>ec2.amazonaws.com</host-header>
              <security-group-name>hazelcast-sg</security-group-name>
              <tag-key>type</tag-key>
              <tag-value>hz-members</tag-value>
          </aws>
      </wan-publisher>
  </wan-replication>
...
</hazelcast>
```

You can refer to the [aws element](#aws-element) and the [Configuring Client for AWS](#configuring-client-for-aws) sections for the descriptions of above AWS configuration elements. Following are the definitions of additional configuration properties:

- `discovery.period`: Period in seconds in which WAN tries to discover new endpoints and reestablish connections to failed endpoints. Default is 10 (seconds).
- `maxEndpoints`: Maximum number of endpoints that WAN will connect to when using a discovery mechanism to define endpoints. Default is `Integer.MAX_VALUE`. This property has no effect when static endpoint IPs are defined using the `endpoints` property.
- `executorThreadCount`: Number of threads that the `WanBatchReplication` executor will have. The executor is used to send WAN events to the endpoints and ideally you want to have one thread per endpoint. If this property is omitted and you have specified the `endpoints` property, this will be the case. If, on the other hand, you are using WAN with the discovery SPI and you have not specified this property, the executor will be sized to the initial number of discovered endpoints. This can lead to performance issues if the number of endpoints changes in the future - either contention on a too small number of threads or wasted threads that will not be performing any work. To prevent this you can manually define the executor thread count. Once the executor has been initialized there is thread affinity between the discovered endpoints and the executor threads - all events for a single endpoint will go through a single executor thread, preserving event order.

You can also define the WAN publisher with discovery SPI using the programmatic configuration: 

```java
Config config = new Config();

WanReplicationConfig wrConfig = new WanReplicationConfig();
wrConfig.setName("my-wan-cluster-batch");

WanPublisherConfig publisherConfig = new WanPublisherConfig();
publisherConfig.setGroupName("london");
publisherConfig.setClassName("com.hazelcast.enterprise.wan.replication.WanBatchReplication");
publisherConfig.setQueueFullBehavior(WANQueueFullBehavior.THROW_EXCEPTION);
publisherConfig.setQueueCapacity(1000);

Map<String, Comparable> props = publisherConfig.getProperties();
props.put("batch.size", 500);
props.put("batch.max.delay.millis", 1000);
props.put("snapshot.enabled", false);
props.put("response.timeout.millis", 60000);
props.put("ack.type", WanAcknowledgeType.ACK_ON_OPERATION_COMPLETE.toString());
props.put("group.password", "london-pass");
props.put("discovery.period", "20");
props.put("executorThreadCount", "2");

DiscoveryConfig discoveryConfig = new DiscoveryConfig();

DiscoveryStrategyConfig discoveryStrategyConfig = new DiscoveryStrategyConfig("com.hazelcast.aws.AwsDiscoveryStrategy");
discoveryStrategyConfig.addProperty("access-key","test-access-key");
discoveryStrategyConfig.addProperty("secret-key","test-secret-key");
discoveryStrategyConfig.addProperty("region","test-region");
discoveryStrategyConfig.addProperty("iam-role","test-iam-role");
discoveryStrategyConfig.addProperty("host-header","ec2.test-host-header");
discoveryStrategyConfig.addProperty("security-group-name","test-security-group-name");
discoveryStrategyConfig.addProperty("tag-key","test-tag-key");
discoveryStrategyConfig.addProperty("tag-value","test-tag-value");
discoveryStrategyConfig.addProperty("hz-port",5702);

discoveryConfig.addDiscoveryStrategyConfig(discoveryStrategyConfig);
publisherConfig.setDiscoveryConfig(discoveryConfig);
wrConfig.addWanPublisherConfig(publisherConfig);
config.addWanReplicationConfig(wrConfig);
```


### WanBatchReplication Implementation

Hazelcast offers `WanBatchReplication` implementation for the WAN replication.

As you see in the above configuration examples, this implementation is configured using the `class-name` element (in the declarative configuration) or the method `setClassName` (in the programmatic configuration).

The implementation `WanBatchReplication` waits until:

- a pre-defined number of replication events are generated, (please refer to the [Batch Size section](#batch-size)).
- or a pre-defined amount of time is passed (please refer to the [Batch Maximum Delay section](#batch-maximum-delay)).

<br></br>
![image](images/NoteSmall.jpg)***NOTE:*** *`WanNoDelayReplication` implementation has been removed. You can still achieve this behavior by setting the batch size to `1` while configuring your WAN replication.*
<br></br>


