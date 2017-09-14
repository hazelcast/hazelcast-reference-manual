
## Diagnostics

Starting with Hazelcast 3.7, Hazelcast offers an extended set of diagnostics plugins for both Hazelcast members and clients. A dedicated log file is used to write the diagnostics content, and a rolling file approach is used to prevent taking up too much disk space.

### Enabling Diagnostics Logging

To enable diagnostics logging, you should specify the following properties an the member side:

```
-Dhazelcast.diagnostics.enabled=true
-Dhazelcast.diagnostics.metric.level=info
-Dhazelcast.diagnostics.invocation.sample.period.seconds=30
-Dhazelcast.diagnostics.pending.invocations.period.seconds=30
-Dhazelcast.diagnostics.slowoperations.period.seconds=30
-Dhazelcast.diagnostics.storeLatency.period.seconds=60
```

At the client side you should specify the following properties:

```
-Dhazelcast.diagnostics.enabled=true
-Dhazelcast.diagnostics.metric.level=info
```

### Diagnostics Log File

You can use the following property to specify the location of the diagnostics log file:


```
-Dhazelcast.diagnostics.directory=/your/log/directory
```

The name of the log file has the following format:

```
diagnostics-<host IP>#<port>-<unique ID>.log
```

The name of the log file can be prefixed with a custom string as shown below:

```
-Dhazelcast.diagnostics.filename.prefix=foobar
```

The content format of the diagnostics log file is depicted below:

```
<Date> BuildInfo[
				<log content for BuildInfo diagnostics plugin>]

<Date> SystemProperties[
				<log content for SystemProperties diagnostics plugin>]
				
<Date> ConfigProperties[
				<log content for ConfigProperties diagnostics plugin>]

<Date> Metrics[
				<log content for Metrics diagnostics plugin>]
				
<Date> SlowOperations[
				<log content for SlowOperations diagnostics plugin>]
				
<Date> HazelcastInstance[
				<log content for HazelcastInstance diagnostics plugin>]
				
...
...
...
```

A rolling file approach is used to prevent creating too much data. By default 10 files of 50MB each are allowed
to exist. The size of the file can be changed using the following property:

```
-Dhazelcast.diagnostics.max.rolled.file.size.mb=100
```

You can also set the number of files using the following property:

```
-Dhazelcast.diagnostics.max.rolled.file.count=5
```

In Hazelcast 3.9 the default file size has been upgraded from 10MB to 50MB. 

### Diagnostics Plugins

As it is stated in the introduction of this section and shown in the log file content above, diagnostics utility consists of plugins such as BuildInfo, SystemProperties, and HazelcastInstance.

##### BuildInfo

It shows the detailed Hazelcast build information including the Hazelcast release number, `Git` revision number, and whether you have Hazelcast IMDG Enterprise or not.

##### SystemProperties

It shows all the properties and their values in your system used by and configured for your Hazelcast installation. These are the properties starting with `java` (excluding `java.awt`), `hazelcast`, `sun` and `os`. It also includes the arguments that are used to startup the JVM.

##### ConfigProperties

It shows the Hazelcast properties and their values explicitly set by you either on the command line (with `-D`) or by using declarative/programmatic configuration.

##### Metrics

It shows a comprehensive log of what is happening in your Hazelcast system.

You can configure the level of detail and frequency of dumping information to the log file using the following properties:

* `hazelcast.diagnostics.metrics.period.seconds`: Set a value in seconds. Its default is 60.
* `hazelcast.diagnostics.metrics.level`: Set a level. It can be `Mandatory`, `Info` and `Debug`. Its default is `Mandatory`. 

##### SlowOperations

