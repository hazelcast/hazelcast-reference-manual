
### Listening for Clients

The Client Listener is used by the Hazelcast cluster members. It notifies the cluster members when a client is connected to or disconnected from the cluster.

To write a Client Listener class, you implement the ClientListener interface and its methods `clientConnected` and `clientDisconnected`,
which are invoked when a client is connected to or disconnected from the cluster.


![image](images/NoteSmall.jpg) ***NOTE:*** *You can also add event listeners to a Hazelcast client. Please refer to [Client Listenerconfig](#configuring-client-listeners) for the related information.*

