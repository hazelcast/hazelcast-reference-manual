
## Replicated Map

A replicated map is a distributed key-value data structure where the data is replicated to all members in the cluster.

### Replicating Instead of Partitioning

All other data structures are partitioned in design. A replicated map does not partition data
(it does not spread data to different cluster members); instead, it replicates the data to all members.

This leads to higher memory consumption. However, a replicated map has faster read and write access since the data are available on all members.

Writes could take place on local/remote members in order to provide write-order, eventually being replicated to all other members.

Replicated map is suitable for objects, catalogue data, or idempotent calculable data (like HTML pages).

Replicated map nearly fully implements the `java.util.Map` interface, but it lacks the methods from `java.util.concurrent.ConcurrentMap` since
there are no atomic guarantees to writes or reads.

![image](images/NoteSmall.jpg) ***NOTE:*** *If Replicated Map is used from a dummy client and this dummy client is connected to a lite member, the entry listeners cannot be registered/de-registered.*

![image](images/NoteSmall.jpg) ***NOTE:*** *You cannot use Replicated Map from a lite member. A `com.hazelcast.replicatedmap.ReplicatedMapCantBeCreatedOnLiteMemberException` is thrown if `com.hazelcast.core.HazelcastInstance#getReplicatedMap(name)` is invoked on a lite member.*


### Example Replicated Map Code

Here is an example of replicated map code. The HazelcastInstance `getReplicatedMap` methods gets the replicated map, and the replicated map `put` creates map entries.

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
