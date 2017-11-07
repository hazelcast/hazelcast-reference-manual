## Distributed Object Events


### Listening for Map Events

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
![image](images/NoteSmall.jpg) ***NOTE:*** * The `EntryListener` interface still can be implemented (we kept
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
Entry Added:EntryEvent{entryEventType=ADDED, member=Member [192.168.1.100]]:5702
 - ffedb655-bbad-43ea-aee8-d429d37ce528, name='somemap', key=11455268066242,
 oldValue=null, value=1, mergingValue=null}

Entry Updated:EntryEvent{entryEventType=UPDATED, member=Member [192.168.1.100]]:5702
 - ffedb655-bbad-43ea-aee8-d429d37ce528, name='somemap', key=11455268066242,
 oldValue=1, value=2, mergingValue=null}

Entry Removed:EntryEvent{entryEventType=REMOVED, member=Member [192.168.1.100]]:5702
 - ffedb655-bbad-43ea-aee8-d429d37ce528, name='somemap', key=11455268066242,
 oldValue=null, value=null, mergingValue=null}
```

<br></br>
![image](images/NoteSmall.jpg) ***NOTE:*** *Please note that the method `IMap.clear()` does not fire an "EntryRemoved" event, but fires a "MapCleared" event.*
<br></br>


#### Partitions and Entry Listeners

A map listener runs on the event threads that are also used by the other listeners. For 
example, the collection listeners and pub/sub message listeners. This means that the entry 
listeners can access other partitions. Consider this when you run long tasks, since listening 
to those tasks may cause the other map/event listeners to starve.

```java
public class MyEntryListener implements EntryListener{

    private Executor executor = Executors.newFixedThreadPool(5);

    @Override
    public void entryAdded(EntryEvent event) {
        executor.execute(new DoSomethingWithEvent(event));
    }
...
```

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

    IMap<Object, Object> map = instance.getMap("map");
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

Please refer to [Listening for Partition Lost Events](#listening-for-partition-lost-events) for more 
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
		 com.your-package.MyEntryListener
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


### Listening for MultiMap Events

You can listen to entry-based events in the MultiMap using `EntryListener`. The following is an example entry listener implementation for MultiMap.

```java
public class SampleEntryListener implements EntryListener<String, String> {
  @Override
  public void entryAdded(EntryEvent<String, String> event) {
    System.out.println("Entry Added: " + event);
  }

  @Override
  public void entryRemoved( EntryEvent<String, String> event ) {
    System.out.println( "Entry Removed: " + event );
  }

  @Override
  public void entryUpdated(EntryEvent<String, String> event) {
    System.out.println( "Entry Updated: " + event );
  }

  @Override
  public void entryEvicted(EntryEvent<String, String> event) {
    System.out.println( "Entry evicted: " + event );
  }

  @Override
  public void mapCleared(MapEvent event) {
    System.out.println( "Map Cleared: " + event );
  }

  @Override
  public void mapEvicted(MapEvent event) {
    System.out.println( "Map Evicted: " + event );
  }
}
```

#### Registering MultiMap Listeners

After you create your listener class, you can configure your cluster to include MultiMap listeners using the method `addEntryListener`. Below is the related portion from a code, showing how to register a map listener.

```java
HazelcastInstance hz = Hazelcast.newHazelcastInstance();
MultiMap<String, String> map = hz.getMultiMap( "somemap" );
map.addEntryListener( new SampleEntryListener(), true );
```

With the above approach, there is the possibility of missing events between the creation of the instance and registering the listener. To overcome this race condition, Hazelcast allows you to register listeners in the configuration. You can register listeners using declarative, programmatic, or Spring configuration, as shown below.

The following is an example programmatic configuration.

```java
multiMapConfig.addEntryListenerConfig(
new EntryListenerConfig( "com.your-package.SampleEntryListener",
		                             false, false ) );
```


The following is an example of the equivalent declarative configuration. 

```xml
<hazelcast>
   ...
   <multimap name="somemap">
      <value-collection-type>SET</value-collection-type>
      <entry-listeners>
         <entry-listener include-value="false" local="false">
            com.your-package.SampleEntryListener
         </entry-listener>
      </entry-listeners>
   </multimap>
   ...
</hazelcast>
```

The following is an example of the equivalent Spring configuration.

```
<hz:multimap name="somemap" value-collection-type="SET">
   <hz:entry-listeners>
      <hz:entry-listener include-value="false"
         class-name="com.your-package.SampleEntryListener"/>
      <hz:entry-listener implementation="EntryListener" local="false"/>
   </hz:entry-listeners>
</hz:multimap>
```

#### MultiMap Listener Attributes

As you see, there are attributes of the MultiMap listeners in the above examples: `include-value` and `local`. The attribute `include-value` is a boolean attribute that is optional, and if you set it to `true`, the MultiMap event will contain the map value. Its default value is `true`.

The attribute `local` is also a boolean attribute that is optional, and if you set it to `true`, you can listen to the MultiMap on the local member. Its default value is `false`.


### Listening for Item Events

The Item Listener is used by the Hazelcast `IQueue`, `ISet` and `IList` interfaces.

To write an Item Listener class, you implement the ItemListener interface and its methods `itemAdded` and `itemRemoved`. These methods
are invoked when an item is added or removed.

The following is an example Item Listener class for an `ISet` structure.


```java
public class SampleItemListener implements ItemListener<Price> {

