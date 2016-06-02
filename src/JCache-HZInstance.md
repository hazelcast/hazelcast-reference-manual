## JCache - Hazelcast Instance Integration

You can retrieve `javax.cache.Cache` instances directly through `HazelcastInstance::getCache(String name)` method.
The parameter `name` in `HazelcastInstance::getCache(String name)` is the full cache name except the Hazelcast prefix, i.e., `/hz/`. 

If you create a cache through a `CacheManager` which has its own specified URI scope (and/or specified classloader), 
it must be prepended to the pure cache name as a prefix while retrieving the cache through `HazelcastInstance::getCache(String name)`. 
Prefix generation for full cache name (except the Hazelcast prefix, which is `/hz/`) is exposed through 
`com.hazelcast.cache.CacheUtil#getPrefixedCacheName(String name, java.net.URI uri, ClassLoader classloader)`. 
If the URI scope and classloader is not specified, the pure cache name can be used directly while retrieving cache over `HazelcastInstance`.

If you have a cache which is not created, but is defined/exists (cache is specified in Hazelcast configuration but not created yet), you can retrieve this cache by its name.  This also triggers cache creation before retrieving it. This retrieval is supported through `HazelcastInstance`. However, `HazelcastInstance` ***does not*** support creating a cache by specifying configuration; this is supported   by Hazelcast's `CacheManager` as it is.

<br></br>
![image](images/NoteSmall.jpg) ***NOTE:*** *If a valid (rather than *1.0.0-PFD* or *0.x* versions) JCache library does not exist on the classpath, `IllegalStateException` is thrown.*
<br></br>

### JCache and Hazelcast Instance Awareness

`HazelcastInstance` is injected into the following cache API interfaces (provided by `javax.cache.Cache` and `com.hazelcast.cache.ICache`)  if they implement `HazelcastInstanceAware` interface:

* `ExpiryPolicyFactory` and `ExpiryPolicy` [provided by `javax.cache.Cache`]
* `CacheLoaderFactory` and `CacheLoader` [provided by `javax.cache.Cache`]
* `CacheWriteFactory` and `CacheWriter` [provided by `javax.cache.Cache`]
* `EntryProcessor` [provided by `javax.cache.Cache`]
* `CacheEntryListener` (`CacheEntryCreatedListener`, `CacheEntryUpdatedListener`, `CacheEntryRemovedListener`, `CacheEntryExpiredListener`) [provided by `javax.cache.Cache`]
* `CacheEntryEventFilter` [provided by `javax.cache.Cache`]
* `CompletionListener` [provided by `javax.cache.Cache`]
* `CachePartitionLostListener` [provided by `com.hazelcast.cache.ICache`]