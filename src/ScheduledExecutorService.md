

## Scheduled Executor Service

Hazelcast's scheduled executor service is a data structure which implements the `java.util.concurrent.ScheduledExecutorService`, partially.
Here, partially means that it allows the scheduling of a single future execution and/or at a fixed rate execution but not at a fixed delay.

On top of the Vanilla Scheduling APIs, the scheduled executor service allows additional ones such as the following:

- `scheduleOnMember`: On a specific cluster member.
- `scheduleOnKeyOwner`: On the partition owning that key.
- `scheduleOnAllMembers`: On all cluster members.
- `scheduleOnAllMembers`: On all given members.

### API

In detail the API looks as follows:

```
package com.hazelcast.scheduledexecutor;

import com.hazelcast.core.DistributedObject;
import com.hazelcast.core.Member;
import com.hazelcast.spi.annotation.Beta;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Callable;
import java.util.concurrent.RejectedExecutionException;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

/**
 * Distributed & durable implementation similar to, but not directly inherited {@link ScheduledExecutorService}.
 * <code>IScheduledExecutorService</code> provides similar API to the <code>ScheduledExecutorService</code> with some
 * exceptions but also additional methods like scheduling tasks on a specific member, on a member who is owner of a specific key,
 * executing a tasks on multiple members etc.
 *
 *</p>
 *
 * Tasks (<tt>Runnable</tt> and/or <tt>Callable</tt>) scheduled on any partition through an <tt>IScheduledExecutorService</tt>,
 * yield some durability characteristics.
 * <ul>
 *     <li>When a member goes down (up to <tt>durability</tt> config), the scheduled task will get re-scheduled
 *     on a replica member.</li>
 *     <li>In the event of a partition migration, the task will be re-scheduled on the destination member.</li>
 * </ul>
 * <b>Note: </b> The above characteristics don't apply when scheduled on a <tt>Member</tt>.
 *
 * <br/>
 * <br/>
 *
 * Tasks that are holding state that needs to be also durable across partitions, will need to implement the {@link StatefulTask}
 * interface.
 *
 * <br/>
 * <br/>
 *
 * Upon scheduling a task acquires a resource handler, see {@link ScheduledTaskHandler}. The handler is generated before
 * the actual scheduling of the task on the member, which allows for a way to access the future in an event of a member failure
 * immediately after scheduling, and also guarantees no duplicates in the cluster by utilizing a unique name per task.
 * A name can also be defined by the user by having the <tt>Runnable</tt> or <tt>Callable</tt> implement the {@link NamedTask}.
 * Alternatively, one can wrap any task using the {@link TaskUtils#named(String, Callable)} or
 * {@link TaskUtils#named(String, Runnable)} for simplicity.
 *
 * <p/>
 *
 * One difference of this service in comparison to {@link ScheduledExecutorService} is the
 * {@link #scheduleAtFixedRate(Runnable, long, long, TimeUnit)} which has similar semantic
 * to {@link java.util.concurrent.ScheduledExecutorService#scheduleAtFixedRate(Runnable, long, long, TimeUnit)}. It
 * guarantees a task won't be executed by multiple threads concurrently. The difference is that this service will
 * skip a scheduled execution if another thread is still running the same task, instead of postponing its execution.
 *
 * <br/><br/>
 * The other difference is this service does not offer an equivalent of
 * {@link java.util.concurrent.ScheduledExecutorService#scheduleWithFixedDelay(Runnable, long, long, TimeUnit)}
 */
@Beta
public interface IScheduledExecutorService extends DistributedObject {

    /**
     * Creates and executes a one-shot action that becomes enabled
     * after the given delay.
     *
     * @param command the task to execute
     * @param delay the time from now to delay execution
     * @param unit the time unit of the delay parameter
     * @return a ScheduledFuture representing pending completion of
     *         the task and whose {@code get()} method will return
     *         {@code null} upon completion
     * @throws RejectedExecutionException if the task cannot be
     *         scheduled for execution
     * @throws NullPointerException if command is null
     */
    IScheduledFuture<?> schedule(Runnable command, long delay, TimeUnit unit);

    /**
     * Creates and executes a one-shot action that becomes enabled
     * after the given delay.
     *
     * @param command the task to execute
     * @param delay the time from now to delay execution
     * @param unit the time unit of the delay parameter
     * @return a ScheduledFuture representing pending completion of
     *         the task and whose {@code get()} method will return
     *         {@code null} upon completion
     * @throws RejectedExecutionException if the task cannot be
     *         scheduled for execution
     * @throws NullPointerException if command is null
     */
    <V> IScheduledFuture<V> schedule(Callable<V> command, long delay, TimeUnit unit);

    /**
     * Creates and executes a periodic action that becomes enabled first
     * after the given initial delay, and subsequently with the given
     * period. Executions will commence after
     * {@code initialDelay} then {@code initialDelay+period}, then
     * {@code initialDelay + 2 * period}, and so on.
     * If any execution of this task
     * takes longer than its period, then subsequent execution will be skipped.
     *
     * @param command the task to execute
     * @param initialDelay the time to delay first execution
     * @param period the period between successive executions
     * @param unit the time unit of the initialDelay and period parameters
     * @return a ScheduledFuture representing pending completion of
     *         the task, and whose {@code get()} method will throw an
     *         exception upon cancellation
     * @throws RejectedExecutionException if the task cannot be
     *         scheduled for execution
     * @throws NullPointerException if command is null
     */
    IScheduledFuture<?> scheduleAtFixedRate(Runnable command, long initialDelay,
                                            long period, TimeUnit unit);

    /**
     * Creates and executes a one-shot action that becomes enabled
     * after the given delay at the given {@link Member}.
     *
     * @param command the task to execute
     * @param member the member to execute the task
     * @param delay the time from now to delay execution
     * @param unit the time unit of the delay parameter
     * @return a ScheduledFuture representing pending completion of
     *         the task and whose {@code get()} method will return
     *         {@code null} upon completion
     * @throws RejectedExecutionException if the task cannot be
     *         scheduled for execution
     * @throws NullPointerException if command is null
     */
    IScheduledFuture<?> scheduleOnMember(Runnable command, Member member, long delay, TimeUnit unit);

    /**
     * Creates and executes a one-shot action that becomes enabled
     * after the given delay at the given {@link Member}.
     *
     * @param command the task to execute
     * @param member the member to execute the task
     * @param delay the time from now to delay execution
     * @param unit the time unit of the delay parameter
     * @return a ScheduledFuture representing pending completion of
     *         the task and whose {@code get()} method will return
     *         {@code null} upon completion
     * @throws RejectedExecutionException if the task cannot be
     *         scheduled for execution
     * @throws NullPointerException if command is null
     */
    <V> IScheduledFuture<V> scheduleOnMember(Callable<V> command, Member member, long delay, TimeUnit unit);

    /**
     * Creates and executes a periodic action that becomes enabled first
     * after the given initial delay, and subsequently with the given
     * period at the given {@link Member}. Executions will commence after
     * {@code initialDelay} then {@code initialDelay+period}, then
     * {@code initialDelay + 2 * period}, and so on.
     * If any execution of this task
     * takes longer than its period, then subsequent execution will be skipped.
     *
     * @param command the task to execute
     * @param member the member to execute the task
     * @param initialDelay the time to delay first execution
     * @param period the period between successive executions
     * @param unit the time unit of the initialDelay and period parameters
     * @return a ScheduledFuture representing pending completion of
     *         the task, and whose {@code get()} method will throw an
     *         exception upon cancellation
     * @throws RejectedExecutionException if the task cannot be
     *         scheduled for execution
     * @throws NullPointerException if command is null
     */
    IScheduledFuture<?> scheduleOnMemberAtFixedRate(Runnable command, Member member,
                                                    long initialDelay, long period, TimeUnit unit);

    /**
     * Creates and executes a one-shot action that becomes enabled
     * after the given delay on the partition owner of the given key.
     *
     * @param command the task to execute
     * @param key the key to identify the partition owner, which will execute the task
     * @param delay the time from now to delay execution
     * @param unit the time unit of the delay parameter
     * @return a ScheduledFuture representing pending completion of
     *         the task and whose {@code get()} method will return
     *         {@code null} upon completion
     * @throws RejectedExecutionException if the task cannot be
     *         scheduled for execution
     * @throws NullPointerException if command is null
     */
    IScheduledFuture<?> scheduleOnMember(Runnable command, Object key, long delay, TimeUnit unit);

    /**
     * Creates and executes a one-shot action that becomes enabled
     * after the given delay on the partition owner of the given key.
     *
     * @param command the task to execute
     * @param key the key to identify the partition owner, which will execute the task
     * @param delay the time from now to delay execution
     * @param unit the time unit of the delay parameter
     * @return a ScheduledFuture representing pending completion of
     *         the task and whose {@code get()} method will return
     *         {@code null} upon completion
     * @throws RejectedExecutionException if the task cannot be
     *         scheduled for execution
     * @throws NullPointerException if command is null
     */
    <V> IScheduledFuture<V> scheduleOnKeyOwner(Callable<V> command, Object key, long delay, TimeUnit unit);

    /**
     * Creates and executes a periodic action that becomes enabled first
     * after the given initial delay, and subsequently with the given
     * period on the partition owner of the given key. Executions will commence after
     * {@code initialDelay} then {@code initialDelay+period}, then
     * {@code initialDelay + 2 * period}, and so on.
     * If any execution of this task
     * takes longer than its period, then subsequent execution will be skipped.
     *
     * @param command the task to execute
     * @param key the key to identify the partition owner, which will execute the task
     * @param initialDelay the time to delay first execution
     * @param period the period between successive executions
     * @param unit the time unit of the initialDelay and period parameters
     * @return a ScheduledFuture representing pending completion of
     *         the task, and whose {@code get()} method will throw an
     *         exception upon cancellation
     * @throws RejectedExecutionException if the task cannot be
     *         scheduled for execution
     * @throws NullPointerException if command is null
     */
    IScheduledFuture<?> scheduleOnKeyOwnerAtFixedRate(Runnable command, Object key, long initialDelay,
                                                      long period, TimeUnit unit);

    /**
     * Creates and executes a one-shot action that becomes enabled
     * after the given delay on all cluster {@link Member}s.
     *
     * <br/>
     * <b>Note: </b> In the event of Member leaving the cluster, for whatever reason, the task is lost.
     * If a new member is added, the task will not get scheduled there automatically.
     *
     * @param command the task to execute
     * @param delay the time from now to delay execution
     * @param unit the time unit of the delay parameter
     * @return a ScheduledFuture representing pending completion of
     *         the task and whose {@code get()} method will return
     *         {@code null} upon completion
     * @throws RejectedExecutionException if the task cannot be
     *         scheduled for execution
     * @throws NullPointerException if command is null
     */
    Map<Member, IScheduledFuture<?>> scheduleOnAllMembers(Runnable command, long delay, TimeUnit unit);

    /**
     * Creates and executes a one-shot action that becomes enabled
     * after the given delay on all cluster {@link Member}s.
     *
     * <br/>
     * <b>Note: </b> In the event of Member leaving the cluster, for whatever reason, the task is lost.
     * If a new member is added, the task will not get scheduled there automatically.
     *
     * @param command the task to execute
     * @param delay the time from now to delay execution
     * @param unit the time unit of the delay parameter
     * @return a ScheduledFuture representing pending completion of
     *         the task and whose {@code get()} method will return
     *         {@code null} upon completion
     * @throws RejectedExecutionException if the task cannot be
     *         scheduled for execution
     * @throws NullPointerException if command is null
     */
    <V> Map<Member, IScheduledFuture<V>> scheduleOnAllMembers(Callable<V> command, long delay, TimeUnit unit);

    /**
     * Creates and executes a periodic action that becomes enabled first
     * after the given initial delay, and subsequently with the given
     * period on all cluster {@link Member}s. Executions will commence after
     * {@code initialDelay} then {@code initialDelay+period}, then
     * {@code initialDelay + 2 * period}, and so on.
     * If any execution of this task
     * takes longer than its period, then subsequent execution will be skipped.
     *
     * <br/>
     * <b>Note: </b> In the event of Member leaving the cluster, for whatever reason, the task is lost.
     * If a new member is added, the task will not get scheduled there automatically.
     *
     * @param command the task to execute
     * @param initialDelay the time to delay first execution
     * @param period the period between successive executions
     * @param unit the time unit of the initialDelay and period parameters
     * @return a ScheduledFuture representing pending completion of
     *         the task, and whose {@code get()} method will throw an
     *         exception upon cancellation
     * @throws RejectedExecutionException if the task cannot be
     *         scheduled for execution
     * @throws NullPointerException if command is null
     */
    Map<Member, IScheduledFuture<?>> scheduleOnAllMembersAtFixedRate(Runnable command, long initialDelay,
                                                                     long period, TimeUnit unit);

    /**
     * Creates and executes a one-shot action that becomes enabled
     * after the given delay on all {@link Member}s given.
     *
     * <br/>
     * <b>Note: </b> In the event of Member leaving the cluster, for whatever reason, the task is lost.
     *
     * @param command the task to execute
     * @param members the collections of members - where to execute the task
     * @param delay the time from now to delay execution
     * @param unit the time unit of the delay parameter
     * @return a ScheduledFuture representing pending completion of
     *         the task and whose {@code get()} method will return
     *         {@code null} upon completion
     * @throws RejectedExecutionException if the task cannot be
     *         scheduled for execution
     * @throws NullPointerException if command is null
     */
    Map<Member, IScheduledFuture<?>> scheduleOnMembers(Runnable command, Collection<Member> members,
                                                       long delay, TimeUnit unit);

    /**
     * Creates and executes a one-shot action that becomes enabled
     * after the given delay on all {@link Member}s given.
     *
     * <br/>
     * <b>Note: </b> In the event of Member leaving the cluster, for whatever reason, the task is lost.
     *
     * @param command the task to execute
     * @param members the collections of members - where to execute the task
     * @param delay the time from now to delay execution
     * @param unit the time unit of the delay parameter
     * @return a ScheduledFuture representing pending completion of
     *         the task and whose {@code get()} method will return
     *         {@code null} upon completion
     * @throws RejectedExecutionException if the task cannot be
     *         scheduled for execution
     * @throws NullPointerException if command is null
     */
    <V> Map<Member, IScheduledFuture<V>> scheduleOnMembers(Callable<V> command, Collection<Member> members,
                                                           long delay, TimeUnit unit);

    /**
     * Creates and executes a periodic action that becomes enabled first
     * after the given initial delay, and subsequently with the given
     * period on all {@link Member}s given. Executions will commence after
     * {@code initialDelay} then {@code initialDelay+period}, then
     * {@code initialDelay + 2 * period}, and so on.
     * If any execution of this task
     * takes longer than its period, then subsequent execution will be skipped.
     *
     * <br/>
     * <b>Note: </b> In the event of Member leaving the cluster, for whatever reason, the task is lost.
     *
     * @param command the task to execute
     * @param members the collections of members - where to execute the task
     * @param initialDelay the time to delay first execution
     * @param period the period between successive executions
     * @param unit the time unit of the initialDelay and period parameters
     * @return a ScheduledFuture representing pending completion of
     *         the task, and whose {@code get()} method will throw an
     *         exception upon cancellation
     * @throws RejectedExecutionException if the task cannot be
     *         scheduled for execution
     * @throws NullPointerException if command is null
     */
    Map<Member, IScheduledFuture<?>> scheduleOnMembersAtFixedRate(Runnable command, Collection<Member> members,
                                                                  long initialDelay, long period, TimeUnit unit);

    /**
     * Creates a new {@link IScheduledFuture} from the given handler.
     * This is useful in case your member member or client from which the original
     * scheduling happened, went down, and now you want to access the <tt>ScheduledFuture</tt> again.
     *
     * @param handler The handler of the task as found from {@link IScheduledFuture#getHandler()}
     * @param <V> The return type of callable tasks
     * @return A new {@link IScheduledFuture} from the given handler.
     */
    <V> IScheduledFuture<V> getScheduledFuture(ScheduledTaskHandler handler);

    /**
     * Fetches and returns all scheduled (not disposed yet) futures from all members in the cluster.
     * If a member has no running tasks for this scheduler, it wont be included in the returned {@link Map}.
     *
     * @return A {@link Map} with {@link Member} keys and a List of {@link IScheduledFuture} found for this scheduler.
     */
    <V> Map<Member, List<IScheduledFuture<V>>> getAllScheduledFutures();

    /**
     * Initiates an orderly shutdown in which previously submitted
     * tasks are executed, but no new tasks will be accepted.
     * Invocation has no additional effect if already shut down.
     *
     * <p>This method does not wait for previously submitted tasks to
     * complete execution.
     */
    void shutdown();

}
```

