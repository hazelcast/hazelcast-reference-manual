

### Configuring Topic

To configure a topic, set the topic name, decide on statistics and global ordering, and set message listeners.
Default values are:

- `global-ordering` is **false**, meaning that by default, there is no guarantee of global order.
- `statistics` is **true**, meaning that by default, statistics are calculated.

You can see the example configuration snippets below. 

**Declarative:**

```xml
<hazelcast>
  ...
  <topic name="yourTopicName">
    <global-ordering-enabled>true</global-ordering-enabled>
    <statistics-enabled>true</statistics-enabled>
    <message-listeners>
      <message-listener>MessageListenerImpl</message-listener>
    </message-listeners>
  </topic>
  ...
</hazelcast>
```

**Programmatic:**

```java
TopicConfig topicConfig = new TopicConfig();
topicConfig.setGlobalOrderingEnabled( true );
topicConfig.setStatisticsEnabled( true );
topicConfig.setName( "yourTopicName" );
MessageListener<String> implementation = new MessageListener<String>() {
  @Override
  public void onMessage( Message<String> message ) {
    // process the message
  }
};
topicConfig.addMessageListenerConfig( new ListenerConfig( implementation ) );
HazelcastInstance instance = Hazelcast.newHazelcastInstance()
```

Topic configuration has the following elements.

- `statistics-enabled`: Default is `true`, meaning statistics are calculated.
- `global-ordering-enabled`: Default is `false`, meaning there is no global order guarantee.
- `message-listeners`: Lets you add listeners (listener classes) for the topic messages.



Besides the above elements, there are the following system properties that are topic related but not topic specific:

   - `hazelcast.event.queue.capacity` with a default value of 1,000,000
   - `hazelcast.event.queue.timeout.millis` with a default value of 250
   - `hazelcast.event.thread.count` with a default value of 5

For a description of these parameters, please see the [Global Event Configuration section](#global-event-configuration).


