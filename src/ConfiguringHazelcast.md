
## Configuring Hazelcast

When Hazelcast starts up, it checks for the configuration as follows:

-	First, it looks for the `hazelcast.config` system property. If it is set, its value is used as the path. This is useful if you want to be able to change your Hazelcast configuration: you can do this because it is not embedded within the application. You can set the `config` option with the following command:
 
	`- Dhazelcast.config=`*`<path to the hazelcast.xml>`*.
	
	The path can be a normal one or a classpath reference with the prefix `classpath:`.
-	If the above system property is not set, Hazelcast then checks whether there is a `hazelcast.xml` file in the working directory.
-	If not, then it checks whether `hazelcast.xml` exists on the classpath.
-	If none of the above works, Hazelcast loads the default configuration, i.e. `hazelcast-default.xml` that comes with `hazelcast.jar`.



When you download and unzip `hazelcast-<`*version*`>.zip`, you will see a `hazelcast.xml` in the `/bin` folder. This is the declarative configuration file for Hazelcast. Part of this XML file is shown below.

```xml
<hazelcast xsi:schemaLocation="http://www.hazelcast.com/schema/config hazelcast-config-3.5.xsd"
           xmlns="http://www.hazelcast.com/schema/config"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <group>
        <name>dev</name>
        <password>dev-pass</password>
    </group>
    <management-center enabled="false">http://localhost:8080/mancenter</management-center>
    <network>
        <port auto-increment="true" port-count="100">5701</port>
        <outbound-ports>
            <!--
            Allowed port range when connecting to other nodes.
            0 or * means use system provided port.
            -->
            <ports>0</ports>
        </outbound-ports>
        <join>
            <multicast enabled="true">
                <multicast-group>224.2.2.3</multicast-group>
                <multicast-port>54327</multicast-port>
            </multicast>
            <tcp-ip enabled="false">
```

For most users, the default configuration in this XML file should be fine. If not, you can tailor this XML file according to your needs by adding/removing/modifying properties.

For details about all the elements and attributes used to configure Hazelcast, please refer to the [Hazelcast Configuration chapter](#hazelcast-configuration). This chapter contains information for configuring networks, caches, partitions, and so on. It also has links to sections for configuring maps, serialization, Management Center, etc.

Besides declarative configuration, you can configure your cluster programmatically. Just instantiate a `Config` object and add/remove/modify properties. Please refer to the Programmatic Configuration section in [Configuration Overview](#configuration-overview) for a code example.

You can also use wildcards while configuring Hazelcast. Please refer to the [Using Wildcard section](#using-wildcard) for details.

Hazelcast also offers System Properties to tune some aspects of Hazelcast. Please refer to the [System Properties section](#system-properties) for details.

<br></br>


***RELATED INFORMATION***

*Please refer to the [Hazelcast Configuration chapter](#hazelcast-configuration) for more information.*

