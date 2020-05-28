import com.hazelcast.config.*;

import java.util.Map;


public class MinimalActiveActiveConfiguration1 {

    public static void main(String[] args) throws Exception{
//tag::wrc[]
        Config config = new Config();
        config.setClusterName("tokyo");
        WanBatchPublisherConfig batchPublisherConfig = new WanBatchPublisherConfig()
                .setClusterName("london")
                .setTargetEndpoints("10.3.5.1:5701");

        WanReplicationConfig wrConfig = new WanReplicationConfig()
                .setName("london-wan-rep")
                .addBatchReplicationPublisherConfig(batchPublisherConfig);

        config.addWanReplicationConfig(wrConfig);

        config.getMapConfig("replicatedMap").setWanReplicationRef(new WanReplicationRef().setName("london-wan-rep"));
//end::wrc[]
    }
}
