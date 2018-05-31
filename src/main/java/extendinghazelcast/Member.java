import com.hazelcast.core.Hazelcast;

//tag::member[]
public class Member {

    public static void main(String[] args) {
        Hazelcast.newHazelcastInstance();

        Hazelcast.shutdownAll();
    }
}
//end::member[]