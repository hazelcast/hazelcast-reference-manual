
### Enhancements

The following are the the enhancements performed for Hazelcast 3.6 release.

- **Replicated Map improvements**: The implementation of Hazelcast replicated maps has been revisited. Please especially refer to the [Considerations for Replicated Map section](#considerations-for-replicated-map).
- **Management Center improvements**: ???. Please refer to the [???](#???).
- **Paging Predicate improvements**: With the performed improvements, now random page accessing is supported. Please refer to the [???](#???).
- **Rule based query optimizations**: This improvement introduces a query optimizer based on static rewriting rules. The optimizer treats predicates as immutable and returns a modified copy when the optimized one is found. Please refer to the [???](#???).
- **WAN replication improvements**: ???. Please refer to the [???](#???).
- **Improvements on Hazelcast's OSGI support**: ???. Please refer to the [???](#???).


The following are the other improvements performed to solve the enhancement issues opened by the Hazelcast customers/team.

- Inconsistent and potentially buggy design in `BasicCompletableFuture`. <a href="https://github.com/hazelcast/hazelcast/issues/6080" target="_blank">[6080]</a>
- Starting with "hazelcast-wm 3.3", OSGI Manifest Spring package imports should be optional. <a href="https://github.com/hazelcast/hazelcast/issues/6072" target="_blank">[6072]</a>
 - The new client determines the partition ID for every invocation for data structures like queue and list where the partition ID is static. There is no need for this behavior. It should calculate the partition ID for once  when the proxy is created and continue to re-use it. <a href="https://github.com/hazelcast/hazelcast/issues/5848" target="_blank">[5848]</a>
- `Map.Entry` supplied to Entry Processor is not Serializable any more. <a href="https://github.com/hazelcast/hazelcast/issues/5611" target="_blank">[5611]</a>
- The configuration file `minimal-json` with the provided scope is not picked up by the *shade* plugin. <a href="https://github.com/hazelcast/hazelcast/issues/5543" target="_blank">[5543]</a>
- In Spring configuration, when a boolean property is injected for *hazelcast* bean (`<hz:hazelcast:....</hz:hazelcast`)
a `SAXParse` exception is thrown. <a href="https://github.com/hazelcast/hazelcast/issues/5528" target="_blank">[5528]</a>
- Currently, key/value pairs are deserialized prior to the execution of entry processor by default.  This leads to the need of domain object at the server side, even if entry processor never uses it. <a href="https://github.com/hazelcast/hazelcast/issues/5301" target="_blank">[5301]</a>
- In Spring XML configuration, the attributes of `socket-options` should be of type `xs:string`. <a href="https://github.com/hazelcast/hazelcast/issues/4700" target="_blank">[4700]</a>
- `ClientMembershipEvent` does not need to have the `member` field. <a href="https://github.com/hazelcast/hazelcast/issues/4282" target="_blank">[4282]</a>
- Hazelcast has `lock` with lease time feature but does not support `tryLock` with lease time. <a href="https://github.com/hazelcast/hazelcast/issues/1564" target="_blank">[1564]</a>


