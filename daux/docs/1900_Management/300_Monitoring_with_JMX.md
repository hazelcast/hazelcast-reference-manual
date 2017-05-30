

You can monitor your Hazelcast members via the JMX protocol.

To achieve this, first add the following system properties to enable <a href="http://download.oracle.com/javase/1.5.0/docs/guide/management/agent.html" target="_blank">JMX agent</a>:

   - `-Dcom.sun.management.jmxremote`
   - `-Dcom.sun.management.jmxremote.port=\_portNo\_` (to specify JMX port, the default is `1099`) (*optional*)
   - `-Dcom.sun.management.jmxremote.authenticate=false` (to disable JMX auth) (*optional*)


Then enable the Hazelcast property `hazelcast.jmx` (please refer to the [System Properties section](/25_System_Properties.md)) using one of the following ways:

- By declarative configuration:
   
```
<properties>
   <property name="hazelcast.jmx">true</property>
</properties>   
```

- By programmatic configuration:
   
`config.setProperty("hazelcast.jmx", "true");`
   
- By Spring XML configuration:
   
```
<hz:properties>
  <hz: property name="hazelcast.jmx">true</hz:property>
</hz:properties>
```
   
- By setting the system property `-Dhazelcast.jmx=true`
   

### MBean Naming for Hazelcast Data Structures

Hazelcast set the naming convention for MBeans as follows:

```
final ObjectName mapMBeanName = new ObjectName("com.hazelcast:instance=_hzInstance_1_dev,type=IMap,name=trial");
```

The MBeans name consists of the Hazelcast instance name, the type of the data structure, and that data structure's name. In the above sample, `_hzInstance_1_dev` is the instance name, we connect to an IMap with the name `trial`. 



### Connecting to JMX Agent

One of the ways you can connect to JMX agent is using jconsole, jvisualvm (with MBean plugin) or another JMX compliant monitoring tool.

The other way to connect is to use a custom JMX client. 

First, you need to specify the URL where the Hazelcast JMX service is running. Please see the following sample code snippet. The `port` in this sample should be the one that you define while setting the JMX remote port number (if different than the default port `1099`).


```java
// Parameters for connecting to the JMX Service
int port = 1099;
String hostname = InetAddress.getLocalHost().getHostName();
JMXServiceURL url = new JMXServiceURL("service:jmx:rmi://" + hostname + ":" + port + "/jndi/rmi://" + hostname + ":" + port + "/jmxrmi");
```

Then use the URL you acquired to connect to the JMX service and get the `JMXConnector` object. Using this object, get the `MBeanServerConnection` object. The `MBeanServerConnection` object will enable you to use the MBean methods. Please see the example code below.


```java
// Connect to the JMX Service
JMXConnector jmxc = JMXConnectorFactory.connect(url, null);
MBeanServerConnection mbsc = jmxc.getMBeanServerConnection();
```

Once you get the `MBeanServerConnection` object, you can call the getter methods of MBeans as follows:

```java
System.out.println("\nTotal entries on map " + mbsc.getAttribute(mapMBeanName, "name") + " : "
                + mbsc.getAttribute(mapMBeanName, "localOwnedEntryCount"));
```        






