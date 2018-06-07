import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.core.IExecutorService;
import com.hazelcast.monitor.LocalExecutorStats;

public class SampleExecutorStats {

    public static void main(String[] args) throws Exception{
//tag::es[]
        HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
        IExecutorService orderProcessor = hazelcastInstance.getExecutorService( "orderProcessor" );
        LocalExecutorStats executorStatistics = orderProcessor.getLocalExecutorStats();
        System.out.println( "completed task count = "
                + executorStatistics.getCompletedTaskCount() );
//end::es[]
    }
}
