import com.hazelcast.config.*;

import java.util.Map;


public class MinimalActiveActiveConfiguration2 {

    public static void main(String[] args) throws Exception{
//tag::wrc[]
        Config config = new Config();
        config.setClusterName("london");
        WanBatchPublisherConfig batchPublisherConfig = new WanBatchPublisherConfig()
                .setClusterName("tokyo")
                .setTargetEndpoints("32.1.1.1:5701");

        WanReplicationConfig wrConfig = new WanReplicationConfig()
                .setName("tokyo-wan-rep")
                .addBatchReplicationPublisherConfig(batchPublisherConfig);

        config.addWanReplicationConfig(wrConfig);

        config.getMapConfig("replicatedMap").setWanReplicationRef(new WanReplicationRef().setName("tokyo-wan-rep"));
//end::wrc[]
    }
}
