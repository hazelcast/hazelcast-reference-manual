
## ReplicatedMap Configuration

**Declarative:**

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
</replicatedmap
```

**Programmatic:**

```java
Config config = new Config();
ReplicatedMapConfig rmConfig = config.getReplicatedMapConfig( "default" );

rmConfig.setName("default").setInMemoryFormat( InMemoryFormat.BINARY )
        .setAsyncFillup( "true" );
```

Replicated map configuration has the following elements.

- `in-memory-format`: Data type used to store entries. Possible values are BINARY, OBJECT and NATIVE.
- `async-fillup`: This value defines if the replicated map is available for reads before the initial replication is completed. Default is true. If set to false, no Exception will be thrown when the replicated map is not yet ready but the call will block until finished.
- `statistics-enabled`: True (default) if statistics gathering is enabled on the replicated map, false otherwise.
- `entry-listeners`: Lets you add listeners (listener classes) for the replicated map entries. You can also set the attribute
include-value to true if you want the item event to contain the entry values, and you can set
local to true if you want to listen to the entries on the local node.


Replicated map configuration has the following attributes.

- `name`: Name for your replicated map.
