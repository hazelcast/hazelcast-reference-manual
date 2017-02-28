
One of the coolest features of Java 1.5 is the Executor framework, which allows you to asynchronously execute your tasks (logical units of work), such as database queries, complex calculations, and image rendering.

The default implementation of this framework (`ThreadPoolExecutor`) is designed to run within a single JVM (cluster member). In distributed systems, this implementation is not desired since you may want a task submitted in one JVM and processed in another one. Hazelcast offers `IExecutorService` for you to use in distributed environments. It implements `java.util.concurrent.ExecutorService` to serve the applications requiring computational and data processing power.

With `IExecutorService`, you can execute tasks asynchronously and perform other useful tasks. If your task execution takes longer than expected, you can cancel the task execution. Tasks should be `Serializable` since they will be distributed.

In the Java Executor framework, you implement tasks two ways: Callable or Runnable.

* Callable: If you need to return a value and submit it to Executor, implement the task as `java.util.concurrent.Callable`.
* Runnable: If you do not need to return a value, implement the task as `java.util.concurrent.Runnable`.

