
In the case of special/custom needs, you can use Hazelcast's SPI (Service Provider Interface) module to develop your own distributed data structures and services on top of Hazelcast. Hazelcast SPI is an internal, low-level API which is expected to change in each release except for the patch releases. Your structures and services evolve as the SPI changes. 

Throughout this section, we create an example distributed counter that will be the guide to reveal the Hazelcast Services SPI usage.

Here is our counter.

```java
public interface Counter{
   int inc(int amount);
}
```

This counter will have the following features:
- It will be stored in Hazelcast. 
- Different cluster members can call it. 
- It will be scalable, meaning that the capacity for the number of counters scales with the number of cluster members.
- It will be highly available, meaning that if a member hosting this counter goes down, a backup will be available on a different member.

All these features are done with the steps below. Each step adds a new functionality to this counter.

1. Create the class.
2. Enable the class.
3. Add properties.
5. Place a remote call.
5. Create the containers.
6. Enable partition migration.
6. Create the backups.



### Creating the Service Class



To have the counter as a functioning distributed object, we need a class. This class (named CounterService in the following example code) is the gateway between Hazelcast internals and the counter, allowing us to add features to the counter. The following example code creates the class `CounterService`. Its lifecycle is managed by Hazelcast. 

`CounterService` should implement the interface `com.hazelcast.spi.ManagedService` as shown below. The `com.hazelcast.spi.ManagedService` [source code is here](https://github.com/hazelcast/hazelcast/blob/master/hazelcast/src/main/java/com/hazelcast/spi/ManagedService.java).

`CounterService` implements the following methods. 

- `init`: This is called when `CounterService` is initialized. `NodeEngine` enables access to Hazelcast internals such as `HazelcastInstance` and `PartitionService`. Also, the object `Properties` will provide us with the ability to create our own properties.
- `shutdown`: This is called when `CounterService` is shutdown. It cleans up the resources.
- `reset`: This is called when cluster members face the Split-Brain issue. This occurs when disconnected members that have created their own cluster are merged back into the main cluster. Services can also implement the `SplitBrainHandleService` to indicate that they can take part in the merge process. For `CounterService` we are going to implement `reset` as a no-op.


```java
import com.hazelcast.spi.ManagedService;
import com.hazelcast.spi.NodeEngine;

import java.util.Properties;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

public class CounterService implements ManagedService {
    private NodeEngine nodeEngine;

    @Override
    public void init( NodeEngine nodeEngine, Properties properties ) {
        System.out.println( "CounterService.init" );
        this.nodeEngine = nodeEngine;
    }

    @Override
    public void shutdown( boolean terminate ) {
        System.out.println( "CounterService.shutdown" );
    }

    @Override
    public void reset() {
    }

}
```

