
## Client System Properties

There are some advanced client configuration properties to tune some aspects of Hazelcast Client. You can set them as property name and value pairs through declarative configuration, programmatic configuration, or JVM system property. Please see the [System Properties section](#system-properties) to learn how to set these properties.

The table below lists the client configuration properties with their descriptions.

Property Name | Default Value | Type | Description
:--------------|:---------------|:------|:------------
`hazelcast.client.event.queue.capacity`|1000000|string|Default value of the capacity of executor that handles incoming event packets.
`hazelcast.client.event.thread.count`|5|string|Thread count for handling incoming event packets.
`hazelcast.client.heartbeat.interval`|10000|string|Frequency of heartbeat messages sent by the clients to members.
`hazelcast.client.heartbeat.timeout`|60000|string|Timeout for the heartbeat messages sent by the client to members. If no messages pass between client and member within the given time via this property in milliseconds, the connection will be closed.
`hazelcast.client.max.concurrent.invocations`|Integer.MAX_VALUE|string|Maximum allowed number of concurrent invocations. You can apply a constraint on the number of concurrent invocations in order to prevent the system from overloading. If the maximum number of concurrent invocations is exceeded and a new invocation comes in, Hazelcast throws `HazelcastOverloadException`.
`hazelcast.client.invocation.timeout.seconds`|120|string|Time to give up the invocation when a member in the member list is not reachable.
`hazelcast.client.shuffle.member.list`|true|string|The client shuffles the given member list to prevent all clients to connect to the same member when this property is `false`. When it is set to `true`, the client tries to connect to the members in the given order.
`hazelcast.compatibility.3.6.server`|false|bool|When this property is true, if the client can not know the server version it will assume that the server is version 3.6.x.

## Sample Codes for Client

Please refer to <a href="https://github.com/hazelcast/hazelcast-code-samples/tree/master/clients" target="_blank">Client Code Samples</a>.


