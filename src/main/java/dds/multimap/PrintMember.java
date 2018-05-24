import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.core.MultiMap;

import java.util.Collection;

public class PrintMember {

    public static void main(String[] args) {
//tag::pm[]
        HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
        MultiMap<String, String> map = hazelcastInstance.getMultiMap("map");

        map.put("a", "1");
        map.put("a", "2");
        map.put("b", "3");
        System.out.printf("PutMember:Done");

        for (String key: map.keySet()){
            Collection<String> values = map.get(key);
            System.out.printf("%s -> %s\n", key, values);
        }
//end::pm[]
    }
}