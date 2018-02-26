

## PN-Counter

A Conflict-free Replicated Data Type (CRDT) is a data structure that can replicate across the members in a network where you can update the replicas independently and concurrently without any coordination between the them.

Hazelcast offers a lightweight PN-Counter (Positive-Negative Counter) implementation, which is a CRDT. Each cluster member can increment and decrement the counter value and these updates are propagated to all members. If there is no member failure, it is guaranteed that each member sees the final value of the counter eventually and the history of the counter value is monotonic. Counter's state converges with each update and all CRDT replicas that can communicate to each other will eventually have the same state. With this data type you can get a distributed counter, increment and decrement it, and query its value with RYW (read-your-writes) and monotonic reads.

Different callers can read distinct values of the same counter at the same time. A caller picks a member from which it will always access the counter. As Replicas are only eventually consistent, it is possible for caller 1 connected to a replica on member A to read a different value to caller 2 connected to a replica on member B. A caller will always read its writes.

**What is it and how it works:**

The counter supports adding and subtracting values as well as retrieving the current counter value. Each replica of this counter can perform operations locally without coordination with the other replicas, thus increasing availability. The counter guarantees that whenever two members have received the same set of updates, possibly in a different order, their state is identical, and any conflicting updates are merged automatically. If no new updates are made to the shared state, all members that can communicate will eventually have the same data.

The updates to the counter are applied locally when invoked on a CRDT replica. A replica can be any Hazelcast instance which is not a client or a lite member. You can configure the number of replicas in the cluster using the `replica-count` configuration element.
 
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

Please refer to the [PN-Counter Javadoc](http://docs.hazelcast.org/docs/3.10-BETA-1/javadoc/com/hazelcast/crdt/pncounter/PNCounter.java) for its API documentation.


### Configuring PN-Counter

Following is an example declarative configuration snippet:

```xml
<hazelcast>
  <pn-counter name="default">
    <replica-count>10<replica-count>
    <quorum-name>quorumname</quorum-name>
    <statistics-enabled>true</statistics-enabled>
  </pn-counter>
</hazelcast>
```

- `name`: Name of your PN-Counter.
- `replica-count`: Number of replicas on which state for this PN counter will be kept. This number applies in quiescent state, if there are currently membership changes or clusters are merging, the state may be temporarily kept on more replicas. Its default value is Integer.MAX_VALUE.
- `quorum-name`: Name of quorum configuration that you want this PN-Counter to use.
- `statistics-enabled`: Specifies whether the statistics gathering will be enabled for your PN-Counter. If set to `false`, you cannot collect statistics in your implementation and also Hazelcast Management Center will not show them. Its default value is `true`.
