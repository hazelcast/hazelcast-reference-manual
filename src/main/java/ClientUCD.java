import com.hazelcast.client.config.ClientConfig;
import com.hazelcast.client.config.ClientUserCodeDeploymentConfig;

public class ClientUCD {

    public static void main(String[] args){
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
}