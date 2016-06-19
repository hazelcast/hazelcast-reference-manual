
### Discovering Members with Multicast Plugin

Hazelcast members and native clients can find each other with Multicast Discovery Plugin. This plugin is implemented using Hazelcast Discovery SPI. In order to use multicast discovery both hazelcast members and clients should configure plugin.

To configure your cluster for Multicast Plugin follow these steps:

- Disable the multicast and TCP/IP join mechanisms. To do this, set the `enabled` attributes of the `multicast` and `tcp-ip` elements to `false` in your `hazelcast.xml` configuration file
- Set the `enabled` attribute of the `hazelcast.discovery.enabled` property to `true`.
- Add multicast discovery strategy configuration to your xml file.  

The following is an example declarative configuration.

```xml
 ...
  <properties>
    <property name="hazelcast.discovery.enabled">true</property>
  </properties>
   ....
 <join>
    <multicast enabled="false">
    </multicast>
    <tcp-ip enabled="false">
    </tcp-ip>
    <discovery-strategies>
        <discovery-strategy class="com.hazelcast.spi.discovery.multicast.MulticastDiscoveryStrateg" enabled="true">
          <properties>
          <property name="group">224.2.2.3</property>
          <property name="port">54327</property>
          </properties>
        </discovery-strategy>
    </discovery-strategies>
</join>
...
```

The table below lists the multicast plugin configuration properties with their descriptions.

Property Name | Type | Description
:--------------|:------|:------------
`group`|String|String value that is used to set multicast group. So that you can isolate clusters.
`port`|Integer|Integer value that is used to set multicast port.
