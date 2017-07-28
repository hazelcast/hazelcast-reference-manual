
## Discovering Native Clients

Hazelcast members and native Java clients can find each other with multicast discovery plugin. This plugin is implemented using [Hazelcast Discovery SPI](#discovery-spi). You should configure the plugin both at Hazelcast members and Java clients in order to use multicast discovery.

To configure your cluster to have the multicast discovery plugin, follow these steps:

- Disable the multicast and TCP/IP join mechanisms. To do this, set the `enabled` attributes of the `multicast` and `tcp-ip` elements to `false` in your `hazelcast.xml` configuration file
- Set the `enabled` attribute of the `hazelcast.discovery.enabled` property to `true`.
- Add multicast discovery strategy configuration to your XML file, i.e., `<discovery-strategies>` element.

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
        <discovery-strategy class="com.hazelcast.spi.discovery.multicast.MulticastDiscoveryStrategy" enabled="true">
          <properties>
          <property name="group">224.2.2.3</property>
          <property name="port">54327</property>
          </properties>
        </discovery-strategy>
    </discovery-strategies>
</join>
...
```

The table below lists the multicast discovery plugin configuration properties with their descriptions.

Property Name | Type | Description
:--------------|:------|:------------
`group`|String|String value that is used to set the multicast group, so that you can isolate your clusters.
`port`|Integer|Integer value that is used to set the multicast port.
