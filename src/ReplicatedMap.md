
## Replicated Map

A Replicated Map is a distributed key-value data structure where the data is replicated to all members in the cluster. It provides full replication of entries to all members for high speed access. The following are its features:

- When you have a Replicated Map in the  cluster, your clients can communicate with any cluster member.
- All cluster members are able to perform write operations.
- It supports all methods of the interface `java.util.Map`.
- It supports automatic initial fill up when a new member is started.
- It provides statistics for entry access, write and update so that you can monitor it using Hazelcast Management Center.
- New members joining to the cluster pull all the data from the existing members.
- You can listen to entry events using listeners. Please refer to [Using EntryListener on Replicated Map](#using-entrylistener-on-replicated-map). 

### Replicating Instead of Partitioning

A Replicated Map does not partition data
(it does not spread data to different cluster members); instead, it replicates the data to all members. All other data structures are partitioned in design. 

Replication leads to higher memory consumption. However, a Replicated Map has faster read and write access since the data is available on all members.

Writes could take place on local/remote members in order to provide write-order, eventually being replicated to all other members.

Replicated Map is suitable for objects, catalog data, or idempotent calculable data (such as HTML pages). It fully implements the `java.util.Map` interface, but it lacks the methods from `java.util.concurrent.ConcurrentMap` since
there are no atomic guarantees to writes or reads.

![image](images/NoteSmall.jpg) ***NOTE:*** *If Replicated Map is used from a dummy client and this dummy client is connected to a lite member, the entry listeners cannot be registered/de-registered.*

![image](images/NoteSmall.jpg) ***NOTE:*** *You cannot use Replicated Map from a lite member. A `com.hazelcast.replicatedmap.ReplicatedMapCantBeCreatedOnLiteMemberException` is thrown if `com.hazelcast.core.HazelcastInstance#getReplicatedMap(name)` is invoked on a lite member.*


### Example Replicated Map Code

Here is an example of Replicated Map code. The HazelcastInstance's `getReplicatedMap` method gets the Replicated Map, and the Replicated Map's `put` method creates map entries.

```java
import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;
import java.util.Collection;
import java.util.Map;

HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
Map<String, Customer> customers = hazelcastInstance.getReplicatedMap("customers");
customers.put( "1", new Customer( "Joe", "Smith" ) );
customers.put( "2", new Customer( "Ali", "Selam" ) );
customers.put( "3", new Customer( "Avi", "Noyan" ) );

Collection<Customer> colCustomers = customers.values();
for ( Customer customer : colCustomers ) {
  // process customer
}
```

`HazelcastInstance::getReplicatedMap` returns `com.hazelcast.core.ReplicatedMap` which, as stated above, extends the
`java.util.Map` interface.

The `com.hazelcast.core.ReplicatedMap` interface has some additional methods for registering entry listeners or retrieving values in an expected order.



### Considerations for Replicated Map

If you have a large cluster or very high occurrences of updates, the Replicated Map may not scale linearly as expected since it has to replicate update operations to all members in the cluster.

Since the replication of updates is performed in an asynchronous manner, we recommend you enable back pressure in case your system has high occurrences of updates. Please refer to the [Back Pressure](#back-pressure) section to learn how to enable it.

Replicated Map has an anti-entropy system that will converge values to a common one if some of the members are missing replication updates.

Replicated Map does not guarantee eventual consistency because there are some edge cases that fail to provide consistency.

Replicated Map uses the internal partition system of Hazelcast in order to serialize updates happening on the same key at the same time. This happens by sending updates of the same key to the same Hazelcast member in the cluster.

Due to the asynchronous nature of replication, a Hazelcast member could die before successfully replicating a "write" operation to other members after sending the "write completed" response to its caller during the write process. In this scenario, Hazelcast's internal partition system will promote one of the replicas of the partition as the primary one. The new primary partition will not have the latest "write" since the dead member could not successfully replicate the update. (This will leave the system in a state that the caller is the only one that has the update and the rest of the cluster have not.) In this case even the anti-entropy system simply could not converge the value since the source of true information is lost for the update. This leads to a break in the eventual consistency because different values can be read from the system for the same key.

Other than the aforementioned scenario, the Replicated Map will behave like an eventually consistent system with read-your-writes and monotonic-reads consistency.


### Configuration Design for Replicated Map

There are several technical design decisions you should consider when you configure a Replicated Map.

**Initial Provisioning**

If a new member joins the cluster, there are two ways you can handle the initial provisioning that is executed to replicate all existing
values to the new member. Each involves how you configure the async fill up.

First, you can configure async fill up to true, which does not block reads while the fill up operation is underway. That way,
you have immediate access on the new member, but it will take time until all the values are eventually accessible. Not yet
replicated values are returned as non-existing (null).

Second, you can configure for a synchronous initial fill up (by configuring the async fill up to false), which blocks every read or write access to the map until the
fill up operation is finished. Use this with caution since it might block your application from operating.



### Configuring Replicated Map

Replicated Map can be configured programmatically or declaratively.

#### Replicated Map Declarative Configuration

You can declare your Replicated Map configuration in the Hazelcast configuration file `hazelcast.xml`. Please see the following example.

```xml
<replicatedmap name="default">
  <in-memory-format>BINARY</in-memory-format>
  <async-fillup>true</async-fillup>
  <statistics-enabled>true</statistics-enabled>
  <entry-listeners>
    <entry-listener include-value="true">
      com.hazelcast.examples.EntryListener
    </entry-listener>
  </entry-listeners>
</replicatedmap>
```

- `in-memory-format`: Internal storage format.  Please see the [In-Memory Format section](#in-memory-format-on-replicated-map). The default value is `OBJECT`.
- `async-fillup`: Specifies whether the Replicated Map is available for reads before the initial replication is completed. The default value is `true`. If set to `false` (i.e., synchronous initial fill up), no exception will be thrown when the Replicated Map is not yet ready, but `null` values can be seen until the initial replication is completed.
- `statistics-enabled`: If set to `true`, the statistics such as cache hits and misses are collected. The default value is `true`.
- `entry-listener`: Full canonical classname of the `EntryListener` implementation.
  - `entry-listener#include-value`: Specifies whether the event includes the value or not. Sometimes the key is enough to react on an event. In those situations, setting this value to `false` will save a deserialization cycle. The default value is `true`.
  - `entry-listener#local`: Not used for Replicated Map since listeners are always local.

#### Replicated Map Programmatic Configuration

You can configure a Replicated Map programmatically, as you can do for all other data structures in Hazelcast. You must create the configuration upfront, when you instantiate the `HazelcastInstance`.
A basic example of how to configure the Replicated Map using the programmatic approach is shown in the following snippet.

```java
Config config = new Config();

ReplicatedMapConfig replicatedMapConfig =
    config.getReplicatedMapConfig( "default" );

replicatedMapConfig.setInMemoryFormat( InMemoryFormat.BINARY );
```

All properties that can be configured using the declarative configuration are also available using programmatic configuration
by transforming the tag names into getter or setter names.

#### In-Memory Format on Replicated Map

Currently, two `in-memory-format` values are usable with the Replicated Map.

- `OBJECT` (default): The data will be stored in deserialized form. This configuration is the default choice since
the data replication is mostly used for high speed access. Please be aware that changing the values without a `Map::put` is
not reflected on the other members but is visible on the changing members for later value accesses.

- `BINARY`: The data is stored in serialized binary format and has to be deserialized on every request. This
option offers higher encapsulation since changes to values are always discarded as long as the newly changed object is
not explicitly `Map::put` into the map again.



### Using EntryListener on Replicated Map

A `com.hazelcast.core.EntryListener` used on a Replicated Map serves the same purpose as it would on other
data structures in Hazelcast. You can use it to react on add, update, and remove operations. Replicated Maps do not yet support eviction.

#### Difference in EntryListener on Replicated Map

The fundamental difference in Replicated Map behavior, compared to the other data structures, is that an EntryListener only reflects
changes on local data. Since replication is asynchronous, all listener events are fired only when an operation is finished
on a local member. Events can fire at different times on different members.

#### Example of Replicated Map EntryListener

Here is a code example for using EntryListener on a Replicated Map.

The `HazelcastInstance`'s `getReplicatedMap` method gets a Replicated Map (customers), and the `ReplicatedMap`'s `addEntryListener` method adds an entry listener to the Replicated Map. Then, the `ReplicatedMap`'s `put` method adds a Replicated Map
entry and updates it. The method `remove` removes the entry.

```java
import com.hazelcast.core.EntryEvent;
import com.hazelcast.core.EntryListener;
import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.core.ReplicatedMap;

HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
ReplicatedMap<String, Customer> customers =
    hazelcastInstance.getReplicatedMap( "customers" );

customers.addEntryListener( new EntryListener<String, Customer>() {
  @Override
  public void entryAdded( EntryEvent<String, Customer> event ) {
    log( "Entry added: " + event );
  }

  @Override
  public void entryUpdated( EntryEvent<String, Customer> event ) {
    log( "Entry updated: " + event );
  }

  @Override
  public void entryRemoved( EntryEvent<String, Customer> event ) {
    log( "Entry removed: " + event );
  }

  @Override
  public void entryEvicted( EntryEvent<String, Customer> event ) {
    // Currently not supported, will never fire
  }
});

customers.put( "1", new Customer( "Joe", "Smith" ) ); // add event
customers.put( "1", new Customer( "Ali", "Selam" ) ); // update event
customers.remove( "1" ); // remove event
```
