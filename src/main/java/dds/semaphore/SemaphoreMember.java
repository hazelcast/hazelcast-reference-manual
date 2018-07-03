import com.hazelcast.config.Config;
import com.hazelcast.config.SemaphoreConfig;
import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.core.IAtomicLong;
import com.hazelcast.core.ISemaphore;


public class SemaphoreMember {
    public static void main( String[] args ) throws Exception{
//tag::sc[]
        Config config = new Config();
        SemaphoreConfig semaphoreConfig = config.getSemaphoreConfig("MySemaphore");
        semaphoreConfig.setName( "semaphore" ).setBackupCount( 1 )
                .setInitialPermits( 3 )
                .setQuorumName( "quorumname" );
//end::sc[]

//tag::sm[]
        HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
        ISemaphore semaphore = hazelcastInstance.getSemaphore( "semaphore" );
        IAtomicLong resource = hazelcastInstance.getAtomicLong( "resource" );
        for ( int k = 0 ; k < 1000 ; k++ ) {
            System.out.println( "At iteration: " + k + ", Active Threads: " + resource.get() );
            semaphore.acquire();
            try {
                resource.incrementAndGet();
                Thread.sleep( 1000 );
                resource.decrementAndGet();
            } finally {
                semaphore.release();
            }
        }
        System.out.println("Finished");
//end::sm[]
    }
}