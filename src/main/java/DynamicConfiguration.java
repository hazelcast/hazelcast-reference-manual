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

        // need to configure another map with no sync backups
        MapConfig noBackupsMap = new MapConfig("dont-backup").setBackupCount(0);

        // DO NOT DO THIS -- never modify the original Config object
        // config.addMapConfig(noBackupsMap);

        // Instead do this. The added config will be propagated to all members of the cluster
        instance.getConfig().addMapConfig(noBackupsMap);
      //end::dynconf[]        
    }
}