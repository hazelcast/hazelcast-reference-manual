import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.map.IMap;
import com.hazelcast.map.LocalMapStats;
import com.hazelcast.nearcache.NearCacheStats;

public class ExampleNearCacheStats {

    public static void main(String[] args) throws Exception{
        //tag::ncs[]
        HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
        IMap<String, String> customers = hazelcastInstance.getMap( "customers" );
        LocalMapStats mapStatistics = customers.getLocalMapStats();
        NearCacheStats nearCacheStatistics = mapStatistics.getNearCacheStats();
        System.out.println( "Near Cache hit/miss ratio = "
                + nearCacheStatistics.getRatio() );
        //end::ncs[]
    }
}