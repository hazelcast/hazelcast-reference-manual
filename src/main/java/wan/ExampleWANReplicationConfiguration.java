import com.hazelcast.config.*;

import java.util.Map;


public class ExampleWANReplicationConfiguration {

    public static void main(String[] args) throws Exception{
//tag::wrc[]
        Config config = new Config();
        WanBatchPublisherConfig batchPublisherConfig = new WanBatchPublisherConfig()
                .setClusterName("london")
                .setTargetEndpoints("10.3.5.1:5701,10.3.5.2:5701");

        WanConsumerConfig consumerConfig = new WanConsumerConfig()
                .setPersistWanReplicatedData(false);

        WanReplicationConfig wrConfig = new WanReplicationConfig()
                .setName("london-wan-rep")
                .addBatchReplicationPublisherConfig(batchPublisherConfig)
                .setConsumerConfig(consumerConfig);

        config.addWanReplicationConfig(wrConfig);

        config.getMapConfig("replicatedMap").setWanReplicationRef(new WanReplicationRef().setName("london-wan-rep"));
        config.getCacheConfig("replicatedCache").setWanReplicationRef(new WanReplicationRef().setName("london-wan-rep"));
//end::wrc[]
    }
}
