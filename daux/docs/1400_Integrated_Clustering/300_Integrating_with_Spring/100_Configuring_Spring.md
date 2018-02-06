


You can integrate Hazelcast with Spring and this chapter explains the configuration of Hazelcast within Spring context. 

Hazelcast supports Spring 2.5 and higher versions.



***Sample Code***: *Please see our <a href="https://github.com/hazelcast/hazelcast-code-samples/tree/master/hazelcast-integration/spring-configuration" target="_blank">sample application</a> for Spring Configuration.*
<br></br>


#### Enabling Spring Integration

***Classpath Configuration*** 

![image](../../images/NoteSmall.jpg) ***NOTE:*** *To enable Spring integration, either `hazelcast-spring-<version>.jar` or `hazelcast-all-<version>.jar` must be in the classpath.*

If you use Maven, add the following lines to your `pom.xml`.

If you use `hazelcast-all.jar`:

```xml
<dependency>
  <groupId>com.hazelcast</groupId>
  <artifactId>hazelcast-all</artifactId>
  <version>"your Hazelcast version, e.g. 3.8"</version>
</dependency>
```

If you use `hazelcast-spring.jar`:

```xml
<dependency>
  <groupId>com.hazelcast</groupId>
  <artifactId>hazelcast-spring</artifactId>
  <version>"your Hazelcast version, e.g. 3.8"</version>
</dependency>
```

If you use other build systems, you have to adjust the definition of dependencies to your needs.

##### Troubleshooting

When the Spring Integration JARs are not correctly installed in the Java classpath, you may see either of the following exceptions:

```
org.xml.sax.SAXParseException; systemId: http://hazelcast.com/schema/spring/hazelcast-spring.xsd; lineNumber: 2; columnNumber: 35; s4s-elt-character: Non-whitespace characters are not allowed in schema elements other than 'xs:appinfo' and 'xs:documentation'. Saw '301 Moved Permanently'.
```
<br>

```
org.springframework.beans.factory.parsing.BeanDefinitionParsingException: Configuration problem: Unable to locate Spring NamespaceHandler for XML schema namespace [http://www.hazelcast.com/schema/spring]
```
<br>


```
org.xml.sax.SAXParseException; lineNumber: 25; columnNumber: 33; schema_reference.4: Failed to read schema document 'http://www.hazelcast.com/schema/spring/hazelcast-spring.xsd', because 1) could not find the document; 2) the document could not be read; 3) the root element of the document is not <xsd:schema>.
```

In this case, please ensure that the required classes are in the classpath, as explained above.

#### Declaring Beans by Spring *beans* Namespace 

You can declare Hazelcast Objects using the default Spring *beans* namespace. Example code for a Hazelcast Instance declaration is listed below.

```xml
<bean id="instance" class="com.hazelcast.core.Hazelcast" factory-method="newHazelcastInstance">
  <constructor-arg>
    <bean class="com.hazelcast.config.Config">
      <property name="groupConfig">
        <bean class="com.hazelcast.config.GroupConfig">
          <property name="name" value="dev"/>
          <property name="password" value="pwd"/>
        </bean>
      </property>
      <!-- and so on ... -->
    </bean>
  </constructor-arg>
</bean>

<bean id="map" factory-bean="instance" factory-method="getMap">
  <constructor-arg value="map"/>
</bean>
```


#### Declaring Beans by *hazelcast* Namespace 

Hazelcast has its own namespace **hazelcast** for bean definitions. You can easily add the namespace declaration *xmlns:hz="http://www.hazelcast.com/schema/spring"* to the `beans` element in the context file so that *hz* namespace shortcut can be used as a bean declaration.

Here is an example schema definition for Hazelcast 3.3.x:

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:hz="http://www.hazelcast.com/schema/spring"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
                http://www.hazelcast.com/schema/spring
                http://www.hazelcast.com/schema/spring/hazelcast-spring.xsd">
