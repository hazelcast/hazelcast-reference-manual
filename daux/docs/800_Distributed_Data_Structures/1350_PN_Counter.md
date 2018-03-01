

A Conflict-free Replicated Data Type (CRDT) is a distributed data structure that achieves high availability by relaxing consistency constraints. There may be several replicas for the same data and these replicas can be modified concurrently without coordination. This means that you may achieve high throughput and low latency when updating a CRDT data structure. On the other hand, all of the updates are replicated asynchronously. Each replica will then receive updates made on other replicas eventually and if no new updates are done, all replicas which can communicate to each other will return the same state (converge) after some time. 
 
Hazelcast offers a lightweight CRDT PN counter (Positive-Negative Counter) implementation where each Hazelcast instance can increment and decrement the counter value and these updates are propagated to all replicas. Only a Hazelcast member can store state for a counter which means that counter method invocations performed on a Hazelcast member are usually local (depending on the configured replica count). If there is no member failure, it is guaranteed that each replica sees the final value of the counter eventually. Counter's state converges with each update and all CRDT replicas that can communicate to each other will eventually have the same state. 

Using the PN Counter, you can get a distributed counter, increment and decrement it, and query its value with RYW (read-your-writes) and monotonic reads. The implementation borrows most methods from the `AtomicLong` which should be familiar in most cases and easily interchangeable in the existing code.

Some examples of PN counter are:

- counting the number of "likes" or "+1"
- counting the number of logged in users
- counting the number of page hits/views

**How it works**

The counter supports adding and subtracting values as well as retrieving the current counter value. Each replica of this counter can perform operations locally without coordination with the other replicas, thus increasing availability. The counter guarantees that whenever two members have received the same set of updates, possibly in a different order, their state is identical, and any conflicting updates are merged automatically. If no new updates are made to the shared state, all members that can communicate will eventually have the same data.

The updates to the counter are applied locally when invoked on a CRDT replica. A CRDT replica can be any Hazelcast instance **which is NOT a client or a lite member**. You can configure the number of replicas in the cluster using the `replica-count` configuration element.
 
When invoking updates from a non-replica instance, the invocation is remote. This may lead to indeterminate state - the update may be applied but the response has not been received. In this case, the caller will be notified with a `TargetDisconnectedException` when invoked from a client or a `MemberLeftException` when invoked from a member.
 
The read and write methods provide monotonic read and RYW (read-your-write) guarantees. These guarantees are session guarantees which means that if no replica with the previously observed state is reachable, the session guarantees are lost and the method invocation will throw a `ConsistencyLostException`. This does not mean that an update is lost. All of the updates are part of some replica and will be eventually reflected in the state of all other replicas. This exception just means that you cannot observe your own writes because all replicas that contain your updates are currently unreachable. After you have received a `ConsistencyLostException`, you can either wait for a sufficiently up-to-date replica to become reachable in which case the session can be continued or you can reset the session by calling the method `reset(). If you have called this method, a new session is started with the next invocation to a CRDT replica.

![Note](../images/NoteSmall.jpg) ***NOTE:*** *The CRDT state is kept entirely on non-lite (data) members. If there aren't any and the methods here are invoked on a lite member, they fail with a `NoDataMemberInClusterException`.*


The following is an example code.

```
final HazelcastInstance instance = Hazelcast.newHazelcastInstance();
        final PNCounter counter = instance.getPNCounter("counter");
        counter.addAndGet(5);
        final long value = counter.get();
```

This code snippet creates an instance of a PN counter, increments it by 5 and retrieves the value.


### Configuring PN Counter

Following is an example declarative configuration snippet:

```xml
<hazelcast>
  <pn-counter name="default">
    <replica-count>10<replica-count>
    <statistics-enabled>true</statistics-enabled>
  </pn-counter>
</hazelcast>
```

- `name`: Name of your PN Counter.
- `replica-count`: Number of replicas on which state for this PN counter will be kept. This number applies in quiescent state, if there are currently membership changes or clusters are merging, the state may be temporarily kept on more replicas. Its default value is Integer.MAX_VALUE. Generally, keeping the state on more replicas means that more Hazelcast members will be able to perform updates locally but it also means that the PN counter state will be kept on more replicas, increasing the network traffic, decreasing the speed at which replica states converge and increasing the size of the PN counter state kept on each replica.
- `statistics-enabled`: Specifies whether the statistics gathering will be enabled for your PN Counter. If set to `false`, you cannot collect statistics in your implementation and also Hazelcast Management Center will not show them. Its default value is `true`.

Following is an equivalent snippet of Java configuration:

```java
PNCounterConfig pnCounterConfig = new PNCounterConfig()
        .setReplicaCount(10)
        .setStatisticsEnabled(true);
Config hazelcastConfig = new Config()
        .addPNCounterConfig(pnCounterConfig);
```

### Configuring the CRDT replication mechanism

![Note](../images/NoteSmall.jpg) ***NOTE:*** *Configuring the replication mechanism is for advanced use cases only - usually the default configuration will work fine for most cases.*

In some cases, you may want to configure the replication mechanism for all CRDT implementations. The CRDT states are replicated in rounds (the period is configurable) and in each round the state is replicated up to the configured number of members. Generally speaking, you may increase the speed at which replicas converge at the expense of more network traffic or decrease the network traffic at the expense of slower convergence of replicas. 
Hazelcast implements the state-based replication mechanism - the CRDT state for changed CRDTs is replicated in its entirety to other replicas on each replication round.  

```xml
<hazelcast>
  <crdt-replication>
      <max-concurrent-replication-targets>1</max-concurrent-replication-targets>
      <replication-period-millis>1000</replication-period-millis>
  </crdt-replication>
</hazelcast>
```

- `max-concurrent-replication-targets`: The maximum number of target members that we replicate the CRDT states to in one period. A higher count will lead to states being disseminated more rapidly at the expense of burst-like behavior - one update to a CRDT will lead to a sudden burst in the number of replication messages in a short time interval. The default value is 1 which means that each replica will replicate state to only one other replica in each replication round. 
- `replication-period-millis`: The period between two replications of CRDT states in milliseconds. A lower value will increase the speed at which changes are disseminated to other cluster members at the expense of burst-like behavior - less updates will be batched together in one replication message and one update to a CRDT may cause a sudden burst of replication messages in a short time interval. The value must be a positive non-null integer. The default value is 1000 ms which means that the changed CRDT state is replicated every 1 second. 
     
Following is an equivalent snippet of Java configuration:

```java
final CRDTReplicationConfig crdtReplicationConfig = new CRDTReplicationConfig()
        .setMaxConcurrentReplicationTargets(1)
        .setReplicationPeriodMillis(1000);
Config hazelcastConfig = new Config()
        .setCRDTReplicationConfig(crdtReplicationConfig);
```