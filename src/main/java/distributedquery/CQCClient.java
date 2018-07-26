import com.hazelcast.client.HazelcastClient;
import com.hazelcast.client.config.ClientConfig;
import com.hazelcast.config.QueryCacheConfig;
import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.core.IMap;
import com.hazelcast.map.QueryCache;
import com.hazelcast.query.Predicate;

import java.util.Map;

public class CQCClient {

    public static void main(String[] args) throws Exception{
//tag::cqcclient[]
        QueryCacheConfig queryCacheConfig = new QueryCacheConfig("cache-name");
        queryCacheConfig.getPredicateConfig().setImplementation(new OddKeysPredicate());

        ClientConfig clientConfig = new ClientConfig();
        clientConfig.addQueryCacheConfig("map-name", queryCacheConfig);

        HazelcastInstance client = HazelcastClient.newHazelcastClient(clientConfig);
        IMap<Integer, Integer> clientMap = (IMap) client.getMap("map-name");

        QueryCache<Integer, Integer> cache = clientMap.getQueryCache("cache-name");
//end::cqcclient[]
    }

    private static class OddKeysPredicate implements Predicate<Integer, Integer> {

        @Override
        public boolean apply(Map.Entry<Integer, Integer> entry) {
            return entry.getKey() % 2 != 0;
        }
    }
}