It shows the slow operations and invocations, Please refer to [SlowOperationDetector](#slowoperationdetector) for more information.

##### Invocations

It shows all kinds of statistics about current and past invocations including current pending invocations, history of invocations and slow history, i.e. all samples where the invocation took more than the defined threshold.  Slow history does not only include the invocations where the operations took a lot of time, but it also includes any other invocations that have been obstructed.

Using the following properties, you can configure the frequency of scanning all pending invocations and the threshold that makes an invocation to be considered as slow:

* `hazelcast.diagnostics.invocation.sample.period.seconds`: Set a value in seconds. Its default is 60.
* `hazelcast.diagnostics.invocation.slow.threshold.seconds`: Set a value in seconds. Its default is 5.

##### HazelcastInstance

It shows the basic state of your Hazelcast cluster including the count and addresses of current members and the address of master member. It is useful to get a fast impression of the cluster without needing to analyze a lot of data.

You can configure the frequency at which the cluster information is dumped to the log file using the following property:

* `hazelcast.diagnostics.memberinfo.period.second`: Set a value in seconds. Its default is 60.

##### SystemLog

It shows the activities in your cluster including when a connection/member is added or removed, and if there is a change in the lifecycle of the cluster. It also includes the reasons for connection closings.

You can enable or disable the system log diagnostics plugin, and configure whether it shows information about partition migrations using the following properties:

* `hazelcast.diagnostics.systemlog.enabled`: Its default is `true`.
* `hazelcast.diagnostics.systemlog.partitions`: Its default is false. Please note that if you enable this, you may get a lot of log entries if you have many partitions.


##### StoreLatency

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

##### OperationHeartbeats

It shows the deviation between member/member operation heartbeats. Every member will send to every other member, regardless if
there is an operation running on behalf of that member, an operation heartbeat. It contains a listing of all `callId`s of the running
operations from a given member. This plugin also works fine between members/lite-members.

Because this operation heartbeat is sent periodically; by default 1/4 of the operation call timeout of 60 seconds, we would expect
an operation heartbeat to be received every 15 seconds. Operation heartbeats are high priority packets (so they overtake regular packets)
and are processed by an isolated thread in the invocation monitor. If there is any deviation in the frequency of receiving
these packets, it may be due to the problems such as network latencies.

The following shows an example of the output where an operation heartbeat has not been received for 37 seconds:

```
20-7-2017 11:12:55 OperationHeartbeats[
                                  member[10.212.1.119]:5701[
                                          deviation(%)=146.6666717529297
                                          noHeartbeat(ms)=37,000
                                          lastHeartbeat(ms)=1,500,538,375,603
                                          lastHeartbeat(date-time)=20-7-2017 11:12:55
                                          now(ms)=1,500,538,338,603
                                          now(date-time)=20-7-2017 11:12:18]]]
```

The OperationHeartbeats plugin is enabled by default since it has very little overhead and will only print to the diagnostics
file if the max-deviation (explained below) is exceeded. 

You can control the OperationHeartbeats plugin using the following properties:

- `hazelcast.diagnostics.operation-heartbeat.seconds`: The frequency this plugin is writing the collected information to the disk. It is configured to be 10 seconds by default. 0 disables the plugin.
- `hazelcast.diagnostics.operation-heartbeat.max-deviation-percentage`:  The maximum allowed deviation percentage. Its default value is 33. For example, with a default 60 call timeout and operation heartbeat interval being 15 seconds, the maximum deviation with a deviation-percentage of 33, is 5 seconds. So there is no problem if a packet is arrived after 19 seconds, but if it arrives after 21 seconds, then the plugin will render.

##### MemberHeartbeats

This plugin looks a lot like the OperationHeartbeats plugin, but instead of relying on operation heartbeats to determine the deviation, it relies on member/member cluster heartbeats. Every member will send a heartbeat to every other member periodically (by default every 5 seconds).

Just like the OperationHeartbeats, the MemberHeartbeats plugin can be used to detect if there are networking problems long before they actually lead to problems such as split-brain syndromes.

The following shows an example of the output where no member/member heartbeat has been received for 9 seconds:

```
20-7-2017 19:32:22 MemberHeartbeats[
                          member[10.212.1.119]:5701[
                                  deviation(%)=80.0
                                  noHeartbeat(ms)=9,000
                                  lastHeartbeat(ms)=1,500,568,333,645
                                  lastHeartbeat(date-time)=20-7-2017 19:32:13
                                  now(ms)=1,500,568,342,645
                                  now(date-time)=20-7-2017 19:32:22]]
```

The MemberHeartbeats plugin is enabled by default since it has very little overhead and will only print to the diagnostics
file if the max-deviation (explained below) is exceeded. 

You can control the MemberHeartbeats plugin using the following properties:

- `hazelcast.diagnostics.member-heartbeat.seconds`: The frequency this plugin is writing the collected information to the disk. It is configured to be 10 seconds by default. 0 disables the plugin.
- `hazelcast.diagnostics.member-heartbeat.max-deviation-percentage`:  The maximum allowed deviation percentage. Its default value is 100.  For example, if the interval of member/member heartbeats is 5 seconds, a 100% deviation will be fine with heartbeats arriving up to 5 seconds after they are expected. So a heartbeat arriving after 9 seconds will not be rendered, but a heartbeat received after 11 seconds will be rendered.
                                                                                                                                   
                                                                                                                                   
