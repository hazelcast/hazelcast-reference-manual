import com.hazelcast.collection.ISet;
import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;

public class ExampleSet {

    public static void main(String[] args) {
        //tag::set[]
        HazelcastInstance hz = Hazelcast.newHazelcastInstance();
        ISet<String> set = hz.getSet("set");
        set.add("Tokyo");
        set.add("Paris");
        set.add("London");
        set.add("New York");
        System.out.println("Putting finished!");
        //end::set[]
    }
}