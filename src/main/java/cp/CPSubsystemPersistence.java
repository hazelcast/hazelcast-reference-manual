import com.hazelcast.core.*;
import com.hazelcast.cp.*;
import com.hazelcast.config.*;
import com.hazelcast.config.cp.*;

public class CPSubsystemPersistence {

    public static void main(String[] args) {
        //tag::cppersistence1[]
        Config config = new Config();
        config.setLicenseKey("your-license-key");
        NetworkConfig networkConfig = config.getNetworkConfig();
        JoinConfig join = networkConfig.getJoin();
        join.getMulticastConfig().setEnabled(false);
        TcpIpConfig tcpIpConfig = join.getTcpIpConfig();
        tcpIpConfig.setEnabled(true);
        tcpIpConfig.addMember("127.0.0.1");
       // config.getCPSubsystemConfig().setCPMemberCount(3).setPersistenceEnabled(true);

        HazelcastInstance instance1 = Hazelcast.newHazelcastInstance(config);
        HazelcastInstance instance2 = Hazelcast.newHazelcastInstance(config);
        HazelcastInstance instance3 = Hazelcast.newHazelcastInstance(config);

        IAtomicLong counter = instance1.getCPSubsystem().getAtomicLong("counter");
        counter.set(0);
        counter.incrementAndGet();

        instance1.getLifecycleService().terminate();
        instance2.getLifecycleService().terminate();

        instance1 = Hazelcast.newHazelcastInstance(config);

        counter = instance1.getCPSubsystem().getAtomicLong("counter");

        long val = counter.get();
        assert val == 1L;
        //end::cppersistence1[]
    }

}
