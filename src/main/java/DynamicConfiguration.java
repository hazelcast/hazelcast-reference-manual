import com.hazelcast.config.Config;
import com.hazelcast.config.MapConfig;
import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;

public class DynamicConfiguration {
    public static void main(String[] args) {
//tag::dynconf[]
        Config config = new Config();
        MapConfig mapConfig = new MapConfig("sessions");
        config.addMapConfig(mapConfig);
        HazelcastInstance instance = Hazelcast.newHazelcastInstance(config);
        MapConfig noBackupsMap = new MapConfig("dont-backup").setBackupCount(0);
        instance.getConfig().addMapConfig(noBackupsMap);
//end::dynconf[]
    }
}