```


#### Supported Configurations with *hazelcast* Namespace

- **Configuring Hazelcast Instance**

```xml
<hz:hazelcast id="instance">
  <hz:config>
    <hz:group name="dev" password="password"/>
    <hz:network port="5701" port-auto-increment="false">
      <hz:join>
        <hz:multicast enabled="false"
                      multicast-group="224.2.2.3"
                      multicast-port="54327"/>
        <hz:tcp-ip enabled="true">
          <hz:members>10.10.1.2, 10.10.1.3</hz:members>
        </hz:tcp-ip>
      </hz:join>
    </hz:network>
    <hz:map name="map"
            backup-count="2"
            max-size="0"
            eviction-percentage="30"
            read-backup-data="true"
            eviction-policy="NONE"
            merge-policy="com.hazelcast.map.merge.PassThroughMergePolicy"/>
  </hz:config>
</hz:hazelcast>
```

-   **Configuring Hazelcast Client**

```xml
<hz:client id="client">
  <hz:group name="${cluster.group.name}" password="${cluster.group.password}" />
  <hz:network connection-attempt-limit="3"
              connection-attempt-period="3000"
              connection-timeout="1000"
              redo-operation="true"
              smart-routing="true">
    <hz:member>10.10.1.2:5701</hz:member>
    <hz:member>10.10.1.3:5701</hz:member>
  </hz:network>
</hz:client>
```

-   **Hazelcast Supported Type Configurations and Examples**

	- `map`
	- `multiMap`
	- `replicatedmap`
	- `queue`
	- `topic`
	- `set`
	- `list`
	- `executorService`
	- `idGenerator`
	- `flakeIdGenerator`
	- `atomicLong`
	- `atomicReference`
	- `semaphore`
	- `countDownLatch`
	- `lock`


```xml
<hz:map id="map" instance-ref="client" name="map" lazy-init="true" />
<hz:multiMap id="multiMap" instance-ref="instance" name="multiMap"
    lazy-init="false" />
<hz:replicatedMap id="replicatedmap" instance-ref="instance"
    name="replicatedmap" lazy-init="false" />
<hz:queue id="queue" instance-ref="client" name="queue" 
    lazy-init="true" depends-on="instance"/>
<hz:topic id="topic" instance-ref="instance" name="topic" 
    depends-on="instance, client"/>
<hz:set id="set" instance-ref="instance" name="set" />
<hz:list id="list" instance-ref="instance" name="list"/>
<hz:executorService id="executorService" instance-ref="client" 
    name="executorService"/>
<hz:idGenerator id="idGenerator" instance-ref="instance" 
    name="idGenerator"/>
<hz:flakeIdGenerator id="flakeIdGenerator" instance-ref="instance" 
    name="flakeIdGenerator"/>
<hz:atomicLong id="atomicLong" instance-ref="instance" name="atomicLong"/>
<hz:atomicReference id="atomicReference" instance-ref="instance" 
    name="atomicReference"/>
<hz:semaphore id="semaphore" instance-ref="instance" name="semaphore"/>
<hz:countDownLatch id="countDownLatch" instance-ref="instance" 
    name="countDownLatch"/>
<hz:lock id="lock" instance-ref="instance" name="lock"/>
```

-   **Supported Spring Bean Attributes**

Hazelcast also supports `lazy-init`, `scope` and `depends-on` bean attributes.

```xml
<hz:hazelcast id="instance" lazy-init="true" scope="singleton">
  ...
</hz:hazelcast>
<hz:client id="client" scope="prototype" depends-on="instance">
  ...
</hz:client>
```

-   **Configuring MapStore and NearCache**

For map-store, you should set either the *class-name* or the *implementation* attribute.

```xml
<hz:config id="config">
    <hz:map name="map1">
        <hz:map-store enabled="true" class-name="com.foo.DummyStore"
            write-delay-seconds="0" />

        <hz:near-cache time-to-live-seconds="0"
            max-idle-seconds="60" eviction-policy="LRU" max-size="5000"
            invalidate-on-change="true" />
    </hz:map>

    <hz:map name="map2">
        <hz:map-store enabled="true" implementation="dummyMapStore"
            write-delay-seconds="0" />
    </hz:map>
</hz:config>

<bean id="dummyMapStore" class="com.foo.DummyStore" />
```


