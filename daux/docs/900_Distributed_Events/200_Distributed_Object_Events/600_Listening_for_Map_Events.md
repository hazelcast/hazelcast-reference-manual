
You can listen to map-wide or entry-based events using the listeners provided by the Hazelcast's eventing framework. To listen to these events, implement a `MapListener` sub-interface.

A map-wide event is fired as a result of a map-wide operation. For 
example, `IMap#clear` or `IMap#evictAll`.
An entry-based event is fired after the operations that affect a 
specific entry. For example, `IMap#remove` or `IMap#evict`.

#### Catching a Map Event

To catch an event, you should explicitly 
implement a corresponding sub-interface of a `MapListener`, 
such as `EntryAddedListener` or `MapClearedListener`. 

<br></br>
![image](../../images/NoteSmall.jpg) ***NOTE:*** *The `EntryListener` interface still can be implemented (we kept
it for backward compatibility reasons). However, if you need to listen to a 
different event, one that is not available in the `EntryListener` interface, you should also 
implement a relevant `MapListener` sub-interface.*
<br></br>

Let's take a look at the following class example.



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
```

<br></br>
![image](../../images/NoteSmall.jpg) ***NOTE:*** *Please note that the method `IMap.clear()` does not fire an "EntryRemoved" event, but fires a "MapCleared" event.*
<br></br>



![image](../../images/NoteSmall.jpg) ***NOTE:*** *Listeners have to offload all blocking operations to another thread (pool).*


#### Listening for Lost Map Partitions

You can listen to `MapPartitionLostEvent` instances by registering an implementation 
of `MapPartitionLostListener`, which is also a sub-interface of `MapListener`.

Let`s consider the following example code:

```java
  public static void main(String[] args) {
    Config config = new Config();
    // keeps its data if a single node crashes
    config.getMapConfig("map").setBackupCount(1);

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
that is configured with one backup. For this particular map and any of the partitions in the 
system, if the partition owner member and its first backup member crash simultaneously, the 
given `MapPartitionLostListener` receives a 
corresponding `MapPartitionLostEvent`. If only a single member crashes in the cluster, 
there will be no `MapPartitionLostEvent` fired for this map since backups for the partitions 
owned by the crashed member are kept on other members. 

Please refer to [Listening for Partition Lost Events](/900_Distributed_Events/100_Cluster_Events/03_Listening_for_Partition_Lost_Events.md) for more 
information about partition lost detection and partition lost events.



#### Registering Map Listeners

After you create your listener class, you can configure your cluster to include map listeners using the method `addEntryListener` (as you can see in the example `Listen` class above). Below is the related portion from this code, showing how to register a map listener.

```java
HazelcastInstance hz = Hazelcast.newHazelcastInstance();
IMap<String, String> map = hz.getMap( "somemap" );
map.addEntryListener( new MyEntryListener(), true );
```

With the above approach, there is the possibility of missing events between the creation of the instance and registering the listener. To overcome this race condition, Hazelcast allows you to register listeners in configuration. You can register listeners using declarative, programmatic, or Spring configuration, as shown below.

The following is an example programmatic configuration.

```java
mapConfig.addEntryListenerConfig(
new EntryListenerConfig( "com.yourpackage.MyEntryListener", 
							false, false ) );
```


The following is an example of the equivalent declarative configuration. 

```xml
<hazelcast>
   ...
   <map name="somemap">
   ...
      <entry-listeners>
	     <entry-listener include-value="false" local="false">
		    com.yourpackage.MyEntryListener
		 </entry-listener>
	  </entry-listeners>
   </map>
   ...
</hazelcast>
```

The following is an example of the equivalent Spring configuration.

```
<hz:map name="somemap">
   <hz:entry-listeners>
      <hz:entry-listener include-value="true"
         class-name="com.hazelcast.spring.DummyEntryListener"/>
      <hz:entry-listener implementation="dummyEntryListener" local="true"/>
   </hz:entry-listeners>
</hz:map>
```

#### Map Listener Attributes

As you see, there are attributes of the map listeners in the above examples: `include-value` and `local`. The attribute `include-value` is a boolean attribute that is optional, and if you set it to `true`, the map event will contain the map value. Its default value is `true`.

The attribute `local` is also a boolean attribute that is optional, and if you set it to `true`, you can listen to the map on the local member. Its default value is `false`.
