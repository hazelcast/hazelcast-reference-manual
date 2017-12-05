
Hazelcast's scheduled executor service (IScheduledExecutorService) is a data structure which implements the `java.util.concurrent.ScheduledExecutorService`, partially.
Here, partially means that it allows the scheduling of a single future execution and/or at a fixed rate execution but not at a fixed delay.

On top of the Vanilla Scheduling APIs, the scheduled executor service allows additional ones such as the following:

- `scheduleOnMember`: On a specific cluster member.
- `scheduleOnKeyOwner`: On the partition owning that key.
- `scheduleOnAllMembers`: On all cluster members.
- `scheduleOnAllMembers`: On all given members.

Please refer to the [IScheduledExecutorService Javadoc](http://docs.hazelcast.org/docs/latest/javadoc/com/hazelcast/scheduledexecutor/IScheduledExecutorService.html) for its API details.

There are two different modes of durability for the service:

1. Upon partition specific scheduling, the future task is stored both in the primary partition and also in its N backups, N being the `<durability>` property in the configuration. More specifically, there are always one or more backups to take ownership of the task in the event of a lost member. If a member is lost, the task will be re-scheduled on the backup (new primary) member, which might induce further delays on the subsequent executions of the task.
For example, if we schedule a task to run in 10 seconds from now, `schedule(new ExampleTask(), 10, TimeUnit.SECONDS);` and after 5 seconds the owner member goes down (before the execution takes place), then the backup owner will re-schedule the task in 10 seconds from now. Therefore, from the user's perspective waiting on the result, this will be available in `10 + 5 = 15` seconds rather than 10 seconds as it is anticipated originally. If `atFixedRate` was used, then only the initial delay is affected in the above scenario, all subsequent executions should adhere to the given period parameter.    

2. Upon member specific scheduling, the future task is *only* stored in the member itself, which means that in the event of a lost member, the task will be lost as well.

To accomplish the described durability, all tasks provide a unique identity/name before the scheduling takes place. The name allows the service to reach the scheduled task even after the caller (client or member) goes down, and also allows to prevent duplicate tasks.
The name of the task can be user-defined if it needs to be, by implementing the `com.hazelcast.scheduledexecutor.NamedTask` interface (plain wrapper util is available here: `com.hazelcast.scheduledexecutor.TaskUtils.named(java.lang.String, java.lang.Runnable)`). If the task does not provide a name in its implementation, the service provides a random UUID for it, internally.

Upon scheduling, the service returns an `IScheduledFuture` which on top of the `java.util.concurrent.ScheduledFuture` functionality provides API to get the resource handler of the task `ScheduledTaskHandler` and also the runtime statistics of the task.

Futures associated with a scheduled task, in order to be aware of lost partitions and/or members, act as listeners on the local member/client. Therefore, they are always strongly referenced, on the member/client side. In order to clean up their resources, once completed, you can use the method `dispose()`. This method will also cancel further executions of the task if scheduled at fixed rate. You can refer to the [IScheduledFuture Javadoc](http://docs.hazelcast.org/docs/latest/javadoc/com/hazelcast/scheduledexecutor/IScheduledFuture.html) for its API details.

The task handler is a descriptor class holding information for the scheduled future, which is used to pinpoint the actual task in the cluster. It contains the name of the task, the owner (member or partition) and the scheduler name. 

The handler is always available after scheduling and can be stored in a plain string format `com.hazelcast.scheduledexecutor.ScheduledTaskHandler#toUrn` and re-constructed back from that String `com.hazelcast.scheduledexecutor.ScheduledTaskHandler#of`. If the handler is lost, you can still find a task under a given scheduler by using the Scheduler's `com.hazelcast.scheduledexecutor.IScheduledExecutorService#getAllScheduledFutures`.

Last but not least, similar to [executor service](/00_Executor_Service), the scheduled executor service allows Stateful tasks to be scheduled. Stateful tasks, are tasks that require any kind of state during their runtime, which must also be durable along with the task in the event of a lost partition. 

Stateful tasks can be created by implementing the `com.hazelcast.scheduledexecutor.StatefulTask` interface, and providing implementation details for saving the state and loading it back. If a partition is lost, then the re-scheduled task will load the previously saved state before its execution.

![image](../images/NoteSmall.jpg)***NOTE:*** *As with the tasks, Objects stored in the state Map need to be Hazelcast serializable.*


### Configuring Scheduled Executor Service

This section presents example configurations for scheduled executor service along with the descriptions of its configuration elements and attributes.

**Declarative:**

```xml
<scheduled-executor-service name="myScheduledExecSvc">
	<pool-size>16</pool-size>
	<durability>1</durability>
	<capacity>100<capacity>
</scheduled-executor-service>
```

**Programmatic:**

```java
Config config = new Config();
config.getScheduledExecutorConfig( "myScheduledExecSvc" )
      .setPoolSize ( 16 )
      .setCapacity( 100 )
      .setDurability( 1 );

HazelcastInstance hazelcast = Hazelcast.newHazelcastInstance(config);
IScheduledExecutorService myScheduledExecSvc = hazelcast.getScheduledExecutorService("myScheduledExecSvc");
```

Following are the descriptions of each configuration element and attribute:

* `name`: Name of the scheduled executor.
* `pool-size`: Number of executor threads per member for the executor.
* `durability`: Durability of the executor.
* `capacity`: Maximum number of tasks that a Scheduler can have per partition. Attempt to schedule more, will result in `RejectedExecutionException`. The tasks should get disposed by the user to free-up the capacity.

### Examples

Scheduling a callable that computes the cluster size in `10 seconds` from now:

```java
static class DelayedClusterSizeTask implements Callable<Integer>, HazelcastInstanceAware, Serializable {

    private transient HazelcastInstance instance;

    @Override
    public Integer call()
            throws Exception {
        return instance.getCluster().getMembers().size();
    }

    @Override
    public void setHazelcastInstance(HazelcastInstance hazelcastInstance) {
        this.instance = hazelcastInstance;
    }
}

HazelcastInstance hazelcast = Hazelcast.newHazelcastInstance();
IScheduledExecutorService executorService = hazelcast.getScheduledExecutorService("myScheduler");
IScheduledFuture<Integer> future = executorService.schedule(
        new DelayedClusterSizeTask(), 10, TimeUnit.SECONDS);

int membersCount = future.get(); // Block until we get the result
ScheduledTaskStatistics stats = future.getStats();
future.dispose(); // Always dispose futures that are not in use any more, to release resources
long totalTaskRuns = stats.getTotalRuns(); // = 1
```