There are two different modes of durability for the service:

1. Upon partition specific scheduling, the future task is stored both in the primary partition and also in its N backups, N being the `<durability>` property in the configuration. More specifically, there are always one or more backups to take ownership of the task in the event of a lost member. If a member is lost, the task will be re-scheduled on the backup (new primary) member, which might induce further delays on the subsequent executions of the task.
For example, if we schedule a task to run in 10 seconds from now, `schedule(new ExampleTask(), 10, TimeUnit.SECONDS);` and after 5 seconds the owner member goes down (before the execution takes place), then the backup owner will re-schedule the task in 10 seconds from now. Therefore, from the user's perspective waiting on the result, this will be available in `10 + 5 = 15` seconds rather than 10 seconds as it is anticipated originally. If `atFixedRate` was used, then only the initial delay is affected in the above scenario, all subsequent executions should adhere to the given period parameter.    

2. Upon member specific scheduling, the future task is *only* stored in the member itself, which means that in the event of a lost member, the task will be lost as well.

To accomplish the described durability, all tasks provide a unique identity/name before the scheduling takes place. The name allows the service to reach the scheduled task even after the caller (client or member) goes down, and also allows helps to prevent duplicate tasks.
The name of the task can be user-defined if it needs to be, by implementing the `com.hazelcast.scheduledexecutor.NamedTask` interface (plain wrapper util is available here: `com.hazelcast.scheduledexecutor.TaskUtils#named(java.lang.String, java.lang.Runnable)`). If the task does not provide a name in its implementation, the service provides a random UUID for it, internally.

