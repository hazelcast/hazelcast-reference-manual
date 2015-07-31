
### Configuration Design for Replicated Map

There are several technical design decisions you should consider when you configure a replicated map.

**Initial provisioning**

If a new member joins, there are two ways you can handle the initial provisioning that is executed to replicate all existing
values to the new member. Each involves how you configure for async fill up.

First, you can configure async fill up to true, which does not block reads while the fill up operation is underway. That way,
you have immediate access on the new member, but it will take time until all values are eventually accessible. Not yet
replicated values are returned as non-existing (null).
Write operations to already existing keys during this async phase can be lost, since the vector clock for an entry
might not be initialized by another member yet, and it might be seen as an old update by other members.

Second, you can configure for a synchronous initial fill up (by configuring the async fill up to false), which blocks every read or write access to the map until the
fill up operation is finished. Use this with caution since it might block your application from operating.

**Replication delay**

By default, the replication of values is delayed by 100 milliseconds when no current waiting replication is found. This collects multiple updates and minimizes the operations overhead on replication. A hard limit of 1000 replications
is built into the system to prevent `OutOfMemory` situations where you put lots of data into the replicated map in a very
short time.
You can configure the replication delay. A value of "0" means immediate replication. You can configure the trade off between
replication overhead and the time for the value to be replicated.

**Concurrency Level**

The concurrency level configuration defines the number of mutexes and segments inside the replicated map storage.
A mutex/segment is chosen by calculating the `hashCode` of the key and using the module by the concurrency level. If multiple
keys fall into the same mutex, they will wait for other mutex holders on the same mutex to finish their operation.

For a high amount of values, or for high contention on the mutexes, you can configure the concurrency level.
