
## Reliable IdGenerator

Hazelcast Reliable IdGenerator is used to generate cluster-wide unique identifiers. Generated identifiers are `long` primitive values and are k-ordered (roughly ordered). IDs are in the range from `Long.MIN_VALUE` to `Long.MAX_VALUE`. This type of generator is generally known as a Flake ID generator.

### Generating Cluster-Wide IDs

The IDs contain timestamp component and a member ID component, which is assigned when the member joins the cluster. This allows the IDs to be ordered and unique without any coordination between the members, which makes the generator safe even in split-brain scenarios (for limitations in this case, please see the [Member ID assignment section](#member-id-assignment) below).

Timestamp component is in milliseconds since 01.01.2017, 0:00 GMT, and has 42 bits. This caps the useful lifespan of the generator to little less than 140 years. The sequence component is 6 bits. If more than 64 IDs are requested in a single millisecond, IDs will gracefully overflow to the next millisecond and uniqueness is guaranteed in this case.

### Performance

Operation on the member is typically local. On the client, the `newId()` method goes to a random member and gets a batch of IDs, which will then be returned locally for a limited time. The pre-fetch size and validity time can be configured for each client and member.

### Example

Let's write a sample identifier generator.

```java
public class ReliableIdGeneratorSample {
    public static void main(String[] args) {
        HazelcastInstance hazelcast = Hazelcast.newHazelcastInstance();

        ClientConfig clientConfig = new ClientConfig()
                .addReliableIdGeneratorConfig(new ReliableIdGeneratorConfig("idGenerator")
                        .setPrefetchCount(10));
        HazelcastInstance client = HazelcastClient.newHazelcastClient(clientConfig);

        ReliableIdGenerator idGenerator = client.getReliableIdGenerator("idGenerator");
        for (int i = 0; i < 10000; i++) {
            sleepSeconds(1);
            System.out.printf("Id: %s\n", idGenerator.newId());
        }
    }
}
```

### Member ID Assignment

Reliable IDs require a unique member ID to be assigned to each member, from which point the member can generate unique IDs without any coordination. Hazelcast uses the member list version, from the moment when the member joined the cluster, as a unique member ID.

The join algorithm is specifically designed to ensure that member list join version is unique for each member in the cluster, even during a network split situation:

* If two members join at the same time, they will appear on the different versions of member list.
* If a new member claims mastership, it causes a jump in the member list version based on its index in the member list multiplied by the value of the `hazelcast.mastership.claim.member.list.version.increment` configuration property. This is to protect against the possibility that the original master is still running in a separate network partition.

The solution provides uniqueness guarantee of the member list join version numbers with the following limitations:

* When there is a split-brain issue, the number of member list changes that can occur in the sub-clusters are capped by the abovementioned configuration parameter.
* When there is a split-brain issue, if further splits occur in the already split sub-clusters, the uniqueness guarantee can be lost.

##### Member ID Overflow

Member ID component of the ID has 16 bits. Members with the member list join version higher than 2^16 won't be able to generate IDs, but functionality will be preserved by forwarding to another member. It is possible to generate IDs on any member or client as long as there is at least one member with join version smaller than 2^16 in the cluster. The remedy is to restart the cluster: the member ID component (`nodeId`) will be reset and assigned starting from zero again. Uniqueness after the restart will be preserved thanks to the timestamp component.
