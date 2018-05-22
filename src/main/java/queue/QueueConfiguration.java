import com.hazelcast.config.Config;
import com.hazelcast.config.QueueConfig;


public class QueueConfiguration {
    public static void main( String[] args ) throws Exception {
//tag::queueconf[]
        Config config = new Config();
        QueueConfig queueConfig = config.getQueueConfig("default");
        queueConfig.setName("MyQueue")
                .setBackupCount(1)
                .setMaxSize(0)
                .setStatisticsEnabled(true)
                .setQuorumName("quorumname");
        queueConfig.getQueueStoreConfig()
                .setEnabled(true)
                .setClassName("com.hazelcast.QueueStoreImpl")
                .setProperty("binary", "false");
        config.addQueueConfig(queueConfig);
//end::queueconf[]
    }
}
