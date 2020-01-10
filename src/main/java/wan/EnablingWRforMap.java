import com.hazelcast.config.Config;
import com.hazelcast.config.WanReplicationConfig;
import com.hazelcast.config.WanReplicationRef;
import com.hazelcast.spi.merge.PassThroughMergePolicy;


public class EnablingWRforMap {

    public static void main(String[] args) throws Exception{
//tag::wrmap[]
        Config config = new Config();

        WanReplicationConfig wrConfig = new WanReplicationConfig();
        wrConfig.setName("my-wan-cluster");

        config.addWanReplicationConfig(wrConfig);

        WanReplicationRef wanRef = new WanReplicationRef();
        wanRef.setName("my-wan-cluster");
        wanRef.setMergePolicyClassName(PassThroughMergePolicy.class.getName());
        wanRef.setRepublishingEnabled(false);
        config.getMapConfig("my-shared-map").setWanReplicationRef(wanRef);
//end::wrmap[]
    }
}
