
# Understanding Configuration

This chapter describes the options to configure your Hazelcast applications and explains the utilities which you can make use of while configuring. You can configure Hazelcast using one or mix of the following options: 

* the declarative way
* the programmatic way
* using system properties
* within the Spring context

## Configuring Declaratively


This is the configuration option where you use an XML configuration file. Hazelcast provides  the file `hazelcast.xml`.

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

## Configuring Programmatically

???

Besides declarative configuration, you can configure your cluster programmatically. Just instantiate a `Config` object and add/remove/modify properties. Please refer to the Programmatic Configuration section in [Configuration Overview](#configuration-overview) for a configuration code example.

## Configuring with System Properties

???

Hazelcast also offers system properties to fine tune some aspects of Hazelcast. Please refer to the [System Properties section](#system-properties) for details.

???

## Configuring within Spring Context

???


## Composing Declarative Configuration

You can compose the declarative configuration of your Hazelcast or Hazelcast Client from multiple declarative configuration snippets. In order to compose a declarative configuration, you can use the `<import/>` element to load different declarative configuration files. Please see the following examples.

Let's say you want to compose the declarative configuration for Hazelcast out of two configurations: `development-group-config.xml` and `development-network-config.xml`. These two configurations are shown below.

`development-group-config.xml`:

```xml
<hazelcast>
  <group>
      <name>dev</name>
      <password>dev-pass</password>
  </group>
</hazelcast>
```
<br></br>

`development-network-config.xml`:

```xml
<hazelcast>
  <network>
    <port auto-increment="true" port-count="100">5701</port>
    <join>
        <multicast enabled="true">
            <multicast-group>224.2.2.3</multicast-group>
            <multicast-port>54327</multicast-port>
        </multicast>
    </join>
  </network>
</hazelcast>
```

To get your example Hazelcast declarative configuration out of the above two, use the `<import/>` element as shown below.


```xml
<hazelcast>
  <import resource="development-group-config.xml"/>
  <import resource="development-network-config.xml"/>
</hazelcast>
```

This feature also applies to the declarative configuration of Hazelcast Client. Please see the following examples.


`client-group-config.xml`:

```xml
<hazelcast-client>
  <group>
      <name>dev</name>
      <password>dev-pass</password>
  </group>
</hazelcast-client>
```
<br></br>

`client-network-config.xml`:

```xml
<hazelcast-client>
    <network>
        <cluster-members>
            <address>127.0.0.1:7000</address>
        </cluster-members>
    </network>
</hazelcast-client>
```

To get a Hazelcast Client declarative configuration from the above two examples, use the `<import/>` element as shown below.

```xml
<hazelcast-client>
  <import resource="client-group-config.xml"/>
  <import resource="client-network-config.xml"/>
</hazelcast>
```


<br></br>
![image](images/NoteSmall.jpg) ***NOTE:*** *You can only use `<import/>` element on top level of the XML hierarchy.*
<br></br>

- XML resources can be loaded from classpath and filesystem. Please see the following example.

```xml
<hazelcast>
  <import resource="file:///etc/hazelcast/development-group-config.xml"/> <!-- loaded from filesystem -->
  <import resource="classpath:development-network-config.xml"/>  <!-- loaded from classpath -->
</hazelcast>
```

- You can use property placeholders in the `<import/>` elements. Please see the following example.

```xml
<hazelcast>
  <import resource="${environment}-group-config.xml"/>
  <import resource="${environment}-network-config.xml"/>
</hazelcast>
```


## Checking Configuration

When you start a Hazelcast member, Hazelcast checks its configuration as follows:

-	First, it looks for the `hazelcast.config` system property. If it is set, its value is used as the path. This is useful if you want to be able to change your Hazelcast configuration; you can do this because it is not embedded within the application. You can set the `config` option with the following command:
 
	`- Dhazelcast.config=`*`<path to the hazelcast.xml>`*.
	
	The path can be a regular one or a classpath reference with the prefix `classpath:`.
-	If the above system property is not set, Hazelcast then checks whether there is a `hazelcast.xml` file in the working directory.
-	If not, it then checks whether `hazelcast.xml` exists on the classpath.
-	If none of the above works, Hazelcast loads the default configuration (`hazelcast-default.xml`) that comes with `hazelcast.jar`.




## Using Wildcards

Hazelcast supports wildcard configuration for all distributed data structures that can be configured using `Config` (i.e. for all except `IAtomicLong`, `IAtomicReference`). Using an asterisk (\*) character in the name, different instances of maps, queues, topics, semaphores, etc. can be configured by a single configuration.

A single (only one) asterisk (\*) can be placed anywhere inside the configuration name.

For instance, a map named `com.hazelcast.test.mymap` can be configured using one of the following configurations.

```xml
<map name="com.hazelcast.test.*">
...
</map>
```
```xml
<map name="com.hazel*">
...
</map>
```
```xml
<map name="*.test.mymap">
...
</map>
```
```xml
<map name="com.*test.mymap">
...
</map>
```
Or a queue '`com.hazelcast.test.myqueue`':

```xml
<queue name="*hazelcast.test.myqueue">
...
</queue>
```
```xml
<queue name="com.hazelcast.*.myqueue">
...
</queue>
```


## Using Variables

In your Hazelcast and/or Hazelcast Client declarative configuration, you can use variables to set the values of the elements. This is valid when you set a system property programmatically or you use the command line interface. You can use a variable in the declarative configuration to access the values of the system properties you set.

For example, see the following command that sets two system properties.

```
-Dgroup.name=dev -Dgroup.password=somepassword
```

Let's get the values of these system properties in the declarative configuration of Hazelcast, as shown below.

```xml
<hazelcast>
  <group>
    <name>${group.name}</name>
    <password>${group.password}</password>
  </group>
</hazelcast>
```

This also applies to the declarative configuration of Hazelcast Client, as shown below.

```xml
<hazelcast-client>
  <group>
    <name>${group.name}</name>
    <password>${group.password}</password>
  </group>
</hazelcast-client>
```

If you do not want to rely on the system properties, you can use the `XmlConfigBuilder` and explicitly set a `Properties` instance, as shown below.
 
```java
Properties properties = new Properties();

// fill the properties, e.g. from database/LDAP, etc.

XmlConfigBuilder builder = new XmlConfigBuilder();
builder.setProperties(properties)
Config config = builder.build();
HazelcastInstance hz = Hazelcast.newHazelcastInstance(config);
```




???
???
????
