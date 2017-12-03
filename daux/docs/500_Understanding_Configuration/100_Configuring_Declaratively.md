

This is the configuration option where you use an XML configuration file. When you download and unzip `hazelcast-<version>.zip`, you will see the following files present in `/bin` folder, which are standard XML-formatted configuration files:

* `hazelcast.xml`: Default declarative configuration file for Hazelcast. The configuration in this XML file should be fine for most of the Hazelcast users. If not, you can tailor this XML file according to your needs by adding/removing/modifying properties.
* `hazelcast-full-example.xml`: Configuration file which includes all Hazelcast configuration elements and attributes with their descriptions. It is the "superset" of `hazelcast.xml`. You can use `hazelcast-full-example.xml` as a reference document to learn about any element or attribute, or you can change its name to `hazelcast.xml` and start to use it as your Hazelcast configuration file.

A part of `hazelcast.xml` is shown as an example below.

```xml
<group>
	<name>dev</name>
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
			<interface>127.0.0.1</interface>
			<member-list>
				<member>127.0.0.1</member>
			</member-list>
		</tcp-ip>
	</join>
</network>
<map name="default">
	<time-to-live-seconds>0</time-to-live-seconds>
</map>
```

### Composing Declarative Configuration

You can compose the declarative configuration of your Hazelcast member or Hazelcast client from multiple declarative configuration snippets. In order to compose a declarative configuration, you can use the `<import/>` element to load different declarative configuration files.

Let's say you want to compose the declarative configuration for Hazelcast out of two configurations: `development-group-config.xml` and `development-network-config.xml`. These two configurations are shown below.

`development-group-config.xml`:

```xml
<hazelcast>
  <group>
      <name>dev</name>
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

This feature also applies to the declarative configuration of Hazelcast client. Please see the following examples.


`client-group-config.xml`:

```xml
<hazelcast-client>
  <group>
      <name>dev</name>
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

To get a Hazelcast client declarative configuration from the above two examples, use the `<import/>` element as shown below.

```xml
<hazelcast-client>
  <import resource="client-group-config.xml"/>
  <import resource="client-network-config.xml"/>
</hazelcast>
```



![image](../images/NoteSmall.jpg) ***NOTE:*** *Use `<import/>` element on top level of the XML hierarchy.*


Using the element `<import>`, you can also load XML resources from classpath and file system:

```xml
<hazelcast>
  <import resource="file:///etc/hazelcast/development-group-config.xml"/> <!-- loaded from filesystem -->
  <import resource="classpath:development-network-config.xml"/>  <!-- loaded from classpath -->
</hazelcast>
```

The element `<import>` supports variables too. Please see the following example snippet:

```xml
<hazelcast>
  <import resource="${environment}-group-config.xml"/>
  <import resource="${environment}-network-config.xml"/>
</hazelcast>
```
<br></br>
![image](../images/NoteSmall.jpg) ***NOTE:*** *You can refer to the [Using Variables section](/Understanding_Configuration/Using_Variables.html) to learn how you can set the configuration elements with variables.*
<br></br>


