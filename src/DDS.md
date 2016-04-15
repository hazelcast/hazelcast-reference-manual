

# Distributed Data Structures

As mentioned in the [Overview section](#hazelcast-overview), Hazelcast offers distributed implementations of Java interfaces. Below is the list of these implementations with links to the corresponding sections in this manual.

- **Standard utility collections:**

	- [Map](#map) is the distributed implementation of `java.util.Map`. It lets you read from and write to a Hazelcast map with methods such as `get` and `put`.
	- [Queue](#queue) is the distributed implementation of `java.util.concurrent.BlockingQueue`. You can add an item in one member and remove it from another one.
	- [Ringbuffer](#ringbuffer) is implemented for reliable eventing system. It is also a distributed data structure.
	- [Set](#set) is the distributed and concurrent implementation of `java.util.Set`. It does not allow duplicate elements and does not preserve their order.
	- [List](#list) is similar to Hazelcast Set. The only difference is that it allows duplicate elements and preserves their order.
	- [MultiMap](#multimap) is a specialized Hazelcast map. It is a distributed data structure where you can store multiple values for a single key.
	- [Replicated Map](#replicated-map) does not partition data. It does not spread data to different cluster members. Instead, it replicates the data to all members.

- **Topic** is the distributed mechanism for publishing messages that are delivered to multiple subscribers. It is also known as the publish/subscribe (pub/sub) messaging model. Please see the [Topic section](#topic) for more information. Hazelcast also has a structure called Reliable Topic which uses the same interface of Hazelcast Topic. The difference is that it is backed up by the Ringbuffer data structure. Please see the [Reliable Topic section](#reliable-topic).

- **Concurrency utilities**:

	- [Lock](#lock) is the distributed implementation of `java.util.concurrent.locks.Lock`. When you use lock, the critical section that Hazelcast Lock guards is guaranteed to be executed by only one thread in the entire cluster.
	- [Semaphore](#isemaphore) is the distributed implementation of `java.util.concurrent.Semaphore`. When performing concurrent activities, semaphores offer permits to control the thread counts.
	- [AtomicLong](#iatomiclong) is the distributed implementation of `java.util.concurrent.atomic.AtomicLong`. Most of AtomicLong's operations are available. However, these operations involve remote calls and hence their performances differ from AtomicLong, due to being distributed.
	- [AtomicReference](#iatomicreference) is the distributed implementation of `java.util.concurrent.atomic.AtomicReference`. When you need to deal with a reference in a distributed environment, you can use Hazelcast AtomicReference. 
	- [IdGenerator](#idgenerator) is used to generate cluster-wide unique identifiers. ID generation occurs almost at the speed of `AtomicLong.incrementAndGet()`.
	- [CountdownLatch](#icountdownlatch) is the distributed implementation of `java.util.concurrent.CountDownLatch`. Hazelcast CountDownLatch is a gate keeper for concurrent activities. It enables the threads to wait for other threads to complete their operations.

Common Features of all Hazelcast Data Structures:


- If a member goes down, its backup replica (which holds the same data) will dynamically redistribute the data, including the ownership and locks on them, to the remaining live members. As a result, there will not be any data loss.
- There is no single cluster master that can be a single point of failure. Every member in the cluster has equal rights and responsibilities. No single member is superior. There is no dependency on an external 'server' or 'master'.

Here is an example of how you can retrieve existing data structure instances (map, queue, set, lock, topic, etc.) and how you can listen for instance events, such as an instance being created or destroyed.

```java
import java.util.Collection;
import com.hazelcast.config.Config;
import com.hazelcast.core.*;

public class Sample implements DistributedObjectListener {
  public static void main(String[] args) {
    Sample sample = new Sample();

    Config config = new Config();
    HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance(config);
    hazelcastInstance.addDistributedObjectListener(sample);

    Collection<DistributedObject> distributedObjects = hazelcastInstance.getDistributedObjects();
    for (DistributedObject distributedObject : distributedObjects) {
      System.out.println(distributedObject.getName() + "," + distributedObject.getId());
    }
  }

  @Override
  public void distributedObjectCreated(DistributedObjectEvent event) {
    DistributedObject instance = event.getDistributedObject();
    System.out.println("Created " + instance.getName() + "," + instance.getId());
  }

  @Override
  public void distributedObjectDestroyed(DistributedObjectEvent event) {
    DistributedObject instance = event.getDistributedObject();
    System.out.println("Destroyed " + instance.getName() + "," + instance.getId());
  }
}
```

