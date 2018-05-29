import com.hazelcast.config.Config;
import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.durableexecutor.DurableExecutorService;


public class DurableExecutorConfiguration {
    public static void main(String[] args) throws Exception{
//tag::dec[]
        Config config = new Config();
        config.getDurableExecutorConfig( "myDurableExecSvc" )
                .setPoolSize ( 8 )
                .setDurability( 1 )
                .setCapacity( 1 )
                .setQuorumName( "quorumname" );

        HazelcastInstance hazelcast = Hazelcast.newHazelcastInstance(config);
        DurableExecutorService durableExecSvc = hazelcast.getDurableExecutorService("myDurableExecSvc");
//end::dec[]
    }
}
