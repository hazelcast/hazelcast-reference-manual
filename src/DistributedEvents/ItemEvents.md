
### Listening for Item Events

The Item Listener is used by the Hazelcast `IQueue`, `ISet` and `IList` interfaces.

To write an Item Listener class, you implement the ItemListener interface and its methods `itemAdded` and `itemRemoved`. These methods
are invoked when an item is added or removed.

The following is an example Item Listener class.


```java
public class SampleItemListener implements ItemListener {

  public static void main( String[] args ) { 
    SampleItemListener sampleItemListener = new SampleItemListener();
    HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
    ICollection<Price> set = hazelcastInstance.getSet( "default" );
    set.addItemListener( sampleItemListener, true ); 

    Price price = new Price( 10, time1 )
    set.add( price );
    set.remove( price );
  } 

  public void itemAdded( Object item ) {
    System.out.println( "Item added = " + item );
  }

  public void itemRemoved( Object item ) {
    System.out.println( "Item removed = " + item );
  }     
}
```

<br></br>
![image](images/NoteSmall.jpg) ***NOTE:*** *You can use `ICollection` when creating any of the collection (queue, set and list) data structures, as shown above. You can also use `IQueue`, `ISet` or `IList` instead of `ICollection`.*
<br></br>


#### Adding Item Listeners

After you create your class, you can configure your cluster to include item listeners. Below is an example using the method `addItemListener` for `ISet` (it applies also to `IQueue` and `IList`). You can also see this portion in the above class creation.

```java
HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();

ICollection<Price> set = hazelcastInstance.getSet( "default" );
// or ISet<Prices> set = hazelcastInstance.getSet( "default" );
default.addItemListener( sampleItemListener, true );
```

With the above approach, there is a possibility of missing events between the creation of the instance and registering the listener. To overcome this race condition, Hazelcast allows you to register listeners in configuration. You can register listeners using declarative, programmatic, or Spring configuration, as shown below.

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

And, the following is an example of the equivalent Spring configuration.

```
<hz:set name="default" >
  <hz:item-listeners>
    <hz:item-listener include-value="true"
      class-name="com.your-package.SampleItemListener"/>
  </hz:item-listeners>
</hz:set>
```

#### Item Listener Attributes

As you see, there is an attribute in the above examples: `include-value`. It is a boolean attribute which is optional to use and if you set it to `true`, the item event will contain the item value. Its default value is `true`.

There is also another attribute called `local`, which is not shown in the above examples. It is also a boolean attribute which is optional to use and if you set it to `true`, you can listen to the items on the local member. Its default value is `false`.