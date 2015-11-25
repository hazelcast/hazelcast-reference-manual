
### Fixes

The following are the issues solved for Hazelcast 3.6 release.

**3.6-EA2 Fixes**


- MapLoader may insert null values into IMap causing memory leak. <a href="https://github.com/hazelcast/hazelcast/issues/6830" target="_blank">[6830]</a>
- When replicated map entries are migrated to a new destination; TTL eviction should be scheduled, eviction should be retried when a failure caused by the migration happens and the sync interval should be increased. <a href="https://github.com/hazelcast/hazelcast/issues/6799" target="_blank">[6799]</a>
- There is a logical error in the method `Ringbuffer.readManyAsync()` when `minSize = 0`. In this case, the Ringbuffer is not read and nothing is returned. <a href="https://github.com/hazelcast/hazelcast/issues/6787" target="_blank">[6787]</a>
- When a listener's registration is made from the listener configuration, an error occurs during the listener initialization. <a href="https://github.com/hazelcast/hazelcast/issues/6784" target="_blank">[6784]</a>
- Remaining cache invalidation messages should be flushed on the `ICacheService` while the member is in the  `SHUTTING_DOWN` state. <a href="https://github.com/hazelcast/hazelcast/issues/6778" target="_blank">[6778]</a>
- When a client cannot send a request to one of the connections, `TargetNotMemberException` is thrown. This name is confusing the Hazelcast users. <a href="https://github.com/hazelcast/hazelcast/issues/6766" target="_blank">[6766]</a>
- `ClassCastException` is thrown when using `Timestamp` within `DataSerializable`. <a href="https://github.com/hazelcast/hazelcast/issues/6759" target="_blank">[6759]</a>
- The method `destroyDistributedObject()` of `ReplicatedMapService` iterates over partition containers and record stores and destroys them. While destroying, record store calls `destroyDistributedObject()` which leads to an infinite loop. <a href="https://github.com/hazelcast/hazelcast/issues/6754" target="_blank">[6754]</a>
- Hazelcast does not inject its instance into `HazelcastInstanceAware` registered via classname. <a href="https://github.com/hazelcast/hazelcast/pull/6697" target="_blank">[6697]</a>
- There is a sporadic startup failure in 3.6-EA. <a href="https://github.com/hazelcast/hazelcast/pull/6684" target="_blank">[6684]</a>
- There is no need to use `CacheLoader` inside the client/server side cache proxies. <a href="https://github.com/hazelcast/hazelcast/issues/6676" target="_blank">[6676]</a>
- Fixed wrong calculation of eviction removal size when `PER_NODE` `max-size` policy is used. <a href="https://github.com/hazelcast/hazelcast/pull/6675" target="_blank">[6675]</a>
- If the cluster state is not active `RepartitioningTask` should not be triggered. Otherwise, it causes infinite retries and prevents the member from shtutdown. <a href="https://github.com/hazelcast/hazelcast/pull/6663" target="_blank">[6663]</a>
- There are broken XML configuration tests in the Hazelcast client package. <a href="https://github.com/hazelcast/hazelcast/issues/6633" target="_blank">[6633]</a>
- There is a memory leak since the method `publishBathcedEvents` does not remove the events from `batchEvent`. <a href="https://github.com/hazelcast/hazelcast/issues/6618" target="_blank">[6618]</a>
- Custom credentials class is not de-serialized on the server side. <a href="https://github.com/hazelcast/hazelcast/issues/6615" target="_blank">[6615]</a>
- Lite member element should be added to the Hazelcast Spring configuration. <a href="https://github.com/hazelcast/hazelcast/issues/6605" target="_blank">[6605]</a>
- `EntryListener` shows the unprocessed value in combination with `PostProcessingMapStore`. <a href="https://github.com/hazelcast/hazelcast/issues/6588" target="_blank">[6588]</a>
- Clients cannot submit `HazelcastInstanceAware` callables. <a href="https://github.com/hazelcast/hazelcast/issues/6570" target="_blank">[6570]</a>


**3.6-EA1 Fixes**


