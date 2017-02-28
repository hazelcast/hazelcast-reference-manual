
Hazelcast ISemaphore is the distributed implementation of `java.util.concurrent.Semaphore`. 

### Controlling Thread Counts with Permits

Semaphores offer **permit**s to control the thread counts when performing concurrent activities. To execute a concurrent activity, a thread grants a permit or waits until a permit becomes available. When the execution is completed, the permit is released.

![image](../images/NoteSmall.jpg) ***NOTE:*** *ISemaphore with a single permit may be considered a lock. Unlike the locks, however, when semaphores are used, any thread can release the permit, and semaphores can have multiple permits.*

![image](../images/NoteSmall.jpg) ***NOTE:*** *Hazelcast ISemaphore does not support fairness at all times. There are some edge cases where the fairness is not honored, e.g., when the permit becomes available at the time when an internal timeout occurs.* 

When a permit is acquired on ISemaphore:

-	if there are permits, the number of permits in the semaphore is decreased by one and the calling thread performs its activity. If there is contention, the longest waiting thread will acquire the permit before all other threads.
-	if no permits are available, the calling thread blocks until a permit becomes available. When a timeout happens during this block, the thread is interrupted.

### Example Semaphore Code

The following example code uses an `IAtomicLong` resource 1000 times, increments the resource when a thread starts to use it, and decrements it when the thread completes.

```java
public class SemaphoreMember {
  public static void main( String[] args ) throws Exception{
    HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance(); 
    ISemaphore semaphore = hazelcastInstance.getSemaphore( "semaphore" ); 
    IAtomicLong resource = hazelcastInstance.getAtomicLong( "resource" ); 
    for ( int k = 0 ; k < 1000 ; k++ ) {
      System.out.println( "At iteration: " + k + ", Active Threads: " + resource.get() );
      semaphore.acquire();
      try {
        resource.incrementAndGet();
        Thread.sleep( 1000 );
        resource.decrementAndGet();
      } finally { 
        semaphore.release();
      }
    }
    System.out.println("Finished");
  }
}
```

Let's limit the concurrent access to this resource by allowing at most three threads. You can configure it declaratively by setting the `initial-permits` property, as shown below.

```xml
<semaphore name="semaphore"> 
  <initial-permits>3</initial-permits>
</semaphore>
```

![image](../images/NoteSmall.jpg) ***NOTE:*** *If there is a shortage of permits while the semaphore is being created, value of this property can be set to a negative number.*

If you execute the above `SemaphoreMember` class 5 times, the output will be similar to the following:

`At iteration: 0, Active Threads: 1`

`At iteration: 1, Active Threads: 2`

`At iteration: 2, Active Threads: 3`

`At iteration: 3, Active Threads: 3`

`At iteration: 4, Active Threads: 3`

As you can see, the maximum count of concurrent threads is equal or smaller than three. If you remove the semaphore acquire/release statements in `SemaphoreMember`, you will see that there is no limitation on the number of concurrent usages.

Hazelcast also provides backup support for `ISemaphore`. When a member goes down, you can have another member take over the semaphore with the permit information (permits are automatically released when a member goes down). To enable this, configure synchronous or asynchronous backup with the properties `backup-count` and `async-backup-count` (by default, synchronous backup is already enabled).

### Configuring Semaphore

The following are example semaphore configurations.

**Declarative:**

```xml
<semaphore name="semaphore">
   <backup-count>1</backup-count>
   <async-backup-count>0</async-backup-count>
   <initial-permits>3</initial-permits>
</semaphore>
```

**Programmatic:**

```java
Config config = new Config();
SemaphoreConfig semaphoreConfig = config.getSemaphoreConfig();
semaphoreConfig.setName( "semaphore" ).setBackupCount( "1" )
        .setInitialPermits( "3" );
```

Semaphore configuration has the below elements.

- `initial-permits`: the thread count to which the concurrent access is limited. For example, if you set it to "3", concurrent access to the object is limited to 3 threads.
- `backup-count`: Number of synchronous backups.
- `async-backup-count`: Number of asynchronous backups.

![image](../images/NoteSmall.jpg) ***NOTE:*** *If high performance is more important than not losing the permit information, you can disable the backups by setting `backup-count` to 0.*


