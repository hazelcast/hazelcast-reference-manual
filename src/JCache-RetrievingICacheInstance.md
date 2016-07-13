
### Retrieving an ICache Instance

Besides [Scoping to Join Clusters](#scoping-to-join-clusters) and [Namespacing](#namespacing), which are implemented using the URI feature of the
specification, all other extended operations are required to retrieve the `com.hazelcast.cache.ICache` interface instance from
the JCache `javax.cache.Cache` instance. For Hazelcast, both interfaces are implemented on the same object instance. It
is recommended that you stay with the specification method to retrieve the `ICache` version, since `ICache` might be subject to change without notification.

To retrieve or unwrap the `ICache` instance, you can execute the following code example:

```java
CachingProvider cachingProvider = Caching.getCachingProvider();
CacheManager cacheManager = cachingProvider.getCacheManager();
Cache<Object, Object> cache = cacheManager.getCache( ... );

ICache<Object, Object> unwrappedCache = cache.unwrap( ICache.class );
```

After unwrapping the `Cache` instance into an `ICache` instance, you have access to all of the following operations, e.g.,
[ICache Async Methods](#icache-async-methods) and [ICache Convenience Methods](#icache-convenience-methods).

