## Queue

Hazelcast distributed queue is an implementation of `java.util.concurrent.BlockingQueue`. Being distributed, Hazelcast distributed queue enables all cluster members to interact with it. Using Hazelcast distributed queue, you can add an item in one cluster member and remove it from another one.

### Getting a Queue and Putting Items

Use the Hazelcast instance's `getQueue` method to get the queue, then use the queue's `put` method to put items into the queue.

```java
import com.hazelcast.core.Hazelcast;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.TimeUnit;

public class SampleQueue {
  public static void main(String[] args) throws Exception {
   HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
   BlockingQueue<MyTask> queue = hazelcastInstance.getQueue( "tasks" );
   queue.put( new MyTask() );
   MyTask task = queue.take();

   boolean offered = queue.offer( new MyTask(), 10, TimeUnit.SECONDS );
   task = queue.poll( 5, TimeUnit.SECONDS );
   if ( task != null ) {
     //process task
   }
  }
} 
```

FIFO ordering will apply to all queue operations across the cluster. The user objects (such as `MyTask` in the example above) that are enqueued or dequeued have to be `Serializable`.

Hazelcast distributed queue performs no batching while iterating over the queue. All items will be copied locally and iteration will occur locally.

Hazelcast distributed queue uses `ItemListener` to listen to the events that occur when items are added to and removed from the queue. Please refer to the [Listening for Item Events section](#listening-for-item-events) for information on how to create an item listener class and register it.
