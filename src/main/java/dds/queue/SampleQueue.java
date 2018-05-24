import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.TimeUnit;

public class SampleQueue {

    public static void main(String[] args) throws Exception {
//tag::samplequeue[]
        HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
        BlockingQueue<MyTask> queue = hazelcastInstance.getQueue( "tasks" );
        queue.put( new MyTask() );
        MyTask task = queue.take();

        boolean offered = queue.offer( new MyTask(), 10, TimeUnit.SECONDS );
        task = queue.poll( 5, TimeUnit.SECONDS );
        if ( task != null ) {
            //process task
        }
//end::samplequeue[]
    }

    private static class MyTask {
    }
}