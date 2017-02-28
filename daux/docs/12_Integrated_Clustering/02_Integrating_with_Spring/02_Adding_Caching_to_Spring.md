
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

![image](../../images/NoteSmall.jpg) ***NOTE:*** *Instance name provided in properties overrides `instance-ref` attribute.*

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


