
### Discovery Provider

This sub-section will walk through the implementation of a simple `DiscoveryStrategy` and their necessary setup.

#### Discovery Provider Example

The example strategy will use the local `/etc/hosts` (and on Windows it will use the equivalent to the \*nix hosts file named `%SystemRoot%\system32\drivers\etc\hosts`) to lookup IP addresses of different hosts. The strategy implementation expects hosts to be configured with hostname sub-groups under the same domain. So far to theory, let's get into it.

The full example's source code can be found in the [Hazelcast examples repository](https://github.com/hazelcast/hazelcast-code-samples). 

##### Discovery Configuration

As a first step we start with some basic configuration setup. We want the user to be able to configure the site domain for the discovery inside the hosts file, therefore we define a configuration property called `site-domain`. The configuration is not optional, which means it must be configured beforehand the creation of the `HazelcastInstance`, either via XML or the Hazelcast Config API.
     
It is recommended to keep all defined properties in a separate configuration class as public constants (public final static) with sufficient documentation, for users to easily look up possible configuration values.

```java
package com.hazelcast.examples.spi.discovery;

import com.hazelcast...;

public class HostsDiscoveryConfiguration {
  /**
   * 'site-domain' configures the basic site domain for the lookup, to
   * find other sub-domains of the cluster members and retrieve their assigned
   * IP addresses.
   */
  public static final PropertyDefinition DOMAIN = new SimplePropertyDefinition(
    "site-domain", PropertyTypeConverter.STRING
  );
  
  // Prevent instantiation
  private HostsDiscoveryConfiguration() {}
}
```

An additional `ValueValidator` could be passed to the definition to make sure the configured value looks like a domain or has a special format.

##### Discovery Creation

As the second step we can create the very simple `DiscoveryStrategyFactory` implementation class. To keep things clear we are going to name the discovery strategy after it's purpose, looking into the hosts file.

```java
package com.hazelcast.examples.spi.discovery;

import com.hazelcast...;

public class HostsDiscoveryStrategyFactory
    implements DiscoveryStrategyFactory {
   
  private static final Collection<PropertyDefinition> PROPERTIES =
      Collections.singletonList( HostsDiscoveryConfiguration.SITE_DOMAIN );
   
  public Class<? extends DiscoveryStrategy> getDiscoveryStrategyType() {
    // Returns the actual class type of the DiscoveryStrategy
    // implementation, to match it against the configuration
    return HostsDiscoveryStrategy.class;
  }
   
  public Collection<PropertyDefinition> getConfigurationProperties() {
    return PROPERTIES;
  }
   
  public DiscoveryStrategy newDiscoveryStrategy( DiscoveryNode discoveryNode,
                                          ILogger logger,
                                          Map<String, Comparable> properties ) {
                                          
    return new HostsDiscoveryStrategy( logger, properties );                                      
  }   
}
``` 

This factory now defines properties known to the discovery strategy implementation and provides a clean way to instantiate it. While creation of the `HostsDiscoveryStrategy` we ignore the passed `DiscoveryNode` since this strategy will not support automatic registration of new nodes. In cases where the strategy does not support registration, the environment has to handle this in some provided way.

![image](images/NoteSmall.jpg) ***NOTE:*** *Remember that, when created on a Hazelcast client, the provided `DiscoveryNode` will be null, as there is no local member in existence.*

