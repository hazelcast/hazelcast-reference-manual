
As it is stated in the introduction of this section and shown in the log file content above, diagnostics utility consists of plugins such as BuildInfo, SystemProperties, and HazelcastInstance.

### BuildInfo

It shows the detailed Hazelcast build information including the Hazelcast release number, `Git` revision number, and whether you have Hazelcast IMDG Enterprise or not.

### SystemProperties

It shows all the properties and their values in your system used by and configured for your Hazelcast installation. These are the properties starting with `java` (excluding `java.awt`), `hazelcast`, `sun` and `os`. It also includes the arguments that are used to startup the JVM.

### ConfigProperties

It shows the Hazelcast properties and their values explicitly set by you either on the command line (with `-D`) or by using declarative/programmatic configuration.

### Metrics

It shows a comprehensive log of what is happening in your Hazelcast system.

You can configure the level of detail and frequency of dumping information to the log file using the following properties:

* `hazelcast.diagnostics.metrics.period.seconds`: Set a value in seconds. Its default is 60.
* `hazelcast.diagnostics.metrics.level`: Set a level. It can be `Mandatory`, `Info` and `Debug`. Its default is `Mandatory`. 

### SlowOperations

It shows the slow operations and invocations, Please refer to [SlowOperationDetector](/19_Performance/03_Slow_Operation_Detector.md) for more information.

### Invocations

It shows all kinds of statistics about current and past invocations including current pending invocations, history of invocations and slow history, i.e. all samples where the invocation took more than the defined threshold.  Slow history does not only include the invocations where the operations took a lot of time, but it also includes any other invocations that have been obstructed.

Using the following properties, you can configure the frequency of scanning all pending invocations and the threshold that makes an invocation to be considered as slow:

* `hazelcast.diagnostics.invocation.sample.period.seconds`: Set a value in seconds. Its default is 60.
* `hazelcast.diagnostics.invocation.slow.threshold.seconds`: Set a value in seconds. Its default is 5.

### HazelcastInstance

It shows the basic state of your Hazelcast cluster including the count and addresses of current members and the address of master member. It is useful to get a fast impression of the cluster without needing to analyze a lot of data.

You can configure the frequency at which the cluster information is dumped to the log file using the following property:

* `hazelcast.diagnostics.memberinfo.period.second`: Set a value in seconds. Its default is 60.

### SystemLog

It shows the activities in your cluster including when a connection/member is added or removed, and if there is a change in the lifecycle of the cluster. It also includes the reasons for connection closings.

You can enable or disable the system log diagnostics plugin, and configure whether it shows information about partition migrations using the following properties:

* `hazelcast.diagnostics.systemlog.enabled`: Its default is `true`.
* `hazelcast.diagnostics.systemlog.partitions`: Its default is false. Please note that if you enable this, you may get a lot of log entries if you have many partitions.


### StoreLatency

It shows statistics including the count of methods for each store (`load`, `loadAll`, `loadAllKeys`, etc.), average and maximum latencies for each store method calls, and latency distributions for each store. The following is an example output snippet as part of the diagnostics log file for Hazelcast MapStore:

```
17-9-2016 13:12:34 MapStoreLatency[
                          map[
                                  loadAllKeys[
                                          count=1
                                          totalTime(us)=8
                                          avg(us)=8
                                          max(us)=8
                                          latency-distribution[
                                                  0..99us=1]]
                                  load[
                                          count=100
                                          totalTime(us)=4,632,190
                                          avg(us)=46,321
                                          max(us)=99,178
                                          latency-distribution[
                                                  0..99us=1
                                                  1600..3199us=3
                                                  3200..6399us=3
                                                  6400..12799us=7
                                                  12800..25599us=13
                                                  25600..51199us=32
                                                  51200..102399us=41]]]]
```

According to your store usage, a similar output can be seen for Hazelcast JCache, Queue and Ringbuffer with persistent datastores.

You can control the StoreLatency plugin using the following properties:

- `hazelcast.diagnostics.storeLatency.period.seconds`: The frequency this plugin is writing the collected information to the disk. By default it is disabled. A sensible production value would be 60 (seconds).
- `hazelcast.diagnostics.storeLatency.reset.period.seconds`: The period of resetting the statistics. If, for example, it is set as 300 (5 minutes), all the statistics are cleared for every 5 minutes. By default it is 0, meaning that statistics are not reset.

