

## Event Listeners for Hazelcast Clients

You can add event listeners to a Hazelcast Java client. You can configure the following listeners to listen to the events on the client side. Please see the respective sections under the [Event Listeners for Hazelcast Members section](00_Event_Listener_for_Members) for example code.

- [Lifecycle Listener](/00_Event_Listener_for_Members/04_Listening_for_Lifecycle_Events.md): Notifies when the client is starting, started, shutting down, and shutdown.
- [Membership Listener](/00_Event_Listener_for_Members/00_Listening_for_Member_Events.md): Notifies when a member joins to/leaves the cluster to which the client is connected, or when an attribute is changed in a member.
- [DistributedObject Listener](/00_Event_Listener_for_Members/01_Listening_for_Distributed_Object_Events.md): Notifies when a distributed object is created or destroyed throughout the cluster to which the client is connected.

<br></br>
***RELATED INFORMATION***

*Please refer to the [Client Listenerconfig section](/14_Hazelcast_Java_Client/02_Configuring_Java_Client/06_Configuring_Client_Listeners.md) for more information.*
<br></br>

