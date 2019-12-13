import com.hazelcast.config.*;

import java.util.Map;


public class ExampleWANReplicationDiscoveryConfiguration {

    public static void main(String[] args) throws Exception{
//tag::wrdc[]
        Config config = new Config();

        WanReplicationConfig wrConfig = new WanReplicationConfig();
        wrConfig.setName("my-wan-cluster-batch");

        WanBatchPublisherConfig publisherConfig = new WanBatchPublisherConfig()
                .setClusterName("london")
                .setQueueFullBehavior(WanQueueFullBehavior.THROW_EXCEPTION)
                .setQueueCapacity(1000)
                .setBatchSize(500)
                .setBatchMaxDelayMillis(1000)
                .setSnapshotEnabled(false)
                .setResponseTimeoutMillis(60000)
                .setAcknowledgeType(WanAcknowledgeType.ACK_ON_OPERATION_COMPLETE)
                .setDiscoveryPeriodSeconds(20);

        DiscoveryConfig discoveryConfig = new DiscoveryConfig();

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

        discoveryConfig.addDiscoveryStrategyConfig(discoveryStrategyConfig);
        publisherConfig.setDiscoveryConfig(discoveryConfig);
        wrConfig.addBatchReplicationPublisherConfig(publisherConfig);
        config.addWanReplicationConfig(wrConfig);
//end::wrdc[]
    }
}
