
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
 * Cost of map & Near Cache  & backup in bytes.
 * todo: in object mode, object size is zero.
 */
long getHeapCost();
```

