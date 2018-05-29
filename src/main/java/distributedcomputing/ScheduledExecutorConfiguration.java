import com.hazelcast.config.Config;
import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.scheduledexecutor.IScheduledExecutorService;


public class ScheduledExecutorConfiguration {
    public static void main(String[] args) throws Exception{
//tag::sec[]
        Config config = new Config();
        config.getScheduledExecutorConfig( "myScheduledExecSvc" )
                .setPoolSize ( 16 )
                .setCapacity( 100 )
                .setDurability( 1 )
                .setQuorumName( "quorumname" );

        HazelcastInstance hazelcast = Hazelcast.newHazelcastInstance(config);
        IScheduledExecutorService myScheduledExecSvc = hazelcast.getScheduledExecutorService("myScheduledExecSvc");
//end::sec[]
    }
}
