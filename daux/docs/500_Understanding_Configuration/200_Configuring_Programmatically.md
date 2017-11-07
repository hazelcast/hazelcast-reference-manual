
Besides declarative configuration, you can configure your cluster programmatically. For this you can create a `Config` object, set/change its properties and attributes, and use this `Config` object to create a new Hazelcast member. Following is an example code which configures some network and Hazelcast Map properties.

```java
Config config = new Config();
config.getNetworkConfig().setPort( 5900 )
					.setPortAutoIncrement( false );
                
MapConfig mapConfig = new MapConfig();
mapConfig.setName( "testMap" )
					.setBackupCount( 2 )
					.setTimeToLiveSeconds( 300 );
        
config.addMapConfig( mapConfig );
```

To create a Hazelcast member with the above example configuration, pass the configuration object as shown below:

```
HazelcastInstance hazelcast = Hazelcast.newHazelcastInstance( config );
```


![image](../images/NoteSmall.jpg) ***NOTE:*** *The `Config` must not be modified after the Hazelcast instance is started. In other words, all configuration must be completed before creating the `HazelcastInstance`. Certain additional configuration elements can be added at runtime as described in the [Dynamically Adding Data Structure Configuration on a Cluster section](/450_Dynamically_Adding_Data_Structure_Configuration_on_a_Cluster).*


You can also create a named Hazelcast member. In this case, you should set `instanceName` of `Config` object as shown below:

```java
Config config = new Config();
config.setInstanceName( "my-instance" );
Hazelcast.newHazelcastInstance( config );
```

To retrieve an existing Hazelcast member by its name, use the following:
    
```
Hazelcast.getHazelcastInstanceByName( "my-instance" );
```

To retrieve all existing Hazelcast members, use the following:

```
Hazelcast.getAllHazelcastInstances();
```


![image](../images/NoteSmall.jpg) ***NOTE:*** *Hazelcast performs schema validation through the file `hazelcast-config-<version>.xsd` which comes with your Hazelcast libraries. Hazelcast throws a meaningful exception if there is an error in the declarative or programmatic configuration.*



If you want to specify your own configuration file to create `Config`, Hazelcast supports several ways including filesystem, classpath, InputStream, and URL:

- `Config cfg = new XmlConfigBuilder(xmlFileName).build();`
- `Config cfg = new XmlConfigBuilder(inputStream).build();`
- `Config cfg = new ClasspathXmlConfig(xmlFileName);`
- `Config cfg = new FileSystemXmlConfig(configFilename);`
- `Config cfg = new UrlXmlConfig(url);`
- `Config cfg = new InMemoryXmlConfig(xml);`


