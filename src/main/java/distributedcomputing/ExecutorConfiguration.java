import com.hazelcast.config.Config;
import com.hazelcast.config.ExecutorConfig;


public class ExecutorConfiguration {
    public static void main(String[] args) throws Exception{
//tag::execconf[]
        Config config = new Config();
        ExecutorConfig executorConfig = config.getExecutorConfig("exec");
        executorConfig.setPoolSize( 1 ).setQueueCapacity( 10 )
                .setStatisticsEnabled( true )
                .setQuorumName( "quorumname" );
//end::execconf[]
    }
}
