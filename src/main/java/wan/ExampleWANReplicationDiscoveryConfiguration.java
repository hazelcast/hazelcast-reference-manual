import com.hazelcast.config.*;

import java.util.Map;


public class ExampleWANReplicationDiscoveryConfiguration {

    public static void main(String[] args) throws Exception{
//tag::wrdc[]
        Config config = new Config();

        WanBatchPublisherConfig batchPublisherConfig = new WanBatchPublisherConfig()
                .setClusterName("london");

        DiscoveryStrategyConfig discoveryStrategyConfig = new DiscoveryStrategyConfig("com.hazelcast.aws.AwsDiscoveryStrategy");
        discoveryStrategyConfig.addProperty("access-key","test-access-key");
        discoveryStrategyConfig.addProperty("secret-key","test-secret-key");
        discoveryStrategyConfig.addProperty("region","test-region");
        discoveryStrategyConfig.addProperty("iam-role","test-iam-role");
        discoveryStrategyConfig.addProperty("host-header","ec2.test-host-header");
        discoveryStrategyConfig.addProperty("security-group-name","test-security-group-name");
        discoveryStrategyConfig.addProperty("tag-key","test-tag-key");
        discoveryStrategyConfig.addProperty("tag-value","test-tag-value");
        discoveryStrategyConfig.addProperty("hz-port",5702);

        DiscoveryConfig discoveryConfig = new DiscoveryConfig()
                .addDiscoveryStrategyConfig(discoveryStrategyConfig);
        batchPublisherConfig.setDiscoveryConfig(discoveryConfig);

        WanReplicationConfig wrConfig = new WanReplicationConfig()
                .setName("london-wan-rep")
                .addBatchReplicationPublisherConfig(batchPublisherConfig);
        config.addWanReplicationConfig(wrConfig);

        config.getMapConfig("replicatedMap").setWanReplicationRef(new WanReplicationRef().setName("london-wan-rep"));
        config.getCacheConfig("replicatedCache").setWanReplicationRef(new WanReplicationRef().setName("london-wan-rep"));
//end::wrdc[]
    }
}
