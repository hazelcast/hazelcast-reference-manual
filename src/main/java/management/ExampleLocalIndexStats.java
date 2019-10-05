import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.map.IMap;
import com.hazelcast.config.IndexConfig;
import com.hazelcast.config.IndexType;
import com.hazelcast.monitor.LocalIndexStats;
import com.hazelcast.monitor.LocalMapStats;

import java.util.Map;

public class ExampleLocalIndexStats {

    public static void main(String[] args) {
        //tag::lis[]
        HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
        IMap<String, String> customers = hazelcastInstance.getMap("customers");        
        addIndex(customers, "name", true); // or add the index using the map config
        LocalMapStats mapStatistics = customers.getLocalMapStats();
        Map<String, LocalIndexStats> indexStats = mapStatistics.getIndexStats();
        LocalIndexStats nameIndexStats = indexStats.get("name");
        System.out.println("average name index hit selectivity on this member = "
                + nameIndexStats.getAverageHitSelectivity());
        //end::lis[]
       
    }
    
        protected static void addIndex(IMap map, String attribute, boolean ordered) {
        IndexConfig config = new IndexConfig(ordered ? IndexType.SORTED : IndexType.HASH, attribute).setName(attribute);

        map.addIndex(config);
    }
}