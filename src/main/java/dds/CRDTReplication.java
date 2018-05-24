import com.hazelcast.config.CRDTReplicationConfig;
import com.hazelcast.config.Config;


public class CRDTReplication {
    public static void main(String[] args) {
//tag::crdt[]
        final CRDTReplicationConfig crdtReplicationConfig = new CRDTReplicationConfig()
                .setMaxConcurrentReplicationTargets(1)
                .setReplicationPeriodMillis(1000);
        Config hazelcastConfig = new Config()
                .setCRDTReplicationConfig(crdtReplicationConfig);
//end::crdt[]
    }
}
