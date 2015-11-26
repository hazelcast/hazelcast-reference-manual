
### Enhancements

The following are the the enhancements performed for Hazelcast 3.6 release.

- **Replicated Map improvements**: The implementation of Hazelcast replicated maps has been revisited. Please especially refer to the [Considerations for Replicated Map section](#considerations-for-replicated-map).
- **Management Center improvements**: Alerting mechanism added. Please refer to the [Management Center section](#management-center).
- **Paging Predicate improvements**: With the performed improvements, now random page accessing is supported. Please refer to the [Filtering with Paging Predicates section](#filtering-with-paging-predicates).
- **Rule based query optimizations**: This improvement introduces a query optimizer based on static rewriting rules. The optimizer treats predicates as immutable and returns a modified copy when the optimized one is found. Please refer to the `hazelcast.query.optimizer.type` property definition in the [System Properties section](#system-properties).
- **WAN replication improvements**: With the improvements performed on Hazelcast's WAN replication feature, you can now monitor WAN replication events for each data structure and WAN replication now supports different acknowledge types for each target cluster group. Please refer to the [WAN Replication Event Filtering API section](#wan-replication-event-filtering-api) and [WAN Replication Acknowledge Types section](#wan-replication-acknowledge-types) for more information.
- **Improvements on Hazelcast's OSGI support**: With this improvement, Hazelcast bundles provide OSGI services so that the users can manage (create, access, shutdown) the Hazelcast instances through this service on OSGI environments. Having the `hazelcast.osgi.start` property enabled, when an Hazelcast OSGI service is activated, a default Hazelcast instance is created automatically. These instances can be served as an OSGI service to be accessed by other bundles. Registering the created Hazelcast instances behavior is enabled by default and can be disabled using the `hazelcast.osgi.register.disabled` property. Each Hazelcast bundle provides a different OSGI service and their instances can be grouped (clustered) together to prevent possible compatibility issues between different Hazelcast versions/bundles. This grouping behavior is enabled by default and can be disabled using the `hazelcast.osgi.grouping.disabled` property. Hazelcast OSGI service's lifecycle (and also the owned/created instances' lifecycles) are the same as the owner Hazelcast bundles. When the bundle is stopped (deactivated), owned service and Hazelcast instances are also deactivated/shutdown and deregistered automatically. Then, when the bundle is re-activated, its service is registered again. In addition, the Hazelcast Enterprise JAR file is also an OSGI bundle like the Hazelcast OSS JAR file.


The following are the other improvements performed to solve the enhancement issues opened by the Hazelcast customers/team.

- There exists a misleading log entry for the method `EventServiceImpl.sendEvent`: "logFailure("IO Queue overloaded! Failed to send event packet to: %s", subscriber);". However, the failure is not about I/O queue, it is about connection drop. <a href="https://github.com/hazelcast/hazelcast/issues/6723" target="_blank">[6723]</a>
- Approximate `max-size` calculation should be removed for IMap eviction. <a href="https://github.com/hazelcast/hazelcast/issues/6463" target="_blank">[6463]</a>
- `SpringAwareWebFilter` should have a constructor which takes properties as arguments. <a href="https://github.com/hazelcast/hazelcast/issues/6438" target="_blank">[6438]</a>
- Client side and server side cache proxies handle `putAll` operation one by one. This is not efficient. Records for this operation should be grouped as per their partitions and should be sent and processed in batches. <a href="https://github.com/hazelcast/hazelcast/issues/6367" target="_blank">[6367]</a>
- Not requested events should not be sent to `MapListener` <a href="https://github.com/hazelcast/hazelcast/issues/6349" target="_blank">[6349]</a>
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


