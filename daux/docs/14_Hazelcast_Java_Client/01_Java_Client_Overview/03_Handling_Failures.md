
There are two main failure cases you should be aware of, and configurations you can perform to achieve proper behavior.

#### Handling Client Connection Failure


While the client is trying to connect initially to one of the members in the `ClientNetworkConfig.addressList`, all the members might be not available. Instead of giving up, throwing an exception and stopping the client, the client will retry as many as `connectionAttemptLimit` times. 

You can configure `connectionAttemptLimit` for the number of times you want the client to retry connecting. Please see [Setting Connection Attempt Limit](../02_Configuring_Java_Client/00_Configuring_Client_Network.md).

The client executes each operation through the already established connection to the cluster. If this connection(s) disconnects or drops, the client will try to reconnect as configured.


#### Handling Retry-able Operation Failure

While sending the requests to related members, operations can fail due to various reasons. Read-only operations are retried by default. If you want to enable retry for the other operations, set the `redoOperation` to `true`. Please see [Enabling Redo Operation](../02_Configuring_Java_Client/00_Configuring_Client_Network.md).

You can set a timeout for retrying the operations sent to a member. This can be provided by using the property `hazelcast.client.invocation.timeout.seconds` in `ClientProperties`. The client will retry an operation within this given period, of course, if it is a read-only operation or you enabled the `redoOperation` as stated in the above paragraph. This timeout value is important when there is a failure resulted by either of the following causes: 

- Member throws an exception.
- Connection between the client and member is closed.
- Client's heartbeat requests are timed out.

Please see the [Client System Properties section](../05_Client_System_Properties.md).
