

## Set

Hazelcast Set is a distributed and concurrent implementation of `java.util.Set`.

* Hazelcast Set does not allow duplicate elements.
* Hazelcast Set does not preserve the order of elements.
* Hazelcast Set is a non-partitioned data structure: all the data that belongs to a set will live on one single partition in that node.
* Hazelcast Set cannot be scaled beyond the capacity of a single machine. Since the whole set lives on a single partition, storing large amount of data on a single set may cause memory pressure. Therefore, you should use multiple sets to store large amount of data; this way all the sets will be spread across the cluster, hence sharing the load.
* A backup of Hazelcast Set is stored on a partition of another node in the cluster so that data is not lost in the event of a primary node failure.
* All items are copied to the local node and iteration occurs locally.
* The equals method implemented in Hazelcast Set uses a serialized byte version of objects, as opposed to `java.util.HashSet`.

### Getting a Set and Putting Items

Use the HazelcastInstance `getSet` method to get the Set, then use the set `put` method to put items into the Set.

```java
import com.hazelcast.core.Hazelcast;
import java.util.Set;
import java.util.Iterator;

HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();

Set<Price> set = hazelcastInstance.getSet( "IBM-Quote-History" );
set.add( new Price( 10, time1 ) );
set.add( new Price( 11, time2 ) );
set.add( new Price( 12, time3 ) );
set.add( new Price( 11, time4 ) );
//....
Iterator<Price> iterator = set.iterator();
while ( iterator.hasNext() ) { 
  Price price = iterator.next(); 
  //analyze
}
```

Hazelcast Set uses `ItemListener` to listen to events which occur when items are added and removed from the Set. Please refer to the [Listening for Item Events section](#listening-for-item-events) for information on how to create an item listener class and register it.

<br></br>
***RELATED INFORMATION***

*Please refer to the [Set Configuration section](#set-configuration) for a full description of Hazelcast Distributed Set configuration.*


