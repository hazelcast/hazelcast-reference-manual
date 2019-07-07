package com.hazelcast.client.config;

import com.hazelcast.client.HazelcastClient;
import com.hazelcast.config.AwsConfig;
import com.hazelcast.core.HazelcastInstance;

public class ExampleClientAwsConfig {

    public static void main(String[] args) throws Exception{
        //tag::clientaws[]
        ClientConfig clientConfig = new ClientConfig();
        AwsConfig clientAwsConfig = new AwsConfig();
        clientAwsConfig.setAccessKey( "my-access-key" )
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
