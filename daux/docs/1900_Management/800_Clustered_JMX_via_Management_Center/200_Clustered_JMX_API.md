
The management beans are exposed with the following object name format.

`ManagementCenter[`*cluster name*`]:type=<`*object type*`>,name=<`*object name*`>,member="<`*cluster member IP address*`>"`

Object name starts with `ManagementCenter` prefix. Then it has the cluster name in brackets followed by a colon. After that, `type`,`name` and `member` attributes follows, each separated with a comma.

-	`type` is the type of object. Values are `Clients`, `Executors`, `Maps`, `Members`, `MultiMaps`, `Queues`, `Services`, and `Topics`.

-	`name` is the name of object.

-	`member` is the member address of object (only required if the statistics are local to the member).


A sample bean is shown below.

```
ManagementCenter[dev]:type=Services,name=OperationService,member="192.168.2.79:5701"
```


Here is the list of attributes that are exposed from the Clustered JMX interface.

* **ManagementCenter[ClusterName]**
* Clients
 * Address
 * ClientType
 * Uuid
*  Executors
 * Cluster
  * Name
  * StartedTaskCount
  * CompletedTaskCount
  * CancelledTaskCount
  * PendingTaskCount
*  Maps
  * Cluster
  * Name
  * BackupEntryCount
  * BackupEntryMemoryCost
  * CreationTime
  * DirtyEntryCount
  * Events
  * GetOperationCount
  * HeapCost
  * Hits
  * LastAccessTime
  * LastUpdateTime
  * LockedEntryCount
  * MaxGetLatency
  * MaxPutLatency
  * MaxRemoveLatency
  * OtherOperationCount
  * OwnedEntryCount
  * PutOperationCount
  * RemoveOperationCount
*  ReplicatedMaps
  * Cluster
  * Name
  * BackupEntryCount
  * BackupEntryMemoryCost
  * CreationTime
  * DirtyEntryCount
  * Events
  * GetOperationCount
  * HeapCost
  * Hits
  * LastAccessTime
  * LastUpdateTime
  * LockedEntryCount
  * MaxGetLatency
  * MaxPutLatency
  * MaxRemoveLatency
  * OtherOperationCount
  * OwnedEntryCount
  * PutOperationCount
  * RemoveOperationCount
*  Members
  * ConnectedClientCount
  * HeapFreeMemory
  * HeapMaxMemory
  * HeapTotalMemory
  * HeapUsedMemory
  * IsMaster
  * OwnedPartitionCount
*  MultiMaps
  * Cluster
  * Name
  * BackupEntryCount
  * BackupEntryMemoryCost
  * CreationTime
  * DirtyEntryCount
  * Events
  * GetOperationCount
  * HeapCost
  * Hits
  * LastAccessTime
  * LastUpdateTime
  * LockedEntryCount
  * MaxGetLatency
  * MaxPutLatency
  * MaxRemoveLatency
  * OtherOperationCount
  * OwnedEntryCount
  * PutOperationCount
  * RemoveOperationCount
*  Queues
  * Cluster
  * Name
  * MinAge
  * MaxAge
  * AvgAge
  * OwnedItemCount
  * BackupItemCount
  * OfferOperationCount
  * OtherOperationsCount
  * PollOperationCount
  * RejectedOfferOperationCount
  * EmptyPollOperationCount
  * EventOperationCount
  * CreationTime
*  Services
  * ConnectionManager
    * ActiveConnectionCount
    * ClientConnectionCount
    * ConnectionCount
  * EventService
    * EventQueueCapacity
    * EventQueueSize
    * EventThreadCount
  * OperationService
    * ExecutedOperationCount
    * OperationExecutorQueueSize
    * OperationThreadCount
    * RemoteOperationCount
    * ResponseQueueSize
    * RunningOperationsCount
  * PartitionService
    * ActivePartitionCount
    * PartitionCount
  * ProxyService
    * ProxyCount
  * ManagedExecutor[hz::async]
    * Name
    * CompletedTaskCount
    * MaximumPoolSize
    * PoolSize
    * QueueSize
    * RemainingQueueCapacity
    * Terminated
  * ManagedExecutor[hz::client]
    * Name
    * CompletedTaskCount
    * MaximumPoolSize
    * PoolSize
    * QueueSize
    * RemainingQueueCapacity
    * Terminated
  * ManagedExecutor[hz::global-operation]
    * Name
    * CompletedTaskCount
    * MaximumPoolSize
    * PoolSize
    * QueueSize
    * RemainingQueueCapacity
    * Terminated
  * ManagedExecutor[hz::io]
    * Name
    * CompletedTaskCount
    * MaximumPoolSize
    * PoolSize
    * QueueSize
    * RemainingQueueCapacity
    * Terminated
  * ManagedExecutor[hz::query]
    * Name
    * CompletedTaskCount
    * MaximumPoolSize
    * PoolSize
    * QueueSize
    * RemainingQueueCapacity
    * Terminated
  * ManagedExecutor[hz::scheduled]
    * Name
    * CompletedTaskCount
    * MaximumPoolSize
    * PoolSize
    * QueueSize
    * RemainingQueueCapacity
    * Terminated
  * ManagedExecutor[hz::system]
    * Name
    * CompletedTaskCount
    * MaximumPoolSize
    * PoolSize
    * QueueSize
    * RemainingQueueCapacity
    * Terminated  
*  Topics
  * Cluster
  * Name
  * CreationTime
  * PublishOperationCount
  * ReceiveOperationCount


