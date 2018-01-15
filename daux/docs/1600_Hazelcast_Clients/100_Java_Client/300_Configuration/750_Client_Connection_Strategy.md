You can configure the client's starting mode as async or sync using the configuration element `async-start`. When it is set to `true` (async), Hazelcast will create the client without waiting a connection to the cluster. In this case, the client instance throws an exception until it connects to the cluster. If it is `false`, the client will not be created until the cluster is ready to use clients and a connection with the cluster is established. Its default value is `false` (sync).

You can also configure how the client will reconnect to the cluster after a disconnection. This is configured using the configuration element `reconnect-mode`; it has three options (`OFF`, `ON` or `ASYNC`). The option `OFF` disables the reconnection. `ON` enables reconnection in a blocking manner where all the waiting invocations will be blocked until a cluster connection is established or failed.
The option `ASYNC` enables reconnection in a non-blocking manner where all the waiting invocations will receive a `HazelcastClientOfflineException`. Its default value is `ON`.

The example declarative and programmatic configurations below show how to configure a Java client's starting and reconnecting modes.


**Declarative**:

```xml
<hazelcast-client>
  ...
  <connection-strategy async-start="true" reconnect-mode="ASYNC" />
  ...
</hazelcast-client>
```

**Programmatic**:

```java
ClientConfig clientConfig = new ClientConfig();
clientConfig.getConnectionStrategyConfig()
            .setAsyncStart(true)
            .setReconnectMode(ClientConnectionStrategyConfig.ReconnectMode.ASYNC);
```