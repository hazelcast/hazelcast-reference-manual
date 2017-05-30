
Having installed Hazelcast, you can get started. 

In this short tutorial, you perform the following activities.

1. Create a simple Java application using the Hazelcast distributed map and queue. 
2. Run our application twice to have a cluster with two members (JVMs). 
3. Connect to our cluster from another Java application by using the Hazelcast Native Java Client API.

Let's begin.


- The following code starts the first Hazelcast member and creates and uses the `customers` map and queue.

```java
import com.hazelcast.core.*;
import com.hazelcast.config.*;
 
import java.util.Map;
import java.util.Queue;
 
public class GettingStarted {
    public static void main(String[] args) {
        Config cfg = new Config();
        HazelcastInstance instance = Hazelcast.newHazelcastInstance(cfg);
        Map<Integer, String> mapCustomers = instance.getMap("customers");
        mapCustomers.put(1, "Joe");
        mapCustomers.put(2, "Ali");
        mapCustomers.put(3, "Avi");
 
        System.out.println("Customer with key 1: "+ mapCustomers.get(1));
        System.out.println("Map Size:" + mapCustomers.size());
 
        Queue<String> queueCustomers = instance.getQueue("customers");
        queueCustomers.offer("Tom");
        queueCustomers.offer("Mary");
        queueCustomers.offer("Jane");
        System.out.println("First customer: " + queueCustomers.poll());
        System.out.println("Second customer: "+ queueCustomers.peek());
        System.out.println("Queue size: " + queueCustomers.size());
    }
}
```

- Run this `GettingStarted` class a second time to get the second member 
started. The members form a cluster and the output is similar to the following.

```
Members [2] {
  Member [127.0.0.1:5701]
  Member [127.0.0.1:5702] this
}                              
```

- Now, add the `hazelcast-client-`*`<version>`*`.jar` library to your classpath. 
This is required to use a Hazelcast client.

- The following code starts a Hazelcast Client, connects to our cluster, 
and prints the size of the `customers` map.

```java
package com.hazelcast.test;

import com.hazelcast.client.config.ClientConfig;
import com.hazelcast.client.HazelcastClient;
import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.core.IMap;

public class GettingStartedClient {
    public static void main( String[] args ) {
        ClientConfig clientConfig = new ClientConfig();
        HazelcastInstance client = HazelcastClient.newHazelcastClient( clientConfig );
        IMap map = client.getMap( "customers" );
        System.out.println( "Map Size:" + map.size() );
    }
}
```
- When you run it, you see the client properly connecting to the cluster 
and printing the map size as **3**.

Hazelcast also offers a tool, **Management Center**, that enables you to monitor your cluster. 
To use it, deploy the `mancenter-`*`<version>`*`.war` included in the ZIP file to your web server. 
You can use it to monitor your maps, queues, and other distributed data structures and members. Please 
see the [Management Center section](/17_Management/06_Management_Center) for usage explanations.


By default, Hazelcast uses Multicast to discover other members that can form a cluster.  If you are 
working with other Hazelcast developers on the same network, you may find yourself joining their 
clusters under the default settings.  Hazelcast provides a way to segregate clusters within the same 
network when using Multicast. Please see the [Creating Cluster Groups](/04_Setting_Up_Clusters/06_Creating_Cluster_Groups.md) 
for more information.  Alternatively, if you do not wish to use the default Multicast mechanism, 
you can provide a fixed list of IP addresses that are allowed to join. Please see 
the [Join Configuration section](/04_Setting_Up_Clusters/10_Other_Network_Configurations.md) for more information.
<br> </br>

***RELATED INFORMATION***

*You can also check the video tutorials <a href="http://hazelcast.org/getting-started/" target="_blank">here</a>.*
