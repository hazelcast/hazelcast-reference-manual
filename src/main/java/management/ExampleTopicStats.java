import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.topic.ITopic;
import com.hazelcast.topic.LocalTopicStats;

public class ExampleTopicStats {

    public static void main(String[] args) throws Exception{
        //tag::ts[]
        HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
        ITopic<Object> news = hazelcastInstance.getTopic( "news" );
        LocalTopicStats topicStatistics = news.getLocalTopicStats();
        System.out.println( "number of publish operations = "
                + topicStatistics.getPublishOperationCount() );
        //end::ts[]
    }
}