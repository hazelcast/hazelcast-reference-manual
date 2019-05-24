import com.hazelcast.client.config.ClientConfig;
import com.hazelcast.client.config.ClientUserCodeDeploymentConfig;
import com.hazelcast.config.Config;
import com.hazelcast.config.UserCodeDeploymentConfig;
import com.hazelcast.config.UserCodeDeploymentConfig.ProviderMode;

public class ClientUCD {

    public void clientucd() {
        //tag::clientucd[]
        ClientConfig clientConfig = new ClientConfig();
        ClientUserCodeDeploymentConfig clientUserCodeDeploymentConfig = new ClientUserCodeDeploymentConfig();

        clientUserCodeDeploymentConfig.addJar("/User/example/example.jar");
        clientUserCodeDeploymentConfig.addJar("https://com.example.com/example.jar");
        clientUserCodeDeploymentConfig.addClass("example.ClassName");
        clientUserCodeDeploymentConfig.addClass("example.ClassName2");

        clientUserCodeDeploymentConfig.setEnabled(true);
        clientConfig.setUserCodeDeploymentConfig(clientUserCodeDeploymentConfig);
        //end::clientucd[]
    }

    public void configureMemberForClientUcd() {
        //tag::configureMemberForClientUcd[]
        Config config = new Config();
        UserCodeDeploymentConfig ucdConfig = config.getUserCodeDeploymentConfig();
        ucdConfig.setEnabled(true);
        // following two configs are defaults, we show them for clarity
        ucdConfig.setProviderMode(ProviderMode.LOCAL_AND_CACHED_CLASSES);
        ucdConfig.setProviderFilter(null);
        //end::configureMemberForClientUcd[]
    }
}
