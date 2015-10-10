

# Management

This chapter provides information on managing and monitoring your Hazelcast cluster. It gives detailed instructions related to gathering statistics, monitoring via JMX protocol, and managing the cluster with useful utilities. It also explains how to use Hazelcast Management Center.


## Getting Member Statistics from Distributed Data Structures

You can get various statistics from your distributed data structures via the Statistics API.
Since the data structures are distributed in the cluster, the Statistics API provides
statistics for the local portion (1/Number of Members in the Cluster) of data on each member (or node). 

### Map Statistics

To get local map statistics, use the `getLocalMapStats()` method from the `IMap` interface. This method returns a
`LocalMapStats` object that holds local map statistics.

Below is example code where the `getLocalMapStats()` method and the `getOwnedEntryCount()` method get the number of entries owned by this member.

```java
HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
IMap<String, Customer> customers = hazelcastInstance.getMap( "customers" );
LocalMapStats mapStatistics = customers.getLocalMapStats;
System.out.println( "number of entries owned on this node = "
    + mapStatistics.getOwnedEntryCount() );
```

Below is the list of metrics that you can access via the `LocalMapStats` object.

```java
/**
 * Returns the number of entries owned by this member.
 */
long getOwnedEntryCount();

/**
 * Returns the number of backup entries hold by this member.
 */
long getBackupEntryCount();

/**
 * Returns the number of backups per entry.
 */
int getBackupCount();

/**
 * Returns memory cost (number of bytes) of owned entries in this member.
 */
long getOwnedEntryMemoryCost();

/**
 * Returns memory cost (number of bytes) of backup entries in this member.
 */
long getBackupEntryMemoryCost();

/**
 * Returns the creation time of this map on this member.
 */
long getCreationTime();

/**
 * Returns the last access (read) time of the locally owned entries.
 */
long getLastAccessTime();

/**
 * Returns the last update time of the locally owned entries.
 */
long getLastUpdateTime();

/**
 * Returns the number of hits (reads) of the locally owned entries.
 */
long getHits();

/**
 * Returns the number of currently locked locally owned keys.
 */
long getLockedEntryCount();

/**
 * Returns the number of entries that the member owns and are dirty (updated
 * but not persisted yet).
 * dirty entry count is meaningful when there is a persistence defined.
 */
long getDirtyEntryCount();

/**
 * Returns the number of put operations.
 */
long getPutOperationCount();

/**
 * Returns the number of get operations.
 */
long getGetOperationCount();

/**
 * Returns the number of Remove operations.
 */
long getRemoveOperationCount();

/**
 * Returns the total latency of put operations. To get the average latency,
 * divide by number of puts
 */
long getTotalPutLatency();

/**
 * Returns the total latency of get operations. To get the average latency,
 * divide by the number of gets.
 */
long getTotalGetLatency();

/**
 * Returns the total latency of remove operations. To get the average latency,
 * divide by the number of gets.
 */
long getTotalRemoveLatency();

/**
 * Returns the maximum latency of put operations. To get the average latency,
 * divide by the number of puts.
 */
long getMaxPutLatency();

/**
 * Returns the maximum latency of get operations. To get the average latency,
 * divide by the number of gets.
 */
long getMaxGetLatency();

/**
 * Returns the maximum latency of remove operations. To get the average latency,
 * divide by the number of gets.
 */
long getMaxRemoveLatency();

/**
 * Returns the number of Events Received.
 */
long getEventOperationCount();

/**
 * Returns the total number of Other Operations.
 */
long getOtherOperationCount();

/**
 * Returns the total number of total operations.
 */
long total();

/**
 * Cost of map & near cache & backup in bytes.
 * todo: in object mode, object size is zero.
 */
long getHeapCost();

/**
 * Returns statistics related to the Near Cache.
 */
NearCacheStats getNearCacheStats();
```

#### Near Cache Statistics

To get Near Cache statistics, use the `getNearCacheStats()` method from the `LocalMapStats` object.
This method returns a `NearCacheStats` object that holds Near Cache statistics.

Below is example code where the `getNearCacheStats()` method and the `getRatio` method from `NearCacheStats` get a Near Cache hit/miss ratio. 

