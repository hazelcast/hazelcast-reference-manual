
### Upgrading from 3.x

- **Upgrading from 3.6.x to 3.7.x when using `JCache`:**
 Hazelcast 3.7 introduced changes in `JCache` implementation which broke compatibility of 3.6.x clients to 3.7-3.7.2 cluster members and vice versa,
 so 3.7-3.7.2 clients are also incompatible with 3.6.x cluster members. This issue only affects Java clients which use `JCache` functionality.
 
    Starting with Hazelcast version 3.7.3, a compatibility option is provided which can be used to ensure backwards compatibility with 3.6.x clients.
 In order to upgrade a 3.6.x cluster and clients to 3.7.3 (or later), you will need to use this compatibility option on either the member or the client
 side, depending on which one is upgraded first:
    * first upgrade your cluster members to 3.7.3, adding property `hazelcast.compatibility.3.6.client=true` to your configuration; when started with this
 property, cluster members are compatible with 3.6.x and 3.7.3+ clients but not with 3.7-3.7.2 clients. Once your cluster is upgraded, you may
 upgrade your applications to use client version 3.7.3+.
    * upgrade your clients from 3.6.x to 3.7.3, adding property `hazelcast.compatibility.3.6.server=true` to your Hazelcast client configuration. A
  3.7.3 client started with this compatibility option is compatible with 3.6.x and 3.7.3+ cluster members but incompatible with 3.7-3.7.2 cluster
  members. Once your clients are upgraded, you may then proceed to upgrade your cluster members to version 3.7.3 or later.
 
    You may use any of the supported ways [as described in System Properties section](#system-properties) to configure the compatibility option. When done
 upgrading your cluster and clients, you may remove the compatibility property from your Hazelcast member configuration. 

- **Introducing the `spring-aware` element:**
Before the release 3.5, Hazelcast uses `SpringManagedContext` to scan `SpringAware` annotations by default. This may cause some performance overhead for the users who do not use `SpringAware`.
This behavior has been changed with the release of Hazelcast 3.5. `SpringAware` annotations are disabled by default. By introducing the `spring-aware` element, now it is possible to enable it by adding the `<hz:spring-aware />` tag to the configuration. Please see the [Spring Integration section](#spring-integration).

- **Introducing new configuration options for WAN replication:**
Starting with the release 3.6, WAN replication related system properties, which are configured on a per member basis, can now be configured per target cluster.
The 4 system properties below are no longer valid.

	* `hazelcast.enterprise.wanrep.batch.size`, please see the [WAN Replication Batch Size](http://docs.hazelcast.org/docs/latest-dev/manual/html-single/index.html#batch-size). 

	* `hazelcast.enterprise.wanrep.batchfrequency.seconds`, please see the [WAN Replication Batch Maximum Delay](http://docs.hazelcast.org/docs/latest-dev/manual/html-single/index.html#batch-maximum-delay).

	* `hazelcast.enterprise.wanrep.optimeout.millis`, please see the [WAN Replication Response Timeout](http://docs.hazelcast.org/docs/latest-dev/manual/html-single/index.html#response-timeout).

	* `hazelcast.enterprise.wanrep.queue.capacity`, please see the [WAN Replication Queue Capacity](http://docs.hazelcast.org/docs/latest-dev/manual/html-single/index.html#queue-capacity).


- **Removal of deprecated getId() method**: 
The method `getId()` in the interface `DistributedObject` has been removed. Please use the method `getName()` instead.

- **Change in the Custom Serialization in the C++ Client Distribution**: Before, the method `getTypeId()` was used to retrieve the ID of the object to be serialized. Now, the method `getHazelcastTypeId()` is used and you give your object as a parameter to this new method. Also, `getTypeId()` was used in your custom serializer class, now it has been renamed to `getHazelcastTypeId()` too. Note that, these changes also apply when you want to switch from Hazelcast 3.6.1 to 3.6.2 too.

- **Important note about Hazelcast System Properties:** Even Hazelcast has not been recommending the usage of `GroupProperties.java` class while benefiting from System Properties, there has been a change to inform to the users who have been using this class. Starting with 3.7, the class `GroupProperties.java` has been replaced by `GroupProperty.java`. 
In this new class, system properties are instances of the newly introduced `HazelcastProperty` object. You can access the names of these properties by calling `getName()` method of `HazelcastProperty`.

- **Removal of WanNoDelayReplication**: `WanNoDelayReplication` implementation of Hazelcast's WAN Replication has been removed starting with 3.7 release. You can still achieve this behavior by setting the batch size to `1` while configuring the WanBatchReplication. Please refer to the [Defining WAN Replication section](http://docs.hazelcast.org/docs/3.7/manual/html-single/index.html#defining-wan-replication) for more information.

- **Introducing <wan-publisher> element**: Starting with 3.8, the configuration element `<target-cluster>` is replaced with the element `<wan-publisher>` in WAN replication configuration.


