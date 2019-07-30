import com.hazelcast.config.*;

import java.util.Map;


public class ExampleWANReplicationConfiguration {

    public static void main(String[] args) throws Exception{
//tag::wrc[]
        Config config = new Config();

        WanReplicationConfig wrConfig = new WanReplicationConfig();
        wrConfig.setName("my-wan-cluster-batch");
        
        WanBatchReplicationPublisherConfig publisherConfig = new WanBatchReplicationPublisherConfig()
        			.setEndpoint("my-wan-cluster-batch")
        			.setTargetEndpoints("my-wan-cluster-batch.hazelcast.com:8765")
        			.setGroupName("london")
        			.setClassName("com.hazelcast.enterprise.wan.replication.WanBatchReplication")
        			.setQueueCapacity(1000)
        			.setQueueFullBehavior(WANQueueFullBehavior.THROW_EXCEPTION);

        Map<String, Comparable> props = publisherConfig.getProperties();
        props.put("batch.size", 500);
        props.put("batch.max.delay.millis", 1000);
        props.put("snapshot.enabled", false);
        props.put("response.timeout.millis", 60000);
        props.put("ack.type", WanAcknowledgeType.ACK_ON_OPERATION_COMPLETE.toString());
        props.put("endpoints", "10.3.5.1:5701,10.3.5.2:5701");
        props.put("group.password", "london-pass");
        props.put("discovery.period", "20");
        props.put("executorThreadCount", "2");

        wrConfig.addWanBatchReplicationPublisherConfig(publisherConfig);
        config.addWanReplicationConfig(wrConfig);
//end::wrc[]
    }
}
