

Hazelcast deploys a background task that periodically searches for split clusters. When a split is detected, the side that will going to initiate merge process is decided. This decision is based on the size of clusters; the smaller cluster will merge into the bigger one. If they have equal number of members then a hashing algorithm determines the merging cluster. When deciding the merging side, both sides ensure that there's no intersection in their member lists.

After merging side is decided, master (the eldest) member of the merging cluster initiates the cluster merge process by sending merge instruction to the members in its cluster.
While recovering from partitioning, Hazelcast uses merge policies for some data structures to resolve data conflicts between split clusters. A merge policy is a callback function to resolve conflicts between the existing and merging records. Hazelcast provides an interface to be implemented and also few built-in policies ready to use.

Remaining data structures discard the data from merging side.

Each member of the merging cluster will do the following:

- Pause.
- Take a snapshot of local data structures those support merge policies.
- Discard all data structure data.
- Close all of its network connections (detach from its cluster).
- Join to the new cluster.
- Send merge requests to the new cluster for local snapshot.
- Resume.

### Merge Policies

Only `IMap`, `ICache` and `ReplicatedMap` support merge policies. `IMap` and `ReplicatedMap` use `com.hazelcast.map.merge.MapMergePolicy`. `ICache` uses `com.hazelcast.cache.CacheMergePolicy`. They are very similar interfaces with some minor differences in parameters.

```java
public interface MapMergePolicy extends DataSerializable {

    /**
     * Returns the value of the entry after the merge
     * of entries with the same key.
     * You should consider the case where existingEntry's value is null.
     *
     * @param mapName       name of the map
     * @param mergingEntry  entry merging into the destination cluster
     * @param existingEntry existing entry in the destination cluster
     * @return final value of the entry. If returns null, then the entry will be removed.
     */
    Object merge(String mapName, EntryView mergingEntry, EntryView existingEntry);

}
```

```java
public interface CacheMergePolicy extends Serializable {

    /**
     * <p>
     * Selects one of the merging and existing cache entries to be merged.
     * </p>
     *
     * <p>
     * Note that as mentioned also in arguments, the {@link CacheEntryView} instance that represents existing cache entry
     * may be null if there is no existing entry for the specified key in the the {@link CacheEntryView} instance
     * that represents merging cache entry.
     * </p>
     *
     * @param cacheName     name of the cache
     * @param mergingEntry  {@link CacheEntryView} instance that has cache entry to be merged
     * @param existingEntry {@link CacheEntryView} instance that has existing cache entry.
     *                      This entry may be <code>null</code> if there is no existing cache entry.
     * @return the selected value for merging
     */
    Object merge(String cacheName, CacheEntryView mergingEntry, CacheEntryView existingEntry);
}
```

There are built-in merge policies such as `PassThroughMergePolicy`, `PutIfAbsentMapMergePolicy`, `HigherHitsMapMergePolicy` and `LatestUpdateMapMergePolicy`. Additionally you can develop your own merge policy by implementing the relevant interface. You should set the full class name of your implementation to the merge-policy configuration.  

For more information, please see the [Consistency and Replication Model chapter](/2550_Consistency_and_Replication_Model.md).

### Specifying Merge Policies

Here is how merge policies are specified per map:

```xml
<hazelcast>
  ...
  <map name="default">
    <backup-count>1</backup-count>
    <eviction-policy>NONE</eviction-policy>
    <max-size>0</max-size>
    <eviction-percentage>25</eviction-percentage>
    <!--
      While recovering from split-brain (network partitioning),
      map entries in the small cluster will merge into the bigger cluster
      based on the policy set here. When an entry merges into the
      cluster, there might be an existing entry with the same key already.
      Values of these entries might be different for that same key.
      Which value should be set for the key? Conflict is resolved by
      the policy set here. Default policy is PutIfAbsentMapMergePolicy.

      Following are the built-in merge policies:
      com.hazelcast.map.merge.PassThroughMergePolicy; entry will be added if
          there is no existing entry for the key.
      com.hazelcast.map.merge.PutIfAbsentMapMergePolicy; entry will be
          added if the merging entry doesn't exist in the cluster.
      com.hazelcast.map.merge.HigherHitsMapMergePolicy; entry with the
          higher hits wins.
      com.hazelcast.map.merge.LatestUpdateMapMergePolicy; entry with the
          latest update wins.
    -->
    <merge-policy>MY_MERGE_POLICY_CLASS</merge-policy>
  </map>

  ...
</hazelcast>
```

Here is how merge policies are specified per cache:

```xml
<hazelcast>
  ...
    <cache name="default">
        ...
        <!--       
        While recovering from split-brain (network partitioning), cache entries in the small cluster
        merge into the bigger cluster based on the policy set here.
        When an entry merges into the cluster, an entry with the same key might already exist in the cluster.
        The values of these entries might be different for that same key. Which value should be set for the
        key? The conflict is resolved by the policy set here.

        There are built-in merge policies, such as:
        com.hazelcast.cache.merge.PassThroughCacheMergePolicy or PASS_THROUGH:
            The entry will be added directly even though there is an existing entry for the key.
        com.hazelcast.cache.merge.PutIfAbsentCacheMergePolicy or PUT_IF_ABSENT:
            The entry will be added if there is no existing entry for the key.
        com.hazelcast.cache.merge.HigherHitsCacheMergePolicy or HIGHER_HITS:
            The entry with the higher number of hits wins.
        com.hazelcast.cache.merge.LatestAccessCacheMergePolicy or LATEST_ACCESS:
            The entry which has been accessed more recently wins.

        Default policy is com.hazelcast.cache.merge.PutIfAbsentCacheMergePolicy
        -->
        <merge-policy>MY_MERGE_POLICY_CLASS</merge-policy>        
    </cache>
    ...
</hazelcast>    
```

![image](../images/NoteSmall.jpg) ***NOTE:*** *IMap, ICache and ReplicatedMap are  the only Hazelcast distributed data structures that merge after a split-brain syndrome. For the other data structures, e.g., Queue, Topic, Lock and IdGenerator, one instance from the larger cluster is chosen after split-brain syndrome.*

![image](../images/NoteSmall.jpg) ***NOTE:*** *Currently, merge functionality is not supported for High-Density Memory Store backed IMap and ICache data structures. Data on the smaller cluster side belonging to IMap and ICache instances with `NATIVE` in-memory format are discarded during the merge process.*

