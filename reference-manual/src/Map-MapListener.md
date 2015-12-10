


### Listening to Map Events

To listen to map-wide or entry-based events, implement a `MapListener` sub-interface.

A map-wide event is fired as a result of a map-wide operation: for 
example, `IMap#clear` or `IMap#evictAll`.
An entry-based event is fired after the operations that affect a 
specific entry: for example, `IMap#remove` or `IMap#evict`.

#### Catching a Map Event

To catch an event, you should explicitly 
implement a corresponding sub-interface of a `MapListener`, 
such as `EntryAddedListener` or `MapClearedListener`. 

Let's take a look at the following code example.

![image](images/NoteSmall.jpg) ***NOTE:*** *`EntryListener` interface still can be implemented, 
we kept that for backward compatibility reasons. However, if you need to listen to a 
different event which is not available in the `EntryListener` interface, you should also 
implement a relevant `MapListener` sub-interface.*

```java
public class Listen {

  public static void main( String[] args ) {
    HazelcastInstance hz = Hazelcast.newHazelcastInstance();
    IMap<String, String> map = hz.getMap( "somemap" );
    map.addEntryListener( new MyEntryListener(), true );
     System.out.println( "EntryListener registered" );
  }

  static class MyEntryListener implements EntryAddedListener<String, String>, 
                                          EntryRemovedListener<String, String>, 
                                          EntryUpdatedListener<String, String>, 
                                          EntryEvictedListener<String, String> , 
                                          MapEvictedListener, 
                                          MapClearedListener   {
    @Override
    public void entryAdded( EntryEvent<String, String> event ) {
      System.out.println( "Entry Added:" + event );
    }

    @Override
    public void entryRemoved( EntryEvent<String, String> event ) {
      System.out.println( "Entry Removed:" + event );
    }

    @Override
    public void entryUpdated( EntryEvent<String, String> event ) {
      System.out.println( "Entry Updated:" + event );
    }

    @Override
    public void entryEvicted( EntryEvent<String, String> event ) {
      System.out.println( "Entry Evicted:" + event );
    }

    @Override
    public void mapEvicted( MapEvent event ) {
      System.out.println( "Map Evicted:" + event );
    }
   
    @Override
    public void mapCleared( MapEvent event ) {
      System.out.println( "Map Cleared:" + event );
    }

  }
}
```

Now, let's perform some modifications on the map entries using the following example code.

```java
public class Modify {

  public static void main( String[] args ) {
    HazelcastInstance hz = Hazelcast.newHazelcastInstance();
    IMap<String, String> map = hz.getMap( "somemap");
    String key = "" + System.nanoTime();
    String value = "1";
    map.put( key, value );
    map.put( key, "2" );
    map.delete( key );
  }
}
```

If you execute the `Listen` class and then the `Modify` class, you get the following output 
produced by the `Listen` class. 

```
entryAdded:EntryEvent {Address[192.168.1.100]:5702} key=251359212222282,
    oldValue=null, value=1, event=ADDED, by Member [192.168.1.100]:5702

entryUpdated:EntryEvent {Address[192.168.1.100]:5702} key=251359212222282,
    oldValue=1, value=2, event=UPDATED, by Member [192.168.1.100]:5702

entryRemoved:EntryEvent {Address[192.168.1.100]:5702} key=251359212222282,
    oldValue=2, value=2, event=REMOVED, by Member [192.168.1.100]:5702
```


```java
public class MyEntryListener implements EntryListener{

    private Executor executor = Executors.newFixedThreadPool(5);

    @Override
    public void entryAdded(EntryEvent event) {
        executor.execute(new DoSomethingWithEvent(event));
    }
...
```

#### Partitions and Entry Listeners

A map listener runs on the event threads that are also used by the other listeners: for 
example, the collection listeners and pub/sub message listeners. This means that the entry 
listeners can access other partitions. Consider this when you run long tasks, since listening 
to those tasks may cause the other map/event listeners to starve.

#### Listening for Lost Map Partitions

You can listen to `MapPartitionLostEvent` instances by registering an implementation 
of `MapPartitionLostListener`, which is also a sub-interface of `MapListener`.

Let`s consider the following example code:

```java
  public static void main(String[] args) {
    Config config = new Config();
    config.getMapConfig("map").setBackupCount(1); // might lose data if any member crashes

    HazelcastInstance instance = HazelcastInstanceFactory.newHazelcastInstance(config);

    IMap<Object, Object> map = instance1.getMap("map");
    map.put(0, 0);

    map.addPartitionLostListener(new MapPartitionLostListener() {
      @Override
      public void partitionLost(MapPartitionLostEvent event) {
        System.out.println(event);
      }
    });
  }
```

Within this example code, a `MapPartitionLostListener` implementation is registered to a map 
that is configured with 1 backup. For this particular map and any of the partitions in the 
system, if the partition owner member and its first backup member crash simultaneously, the 
given `MapPartitionLostListener` receives a 
corresponding `MapPartitionLostEvent`. If only a single member crashes in the cluster, 
there will be no `MapPartitionLostEvent` fired for this map since backups for the partitions 
owned by the crashed member are kept on other members. 

Please refer to [Listening for Partition Lost Events](#listening-for-partition-lost-events) for more 
information about partition lost detection and partition lost events.


