
The `java.net.URI`s that don't use the above-mentioned Hazelcast-specific schemes are recognized as namespacing. Those
`CacheManager`s share the same underlying default `HazelcastInstance` created (or set) by the `CachingProvider`, but they cache with the
same names and different namespaces on the `CacheManager` level, and therefore they won't share the same data. This is useful where multiple
applications might share the same Hazelcast JCache implementation, e.g., on application or OSGi servers, but are developed by
independent teams. To prevent interfering on caches using the same name, every application can use its own namespace when
retrieving the `CacheManager`.

Here is an example of using namespacing.

```java
CachingProvider cachingProvider = Caching.getCachingProvider();

URI nsApp1 = new URI( "application-1" );
CacheManager cacheManagerApp1 = cachingProvider.getCacheManager( nsApp1, null );

URI nsApp2 = new URI( "application-2" );
CacheManager cacheManagerApp2 = cachingProvider.getCacheManager( nsApp2, null );
```

That way both applications share the same `HazelcastInstance` instance but not the same caches.

