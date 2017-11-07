
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

