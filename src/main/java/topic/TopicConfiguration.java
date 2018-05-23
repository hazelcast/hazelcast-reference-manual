import com.hazelcast.config.ListenerConfig;
import com.hazelcast.config.TopicConfig;
import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.core.Message;
import com.hazelcast.core.MessageListener;

public class TopicConfiguration {
    public static void main(String[] args) throws Exception{
 //tag::tc[]
        TopicConfig topicConfig = new TopicConfig();
        topicConfig.setGlobalOrderingEnabled( true );
        topicConfig.setStatisticsEnabled( true );
        topicConfig.setName( "yourTopicName" );
        MessageListener<String> implementation = new MessageListener<String>() {
            @Override
            public void onMessage( Message<String> message ) {
                // process the message
            }
        };
        topicConfig.addMessageListenerConfig( new ListenerConfig( implementation ) );
        HazelcastInstance instance = Hazelcast.newHazelcastInstance();
//end::tc[]
    }
}
