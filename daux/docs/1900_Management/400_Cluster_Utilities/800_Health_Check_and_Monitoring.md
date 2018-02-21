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

Please refer to the [Managing Cluster and Member States section](/Management/Cluster_Utilities/Managing_Cluster_and_Member_States.md) to learn more about each state of a Hazelcast cluster and member.


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


![Note](../../images/NoteSmall.jpg) ***NOTE:*** *Please see the [Configuring with System Properties section](/500_Understanding_Configuration/300_Configuring_with_System_Properties.md) to learn how to set system properties.*


### Using Health Check on F5 BIG-IP LTM

The F5® BIG-IP® Local Traffic Manager™ (LTM) can be used as a load balancer for Hazelcast cluster members. This section describes how you can configure a health monitor to check the Hazelcast member states.

#### Monitor Types

Following types of monitors can be used to track Hazelcast cluster members:

- HTTP Monitor: A custom HTTP monitor enables you to send a command to Hazelcast’s Health Check API using HTTP requests. This is a good choice if SSL/TLS is not enabled in your cluster. 
- HTTPS Monitor: A custom HTTPS monitor enables you to verify the health of Hazelcast cluster members by sending a command to Hazelcast’s Health Check API using Secure Socket Layer (SSL) security. This is a good choice if SSL/TLS is enabled in your cluster.
- TCP\_HALF\_OPEN Monitor: A TCP\_HALF\_OPEN monitor is a very basic monitor that only checks that the TCP port used by Hazelcast is open and responding to connection requests. It does not interact with the Hazelcast Health Check API. The TCP\_HALF\_OPEN monitor can be used with or without SSL/TLS.


#### Configuration

After signing in to the BIG-IP LTM User Interface, follow F5’s [instructions](https://support.f5.com/kb/en-us/products/big-ip_ltm/manuals/product/ltm-monitors-reference-11-6-0/3.html#unique_859105660) to create a new monitor. Next, apply the following configuration according to your monitor type.

##### HTTP/HTTPS Monitors

![Note](../../images/NoteSmall.jpg) ***NOTE:*** *Please note that you should enable the Hazelcast health check for HTTP/HTTPS monitors to run. To do this, set the `hazelcast.http.healthcheck.enabled` system property to true. By default, it is false.*

**Using a GET request:**

- Set the “Send String” as follows:

```
GET /hazelcast/health HTTP/1.1\r\n\nHost: [HOST-ADDRESS-OF-HAZELCAST-MEMBER] \r\nConnection: Close\r\n\r\n
```

- Set the “Receive String” as follows:	

```
Hazelcast::NodeState=ACTIVE\nHazelcast::ClusterState=ACTIVE\nHazelcast::ClusterSafe=TRUE\nHazelcast::MigrationQueueSize=0\nHazelcast::ClusterSize=([^\s]+)\n
```


The BIG-IP LTM monitors accept regular expressions in these strings allowing you to configure them as needed. The example provided above will remain green even if the cluster size changes.


**Using a HEAD request:**

- Set the “Send String” as follows:

```
HEAD /hazelcast/health HTTP/1.1\r\n\nHost: [HOST-ADDRESS-OF-HAZELCAST-MEMBER] \r\nConnection: Close\r\n\r\n
```

- Set the “Receive String” as follows:

```	
200 OK
```


As you can see, the HEAD request only checks for a `200 OK` response. A Hazelcast cluster member will send this status code when it is alive and running without issue. This provides a very basic health check. For increased flexibility, we recommend using the GET request API.


##### TCP\_HALF\_OPEN Monitors

- Set the "Type" as `TCP Half Open`.
- Optionally, set the "Alias Service Port" as the port of Hazelcast cluster member if you want to specify the port in the monitor.

