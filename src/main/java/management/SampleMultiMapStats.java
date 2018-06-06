import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.core.MultiMap;
import com.hazelcast.monitor.LocalMultiMapStats;


public class SampleMultiMapStats {

    public static void main(String[] args) throws Exception{
//tag::mms[]
        HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
        MultiMap<String, String> customers = hazelcastInstance.getMultiMap( "customers" );
        LocalMultiMapStats multiMapStatistics = customers.getLocalMultiMapStats();
        System.out.println( "last update time =  "
                + multiMapStatistics.getLastUpdateTime() );
 //end::mms[]
    }
}
