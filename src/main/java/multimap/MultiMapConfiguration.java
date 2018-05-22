import com.hazelcast.config.MultiMapConfig;

public class MultiMapConfiguration {
    public static void main( String[] args ) throws Exception {
//tag::mmc[]
        MultiMapConfig mmConfig = new MultiMapConfig();
        mmConfig.setName( "default" )
                .setBackupCount( 0 ).setAsyncBackupCount( 1 )
                .setValueCollectionType( "SET" )
                .setQuorumName( "quorumname" );
//end::mmc[]
    }
}
