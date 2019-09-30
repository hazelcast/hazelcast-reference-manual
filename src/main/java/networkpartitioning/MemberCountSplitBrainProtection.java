import com.hazelcast.config.Config;
import com.hazelcast.config.MapConfig;
import com.hazelcast.config.SplitBrainProtectionConfig;


public class MemberCountSplitBrainProtection {
    public static void main(String[] args) throws Exception{
//tag::mcq[]
        SplitBrainProtectionConfig splitBrainProtectionConfig = new SplitBrainProtectionConfig();
        splitBrainProtectionConfig.setName("splitBrainProtectionRuleWithFourMembers")
					    .setEnabled(true)
					    .setMinimumClusterSize(4);

        MapConfig mapConfig = new MapConfig();
        mapConfig.setSplitBrainProtectionName("splitBrainProtectionRuleWithFourMembers");

        Config config = new Config();
        config.addSplitBrainProtectionConfig(splitBrainProtectionConfig);
        config.addMapConfig(mapConfig);
//end::mcq[]
    }
}