Upon scheduling, the service returns an `IScheduledFuture` which on top of the `java.util.concurrent.ScheduledFuture` functionality provides API to get the resource handler of the task `ScheduledTaskHandler` and also the runtime statistics of the task.
Please see below for your reference:

```
package com.hazelcast.scheduledexecutor;

import java.util.concurrent.ScheduledFuture;

/**
 * A delayed result-bearing action that can be cancelled.
 * Usually a scheduled future is the result of scheduling
 * a task with a {@link IScheduledExecutorService}.
 *
 * Enhances the default {@link ScheduledFuture} API with support
 * of statistics and time measurement info, through {@link ScheduledTaskStatistics}
 *
 * @param <V> The result type returned by this Future
 */
public interface IScheduledFuture<V>
        extends ScheduledFuture<V> {

    /**
     * Returns the scheduled future resource handler.
     * Can be used to re-acquire control of the {@link IScheduledFuture} using the
     * {@link IScheduledExecutorService#getScheduledFuture(ScheduledTaskHandler)}
     *
     * @return An instance of {@link ScheduledTaskHandler}, a resource handler for this scheduled future.
     */
    ScheduledTaskHandler getHandler();

    /**
     * Returns the statistics and time measurement info of the execution of this scheduled future
     * in the {@link IScheduledExecutorService} it was scheduled.
     *
     * @return An instance of {@link ScheduledTaskStatistics}, holding all stats and measurements
     */
    ScheduledTaskStatistics getStats();

    /**
     * Used to destroy the instance of the {@link IScheduledFuture} in the scheduled executor.
     * Once the instance is destroyed, any subsequent action on the {@link IScheduledFuture} will
     * fail with an {@link IllegalStateException}
     * Attempting to re-create the {@link IScheduledFuture} from the
     * {@link IScheduledExecutorService#getScheduledFuture(ScheduledTaskHandler)} using the {@link #getHandler()}
     * will succeed, but any subsequent access on that new future, will also fail with {@link StaleTaskException}
     */
    void dispose();

    /**
     * Attempts to cancel further scheduling of this task.  This attempt will
     * fail if the task has already completed, has already been cancelled,
     * or could not be cancelled for some other reason. If successful,
     * and this task has not started when {@code cancel} is called,
     * this task should never run.
     *
     * <p><b>Warning: </b> This cancel will not attempt to interrupt the running
     * thread if the task is already in progress, will just cancel further scheduling.</p>
     *
     * <p>After this method returns, subsequent calls to {@link #isDone} will
     * always return {@code true}.  Subsequent calls to {@link #isCancelled}
     * will always return {@code true} if this method returned {@code true}.
     *
     * @param mayInterruptIfRunning is throwing {@link UnsupportedOperationException}
     * @return {@code false} if the task could not be cancelled,
     * typically because it has already completed normally;
     * {@code true
     */
    boolean cancel(boolean mayInterruptIfRunning);
}
```

