### JCache Split-Brain

Split-Brain handling is internally supported as a service inside Hazelcast (see [Network Partitioning](#network-partitioning-split-brain-syndrome) for more details) and `JCache` uses same infrastructure with `IMap` to support Split-Brain. You can specify cache merge policy to determine which entry is used while merging. You can also provide your own cache merge policy by implementing `CacheMergePolicy` interface.

![image](images/NoteSmall.jpg) ***NOTE:*** *Split-Brain is only supported for heap-based JCache but not for HD-JCache, since merging a high volume of data in consistent way may cause significant performance loss on the system.*

#### `CacheMergePolicy` Interface

After split clusters are joined again, they merge their entries with each other. This merge process is handled over the `CacheMergePolicy` interface.
The `CacheMergePolicy` instance takes two entries: the owned entry, and the merging entry which comes from the joined cluster. The `CacheEntryView` instance wraps the key, value, and some metadata about the entry (such as creation time, expiration time, and access hit). Then the `CacheMergePolicy` instance selects one of the entries and returns it.
The returned entry is used as the stored cache entry.

##### `CacheEntryView`

Wraps key, value and some metadata (such as expiration time, last access time, and access hit of cache entry) and exposes them to outside as read only.

##### `CacheMergePolicy`

Policy for merging cache entries. Entries from joined clusters are merged by using this policy to select one of them from source and target. 
Passed `CacheEntryView` instances wrap the key and value as their original types, with conversion to object from their storage types. 
If the user doesn't need the original types of key and value, you should use `StorageTypeAwareCacheMergePolicy`, which is a sub-type of this interface.

##### `StorageTypeAwareCacheMergePolicy` 

Marker interface indicating that the key and value wrapped by `CacheEntryView` will be not converted to their original types. 
The motivation of this interface is that while merging cache entries, actual key and value are not usually not checked. Therefore, there is no need to convert them to their original types.

At worst case, value is returned from the merge method as selected, meaning that in all cases, value is accessed. So even if the the conversion is done as lazy, it will be processed at this point. By default, key and value are converted to their original types unless this `StorageTypeAwareCacheMergePolicy` is used.

Another motivation for using this interface is that at the member side, there is no need to locate classes of stored entries. Entries can be put from the client with `BINARY` in-memory format and the classpath of the client can be different from the member. So in this case, if entries try to convert to their original types while merging, `ClassNotFoundException` is thrown here.

As a result, both for performance and for the `ClassNotFoundException` mentioned above, it is strongly recommended that you use this interface if the original values of key and values are not needed.

#### Configuration

There are four built-in cache merge policies:
- **Pass Through:** Merges cache entry from source to destination directly. You can specify this policy with its full class name as `com.hazelcast.cache.merge.PassThroughCacheMergePolicy` or with its constant name as `PASS_THROUGH`.
- **Put If Absent:** Merges cache entry from source to destination if it does not exist in the destination cache. You can specify this policy with its full class name as `com.hazelcast.cache.merge.PutIfAbsentCacheMergePolicy` or with its constant name as `PUT_IF_ABSENT`.
- **Higher Hits:** Merges cache entry from source to destination cache if the source entry has more hits than the destination one. You can specify this policy with its full class name as `com.hazelcast.cache.merge.HigherHitsCacheMergePolicy` or with its constant name as `HIGHER_HITS`.
- **Latest Access:** Merges cache entry from source to destination cache if the source entry has been accessed more recently than the destination entry. You can specify this policy with its full class name as `com.hazelcast.cache.merge.LatestAccessCacheMergePolicy` or with its constant name as `LATEST_ACCESS`.

![image](images/NoteSmall.jpg) ***NOTE:*** *Since 3.9, the default `Cache` merge policy is put-if-absent. Up to version 3.8, the default `Cache` merge policy was pass-through.*

You can access full class names or constant names of all built-in cache merge policies over `com.hazelcast.cache.BuiltInCacheMergePolicies` enum. You can specify merge policy configuration for cache declaratively or programmatically.

The following are example configurations for JCache Split-Brain.

**Declarative**:

```xml
<cache name="cacheWithBuiltInMergePolicyAsConstantName">
    ...
    <merge-policy>HIGHER_HITS</merge-policy>
    ...
</cache><cache name="cacheWithBuiltInMergePolicyAsFullClassName">
    ...
    <merge-policy>com.hazelcast.cache.merge.LatestAccessCacheMergePolicy</merge-policy>
    ...
</cache>
<cache name="cacheWithBuiltInMergePolicyAsCustomImpl">
    ...
    <merge-policy>com.mycompany.cache.merge.MyCacheMergePolicy</merge-policy>
    ...
</cache>
```

**Programmatic**:

```java
CacheConfig cacheConfigWithBuiltInMergePolicyAsConstantName = new CacheConfig();
cacheConfig.setMergePolicy(BuiltInCacheMergePolicies.HIGGER_HITS.name());
  
CacheConfig cacheConfigWithBuiltInMergePolicyAsFullClassName = new CacheConfig();
cacheConfig.setMergePolicy(BuiltInCacheMergePolicies.LATEST_ACCESS.getImplementationClassName());
  
CacheConfig cacheConfigWithBuiltInMergePolicyAsCustomImpl = new CacheConfig();
cacheConfig.setMergePolicy("com.mycompany.cache.merge.MyCacheMergePolicy");
```
