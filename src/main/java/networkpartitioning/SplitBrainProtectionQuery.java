import com.hazelcast.config.Config;
import com.hazelcast.config.MapConfig;
import com.hazelcast.config.SplitBrainProtectionConfig;
import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.splitbrainprotection.SplitBrainProtection;
import com.hazelcast.splitbrainprotection.SplitBrainProtectionService;


public class SplitBrainProtectionQuery {
    public static void main(String[] args) throws Exception{
//tag::qq[]
        String splitBrainProtectionName = "at-least-one-storage-member";
        SplitBrainProtectionConfig splitBrainProtectionConfig = new SplitBrainProtectionConfig();
        splitBrainProtectionConfig.setName(splitBrainProtectionName);
        splitBrainProtectionConfig.setEnabled(true);

        MapConfig mapConfig = new MapConfig();
        mapConfig.setSplitBrainProtectionName(splitBrainProtectionName);

        Config config = new Config();
        config.addSplitBrainProtectionConfig(splitBrainProtectionConfig);
        config.addMapConfig(mapConfig);

        HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance(config);
        SplitBrainProtectionService splitBrainProtectionService = hazelcastInstance.getSplitBrainProtectionService();
        SplitBrainProtection splitBrainProtection = splitBrainProtectionService.getSplitBrainProtection(splitBrainProtectionName);

        boolean splitBrainProtectionPresence = splitBrainProtection.hasMinimumSize();
//end::qq[]
    }
}
