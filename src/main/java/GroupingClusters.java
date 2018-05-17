import com.hazelcast.config.Config;
import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;

public class GroupingClusters {
    public static void main(String[] args) {
     //tag::groupingclusters[]
        Config configProd = new Config();
        configProd.getGroupConfig().setName( "production" );

        Config configDev = new Config();
        configDev.getGroupConfig().setName( "development" );

        HazelcastInstance h1 = Hazelcast.newHazelcastInstance( configProd );
        HazelcastInstance h2 = Hazelcast.newHazelcastInstance( configDev );
        HazelcastInstance h3 = Hazelcast.newHazelcastInstance( configDev );
      //end::groupingclusters[]
    }
}
