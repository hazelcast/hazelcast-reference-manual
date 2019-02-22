import com.hazelcast.config.Config;
import com.hazelcast.config.EndpointConfig;
import com.hazelcast.config.RestEndpointGroup;
import com.hazelcast.config.RestServerEndpointConfig;
import com.hazelcast.config.SSLConfig;
import com.hazelcast.config.ServerSocketEndpointConfig;
import com.hazelcast.config.WanPublisherConfig;
import com.hazelcast.config.WanReplicationConfig;
import com.hazelcast.config.WanReplicationRef;
import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;

import java.util.Collections;

import static com.hazelcast.config.RestEndpointGroup.CLUSTER_READ;
import static com.hazelcast.config.RestEndpointGroup.HEALTH_CHECK;
import static com.hazelcast.config.RestEndpointGroup.WAN;
import static java.util.Collections.emptyList;

public class AdvancedNetworkConfig {

    public static void main(String[] args) {
        //tag::advNetConf[]
        Config config = new Config();
        config.getAdvancedNetworkConfig().setEnabled(true);
        config.getAdvancedNetworkConfig().setClientEndpointConfig(
                new ServerSocketEndpointConfig().setPort(9090)
        );
        HazelcastInstance instance = Hazelcast.newHazelcastInstance(config);
        System.out.println(instance.getCluster().getLocalMember().getAddressMap());
        //end::advNetConf[]
    }

    public static void startCompleteMultiSocketServer() {
        Config config = new Config();
        config.getAdvancedNetworkConfig().setEnabled(true);
        //tag::memberServerSocket[]
        config.getAdvancedNetworkConfig().setMemberEndpointConfig(
                new ServerSocketEndpointConfig()
                    .setPort(5701)
                    .setPortAutoIncrement(false)
                    .setSSLConfig(new SSLConfig())
                    .setReuseAddress(true)
                    .setSocketTcpNoDelay(true)
        );
        //end::memberServerSocket[]
        //tag::restServerSocket[]
        config.getAdvancedNetworkConfig().setRestEndpointConfig(
                new RestServerEndpointConfig()
                    .setPort(8080)
                    .setPortAutoIncrement(false)
                    .enableGroups(WAN, CLUSTER_READ, HEALTH_CHECK)
        );
        //end::restServerSocket[]
        //tag::wanActiveEndpoint[]
        config.getAdvancedNetworkConfig().addWanEndpointConfig(
                new EndpointConfig().setName("tokyo")
                        .setSSLConfig(new SSLConfig()
                                            .setEnabled(true)
                                            .setFactoryClassName("com.hazelcast.examples.MySSLContextFactory")
                                            .setProperty("foo", "bar"))
        );
        WanPublisherConfig wanPublisherConfig = new WanPublisherConfig();
        wanPublisherConfig.setEndpoint("tokyo"); // refer to WAN endpoint config
        config.addWanReplicationConfig(
                new WanReplicationConfig().setName("replicate-to-tokyo")
                                          .addWanPublisherConfig(wanPublisherConfig)
        );
        config.getMapConfig("customers").setWanReplicationRef(
                new WanReplicationRef("replicate-to-tokyo", "com.company.MergePolicy", emptyList(), false)
        );
        //end::wanActiveEndpoint[]
        //tag::wanPassiveEndpoint[]
        config.getAdvancedNetworkConfig().addWanEndpointConfig(
                new ServerSocketEndpointConfig()
                        .setName("tokyo")
                        .setPort(11010)
                        .setPortAutoIncrement(false)
                        .setSSLConfig(new SSLConfig()
                                .setEnabled(true)
                                .setFactoryClassName("com.hazelcast.examples.MySSLContextFactory")
                                .setProperty("foo", "bar")
                        ));
        //end::wanPassiveEndpoint[]

        HazelcastInstance instance = Hazelcast.newHazelcastInstance(config);
        System.out.println(instance.getCluster().getLocalMember().getAddressMap());
    }

}
