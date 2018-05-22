import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.ringbuffer.Ringbuffer;


public class SampleRB {
    public static void main(String[] args) throws Exception {
//tag::rb[]
        HazelcastInstance hz = Hazelcast.newHazelcastInstance();
        Ringbuffer<String> ringbuffer = hz.getRingbuffer("rb");
        long sequence = ringbuffer.headSequence();
        while(true){
            String item = ringbuffer.readOne(sequence);
            sequence++;
            // process item
        }
//end::rb[]
    }
}
