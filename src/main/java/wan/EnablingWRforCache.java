import com.hazelcast.config.Config;
import com.hazelcast.config.WanReplicationConfig;
import com.hazelcast.config.WanReplicationRef;


public class EnablingWRforCache {

    public static void main(String[] args) throws Exception{
//tag::wrcache[]
        Config config = new Config();

        WanReplicationConfig wrConfig = new WanReplicationConfig();
        wrConfig.setName("my-wan-cluster");

        config.addWanReplicationConfig(wrConfig);

        WanReplicationRef cacheWanRef = new WanReplicationRef();
        cacheWanRef.setName("my-wan-cluster");
        cacheWanRef.setMergePolicy("com.hazelcast.cache.merge.PassThroughCacheMergePolicy");
        cacheWanRef.setRepublishingEnabled(true);
        config.getCacheConfig("my-shared-cache").setWanReplicationRef(cacheWanRef);
//end::wrcache[]
    }
}
