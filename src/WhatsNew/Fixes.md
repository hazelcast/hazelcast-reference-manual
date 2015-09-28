
### Fixes

**3.6 Fixes**

The following are the issues solved for Hazelcast 3.6 release.


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
- Throughput statistics for Map shows nothing when the `putAll()` method is used <a href="https://github.com/hazelcast/management-center/issues/159" target="_blank">[159]</a>


