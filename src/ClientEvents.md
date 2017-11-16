

## Event Listeners for Hazelcast Clients

You can add event listeners to a Hazelcast Java client. You can configure the following listeners to listen to the events on the client side. Please see the respective sections under the [Cluster Events section](#cluster-events) for example codes.

- [Lifecycle Listener](#listening-for-lifecycle-events): Notifies when the client is starting, started, shutting down, and shutdown.
- [Membership Listener](#listening-for-member-events): Notifies when a member joins to/leaves the cluster to which the client is connected, or when an attribute is changed in a member.
- [DistributedObject Listener](#listening-for-distributed-object-events): Notifies when a distributed object is created or destroyed throughout the cluster to which the client is connected.

<br></br>
***RELATED INFORMATION***

*Please refer to the [Configuring Client Listeners section](#configuring-client-listeners) for more information.*
<br></br>

