

Hazelcast provides a distribution mechanism for publishing messages that are delivered to multiple subscribers. This is
also known as a publish/subscribe (pub/sub) messaging model. Publishing and subscribing operations are cluster wide.
When a member subscribes to a topic, it is actually registering for messages published by any member in the cluster,
including the new members that joined after you add the listener.

![image](../../images/NoteSmall.jpg) ***NOTE:*** *Publish operation is async. It does not wait for operations to run in
remote members; it works as fire and forget.*

### Getting a Topic and Publishing Messages

Use the HazelcastInstance `getTopic` method to get the Topic, then use the topic `publish` method to publish your messages (`messageObject`).

```java
import com.hazelcast.core.Topic;
import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.MessageListener;

public class Sample implements MessageListener<MyEvent> {

  public static void main( String[] args ) {
    Sample sample = new Sample();
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

  // ...

  private final Executor messageExecutor = Executors.newSingleThreadExecutor();
}
```

Hazelcast Topic uses the `MessageListener` interface to listen for events that occur when a message is received. Please refer to the [Listening for Topic Messages section](/07_Distributed_Events/200_Distributed_Object_Events/08_Listening_for_Topic_Messages.md) for information on how to create a message listener class and register it.


