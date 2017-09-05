

## Spring Integration

You can integrate Hazelcast with Spring and this chapter explains the configuration of Hazelcast within Spring context. 


### Supported Versions

- Spring 2.5+


### Configuring Spring

***Sample Code***: *Please see our <a href="https://github.com/hazelcast/hazelcast-code-samples/tree/master/hazelcast-integration/spring-configuration" target="_blank">sample application</a> for Spring Configuration.*
<br></br>


#### Declaring Beans by Spring *beans* Namespace 

***Classpath Configuration*** 

This configuration requires the following jar file in the classpath:

- `hazelcast-`<*version*>`.jar`

***Bean Declaration*** 

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

***Configuring Classpath*** 

Hazelcast-Spring integration requires the following JAR files in the classpath:

- `hazelcast-spring-`<*version*>`.jar`
- `hazelcast-`<*version*>`.jar`

or

- `hazelcast-all-`<*version*>`.jar`

***Declaring Beans*** 

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
	- `atomicLong`
	- `atomicReference`
	- `semaphore`
	- `countDownLatch`
	- `lock`


```xml
<hz:map id="map" instance-ref="client" name="map" lazy-init="true" />
<hz:multiMap id="multiMap" instance-ref="instance" name="multiMap"
    lazy-init="false" />
<hz:replicatedmap id="replicatedmap" instance-ref="instance" 
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
<hz:config>
  <hz:map name="map1">
    <hz:near-cache time-to-live-seconds="0" max-idle-seconds="60"
        eviction-policy="LRU" max-size="5000"  invalidate-on-change="true"/>

    <hz:map-store enabled="true" class-name="com.foo.DummyStore"
        write-delay-seconds="0"/>
  </hz:map>

  <hz:map name="map2">
    <hz:map-store enabled="true" implementation="dummyMapStore"
        write-delay-seconds="0"/>
  </hz:map>

  <bean id="dummyMapStore" class="com.foo.DummyStore" />
</hz:config>
```


### Enabling SpringAware Objects

You can mark Hazelcast Distributed Objects with @SpringAware if the object wants:

- to apply bean properties,
- to apply factory callbacks such as `ApplicationContextAware`, `BeanNameAware`,
- to apply bean post-processing annotations such as `InitializingBean`, `@PostConstruct`.

