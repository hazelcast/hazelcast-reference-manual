import javax.cache.Cache;
import javax.cache.CacheManager;
import javax.cache.Caching;
import javax.cache.configuration.CompleteConfiguration;
import javax.cache.configuration.MutableConfiguration;
import javax.cache.spi.CachingProvider;

public class SampleJCacheApplication {

    public static void main(String[] args){
//tag::jcacheapp[]
        // Retrieve the CachingProvider which is automatically backed by
        // the chosen Hazelcast member or client provider.
        CachingProvider cachingProvider = Caching.getCachingProvider();

        // Create a CacheManager.
        CacheManager cacheManager = cachingProvider.getCacheManager();

        // Create a simple but typesafe configuration for the cache.
        CompleteConfiguration<String, String> config =
                new MutableConfiguration<String, String>()
                        .setTypes( String.class, String.class );

        // Create and get the cache.
        Cache<String, String> cache = cacheManager.createCache( "example", config );
        // Alternatively to request an already existing cache:
        // Cache<String, String> cache = cacheManager
        //     .getCache( name, String.class, String.class );

        // Put a value into the cache.
        cache.put( "world", "Hello World" );

        // Retrieve the value again from the cache.
        String value = cache.get( "world" );

        // Print the value 'Hello World'.
        System.out.println( value );
//end::jcacheapp[]
    }
}