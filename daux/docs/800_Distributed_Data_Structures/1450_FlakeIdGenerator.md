
Hazelcast `FlakeIdGenerator` is used to generate cluster-wide unique identifiers. Generated identifiers are `long` primitive values and are k-ordered (roughly ordered). IDs are in the range from `Long.MIN_VALUE` to `Long.MAX_VALUE`.

### Generating Cluster-Wide IDs

The IDs contain timestamp component and a node ID, which is assigned when the member joins the cluster. This allows the IDs to be ordered and unique without any coordination between members, which makes the generator safe even in split-brain scenario (for limitations in this case, see [Node ID assignment](#page_Node+ID+assignment) section below.

Timestamp component is in milliseconds since 1.1.2017, 0:00 GMT, and has 42 bits. This caps the useful lifespan of the generator to little less than 140 years. The sequence component is 6 bits. If more than 64 IDs are requested in single millisecond, IDs will gracefully overflow to next millisecond and uniqueness is guaranteed in this case.

### Performance

Operation on member is always local. On client, the `newId()` method goes to a member and gets a batch of IDs, which will then be returned locally for limited time. The pre-fetch size and the validity time are configured per-client. The `newIdBatch(int)` always goes to a member.

### Example

Let's write a sample identifier generator.

```java
public class FlakeIdGeneratorSample {
  public static void main(String[] args) {
    HazelcastInstance hazelcast = Hazelcast.newHazelcastInstance();
    HazelcastInstance client = HazelcastClient.newHazelcastClient();
    FlakeIdGenerator idGenerator = client.getFlakeIdGenerator("idGenerator");
    for (int i = 0; i < 10000; i++) {
      sleepSeconds(1);
      System.out.printf("Id: %s\n", idGenerator.newId());
    }
  }
}
```

### Node ID assignment

Flake IDs require unique node ID to be assigned to each member, from which point the member can generate unique IDs without any coordination. Hazelcast uses the member list version from the moment when the node joined the cluster, as unique node ID.

The join algorithm is specifically designed to ensure that member list join version is unique for each member in the cluster, even during a network-split situation:
* If two members join at the same time, they will appear on different version of member list
* If a new member claims mastership, it makes a jump in the member list version based on its index in the member list multiplied by the value of the `hazelcast.mastership.claim.member.list.version.increment` configuration property. This is to protect against the possibility that the original master is still running in a separate network partition.

The solution provides uniqueness guarantee of member list join version numbers with the following limitations:
* When there is a split-brain issue, the number of member list changes that can occur in the sub-clusters are capped by the abovementioned configuration parameter.
* When there is a split-brain issue, if further splits occur in the already split sub-clusters, the uniqueness guarantee can be lost.

##### Node ID overflow

Node ID component of the ID has 16 bits. Members with member list join version higher than 2^16 won't be able to generate IDs. Clients will be able to generate IDs as long as there is at least one member with join version smaller than 2^16 in the cluster. The remedy is to restart the cluster: nodeId will be assigned from zero again. Uniqueness after the restart will be preserved thanks to the timestamp component.