Hazelcast Distributed `ExecutorService`, or more generally any Hazelcast managed object, can benefit from these features. To enable SpringAware objects, you must first configure `HazelcastInstance` using *hazelcast* namespace as explained in [Configuring Spring](#configuring-spring) and add `<hz:spring-aware />` tag.


#### SpringAware Examples

- Configure a Hazelcast Instance (3.3.x) via Spring Configuration and define *someBean* as Spring Bean.
- Add `<hz:spring-aware />` to Hazelcast configuration to enable @SpringAware.

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:hz="http://www.hazelcast.com/schema/spring"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
                http://www.springframework.org/schema/context
                http://www.springframework.org/schema/context/spring-context-3.0.xsd
                http://www.hazelcast.com/schema/spring
                http://www.hazelcast.com/schema/spring/hazelcast-spring.xsd">

  <context:annotation-config />

  <hz:hazelcast id="instance">
    <hz:config>
      <hz:spring-aware />
      <hz:group name="dev" password="password"/>
      <hz:network port="5701" port-auto-increment="false">
        <hz:join>
          <hz:multicast enabled="false" />
          <hz:tcp-ip enabled="true">
            <hz:members>10.10.1.2, 10.10.1.3</hz:members>
          </hz:tcp-ip>
        </hz:join>
      </hz:network>
      ...
    </hz:config>
  </hz:hazelcast>

  <bean id="someBean" class="com.hazelcast.examples.spring.SomeBean"
      scope="singleton" />
  ...
</beans>
```
**Distributed Map SpringAware Example:**

- Create a class called `SomeValue` which contains Spring Bean definitions like `ApplicationContext` and `SomeBean`.

```java
@SpringAware
@Component("someValue")
@Scope("prototype")
public class SomeValue implements Serializable, ApplicationContextAware {

  private transient ApplicationContext context;

  private transient SomeBean someBean;

  private transient boolean init = false;

  public void setApplicationContext( ApplicationContext applicationContext )
    throws BeansException {
    context = applicationContext;
  }

  @Autowired
  public void setSomeBean( SomeBean someBean)  {
    this.someBean = someBean;
  }

  @PostConstruct
  public void init() {
    someBean.doSomethingUseful();
    init = true;
  }
  ...
}
```

- Get `SomeValue` Object from Context and put it into Hazelcast Distributed Map on the first member.

```java
HazelcastInstance hazelcastInstance = 
    (HazelcastInstance) context.getBean( "hazelcast" );
SomeValue value = (SomeValue) context.getBean( "someValue" )
IMap<String, SomeValue> map = hazelcastInstance.getMap( "values" );
map.put( "key", value );
```

- Read `SomeValue` Object from Hazelcast Distributed Map and assert that `init` method is called since it is annotated with `@PostConstruct`.

```java
HazelcastInstance hazelcastInstance = 
    (HazelcastInstance) context.getBean( "hazelcast" );
IMap<String, SomeValue> map = hazelcastInstance.getMap( "values" );
SomeValue value = map.get( "key" );
Assert.assertTrue( value.init );
```

**ExecutorService SpringAware Example:**

- Create a Callable Class called SomeTask which contains Spring Bean definitions like `ApplicationContext`, `SomeBean`.


```java
@SpringAware
public class SomeTask
    implements Callable<Long>, ApplicationContextAware, Serializable {

  private transient ApplicationContext context;

  private transient SomeBean someBean;

  public Long call() throws Exception {
    return someBean.value;
  }

  public void setApplicationContext( ApplicationContext applicationContext )
      throws BeansException {
    context = applicationContext;
  }

  @Autowired
  public void setSomeBean( SomeBean someBean ) {
    this.someBean = someBean;
  }
}
```

- Submit `SomeTask` to two Hazelcast Members and assert that `someBean` is autowired.

```java
HazelcastInstance hazelcastInstance =
    (HazelcastInstance) context.getBean( "hazelcast" );
SomeBean bean = (SomeBean) context.getBean( "someBean" );

Future<Long> f = hazelcastInstance.getExecutorService().submit(new SomeTask());
Assert.assertEquals(bean.value, f.get().longValue());

// choose a member
Member member = hazelcastInstance.getCluster().getMembers().iterator().next();

Future<Long> f2 = (Future<Long>) hazelcast.getExecutorService()
    .submitToMember(new SomeTask(), member);
Assert.assertEquals(bean.value, f2.get().longValue());
```
<br><br>

![image](images/NoteSmall.jpg) ***NOTE:*** *Spring managed properties/fields are marked as `transient`.*


### Adding Caching to Spring

***Sample Code***: *Please see our sample application for <a href="https://github.com/hazelcast/hazelcast-code-samples/tree/master/hazelcast-integration/spring-cache-manager" target="_blank">Spring Cache</a>.*
<br></br>

As of version 3.1, Spring Framework provides support for adding caching into an existing Spring application. Spring 3.2 and later versions support JCache compliant caching providers. You can also use JCache caching backed by Hazelcast if your Spring version supports JCache.


#### Declarative Spring Cache Configuration

```xml
<cache:annotation-driven cache-manager="cacheManager" />

<hz:hazelcast id="hazelcast">
  ...
</hz:hazelcast>

<bean id="cacheManager" class="com.hazelcast.spring.cache.HazelcastCacheManager">
  <constructor-arg ref="instance"/>
</bean>
```

Hazelcast uses its Map implementation for underlying cache. You can configure a map with your cache's name if you want to set additional configuration such as `ttl`.

```xml
<cache:annotation-driven cache-manager="cacheManager" />

<hz:hazelcast id="hazelcast">
  <hz:config>
    ...

    <hz:map name="city" time-to-live-seconds="0" in-memory-format="BINARY" />
</hz:hazelcast>

<bean id="cacheManager" class="com.hazelcast.spring.cache.HazelcastCacheManager">
  <constructor-arg ref="instance"/>
</bean>
```

```
public interface IDummyBean {
  @Cacheable("city")
  String getCity();
}
```

##### Defining Timeouts for Cache Read Operation

Starting with Hazelcast 3.8.4, you can define a timeout value for the get operations from your Spring cache. This may be useful for some cases such as required by SLAs. Hazelcast provides a property to specify this timeout: `hazelcast.spring.cache.prop`. This can be specified as a Java property (using `-D`) or you can add this property to your Spring properties file (usually named as `application.properties`).

A sample usage is given below:

```
hazelcast.spring.cache.prop=defaultReadTimeout=2,cache1=10,cache2=20
```

The argument `defaultReadTimeout` applies to all of your Spring caches. If you want to define different timeout values for some specific Spring caches, you can provide them as a comma separated list as shown in the above sample usage. The values are in milliseconds. If you want to have no timeout for a cache, simply set it to `0` or a negative value.


#### Declarative Hazelcast JCache Based Caching Configuration

```xml
<cache:annotation-driven cache-manager="cacheManager" />

<hz:hazelcast id="hazelcast">
  ...
</hz:hazelcast>

<hz:cache-manager id="hazelcastJCacheCacheManager" instance-ref="instance" name="hazelcastJCacheCacheManager"/>

<bean id="cacheManager" class="org.springframework.cache.jcache.JCacheCacheManager">
    <constructor-arg ref="hazelcastJCacheCacheManager" />
</bean>
```

You can use JCache implementation in both member and client mode. A cache manager should be bound to an instance. Instance can be referenced by `instance-ref` attribute or provided by `hazelcast.instance.name` property which is passed to CacheManager. Instance should be specified using one of these methods.

![image](images/NoteSmall.jpg) ***NOTE:*** *Instance name provided in properties overrides `instance-ref` attribute.*

You can specify an URI for each cache manager with `uri` attribute.


```xml
<hz:cache-manager id="cacheManager2" name="cacheManager2" uri="testURI">
    <hz:properties>
        <hz:property name="hazelcast.instance.name">named-spring-hz-instance</hz:property>
        <hz:property name="testProperty">testValue</hz:property>
    </hz:properties>
</hz:cache-manager>
```

#### Annotation-Based Spring Cache Configuration

Annotation-Based Configuration does not require any XML definition. To perform Annotation-Based Configuration:

- Implement a `CachingConfiguration` class with related Annotations.

```java
@Configuration
@EnableCaching
public class CachingConfiguration implements CachingConfigurer{
    @Bean
    public CacheManager cacheManager() {
        ClientConfig config = new ClientConfig();
        HazelcastInstance client = HazelcastClient.newHazelcastClient(config);
        return new HazelcastCacheManager(client);
    }
    @Bean
    public KeyGenerator keyGenerator() {
        return null;
    }
```

- Launch Application Context and register `CachingConfiguration`.

```java
AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext();
context.register(CachingConfiguration.class);
context.refresh();
```

For more information about Spring Cache, please see <a href="http://static.springsource.org/spring/docs/3.1.x/spring-framework-reference/html/cache.html" target="_blank">Spring Cache Abstraction</a>.


### Configuring Hibernate Second Level Cache

***Sample Code***: *Please see our <a href="https://github.com/hazelcast/hazelcast-code-samples/tree/master/hazelcast-integration/spring-hibernate-2ndlevel-cache" target="_blank">sample application</a> for Hibernate 2nd Level Cache Config.*
<br></br>

If you are using Hibernate with Hazelcast as a second level cache provider, you can easily configure your 
`LocalSessionFactoryBean` to use a Hazelcast instance by passing Hazelcast instance name. That way, you can use the 
same `HazelcastInstance` as Hibernate L2 cache instance.

```xml
...
<bean id="sessionFactory" 
      class="org.springframework.orm.hibernate3.LocalSessionFactoryBean" 
	  scope="singleton">
  <property name="dataSource" ref="dataSource"/>
  <property name="hibernateProperties">
      <props>
          ...
          <prop key="hibernate.cache.region.factory_class">com.hazelcast.hibernate.HazelcastLocalCacheRegionFactory</prop>
          <prop key="hibernate.cache.hazelcast.instance_name">${hz.instance.name}</prop>
      </props>
  </property>
  ...
</bean>
```

**Hibernate RegionFactory Classes**

- `com.hazelcast.hibernate.HazelcastLocalCacheRegionFactory`
- `com.hazelcast.hibernate.HazelcastCacheRegionFactory`

Please refer to Hibernate <a href="https://github.com/hazelcast/hazelcast-hibernate#configuring-regionfactory" target="_blank">Configuring RegionFactory</a> for more information.


### Configuring Hazelcast Transaction Manager

***Sample Code***: *Please see our <a href="https://github.com/hazelcast/hazelcast-code-samples/tree/master/hazelcast-integration/spring-transaction-manager" target="_blank">sample application</a> for Hazelcast Transaction Manager in our code samples repository.*
<br></br>

Starting with Hazelcast 3.7, you can get rid of the boilerplate code to begin, commit or rollback transactions by using <a href="https://github.com/hazelcast/hazelcast/blob/master/hazelcast-spring/src/main/java/com/hazelcast/spring/transaction/HazelcastTransactionManager.java" target="_blank">HazelcastTransactionManager</a>
which is a `PlatformTransactionManager` implementation to be used with Spring Transaction API.

#### Sample Configuration for Hazelcast Transaction Manager

You need to register `HazelcastTransactionManager` as your transaction manager implementation and also you need to
register <a href="https://github.com/hazelcast/hazelcast/blob/master/hazelcast-spring/src/main/java/com/hazelcast/spring/transaction/ManagedTransactionalTaskContext.java" target="_blank">ManagedTransactionalTaskContext</a>
to access transactional data structures within your service class.


```xml
...
<hz:hazelcast id="instance">
      ...
</hz:hazelcast>
...
<tx:annotation-driven transaction-manager="transactionManager"/>
<bean id="transactionManager" class="com.hazelcast.spring.transaction.HazelcastTransactionManager">
    <constructor-arg ref="instance"/>
</bean>
<bean id="transactionalContext" class="com.hazelcast.spring.transaction.ManagedTransactionalTaskContext">
    <constructor-arg ref="transactionManager"/>
</bean>
<bean id="YOUR_SERVICE" class="YOUR_SERVICE_CLASS">
    <property name="transactionalTaskContext" ref="transactionalContext"/>
</bean>
...
```

#### Sample Transactional Method

```java
public class ServiceWithTransactionalMethod {

    private TransactionalTaskContext transactionalTaskContext;

    @Transactional
    public void transactionalPut(String key, String value) {
        transactionalTaskContext.getMap("testMap").put(key, value);
    }

    ...
}
```

After marking your method as `Transactional` either declaratively or by annotation and accessing the data structure
through the `TransactionalTaskContext`, `HazelcastTransactionManager` will begin, commit or rollback the transaction for you.


### Best Practices

Spring tries to create a new `Map`/`Collection` instance and fill the new instance by iterating and converting values of the original `Map`/`Collection` (`IMap`, `IQueue`, etc.) to required types when generic type parameters of the original `Map`/`Collection` and the target property/attribute do not match.

Since Hazelcast `Map`s/`Collection`s are designed to hold very large data which a single machine cannot carry, iterating through whole values can cause out of memory errors.

To avoid this issue, the target property/attribute can be declared as un-typed `Map`/`Collection` as shown below.

```java
public class SomeBean {
  @Autowired
  IMap map; // instead of IMap<K, V> map

  @Autowired
  IQueue queue; // instead of IQueue<E> queue

  ...
}
```

Or, parameters of injection methods (constructor, setter) can be un-typed as shown below.

```java
public class SomeBean {

  IMap<K, V> map;

  IQueue<E> queue;

  // Instead of IMap<K, V> map
  public SomeBean(IMap map) {
    this.map = map;
  }

  ...

  // Instead of IQueue<E> queue
  public void setQueue(IQueue queue) {
    this.queue = queue;
  }
  ...
}
```
<br> </br>

***RELATED INFORMATION***

*For more information please see <a href="https://jira.springsource.org/browse/SPR-3407" target="_blank">Spring issue-3407</a>.*

