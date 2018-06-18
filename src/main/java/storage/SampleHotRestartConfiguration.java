import com.hazelcast.config.*;

import java.io.File;


public class SampleHotRestartConfiguration {

    public static void main(String[] args) throws Exception{
//tag::hrconf[]
        Config config = new Config();
        HotRestartPersistenceConfig hotRestartPersistenceConfig = new HotRestartPersistenceConfig()
        .setEnabled(true)
        .setBaseDir(new File("/mnt/hot-restart"))
        .setParallelism(1)
        .setValidationTimeoutSeconds(120)
        .setDataLoadTimeoutSeconds(900)
        .setClusterDataRecoveryPolicy(HotRestartClusterDataRecoveryPolicy.FULL_RECOVERY_ONLY);
        config.setHotRestartPersistenceConfig(hotRestartPersistenceConfig);


        MapConfig mapConfig = config.getMapConfig("test-map");
        mapConfig.getHotRestartConfig().setEnabled(true);


        CacheSimpleConfig cacheConfig = config.getCacheConfig("test-cache");
        cacheConfig.getHotRestartConfig().setEnabled(true);
//end::hrconf[]
    }
}
