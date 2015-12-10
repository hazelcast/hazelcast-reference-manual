
## Hibernate Second Level Cache

Hazelcast provides distributed second level cache for your Hibernate entities, collections and queries. 

### Sample Code for Hibernate

Please see our <a href="https://github.com/hazelcast/hazelcast-code-samples/tree/master/hazelcast-integration/hibernate-2ndlevel-cache" target="_blank">sample application</a> for Hibernate Second Level Cache.

### Supported Hibernate Versions

- hibernate 3.3.x+
- hibernate 4.x

### Configuring Hibernate for Hazelcast

To configure Hibernate for Hazelcast:

- Add `hazelcast-hibernate3-<`*hazelcastversion*`>.jar` or `hazelcast-
hibernate4-<`*hazelcastversion*`>.jar` into your classpath depending on your Hibernate version.
- Then add the following properties into your Hibernate configuration file (e.g. `hibernate.cfg.xml`).

#### Enabling Second Level Cache

```xml
<property name="hibernate.cache.use_second_level_cache">true</property>
```

#### Configuring RegionFactory

You can configure Hibernate RegionFactory with `HazelcastCacheRegionFactory` or `HazelcastLocalCacheRegionFactory`.

##### HazelcastCacheRegionFactory

`HazelcastCacheRegionFactory` uses standard Hazelcast Distributed Maps to cache the data, so all cache operations go through the wire.

```xml    
<property name="hibernate.cache.region.factory_class">
   com.hazelcast.hibernate.HazelcastCacheRegionFactory
</property>
```

All operations like `get`, `put`, and `remove` will be performed using the Distributed Map logic. The only downside of using `HazelcastCacheRegionFactory` may be lower performance compared to `HazelcastLocalCacheRegionFactory` since operations are handled as distributed calls.

