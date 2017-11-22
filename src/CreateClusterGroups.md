## Creating Cluster Groups

You can create cluster groups. To do this, use the `group` configuration element. 

You can separate your clusters in a simple way by specifying group names. Example groupings can be by *development*, *production*, *test*, *app*, etc. The following is an example declarative configuration.

```xml
<hazelcast>
  <group>
    <name>production</name>
  </group>
  ...
</hazelcast>
```

You can also define the cluster groups using the programmatic configuration. A JVM can host multiple Hazelcast instances. Each Hazelcast instance can only participate in one group. Each Hazelcast instance only joins to its own group and does not interact with other groups. The following code example creates three separate Hazelcast instances--`h1` belongs to the `production` cluster, while `h2` and `h3` belong to the `development` cluster.

```java
Config configProd = new Config();
configApp1.getGroupConfig().setName( "production" );

Config configDev = new Config();
configApp2.getGroupConfig().setName( "development" );

HazelcastInstance h1 = Hazelcast.newHazelcastInstance( configProd );
HazelcastInstance h2 = Hazelcast.newHazelcastInstance( configDev );
HazelcastInstance h3 = Hazelcast.newHazelcastInstance( configDev );
```


##### Cluster Groups before Hazelcast 3.8.2

If you have a Hazelcast release older than 3.8.2, you need to provide also a group password along with the group name. The following are the configuration examples with the password element:

```xml
<hazelcast>
  <group>
    <name>production</name>
    <password>prod-pass</password>
  </group>
  ...
</hazelcast>
```



```java
Config configProd = new Config();
configApp1.getGroupConfig().setName( "production" ).setPassword( "prod-pass" );

Config configDev = new Config();
configApp2.getGroupConfig().setName( "development" ).setPassword( "dev-pass" );

HazelcastInstance h1 = Hazelcast.newHazelcastInstance( configProd );
HazelcastInstance h2 = Hazelcast.newHazelcastInstance( configDev );
HazelcastInstance h3 = Hazelcast.newHazelcastInstance( configDev );
```

Starting with 3.8.2, there is no need for a group password.