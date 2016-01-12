### Defining a Cluster Quorum

Hazelcast Cluster Quorum enables you to define the minimum number of machines required in a cluster for the cluster to remain in an operational state. If the number of machines is below the defined minimum at any time, the operations are rejected and the rejected operations return a `QuorumException` to their callers.

When a network partitioning happens, by default Hazelcast chooses to be available. With Cluster Quorum, you can tune your Hazelcast instance towards achieving better consistency by rejecting updates that do not pass a minimum threshold. This reduces the chance of concurrent updates to an entry from two partitioned clusters. Note that the consistency defined here is the best effort, it is not full or strong consistency. To prevent mutative operations in case of a split brain syndrome, you can define a minimum quorum that must be present in the cluster.

Hazelcast initiates a quorum when a change happens on the member list.

![image](images/NoteSmall.jpg) ***NOTE:*** *Currently, cluster quorum only applies to the Map, Transactional Map and Cache; support for other data structures will be added soon. Also, lock methods in the IMap interface do not participate in a quorum.*


#### Configuring a Cluster Quorum

You can set up Cluster Quorum using either declarative or programmatic configuration.

Assume that you have a 5-member Hazelcast Cluster and you want to set the minimum number of 3 members for the cluster to continue operating. The following examples are configurations for this scenario.

**Declarative:**

```xml
<hazelcast>
....
<quorum name="quorumRuleWithThreeMembers" enabled="true">
  <quorum-size>3</quorum-size>
</quorum>

<map name="default">
<quorum-ref>quorumRuleWithThreeNodes</quorum-ref>
</map>
....
</hazelcast>

```

**Programmatic:**

```java
QuorumConfig quorumConfig = new QuorumConfig();
quorumConfig.setName("quorumRuleWithThreeNodes")
quorumConfig.setEnabled(true);
quorumConfig.setSize(3);

MapConfig mapConfig = new MapConfig();
mapConfig.setQuorumName("quorumRuleWithThreeNodes");

Config config = new Config();
config.addQuorumConfig(quorumConfig);
config.addMapConfig(mapConfig);

```

Quorum configuration has the following elements.


- `quorum-size`: Minimum number of members required in a cluster for the cluster to remain in an operational state. If the number of members is below the defined minimum at any time, the operations are rejected and the rejected operations return a QuorumException to their callers.
- `quorum-type`: Type of the cluster quorum. Available values are READ, WRITE and READ_WRITE.



#### Configuring Quorum Listeners

You can register quorum listeners to be notified about quorum results. Quorum listeners are local to the member where they are registered, so they receive only events that occurred on that local member.

Quorum listeners can be configured via declarative or programmatic configuration. The following examples are such configurations.

**Declarative:**

```xml
<hazelcast>
....
<quorum name="quorumRuleWithThreeMembers" enabled="true">
  <quorum-size>3</quorum-size>
  <quorum-listeners>
    <quorum-listener>com.company.quorum.ThreeMemberQuorumListener</quorum-listener>
  </quorum-listeners>
</quorum>

<map name="default">
  <quorum-ref>quorumRuleWithThreeMembers</quorum-ref>
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
              if (QuorumResult.PRESENT.equals(quorumEvent.getType())) {
                // handle quorum presence
              } else if (QuorumResult.ABSENT.equals(quorumEvent.getType())) {
                // handle quorum absence
              }
            }
        });
// Or you can give the name of the class that implements QuorumListener interface.
listenerConfig.setClassName("com.company.quorum.ThreeMemberQuorumListener");

QuorumConfig quorumConfig = new QuorumConfig();
quorumConfig.setName("quorumRuleWithThreeMembers")
quorumConfig.setEnabled(true);
quorumConfig.setSize(3);
quorumConfig.addListenerConfig(listenerConfig);


MapConfig mapConfig = new MapConfig();
mapConfig.setQuorumName("quorumRuleWithThreeMembers");

Config config = new Config();
config.addQuorumConfig(quorumConfig);
config.addMapConfig(mapConfig);
```




#### Querying Quorum Results

Quorum service gives you the ability to query quorum results over the `Quorum` instances. Quorum instances let you query the quorum result of a particular quorum.

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
