import com.hazelcast.client.config.ClientConfig;
import com.hazelcast.client.config.ClientUserCodeDeploymentConfig;


public class ClientUCD {

    public static void main(String[] args){
//tag::clientucd[]
        ClientConfig clientConfig = new ClientConfig();
        ClientUserCodeDeploymentConfig clientUserCodeDeploymentConfig = new ClientUserCodeDeploymentConfig();

        clientUserCodeDeploymentConfig.addJar("/User/sample/sample.jar");
        clientUserCodeDeploymentConfig.addJar("https://com.sample.com/sample.jar");
        clientUserCodeDeploymentConfig.addClass("sample.ClassName");
        clientUserCodeDeploymentConfig.addClass("sample.ClassName2");

        clientUserCodeDeploymentConfig.setEnabled(true);
        clientConfig.setUserCodeDeploymentConfig(clientUserCodeDeploymentConfig);
//end::clientucd[]
    }
}
