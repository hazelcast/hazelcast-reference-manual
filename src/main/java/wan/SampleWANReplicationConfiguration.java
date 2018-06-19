import com.hazelcast.config.*;

import java.util.Map;


public class SampleWANReplicationConfiguration {

    public static void main(String[] args) throws Exception{
//tag::wrc[]
        Config config = new Config();

        WanReplicationConfig wrConfig = new WanReplicationConfig();
        wrConfig.setName("my-wan-cluster-batch");

        WanPublisherConfig publisherConfig = new WanPublisherConfig();
        publisherConfig.setGroupName("london");
        publisherConfig.setClassName("com.hazelcast.enterprise.wan.replication.WanBatchReplication");
        publisherConfig.setQueueFullBehavior(WANQueueFullBehavior.THROW_EXCEPTION);
        publisherConfig.setQueueCapacity(1000);

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

        wrConfig.addWanPublisherConfig(publisherConfig);
        config.addWanReplicationConfig(wrConfig);
//end::wrc[]
    }
}
