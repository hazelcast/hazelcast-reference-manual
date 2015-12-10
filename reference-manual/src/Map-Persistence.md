

### Loading and Storing Persistent Data

Hazelcast allows you to load and store the distributed map entries from/to a persistent data store such as a relational database. To do this, you can use Hazelcast's `MapStore` and `MapLoader` interfaces.

When you provide a `MapLoader` implementation and request an entry (`IMap.get()`) that does not exist in memory, `MapLoader`'s `load` or `loadAll` methods will load that entry from the data store. This loaded entry is placed into the map and will stay there until it is removed or evicted.

When a `MapStore` implementation is provided, an entry is also put into a user defined data store. 

![image](images/NoteSmall.jpg) ***NOTE:*** *Data store needs to be a centralized system that is
accessible from all Hazelcast members. Persistence to local file system is not supported.*

![image](images/NoteSmall.jpg) ***NOTE:*** *Also note that, the `MapStore` interface extends the `MapLoader` interface as you can see in the interface [code](https://github.com/hazelcast/hazelcast/blob/master/hazelcast/src/main/java/com/hazelcast/core/MapStore.java).*




Following is a `MapStore` example.

```java
public class PersonMapStore implements MapStore<Long, Person> {
    private final Connection con;

    public PersonMapStore() {
        try {
            con = DriverManager.getConnection("jdbc:hsqldb:mydatabase", "SA", "");
            con.createStatement().executeUpdate(
                    "create table if not exists person (id bigint, name varchar(45))");
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public synchronized void delete(Long key) {
        System.out.println("Delete:" + key);
        try {
            con.createStatement().executeUpdate(
                    format("delete from person where id = %s", key));
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public synchronized void store(Long key, Person value) {
        try {
            con.createStatement().executeUpdate(
                    format("insert into person values(%s,'%s')", key, value.name));
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public synchronized void storeAll(Map<Long, Person> map) {
        for (Map.Entry<Long, Person> entry : map.entrySet())
            store(entry.getKey(), entry.getValue());
    }

    public synchronized void deleteAll(Collection<Long> keys) {
        for (Long key : keys) delete(key);
    }

    public synchronized Person load(Long key) {
        try {
            ResultSet resultSet = con.createStatement().executeQuery(
                    format("select name from person where id =%s", key));
            try {
                if (!resultSet.next()) return null;
                String name = resultSet.getString(1);
                return new Person(name);
            } finally {
                resultSet.close();
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public synchronized Map<Long, Person> loadAll(Collection<Long> keys) {
        Map<Long, Person> result = new HashMap<Long, Person>();
        for (Long key : keys) result.put(key, load(key));
        return result;
    }

    public Iterable<Long> loadAllKeys() {
        return null;
    }
}
```

![image](images/NoteSmall.jpg) ***NOTE:*** *During the initial loading process, MapStore uses a thread different than the partition threads that is used by the ExecutorService. After the initialization is completed, the `map.get` method looks up any inexistent value from the database in a partition thread or the `map.put` method looks up the database to return the previously associated value for a key also in a partition thread.*

<br></br>
***RELATED INFORMATION***

*For more MapStore/MapLoader code samples please see <a href="https://github.com/hazelcast/hazelcast-code-samples/tree/master/distributed-map/mapstore/src/main/java" target="_blank">here</a>.*
<br></br>

Hazelcast supports read-through, write-through, and write-behind persistence modes which are explained in the subsections below.

#### Using Read-Through Persistence

If an entry does not exist in the memory when an application asks for it, Hazelcast asks your loader implementation to load that entry from the data store.  If the entry exists there, the loader implementation gets it, hands it to Hazelcast, and Hazelcast puts it into the memory. This is read-through persistence mode.



#### Setting Write-Through Persistence

`MapStore` can be configured to be write-through by setting the `write-delay-seconds` property to **0**. This means the entries will be put to the data store synchronously.

In this mode, when the `map.put(key,value)` call returns:

- `MapStore.store(key,value)` is successfully called so the entry is persisted.
- In-Memory entry is updated.
- In-Memory backup copies are successfully created on other cluster members (if `backup-count` is greater than 0).

The same behavior goes for a `map.remove(key)` call. The only difference is that  `MapStore.delete(key)` is called when the entry will be deleted.

If `MapStore` throws an exception, then the exception will be propagated back to the original `put` or `remove` call in the form of `RuntimeException`.

#### Setting Write-Behind Persistence

You can configure `MapStore` as write-behind by setting the `write-delay-seconds` property to a value bigger than **0**. This means the modified entries will be put to the data store asynchronously after a configured delay. 

![image](images/NoteSmall.jpg) ***NOTE:*** *In write-behind mode, by default Hazelcast coalesces updates on a specific key, i.e. applies only the last update on it. However, you can set `MapStoreConfig#setWriteCoalescing` to `FALSE` and you can store all updates performed on a key to the data store.*

![image](images/NoteSmall.jpg) ***NOTE:*** *When you set `MapStoreConfig#setWriteCoalescing` to `FALSE`, after you reached per-node maximum write-behind-queue capacity, subsequent put operations will fail with `ReachedMaxSizeException`. This exception will be thrown to prevent uncontrolled grow of write-behind queues. You can set per node maximum capacity using the system property `hazelcast.map.write.behind.queue.capacity`. Please refer to the [System Properties section](#system-properties) for information on this property and how to set the system properties.*


In write-behind mode, when the `map.put(key,value)` call returns:

- In-Memory entry is updated.
- In-Memory backup copies are successfully created on other cluster members (if `backup-count` is greater than 0).
- The entry is marked as dirty so that after `write-delay-seconds`, it can be persisted with `MapStore.store(key,value)` call.
- For fault tolerance, dirty entries are stored in a queue on the primary member and also on a back-up member.

The same behavior goes for the `map.remove(key)`, the only difference is that  `MapStore.delete(key)` is called when the entry will be deleted.

If `MapStore` throws an exception, then Hazelcast tries to store the entry again. If the entry still cannot be stored, a log message is printed and the entry is re-queued. 

For batch write operations, which are only allowed in write-behind mode, Hazelcast will call `MapStore.storeAll(map)` and `MapStore.deleteAll(collection)` to do all writes in a single call.
<br></br>

![image](images/NoteSmall.jpg) ***NOTE:*** *If a map entry is marked as dirty, i.e. it is waiting to be persisted to the `MapStore` in a write-behind scenario, the eviction process forces the entry to be stored. By this way, you will have control on the number of entries waiting to be stored, and thus you can prevent a possible OutOfMemory exception.*
<br></br>


![image](images/NoteSmall.jpg) ***NOTE:*** *`MapStore` or `MapLoader` implementations should not use Hazelcast Map/Queue/MultiMap/List/Set operations. Your implementation should only work with your data store. Otherwise, you may get into deadlock situations.*

Here is a sample configuration:

```xml
<hazelcast>
  ...
  <map name="default">
    ...
    <map-store enabled="true">
      <class-name>com.hazelcast.examples.DummyStore</class-name>
      <write-delay-seconds>60</write-delay-seconds>
      <write-batch-size>1000</write-batch-size>
      <write-coalescing>true</write-coalescing>
    </map-store>
  </map>
</hazelcast>
```
<br></br>
***RELATED INFORMATION***

*Please refer to the [Map Store section](#map-store) for the full Map Store configuration description.*

<br></br>


#### Storing Entries to Multiple Maps

A configuration can be applied to more than one map using wildcards (see [Using Wildcard](#using-wildcard)), meaning that the configuration is shared among the maps. But `MapStore` does not know which entries to store when there is one configuration applied to multiple maps. 

To store entries when there is one configuration applied to multiple maps, use Hazelcast's `MapStoreFactory` interface. Using the `MapStoreFactory` interface, `MapStore`s for each map can be created when a wildcard configuration is used. Example code is shown below.

```java
Config config = new Config();
MapConfig mapConfig = config.getMapConfig( "*" );
MapStoreConfig mapStoreConfig = mapConfig.getMapStoreConfig();
mapStoreConfig.setFactoryImplementation( new MapStoreFactory<Object, Object>() {
  @Override
  public MapLoader<Object, Object> newMapStore( String mapName, Properties properties ) {
    return null;
  }
});
```

To initialize the `MapLoader` implementation with the given map name, configuration properties, and the Hazelcast instance, implement the `MapLoaderLifecycleSupport` interface. See the following example code.

```java
public interface MapLoaderLifecycleSupport {

  /**
   * Initializes this MapLoader implementation. Hazelcast will call
   * this method when the map is first used on the
   * HazelcastInstance. Implementation can
   * initialize required resources for implementing
   * MapLoader such as reading a configuration file and/or creating
   * a database connection.
   */
  void init( HazelcastInstance hazelcastInstance, Properties properties, String mapName );

  /**
   * Hazelcast will call this method before shutting down.
   * This method can be overridden to cleanup the resources
   * held by this MapLoader implementation, such as closing the
   * database connections, etc.
   */
  void destroy();
}
```


#### Initializing Map on Startup

To pre-populate the in-memory map when the map is first touched/used, use the `MapLoader.loadAllKeys` API.

If `MapLoader.loadAllKeys` returns NULL, then nothing will be loaded. Your `MapLoader.loadAllKeys` implementation can return all or some of the keys. For example, you may select and return only the `hot` keys. `MapLoader.loadAllKeys` is the fastest way of pre-populating the map since Hazelcast will optimize the loading process by having each cluster member load its owned portion of the entries.

The `InitialLoadMode` configuration parameter in the class <a href="https://github.com/hazelcast/hazelcast/blob/master/hazelcast/src/main/java/com/hazelcast/config/MapStoreConfig.java" target="_blank">MapStoreConfig</a> has two values: `LAZY` and `EAGER`. If `InitialLoadMode` is set to `LAZY`, data is not loaded during the map creation. If it is set to `EAGER`, the whole data is loaded while the map is created and everything becomes ready to use. Also, if you add indices to your map with the <a href="https://github.com/hazelcast/hazelcast/blob/master/hazelcast/src/main/java/com/hazelcast/config/MapIndexConfig.java" target="_blank">MapIndexConfig</a> class or the [`addIndex`](#indexing-queries) method, then `InitialLoadMode` is overridden and `MapStoreConfig` behaves as if `EAGER` mode is on.

Here is the `MapLoader` initialization flow:

1. When `getMap()` is first called from any member, initialization will start depending on the value of `InitialLoadMode`. If it is set to `EAGER`, initialization starts.  If it is set to `LAZY`, initialization does not start but data is loaded each time a partition loading completes.
2. Hazelcast will call `MapLoader.loadAllKeys()` to get all your keys on one of the members.
3. That member will distribute keys to all other members in batches.
4. Each member will load values of all its owned keys by calling `MapLoader.loadAll(keys)`.
5. Each member puts its owned entries into the map by calling `IMap.putTransient(key,value)`.

![image](images/NoteSmall.jpg) ***NOTE:*** *If the load mode is `LAZY` and when the `clear()` method is called (which triggers `MapStore.deleteAll()`), Hazelcast will remove **ONLY** the loaded entries from your map and datastore. Since the whole data is not loaded for this case (`LAZY` mode), please note that there may be still entries in your datastore.*
<br></br>

![image](images/NoteSmall.jpg) ***NOTE:*** *The return type of `loadAllKeys()` is changed from `Set` to `Iterable` with the release of Hazelcast 3.5. MapLoader implementations from previous releases are also supported and do not need to be adapted.*

<br></br>
#### Loading Keys Incrementally

If the number of keys to load is large, it is more efficient to load them incrementally than loading them all at once. To support incremental loading, the `MapLoader.loadAllKeys()` method returns an `Iterable` which can be lazily populated with the results of a database query. 

Hazelcast iterates over the `Iterable` and, while doing so, sends out the keys to their respective owner nodes. The `Iterator` obtained from `MapLoader.loadAllKeys()` may also implement the `Closeable` interface, in which case `Iterator` is closed once the iteration is over. This is intended for releasing resources such as closing a JDBC result set. 

#### Forcing All Keys To Be Loaded

The method `loadAll` loads some or all keys into a data store in order to optimize the multiple load operations. The method has two signatures (i.e. the same method can take two different parameter lists). One signature loads the given keys and the other loads all keys. Please see the example code below.


```java
public class LoadAll {

    public static void main(String[] args) {
        final int numberOfEntriesToAdd = 1000;
        final String mapName = LoadAll.class.getCanonicalName();
        final Config config = createNewConfig(mapName);
        final HazelcastInstance node = Hazelcast.newHazelcastInstance(config);
        final IMap<Integer, Integer> map = node.getMap(mapName);
       
        populateMap(map, numberOfEntriesToAdd);
        System.out.printf("# Map store has %d elements\n", numberOfEntriesToAdd);
   
        map.evictAll();
        System.out.printf("# After evictAll map size\t: %d\n", map.size());
        
        map.loadAll(true);
        System.out.printf("# After loadAll map size\t: %d\n", map.size());
    }
}
```


#### Post-Processing Objects in Map Store

In some scenarios, you may need to modify the object after storing it into the map store.
For example, you can get an ID or version auto-generated by your database and then you need to modify your object stored in the distributed map but not to break the synchronization between database and data grid. 

To post-process an object in the map store, implement the `PostProcessingMapStore` interface to put the modified object into the distributed map. That causes an extra step of `Serialization`, so use it only when needed. (This is only valid when using the `write-through` map store configuration.)

Here is an example of post processing map store:

```java
class ProcessingStore implements MapStore<Integer, Employee>, PostProcessingMapStore {
  @Override
  public void store( Integer key, Employee employee ) {
    EmployeeId id = saveEmployee();
    employee.setId( id.getId() );
  }
}
```

** Note :** Please be warned that if you are using a post processing map store in combination with entry processors, post-processed values will not be carried to backups.
