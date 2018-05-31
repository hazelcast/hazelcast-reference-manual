import com.hazelcast.config.Config;
import com.hazelcast.config.MapConfig;
import com.hazelcast.config.QuorumConfig;
import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.quorum.Quorum;
import com.hazelcast.quorum.QuorumService;


public class QuorumQuery {
    public static void main(String[] args) throws Exception{
//tag::qq[]
        String quorumName = "at-least-one-storage-member";
        QuorumConfig quorumConfig = new QuorumConfig();
        quorumConfig.setName(quorumName);
        quorumConfig.setEnabled(true);

        MapConfig mapConfig = new MapConfig();
        mapConfig.setQuorumName(quorumName);

        Config config = new Config();
        config.addQuorumConfig(quorumConfig);
        config.addMapConfig(mapConfig);

        HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance(config);
        QuorumService quorumService = hazelcastInstance.getQuorumService();
        Quorum quorum = quorumService.getQuorum(quorumName);

        boolean quorumPresence = quorum.isPresent();
//end::qq[]
    }
}
