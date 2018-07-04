import com.hazelcast.client.HazelcastClient;
import com.hazelcast.client.config.ClientAwsConfig;
import com.hazelcast.client.config.ClientConfig;
import com.hazelcast.core.HazelcastInstance;

public class SampleClientAwsConfig {

    public static void main(String[] args) throws Exception{
//tag::clientaws[]
        ClientConfig clientConfig = new ClientConfig();
        ClientAwsConfig clientAwsConfig = new ClientAwsConfig();
        clientAwsConfig.setInsideAws( false )
                .setAccessKey( "my-access-key" )
                .setSecretKey( "my-secret-key" )
                .setRegion( "us-west-1" )
                .setHostHeader( "ec2.amazonaws.com" )
                .setSecurityGroupName( ">hazelcast-sg" )
                .setTagKey( "type" )
                .setTagValue( "hz-members" )
                .setIamRole( "s3access" )
                .setEnabled( true );
        clientConfig.getNetworkConfig().setAwsConfig( clientAwsConfig );
        HazelcastInstance client = HazelcastClient.newHazelcastClient(clientConfig);
//end::clientaws[]
    }
}
