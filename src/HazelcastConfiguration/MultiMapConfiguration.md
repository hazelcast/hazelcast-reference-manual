
## MultiMap Configuration

The following are the example MultiMap configurations.

**Declarative:**

```xml
<hazelcast>
  <multimap name="default">
    <backup-count>0</backup-count>
    <async-backup-count>1</async-backup-count>
    <value-collection-type>SET</value-collection-type>
    <entry-listeners>
        <entry-listener include-value="false" local="false">
           com.hazelcast.examples.EntryListener
        </entry-listener>
    </entry-listeners>   
  </map>
</hazelcast>
```

**Programmatic:**

```java
MultiMapConfig mmConfig = new MultiMapConfig();
mmConfig.setName( "default" );

mmConfig.setBackupCount( "0" ).setAsyncBackupCount( "1" );
         
mmConfig.setValueCollectionType( "SET" );
```


Most of the MultiMap configuration elements and attributes have the same names and functionalities explained in the [Map Configuration section](#map-configuration). Below are the ones specific to MultiMap.

- `backup-count`: Defines the number of synchronous backups. For example, if it is set to 1, backup of a partition will be
placed on 1 other member. If it is 2, it will be placed on 2 other members.
- `async-backup-count`: The number of synchronous backups. Behavior is the same as that of the `backup-count` element.
- `statistics-enabled`: You can retrieve some statistics like owned entry count, backup entry count, last update time, locked entry count by setting this parameter's value as "true". The method for retrieving the statistics is `getLocalMultiMapStats()`.
- `value-collection-type`: Type of the value collection. It can be `Set` or `List`.
- `entry-listeners`: Lets you add listeners (listener classes) for the map entries. You can also set the attribute
include-value to true if you want the item event to contain the entry values, and you can set
local to true if you want to listen to the entries on the local node.


