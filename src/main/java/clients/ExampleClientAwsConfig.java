package com.hazelcast.client.config;

import com.hazelcast.client.HazelcastClient;
import com.hazelcast.config.AwsConfig;
import com.hazelcast.core.HazelcastInstance;

public class ExampleClientAwsConfig {

    public static void main(String[] args) throws Exception {
        //tag::clientaws[]
        ClientConfig clientConfig = new ClientConfig();
        AwsConfig clientAwsConfig = new AwsConfig();
        clientAwsConfig.setProperty("access-key", "my-access-key")
                .setProperty("secret-key", "my-secret-key")
                .setProperty("region", "us-west-1")
                .setProperty("host-header", "ec2.amazonaws.com")
                .setProperty("security-group-name", ">hazelcast-sg")
                .setProperty("tag-key", "type")
                .setProperty("tag-value", "hz-members")
                .setProperty("iam-role", "s3access")
                .setEnabled(true);
        clientConfig.getNetworkConfig().setAwsConfig(clientAwsConfig);
        HazelcastInstance client = HazelcastClient.newHazelcastClient(clientConfig);
        //end::clientaws[]
    }
}
