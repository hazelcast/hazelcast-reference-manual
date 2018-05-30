import com.hazelcast.config.Config;
import com.hazelcast.config.MapConfig;
import com.hazelcast.config.QuorumConfig;
import com.hazelcast.config.QuorumListenerConfig;
import com.hazelcast.quorum.QuorumEvent;
import com.hazelcast.quorum.QuorumListener;


public class QuorumListenerConfiguration {
    public static void main(String[] args) throws Exception{
//tag::qlc[]
        QuorumListenerConfig listenerConfig = new QuorumListenerConfig();
        // You can either directly set quorum listener implementation of your own
        listenerConfig.setImplementation(new QuorumListener() {
            @Override
            public void onChange(QuorumEvent quorumEvent) {
                if (quorumEvent.isPresent()) {
                    // handle quorum presence
                } else {
                    // handle quorum absence
                }
            }
        });
        // Or you can give the name of the class that implements QuorumListener interface.
        listenerConfig.setClassName("com.company.quorum.ThreeMemberQuorumListener");

        QuorumConfig quorumConfig = new QuorumConfig();
        quorumConfig.setName("quorumRuleWithFourMembers");
        quorumConfig.setEnabled(true);
        quorumConfig.setSize(4);
        quorumConfig.addListenerConfig(listenerConfig);


        MapConfig mapConfig = new MapConfig();
        mapConfig.setQuorumName("quorumRuleWithFourMembers");

        Config config = new Config();
        config.addQuorumConfig(quorumConfig);
        config.addMapConfig(mapConfig);
//end::qlc[]
    }
}
