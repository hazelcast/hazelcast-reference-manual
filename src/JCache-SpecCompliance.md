
## Testing for JCache Specification Compliance

Hazelcast JCache is fully compliant with the JSR 107 TCK (Technology Compatibility Kit), and therefore is officially a JCache
implementation. 

You can test Hazelcast JCache for compliance by executing the TCK. Just perform the instructions below:


- Checkout branch `v1.1.0` of the TCK from <a href="https://github.com/jsr107/jsr107tck" target="_blank">https://github.com/jsr107/jsr107tck</a>.
- Change the properties in [`pom.xml`](https://github.com/jsr107/jsr107tck/blob/master/pom.xml) as shown below. Alternatively, you can set the values of these properties directly on the maven command line without editing any files as shown in the command line example below. 
- Run the TCK using the command `mvn clean install`. This will run the tests using an embedded Hazelcast member.

```xml
<properties>
  <jcache.version>1.1.0</jcache.version>
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
  <implementation-version>3.9.3</implementation-version>

  <!-- Change the following properties to your CacheManager and
       Cache implementation. Used by the unwrap tests. -->
  <CacheManagerImpl>
    com.hazelcast.client.cache.impl.HazelcastServerCacheManager
  </CacheManagerImpl>
  <CacheImpl>com.hazelcast.cache.ICache</CacheImpl>
  <CacheEntryImpl>
    com.hazelcast.cache.impl.CacheEntry
  </CacheEntryImpl>
  <!-- ################################################################# -->
</properties>
```

Complete command line example:

```bash
$ git clone https://github.com/jsr107/jsr107tck
(clones JSR107 TCK repository to local directory jsr107tck)

$ cd jsr107tck

$ git checkout v1.1.0
(checkout v1.1.0 tag) 

$ mvn -Dimplementation-groupId=com.hazelcast -Dimplementation-artifactId=hazelcast \
     -Dimplementation-version=3.9.3 \
     -DCacheManagerImpl=com.hazelcast.cache.impl.HazelcastServerCacheManager \
     -DCacheImpl=com.hazelcast.cache.ICache -DCacheEntryImpl=com.hazelcast.cache.impl.CacheEntry \
     clean install

```

Please also see [TCK 1.1.0 User Guide](https://docs.google.com/document/u/1/d/1m8d1Z44IFGAd20bXEvT2G--vWXbxaJctk16M2rmbM24/edit#) or [TCK 1.0.0 User Guide](https://docs.google.com/document/d/1w3Ugj_oEqjMlhpCkGQOZkd9iPf955ZWHAVdZzEwYYdU/edit) for more information on the testing instructions.

