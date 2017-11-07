

The following are example configurations for executor service.

**Declarative:**

```xml
<executor-service name="exec">
   <pool-size>1</pool-size>
   <queue-capacity>10</queue-capacity>
   <statistics-enabled>true</statistics-enabled>
</executor-service>
```

**Programmatic:**

```java
Config config = new Config();
ExecutorConfig executorConfig = config.getExecutorConfig("exec");
executorConfig.setPoolSize( 1 ).setQueueCapacity( 10 )
          .setStatisticsEnabled( true );
```

Executor service configuration has the following elements.

- `pool-size`: The number of executor threads per Member for the Executor. By default, Executor is configured to have 16 threads in the pool. You can change that with this element.
- `queue-capacity`: Executor's task queue capacity; the number of tasks this queue can hold.
- `statistics-enabled`: You can retrieve some statistics (such as pending operations count, started operations count, completed operations count, and cancelled operations count) by setting this parameter's value to `true`. The method for retrieving the statistics is `getLocalExecutorStats()`.






