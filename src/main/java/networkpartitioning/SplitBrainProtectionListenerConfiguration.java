import com.hazelcast.config.Config;
import com.hazelcast.config.MapConfig;
import com.hazelcast.config.SplitBrainProtectionConfig;
import com.hazelcast.config.SplitBrainProtectionListenerConfig;
import com.hazelcast.splitbrainprotection.SplitBrainProtectionEvent;
import com.hazelcast.splitbrainprotection.SplitBrainProtectionListener;


public class SplitBrainProtectionListenerConfiguration {
    public static void main(String[] args) throws Exception{
//tag::qlc[]
        SplitBrainProtectionListenerConfig listenerConfig = new SplitBrainProtectionListenerConfig();
        // You can either directly set SplitBrainProtection listener implementation of your own
        listenerConfig.setImplementation(new SplitBrainProtectionListener() {
            @Override
            public void onChange(SplitBrainProtectionEvent splitBrainProtectionEvent) {
                if (splitBrainProtectionEvent.isPresent()) {
                    // handle SplitBrainProtection presence
                } else {
                    // handle SplitBrainProtection absence
                }
            }
        });
        // Or you can give the name of the class that implements SplitBrainProtectionListener interface.
        listenerConfig.setClassName("com.company.splitBrainProtection.ThreeMemberSplitBrainProtectionListener");

        SplitBrainProtectionConfig splitBrainProtectionConfig = new SplitBrainProtectionConfig();
        splitBrainProtectionConfig.setName("splitBrainProtectionRuleWithFourMembers")
        					    .setEnabled(true)
        					    .setMinimumClusterSize(4)
        					    .addListenerConfig(listenerConfig);


        MapConfig mapConfig = new MapConfig();
        mapConfig.setSplitBrainProtectionName("splitBrainProtectionRuleWithFourMembers");

        Config config = new Config();
        config.addSplitBrainProtectionConfig(splitBrainProtectionConfig);
        config.addMapConfig(mapConfig);
//end::qlc[]
    }
}
