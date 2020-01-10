import com.hazelcast.collection.IQueue;
import com.hazelcast.collection.LocalQueueStats;
import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;

public class ExampleQueueStats {

    public static void main(String[] args) throws Exception{
        //tag::qs[]
        HazelcastInstance node = Hazelcast.newHazelcastInstance();
        IQueue<Integer> orders = node.getQueue( "orders" );
        LocalQueueStats queueStatistics = orders.getLocalQueueStats();
        System.out.println( "average age of items = "
                + queueStatistics.getAverageAge() );
        //end::qs[]
    }
}