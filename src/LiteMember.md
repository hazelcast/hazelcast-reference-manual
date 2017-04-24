


### Enabling Lite Members

Lite members are the Hazelcast cluster members that do not store data. These members are used mainly to execute tasks and register listeners, and they do not have partitions.

You can form your cluster to include the regular Hazelcast members to store data and Hazelcast lite members to run heavy computations. The presence of the lite members do not affect the operations performed on the other members in the cluster. You can directly submit your tasks to the lite members, register listeners on them and invoke operations for the Hazelcast data structures on them such as `map.put()` and `map.get()`.

#### Configuring Lite Members

You can enable a cluster member to be a lite member using declarative or programmatic configuration.

##### Declarative Configuration

```xml
<hazelcast>
    <lite-member enabled="true">
</hazelcast>
```

##### Programmatic Configuration

```java
Config config = new Config();
config.setLiteMember(true);
```

#### Promoting Lite Members to Data Member

Lite members can be promoted to data members using the `Cluster` interface. When they are promoted, cluster partitions are rebalanced and ownerships of some portion of the partitions are assigned to the newly promoted data members.

```java
Config config = new Config();
config.setLiteMember(true);

HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance(config);
Cluster cluster = hazelcastInstance.getCluster();
cluster.promoteLocalLiteMember();
```

![Note](images/NoteSmall.jpg) ***NOTE:*** *A data member cannot be downgraded to a lite member back.*
