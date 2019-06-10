import com.hazelcast.config.Config;
import com.hazelcast.config.MemberAttributeConfig;
import com.hazelcast.config.UserCodeDeploymentConfig;
import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;

public class MemberUCD {
    void ucd() {
        //tag::ucd[]
        Config config = new Config();
        UserCodeDeploymentConfig distCLConfig = config.getUserCodeDeploymentConfig();
        distCLConfig.setEnabled( true )
                .setClassCacheMode( UserCodeDeploymentConfig.ClassCacheMode.ETERNAL )
                .setProviderMode( UserCodeDeploymentConfig.ProviderMode.LOCAL_AND_CACHED_CLASSES )
                .setBlacklistedPrefixes( "com.foo,com.bar" )
                .setWhitelistedPrefixes( "com.bar.MyClass" )
                .setProviderFilter( "HAS_ATTRIBUTE:lite" );
        //end::ucd[]
    }

    void hasAttributeConfig() {
        //tag::hasAttributeConfig[]
        Config hazelcastConfig = new Config();
        UserCodeDeploymentConfig ucdConfig = hazelcastConfig.getUserCodeDeploymentConfig();
        ucdConfig.setProviderFilter("HAS_ATTRIBUTE:class-provider");

        HazelcastInstance instance = Hazelcast.newHazelcastInstance(hazelcastConfig);
        //end::hasAttributeConfig[]
    }

    void memberAttributeConfig() {
        //tag::memberAttributeConfig[]
        Config hazelcastConfig = new Config();
        MemberAttributeConfig memberAttributes = hazelcastConfig.getMemberAttributeConfig();
        memberAttributes.setAttribute("class-provider", "true");

        HazelcastInstance instance = Hazelcast.newHazelcastInstance(hazelcastConfig);
        //end::memberAttributeConfig[]
    }
}
