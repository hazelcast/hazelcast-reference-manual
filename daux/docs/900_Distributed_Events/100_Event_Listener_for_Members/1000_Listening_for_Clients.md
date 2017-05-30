
The Client Listener is used by the Hazelcast cluster members. It notifies the cluster members when a client is connected to or disconnected from the cluster.

To write a client listener class, you implement the `ClientListener` interface and its methods `clientConnected` and `clientDisconnected`,
which are invoked when a client is connected to or disconnected from the cluster. You can add your client listener as shown below.

```
hazelcast.getClientService().addClientListener(SampleClientListener);
```

The following is the equivalent declarative configuration.

```xml
<listeners>
   <listener>
      com.your-package.SampleClientListener
   </listener>
</listeners>
```

The following is the equivalent configuration in the Spring context.

```xml
<hz:listeners>
   <hz:listener class-name="com.your-package.SampleClientListener"/>
   <hz:listener implementation="com.your-package.SampleClientListener"/>
</hz:listeners>
```



<br></br>
![image](../../images/NoteSmall.jpg) ***NOTE:*** *You can also add event listeners to a Hazelcast client. Please refer to [Client Listenerconfig](/14_Hazelcast_Java_Client/02_Configuring_Java_Client/06_Configuring_Client_Listeners.md) for the related information.*

