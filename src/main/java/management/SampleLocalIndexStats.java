import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.core.IMap;
import com.hazelcast.monitor.LocalIndexStats;
import com.hazelcast.monitor.LocalMapStats;

import java.util.Map;

public class SampleLocalIndexStats {

    public static void main(String[] args) {
//tag::lis[]
        HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
        IMap<String, String> customers = hazelcastInstance.getMap("customers");
        LocalMapStats mapStatistics = customers.getLocalMapStats();
        Map<String, LocalIndexStats> indexStats = mapStatistics.getIndexStats();
        LocalIndexStats nameIndexStats = indexStats.get("name");
        System.out.println("average name index hit selectivity on this member = "
                + nameIndexStats.getAverageHitSelectivity());
//end::lis[]
    }

}
