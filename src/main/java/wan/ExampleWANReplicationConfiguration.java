import com.hazelcast.config.*;

import java.util.Map;


public class ExampleWANReplicationConfiguration {

    public static void main(String[] args) throws Exception{
//tag::wrc[]
        WanReplicationConfig wrConfig = new WanReplicationConfig()
                .setName("my-wan-cluster-batch");

        WanBatchPublisherConfig publisherConfig = new WanBatchPublisherConfig()
                .setClusterName("london")
                .setQueueFullBehavior(WanQueueFullBehavior.THROW_EXCEPTION)
                .setQueueCapacity(1000)
                .setBatchSize(500)
                .setBatchMaxDelayMillis(1000)
                .setSnapshotEnabled(false)
                .setResponseTimeoutMillis(60000)
                .setAcknowledgeType(WanAcknowledgeType.ACK_ON_OPERATION_COMPLETE)
                .setTargetEndpoints("10.3.5.1:5701,10.3.5.2:5701")
                .setDiscoveryPeriodSeconds(20)
                .setEndpoint("my-wan-cluster-batch");
//end::wrc[]
    }
}
