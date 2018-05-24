import com.hazelcast.config.Config;
import com.hazelcast.config.PNCounterConfig;
import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.crdt.pncounter.PNCounter;


public class PNCounterSample {
    public static void main(String[] args) throws Exception {
//tag::pncc[]
        PNCounterConfig pnCounterConfig = new PNCounterConfig()
                .setReplicaCount(10)
                .setStatisticsEnabled(true);
        Config hazelcastConfig = new Config()
                .addPNCounterConfig(pnCounterConfig);
//end::pncc[]
//tag::pnc[]
        final HazelcastInstance instance = Hazelcast.newHazelcastInstance();
        final PNCounter counter = instance.getPNCounter("counter");
        counter.addAndGet(5);
        final long value = counter.get();
//end::pnc[]
    }

}
