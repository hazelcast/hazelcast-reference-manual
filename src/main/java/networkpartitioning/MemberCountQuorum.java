import com.hazelcast.config.Config;
import com.hazelcast.config.MapConfig;
import com.hazelcast.config.QuorumConfig;


public class MemberCountQuorum {
    public static void main(String[] args) throws Exception{
//tag::mcq[]
        QuorumConfig quorumConfig = new QuorumConfig();
        quorumConfig.setName("quorumRuleWithFourMembers");
        quorumConfig.setEnabled(true);
        quorumConfig.setSize(4);

        MapConfig mapConfig = new MapConfig();
        mapConfig.setQuorumName("quorumRuleWithFourMembers");

        Config config = new Config();
        config.addQuorumConfig(quorumConfig);
        config.addMapConfig(mapConfig);
//end::mcq[]
    }
}
