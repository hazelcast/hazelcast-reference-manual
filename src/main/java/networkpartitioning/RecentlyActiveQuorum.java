import com.hazelcast.config.Config;
import com.hazelcast.config.QuorumConfig;
import com.hazelcast.config.SetConfig;
import com.hazelcast.quorum.QuorumType;


public class RecentlyActiveQuorum {
    public static void main(String[] args) throws Exception{
//tag::raq[]
        QuorumConfig quorumConfig =
                QuorumConfig.newRecentlyActiveQuorumConfigBuilder("recently-active-quorum", 4, 60000)
                        .build();
        quorumConfig.setType(QuorumType.READ_WRITE);
        SetConfig setConfig = new SetConfig("split-brain-protected-set");
        setConfig.setQuorumName("recently-active-quorum");
        Config config = new Config();
        config.addQuorumConfig(quorumConfig);
        config.addSetConfig(setConfig);
//end::raq[]
    }
}