  @Override
  public void itemAdded(ItemEvent<Price> event) {
    System.out.println( "Item added:  " + event );
  }

  @Override
  public void itemRemoved(ItemEvent<Price> event) {
    System.out.println( "Item removed: " + event );
  }

}
```

<br></br>
![image](images/NoteSmall.jpg) ***NOTE:*** *You can use `ICollection` when creating any of the collection (queue, set and list) data structures, as shown above. You can also use `IQueue`, `ISet` or `IList` instead of `ICollection`.*
<br></br>


#### Registering Item Listeners

After you create your class, you can configure your cluster to include item listeners. Below is an example using the method `addItemListener` for `ISet` (it applies also to `IQueue` and `IList`). You can also see this portion in the above class creation.

```java
HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();

ICollection<Price> set = hazelcastInstance.getSet( "default" );
// or ISet<Prices> set = hazelcastInstance.getSet( "default" );
set.addItemListener( new SampleItemListener(), true );
```

With the above approach, there is the possibility of missing events between the creation of the instance and registering the listener. To overcome this race condition, Hazelcast allows you to register listeners in the configuration. You can register listeners using declarative, programmatic, or Spring configuration, as shown below.

The following is an example programmatic configuration.

```java
setConfig.addItemListenerConfig(
new ItemListenerConfig( "com.your-package.SampleItemListener", true ) );
```


The following is an example of the equivalent declarative configuration. 

```xml
<hazelcast>
   ...
   <item-listeners>
     <item-listener include-value="true">
       com.your-package.SampleItemListener
     </item-listener>
   </item-listeners>
   ...
</hazelcast>
```

The following is an example of the equivalent Spring configuration.

```
<hz:set name="default" >
  <hz:item-listeners>
    <hz:item-listener include-value="true"
      class-name="com.your-package.SampleItemListener"/>
  </hz:item-listeners>
</hz:set>
```

#### Item Listener Attributes

As you see, there is an attribute in the above examples: `include-value`. It is a boolean attribute that is optional, and if you set it to `true`, the item event will contain the item value. Its default value is `true`.

There is also another attribute called `local`, which is not shown in the above examples. It is also a boolean attribute that is optional, and if you set it to `true`, you can listen to the items on the local member. Its default value is `false`.


### Listening for Topic Messages

The Message Listener is used by the `ITopic` interface. It notifies when a message is received for the registered topic.

To write a Message Listener class, you implement the MessageListener interface and its method `onMessage`, which is invoked
when a message is received for the registered topic.

The following is an example Message Listener class.


```java
public class SampleMessageListener implements MessageListener<MyEvent> {

  public void onMessage( Message<MyEvent> message ) {
    MyEvent myEvent = message.getMessageObject();
    System.out.println( "Message received = " + myEvent.toString() );
  }
}
```

#### Registering Message Listeners

After you create your class, you can configure your cluster to include message listeners. Below is an example using the method `addMessageListener`.

```java
HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();

ITopic topic = hazelcastInstance.getTopic( "default" );
topic.addMessageListener( new SampleMessageListener() );
```

With the above approach, there is the possibility of missing messaging events between the creation of the instance and registering the listener. To overcome this race condition, Hazelcast allows you to register this listener in the configuration. You can register it using declarative, programmatic, or Spring configuration, as shown below.

The following is an example programmatic configuration.

```java
topicConfig.addMessageListenerConfig(
new ListenerConfig( "com.your-package.SampleMessageListener" ) );
```


The following is an example of the equivalent declarative configuration. 

```xml
<hazelcast>
   ...
   <topic name="default">
      <message-listeners>
         <message-listener>
         com.your-package.SampleMessageListener
         </message-listener>
      </message-listeners>
   </topic>   
   ...
</hazelcast>
```

The following is an example of the equivalent Spring configuration.

```
<hz:topic name="default">
  <hz:message-listeners>
    <hz:message-listener 
       class-name="com.your-package.SampleMessageListener"/>
  </hz:message-listeners>
</hz:topic>
```

