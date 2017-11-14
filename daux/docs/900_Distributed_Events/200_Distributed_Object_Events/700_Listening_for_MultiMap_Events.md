
You can listen to entry-based events in the MultiMap using `EntryListener`. The following is an example listener class for MultiMap.

```java
public class Listen {

  public static void main( String[] args ) {
    HazelcastInstance hz = Hazelcast.newHazelcastInstance();
    MultiMap<String, String> map = hz.getMultiMap( "somemap" );
    map.addEntryListener( new MyEntryListener(), true );
    System.out.println( "EntryListener registered" );
  }

  static class SampleEntryListener implements EntryListener<String, String>{
    @Override
    public void entryAdded( EntryEvent<String, String> event ) {
      System.out.println( "Entry Added:" + event );
    }

    @Override
    public void entryRemoved( EntryEvent<String, String> event ) {
      System.out.println( "Entry Removed:" + event );
    }
  }
}
```

#### Registering MultiMap Listeners

After you create your listener class, you can configure your cluster to include MultiMap listeners using the method `addEntryListener` (as you can see in the example `Listen` class above). Below is the related portion from this code, showing how to register a map listener.

```java
HazelcastInstance hz = Hazelcast.newHazelcastInstance();
MultiMap<String, String> map = hz.getMultiMap( "somemap" );
map.addEntryListener( new MyEntryListener(), true );
```

With the above approach, there is the possibility of missing events between the creation of the instance and registering the listener. To overcome this race condition, Hazelcast allows you to register listeners in the configuration. You can register listeners using declarative, programmatic, or Spring configuration, as shown below.

The following is an example programmatic configuration.

```java
multiMapConfig.addEntryListenerConfig(
  new EntryListenerConfig( "com.yourpackage.SampleEntryListener",
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
            com.yourpackage.SampleEntryListener
         </entry-listener>
      </entry-listeners>
   </multimap>
   ...
</hazelcast>
```

The following is an example of the equivalent Spring configuration.

```
<hz:multimap name="default" value-collection-type="LIST">
   <hz:entry-listeners>
      <hz:entry-listener include-value="false"
         class-name="com.yourpackage.SampleEntryListener"/>
      <hz:entry-listener implementation="EntryListener" local="false"/>
   </hz:entry-listeners>
</hz:multimap>
```

#### MultiMap Listener Attributes

As you see, there are attributes of the MultiMap listeners in the above examples: `include-value` and `local`. The attribute `include-value` is a boolean attribute that is optional, and if you set it to `true`, the MultiMap event will contain the map value. Its default value is `true`.

The attribute `local` is also a boolean attribute that is optional, and if you set it to `true`, you can listen to the MultiMap on the local member. Its default value is `false`.

