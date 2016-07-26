
## Partition Group Configuration

Hazelcast distributes key objects into partitions using a consistent hashing algorithm. Those partitions are assigned to members. An entry is stored in the member that owns the partition to which the entry's key is assigned. The total partition count is 271 by default; you can change it with the configuration property `hazelcast.partition.count`. Please see the [System Properties section](#system-properties).

Along with those partitions, there are also copies of the partitions as backups. Backup partitions can have multiple copies due to the backup count defined in configuration, such as first backup partition, second backup partition, etc. A member cannot hold more than one copy of a partition (ownership or backup). By default, Hazelcast distributes partitions and their backup copies randomly and equally among cluster members, assuming all members in the cluster are identical.

But what if some members share the same JVM or physical machine or chassis and you want backups of these members to be assigned to members in another machine or chassis? What if processing or memory capacities of some members are different and you do not want an equal number of partitions to be assigned to all members?

You can group members in the same JVM (or physical machine) or members located in the same chassis. Or you can group members to create identical capacity. We call these groups **partition groups**. Partitions are assigned to those partition groups instead of to single members. Backups of these partitions are located in another partition group.

### Grouping Types

When you enable partition grouping, Hazelcast presents the following choices for you to configure partition groups.

**1. HOST_AWARE:** 

You can group members automatically using the IP addresses of members, so members sharing the same network interface will be grouped together. All members on the same host (IP address or domain name) will be a single partition group. This helps to avoid data loss when a physical server crashes, because multiple replicas of the same partition are not stored on the same host. But if there are multiple network interfaces or domain names per physical machine, that will make this assumption invalid.

```xml
<partition-group enabled="true" group-type="HOST_AWARE" />
```

```java
Config config = ...;
PartitionGroupConfig partitionGroupConfig = config.getPartitionGroupConfig();
partitionGroupConfig.setEnabled( true )
    .setGroupType( MemberGroupType.HOST_AWARE );
```

**2. CUSTOM:**

You can do custom grouping using Hazelcast's interface matching configuration. This way, you can add different and multiple interfaces to a group. You can also use wildcards in the interface addresses. For example, the users can create rack aware or data warehouse partition groups using custom partition grouping.

```xml
<partition-group enabled="true" group-type="CUSTOM">
<member-group>
  <interface>10.10.0.*</interface>
  <interface>10.10.3.*</interface>
  <interface>10.10.5.*</interface>
</member-group>
<member-group>
  <interface>10.10.10.10-100</interface>
  <interface>10.10.1.*</interface>
  <interface>10.10.2.*</interface>
</member-group
</partition-group>
```

```java
Config config = ...;
PartitionGroupConfig partitionGroupConfig = config.getPartitionGroupConfig();
partitionGroupConfig.setEnabled( true )
    .setGroupType( MemberGroupType.CUSTOM );

MemberGroupConfig memberGroupConfig = new MemberGroupConfig();
memberGroupConfig.addInterface( "10.10.0.*" )
.addInterface( "10.10.3.*" ).addInterface("10.10.5.*" );

MemberGroupConfig memberGroupConfig2 = new MemberGroupConfig();
memberGroupConfig2.addInterface( "10.10.10.10-100" )
.addInterface( "10.10.1.*").addInterface( "10.10.2.*" );

partitionGroupConfig.addMemberGroupConfig( memberGroupConfig );
partitionGroupConfig.addMemberGroupConfig( memberGroupConfig2 );
```

**3. PER_MEMBER:**

You can give every member its own group. Each member is a group of its own and primary and backup partitions are distributed randomly (not on the same physical member). This gives the least amount of protection and is the default configuration for a Hazelcast cluster. This grouping type provides good redundancy when Hazelcast members are on separate hosts. However, if multiple instances run on the same host, this type is not a good option. 

Following are declarative and programmatic configuration snippets that show how to enable PER_MEMBER grouping.


```xml
<partition-group enabled="true" group-type="PER_MEMBER" />
```

```java
Config config = ...;
PartitionGroupConfig partitionGroupConfig = config.getPartitionGroupConfig();
partitionGroupConfig.setEnabled( true )
    .setGroupType( MemberGroupType.PER_MEMBER );
```

**4. ZONE_AWARE:**

You can use zone aware partition group config with hazelcast-jclouds or hazelcast-azure discovery service plugin. When you use hazelcast-jclouds or hazelcast-azure plugin as discovery service, during discovery process those plugins put zone/rack/host info to hazelcast member attribute map. 
So that hazelcast creates partition groups with respect to attribute map entries that includes zone/rack/host info. In zone aware config, backups will be created in other zones. Every zone will be accepted as one partition group.
Note: Some cloud providers have attributes rack info instead of zone info. In such cases Hazelcast looks zone info, rack info, host info respectively.

```xml
<partition-group enabled="true" group-type="ZONE_AWARE" />
```

```java
Config config = ...;
PartitionGroupConfig partitionGroupConfig = config.getPartitionGroupConfig();
partitionGroupConfig.setEnabled( true )
    .setGroupType( MemberGroupType.ZONE_AWARE );
```

Note: Currently this config works only with hazelcast-jclouds plugin and hazelcast-azure discovery plugin.  

**5. SPI:**

In SPI config, user can provide his own partition group implementation. User needs to extend DiscoveryStrategy class of the discovery service plugin.
Then user should override `public PartitionGroupStrategy getPartitionGroupStrategy()` method.
Then user should return `PartitionGroupStrategy` configuration in that method.

```
public class CustomDiscovery extends JCloudsDiscoveryStrategy {

    public CustomDiscovery(Map<String, Comparable> properties) {
        super(properties);
    }
    
    @Override
    public PartitionGroupStrategy getPartitionGroupStrategy() {
        return new CustomPartitionGroupStrategy();
    }

    private class CustomPartitionGroupStrategy implements PartitionGroupStrategy {
        @Override
        public Iterable<MemberGroup> getMemberGroups() {
            ...
            ...
        }
    }
}

```
