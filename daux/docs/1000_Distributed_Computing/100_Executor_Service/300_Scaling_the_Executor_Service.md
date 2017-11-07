
You can scale the Executor service both vertically (scale up) and horizontally (scale out).


To scale up, you should improve the processing capacity of the cluster member (JVM). You can do this by increasing the `pool-size` property mentioned in [Configuring Executor Service](07_Configuring_Executor_Service.md) (i.e., increasing the thread count). However, please be aware of your member's capacity. If you think it cannot handle such an additional load caused by increasing the thread count, you may want to consider improving the member's resources (CPU, memory, etc.). As an example, set the `pool-size` to 5 and run the above `MasterMember`. You will see that `EchoTask` is run as soon as it is produced.


To scale out, add more members instead of increasing only one member's capacity. In reality, you may want to expand your cluster by adding more physical or virtual machines. For example, in the EchoTask example in the [Runnable section](01_Implementing_a_Runnable_Task.md), you can create another Hazelcast instance. That instance will automatically get involved in the executions started in `MasterMember` and start processing.

