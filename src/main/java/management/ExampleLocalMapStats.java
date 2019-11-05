import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.map.IMap;
import com.hazelcast.map.LocalMapStats;

public class ExampleLocalMapStats {

    public static void main(String[] args) throws Exception{
        //tag::lms[]
        HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
        IMap<String, String> customers = hazelcastInstance.getMap( "customers" );
        LocalMapStats mapStatistics = customers.getLocalMapStats();
        System.out.println( "number of entries owned on this member = "
                + mapStatistics.getOwnedEntryCount() );
        //end::lms[]
    }
}