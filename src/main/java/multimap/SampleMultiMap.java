import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.core.MultiMap;

public class SampleMultiMap {
    public static void main( String[] args ) throws Exception {
//tag::mm[]
        HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
        MultiMap<String , String > map = hazelcastInstance.getMultiMap( "map" );

        map.put( "a", "1" );
        map.put( "a", "2" );
        map.put( "b", "3" );
        System.out.println( "PutMember:Done" );
//end::mm[]
    }
}
