

### Listening for Distributed Object Events

The Distributed Object Listener methods `distributedObjectCreated` and `distributedObjectDestroyed` are invoked when a distributed object is created and destroyed throughout the cluster. To write a Distributed Object Listener class, you implement the DistributedObjectListener interface and its methods.

The following is an example Distributed Object Listener class.


```java
public class SampleDistObjListener implements DistributedObjectListener {
  public static void main(String[] args) {
    SampleDistObjListener sample = new SampleDistObjListener();

    Config config = new Config();
    HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance(config);
    hazelcastInstance.addDistributedObjectListener(sample);

    Collection<DistributedObject> distributedObjects = hazelcastInstance.getDistributedObjects();
    for (DistributedObject distributedObject : distributedObjects) {
      System.out.println(distributedObject.getName() + "," + distributedObject.getId());
    }
  }

  @Override
  public void distributedObjectCreated(DistributedObjectEvent event) {
    DistributedObject instance = event.getDistributedObject();
    System.out.println("Created " + instance.getName() + "," + instance.getId());
  }

  @Override
  public void distributedObjectDestroyed(DistributedObjectEvent event) {
    DistributedObject instance = event.getDistributedObject();
    System.out.println("Destroyed " + instance.getName() + "," + instance.getId());
  }
}
```

When a respective event is fired, the distributed object listener outputs the event type, and the name, service (for example, if a Map service provides the distributed object, than it is a Map object), and ID of the object.

#### Registering Distributed Object Listeners


After you create your class, you can configure your cluster to include distributed object listeners. Below is an example using the method `addDistributedObjectListener`. You can also see this portion in the above class creation.

```java
HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
SampleDistObjListener sample = new SampleDistObjListener();

hazelcastInstance.addDistributedObjectListener( sample );
```

With the above approach, there is a possibility of missing events between the creation of the instance and registering the listener. To overcome this race condition, Hazelcast allows you to register the listeners in configuration. You can register listeners using declarative, programmatic, or Spring configuration, as shown below.

The following is an example programmatic configuration.

```java
config.addListenerConfig(
new ListenerConfig( "com.your-package.SampleDistObjListener" ) );
```


The following is an example of the equivalent declarative configuration. 

```xml
<hazelcast>
   ...
   <listeners>
	  <listener>
	  com.your-package.SampleDistObjListener
      </listener>
   </listeners>
   ...
</hazelcast>
```

And, the following is an example of the equivalent Spring configuration.

```
<hz:listeners>
   <hz:listener class-name="com.your-package.SampleDistObjListener"/>
   <hz:listener implementation="DistributedObjectListener"/>
</hz:listeners>
```





