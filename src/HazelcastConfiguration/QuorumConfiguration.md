
## Quorum Configuration

The following are example list configurations.

**Declarative:**

```xml
<quorum name="quorumRuleWithThreeNodes" enabled="true">
  <quorum-size>3</quorum-size>
  <quorum-type>READ</quorum-type>
  <quorum-listeners>
    <quorum-listener>com.company.quorum.ThreeNodeQuorumListener</quorum-listener>
  </quorum-listeners>
</quorum>
```

**Programmatic:**

```java
Config config = new Config();
QuorumConfig quorumCfg = config.getQuorumConfig();
quorumCfg.setName( "quorumRuleWithThreeNodes" )
         .setSize( 3 )
         .setEnabled( "true")
         .setType( "READ" )
```

To define the quorum to the map:

```java
MapConfig mapConfig = new MapConfig();
mapConfig.setQuorumName("quorumRuleWithThreeNodes");

Config config = new Config();
config.addQuorumConfig(quorumConfig);
config.addMapConfig(mapConfig);
```

   

Quorum configuration has the following elements.


- `quorum-size`: Minimum number of members required in a cluster for the cluster to remain in an operational state. If the number of members is below the defined minimum at any time, the operations are rejected and the rejected operations return a QuorumException to their callers.
- `quorum-type`: Type of the cluster quorum. Available values are READ, WRITE and READ_WRITE.
- `quorum-listeners`: Lets you register quorum listeners to be notified about quorum results. Quorum listeners are local to the member that they are registered, so they receive only events occurred on that local member.




