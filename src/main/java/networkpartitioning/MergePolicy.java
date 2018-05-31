import com.hazelcast.config.Config;
import com.hazelcast.config.ListConfig;
import com.hazelcast.config.MapConfig;
import com.hazelcast.config.MergePolicyConfig;


public class MergePolicy {
    public static void main(String[] args) throws Exception{
//tag::mp[]
        MergePolicyConfig mergePolicyConfig = new MergePolicyConfig()
                .setPolicy("org.example.merge.MyMergePolicy")
                .setBatchSize(100);

        MapConfig mapConfig = new MapConfig("default")
                .setMergePolicyConfig(mergePolicyConfig);

        ListConfig listConfig = new ListConfig("default")
                .setMergePolicyConfig(mergePolicyConfig);

        Config config = new Config()
                .addMapConfig(mapConfig)
                .addListConfig(listConfig);
//end::mp[]
    }
}
