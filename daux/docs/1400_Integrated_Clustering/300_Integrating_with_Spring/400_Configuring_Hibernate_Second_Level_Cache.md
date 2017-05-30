
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


