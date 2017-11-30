

## Lock

ILock is the distributed implementation of `java.util.concurrent.locks.Lock`, meaning that if you lock using an ILock, the critical
section that it guards is guaranteed to be executed by only one thread in the entire cluster, provided that there are no network failures. Even though locks are great for synchronization, they can lead to problems if not used properly. Also note that Hazelcast Lock does not support fairness.

![image](images/NoteSmall.jpg) ***NOTE:*** *The `ILock` may break it's consistency guarantees in some edge cases. Please see [Consistency and Replication Model](#consistency-and-replication-model) for more details on the guarantees Hazelcast provides.*

### Using Try-Catch Blocks with Locks

Always use locks with *try*-*catch* blocks. This will ensure that locks are released if an exception is thrown from
the code in a critical section. Also note that the `lock` method is outside the *try*-*catch* block because we do not want to unlock
if the lock operation itself fails.

```java
import com.hazelcast.core.Hazelcast;
import java.util.concurrent.locks.Lock;

HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
Lock lock = hazelcastInstance.getLock( "myLock" );
lock.lock();
try {
  // do something here
} finally {
  lock.unlock();
}
```

### Releasing Locks with tryLock Timeout

If a lock is not released in the cluster, another thread that is trying to get the
lock can wait forever. To avoid this, use `tryLock` with a timeout value. You can
set a high value (normally it should not take that long) for `tryLock`. You can check the return value of `tryLock` as follows:

```java
if ( lock.tryLock ( 10, TimeUnit.SECONDS ) ) {
  try {  
    // do some stuff here..  
  } finally {  
    lock.unlock();  
  }   
} else {
  // warning
}
```

### Avoiding Waiting Threads with Lease Time

You can also avoid indefinitely waiting threads by using lock with lease time--the lock will be released in the given lease time. The lock can be safely unlocked before the lease time expires. Note that the unlock operation can
throw an `IllegalMonitorStateException` if the lock is released because the lease time expires. If that is the case, critical section guarantee is broken.

Please see the below example.

```java
lock.lock( 5, TimeUnit.SECONDS )
try {
  // do some stuff here..
} finally {
  try {
    lock.unlock();
  } catch ( IllegalMonitorStateException ex ){
    // WARNING Critical section guarantee can be broken
  }
}
```

