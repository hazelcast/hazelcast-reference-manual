import com.hazelcast.config.Config;
import com.hazelcast.config.MapConfig;
import com.hazelcast.config.QueryCacheConfig;
import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.core.IMap;
import com.hazelcast.query.Predicate;

import java.util.Map;

public class CQC {

    public static void main(String[] args) throws Exception{
//tag::cqc[]
        QueryCacheConfig queryCacheConfig = new QueryCacheConfig("cache-name");
        queryCacheConfig.getPredicateConfig().setImplementation(new OddKeysPredicate());

        MapConfig mapConfig = new MapConfig("map-name");
        mapConfig.addQueryCacheConfig(queryCacheConfig);

        Config config = new Config();
        config.addMapConfig(mapConfig);

        HazelcastInstance node = Hazelcast.newHazelcastInstance(config);
        IMap<Integer, String> map = (IMap) node.getMap("map-name");
//end::cqc[]
    }

    private static class OddKeysPredicate implements Predicate<Integer, Integer> {

        @Override
        public boolean apply(Map.Entry<Integer, Integer> entry) {
            return entry.getKey() % 2 != 0;
        }
    }
}
