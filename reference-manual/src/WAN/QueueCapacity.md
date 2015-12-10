
### WAN Replication Queue Capacity

For huge clusters or high data mutation rates, you might need to increase the replication queue size. The default queue
size for replication queues is `100000`. This means, if you have heavy put/update/remove rates, you might exceed the queue size
so that the oldest, not yet replicated, updates might get lost.
 
To increase the replication queue capacity, the Hazelcast Enterprise user can use the `hazelcast.enterprise.
wanrep.queue.capacity`
property.

You can do this by setting the property on the command line (where xxx is the queue size),

```plain
-Dhazelcast.enterprise.wanrep.queue.capacity=xxx
```

or by setting the properties inside the `hazelcast.xml` (where xxx is the requested queue size):

```xml
<hazelcast>
  <properties>
    <property name="hazelcast.enterprise.wanrep.queue.capacity">xxx</property>
  </properties>
</hazelcast>
```