Next up is the registration of the `DiscoveryStrategyFactory` to make Hazelcast pick it up automatically at startup. As described earlier, this is done according to the [Java Service Provider Interface](https://docs.oracle.com/javase/tutorial/sound/SPI-intro.html) specification. The filename is the name of the interface itself. Therefore we create a new resource file called `com.hazelcast.spi.discovery.DiscoveryStrategyFactory` and place it under `META-INF/services`. The content is the full canonical class name of our factory implementation. 
 
```plain
com.hazelcast.examples.spi.discovery.HostsDiscoveryStrategyFactory
```

If our JAR file will contain multiple factories each consecutive line can define another full canonical `DiscoveryStrategyFactory` implementation class name.

##### Discovery Strategy

Now comes the interesting part. We actually are going to implement the discovery itself. The previous parts are normally pretty similar for all strategies aside from the configuration properties itself. However the following up part is heavily depending on the way the strategy has to come up with IP addresses of other Hazelcast members.

For ease of implementation, we will back our implementation by extending the `AbstractDiscoveryStrategy` and only implement the absolute minimum ourselves.

```java
package com.hazelcast.examples.spi.discovery;

import com.hazelcast...;

public class HostsDiscoveryStrategy
    extends AbstractDiscoveryStrategy {
    
  private final String siteDomain;  
    
  public HostsDiscoveryStrategy( ILogger logger,
                                 Map<String, Comparable> properties ) {
                                   
    super( logger, properties );
    
    // Make it possible to override the value from the configuration on
    // the system's environment or JVM properties
    // -Ddiscovery.hosts.site-domain=some.domain
    this.siteDomain = getOrNull( "discovery.hosts",
                                 HostsDiscoveryConfiguration.DOMAIN );
  }                              
  
  public Iterable<DiscoveryNode> discoverNodes() {
    List<String> assignments = filterHosts();
    return mapToDiscoveryNodes( assignments );
  }
  
  // ...
}
```

So far our implementation will retrieve the configuration property for the `site-domain`. Our implementation offers the option to override the value from the configuration (XML or Config API) right from the system environment or JVM properties. That can be useful when the `hazelcast.xml` defines a setup for an developer system (like `cluster.local`) and operations wants to override it for the real deployment. By providing a prefix (in this case `discovery.hosts`) we created an external property named `discovery.hosts.site-domain` which can be set as an environment variable or passed as a JVM property from the startup script.
 
The lookup priority is like explained in the following, priority is from top to bottom:

 - JVM properties (or `hazelcast.xml` <properties/> section)
 - System environment
 - Configuration properties
 
Since we now have the value for our property we can implement the actual lookup and mapping as already prepared in the `discoverNodes` method. The following part is very specific to this special discovery strategy, for completeness we're showing it anyways.
  
```java
private static final String HOSTS_NIX = "/etc/hosts";
private static final String HOSTS_WINDOWS =
                   "%SystemRoot%\\system32\\drivers\\etc\\hosts";

private List<String> filterHosts() {
  String os = System.getProperty( "os.name" );
      
  String hostsPath;
  if ( os.contains( "Windows" ) ) {
    hostsPath = HOSTS_WINDOWS;
  } else {
    hostsPath = HOSTS_NIX;
  }
  
  File hosts = new File( hostsPath );
  
  // Read all lines
  List<String> lines = readLines( hosts );
  
  List<String> assignments = new ArrayList<String>();
  for ( String line : lines ) {
    // Example:
    // 192.168.0.1   host1.cluster.local
    if ( matchesDomain( line ) ) {
      assignments.add( line );
    }
  }
  return assignments;
}
```

After we now collected the address assignments configured in the hosts file we can go to the final step and map those to the `DiscoveryNode`s to return them from our strategy.
 
```java
private Iterable<DiscoveryNode> mapToDiscoveryNodes( List<String> assignments ) {
  Collection<DiscoveryNode> discoveredNodes = new ArrayList<DiscoveryNode>();
  
  for ( String assignment : assignments ) {
    String address = sliceAddress( assignment );
    String hostname = sliceHostname( assignment );
    
    Map<String, Object> attributes = 
        Collections.singletonMap( "hostname", hostname );
    
    InetAddress inetAddress = mapToInetAddress( address );
    Address addr = new Address( inetAddress, NetworkConfig.DEFAULT_PORT );
    
    discoveredNodes.add( new SimpleDiscoveryNode( addr, attributes ) );
  }
  return discoveredNodes;
}
```

With that mapping we now have a full discovery, executed whenever Hazelcast asks for IPs. So why don't we read them in once and cache them? The answer is simple, it might happen that members go down or come up over time. Since we expect the hosts file to be injected into the running container it also might change over time. We want to get the latest available members, therefore we read the file on request.

To actually use the new `DiscoveryStrategy` implementation we need to configure it like int the following example:

```xml
<hazelcast>
  <!-- activate Discovery SPI -->
  <properties>
    <property name="hazelcast.discovery.enabled">true</property>
  </properties>
  
  <network>
    <join>
      <!-- deactivating other discoveries -->
      <multicast enabled="false"/>
      <tcp-ip enabled="false" />
      <aws enabled="false"/>
      
      <!-- activate our discovery strategy -->
      <discovery-strategies>
      
        <!-- class equals to the DiscoveryStrategy not the factory! -->
        <discovery-strategy enabled="true"
            class="com.hazelcast.examples.spi.discovery.HostsDiscoveryStrategy">
            
          <properties>
            <property name="site-domain">cluster.local</value>
          </properties>
        </discovery-strategy>
      </discovery-strategies>
    </join>
  </network>
</hazelcast>
```

To find out further details, please have a look at the Discovery SPI Javadoc.
