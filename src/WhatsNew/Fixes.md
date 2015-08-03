
### Fixes

**3.6 Fixes**

The following are the issues solved for Hazelcast 3.6 release.

- `hazelcast-jca-rar/pom.xml` references to `src/main/rar/ra.xml` which does not exist. <a href="https://github.com/hazelcast/hazelcast/issues/5760" target="_blank">[5760]</a>
- The Maven profile `mvn clean compile -Pqa` does not exist but it is documented in the README of Hazelcast. <a href="https://github.com/hazelcast/hazelcast/issues/5746" target="_blank">[5746]</a>
- `PerformanceLogFile` only compiles if JDK 1.7 or above is used. <a href="https://github.com/hazelcast/hazelcast/issues/5729" target="_blank">[5729]</a>
- Currently, for every deserialization a `BufferObjectDataInput` is created. This generates waste since it is created with an array of data for every deserialization. The `BufferObjectDataOutput` is already cached; the input should use a similar approach. <a href="https://github.com/hazelcast/hazelcast/issues/5562" target="_blank">[5562]</a>
- When any entities are defined as read only in the Hibernate L2 cache, an invalidation of the cache (such as caused by executing a native SQLQuery) leads to the error `UnsupportedOperationException`. <a href="https://github.com/hazelcast/hazelcast/issues/5562" target="_blank">[5562]</a>
- The performance impacts of TWO_PHASE and LOCAL transaction types should be documented. <a href="https://github.com/hazelcast/hazelcast/issues/5075" target="_blank">[5075]</a>
- Client requests are very inefficient when determining the partition ID. <a href="https://github.com/hazelcast/hazelcast/issues/4940" target="_blank">[4940]</a>
- The method `keySet()` relies on `QueryOperation`. The `QueryOperation` does not accept `IterationType` - it always returns both keys and values. This can lead to unnecessary load and potentially even an OOM exception. <a href="https://github.com/hazelcast/hazelcast/issues/4642" target="_blank">[4642]</a>
- Hazelcast is stuck in TIMED_WAITING when used as 2nd level cache for Hibernate. <a href="https://github.com/hazelcast/hazelcast/issues/4406" target="_blank">[4406]</a>


