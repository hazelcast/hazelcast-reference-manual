
### Listening for Clients

The Client Listener is used by the Hazelcast cluster members. It notifies the cluster members when a client is connected to or disconnected from the cluster.

To write a Client Listener class, you implement the ClientListener interface and its methods `clientConnected` and `clientDisconnected`,
which are invoked when a client is connected to or disconnected from the cluster.

Then, you can register your listener using one of the following configurations on the member side. Below is an example programmatic configuration for the member, to listen to the topic events on the client.

```java
topicConfig.addMessageListenerConfig(
   new ListenerConfig( "com.your-package.SampleClientListener" ) );
```

The following is the equivalent declarative configuration.

```xml
<listeners>
   <listener>
      com.your-package.SampleClientListener
   </listener>
</listeners>
```

And, the following is the equivalent configuration in the Spring context.

```xml
<hz:listeners>
   <hz:listener class-name="com.your-package.SampleClientListener"/>
   <hz:listener implementation="com.your-package.SampleClientListener"/>
</hz:listeners>
```



<br></br>
![image](images/NoteSmall.jpg) ***NOTE:*** *You can also add event listeners to a Hazelcast client. Please refer to [Client Listenerconfig](#configuring-client-listeners) for the related information.*

