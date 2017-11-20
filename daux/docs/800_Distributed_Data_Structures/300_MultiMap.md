
Hazelcast `MultiMap` is a specialized map where you can store multiple values under a single key. Just like any other distributed data structure implementation in Hazelcast, `MultiMap` is distributed and thread-safe.

Hazelcast `MultiMap` is not an implementation of `java.util.Map` due to the difference in method signatures. It supports most features of Hazelcast Map except for indexing, predicates and MapLoader/MapStore. Yet, like Hazelcast Map, entries are almost evenly distributed onto all cluster members. When a new member joins the cluster, the same ownership logic used in the distributed map applies.


### Getting a MultiMap and Putting an Entry

The following example creates a MultiMap and puts items into it. Use the HazelcastInstance `getMultiMap` method to get the MultiMap, then use the MultiMap `put` method to put an entry into the MultiMap.


```java
public class PutMember {
  public static void main( String[] args ) {
    HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
    MultiMap <String , String > map = hazelcastInstance.getMultiMap( "map" );

    map.put( "a", "1" );
    map.put( "a", "2" );
    map.put( "b", "3" ); 
    System.out.println( "PutMember:Done" );
  }
}
```

Now let's print the entries in this MultiMap.

```java
public class PrintMember {
    public static void main(String[] args) {
        HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
        MultiMap<String, String> map = hazelcastInstance.getMultiMap("map");

        map.put("a", "1");
        map.put("a", "2");
        map.put("b", "3");
        System.out.printf("PutMember:Done");

        for (String key: map.keySet()){
            Collection <String> values = map.get(key);
            System.out.printf("%s -> %s\n", key, values);
        }
    }
}
```

After you run the first code sample, run the `PrintMember` sample. You will see the key **`a`** has two values, as shown below.

`b -> [3]`

`a -> [2, 1]`

Hazelcast MultiMap uses `EntryListener` to listen to events which occur when entries are added to, updated in or removed from the MultiMap. Please refer to the [Listening for MultiMap Events section](/07_Distributed_Events/200_Distributed_Object_Events/06_Listening_for_MultiMap_Events.md) for information on how to create an entry listener class and register it.

### Configuring MultiMap

When using MultiMap, the collection type of the values can be either **Set** or **List**. Configure the collection type with the `valueCollectionType` parameter. If you choose `Set`, duplicate and null values are not allowed in your collection and ordering is irrelevant. If you choose `List`, ordering is relevant and your collection can include duplicate and null values.

You can also enable statistics for your MultiMap with the `statisticsEnabled` parameter. If you enable `statisticsEnabled`, statistics can be retrieved with `getLocalMultiMapStats()` method.


![image](../images/NoteSmall.jpg) ***NOTE:*** *Currently, eviction is not supported for the MultiMap data structure.*
<br></br>

The following are the example MultiMap configurations.

**Declarative:**

```xml
<multimap name="default">
    <backup-count>0</backup-count>
    <async-backup-count>1</async-backup-count>
    <value-collection-type>SET</value-collection-type>
    <entry-listeners>
        <entry-listener include-value="false" local="false" >com.hazelcast.examples.EntryListener</entry-listener>
    </entry-listeners>
</multimap>
```

**Programmatic:**

```java
MultiMapConfig mmConfig = new MultiMapConfig();
mmConfig.setName( "default" );

mmConfig.setBackupCount( "0" ).setAsyncBackupCount( "1" );
         
mmConfig.setValueCollectionType( "SET" );
```

The following are the configuration elements and their descriptions:

- `backup-count`: Defines the number of synchronous backups. For example, if it is set to 1, backup of a partition will be
placed on one other member. If it is 2, it will be placed on two other members.
- `async-backup-count`: The number of asynchronous backups. Behavior is the same as that of the `backup-count` element.
- `statistics-enabled`: You can retrieve some statistics such as owned entry count, backup entry count, last update time, and locked entry count by setting this parameter's value as "true". The method for retrieving the statistics is `getLocalMultiMapStats()`.
- `value-collection-type`: Type of the value collection. It can be `SET` or `LIST`.
- `entry-listeners`: Lets you add listeners (listener classes) for the map entries. You can also set the attribute
include-value to true if you want the item event to contain the entry values, and you can set
local to true if you want to listen to the entries on the local member.
