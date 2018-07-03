import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.core.ITopic;

import java.util.Random;
import static java.util.concurrent.TimeUnit.MILLISECONDS;


public class PublisherMember {

    public static void main(String[] args) {
//tag::pm[]
        HazelcastInstance hz = Hazelcast.newHazelcastInstance();
        Random random = new Random();

        ITopic<Long> topic = hz.getReliableTopic("sometopic");
        long messageId = 0;

        while (true) {
            topic.publish(messageId);
            messageId++;

            System.out.println("Written: " + messageId);

            // add a bit of randomization
            sleepMillis(random.nextInt(100));
//end::pm[]            
        }
    }

    public static boolean sleepMillis(int millis) {
        try {
            MILLISECONDS.sleep(millis);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            return false;
        }
        return true;
    }
}