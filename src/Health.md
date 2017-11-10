

## Health Check and Monitoring

Hazelcast provides an HTTP based health check implementation and a Health Monitoring utility explained as below.


### Health Check

This is Hazelcast's HTTP based health check implementation which provides basic information about your cluster and member (on which it is launched). 

First, you need to enable the health check. To do this, set the `hazelcast.http.healthcheck.enabled` system property to `true`. By default, it is `false`.

Now you retrieve information about your cluster's health status (member state, cluster state, cluster size, etc.) by launching `http://<your member's host IP>:5701/hazelcast/health` on your preferred browser.

An example output is given below:

```
Hazelcast::NodeState=ACTIVE
Hazelcast::ClusterState=ACTIVE
Hazelcast::ClusterSafe=TRUE
Hazelcast::MigrationQueueSize=0
Hazelcast::ClusterSize=2
```

Please refer to the [Managing Cluster and Member States section](#managing-cluster-and-member-states) to learn more about each state of a Hazelcast cluster and member.


### Health Monitor

Health monitor periodically prints logs in your console to provide information about your member's state. By default, it is enabled when you start your cluster.

You can set the interval of health monitoring using the `hazelcast.health.monitoring.delay.seconds` system property. Its default value is 30 seconds.

The system property `hazelcast.health.monitoring.level` is used to configure the monitoring's log level. If it is set to OFF, the monitoring will be disabled. If it is set to NOISY, monitoring logs are always printed for the defined intervals. When it is SILENT, which is the default value, monitoring logs are printed only when the values exceed some predefined thresholds. These thresholds are related to memory and CPU percentages, and can be configured using the `hazelcast.health.monitoring.threshold.memory.percentage` and `hazelcast.health.monitoring.threshold.cpu.percentage` system properties, whose default values are both 70.

The following is an example monitoring output


```
Sep 08, 2017 5:02:28 PM com.hazelcast.internal.diagnostics.HealthMonitor

INFO: [192.168.2.44]:5701 [host-name] [3.9] processors=4, physical.memory.total=16.0G, physical.memory.free=5.5G, swap.space.total=0, swap.space.free=0, heap.memory.used=102.4M, 

heap.memory.free=249.1M, heap.memory.total=351.5M, heap.memory.max=3.6G, heap.memory.used/total=29.14%, heap.memory.used/max=2.81%, minor.gc.count=4, minor.gc.time=68ms, major.gc.count=1, 

major.gc.time=41ms, load.process=0.44%, load.system=1.00%, load.systemAverage=315.48%, thread.count=97, thread.peakCount=98, cluster.timeDiff=0, event.q.size=0, executor.q.async.size=0, 

executor.q.client.size=0, executor.q.query.size=0, executor.q.scheduled.size=0, executor.q.io.size=0, executor.q.system.size=0, executor.q.operations.size=0, 

executor.q.priorityOperation.size=0, operations.completed.count=226, executor.q.mapLoad.size=0, executor.q.mapLoadAllKeys.size=0, executor.q.cluster.size=0, executor.q.response.size=0, 

operations.running.count=0, operations.pending.invocations.percentage=0.00%, operations.pending.invocations.count=0, proxy.count=0, clientEndpoint.count=1, 

connection.active.count=2, client.connection.count=1, connection.count=1
```


![Note](images/NoteSmall.jpg) ***NOTE:*** *Please see the [Configuring with System Properties section](#configuring-with-system-properties) to learn how to set system properties.*

