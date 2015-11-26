
### WAN Replication Batch Size

When `WanBatchReplication` is preferred as the replication implementation, the maximum size of events that are sent in a single batch can be changed 
depending on your needs. Default value for batch size is `50`.

To change the `WanBatchReplication` batch size, use the `hazelcast.enterprise.wanrep.batch.size` property in Hazelcast Enterprise.

You can do this by setting the property on the command line (where xxx is the batch size),

```plain
-Dhazelcast.enterprise.wanrep.batch.size=xxx
```

or by setting the property inside the `hazelcast.xml` (where xxx is the requested batch size):

```xml
<hazelcast>
  <properties>
    <property name="hazelcast.enterprise.wanrep.batch.size">xxx</property>
  </properties>
</hazelcast>
``` 

