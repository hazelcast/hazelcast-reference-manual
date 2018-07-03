import com.hazelcast.config.Config;
import com.hazelcast.config.MapConfig;


public class ProgrammaticConfSample {

    public static void main(String[] args){
//tag::pcs[]
        Config config = new Config();
        config.getNetworkConfig().setPort( 5900 )
                .setPortAutoIncrement( false );

        MapConfig mapConfig = new MapConfig();
        mapConfig.setName( "testMap" )
                .setBackupCount( 2 )
                .setTimeToLiveSeconds( 300 );
//end::pcs[]
    }
}
