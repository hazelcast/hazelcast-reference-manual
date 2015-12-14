
### Listening for Topic Messages

The Message Listener is used by the `ITopic` interface. It notifies when a message is received for the registered topic.

To write a Message Listener class, you implement the MessageListener interface and its method `onMessage`, which is invoked
when a message is received for the registered topic.

The following is an example Message Listener class.


```java
public class SampleMessageListener implements MessageListener<MyEvent> {

  public static void main( String[] args ) {
    SampleMessageListener sample = new SampleMessageListener();
    HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
    ITopic topic = hazelcastInstance.getTopic( "default" );
    topic.addMessageListener( sample );
    topic.publish( new MyEvent() );
  }

  public void onMessage( Message<MyEvent> message ) {
    MyEvent myEvent = message.getMessageObject();
    System.out.println( "Message received = " + myEvent.toString() );
    if ( myEvent.isHeavyweight() ) {
      messageExecutor.execute( new Runnable() {
          public void run() {
            doHeavyweightStuff( myEvent );
          }
      } );
    }
  }
```

#### Adding Message Listeners

After you create your class, you can configure your cluster to include message listeners. Below is an example using the method `addMessageListener`. You can also see this portion in the above class creation.

```java
HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();

ITopic topic = hazelcastInstance.getTopic( "default" );
topic.addMessageListener( sample );
```

With the above approach, there is a possibility of missing messaging events between the creation of the instance and registering the listener. To overcome this race condition, Hazelcast allows you to register this listener in configuration. You can register it using declarative, programmatic, or Spring configuration, as shown below.

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

And, the following is an example of the equivalent Spring configuration.

```
<hz:topic name="default">
  <hz:message-listeners>
    <hz:message-listener 
       class-name="com.your-package.SampleMessageListener"/>
  </hz:message-listeners>
</hz:topic>
```

