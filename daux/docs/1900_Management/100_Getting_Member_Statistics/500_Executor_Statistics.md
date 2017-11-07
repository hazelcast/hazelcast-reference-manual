
To get local executor statistics, use the `getLocalExecutorStats()` method from the `IExecutorService` interface.
This method returns a `LocalExecutorStats` object that holds local executor statistics.

Below is example code where the `getLocalExecutorStats()` method and the `getCompletedTaskCount` method from `LocalExecutorStats` get the number of completed operations of the executor service.


```java
HazelcastInstance node = Hazelcast.newHazelcastInstance();
IExecutorService orderProcessor = node.getExecutorService( "orderProcessor" );
LocalExecutorStats executorStatistics = orderProcessor.getLocalExecutorStats();
System.out.println( "completed task count = " 
    + executorStatistics.getCompletedTaskCount() );
```

Below is the list of metrics that you can access via the `LocalExecutorStats` object.

```java
/**
 * Returns the number of pending operations of the executor service.
 */
long getPendingTaskCount();

/**
 * Returns the number of started operations of the executor service.
 */
long getStartedTaskCount();

/**
 * Returns the number of completed operations of the executor service.
 */
long getCompletedTaskCount();

/**
 * Returns the number of cancelled operations of the executor service.
 */
long getCancelledTaskCount();

/**
 * Returns the total start latency of operations started.
 */
long getTotalStartLatency();

/**
 * Returns the total execution time of operations finished.
 */
long getTotalExecutionLatency();
```
