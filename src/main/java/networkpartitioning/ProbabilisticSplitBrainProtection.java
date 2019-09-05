import com.hazelcast.config.Config;
import com.hazelcast.config.SplitBrainProtectionConfig;
import com.hazelcast.config.SetConfig;
import com.hazelcast.splitbrainprotection.SplitBrainProtectionOn;


public class ProbabilisticSplitBrainProtection {
    public static void main(String[] args) throws Exception{
//tag::pq[]
        SplitBrainProtectionConfig splitBrainProtectionConfig =
                SplitBrainProtectionConfig.newProbabilisticSplitBrainProtectionConfigBuilder("probabilist-splitBrainProtection", 3)
                        .withAcceptableHeartbeatPauseMillis(5000)
                        .withMaxSampleSize(500)
                        .withSuspicionThreshold(10)
                        .build();
        splitBrainProtectionConfig.setProtectOn(SplitBrainProtectionOn.READ_WRITE);
        SetConfig setConfig = new SetConfig("split-brain-protected-set");
        setConfig.setSplitBrainProtectionName("probabilist-splitBrainProtection");
        Config config = new Config();
        config.addSplitBrainProtectionConfig(splitBrainProtectionConfig);
        config.addSetConfig(setConfig);
//end::pq[]
    }
}