- The method `map.size()` waits indefinitely after the shutdown of a node. <a href="https://github.com/hazelcast/hazelcast/issues/6538" target="_blank">[6538]</a>
- `HazelcastCachingProvider` does not use the specified instance (by the object) when `instance-name` is not specified. <a href="https://github.com/hazelcast/hazelcast/issues/6454" target="_blank">[6454]</a>
- `onExecutionFailure` should be called before returning from `run`, if backup is not valid. <a href="https://github.com/hazelcast/hazelcast/issues/6420" target="_blank">[6420]</a>
- `OperationThread.priorityPendingCount()` should return `scheduleQueue.prioritySize()` instead of `scheduleQueue.normalSize()`. <a href="https://github.com/hazelcast/hazelcast/issues/6318" target="_blank">[6318]</a>
- There is a growth in heap usage caused by a memory leak in the following scenario: A node in the cluster regularly creates maps and puts entries into it, again in regular intervals. Another node removes the entries minutes after they were put, and if the map is empty, it destroys the map. <a href="https://github.com/hazelcast/hazelcast/issues/6317" target="_blank">[6317]</a>
- Currently, there is an `EntryEvictedListener` that is notified both for expiration and eviction events. There should be a separate listener for expired entries: eviction happens due to size constraints, and expiry is once the entry has expired. <a href="https://github.com/hazelcast/hazelcast/issues/6311" target="_blank">[6311]</a>
- `InvocationFuture`s async calls do not detect the lost operations. <a href="https://github.com/hazelcast/hazelcast/issues/6250" target="_blank">[6250]</a>
-  When the method `setBooleanAttribute` of the class `Member` is run, Null Pointer Exception is occurred on `STDOUT`. The problem is in the method `sendMemberAttributeEvent` of the class `ClusterServiceImpl`. <a href="https://github.com/hazelcast/hazelcast/issues/6223" target="_blank">[6223]</a>
- `IOBalancer` keeps references of all the socket reader/writers but when destroying the connection, they release the references for only the ones which has endpoints. This causes a memory leak. <a href="https://github.com/hazelcast/hazelcast/issues/6199" target="_blank">[6199]</a>
- `ILIKE` and `Regex` examples should be added to the Reference Manual under the "Supported SQL Syntax" section. <a href="https://github.com/hazelcast/hazelcast/issues/6190" target="_blank">[6190]</a>
- `GroupProperty` defaulting does not work properly when programmatic configuration is used. <a href="https://github.com/hazelcast/hazelcast/issues/6174" target="_blank">[6174]</a>
- When integrating Hazelcast in Spring Boot: if `HazelcastInstance` is created using the default `newHazelcastInstance` static method, then an `HazelcastInstance` whose `Config` has a valid `configurationUrl` property is created. However, `XmlBuilder` does not set this URL in the configuration it parses. <a href="https://github.com/hazelcast/hazelcast/issues/6061" target="_blank">[6061]</a>
- Hazelcast's latest snapshot run fails due to the introduction of `ClientExceptionFactory` which has been developed for exception processing and working well in that sense. <a href="https://github.com/hazelcast/hazelcast/issues/6010" target="_blank">[6010]</a>
- The class `HazelcastXATest` has only fast and slow modes (nothing in between) and possibly due to this, sometimes a transaction is waiting for a timeout. Either the transaction recovery or the test class itself is racy. <a href="https://github.com/hazelcast/hazelcast/issues/5923" target="_blank">[5923]</a>
- A memory leak occurs when a listener is added and removed from client. A "remove" runnable in the collection that is stored in `ClientEndpointImpl` is the leftover. This runnable collection is used to cleanup the
listeners when client is disconnected, it should be removed too after the listener is removed. <a href="https://github.com/hazelcast/hazelcast/issues/5893" target="_blank">[5893]</a> 
- The class `CacheRemoveAllOperation` does not send the "completed" event in some cases, e.g. if `CacheRecordStore` for that partition is not created yet or if the filtered keys are empty. <a href="https://github.com/hazelcast/hazelcast/issues/5865" target="_blank">[5865]</a>
- In the class `MapProxyImpl`, the methods `executeOnKey` and `submitToKey` create an `EntryOperation` with the thread ID set. This does not happen with the class `ClientMapProxy`. Therefore, the class `MapExecuteOnKeyRequest` should take a thread ID and set this on the generated `EntryOperation`. <a href="https://github.com/hazelcast/hazelcast/issues/5857" target="_blank">[5857]</a>
- The method `IndexImpl.getRecords()` fails with Null Pointer Exception due to the inconsistency between the `not(...equals())` and `notEquals()`. <a href="https://github.com/hazelcast/hazelcast/issues/5807" target="_blank">[5807]</a>
- The method `HazelcastHttpSession.getAttribute()` for WebFilter does not work when `deferredWrite` is set to `true`. <a href="https://github.com/hazelcast/hazelcast/issues/5798" target="_blank">[5798]</a>
- When `hazelcast.nio.faststring` is enabled, `UTFEncoderDecoder` tries to create a `FastStringCreator`. However, if the reflection is not available due to the security manager, `buildFastStringCreator` returns null and consequently `StringCreator` becomes null. <a href="https://github.com/hazelcast/hazelcast/issues/5777" target="_blank">[5777]</a>
- `hazelcast-jca-rar/pom.xml` references to `src/main/rar/ra.xml` which does not exist. <a href="https://github.com/hazelcast/hazelcast/issues/5760" target="_blank">[5760]</a>
- The Maven profile `mvn clean compile -Pqa` does not exist but it is documented in the README of Hazelcast. <a href="https://github.com/hazelcast/hazelcast/issues/5746" target="_blank">[5746]</a>
- `PerformanceLogFile` only compiles if JDK 1.7 or above is used. <a href="https://github.com/hazelcast/hazelcast/issues/5729" target="_blank">[5729]</a>
- Currently, for every deserialization a `BufferObjectDataInput` is created. This generates waste since it is created with an array of data for every deserialization. The `BufferObjectDataOutput` is already cached; the input should use a similar approach. <a href="https://github.com/hazelcast/hazelcast/issues/5562" target="_blank">[5562]</a>
- When any entities are defined as read only in the Hibernate L2 cache, an invalidation of the cache (such as caused by executing a native SQLQuery) leads to the error `UnsupportedOperationException`. <a href="https://github.com/hazelcast/hazelcast/issues/5562" target="_blank">[5562]</a>
- The performance impacts of TWO_PHASE and LOCAL transaction types should be documented. <a href="https://github.com/hazelcast/hazelcast/issues/5075" target="_blank">[5075]</a>
- Client requests are very inefficient when determining the partition ID. <a href="https://github.com/hazelcast/hazelcast/issues/4940" target="_blank">[4940]</a>
- The method `keySet()` relies on `QueryOperation`. The `QueryOperation` does not accept `IterationType` - it always returns both keys and values. This can lead to unnecessary load and potentially even an OOM exception. <a href="https://github.com/hazelcast/hazelcast/issues/4642" target="_blank">[4642]</a>
- Hazelcast is stuck in TIMED_WAITING when used as 2nd level cache for Hibernate. <a href="https://github.com/hazelcast/hazelcast/issues/4406" target="_blank">[4406]</a>
- Management Center license loading problem when REST API is used. <a href="https://github.com/hazelcast/management-center/issues/189" target="_blank">[189]</a>
- Executor monitoring in Management Center does not show the "cancelled" operations" <a href="https://github.com/hazelcast/management-center/issues/177" target="_blank">[177]</a>
- When an alert for a data structure (map, queue, etc.) with its specific name is created, a `NullPointerException` is thrown after the cluster is reset. <a href="https://github.com/hazelcast/management-center/issues/175" target="_blank">[175]</a>
- Default directory name is hardcoded as "mancenter3.5" and it needs to be maintained for every major release. This process should be dynamic. <a href="https://github.com/hazelcast/management-center/issues/174" target="_blank">[174]</a>
- Throughput statistics for Map shows nothing when the `putAll()` method is used. <a href="https://github.com/hazelcast/management-center/issues/159" target="_blank">[159]</a>


