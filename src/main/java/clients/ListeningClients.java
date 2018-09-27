import com.hazelcast.client.HazelcastClient;
import com.hazelcast.client.config.ClientConfig;
import com.hazelcast.core.*;

import java.util.Collection;


public class ListeningClients {

    public static void main(String[] args) throws Exception{
//tag::lc[]
        ClientConfig clientConfig = new ClientConfig();
        clientConfig.getGroupConfig().setName("dev");
        clientConfig.getNetworkConfig().addAddress("10.90.0.1", "10.90.0.2:5702");

        HazelcastInstance instance = Hazelcast.newHazelcastInstance();

        final ClientService clientService = instance.getClientService();

        clientService.addClientListener(new ClientListener() {
            @Override
            public void clientConnected(Client client) {
                //Handle client connected event
            }

            @Override
            public void clientDisconnected(Client client) {
                //Handle client disconnected event
            }
        });

        //this will trigger `clientConnected` event
        HazelcastInstance client = HazelcastClient.newHazelcastClient();
        
        final Collection<Client> connectedClients = clientService.getConnectedClients();

        //this will trigger `clientDisconnected` event
        client.shutdown();
//end::lc[]
    }
}
