

## List

Hazelcast List (IList) is similar to Hazelcast Set, but Hazelcast List also allows duplicate elements.

* Besides allowing duplicate elements, Hazelcast List preserves the order of elements.
* Hazelcast List is a non-partitioned data structure where values and each backup are represented by their own single partition.
* Hazelcast List cannot be scaled beyond the capacity of a single machine.
* All items are copied to local and iteration occurs locally.



<br>


----


![Note](images/NoteSmall.jpg) ***NOTE:*** *While IMap and ICache are the recommended data structures to be used by [Hazelcast Jet](https://jet.hazelcast.org/), IList can also be used by it for unit testing or similar non-production situations. Please see [here](http://docs.hazelcast.org/docs/jet/0.5/manual/Work_with_Jet/Source_and_Sink_Connectors/Hazelcast_IMDG.html#page_IList) in the Hazelcast Jet Reference Manual to learn how Jet can use IList, e.g., how it can fill IList with data, consume it in a Jet job, and drain the results to another IList.*

*Please also see the [Fast Batch Processing](https://jet.hazelcast.org/use-cases/fast-batch-processing/) and [Real-Time Stream Processing](https://jet.hazelcast.org/use-cases/real-time-stream-processing/) use cases for Hazelcast Jet.*
<br>

----


### Getting a List and Putting Items

Use the HazelcastInstance `getList` method to get the List, then use the `add` method to put items into the List.

```java
HazelcastInstance hz = Hazelcast.newHazelcastInstance();

List<Price> list = hz.getList( "IBM-Quote-Frequency" );
list.add( new Price( 10 ) );
list.add( new Price( 11 ) );
list.add( new Price( 12 ) );
list.add( new Price( 11 ) );
list.add( new Price( 12 ) );
        
//....
Iterator<Price> iterator = list.iterator();
while ( iterator.hasNext() ) { 
    Price price = iterator.next(); 
    //analyze
}
```


Hazelcast List uses `ItemListener` to listen to events that occur when items are added to and removed from the List. Please refer to the [Listening for Item Events section](#listening-for-item-events) for information on how to create an item listener class and register it.

### Configuring List


The following are example list configurations.

**Declarative:**

```xml
<list name="default">
   <backup-count>1</backup-count>
   <async-backup-count>0</async-backup-count>
   <max-size>10</max-size>
   <item-listeners>
      <item-listener>
          com.hazelcast.examples.ItemListener
      </item-listener>
   </item-listeners>
   <quorum-ref>quorumname</quorum-ref>
</list>
```

**Programmatic:**

```java
Config config = new Config();
CollectionConfig collectionList = config.getListConfig("MyList");
collectionList.setBackupCount(1)
              .setMaxSize(10)
              .setQuorumName( "quorumname" );
```
   

List configuration has the following elements.


- `statistics-enabled`: True (default) if statistics gathering is enabled on the list, false otherwise.
- `backup-count`: Number of synchronous backups. List is a non-partitioned data structure, so all entries of a List reside in one partition. When this parameter is '1', there will be one backup of that List in another member in the cluster. When it is '2', two members will have the backup.
- `async-backup-count`: Number of asynchronous backups.
- `max-size`: The maximum number of entries for this List.
- `item-listeners`: Lets you add listeners (listener classes) for the list items. You can also set the attribute `include-value` to `true` if you want the item event to contain the item values, and you can set the attribute `local` to `true` if you want to listen the items on the local member.
- `quorum-ref`: Name of quorum configuration that you want this List to use. You should set its value as the quorum's name, which you configured under the `quorum` element as explained in the [Split-Brain Protection section](#split-brain-protection).