You can also specify a lease time when trying to acquire a lock: `tryLock(time, unit, leaseTime, leaseUnit)`. In that case, it tries to acquire the lock within the specified lease time. If the lock is not available, the current thread becomes disabled for thread scheduling purposes until either it acquires the lock or the specified waiting time elapses. Note that this lease time cannot be longer than the time you specify with the system property `hazelcast.lock.max.lease.time.seconds`. Please see the [System Properties section](#system-properties) to see the description of this property and to learn how to set a system property.



### Understanding Lock Behavior

- Locks are fail-safe. If a member holds a lock and some other members go down, the cluster will keep your locks safe and available.
Moreover, when a member leaves the cluster, all the locks acquired by that dead member will be removed so that those
locks are immediately available for live members.

- Locks are re-entrant. The same thread can lock multiple times on the same lock. Note that for other threads to be
 able to require this lock, the owner of the lock must call `unlock` as many times as the owner called `lock`.

- In the split-brain scenario, the cluster behaves as if it were two different clusters. Since two separate clusters are not aware of each other,
two members from different clusters can acquire the same lock.
For more information on places where split brain syndrome can be handled, please see [Split-Brain syndrome](#split-brain-syndrome).

- Locks are not automatically removed. If a lock is not used anymore, Hazelcast will not automatically garbage collect the lock. 
This can lead to an `OutOfMemoryError`. If you create locks on the fly, make sure they are destroyed.

- Hazelcast IMap also provides locking support on the entry level with the method `IMap.lock(key)`. Although the same infrastructure 
is used, `IMap.lock(key)` is not an ILock and it is not possible to expose it directly.

#### ILock vs. IMap.lock

ILock-based locks use system resources even when they are not acquired. You have to call `destroy()`, but this can have a side effect when another thread is trying to acquire it. ILock-based lock is a good choice when you have a limited number of locks. The IMap-based locks are auto-destructed. They use no resources when they are not acquired. This implies they are invisible for monitoring unless they are being hold by some thread.

### Synchronizing Threads with ICondition

`ICondition` is the distributed implementation of the `notify`, `notifyAll` and `wait` operations on the Java object. You can use it to synchronize
threads across the cluster. More specifically, you use `ICondition` when a thread's work depends on another thread's output. A good example
is producer/consumer methodology. 

Please see the below code examples for a producer/consumer implementation.

**Producer thread:**

```java
HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
Lock lock = hazelcastInstance.getLock( "myLockId" );
ICondition condition = lock.newCondition( "myConditionId" );

lock.lock();
try {
  while ( !shouldProduce() ) {
    condition.await(); // frees the lock and waits for signal
                       // when it wakes up it re-acquires the lock
                       // if available or waits for it to become
                       // available
  }
  produce();
  condition.signalAll();
} finally {
  lock.unlock();
}
```

![image](images/NoteSmall.jpg) ***NOTE:*** *The method `await()` takes time value and time unit as arguments. If you specify a negative value for the time, it is interpreted as infinite.*

**Consumer thread:**
       
```java       
HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
Lock lock = hazelcastInstance.getLock( "myLockId" );
ICondition condition = lock.newCondition( "myConditionId" );

lock.lock();
try {
  while ( !canConsume() ) {
    condition.await(); // frees the lock and waits for signal
                       // when it wakes up it re-acquires the lock if 
                       // available or waits for it to become
                       // available
  }
  consume();
  condition.signalAll();
} finally {
  lock.unlock();
}
```

### Split-Brain Protection for Lock

Locks can be configured to check for a minimum number of available members before applying lock operations (see [Split-Brain Protection](#split-brain-protection)). This is a check to avoid performing successful lock operations on all parts of a cluster during a network partition. Due to the implementation details, the check does not guarantee that the lock will fail in all conditions of a network partition and it can happen that two members can acquire the same lock.

Once the membership change has been detected, the lock operations will fail with a `QuorumException` if enough size of members are not present. In essence, this does not provide correctness but rather narrows down the window of opportunity in which locks can continue operations on several members concurrently.

Although the check does not provide correctness it can still be useful. In cases where members acquire the lock to perform some costly but idempotent operation, configuring lock quorum can further prevent some cases where the cluster has been split into several sub-clusters and more than one member perform the same operation.

Following is a list of methods that now support quorum checks. The list is grouped by quorum type. Additionally, since Hazelcast IMap also provides locking support, certain map and multimap methods also allow quorum checks.

- WRITE, READ_WRITE
    - `Condition#await`, `Condition#awaitUninterruptibly`, `Condition#awaitNanos`, `Condition#awaitUntil`
    - `Lock#lockInterruptibly`, `ILock#lock`, `IMap#tryLock`, `IMap#lock`, `MultiMap#lock`, `MultiMap#tryLock`
    - `Condition#signal`, `Condition#signalAll`
- READ, READ_WRITE
    - `ILock#getLockCount`
    - `ILock#getRemainingLeaseTime`
    - `ILock#isLocked`, `IMap#isLocked`, `MultiMap#isLocked`
    - `ILock#forceUnlock`, `IMap#forceUnlock`, `MultiMap#forceUnlock`, `ILock#unlock`, `IMap#unlock`, `ObjectMultiMapProxy#unlock`

### Lock Configuration

As mentioned in the [Split-brain Protection for Lock section](#split-brain-protection-for-lock), Lock allows for split-brain protection. 

An example of declarative configuration is as follows:

```xml
<lock name="myLock">
    <quorum-ref>quorum-name</quorum-ref>
</lock>
```

- `quorum-ref` : Name of quorum configuration that you want this lock to use.

An example of programmatic configuration is as follows:

```java
Config config = new Config();
LockConfig lockConfig = new LockConfig();
lockConfig.setName("myLock")
          .setQuorumName("quorum-name");
config.addLockConfig(lockConfig);
```

![image](images/NoteSmall.jpg) ***NOTE:*** *As mentioned above, a quorum definition for a lock that has the same name or a pattern that matches a map name will force the map locking actions to use the defined quorum. It is important to keep this in mind when using lock quorum and map locking actions.*