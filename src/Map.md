

## Map

Hazelcast Map (`IMap`) extends the interface `java.util.concurrent.ConcurrentMap` and hence `java.util.Map`. It is the distributed implementation of Java map. You can perform operations like reading and writing from/to a Hazelcast map with the well known get and put methods.

<br>


----


![Note](images/NoteSmall.jpg) ***NOTE:*** *IMap data structure can also be used by [Hazelcast Jet](https://jet.hazelcast.org/) for Real-Time Stream Processing (by enabling the Event Journal on your map) and Fast Batch Processing. Hazelcast Jet uses IMap as a source (reads data from IMap) and as a sink (writes data to IMap). Please see the [Fast Batch Processing](https://jet.hazelcast.org/use-cases/fast-batch-processing/) and [Real-Time Stream Processing](https://jet.hazelcast.org/use-cases/real-time-stream-processing/) use cases for Hazelcast Jet.*

*Please also see [here](http://docs.hazelcast.org/docs/jet/0.5/manual/Work_with_Jet/Source_and_Sink_Connectors/Hazelcast_IMDG.html#page_IMap+and+ICache) in the Hazelcast Jet Reference Manual to learn how Jet uses IMap, i.e., how it can read from and write to IMap.*
<br>

----

### Getting a Map and Putting an Entry

Hazelcast will partition your map entries and their backups, and almost evenly distribute them onto all Hazelcast members. Each member carries approximately "number of map entries * 2 * 1/n" entries, where **n** is the number of members in the cluster. For example, if you have a member with 1000 objects to be stored in the cluster, and then you start a second member, each member will both store 500 objects and back up the 500 objects in the other member.

Let's create a Hazelcast instance and fill a map named `Capitals` with key-value pairs using the following code. Use the HazelcastInstance `getMap` method to get the map, then use the map `put` method to put an entry into the map.

```java
HazelcastInstance hzInstance = Hazelcast.newHazelcastInstance();
Map<String, String> capitalcities = hzInstance.getMap( "capitals" ); 
    capitalcities.put( "1", "Tokyo" );
    capitalcities.put( "2", "Paris" );
    capitalcities.put( "3", "Washington" );
    capitalcities.put( "4", "Ankara" );
    capitalcities.put( "5", "Brussels" );
    capitalcities.put( "6", "Amsterdam" );
    capitalcities.put( "7", "New Delhi" );
    capitalcities.put( "8", "London" );
    capitalcities.put( "9", "Berlin" );
    capitalcities.put( "10", "Oslo" );
    capitalcities.put( "11", "Moscow" );
    ...
    capitalcities.put( "120", "Stockholm" );
```

When you run this code, a cluster member is created with a map whose entries are distributed across the members' partitions. See the below illustration. For now, this is a single member cluster.

![Map Entries in a Single Member](images/1Node.png)

![image](images/NoteSmall.jpg) ***NOTE:*** *Please note that some of the partitions will not contain any data entries since we only have 120 objects and the partition count is 271 by default. This count is configurable and can be changed using the system property `hazelcast.partition.count`. Please see the [System Properties section](#system-properties).*

#### Creating A Member for Map Backup

Now let's create a second member by running the above code again. This will create a cluster with two members. This is also where backups of entries are created - remember the backup partitions mentioned in the [Hazelcast Overview section](#hazelcast-overview). The following illustration shows two members and how the data and its backup is distributed.

![Map Entries with Backups in Two Members](images/2Nodes.png)

As you see, when a new member joins the cluster, it takes ownership and loads some of the data in the cluster. Eventually, it will carry almost "(1/n `*` total-data) + backups" of the data, reducing the load on other members.

`HazelcastInstance.getMap()` returns an instance of `com.hazelcast.core.IMap` which extends 
the `java.util.concurrent.ConcurrentMap` interface. Methods like 
`ConcurrentMap.putIfAbsent(key,value)` and `ConcurrentMap.replace(key,value)` can be used 
on the distributed map, as shown in the example below.

```java
public class BasicMapOperations {
  
    private HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
    
    public Customer getCustomer(String id) {
        ConcurrentMap<String, Customer> customers = hazelcastInstance.getMap("customers");
        Customer customer = customers.get(id);
        if (customer == null) {
            customer = new Customer(id);
            customer = customers.putIfAbsent(id, customer);
        }
        return customer;
    }

    public boolean updateCustomer(Customer customer) {
        ConcurrentMap<String, Customer> customers = hazelcastInstance.getMap("customers");
        return (customers.replace(customer.getId(), customer) != null);
    }

    public boolean removeCustomer(Customer customer) {
        ConcurrentMap<String, Customer> customers = hazelcastInstance.getMap("customers");
        return customers.remove(customer.getId(), customer);
    }
}
```

All `ConcurrentMap` operations such as `put` and `remove` might wait if the key is locked by another thread in the local or remote JVM. But, they will eventually return with success. `ConcurrentMap` operations never throw a `java.util.ConcurrentModificationException`.

Also see:

- [Data Affinity section](#data-affinity).
- [Map Configuration with wildcards](#using-wildcards).

