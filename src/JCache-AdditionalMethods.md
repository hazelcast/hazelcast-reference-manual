
### ICache Convenience Methods

In addition to the operations explained in [ICache Async Methods](#icache-async-methods) and [Defining a Custom ExpiryPolicy](#defining-a-custom-expirypolicy), Hazelcast ICache also provides a set of convenience methods. These methods are not part of the JCache specification.

 - `size()`: Returns the total entry count of the distributed cache.
 - `destroy()`: Destroys the cache and removes its data, which makes it different from the method `javax.cache.Cache::close`; the `close` method closes the cache so no further operational methods (get, put, remove, etc. Please see Section 4.1.6 in JCache Specification which can be downloaded from [here](http://download.oracle.com/otndocs/jcp/jcache-1_0-fr-eval-spec/index.html)) can be executed on it - data is not necessarily destroyed, if you get again the same `Cache` from the same `CacheManager`, the data will be there. In the case of `destroy()`, both the cache is destroyed and cache's data is removed.
 - `isDestroyed()`: Determines whether the ICache instance is destroyed or not.
 - `getLocalCacheStatistics()`: Returns a `com.hazelcast.cache.CacheStatistics` instance, both on Hazelcast members and clients, providing the same statistics data as the JMX beans.

Please refer to the [ICache Javadoc](http://docs.hazelcast.org/docs/latest/javadoc/com/hazelcast/cache/ICache.html) to see all the methods provided by ICache.