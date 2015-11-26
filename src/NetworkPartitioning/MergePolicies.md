
## Specifying Merge Policies

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
      based on the policy set here. When an entry merge into the
      cluster, there might an existing entry with the same key already.
      Values of these entries might be different for that same key.
      Which value should be set for the key? Conflict is resolved by
      the policy set here. Default policy is hz.ADD_NEW_ENTRY

      There are built-in merge policies such as
      There are built-in merge policies such as
      com.hazelcast.map.merge.PassThroughMergePolicy; entry will be added if
          there is no existing entry for the key.
      com.hazelcast.map.merge.PutIfAbsentMapMergePolicy ; entry will be
          added if the merging entry doesn't exist in the cluster.
      com.hazelcast.map.merge.HigherHitsMapMergePolicy ; entry with the
          higher hits wins.
      com.hazelcast.map.merge.LatestUpdateMapMergePolicy ; entry with the
          latest update wins.
    -->
    <merge-policy>MY_MERGE_POLICY_CLASS</merge-policy>
  </map>

  ...
</hazelcast>
```

![image](images/NoteSmall.jpg) ***NOTE:*** *Map is the only Hazelcast distributed data structure that merges after a split brain syndrome. For the other data structures (e.g. Queue, Topic, IdGenerator, etc. ), one instance of that data structure is chosen after split brain syndrome. *
