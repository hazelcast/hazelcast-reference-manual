You can use system properties to configure some aspects of Hazelcast. You set these properties as name and value pairs through declarative configuration, programmatic configuration or JVM system property. Following are examples for each option.

**Declaratively:**

```xml
  ....
  <properties>
    <property name="hazelcast.property.foo">value</property>
    ....
  </properties>
</hazelcast>
```

**Programmatically:**

```java
Config config = new Config() ;
config.setProperty( "hazelcast.property.foo", "value" );
```

**Using JVM's `System` class or `-D` argument:**

`System.setProperty( "hazelcast.property.foo", "value" );`

or

`java -Dhazelcast.property.foo=value`

You will see Hazelcast system properties mentioned throughout this Reference Manual as required in some of the chapters and sections. All Hazelcast system properties are listed in the [System Properties chapter](/25_System_Properties.md) with their descriptions, default values and property types as a reference for you.


