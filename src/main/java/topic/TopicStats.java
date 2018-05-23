import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.core.ITopic;


public class TopicStats {
    public static void main(String[] args) throws Exception{
//tag::ts[]
        HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
        ITopic<Object> myTopic = hazelcastInstance.getTopic( "myTopicName" );

        myTopic.getLocalTopicStats().getPublishOperationCount();
        myTopic.getLocalTopicStats().getReceiveOperationCount();
//end::ts[]
    }
}
