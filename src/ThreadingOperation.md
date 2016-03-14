
### Operation Threading

There are 2 types of operations:

* Operations that are aware of a certain partition, e.g. `IMap.get(key)`.
* Operations that are not partition aware, such as the `IExecutorService.executeOnMember(command, member)` operation.

Each of these operation types has a different threading model explained in the following sections.

#### Partition-aware Operations

To execute partition-aware operations, an array of operation threads is created. The default value of this array's size is the number of cores and it has a minimum value of 2. This value can be changed using the `hazelcast.operation.thread.count` property.

Each operation thread has its own work queue and it consumes messages from this work queue. If a partition-aware 
operation needs to be scheduled, the right thread is found using the formula below.

`threadIndex = partitionId % partition thread-count`

After the `threadIndex` is determined, the operation is put in the work queue of that operation thread. This means the followings:

 * A single operation thread executes operations for multiple partitions; if there are 271 partitions and
 10 partition threads, then roughly every operation thread executes operations for 27 partitions. 

 * Each partition belongs to only 1 operation thread. All operations for a partition are always handled by exactly the same operation thread. 

 * Concurrency control is not needed to deal with partition-aware operations because once a partition-aware
 operation is put in the work queue of a partition-aware operation thread, only 
 1 thread is able to touch that partition.

Because of this threading strategy, there are two forms of false sharing you need to be aware of:

* False sharing of the partition - two completely independent data structures share the same partition. For example, if there
 is a map `employees` and a map `orders`, the method `employees.get("peter")` running on partition 25 may be blocked
 by the method `orders.get(1234)` also running on partition 25. If independent data structures share the same partition,
 a slow operation on one data structure can slow down the other data structures.
 
* False sharing of the partition-aware operation thread - each operation thread is responsible for executing
 operations on a number of partitions. For example, *thread 1* could be responsible for partitions 0, 10, 20, etc. and *thread-2* could be responsible for partitions
 1, 11, 21, etc. If an operation for partition 1 takes a lot of time, it blocks the execution of an operation for partition
 11 because both of them are mapped to the same operation thread.

You need to be careful with long running operations because you could starve operations of a thread. 
As a general rule, the partition thread should be released as soon as possible because operations are not designed
as long running operations. That is why, for example, it is very dangerous to execute a long running operation 
using `AtomicReference.alter()` or an `IMap.executeOnKey()`, because these operations block other operations to be executed.

Currently, there is no support for work stealing. Different partitions that map to the same thread may need to wait 
till one of the partitions is finished, even though there are other free partition-aware operation threads available.

**Example:**

Take a 3 node cluster. Two members will have 90 primary partitions and one member will have 91 primary partitions. Let's
say you have one CPU and 4 cores per CPU. By default, 4 operation threads will be allocated to serve 90 or 91 partitions.

#### Operations that are Not Partition-aware

To execute operations that are not partition-aware, e.g. `IExecutorService.executeOnMember(command, member)`, generic operation 
threads are used. When the Hazelcast instance is started, an array of operation threads is created. The size of this array 
has a default value of the number of cores divided by two with a minimum value of 2. It can be changed using the 
`hazelcast.operation.generic.thread.count` property. 

A non-partition-aware operation thread does not execute an operation for a specific partition. Only partition-aware
  operation threads execute partition-aware operations. 

Unlike the partition-aware operation threads, all the generic operation threads share the same work queue: `genericWorkQueue`.

If a non-partition-aware operation needs to be executed, it is placed in that work queue and any generic operation 
thread can execute it. The big advantage is that you automatically have work balancing since any generic operation 
thread is allowed to pick up work from this queue.

The disadvantage is that this shared queue can be a point of contention. You may not see this contention in 
production since performance is dominated by I/O and the system does not run many non-partition-aware operations.
 
#### Priority Operations
 
In some cases, the system needs to run operations with a higher priority, e.g. an important system operation. To support priority operations, Hazelcast has the following features:

* For partition-aware operations: Each partition thread has its own work queue and it also has a priority
  work queue. The partition thread always checks the priority queue before it processes work from its normal work queue.

* For non-partition-aware operations: Next to the `genericWorkQueue`, there is also a `genericPriorityWorkQueue`. When a priority operation
 needs to be run, it is put in the `genericPriorityWorkQueue`. Like the partition-aware operation threads, a generic
 operation thread first checks the `genericPriorityWorkQueue` for work. 
 
Since a worker thread blocks on the normal work queue (either partition specific or generic), a priority operation
may not be picked up because it is not put in the queue where it is blocking. Hazelcast always sends a 'kick the worker' operation that  
only triggers the worker to wake up and check the priority queue. 

#### Operation-response and Invocation-future

When an Operation is invoked, a `Future` is returned. Please see the example code below.

```java
GetOperation operation = new GetOperation( mapName, key );
Future future = operationService.invoke( operation );
future.get();
```

The calling side blocks for a reply. In this case, `GetOperation` is set in the work queue for the partition of `key`, where
it eventually is executed. Upon execution, a response is returned and placed on the `genericWorkQueue` where it is executed by a 
"generic operation thread". This thread signals the `future` and notifies the blocked thread that a response is available. 
Hazelcast has a plan of exposing this `future` to the outside world, and we will provide the ability to register a completion listener so you can perform asynchronous calls. 

#### Local Calls

When a local partition-aware call is done, an operation is made and handed over to the work queue of the correct partition operation thread,
and a `future` is returned. When the calling thread calls `get` on that `future`, it acquires a lock and waits for the result 
to become available. When a response is calculated, the `future` is looked up and the waiting thread is notified.  

In the future, this will be optimized to reduce the amount of expensive systems calls, such as `lock.acquire()`/`notify()` and the expensive
interaction with the operation-queue. Probably, we will add support for a caller-runs mode, so that an operation is directly run on
the calling thread.
