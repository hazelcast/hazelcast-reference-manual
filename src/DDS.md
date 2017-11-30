

# Distributed Data Structures

As mentioned in the [Overview section](#hazelcast-overview), Hazelcast offers distributed implementations of Java interfaces. Below is the list of these implementations with links to the corresponding sections in this manual.

- **Standard utility collections**

	- [Map](#map) is the distributed implementation of `java.util.Map`. It lets you read from and write to a Hazelcast map with methods such as `get` and `put`.
	- [Queue](#queue) is the distributed implementation of `java.util.concurrent.BlockingQueue`. You can add an item in one member and remove it from another one.
	- [Ringbuffer](#ringbuffer) is implemented for reliable eventing system. It is also a distributed data structure.
	- [Set](#set) is the distributed and concurrent implementation of `java.util.Set`. It does not allow duplicate elements and does not preserve their order.
	- [List](#list) is similar to Hazelcast Set. The only difference is that it allows duplicate elements and preserves their order.
	- [MultiMap](#multimap) is a specialized Hazelcast map. It is a distributed data structure where you can store multiple values for a single key.
	- [Replicated Map](#replicated-map) does not partition data. It does not spread data to different cluster members. Instead, it replicates the data to all members.
	- [Cardinality Estimator](#cardinality-estimator-service) is a data structure which implements Flajolet's HyperLogLog algorithm.

- **Topic** is the distributed mechanism for publishing messages that are delivered to multiple subscribers. It is also known as the publish/subscribe (pub/sub) messaging model. Please see the [Topic section](#topic) for more information. Hazelcast also has a structure called Reliable Topic which uses the same interface of Hazelcast Topic. The difference is that it is backed up by the Ringbuffer data structure. Please see the [Reliable Topic section](#reliable-topic).

- **Concurrency utilities**

	- [Lock](#lock) is the distributed implementation of `java.util.concurrent.locks.Lock`. When you use lock, the critical section that Hazelcast Lock guards is guaranteed to be executed by only one thread in the entire cluster.
	- [Semaphore](#isemaphore) is the distributed implementation of `java.util.concurrent.Semaphore`. When performing concurrent activities, semaphores offer permits to control the thread counts.
	- [AtomicLong](#iatomiclong) is the distributed implementation of `java.util.concurrent.atomic.AtomicLong`. Most of AtomicLong's operations are available. However, these operations involve remote calls and hence their performances differ from AtomicLong, due to being distributed.
	- [AtomicReference](#iatomicreference) is the distributed implementation of `java.util.concurrent.atomic.AtomicReference`. When you need to deal with a reference in a distributed environment, you can use Hazelcast AtomicReference. 
	- [IdGenerator](#idgenerator) is used to generate cluster-wide unique identifiers. ID generation occurs almost at the speed of `AtomicLong.incrementAndGet()`.
	- [CountdownLatch](#icountdownlatch) is the distributed implementation of `java.util.concurrent.CountDownLatch`. Hazelcast CountDownLatch is a gate keeper for concurrent activities. It enables the threads to wait for other threads to complete their operations.
	
![image](images/NoteSmall.jpg) ***NOTE:*** *The consistency guarantees of the concurrency utilities may break in some edge cases. Please see [Consistency and Replication Model](#consistency-and-replication-model) for more details on the guarantees Hazelcast provides.*




#### Overview of Hazelcast Distributed Objects

Hazelcast has two types of distributed objects in terms of their partitioning strategies:

1. Data structures where each partition stores a part of the instance, namely partitioned data structures.
2. Data structures where a single partition stores the whole instance, namely non-partitioned data structures.

Partitioned Hazelcast data structures are: 

- Map
- MultiMap
- Cache (Hazelcast JCache implementation)

Non-partitioned Hazelcast data structures are:

- Queue
- Set
- List
- Ringbuffer
- Lock
- Semaphore
- AtomicLong
- AtomicReference
- IdGenerator
- CountdownLatch
- Cardinality Estimator

Besides these, Hazelcast also offers the Replicated Map structure as explained in the above *Standard utility collections* list. 

#### Loading and Destroying a Distributed Object

Hazelcast offers a `get` method for most of its distributed objects. To load an object, first create a Hazelcast instance and then use the related `get` method on this instance. Following example code snippet creates an Hazelcast instance and a map on this instance.

```java
HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
Map<Integer, String> customers = hazelcastInstance.getMap( "customers" );
```

As to the configuration of distributed object, Hazelcast uses the default settings from the file `hazelcast.xml` that comes with your Hazelcast download. Of course, you can provide an explicit configuration in this XML or programmatically according to your needs. Please see the [Understanding Configuration section](#understanding-configuration).

Note that, most of Hazelcast's distributed objects are created lazily, i.e., a distributed object is created once the first operation accesses it.

If you want to use an object you loaded in other places, you can safely reload it using its reference without creating a new Hazelcast instance (`customers` in the above example).

To destroy a Hazelcast distributed object, you can use the method `destroy`. This method clears and releases all resources of the object. Therefore, you must use it with care since a reload with the same object reference after the object is destroyed creates a new data structure without an error. Please see the following example code where one of the queues are destroyed and the other one is accessed.

```java
public class Member {
  public static void main(String[] args) throws Exception {
    HazelcastInstance hz1 = Hazelcast.newHazelcastInstance();
    HazelcastInstance hz2 = Hazelcast.newHazelcastInstance();
    IQueue<String> q1 = hz1.getQueue("q");
    IQueue<String> q2 = hz2.getQueue("q");
    q1.add("foo");
      System.out.println("q1.size: "+q1.size()+ " q2.size:"+q2.size());
    q1.destroy();
      System.out.println("q1.size: "+q1.size() + " q2.size:"+q2.size());
    }
}
```

If you start the `Member` above, the output will be as shown below:

```
q1.size: 1 q2.size:1
q1.size: 0 q2.size:0
```

As you see, no error is generated and a new queue resource is created.

#### Controlling Partitions

Hazelcast uses the name of a distributed object to determine which partition it will be put. Let's load two semaphores as shown below:

```java
HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
ISemaphore s1 = hazelcastInstance.getSemaphore("s1");
ISemaphore s2 = hazelcastInstance.getSemaphore("s2");
```

Since these semaphores have different names, they will be placed into different partitions. If you want to put these two into the same partition, you use the `@` symbol as shown below:

```java
HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
ISemaphore s1 = hazelcastInstance.getSemaphore("s1@foo");
ISemaphore s2 = hazelcastInstance.getSemaphore("s2@foo");
```

Now, these two semaphores will be put into the same partition whose partition key is `foo`. Note that you can use the method `getPartitionKey` to learn the partition key of a distributed object. It may be useful when you want to create an object in the same partition of an existing object. Please see its usage as shown below:

```
String partitionKey = s1.getPartitionKey();
ISemaphore s3 = hazelcastInstance.getSemaphore("s3@"+partitionKey);
```

#### Common Features of all Hazelcast Data Structures


- If a member goes down, its backup replica (which holds the same data) will dynamically redistribute the data, including the ownership and locks on them, to the remaining live members. As a result, there will not be any data loss.
- There is no single cluster master that can be a single point of failure. Every member in the cluster has equal rights and responsibilities. No single member is superior. There is no dependency on an external 'server' or 'master'.

#### Example Distributed Object Code

Here is an example of how you can retrieve existing data structure instances (map, queue, set, lock, topic, etc.) and how you can listen for instance events, such as an instance being created or destroyed.

```java
public class Sample implements DistributedObjectListener {
  public static void main(String[] args) {
    Sample sample = new Sample();

    Config config = new Config();
    HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance(config);
    hazelcastInstance.addDistributedObjectListener(sample);

    Collection<DistributedObject> distributedObjects = hazelcastInstance.getDistributedObjects();
    for (DistributedObject distributedObject : distributedObjects) {
      System.out.println(distributedObject.getName());
    }
  }

  @Override
  public void distributedObjectCreated(DistributedObjectEvent event) {
    DistributedObject instance = event.getDistributedObject();
    System.out.println("Created " + instance.getName());
  }

  @Override
  public void distributedObjectDestroyed(DistributedObjectEvent event) {
    DistributedObject instance = event.getDistributedObject();
    System.out.println("Destroyed " + instance.getName());
  }
}
```

