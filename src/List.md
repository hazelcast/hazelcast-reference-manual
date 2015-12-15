

## List

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


Hazelcast List uses `ItemListener` to listen to events which occur when items are added to and removed from the List. Please refer to the [Listening for Item Events section](#listening-for-item-events) for information on how to create an item listener class and register it.

<br></br>
***RELATED INFORMATION***


*Please refer to the [List Configuration section](#list-configuration) for a full description of Hazelcast Distributed List configuration.*


