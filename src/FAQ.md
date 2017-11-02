

# Frequently Asked Questions




## Why 271 as the default partition count?

The partition count of 271, being a prime number, is a good choice because it will be distributed to the members almost evenly. For a small to medium sized cluster, the count of 271 gives an almost even partition distribution and optimal-sized partitions.  As your cluster becomes bigger, you should make this count bigger to have evenly distributed partitions.

<br></br>

## Is Hazelcast thread safe?

Yes. All Hazelcast data structures are thread safe.

<br></br>
## How do members discover each other?


When a member is started in a cluster, it will dynamically and automatically be discovered. The following are the types of discovery:

-	Discovery by TCP/IP: the first member created in the cluster (leader) will form a list of IP addresses of other joining members and will send this list to these members so the members will know each other.
-	Discovery at clouds: Hazelcast supports discovery at cloud platforms such as jclouds based environments, Azure, Consul, and PCF. 
- -	Multicast discovery: members in a cluster discover each other by multicast, by default. It is not recommended for production since UDP is often blocked in production environments and other discovery mechanisms are more definite


Once members are discovered, all the communication between them will be via TCP/IP.
<br></br>
***RELATED INFORMATION***

*Please refer to the [Discovery Mechanisms section](#discovery-mechanisms) for detailed information.*

<br></br>

## What happens when a member goes down?

Once a member is gone (crashes), the following happens since data in each member has a backup in other members.

-	First, the backups in other members are restored.
-	Then, data from these restored backups are recovered.
-	And finally, new backups for these recovered data are formed.

So eventually, availability of the data is maintained. 

<br></br>

## How do I test the connectivity?

If you notice that there is a problem with a member joining a cluster, you may want to perform a connectivity test between the member to be joined and a member from the cluster. You can use the `iperf` tool for this purpose. For example, you can execute the below command on one member (i.e. listening on port 5701).

`iperf -s -p 5701`

And you can execute the below command on the other member.

`iperf -c` *`<IP address>`* `-d -p 5701`

The output should include connection information, such as the IP addresses, transfer speed, and bandwidth. Otherwise, if the output says `No route to host`, it means a network connection problem exists.

<br></br>


## How do I choose keys properly?

When you store a key and value in a distributed Map, Hazelcast serializes the key and value, and stores the byte array version of them in local ConcurrentHashMaps. These ConcurrentHashMaps use `equals` and `hashCode` methods of byte array version of your key. It does not take into account the actual `equals` and `hashCode` implementations of your objects. So it is important that you choose your keys in a proper way. 

Implementing `equals` and `hashCode` is not enough, it is also important that the object is always serialized into the same byte array. All primitive types like String, Long, Integer, etc. are good candidates for keys to be used in Hazelcast. An unsorted Set is an example of a very bad candidate because Java Serialization may serialize the same unsorted set in two different byte arrays.

<br></br>

## How do I reflect value modifications?

Hazelcast always return a clone copy of a value. Modifying the returned value does not change the actual value in the map (or multimap, list, set). You should put the modified value back to make changes visible to all members.

```java
V value = map.get( key );
value.updateSomeProperty();
map.put( key, value );
```

Collections which return values of methods (such as `IMap.keySet`, `IMap.values`, `IMap.entrySet`, `MultiMap.get`, `MultiMap.remove`, `IMap.keySet`, `IMap.values`) contain cloned values. These collections are NOT backed up by related Hazelcast objects. Therefore, changes to them are **NOT** reflected in the originals, and vice-versa.

<br></br>

## How do I test my Hazelcast cluster?

Hazelcast allows you to create more than one instance on the same JVM. Each member is called `HazelcastInstance` and each will have its own configuration, socket and threads, so you can treat them as totally separate instances. 

This enables you to write and to run cluster unit tests on a single JVM. Because you can use this feature for creating separate members different applications running on the same JVM (imagine running multiple web applications on the same JVM), you can also use this feature for testing your Hazelcast cluster.

Let's say you want to test if two members have the same size of a map.

```java
@Test
public void testTwoMemberMapSizes() {
  // start the first member
  HazelcastInstance h1 = Hazelcast.newHazelcastInstance();
  // get the map and put 1000 entries
  Map map1 = h1.getMap( "testmap" );
  for ( int i = 0; i < 1000; i++ ) {
    map1.put( i, "value" + i );
  }
  // check the map size
  assertEquals( 1000, map1.size() );
  // start the second member
  HazelcastInstance h2 = Hazelcast.newHazelcastInstance();
  // get the same map from the second member
  Map map2 = h2.getMap( "testmap" );
  // check the size of map2
  assertEquals( 1000, map2.size() );
  // check the size of map1 again
  assertEquals( 1000, map1.size() );
}
```

In the test above, everything happens in the same thread. When developing a multi-threaded test, you need to carefully handle coordination of the thread executions. it is highly recommended that you use `CountDownLatch` for thread coordination (you can certainly use other ways). Here is an example where we need to listen for messages and make sure that we got these messages.

```java
@Test
public void testTopic() {
  // start two member cluster
  HazelcastInstance h1 = Hazelcast.newHazelcastInstance();
  HazelcastInstance h2 = Hazelcast.newHazelcastInstance();
  String topicName = "TestMessages";
  // get a topic from the first member and add a messageListener
  ITopic<String> topic1 = h1.getTopic( topicName );
  final CountDownLatch latch1 = new CountDownLatch( 1 );
  topic1.addMessageListener( new MessageListener() {
    public void onMessage( Object msg ) {
      assertEquals( "Test1", msg );
      latch1.countDown();
    }
  });
  // get a topic from the second member and add a messageListener
  ITopic<String> topic2 = h2.getTopic(topicName);
  final CountDownLatch latch2 = new CountDownLatch( 2 );
  topic2.addMessageListener( new MessageListener() {
    public void onMessage( Object msg ) {
      assertEquals( "Test1", msg );
      latch2.countDown();
    }
  } );
  // publish the first message, both should receive this
  topic1.publish( "Test1" );
  // shutdown the first member
  h1.shutdown();
  // publish the second message, second member's topic should receive this
  topic2.publish( "Test1" );
  try {
    // assert that the first member's topic got the message
    assertTrue( latch1.await( 5, TimeUnit.SECONDS ) );
    // assert that the second members' topic got two messages
    assertTrue( latch2.await( 5, TimeUnit.SECONDS ) );
  } catch ( InterruptedException ignored ) {
  }
}
```
You can start Hazelcast members with different configurations. Remember to call `Hazelcast.shutdownAll()` after each test case to make sure that there is no other running member left from the previous tests.

```java
@After
public void cleanup() throws Exception {
  Hazelcast.shutdownAll();
}
```

For more information please <a href="https://github.com/hazelcast/hazelcast/tree/master/hazelcast/src/test/java/com/hazelcast/cluster" target="_blank">check our existing tests</a>.

<br></br>


## Does Hazelcast support hundreds of members?

Yes. Hazelcast performed a successful test on Amazon EC2 with 200 members.

<br></br>


## Does Hazelcast support thousands of clients?

Yes. However, there are some points you should consider. The environment should be LAN with a high stability and the network speed should be 10 Gbps or higher. If the number of members is high, the client type should be selected as Dummy, not Smart Client. In the case of Smart Clients, since each client will open a connection to the members, these members should be powerful enough (for example, more cores) to handle hundreds or thousands of connections and client requests. Also, you should consider using Near Caches in clients to lower the network traffic. And you should use the Hazelcast releases with the NIO implementation (which starts with Hazelcast 3.2).

Also, you should configure the clients attentively. Please refer to the [Clients section](#hazelcast-clients) section for configuration notes.

<br></br>

## Difference between Lite Member and Smart Client?

Lite member supports task execution (distributed executor service), smart client does not. Also, Lite Member is highly coupled with cluster, smart client is not.
Starting with Hazelcast 3.9, you can also promote lite members to data members. Please refer to the [Lite Members section](#enabling-lite-members) for more information. 

<br></br>

## How do you give support?

We have two support services: community and commercial support. Community support is provided through our <a href="https://groups.google.com/forum/#!forum/hazelcast" target="_blank">Mail Group</a> and <a href="http://stackoverflow.com/" target="_blank">StackOverflow</a> web site. For information on support subscriptions, please see <a href="https://hazelcast.com/pricing/" target="_blank">Hazelcast.com</a>.

<br></br>

## Does Hazelcast persist?

No. However, Hazelcast provides `MapStore` and `MapLoader` interfaces. For example, when you implement the `MapStore` interface, Hazelcast calls your store and load methods whenever needed.

<br></br>

## Can I use Hazelcast in a single server?

Yes. But please note that Hazelcast's main design focus is multi-member clusters to be used as a distribution platform. 

<br></br>

## How can I monitor Hazelcast?

[Hazelcast Management Center](http://docs.hazelcast.org/docs/management-center/latest/manual/html/index.html) is what you use to monitor and manage the members running Hazelcast. In addition to monitoring the overall state of a cluster, you can analyze and browse data structures in detail, you can update map configurations, and you can take thread dumps from members.

You can also use Hazelcast's HTTP based health check implementation and health monitoring utility. Please see the [Health Check and Monitoring section](#health-check-and-monitoring). There is also a [diagnostocs tool](#diagnostics) where you can see detailed logs enhanced with diagnostic plugins.

Moreover, JMX monitoring is also provided. Please see the [Monitoring with JMX section](#monitoring-with-jmx) for details.

<br></br>

## How can I see debug level logs?

By changing the log level to "Debug". Below are sample lines for **log4j** logging framework. Please see the [Logging Configuration section](#logging-configuration) to learn how to set logging types.

First, set the logging type as follows.

```java
String location = "log4j.configuration";
String logging = "hazelcast.logging.type";
System.setProperty( logging, "log4j" );
/**if you want to give a new location. **/
System.setProperty( location, "file:/path/mylog4j.properties" );
```

Then set the log level to "Debug" in the properties file. Below is example content.


`# direct log messages to stdout #`

`log4j.appender.stdout=org.apache.log4j.ConsoleAppender`

`log4j.appender.stdout.Target=System.out`

`log4j.appender.stdout.layout=org.apache.log4j.PatternLayout`

`log4j.appender.stdout.layout.ConversionPattern=%d{ABSOLUTE} %5p [%c{1}] - %m%n`

<br> </br>

`log4j.logger.com.hazelcast=debug`

`#log4j.logger.com.hazelcast.cluster=debug`

`#log4j.logger.com.hazelcast.partition=debug`

`#log4j.logger.com.hazelcast.partition.InternalPartitionService=debug`

`#log4j.logger.com.hazelcast.nio=debug`

`#log4j.logger.com.hazelcast.hibernate=debug`

The line `log4j.logger.com.hazelcast=debug` is used to see debug logs for all Hazelcast operations. Below this line, you can select to see specific logs (cluster, partition, hibernate, etc.).

<br></br>

## Client-server vs. embedded topologies?

In the embedded topology, members include both the data and application. This type of topology is the most useful if your application focuses on high performance computing and many task executions. Since application is close to data, this topology supports data locality. 

In the client-server topology, you create a cluster of members and scale the cluster independently. Your applications are hosted on the clients, and the clients communicate with the members in the cluster to reach data. 

Client-server topology fits better if there are multiple applications sharing the same data or if application deployment is significantly greater than the cluster size (for example, 500 application servers vs. 10 member cluster).

<br></br>

## How can I shutdown a Hazelcast member

Ways of shutting down a Hazelcast instance:

- You can call `kill -9 <PID>` in the terminal (which sends a SIGKILL signal). This will result in the immediate shutdown which is not recommended for production systems. If you set the property `hazelcast.shutdownhook.enabled` to `false` and then kill the process using `kill -15 <PID>`, its result is the same (immediate shutdown).

- You can call `kill -15 <PID>` in the terminal (which sends a SIGTERM signal) or you can call the method `HazelcastInstance#getLifecycleService().terminate()` programatically. Both will terminate your member ungracefully. They do not wait for migration operations, they force the shutdown. But this is much better than `kill -9 <PID>` since it releases most of the used resources.

- In order to gracefully shutdown a Hazelcast member (so that it waits the migration operations to be completed), you have four options:
  - You can call the method `HazelcastInstance#shutdown()` programatically.
  - You can use JMX API's shutdown method. You can do this by implementing a JMX client application or using a JMX monitoring tool (like JConsole).
  - You can set the property `hazelcast.shutdownhook.policy` to `GRACEFUL` and then shutdown by using `kill -15 <PID>`. Your member will be gracefully shutdown.
  - You can use the "Shutdown Member" button in the member view of [Hazelcast Management Center](http://docs.hazelcast.org/docs/management-center/latest/manual/html/Monitoring_Members.html).

If you use systemd's `systemctl` utility, i.e., `systemctl stop service_name`, a SIGTERM signal is sent. After 90 seconds of waiting it is followed by a SIGKILL signal by default. Thus, it will call terminate at first, and kill the member directly after 90 seconds. We do not recommend to use it with its defaults. But [systemd](https://www.linux.com/learn/understanding-and-using-systemd) is very customizable and well-documented, you can see its details using the command  `man systemd.kill`. If you can customize it to shutdown your Hazelcast member gracefully (by using the methods above), then you can use it.

<br></br>

## How do I know it is safe to kill the second member?

Starting with Hazelcast 3.7, graceful shutdown of a Hazelcast member can be initiated any time as follows:  

```java
  hazelcastInstance.shutdown(); 
```

Once a Hazelcast member initiates a graceful shutdown, data of the shutting down member is migrated to the other nodes automatically.

However, there is no such guarantee for termination.

Below code snippet terminates a member if the cluster is safe, which means that there are no partitions being migrated and all backups are in sync when this method is called.

```java
PartitionService partitionService = hazelcastInstance.getPartitionService();
if (partitionService.isClusterSafe()) {
  hazelcastInstance.getLifecycleService().terminate(); 
}
```

Below code snippet terminates the local member if the member is safe to terminate, which means that all backups of partitions currently owned by local member are in sync when this method is called.

```java
PartitionService partitionService = hazelcastInstance.getPartitionService();
if (partitionService.isLocalMemberSafe()) {
  hazelcastInstance.getLifecycleService().terminate();
}
```

Please keep in mind that two code snippets shown above are inherently racy. If member failures occur in the cluster after the safety condition check passes, termination of the local member can lead to data loss. For safety of the data, graceful shutdown API is highly recommended.  

***RELATED INFORMATION***

*Please refer to [Safety Checking Cluster Members](#safety-checking-cluster-members) for more information.*

<br></br>

## When do I need Native Memory solutions?

Native Memory solutions can be preferred:

- when the amount of data per member is large enough to create significant garbage collection pauses.
- when your application requires predictable latency.

<br></br>

## Is there any disadvantage of using near-cache?

The only disadvantage when using Near Cache is that it may cause stale reads.

<br></br>

## Is Hazelcast secure?

Hazelcast supports symmetric encryption, transport layer security and secure sockets layer (TLS/SSL), and Java Authentication and Authorization Service (JAAS). Please see the [Security chapter](#security) for more information.

<br></br>


## How can I set socket options?

Hazelcast allows you to set some socket options such as `SO_KEEPALIVE`, `SO_SNDBUF`, and `SO_RCVBUF` using Hazelcast configuration properties. Please see `hazelcast.socket.*` properties explained in the [System Properties section](#system-properties).

<br></br>

## Client disconnections during idle time?

In Hazelcast, socket connections are created with the `SO_KEEPALIVE` option enabled by default. In most operating systems, default keep-alive time is 2 hours. If you have a firewall between clients and servers which is configured to reset idle connections/sessions, make sure that the firewall's idle timeout is greater than the TCP keep-alive defined in the OS.

For additional information please see:

 - <a href="http://tldp.org/HOWTO/TCP-Keepalive-HOWTO/usingkeepalive.html" target="_blank">Using TCP keepalive under Linux</a>
 - <a href="http://technet.microsoft.com/en-us/library/cc957549.aspx" target="_blank">Microsoft TechNet</a>
 
 <br></br>

## OOME: Unable to create new native thread?

If you encounter an error of `java.lang.OutOfMemoryError: unable to create new native thread`, it may be caused by exceeding the available file descriptors on your operating system, especially if it is Linux. This exception is usually thrown on a running member, after a period of time when the thread count exhausts the file descriptor availability.

The JVM on Linux consumes a file descriptor for each thread created.  The default number of file descriptors available in Linux is usually 1024. If you have many JVMs running on a single machine, it is possible to exceed this default number.

You can view the limit using the following command.

`# ulimit -a`

At the operating system level, Linux users can control the amount of resources (and in particular, file descriptors) used via one of the following options.

1 - Editing the `limits.conf` file:

`# vi /etc/security/limits.conf` 

```
testuser soft nofile 4096<br>
testuser hard nofile 10240<br>
```

2 - Or using the `ulimit` command:

`# ulimit -Hn`

```
10240
```

The default number of process per users is 1024. Adding the following to your `$HOME/.profile` could solve the issue:

`# ulimit -u 4096`

<br></br>

## Does repartitioning wait for Entry Processor?

Repartitioning is the process of redistributing the partition ownerships. Hazelcast performs the repartitioning in the cases where a member leaves the cluster or joins the cluster. If a repartitioning will happen while an entry processor is active in a member processing on an entry object, the repartitioning waits for the entry processor to complete its job.

## Instances on different machines cannot see each other?

Assume you have two instances on two different machines and you develop a configuration as shown below.

```java
Config config = new Config();
NetworkConfig network = config.getNetworkConfig();

JoinConfig join = network.getJoin();
join.getMulticastConfig().setEnabled(false);
join.getTcpIpConfig().addMember("IP1")
    .addMember("IP2").setEnabled(true);
network.getInterfaces().setEnabled(true)
    .addInterface("IP1").addInterface("IP2");
```    
When you create the Hazelcast instance, you have to pass the configuration to the instance. If you create the instances without passing the configuration, each instance starts but cannot see each other. Therefore, a correct way to create the instance is the following:

```
HazelcastInstance instance = Hazelcast.newHazelcastInstance(config);
```

The following is an incorrect way:

```
HazelcastInstance instance = Hazelcast.newHazelcastInstance();
```

 
## What Does "Replica: 1 has no owner" Mean?

When you start more members after the first one is started, you will see `replica: 1 has no owner` entry in the newly started member's log. There is no need to worry about it since it refers to a transitory state. It only means the replica partition is not ready/assigned yet and eventually it will be.






