### JCache Split-Brain

Split-Brain handling is internally supported as a service inside Hazelcast (see [Network Partitioning](#network-partitioning-split-brain-syndrome) for more details) and `JCache` uses same infrastructure with `IMap` to support Split-Brain. So users can specify cache merge policy to determine which entry is used while merging. They can also provide their own cache merge policy implementations through `CacheMergePolicyInterface`.

**P.S:** Split-Brain is only supported for heap based JCache but not for HD-JCache since merging high volume of data in consistent way may cause significant performance loss on the system.

#### API

After splitted clusters joined again, they merge their entries with each other and this merge process is handle over `CacheMergePolicy` interface.
`CacheMergePolicy` instance takes two (owned entry and merging entry which comes from joined cluster) `CacheEntryView` instance (which wraps the key, value and some metadata about entry such as creation time, expiration time and access hit) then selects one of them and return it.
So the returned entry is used as stored cache entry.

##### `CacheEntryView` 
Wraps key, value and some metadata such as expiration time, last access time and access hit of cache entry and exposes them to outside as read only.

##### `CacheMergePolicy`
Policy for merging cache entries. Entries from joined clusters are merged by selecting one of them from source and target over this policy. 
Passed `CacheEntryView` instances wraps the key and value as their original types with convertion to object from their storage types. 
If user doesn't need to original types of key and value, (s)he should use `StorageTypeAwareCacheMergePolicy` which is sub-type of this interface.

##### `StorageTypeAwareCacheMergePolicy` 
Marker interface for indicating that key and value wrapped by `CacheEntryView` will be not converted to their original types. 
The motivation of this interface is that generally while merging cache entries, actual key and value is not checked. So no need to convert them to their original types. 
At worst case, value is returned from the merge method as selected and this means that at all cases value is accessed. So even the the convertion is done as lazy, it will be processed at this point. But by default, they (key and value) converted to their original types unless this `StorageTypeAwareCacheMergePolicy` is used. 
Another motivation for using this interface is that at server side there is no need to locate classes of stored entries. It means that entries can be put from client with `BINARY` in-memory format and classpath of client can be different from server. So in this case, if entries are tried to convert to their original types while merging, `ClassNotFoundException` is thrown here. 
As a result, both of performance and `ClassNotFoundException` as mentioned above, it is strongly recommended to use this interface if original values of key and values are not needed.

#### Configuration

There are four built-in cache merge policies:
- **Pass Through:** Merges cache entry from source to destination directly. It can be specified with its full class name as `com.hazelcast.cache.merge.PassThroughCacheMergePolicy` or with its constant name as `PASS_THROUGH`.
- **Put If Absent:** Merges cache entry from source to destination if it does not exist in the destination cache.  It can be specified with its full class name as `com.hazelcast.cache.merge.PutIfAbsentCacheMergePolicy` or with its constant name as`PUT_IF_ABSENT`.
- **Higher Hits:** Merges cache entry from source to destination cache if source entry has more hits than the destination one. It can be specified with its full class name as `com.hazelcast.cache.merge.HigherHitsCacheMergePolicy`or with its constant name as`HIGHER_HITS`.
- **Latest Access:** Merges cache entry from source to destination cache if source entry has been accessed more recently than the destination entry. It can be specified with its full class name as `com.hazelcast.cache.merge.LatestAccessCacheMergePolicy`or with its constant name as`LATEST_ACCESS`.

You can access full class names or constant names of all build-in cache merge policies over `com.hazelcast.cache.BuiltInCacheMergePolicies` enum. User can specify merge policy configuration for cache declaratively or programmatically.

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
