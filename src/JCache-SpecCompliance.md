
## Testing for JCache Specification Compliance

Hazelcast JCache is fully compliant with the JSR 107 TCK (Technology Compatibility Kit),and therefore is officially a JCache
implementation. 

You can test Hazelcast JCache for compliance by executing the TCK. Just perform the instructions below:


- Checkout the TCK from <a href="https://github.com/jsr107/jsr107tck" target="_blank">https://github.com/jsr107/jsr107tck</a>.
- Change the properties in [`pom.xml`](https://github.com/jsr107/jsr107tck/blob/master/pom.xml) as shown below.
- Run the TCK using the command `mvn clean install`. This will run the tests using an embedded Hazelcast member.


```xml
<properties>
  <jcache.version>1.1.0-SNAPSHOT</jcache.version>
  <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>

  <CacheInvocationContextImpl>
    javax.cache.annotation.impl.cdi.CdiCacheKeyInvocationContextImpl
  </CacheInvocationContextImpl>

  <domain-lib-dir>${project.build.directory}/domainlib</domain-lib-dir>
  <domain-jar>domain.jar</domain-jar>


  <!-- ################################################################# -->
  <!-- Change the following properties on the command line
       to override with the coordinates for your implementation-->
  <implementation-groupId>com.hazelcast</implementation-groupId>
  <implementation-artifactId>hazelcast</implementation-artifactId>
  <implementation-version>Hazelcast version to be tested (should be higher than 3.3)</implementation-version>

  <!-- Change the following properties to your CacheManager and
       Cache implementation. Used by the unwrap tests. -->
  <CacheManagerImpl>
    com.hazelcast.client.cache.impl.HazelcastClientCacheManager
  </CacheManagerImpl>
  <CacheImpl>com.hazelcast.cache.ICache</CacheImpl>
  <CacheEntryImpl>
    com.hazelcast.cache.impl.CacheEntry
  </CacheEntryImpl>

  <!-- Change the following to point to your MBeanServer, so that
       the TCK can resolve it. -->
  <javax.management.builder.initial>
    com.hazelcast.cache.impl.TCKMBeanServerBuilder
  </javax.management.builder.initial>
  <org.jsr107.tck.management.agentId>
    TCKMbeanServer
  </org.jsr107.tck.management.agentId>

  <!-- ################################################################# -->
</properties>
```

Please also see [TCK 1.1.0 User Guide](https://docs.google.com/document/u/1/d/1m8d1Z44IFGAd20bXEvT2G--vWXbxaJctk16M2rmbM24/edit#) or [TCK 1.0.0 User Guide](https://docs.google.com/document/d/1w3Ugj_oEqjMlhpCkGQOZkd9iPf955ZWHAVdZzEwYYdU/edit) for more information on the testing instructions.

