

#### Configuring Client Near Cache


The Hazelcast distributed map supports a local Near Cache for remotely stored entries to increase the performance of local read operations. Since the client always requests data from the cluster members, it can be helpful in some use cases to configure a Near Cache on the client side. Please refer to the [Near Cache section](/19_Performance/04_Near_Cache) for a detailed explanation of the Near Cache feature and its configuration.


#### Configuring Client Groups


Clients should provide a group name and password in order to connect to the cluster.
You can configure them using `GroupConfig`, as shown below.

```java
clientConfig.setGroupConfig(new GroupConfig("dev","dev-pass"));
```


#### Configuring Client Security


In the cases where the security established with `GroupConfig` is not enough and you want your clients connecting securely to the cluster, you can use `ClientSecurityConfig`. This configuration has a `credentials` parameter to set the IP address and UID. Please see `ClientSecurityConfig.java` in our code.

#### Configuring Client Serialization

For the client side serialization, use Hazelcast member configuration. Please refer to the [Serialization chapter](/16_Serialization).

#### Configuring Executor Pool Size



Hazelcast has an internal executor service (different from the data structure *Executor Service*) that has threads and queues to perform internal operations such as handling responses. This parameter specifies the size of the pool of threads which perform these operations laying in the executor's queue. If not configured, this parameter has the value as **5 \* *core size of the client*** (i.e. it is 20 for a machine that has 4 cores).

#### Configuring Class Loaders


You can configure a custom `classLoader`. It will be used by the serialization service and to load any class configured in configuration, such as event listeners or ProxyFactories.

#### Configuring Reliable Topic at Client Side

Normally when a client uses a Hazelcast data structure, that structure is configured at the member side and the client makes use of that configuration. For the Reliable Topic structure, this is not the case; since it is backed by Ringbuffer, you should configure it at the client side. The class used for this configuration is `ClientReliableTopicConfig`.

Here is an example programmatic configuration snippet:

```java
Config config = new Config();
RingbufferConfig ringbufferConfig = new RingbufferConfig("default");
ringbufferConfig.setCapacity(10000000)
                .setTimeToLiveSeconds(5);
config.addRingBufferConfig(ringbufferConfig);

ClientConfig clientConfig = new ClientConfig();
ClientReliableTopicConfig topicConfig = new ClientReliableTopicConfig("default");
clientConfig.addReliableTopicConfig(topicConfig);

HazelcastInstance hz = Hazelcast.newHazelcastInstance(config);
HazelcastInstance client = HazelcastClient.newHazelcastClient(clientConfig);
ITopic topic = client.getReliableTopic(topicConfig.getName());
```

Note that, when you create a Reliable Topic structure at your client, a Ringbuffer (with the same name as the Reliable Topic) is automatically created at the member side, with its default configuration. Please see the [Configuring Ringbuffer section](/800_Distributed_Data_Structures/600_Ringbuffer/100_Configuring_Ringbuffer.md) for the defaults. You can edit that configuration according to your needs.