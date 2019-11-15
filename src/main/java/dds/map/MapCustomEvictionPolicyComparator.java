package dds.map;

import com.hazelcast.config.Config;
import com.hazelcast.core.EntryView;
import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.map.IMap;
import com.hazelcast.map.MapEvictionPolicyComparator;
import com.hazelcast.map.listener.EntryEvictedListener;

import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;

import static com.hazelcast.config.MaxSizePolicy.PER_NODE;
import static java.lang.String.format;
import static java.lang.System.out;
import static java.util.concurrent.TimeUnit.SECONDS;
import static java.util.concurrent.locks.LockSupport.parkNanos;

//tag::mcep[]
public class MapCustomEvictionPolicyComparator {

    public static void main(String[] args) {
        Config config = new Config();
        config.getMapConfig("test")
                .getEvictionConfig()
                .setComparator(new OddEvictor())
                .setMaxSizePolicy(PER_NODE)
                .setSize(10000);

        HazelcastInstance instance = Hazelcast.newHazelcastInstance(config);
        IMap<Integer, Integer> map = instance.getMap("test");

        final Queue<Integer> oddKeys = new ConcurrentLinkedQueue<Integer>();
        final Queue<Integer> evenKeys = new ConcurrentLinkedQueue<Integer>();

        map.addEntryListener((EntryEvictedListener<Integer, Integer>) event -> {
            Integer key = event.getKey();
            if (key % 2 == 0) {
                evenKeys.add(key);
            } else {
                oddKeys.add(key);
            }
        }, false);

        // wait some more time to receive evicted-events
        parkNanos(SECONDS.toNanos(5));

        for (int i = 0; i < 15000; i++) {
            map.put(i, i);
        }

        String msg = "IMap uses sampling based eviction. After eviction"
                + " is completed, we are expecting number of evicted-odd-keys"
                + " should be greater than number of evicted-even-keys. \nNumber"
                + " of evicted-odd-keys = %d, number of evicted-even-keys = %d";
        out.println(format(msg, oddKeys.size(), evenKeys.size()));

        instance.shutdown();
    }

    /**
     * Odd evictor tries to evict odd keys first.
     */
    private static class OddEvictor
            implements MapEvictionPolicyComparator<Integer, Integer> {

        @Override
        public int compare(EntryView<Integer, Integer> e1,
                           EntryView<Integer, Integer> e2) {

            Integer key1 = e1.getKey();
            if (key1 % 2 != 0) {
                return -1;
            }

            Integer key2 = e2.getKey();
            if (key2 % 2 != 0) {
                return 1;
            }

            return 0;
        }

    }
}
//end::mcep[]