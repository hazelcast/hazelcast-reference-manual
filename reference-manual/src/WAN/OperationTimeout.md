
### WAN Replication Operation Timeout

After a replication event is sent to the target cluster, the source member waits for an acknowledge that event has reached the target.
If confirmation is not received inside a timeout duration window, the event is resent to the target cluster.

Default value of for this duration is `5000` milliseconds.

You can change this duration depending on your network latency. The Hazelcast Enterprise user can set the `hazelcast.enterprise.wanrep.optimeout.millis`
property to change the timeout duration.

You can do this by setting the property on the command line (where xxx is the timeout duration in milliseconds),

```plain
-Dhazelcast.enterprise.wanrep.optimeout.millis=xxx
```

or by setting the property inside the `hazelcast.xml` (where xxx is the requested timeout duration):

```xml
<hazelcast>
  <properties>
    <property name="hazelcast.enterprise.wanrep.optimeout.millis">xxx</property>
  </properties>
</hazelcast>
``` 