```java
HazelcastInstance node = Hazelcast.newHazelcastInstance();
IMap<String, Customer> customers = node.getMap( "customers" );
LocalMapStats mapStatistics = customers.getLocalMapStats();
NearCacheStats nearCacheStatistics = mapStatistics.getNearCacheStats();
System.out.println( "near cache hit/miss ratio= "
    + nearCacheStatistics.getRatio() );
```
Below is the list of metrics that you can access via the `NearCacheStats` object.
This behavior applies to both client and node near caches.

```java
/**
 * Returns the creation time of this NearCache on this member
 */
long getCreationTime();

/**
 * Returns the number of entries owned by this member.
 */
long getOwnedEntryCount();

/**
 * Returns memory cost (number of bytes) of entries in this cache.
 */
long getOwnedEntryMemoryCost();

/**
 * Returns the number of hits (reads) of the locally owned entries.
 */
long getHits();

/**
 * Returns the number of misses  of the locally owned entries.
 */
long getMisses();

/**
 * Returns the hit/miss ratio  of the locally owned entries.
 */
double getRatio();
```

### Multimap Statistics

To get MultiMap statistics, use the `getLocalMultiMapStats()` method from the `MultiMap` interface.
This method returns a `LocalMultiMapStats` object that holds local MultiMap statistics.

Below is example code where the `getLocalMultiMapStats()` method and the `getLastUpdateTime` method from `LocalMultiMapStats` get the last update time.


```java
HazelcastInstance node = Hazelcast.newHazelcastInstance();
MultiMap<String, Customer> customers = node.getMultiMap( "customers" );
LocalMultiMapStats multiMapStatistics = customers.getLocalMultiMapStats();
System.out.println( "last update time =  "
    + multiMapStatistics.getLastUpdateTime() );
```
Below is the list of metrics that you can access via the `LocalMultiMapStats` object.

```java
/**
 * Returns the number of entries owned by this member.
 */
long getOwnedEntryCount();

/**
 * Returns the number of backup entries hold by this member.
 */
long getBackupEntryCount();

/**
 * Returns the number of backups per entry.
 */
int getBackupCount();

/**
 * Returns memory cost (number of bytes) of owned entries in this member.
 */
long getOwnedEntryMemoryCost();

/**
 * Returns memory cost (number of bytes) of backup entries in this member.
 */
long getBackupEntryMemoryCost();

/**
 * Returns the creation time of this map on this member.
 */
long getCreationTime();

/**
 * Returns the last access (read) time of the locally owned entries.
 */
long getLastAccessTime();

/**
 * Returns the last update time of the locally owned entries.
 */
long getLastUpdateTime();

/**
 * Returns the number of hits (reads) of the locally owned entries.
 */
long getHits();

/**
 * Returns the number of currently locked locally owned keys.
 */
long getLockedEntryCount();

/**
 * Returns the number of entries that the member owns and are dirty (updated
 * but not persisted yet).
 * Dirty entry count is meaningful when a persistence is defined.
 */
long getDirtyEntryCount();

/**
 * Returns the number of put operations.
 */
long getPutOperationCount();

/**
 * Returns the number of get operations.
 */
long getGetOperationCount();

/**
 * Returns the number of Remove operations.
 */
long getRemoveOperationCount();

/**
 * Returns the total latency of put operations. To get the average latency,
 * divide by the number of puts.
 */
long getTotalPutLatency();

/**
 * Returns the total latency of get operations. To get the average latency,
 * divide by the number of gets.
 */
long getTotalGetLatency();

/**
 * Returns the total latency of remove operations. To get the average latency,
 * divide by the number of gets.
 */
long getTotalRemoveLatency();

/**
 * Returns the maximum latency of put operations. To get the average latency,
 * divide by the number of puts.
 */
long getMaxPutLatency();

/**
 * Returns the maximum latency of get operations. To get the average latency,
 * divide by the number of gets.
 */
long getMaxGetLatency();

/**
 * Returns the maximum latency of remove operations. To get the average latency,
 * divide by the number of gets.
 */
long getMaxRemoveLatency();

/**
 * Returns the number of Events Received.
 */
long getEventOperationCount();

/**
 * Returns the total number of Other Operations.
 */
long getOtherOperationCount();

/**
 * Returns the total number of total operations.
 */
long total();

/**
 * Cost of map & near cache  & backup in bytes.
 * todo: in object mode, object size is zero.
 */
long getHeapCost();
```

