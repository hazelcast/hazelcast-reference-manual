## Java Client Overview

The Java client is the most full featured Hazelcast client. It is offered both with Hazelcast and Hazelcast Enterprise.  The main idea behind the Java client is to provide the same Hazelcast functionality by proxying each operation through a Hazelcast node. It can access and change distributed data, and it can listen to distributed events of an already established Hazelcast cluster from another Java application.


### Including Dependencies for Java Clients

You should include two dependencies in your classpath to start using the Hazelcast client: `hazelcast.jar` and `hazelcast-client.jar`.

After adding these dependencies, you can start using the Hazelcast client as if you are using the Hazelcast API. The differences are discussed in the below sections.

If you prefer to use maven, add the following lines to your `pom.xml`.

```xml
<dependency>
    <groupId>com.hazelcast</groupId>
    <artifactId>hazelcast-client</artifactId>
    <version>$LATEST_VERSION$</version>
</dependency>
<dependency>
    <groupId>com.hazelcast</groupId>
    <artifactId>hazelcast</artifactId>
    <version>$LATEST_VERSION$</version>
</dependency>
```

### Getting Started with Client API

The first step is configuration. You can configure the Java client declaratively or programmatically. We will use the programmatic approach throughout this tutorial. Please refer to the [Java Client Declarative Configuration section](#configuring-java-client) for details.

```java
ClientConfig clientConfig = new ClientConfig();
clientConfig.getGroupConfig().setName("dev").setPassword("dev-pass");
clientConfig.getNetworkConfig().addAddress("10.90.0.1", "10.90.0.2:5702");
```

The second step is to initialize the HazelcastInstance to be connected to the cluster.

```java
HazelcastInstance client = HazelcastClient.newHazelcastClient(clientConfig);
```

*This client interface is your gateway to access all Hazelcast distributed objects.*

Let's create a map and populate it with some data.

```java

IMap<String, Customer> mapCustomers = client.getMap("customers"); //creates the map proxy

mapCustomers.put("1", new Customer("Joe", "Smith"));
mapCustomers.put("2", new Customer("Ali", "Selam"));
mapCustomers.put("3", new Customer("Avi", "Noyan"));

```

As a final step, if you are done with your client, you can shut it down as shown below. This will release all the used resources and will close connections to the cluster.

```java

client.shutdown();

```

### Java Client Operation Modes

The client has two operation modes because of the distributed nature of the data and cluster.

**Smart Client**: In smart mode, clients connect to each cluster node. Since each data partition uses the well known and consistent hashing algorithm, each client can send an operation to the relevant cluster node, which increases the overall throughput and efficiency. Smart mode is the default mode.


**Dummy Client**: For some cases, the clients can be required to connect to a single node instead of to each node in the cluster. Firewalls, security, or some custom networking issues can be the reason for these cases.

In dummy client mode, the client will only connect to one of the configured addresses. This single node will behave as a gateway to the other nodes. For any operation requested from the client, it will redirect the request to the relevant node and return the response back to the client returned from this node.

### Handling Failures

There are two main failure cases you should be aware of, and configurations you can perform to achieve proper behavior.

#### Handling Client Connection Failure


While the client is trying to connect initially to one of the members in the `ClientNetworkConfig.addressList`, all the members might be not available. Instead of giving up, throwing an exception and stopping the client, the client will retry as many as `connectionAttemptLimit` times. 

You can configure `connectionAttemptLimit` for the number of times you want the client to retry connecting. Please see [Setting Connection Attempt Limit](#setting-connection-attempt-limit).

The client executes each operation through the already established connection to the cluster. If this connection(s) disconnects or drops, the client will try to reconnect as configured.


#### Handling Retry-able Operation Failure

While sending the requests to related nodes, operations can fail due to various reasons. Read-only operations are retried by default. If you want to enable retry for the other operations, set the `redoOperation` to `true`. Please see [Enabling Redo Operation](#enabling-redo-operation).

The number of retries is given with the property `hazelcast.client.request.retry.count` in `ClientProperties`. The client will resend the request as many as RETRY-COUNT, then it will throw an exception. Please see the [Client System Properties section](#client-system-properties).


### Using Supported Distributed Data Structures

Most of the Distributed Data Structures are supported by the Java client. When you use clients in other languages, you should check for the exceptions.

As a general rule, you configure these data structures on the server side and access them through a proxy on the client side.

#### Using Map with Java Client

You can use any [Distributed Map](#map) object with the client, as shown below.

```java
Imap<Integer, String> map = client.getMap(“myMap”);

map.put(1, “Ali”);
String value= map.get(1);
map.remove(1);
```

Locality is ambiguous for the client, so `addEntryListener` and `localKeySet` are not supported. Please see the [Distributed Map section](#map) for more information.

#### Using MultiMap with Java Client

A MultiMap usage example is shown below.


```java
MultiMap<Integer, String> multiMap = client.getMultiMap("myMultiMap");

multiMap.put(1,”ali”);
multiMap.put(1,”veli”);

Collection<String> values = multiMap.get(1);
```

`addEntryListener`, `localKeySet` and  `getLocalMultiMapStats` are not supported because locality is ambiguous for the client. Please see the [Distributed MultiMap section](#multimap) for more information.

#### Using Queue with Java Client

A sample usage is shown below.


```java
IQueue<String> myQueue = client.getQueue(“theQueue”);
myQueue.offer(“ali”)
```

`getLocalQueueStats` is not supported because locality is ambiguous for the client. Please see the [Distributed Queue section](#queue) for more information.

#### Using Topic with Java Client

`getLocalTopicStats` is not supported because locality is ambiguous for the client.

#### Using Other Supported Distributed Structures

The distributed data structures listed below are also supported by the client. Since their logic is the same in both the node side and client side, you can refer to their sections as listed below.

- [Replicated Map](#replicated-map)
- [MapReduce](#mapreduce)
- [List](#list)
- [Set](#set)
- [IAtomicLong](#iatomiclong)
- [IAtomicReference](#iatomicreference)
- [ICountDownLatch](#icountdownlatch)
- [ISemaphore](#isemaphore)
- [IdGenerator](#idgenerator)
- [Lock](#lock)



### Using Client Services

Hazelcast provides the services discussed below for some common functionalities on the client side.

#### Using Distributed Executor Service

The distributed executor service is for distributed computing. It can be used to execute tasks on the cluster on a designated partition or on all the partitions. It can also be used to process entries. Please see the [Distributed Executor Service section](#executor-service) for more information.

```java
IExecutorService executorService = client.getExecutorService("default");
```


After getting an instance of `IExecutorService`, you can use the instance as the interface with the one provided on the server side. Please see the [Distributed Computing chapter](#distributed-computing) chapter for detailed usage.

![image](images/NoteSmall.jpg) ***NOTE:*** *This service is only supported by the Java client.*


#### Listening to Client Connection

If you need to track clients and you want to listen to their connection events, you can use the `clientConnected` and `clientDisconnected` methods of the `ClientService` class. This class must be run on the **node** side. The following is an example code.

```java
final ClientService clientService = hazelcastInstance.getClientService();
final Collection<Client> connectedClients = clientService.getConnectedClients();

clientService.addClientListener(new ClientListener() {
    @Override
    public void clientConnected(Client client) {
	//Handle client connected event
    }

    @Override
    public void clientDisconnected(Client client) {
      //Handle client disconnected event
    }
});
```

#### Finding the Partition of a Key

You use partition service to find the partition of a key. It will return all partitions. See the example code below.

```java
PartitionService partitionService = client.getPartitionService();

//partition of a key
Partition partition = partitionService.getPartition(key);

//all partitions
Set<Partition> partitions = partitionService.getPartitions();
```


#### Handling Lifecycle

Lifecycle handling performs the following:

- checks to see if the client is running,
- shuts down the client gracefully,
- terminates the client ungracefully (forced shutdown), and
- adds/removes lifecycle listeners.


```java
LifecycleService lifecycleService = client.getLifecycleService();

if(lifecycleService.isRunning()){
    //it is running
}

//shutdown client gracefully
lifecycleService.shutdown();

```

### Client Listeners

You can configure listeners to listen to various event types on the client side. You can configure global events not relating to any distributed object through [Client ListenerConfig](#configuring-client-listeners). You should configure distributed object listeners like map entry listeners or list item listeners through their proxies. You can refer to the related sections under each distributed data structure in this reference manual.

### Client Transactions

Transactional distributed objects are supported on the client side. Please see the [Transactions chapter](#transactions) on how to use them.


