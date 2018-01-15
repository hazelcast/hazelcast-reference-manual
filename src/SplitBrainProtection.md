## Split-Brain Protection

![image](images/NoteSmall.jpg) ***NOTE:*** *The term "quorum" used in this section simply refers to the count of members in the cluster. It does NOT refer to an implementation of Paxos or Raft protocols as used in some NoSQL systems. The mechanism provided in Hazelcast protects the user in case the number of members in a cluster drops below the specified one.*

How to respond to a split-brain scenario depends on whether consistency of data or availability of your application is of primary concern. In either case, because a split-brain scenario is caused by a network failure, you must initiate an effort to identify and correct the network failure. Your cluster cannot be brought back to steady state operation until the underlying network failure is fixed. If consistency is your primary concern, you can use Hazelcast's  Split-Brain Protection feature.

Hazelcast's Split-Brain Protection enables you to specify the minimum cluster size required for operations to occur. This is achieved by defining and configuring a split-brain protection cluster quorum. If the cluster size is below the defined quorum, the operations are rejected and the rejected operations return a `QuorumException` to their callers.

Your application continues its operations on the remaining operating cluster. Any application instances connected to the cluster with sizes below the defined quorum will be receiving exceptions which, depending on the programming and monitoring setup, should generate alerts. The key point is that rather than applications continuing in error with stale data, they are prevented from doing so.

Split-Brain Protection is supported for the following Hazelcast data structures:

* IMap (for Hazelcast 3.5 and higher versions)
* Transactional Map (for Hazelcast 3.5 and higher versions)
* ICache (for Hazelcast 3.5 and higher versions)
* ILock (for Hazelcast 3.8 and higher versions)
* IQueue (for Hazelcast 3.8 and higher versions)
* IExecutorService, DurableExecutorService, IScheduledExecutorService, MultiMap, ISet, IList, Ringbuffer, Replicated Map, Cardinality Estimator, IAtomicLong, IAtomicReference, ISemaphore, ICountdownLatch (for Hazelcast 3.10 and higher versions)

Each data structure to be protected should have the configuration added to it as explained in the [Configuring Split-Brain Protection section](#configuring-split-brain-protection).

### Time Window for Split-Brain Protection

Cluster Membership is established and maintained by heartbeats. A network partitioning will present some members as being unreachable. While configurable, it is normally seconds or tens of seconds before the cluster is adjusted to exclude unreachable members. The cluster size is based on the currently understood number of members.

For this reason, there will be a time window between the network partitioning and the application of Split-Brain Protection, a time window to detect quorum is not satisfied anymore. Length of this window depends on the failure detector. Given guarantee is, every member will eventually detect the failed members and will reject the operation on the data structure which requires the quorum.

For more information, please see the [Consistency and Replication Model chapter](#consistency-and-replication-model).


### Configuring Split-Brain Protection



You can set up Split-Brain Protection Cluster Quorum using either declarative or programmatic configuration.

Assume that you have a 7-member Hazelcast Cluster and you want to set the minimum number of four members for the cluster to continue operating. In this case, if a split-brain happens, the sub-clusters of sizes 1, 2, and 3 will be prevented from being used. Only the sub-cluster of four members will be allowed to be used.

![image](images/NoteSmall.jpg) ***NOTE:*** *It is preferable to have an odd-sized initial cluster size to prevent a single network partitioning (split-brain) from creating two equal sized clusters.*


The following are map configurations for the example 7-member cluster scenario described above:

**Declarative:**

```xml
<hazelcast>
....
<quorum name="quorumRuleWithFourMembers" enabled="true">
  <quorum-size>4</quorum-size>
</quorum>

<map name="default">
<quorum-ref>quorumRuleWithFourMembers</quorum-ref>
</map>
....
</hazelcast>

```

**Programmatic:**

```java
QuorumConfig quorumConfig = new QuorumConfig();
quorumConfig.setName("quorumRuleWithFourMembers")
quorumConfig.setEnabled(true);
quorumConfig.setSize(4);

MapConfig mapConfig = new MapConfig();
mapConfig.setQuorumName("quorumRuleWithFourMembers");

Config config = new Config();
config.addQuorumConfig(quorumConfig);
config.addMapConfig(mapConfig);

```

Quorum configuration has the following elements.


- `quorum-size`: Minimum number of members required in a cluster for the cluster to remain in an operational state. If the number of members is below the defined minimum at any time, the operations are rejected and the rejected operations return a QuorumException to their callers.
- `quorum-type`: Type of the cluster quorum. Available values are READ, WRITE and READ_WRITE.



### Configuring Quorum Listeners

You can register quorum listeners to be notified about quorum results. Quorum listeners are local to the member where they are registered, so they receive only events that occurred on that local member.

Quorum listeners can be configured via declarative or programmatic configuration. The following examples are such configurations.

**Declarative:**

```xml
<hazelcast>
....
<quorum name="quorumRuleWithFourMembers" enabled="true">
  <quorum-size>4</quorum-size>
  <quorum-listeners>
    <quorum-listener>com.company.quorum.FourMemberQuorumListener</quorum-listener>
  </quorum-listeners>
</quorum>

<map name="default">
  <quorum-ref>quorumRuleWithFourMembers</quorum-ref>
</map>
....
</hazelcast>
```

**Programmatic:**

```java
QuorumListenerConfig listenerConfig = new QuorumListenerConfig();
// You can either directly set quorum listener implementation of your own
listenerConfig.setImplementation(new QuorumListener() {
            @Override
            public void onChange(QuorumEvent quorumEvent) {
                if (quorumEvent.isPresent()) {
                       // handle quorum presence
                } else {
                    // handle quorum absence
                }
            }
        });
// Or you can give the name of the class that implements QuorumListener interface.
listenerConfig.setClassName("com.company.quorum.ThreeMemberQuorumListener");

QuorumConfig quorumConfig = new QuorumConfig();
quorumConfig.setName("quorumRuleWithFourMembers")
quorumConfig.setEnabled(true);
quorumConfig.setSize(4);
quorumConfig.addListenerConfig(listenerConfig);


MapConfig mapConfig = new MapConfig();
mapConfig.setQuorumName("quorumRuleWithFourMembers");

Config config = new Config();
config.addQuorumConfig(quorumConfig);
config.addMapConfig(mapConfig);
```




### Querying Quorum Results

Split Brain Protection Quorum service gives you the ability to query quorum results over the `Quorum` instances. Quorum instances let you query the result of a particular quorum.

Here is a Quorum interface that you can interact with.

```java
/**
 * {@link Quorum} provides access to the current status of a quorum.
 */
public interface Quorum {
    /**
     * Returns true if quorum is present, false if absent.
     *
     * @return boolean presence of the quorum
     */
    boolean isPresent();
}
```
You can retrieve the quorum instance for a particular quorum over the quorum service, as in the following example.

```java
String quorumName = "at-least-one-storage-member";
QuorumConfig quorumConfig = new QuorumConfig();
quorumConfig.setName(quorumName)
quorumConfig.setEnabled(true);

MapConfig mapConfig = new MapConfig();
mapConfig.setQuorumName(quorumName);

Config config = new Config();
config.addQuorumConfig(quorumConfig);
config.addMapConfig(mapConfig);

HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance(config);
QuorumService quorumService = hazelcastInstance.getQuorumService();
Quorum quorum = quorumService.getQuorum(quorumName);

boolean quorumPresence = quorum.isPresent();

```
