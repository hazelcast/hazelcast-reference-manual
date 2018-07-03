import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.core.IExecutorService;

import java.io.Serializable;
import java.util.concurrent.Callable;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class FibonacciCallable implements Callable<Long>, Serializable {
//tag::fc[]
    int input = 0;

    public FibonacciCallable( int input ) {
        this.input = input;
    }

    public Long call() {
        return calculate( input );
    }

    private long calculate( int n ) {
        if ( Thread.currentThread().isInterrupted() ) {
            return 0;
        }
        if ( n <= 1 ) {
            return n;
        } else {
            return calculate( n - 1 ) + calculate( n - 2 );
        }
    }
//end::fc[]

//tag::fib[]
    long fib( int n ) throws Exception {
        HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
        IExecutorService es = hazelcastInstance.getExecutorService("es");
        Future<Long> future = es.submit( new FibonacciCallable( n ) );
        try {
            long result = future.get( 3, TimeUnit.SECONDS );
            System.out.println(result);
        } catch ( TimeoutException e ) {
            future.cancel( true );
        }
        return -1;
    }
//end::fib[]
}