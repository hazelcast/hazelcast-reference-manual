import com.hazelcast.config.Config;
import com.hazelcast.config.MapConfig;
import com.hazelcast.config.MapStoreConfig;
import com.hazelcast.config.XmlConfigBuilder;
import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.core.IMap;
import com.hazelcast.core.MapStore;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

public class LoadAll {

    public static void main(String[] args) {
        int numberOfEntriesToAdd = 1000;
        String mapName = LoadAll.class.getCanonicalName();

        Config config = createNewConfig(mapName);
        HazelcastInstance node = Hazelcast.newHazelcastInstance(config);

        IMap<Integer, Integer> map = node.getMap(mapName);

        populateMap(map, numberOfEntriesToAdd);

        System.out.printf("# Map store has %d elements\n", numberOfEntriesToAdd);

        map.evictAll();

        System.out.printf("# After evictAll map size: %d\n", map.size());

        map.loadAll(true);

        System.out.printf("# After loadAll map size: %d\n", map.size());
    }

    private static void populateMap(IMap<Integer, Integer> map, int itemCount) {
        for (int i = 0; i < itemCount; i++) {
            map.put(i, i);
        }
    }

    private static Config createNewConfig(String mapName) {
        SimpleStore simpleStore = new SimpleStore();

        MapStoreConfig mapStoreConfig = new MapStoreConfig();
        mapStoreConfig.setImplementation(simpleStore);
        mapStoreConfig.setWriteDelaySeconds(0);

        XmlConfigBuilder configBuilder = new XmlConfigBuilder();
        Config config = configBuilder.build();
        MapConfig mapConfig = config.getMapConfig(mapName);
        mapConfig.setMapStoreConfig(mapStoreConfig);

        return config;
    }

    private static class SimpleStore implements MapStore<Integer, Integer> {

        private ConcurrentMap<Integer, Integer> store = new ConcurrentHashMap<Integer, Integer>();

        @Override
        public void store(Integer key, Integer value) {
            store.put(key, value);
        }

        @Override
        public void storeAll(Map<Integer, Integer> map) {
            Set<Map.Entry<Integer, Integer>> entrySet = map.entrySet();
            for (Map.Entry<Integer, Integer> entry : entrySet) {
                Integer key = entry.getKey();
                Integer value = entry.getValue();
                store(key, value);
            }
        }

        @Override
        public void delete(Integer key) {
        }

        @Override
        public void deleteAll(Collection<Integer> keys) {
        }

        @Override
        public Integer load(Integer key) {
            return store.get(key);
        }

        @Override
        public Map<Integer, Integer> loadAll(Collection<Integer> keys) {
            Map<Integer, Integer> map = new HashMap<Integer, Integer>();
            for (Integer key : keys) {
                Integer value = load(key);
                map.put(key, value);
            }
            return map;
        }

        @Override
        public Set<Integer> loadAllKeys() {
            return store.keySet();
        }
    }
}