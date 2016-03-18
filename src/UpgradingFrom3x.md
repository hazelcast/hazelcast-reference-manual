
### Upgrading from 3.x


- **Introducing the `spring-aware` element:**
Before the release 3.5, Hazelcast uses `SpringManagedContext` to scan `SpringAware` annotations by default. This may cause some performance overhead for the users who do not use `SpringAware`.
This behavior has been changed with the release of Hazelcast 3.5. `SpringAware` annotations are disabled by default. By introducing the `spring-aware` element, now it is possible to enable it by adding the `<hz:spring-aware />` tag to the configuration. Please see the [Spring Integration section](#spring-integration).

- **Introducing new configuration options for WAN replication:**
Starting with the release 3.6, WAN replication related system properties, that are configured per member basis, can now be configured per target cluster.
Below 4 system properties are no more valid;

	* `hazelcast.enterprise.wanrep.batch.size`, please see the [WAN Replication Batch Size](http://docs.hazelcast.org/docs/latest-dev/manual/html-single/index.html#batch-size). 

	* `hazelcast.enterprise.wanrep.batchfrequency.seconds`, please see the [WAN Replication Batch Maximum Delay](http://docs.hazelcast.org/docs/latest-dev/manual/html-single/index.html#batch-maximum-delay).

	* `hazelcast.enterprise.wanrep.optimeout.millis`, please see the [WAN Replication Response Timeout](http://docs.hazelcast.org/docs/latest-dev/manual/html-single/index.html#response-timeout).

	* `hazelcast.enterprise.wanrep.queue.capacity`, please see the [WAN Replication Queue Capacity](http://docs.hazelcast.org/docs/latest-dev/manual/html-single/index.html#queue-capacity).


- **Removal of deprecated getId() method**: 
The method `getId()` in the interface `DistributedObject` has been removed. Please use the method `getName()` instead.

- **Change in the Custom Serialization in the C++ Client Distribution**:

Before, the method `getTypeId()` was used to retrieve the ID of the object to be serialized. Now, the method `getHazelcastTypeId()` is used and you give your object as a parameter to this new method. Also, `getTypeId()` was used in your custom serializer class, now it has been renamed to `getHazelcastTypeId()` too. Note that, these changes also apply when you want to switch from Hazelcast 3.6.1 to 3.6.2 too.




