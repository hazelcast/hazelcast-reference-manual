
To get local map statistics, use the `getLocalMapStats()` method from the `IMap` interface. This method returns a
`LocalMapStats` object that holds local map statistics.

Below is example code where the `getLocalMapStats()` method and the `getOwnedEntryCount()` method get the number of entries owned by this member.

```java
HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
IMap<String, Customer> customers = hazelcastInstance.getMap( "customers" );
LocalMapStats mapStatistics = customers.getLocalMapStats;
System.out.println( "number of entries owned on this member = "
    + mapStatistics.getOwnedEntryCount() );
```

![Note](../../images/NoteSmall.jpg) ***NOTE:*** *Starting with Hazelcast IMDG 3.8, the method  `getOwnedEntryMemoryCost()` is supported for `NATIVE` in-memory format as well.*

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
 * Cost of map & Near Cache & backup in bytes.
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
System.out.println( "Near Cache hit/miss ratio= "
    + nearCacheStatistics.getRatio() );
```

Below is the list of metrics that you can access via the `NearCacheStats` object.
This behavior applies to both client and member Near Caches.


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