The task handler, is a descriptor class holding information for the scheduled future, which is used to pinpoint the actual task in the cluster. It contains the name of the task, the owner (member or partition) and the scheduler name. 

The handler is always available after scheduling and can be stored in a plain string format `com.hazelcast.scheduledexecutor.ScheduledTaskHandler#toUrn` and re-constructed back from that String `com.hazelcast.scheduledexecutor.ScheduledTaskHandler#of`. If the handler is lost, you can still find a task under a given scheduler by using the Scheduler's `com.hazelcast.scheduledexecutor.IScheduledExecutorService#getAllScheduledFutures`.

Last but not least, similar to [executor service](#executor-service), the scheduled executor service allows Stateful tasks to be scheduled. Stateful tasks, are tasks that require any kind of state during their runtime, which must also be durable along with the task in the event of a lost partition. 

Stateful tasks can be created by implementing the `com.hazelcast.scheduledexecutor.StatefulTask` interface, and providing implementation details for saving the state and loading it back. If a partition is lost, then the re-scheduled task will load the previously saved state before its execution.

![image](images/NoteSmall.jpg)***NOTE:*** *As with the tasks, Objects stored in the state Map need to be Hazelcast serializable.*


### Configuring Scheduled Executor Service

This section presents example configurations for scheduled executor service along with the descriptions of its configuration elements and attributes.

**Declarative:**

```xml
<scheduled-executor-service name="myScheduledExecSvc">
	<pool-size>8</pool-size>
	<durability>1</durability>
</scheduled-executor-service>
```

**Programmatic:**

```java
Config config = new Config();
config.getScheduledExecutorConfig( "myScheduledExecSvc" ).
      .setPoolSize ( "8" )
      .setDurability( "1" );

HazelcastInstance hazelcast = Hazelcast.newHazelcastInstance(config);
ScheduledExecutorService myScheduledExecSvc = hazelcast.getScheduldExecutorService("myScheduledExecSvc");
```

Following are the descriptions of each configuration element and attribute:

* `name`: Name of the scheduled executor.
* `pool-size`: Number of executor threads per member for the executor.
* `durability`: Durability of the executor.

### Examples

Scheduling a callable that computes the cluster size in `10 seconds` from now:

```
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
IScheduledExecutorService executorService = instance.getScheduledExecutor("myScheduler");
IScheduledFuture<Double> future = executorService.schedule(
	new DelayedClusterSizeTask(), 10, TimeUnit.SECONDS);

int membersCount = future.get(); // Block until we get the result
ScheduledTaskStatistics stats = future.getStats();

int totalTaskRuns = stats.getTotalRuns()); // = 1
```
