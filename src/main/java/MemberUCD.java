import com.hazelcast.config.Config;
import com.hazelcast.config.UserCodeDeploymentConfig;

public class MemberUCD {
    public static void main(String[] args) {
      //tag::ucd[]
        Config config = new Config();
        UserCodeDeploymentConfig distCLConfig = config.getUserCodeDeploymentConfig();
        distCLConfig.setEnabled( true )
                .setClassCacheMode( UserCodeDeploymentConfig.ClassCacheMode.ETERNAL )
                .setProviderMode( UserCodeDeploymentConfig.ProviderMode.LOCAL_CLASSES_ONLY )
                .setBlacklistedPrefixes( "com.foo" )
                .setWhitelistedPrefixes( "com.bar.MyClass" )
                .setProviderFilter( "HAS_ATTRIBUTE:lite" );
      //end::ucd[]
    }
}
