
Hazelcast List is similar to Hazelcast Set, but Hazelcast List also allows duplicate elements.

* Besides allowing duplicate elements, Hazelcast List preserves the order of elements.
* Hazelcast List is a non-partitioned data structure where values and each backup are represented by their own single partition.
* Hazelcast List cannot be scaled beyond the capacity of a single machine.
* All items are copied to local and iteration occurs locally.

### Getting a List and Putting Items

Use the HazelcastInstance `getList` method to get the list, then use the list `put` method to put items into the List.

```java
import com.hazelcast.core.Hazelcast;
import java.util.List;
import java.util.Iterator;

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


Hazelcast List uses `ItemListener` to listen to events that occur when items are added to and removed from the List. Please refer to the [Listening for Item Events section](/07_Distributed_Events/200_Distributed_Object_Events/07_Listening_for_Item_Events.md) for information on how to create an item listener class and register it.

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
</list>
```

**Programmatic:**

```java
Config config = new Config();
CollectionConfig collectionList = config.getListConfig();
collectionList.setName( "MyList" ).setBackupCount( "1" )
        .setMaxSize( "10" );
```
   

List configuration has the following elements.


- `statistics-enabled`: True (default) if statistics gathering is enabled on the list, false otherwise.
- `backup-count`: Number of synchronous backups. List is a non-partitioned data structure, so all entries of a List reside in one partition. When this parameter is '1', there will be one backup of that List in another member in the cluster. When it is '2', two members will have the backup.
- `async-backup-count`: Number of asynchronous backups.
- `max-size`: The maximum number of entries for this List.
- `item-listeners`: Lets you add listeners (listener classes) for the list items. You can also set the attribute `include-value` to `true` if you want the item event to contain the item values, and you can set the attribute `local` to `true` if you want to listen the items on the local member.




