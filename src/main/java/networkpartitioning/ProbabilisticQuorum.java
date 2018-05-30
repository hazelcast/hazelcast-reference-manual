import com.hazelcast.config.Config;
import com.hazelcast.config.QuorumConfig;
import com.hazelcast.config.SetConfig;
import com.hazelcast.quorum.QuorumType;


public class ProbabilisticQuorum {
    public static void main(String[] args) throws Exception{
//tag::pq[]
        QuorumConfig quorumConfig =
                QuorumConfig.newProbabilisticQuorumConfigBuilder("probabilist-quorum", 3)
                        .withAcceptableHeartbeatPauseMillis(5000)
                        .withMaxSampleSize(500)
                        .withSuspicionThreshold(10)
                        .build();
        quorumConfig.setType(QuorumType.READ_WRITE);
        SetConfig setConfig = new SetConfig("split-brain-protected-set");
        setConfig.setQuorumName("probabilist-quorum");
        Config config = new Config();
        config.addQuorumConfig(quorumConfig);
        config.addSetConfig(setConfig);
//end::pq[]
    }
}
