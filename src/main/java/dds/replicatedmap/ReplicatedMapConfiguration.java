import com.hazelcast.config.Config;
import com.hazelcast.config.InMemoryFormat;
import com.hazelcast.config.ReplicatedMapConfig;


public class ReplicatedMapConfiguration {
    public static void main(String[] args) throws Exception{
//tag::rmc[]
        Config config = new Config();

        ReplicatedMapConfig replicatedMapConfig =
                config.getReplicatedMapConfig( "default" );

        replicatedMapConfig.setInMemoryFormat( InMemoryFormat.BINARY )
                .setQuorumName( "quorumname" );
//end::rmc[]
    }
}
