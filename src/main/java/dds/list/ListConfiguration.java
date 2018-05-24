import com.hazelcast.config.CollectionConfig;
import com.hazelcast.config.Config;

public class ListConfiguration {
    public static void main(String[] args){
//tag::lc[]
        Config config = new Config();
        CollectionConfig collectionList = config.getListConfig("MyList");
        collectionList.setBackupCount(1)
                .setMaxSize(10)
                .setQuorumName("quorumname");
//end::lc[]
    }
}
