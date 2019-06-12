import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.cp.IAtomicLong;
import com.hazelcast.cp.ISemaphore;

public class SemaphoreMember {
    public static void main( String[] args ) throws Exception{

        //tag::sm[]
        HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
        ISemaphore semaphore = hazelcastInstance.getCPSubsystem().getSemaphore( "semaphore" );
        IAtomicLong resource = hazelcastInstance.getCPSubsystem().getAtomicLong( "resource" );
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
