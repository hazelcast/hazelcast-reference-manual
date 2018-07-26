import com.hazelcast.config.*;
import com.hazelcast.config.EvictionConfig.MaxSizePolicy;


public class NearCacheConfigurationSample {

    public static void main(String[] args) throws Exception{
//tag::nearcacheconfig[]
        EvictionConfig evictionConfig = new EvictionConfig()
                .setMaximumSizePolicy(MaxSizePolicy.ENTRY_COUNT)
                .setEvictionPolicy(EvictionPolicy.LRU)
                .setSize( 1 );

        NearCachePreloaderConfig preloaderConfig = new NearCachePreloaderConfig()
                .setEnabled(true)
                .setDirectory("nearcache-example")
                .setStoreInitialDelaySeconds( 1 )
                .setStoreIntervalSeconds( 2 );

        NearCacheConfig nearCacheConfig = new NearCacheConfig()
                .setName("myDataStructure")
                .setInMemoryFormat(InMemoryFormat.BINARY)
                .setSerializeKeys(true)
                .setInvalidateOnChange(false)
                .setTimeToLiveSeconds( 1 )
                .setMaxIdleSeconds( 5 )
                .setEvictionConfig(evictionConfig)
                .setCacheLocalEntries(true)
                .setLocalUpdatePolicy(NearCacheConfig.LocalUpdatePolicy.CACHE_ON_UPDATE)
                .setPreloaderConfig(preloaderConfig);
//end::nearcacheconfig[]
    }
}
