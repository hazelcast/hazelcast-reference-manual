
Hazelcast provides the services discussed below for some common functionalities on the client side.

#### Using Distributed Executor Service

The distributed executor service is for distributed computing. It can be used to execute tasks on the cluster on a designated partition or on all the partitions. It can also be used to process entries. Please see the [Distributed Executor Service section](/08_Distributed_Computing/00_Executor_Service) for more information.

```java
IExecutorService executorService = client.getExecutorService("default");
```


After getting an instance of `IExecutorService`, you can use the instance as the interface with the one provided on the server side. Please see the [Distributed Computing chapter](/08_Distributed_Computing) for detailed usage.

![image](../../images/NoteSmall.jpg) ***NOTE:*** *This service is only supported by the Java client.*


#### Listening to Client Connection

If you need to track clients and you want to listen to their connection events, you can use the `clientConnected` and `clientDisconnected` methods of the `ClientService` class. This class must be run on the **member** side. The following is an example code.

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