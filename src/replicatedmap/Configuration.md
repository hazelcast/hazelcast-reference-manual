
### Configuring Replicated Map

Replicated Map can be configured using the following two ways (as with most other features in Hazelcast):

- Programmatic: the typical Hazelcast way, using the Config API seen above.
- Declarative: using `hazelcast.xml`.

#### Replicated Map Declarative Configuration

You can declare your Replicated Map configuration in the Hazelcast configuration file `hazelcast.xml`. See the following example declarative configuration.

```xml
<replicatedmap name="default">
  <in-memory-format>BINARY</in-memory-format>
  <async-fillup>true</async-fillup>
  <statistics-enabled>true</statistics-enabled>
  <entry-listeners>
    <entry-listener include-value="true">
      com.hazelcast.examples.EntryListener
    </entry-listener>
  </entry-listeners>
</replicatedmap>
```

- `in-memory-format`: Internal storage format.  Please see the [In-Memory Format section](#in-memory-format-on-replicated-map). The default value is `BINARY`.
- `async-fillup`: Specifies if the replicated map is available for reads before the initial replication is completed. The default value is `true`. If set to `false` (i.e. synchronous initial fill up), no exception will be thrown when the replicated map is not yet ready, but `null` values can be seen until the initial replication is completed.
- `statistics-enabled`: If set to `true`, the statistics such as cache hits and misses are collected. The default value is `false`.
- `entry-listener`: Full canonical classname of the `EntryListener` implementation.
  - `entry-listener#include-value`: Specifies whether the event includes the value or not. Sometimes the key is enough to react on an event. In those situations, setting this value to `false` will save a deserialization cycle. The default value is `true`.
  - `entry-listener#local`: Not used for Replicated Map since listeners are always local.

#### Replicated Map Programmatic Configuration

You can use the Config API for programmatic configuration, as you can for all other data structures in Hazelcast. You must create the configuration upfront, when you instantiate the `HazelcastInstance`.

A basic example on how to configure the Replicated Map using the programmatic approach is shown in the following snippet.

```java
Config config = new Config();

ReplicatedMapConfig replicatedMapConfig =
    config.getReplicatedMapConfig( "default" );

replicatedMapConfig.setInMemoryFormat( InMemoryFormat.BINARY );
```

All properties that can be configured using the declarative configuration are also available using programmatic configuration
by transforming the tag names into getter or setter names.

#### In-Memory Format on Replicated Map

Currently, two `in-memory-format` values are usable with the Replicated Map.

- `OBJECT` (default): The data will be stored in deserialized form. This configuration is the default choice since
the data replication is mostly used for high speed access. Please be aware that changing the values without a `Map::put` is
not reflected on the other nodes but is visible on the changing nodes for later value accesses.

- `BINARY`: The data is stored in serialized binary format and has to be deserialized on every request. This
option offers higher encapsulation since changes to values are always discarded as long as the newly changed object is
not explicitly `Map::put` into the map again.
