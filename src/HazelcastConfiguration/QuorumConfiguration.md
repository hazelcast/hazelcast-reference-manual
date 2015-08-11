
## Quorum Configuration

The following are example list configurations.

**Declarative:**

```xml
<quorum name="quorumRuleWithThreeNodes" enabled="true">
  <quorum-size>3</quorum-size>
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
         .setMaxSize( "10" );
```
   

List configuration has the following elements.


- `statistics-enabled`: True (default) if statistics gathering is enabled on the list, false otherwise.
- `backup-count`: Number of synchronous backups. List is a non-partitioned data structure, so all entries of a List reside in one partition. When this parameter is '1', there will be 1 backup of that List in another node in the cluster. When it is '2', 2 nodes will have the backup.
- `async-backup-count`: Number of asynchronous backups.
- `max-size`: The maximum number of entries for this List.
- `item-listeners`: Lets you add listeners (listener classes) for the list items. You can also set the attribute `include-value` to `true` if you want the item event to contain the item values, and you can set the attribute `local` to `true` if you want to listen the items on the local node.




