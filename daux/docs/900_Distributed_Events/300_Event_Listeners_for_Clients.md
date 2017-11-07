

You can add event listeners to a Hazelcast Java client. You can configure the following listeners to listen to the events on the client side. Please see the respective sections under the [Cluster and Distributed Object Events sections](/900_Distributed_Events) for example codes.

- [Lifecycle Listener](/00_Cluster_Events/04_Listening_for_Lifecycle_Events.md): Notifies when the client is starting, started, shutting down, and shutdown.
- [Membership Listener](/00_Cluster_Events/00_Listening_for_Member_Events.md): Notifies when a member joins to/leaves the cluster to which the client is connected, or when an attribute is changed in a member.
- [DistributedObject Listener](/00_Cluster_Events/01_Listening_for_Distributed_Object_Events.md): Notifies when a distributed object is created or destroyed throughout the cluster to which the client is connected.

<br></br>
***RELATED INFORMATION***

*Please refer to the [Client Listenerconfig section](/1600_Hazelcast_Clients/100_Java_Client/300_Configuration/700_Listeners.md) for more information.*
<br></br>

