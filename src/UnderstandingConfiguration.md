
# Understanding Configuration



This chapter describes ....

## Ways of Configuration

????
????
????

When Hazelcast starts up, it checks for the configuration as follows:

-	First, it looks for the `hazelcast.config` system property. If it is set, its value is used as the path. This is useful if you want to be able to change your Hazelcast configuration; you can do this because it is not embedded within the application. You can set the `config` option with the following command:
 
	`- Dhazelcast.config=`*`<path to the hazelcast.xml>`*.
	
	The path can be a regular one or a classpath reference with the prefix `classpath:`.
-	If the above system property is not set, Hazelcast then checks whether there is a `hazelcast.xml` file in the working directory.
-	If not, it then checks whether `hazelcast.xml` exists on the classpath.
-	If none of the above works, Hazelcast loads the default configuration (`hazelcast-default.xml`) that comes with `hazelcast.jar`.



When you download and unzip `hazelcast-<`*version*`>.zip`, you will see a `hazelcast.xml` in the `/bin` folder. This is the declarative configuration file for Hazelcast. Part of this XML file is shown below.

```xml
    <group>
        <name>dev</name>
        <password>dev-pass</password>
    </group>
    <management-center enabled="false">http://localhost:8080/mancenter</management-center>
    <network>
        <port auto-increment="true" port-count="100">5701</port>
        <outbound-ports>
            <!--
            Allowed port range when connecting to other members.
            0 or * means the port provided by the system.
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

For details about all elements and attributes used to configure Hazelcast, please refer to `hazelcast-full-example.xml` file in the `/bin` folder of your Hazelcast working directory.

Besides declarative configuration, you can configure your cluster programmatically. Just instantiate a `Config` object and add/remove/modify properties. Please refer to the Programmatic Configuration section in [Configuration Overview](#configuration-overview) for a configuration code example.

You can use wildcards while configuring Hazelcast. Please refer to the [Using Wildcard section](#using-wildcard) for details.

Hazelcast also offers system properties to fine tune some aspects of Hazelcast. Please refer to the [System Properties section](#system-properties) for details.

???
???
????
