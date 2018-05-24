import com.hazelcast.config.CollectionConfig;
import com.hazelcast.config.Config;

public class SetConfiguration {
    public static void main(String[] args){
//tag::sc[]
        Config config = new Config();
        CollectionConfig collectionSet = config.getSetConfig("MySet");
        collectionSet.setBackupCount(1)
                .setMaxSize(10)
                .setQuorumName("quorumname");
//end::sc[]
    }
}
