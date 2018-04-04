

## Entry Processor

Hazelcast supports entry processing. An entry processor is a function that executes your code on a map entry in an atomic way. 

An entry processor is a good option if you perform bulk processing on an `IMap`. Usually you perform a loop of keys-- executing `IMap.get(key)`, mutating the value, and finally putting the entry back in the map using `IMap.put(key,value)`.  If you perform this process from a client or from a member where the keys do not exist, you effectively perform two network hops for each update: the first to retrieve the data and the second to update the mutated value.

If you are doing the process described above, you should consider using entry processors. An entry processor executes a read and updates upon the member where the data resides.  This eliminates the costly network hops described above.

![image](images/NoteSmall.jpg) ***NOTE***: *Entry processor is meant to process a single entry per call. Processing multiple entries and data structures in an entry processor is not supported as it may result in deadlocks.*

----

![Note](images/NoteSmall.jpg) ***NOTE:*** *Note that Hazelcast Jet is a good fit when you want to perform processing that involves multiple entries (aggregations, joins, etc.), or involves multiple computing steps to be made parallel. Hazelcast Jet contains an Entry Processor Sink to allow you to update Hazelcast IMDG data as a result of your Hazelcast Jet computation. Please refer to [Hazelcast Jet's Reference Manual](http://docs.hazelcast.org/docs/jet/latest/manual/index.html#hazelcast-imap-and-icache).*

----


### Performing Fast In-Memory Map Operations

An entry processor enables fast in-memory operations on your map without you having to worry about locks or concurrency issues. You can apply it to a single map entry or to all map entries. Entry processors support choosing target entries using predicates. You do not need any explicit lock on entry thanks to the isolated threading model: Hazelcast runs the entry processor for all entries on a `partitionThread` so there will NOT be any interleaving of the entry processor and other mutations.

Hazelcast sends the entry processor to each cluster member and these members apply it to map entries. Therefore, if you add more members, your processing completes faster.

### Using Indexes

Entry processors can be used with predicates. Predicates help to process a subset of data by selecting eligible entries. This selection can happen either by doing a full-table scan or by using indexes. To accelerate entry selection step, you can consider to add indexes. If indexes are there, entry processor will automatically use them.


### Using OBJECT In-Memory Format

If entry processing is the major operation for a map and if the map consists of complex objects, you should use `OBJECT` as the `in-memory-format` to minimize serialization cost. By default, the entry value is stored as a byte array (`BINARY` format). When it is stored as an object (`OBJECT` format), then the entry processor is applied directly on the object. In that case, no serialization or deserialization is performed. However, if there is a defined event listener, a new entry value will be serialized when passing to the event publisher service.

![image](images/NoteSmall.jpg) ***NOTE***: *When `in-memory-format` is `OBJECT`, the old value of the updated entry will be null.*

### Processing Entries

The methods below are in the [IMap interface](http://docs.hazelcast.org/docs/latest/javadoc/com/hazelcast/core/IMap.html) for entry processing.

* `executeOnKey` processes an entry mapped by a key.
* `executeOnKeys` processes entries mapped by a collection of keys.
* `submitToKey` processes an entry mapped by a key while listening to event status.
* `executeOnEntries` processes all entries in a map.
* `executeOnEntries` can also process all entries in a map with a defined predicate.


When using the `executeOnEntries` method, if the number of entries is high and you need the results, then returning null with the `process()` method is a good practice. This method is offered by the [EntryProcessor interface](http://docs.hazelcast.org/docs/latest/javadoc/com/hazelcast/map/EntryProcessor.html). By returning null, results of the processing is not stored in the map and thus out of memory errors are eliminated.

If you want to execute a task on a single key, you can also use `executeOnKeyOwner` provided by [IExecutorService](http://docs.hazelcast.org/docs/latest/javadoc/com/hazelcast/core/IExecutorService.html#executeOnKeyOwner-java.lang.Runnable-java.lang.Object-). However, in this case you need to perform a lock and serialization.

![image](images/NoteSmall.jpg) ***NOTE***: *Entry processors run via Operation Threads that are dedicated to specific partitions.  Therefore, with long running entry processor executions, other partition operations such as `map.put(key)` cannot be processed. With this in mind, it is a good practice to make your entry processor executions as quick as possible.*

#### Respecting Locks on Single Keys

The entry processor respects locks ONLY when its executions are performed on a single key. As explained in the above section, the entry processor has the following methods to process a single key:

```
Object executeOnKey(K key, EntryProcessor entryProcessor);
ICompletableFuture submitToKey(K key, EntryProcessor entryProcessor);
```

Therefore, if you want to to perform an entry processor execution on a single key using one of these methods and that key has a lock on it, the execution will wait until the lock on that key is removed.


### Processing Backup Entries

If your code modifies the data, then you should also provide a processor for backup entries. This is required to prevent the primary map entries from having different values than the backups because it causes the entry processor to be applied both on the primary and backup entries. The interface [EntryBackupProcessor](http://docs.hazelcast.org/docs/latest/javadoc/com/hazelcast/map/EntryBackupProcessor.html) offers the method `processBackup` for this purpose.


![image](images/NoteSmall.jpg) ***NOTE***: *It is possible that an entry processor could see that a key exists though its backup processor may not find it at the run time due to an unsent backup of a previous operation, e.g., a previous put operation. In those situations, Hazelcast internally/eventually will synchronize those owner and backup partitions so you will not lose any data. When coding an `EntryBackupProcessor`, you should take that case into account, otherwise `NullPointerException` can be seen since `Map.Entry.getValue()` may return `null`.*
