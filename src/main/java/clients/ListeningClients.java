import com.hazelcast.client.HazelcastClient;
import com.hazelcast.client.config.ClientConfig;
import com.hazelcast.core.Client;
import com.hazelcast.core.ClientListener;
import com.hazelcast.core.ClientService;
import com.hazelcast.core.HazelcastInstance;

import java.util.Collection;


public class ListeningClients {

    public static void main(String[] args) throws Exception{
//tag::lc[]
        ClientConfig clientConfig = new ClientConfig();
        clientConfig.getGroupConfig().setName("dev");
        clientConfig.getNetworkConfig().addAddress("10.90.0.1", "10.90.0.2:5702");

        HazelcastInstance hazelcastInstance = HazelcastClient.newHazelcastClient(clientConfig);

        final ClientService clientService = hazelcastInstance.getClientService();
        final Collection<Client> connectedClients = clientService.getConnectedClients();

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
//end::lc[]
    }
}
