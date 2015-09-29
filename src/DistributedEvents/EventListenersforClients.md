

## Event Listeners for Hazelcast Clients

You can add event listeners to a Hazelcast Java client. You can configure the following listeners to listen to the events on the client side. Please see the respective sections under the [Event Listeners for Hazelcast Members section](#event-listeners-for-hazelcast-members) for example code.

- [Lifecycle Listener](#listening-for-lifecycle-events): Notifies when the client is starting, started, shutting down, and shutdown.
- [Membership Listener](#listening-for-member-events): Notifies when a member joins to/leaves the cluster to which the client is connected, or when an attribute is changed in a member.
- [DistributedObject Listener](#listening-for-distributed-object-events): Notifies when a distributed object is created or destroyed throughout the cluster to which the client is connected.

<br></br>
***RELATED INFORMATION***

*Please refer to the [Client Listenerconfig section](#client-listener-configuration) for more information.*
<br></br>

<br></br>
***RELATED INFORMATION***

*Please refer to the [Listener Configurations section](#listener-configurations) for a configuration wrap-up of event listeners.*
<br></br>


