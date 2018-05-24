import com.hazelcast.config.Config;
import com.hazelcast.config.LockConfig;


public class LockConfiguration {
    public static void main(String[] args){
//tag::lc[]
        Config config = new Config();
        LockConfig lockConfig = new LockConfig();
        lockConfig.setName("myLock")
                .setQuorumName("quorum-name");
        config.addLockConfig(lockConfig);
//end::lc[]
    }
}