### Queue Statistics

To get local queue statistics, use the `getLocalQueueStats()` method from the `IQueue` interface.
This method returns a `LocalQueueStats` object that holds local queue statistics.

Below is example code where the `getLocalQueueStats()` method and the `getAvgAge` method from `LocalQueueStats` get the average age of items.

```java
HazelcastInstance node = Hazelcast.newHazelcastInstance();
IQueue<Order> orders = node.getQueue( "orders" );
LocalQueueStats queueStatistics = orders.getLocalQueueStats();
System.out.println( "average age of items = " 
    + queueStatistics.getAvgAge() );
```

Below is the list of metrics that you can access via the `LocalQueueStats` object.

```java
/**
 * Returns the number of owned items in this member.
 */
long getOwnedItemCount();

/**
 * Returns the number of backup items in this member.
 */
long getBackupItemCount();

/**
 * Returns the min age of the items in this member.
 */
long getMinAge();

/**
 * Returns the max age of the items in this member.
 */
long getMaxAge();

/**
 * Returns the average age of the items in this member.
 */
long getAvgAge();

/**
 * Returns the number of offer/put/add operations.
 * Offers returning false will be included.
 * #getRejectedOfferOperationCount can be used
 * to get the rejected offers.
 */
long getOfferOperationCount();

/**
 * Returns the number of rejected offers. Offer
 * can be rejected because of max-size limit
 * on the queue.
 */
long getRejectedOfferOperationCount();

/**
 * Returns the number of poll/take/remove operations.
 * Polls returning null (empty) will be included.
 * #getEmptyPollOperationCount can be used to get the
 * number of polls returned null.
 */
long getPollOperationCount();

/**
 * Returns the number of null returning poll operations.
 * Poll operation might return null if the queue is empty.
 */
long getEmptyPollOperationCount();

/**
 * Returns the number of other operations.
 */
long getOtherOperationsCount();

/**
 * Returns the number of event operations.
 */
long getEventOperationCount();
```

### Topic Statistics

To get local topic statistics, use the `getLocalTopicStats()` method from the `ITopic` interface.
This method returns a `LocalTopicStats` object that holds local topic statistics.

Below is example code where the `getLocalTopicStats()` method and the `getPublishOperationCount` method from `LocalTopicStats` get the number of publish operations.


```java
HazelcastInstance node = Hazelcast.newHazelcastInstance();
ITopic<Object> news = node.getTopic( "news" );
LocalTopicStats topicStatistics = news.getLocalTopicStats();
System.out.println( "number of publish operations = " 
    + topicStatistics.getPublishOperationCount() );
```

Below is the list of metrics that you can access via the `LocalTopicStats` object.

```java
/**
 * Returns the creation time of this topic on this member.
 */
long getCreationTime();

/**
 * Returns the total number of published messages of this topic on this member.
 */
long getPublishOperationCount();

/**
 * Returns the total number of received messages of this topic on this member.
 */
long getReceiveOperationCount();
```

### Executor Statistics

To get local executor statistics, use the `getLocalExecutorStats()` method from the `IExecutorService` interface.
This method returns a `LocalExecutorStats` object that holds local executor statistics.

Below is example code where the `getLocalExecutorStats()` method and the `getCompletedTaskCount` method from `LocalExecutorStats` get the number of completed operations of the executor service.


```java
HazelcastInstance node = Hazelcast.newHazelcastInstance();
IExecutorService orderProcessor = node.getExecutorService( "orderProcessor" );
LocalExecutorStats executorStatistics = orderProcessor.getLocalExecutorStats();
System.out.println( "completed task count = " 
    + executorStatistics.getCompletedTaskCount() );
```

Below is the list of metrics that you can access via the `LocalExecutorStats` object.

```java
/**
 * Returns the number of pending operations of the executor service.
 */
long getPendingTaskCount();

/**
 * Returns the number of started operations of the executor service.
 */
long getStartedTaskCount();

/**
 * Returns the number of completed operations of the executor service.
 */
long getCompletedTaskCount();

/**
 * Returns the number of cancelled operations of the executor service.
 */
long getCancelledTaskCount();

/**
 * Returns the total start latency of operations started.
 */
long getTotalStartLatency();

/**
 * Returns the total execution time of operations finished.
 */
long getTotalExecutionLatency();
```
