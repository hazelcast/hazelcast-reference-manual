
### Configuring WAN Replication

The current WAN Replication implementation supports two different operation modes.

- **Active-Passive:** This mode is mostly used for failover scenarios where you want to replicate an active cluster to one
  or more passive clusters, for the purpose of maintaining a backup.

- **Active-Active:** Every cluster is equal, each cluster replicate to all other clusters. This is normally used to connect
  different clients to different clusters for the sake of the shortest path between client and server.

Let's see how we can configure WAN Replication from the New York cluster to target the London and Tokyo clusters:

```xml
<hazelcast>
  <wan-replication name="my-wan-cluster">
    <target-cluster group-name="tokyo" group-password="tokyo-pass">
      <replication-impl>com.hazelcast.enterprise.wan.replication.WanBatchReplication</replication-impl>
      <end-points>
        <address>10.2.1.1:5701</address>
        <address>10.2.1.2:5701</address>
      </end-points>
    </target-cluster>
    <target-cluster group-name="london" group-password="london-pass">
      <replication-impl>com.hazelcast.enterprise.wan.replication.WanBatchReplication</replication-impl>
      <end-points>
        <address>10.3.5.1:5701</address>
        <address>10.3.5.2:5701</address>
      </end-points>
    </target-cluster>
  </wan-replication>
  ...
</hazelcast>
```

Using this configuration, the cluster running in New York is replicating to Tokyo and London. The Tokyo and London clusters should
have a similar configurations if you want to run in Active-Active mode.

If the New York and London cluster configurations contain the `wan-replication` element and the Tokyo cluster does not, it means
New York and London are active endpoints and Tokyo is a passive endpoint.

Hazelcast can configure WAN replication on a per Map basis. Imagine you have different distributed maps, however only one map should be replicated to a target cluster. To achieve this, configure map to be
replicated by adding the `wan-replication-ref` element in the map configuration as shown below.

```xml
<hazelcast>
  <wan-replication name="my-wan-cluster">
    ...
  </wan-replication>
  <map name="my-shared-map">
    <wan-replication-ref name="my-wan-cluster">
       <merge-policy>com.hazelcast.map.merge.PassThroughMergePolicy</merge-policy>
      ...
    </wan-replication-ref>
  </map>
  ...
</hazelcast>
```
You see that we have `my-shared-map` configured to replicate itself to the cluster targets defined in the earlier
`wan-replication` element.

When using Active-Active Replication, multiple clusters can simultaneously update the same entry in a distributed data structure.
You can configure a merge policy to resolve these potential conflicts, as shown in the above example configuration (using the `merge-policy` sub-element under the `wan-replication-ref` element).

Hazelcast provides the following merge policies for map:

- `com.hazelcast.map.merge.PutIfAbsentMapMergePolicy`: Incoming entry merges from the source map to the target map if it does not exist in the target map.
- `com.hazelcast.map.merge.HigherHitsMapMergePolicy`: Incoming entry merges from the source map to the target map if the source entry has more hits than the target one.
- `com.hazelcast.map.merge.PassThroughMergePolicy`: Incoming entry merges from the source map to the target map unless the incoming entry is not null.
- `com.hazelcast.map.merge.LatestUpdateMapMergePolicy`: Incoming entry merges from the source map to the target map if the source entry has been updated more recently than the target entry. Please note that this merge policy can only be used when the clusters' clocks are in sync.

***RELATED INFORMATION***


*Please refer to the [WAN Replication Configuration section](#wan-replication-configuration) for a full description of Hazelcast WAN Replication configuration.*



