import com.hazelcast.config.Config;
import com.hazelcast.config.SplitBrainProtectionConfig;
import com.hazelcast.config.SetConfig;
import com.hazelcast.splitbrainprotection.SplitBrainProtectionOn;


public class RecentlyActiveSplitBrainProtection {
    public static void main(String[] args) throws Exception{
//tag::raq[]
        SplitBrainProtectionConfig splitBrainProtectionConfig =
                SplitBrainProtectionConfig.newRecentlyActiveSplitBrainProtectionConfigBuilder("recently-active-splitBrainProtection", 4, 60000)
                        .build();
        splitBrainProtectionConfig.setProtectOn(SplitBrainProtectionOn.READ_WRITE);
        SetConfig setConfig = new SetConfig("split-brain-protected-set");
        setConfig.setSplitBrainProtectionName("recently-active-splitBrainProtection");
        Config config = new Config();
        config.addSplitBrainProtectionConfig(splitBrainProtectionConfig);
        config.addSetConfig(setConfig);
//end::raq[]
    }
}
