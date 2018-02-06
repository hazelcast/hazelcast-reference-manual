
### ICache Partition Lost Listener

You can listen to `CachePartitionLostEvent` instances by registering an implementation
of `CachePartitionLostListener`, which is also a sub-interface of `java.util.EventListener`
from `ICache`.

Let's consider the following example code:

```java
public class PartitionLostListenerUsage {


    public static void main(String[] args) {
        CachingProvider cachingProvider = Caching.getCachingProvider();
        CacheManager cacheManager = cachingProvider.getCacheManager();
        Cache<Object, Object> cache = cacheManager.getCache( ... );

        ICache<Object, Object> unwrappedCache = cache.unwrap( ICache.class );

        unwrappedCache.addPartitionLostListener(new CachePartitionLostListener() {
            @Override
            public void partitionLost(CachePartitionLostEvent event) {
                System.out.println(event);
            }
        });
    }
}
```

Within this example code, a `CachePartitionLostListener` implementation is registered to a cache and assumes that this cache is configured with one backup. For this particular cache and any of the partitions in the
system, if the partition owner member and its first backup member crash simultaneously, the
given `CachePartitionLostListener` receives a
corresponding `CachePartitionLostEvent`. If only a single member crashes in the cluster,
a `CachePartitionLostEvent` is not fired for this cache since backups for the partitions
owned by the crashed member are kept on other members.

Please refer to the [Partition Lost Listener section](#listening-for-partition-lost-events) for more
information about partition lost detection and partition lost events.

