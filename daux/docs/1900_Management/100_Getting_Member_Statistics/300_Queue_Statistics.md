
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