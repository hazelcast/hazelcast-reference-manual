import com.hazelcast.config.Config;
import com.hazelcast.config.InMemoryFormat;
import com.hazelcast.config.RingbufferConfig;

public class RBConfiguration {
    public static void main(String[] args) throws Exception{
 //tag::rbc[]
        Config config = new Config();
        RingbufferConfig rbConfig = config.getRingbufferConfig("myRB");
        rbConfig.setCapacity(10000)
                .setBackupCount(1)
                .setAsyncBackupCount(0)
                .setTimeToLiveSeconds(0)
                .setInMemoryFormat(InMemoryFormat.BINARY)
                .setQuorumName("quorumname");
//end::rbc[]
    }
}