![image](images/NoteSmall.jpg) ***NOTE:*** *If you use `HazelcastCacheRegionFactory`, you can see your maps on [Management Center](#management-center).*

With `HazelcastCacheRegionFactory`, all of the following caches are distributed across Hazelcast Cluster.

- Entity Cache
- Collection Cache
- Timestamp Cache

##### HazelcastLocalCacheRegionFactory

You can use `HazelcastLocalCacheRegionFactory` which stores data in a local node and sends invalidation messages when an entry is updated/deleted locally.

```xml
<property name="hibernate.cache.region.factory_class">
  com.hazelcast.hibernate.HazelcastLocalCacheRegionFactory
</property>
```

With `HazelcastLocalCacheRegionFactory`, each cluster member has a local map and each of them is registered to a Hazelcast Topic (ITopic). Whenever a `put` or `remove` operation is performed on a member, an invalidation message is generated on the ITopic and sent to the other members. Those other members remove the related key-value pair on their local maps as soon as they get these invalidation messages. The new value is only updated on this member when a `get` operation runs on that key. In the case of `get` operations, invalidation messages are not generated and reads are performed on the local map.

An illustration of the above logic is shown below.

![image](images/HZLocalCacheRgnFactory.jpg)

If your operations are mostly reads, then this option gives better performance.

![image](images/NoteSmall.jpg) ***NOTE:*** *If you use `HazelcastLocalCacheRegionFactory`, you cannot see your maps on [Management Center](#management-center).*

With `HazelcastLocalCacheRegionFactory`, all of the following caches are not distributed and are kept locally in the Hazelcast Node.

- Entity Cache
- Collection Cache
- Timestamp Cache

Entity and Collection are invalidated on update. When they are updated on a node, an invalidation message is sent to all other nodes in order to remove the entity from their local cache. When needed, each node reads that data from the underlying DB. 

Timestamp cache is replicated. On every update, a replication message is sent to all the other nodes.

Eviction support is limited to maximum size of the map (defined by `max-size` configuration element) and TTL only. When maximum size is hit, 20% of the entries will be evicted automatically.

#### Configuring Query Cache and Other Settings

-   To enable use of query cache:

	```xml
	<property name="hibernate.cache.use_query_cache">true</property>
	```

-   To force minimal puts into query cache:

	```xml
	<property name="hibernate.cache.use_minimal_puts">true</property>
	```

-   To avoid `NullPointerException` when you have entities that have composite keys (using `@IdClass`):

    ```xml
	<property name="hibernate.session_factory_name">yourFactoryName</property>
	```
	
![image](images/NoteSmall.jpg) ***NOTE:*** *QueryCache is always LOCAL to the node and never distributed across Hazelcast Cluster.*

### Configuring Hazelcast for Hibernate

To configure Hazelcast for Hibernate, put the configuration file named `hazelcast.xml` into the root of your classpath. If Hazelcast cannot find `hazelcast.xml`, then it will use the default configuration from `hazelcast.jar`.

You can define a custom-named Hazelcast configuration XML file with one of these Hibernate configuration properties.

```xml
<property name="hibernate.cache.provider_configuration_file_resource_path">
  hazelcast-custom-config.xml
</property>
```


```xml
<property name="hibernate.cache.hazelcast.configuration_file_path">
  hazelcast-custom-config.xml
</property>
```

Hazelcast creates a separate distributed map for each Hibernate cache region. You can easily configure these regions via Hazelcast map configuration. You can define **backup**, **eviction**, **TTL** and **Near Cache** properties.

- [Backup Configuration](#backing-up-maps)

- [Eviction And TTL Configuration](#evicting-map-entries)

- [Near Cache Configuration](#creating-near-cache-for-map)

### Setting P2P (Peer-to-Peer) for Hibernate

Hibernate Second Level Cache can use Hazelcast in two modes: Peer-to-Peer (P2P) and Client/Server (next section).

With P2P mode, each Hibernate deployment launches its own Hazelcast Instance. You can also configure Hibernate to use an existing instance, instead of creating a new `HazelcastInstance` for each `SessionFactory`. To do this, set the `hibernate.cache.hazelcast.instance_name` Hibernate property to the `HazelcastInstance`'s name. For more information, please see [Named Instance Scope](#named-instance-scope).

**Disabling shutdown during SessionFactory.close()**

You can disable shutting down `HazelcastInstance` during `SessionFactory.close()`. To do this, set the Hibernate property `hibernate.cache.hazelcast.shutdown_on_session_factory_close` to false. *(In this case, you should not set the Hazelcast property `hazelcast.shutdownhook.enabled` to false.)* The default value is `true`.


### Setting Client/Server for Hibernate

You can set up Hazelcast to connect to the cluster as Native Client. Native client is not a member; it connects to one of the cluster members and delegates all cluster wide operations to it. Client instance started in the Native Client mode uses Smart Routing: when the relied cluster member dies, the client transparently switches to another live member. All client operations are Retry-able, meaning that the client resends the request as many as 10 times in case of a failure. After the 10th retry, it throws an exception. You cannot change the routing mode and retry-able operation configurations of the Native Client instance used by Hibernate 2nd Level Cache. Please see the [Smart Routing section](##smart-routing) and [Retry-able Operation Failure section](#retry-able-operation-failure) for more details.

```xml   
<property name="hibernate.cache.hazelcast.use_native_client">true</property>
```

To set up Native Client, add the Hazelcast **group-name**, **group-password** and **cluster member address** properties. Native Client will connect to the defined member and will get the addresses of all members in the cluster. If the connected member dies or leaves the cluster, the client will automatically switch to another member in the cluster.

```xml  
<property name="hibernate.cache.hazelcast.native_client_address">10.34.22.15</property>
<property name="hibernate.cache.hazelcast.native_client_group">dev</property>
<property name="hibernate.cache.hazelcast.native_client_password">dev-pass</property>
```

![image](images/NoteSmall.jpg) ***NOTE***: *To use Native Client, add `hazelcast-client-<version>.jar` into your classpath. Refer to [Clients](#clients) for more information.*


![image](images/NoteSmall.jpg) ***NOTE***: *To use Native Client, add `hazelcast-all-<version>.jar` into your remote cluster's classpath.*

### Configuring Cache Concurrency Strategy

Hibernate has four cache concurrency strategies: *read-only*, *read-write*, *nonstrict-read-write* and *transactional*. Hibernate does not force cache providers to support all those strategies. Hazelcast supports the first three: *read-only*, *read-write*, and *nonstrict-read-write*. It does not yet support *transactional* strategy.

If you are using XML based class configurations, add a *cache* element into your configuration with the *usage* attribute set to one of the *read-only*, *read-write*, or *nonstrict-read-write* strategies.
   
```xml
<class name="eg.Immutable" mutable="false">
  <cache usage="read-only"/>
  .... 
</class>

<class name="eg.Cat" .... >
  <cache usage="read-write"/>
  ....
  <set name="kittens" ... >
    <cache usage="read-write"/>
    ....
  </set>
</class>
```
If you are using Hibernate-Annotations, then you can add a *class-cache* or *collection-cache* element into your Hibernate configuration file with the *usage* attribute set to *read only*, *read/write*, or *nonstrict read/write*.

```xml    
<class-cache usage="read-only" class="eg.Immutable"/>
<class-cache usage="read-write" class="eg.Cat"/>
<collection-cache collection="eg.Cat.kittens" usage="read-write"/>
```

Or alternatively, you can put Hibernate Annotation's *@Cache* annotation on your entities and collections.

```java    
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Cat implements Serializable {
  ...
}
```

### Advanced Settings

**Accessing underlying HazelcastInstance**

If you need to access `HazelcastInstance` used by Hibernate `SessionFactory`, you can give a name to the `HazelcastInstance` while configuring Hazelcast. Then it is possible to retrieve the instance using `getHazelcastInstanceByName` static method of `Hazelcast`.

Please refer to the [Configuration Overview section](#configuration-overview) to learn how to create a named Hazelcast instance.

**Changing/setting lock timeout value of *read-write* strategy**

You can set a lock timeout value using the `hibernate.cache.hazelcast.lock_timeout_in_seconds` Hibernate property. The value should be in seconds. The default value is 300 seconds.



<br></br>
