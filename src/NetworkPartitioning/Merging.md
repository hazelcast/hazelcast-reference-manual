
## How Hazelcast Split Brain Merge Happens

Here is, step by step, how Hazelcast split brain merge happens:

1. The oldest member of the cluster checks if there is another cluster with the same *group-name* and *group-password* in the network.
2. If the oldest member finds such a cluster, then it figures out which cluster should merge to the other.
3. Each member of the merging cluster will do the following.

- Pause.
- Take locally owned map entries.
- Close all of its network connections (detach from its cluster).
- Join to the new cluster.
- Send merge request for each of its locally owned map entry.
- Resume.
	
Each member of the merging cluster rejoins the new cluster and sends a merge request for each of its locally owned map entries. Two important points:

-	The smaller cluster will merge into the bigger one. If they have equal number of members then a hashing algorithm determines the merging cluster.
-	Each cluster may have different versions of the same key in the same map. The destination cluster will decide how to handle merging entry based on the `MergePolicy` set for that map. There are built-in merge policies such as `PassThroughMergePolicy`, `PutIfAbsentMapMergePolicy`, `HigherHitsMapMergePolicy` and `LatestUpdateMapMergePolicy`. You can develop your own merge policy by implementing `com.hazelcast.map.merge.MapMergePolicy`. You should set the full class name of your implementation to the `merge-policy` configuration.


```java
public interface MergePolicy {
  /**
  * Returns the value of the entry after the merge
  * of entries with the same key. Returning value can be
  * You should consider the case where existingEntry is null.
  *
  * @param mapName       name of the map
  * @param mergingEntry  entry merging into the destination cluster
  * @param existingEntry existing entry in the destination cluster
  * @return final value of the entry. If returns null then entry will be removed.
  */
  Object merge( String mapName, EntryView mergingEntry, EntryView existingEntry );
}
```

