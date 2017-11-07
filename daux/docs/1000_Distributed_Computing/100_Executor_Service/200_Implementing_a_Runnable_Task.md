
In Hazelcast, when you implement a task as `java.util.concurrent.runnable` (a task that does not return a value), you implement Runnable and Serializable.

Below is Runnable example code. It is a task that waits for some time and echoes a message.

```java
public class EchoTask implements Runnable, Serializable {
  private final String msg;

  public EchoTask( String msg ) {
    this.msg = msg;
  }

  @Override
  public void run() {
    try {
      Thread.sleep( 5000 );
    } catch ( InterruptedException e ) {
    }
    System.out.println( "echo:" + msg );
  }
}
```

#### Executing a Runnable Task

To execute the runnable task:

* Retrieve the Executor from `HazelcastInstance`.
* Submit the tasks to the Executor.

Now let's write a class that submits and executes these echo messages. Executor is retrieved from `HazelcastInstance` and 1000 echo tasks are submitted.

```java
public class MasterMember {
  public static void main( String[] args ) throws Exception {
    HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
    IExecutorService executor = hazelcastInstance.getExecutorService( "exec" );
    for ( int k = 1; k <= 1000; k++ ) {
      Thread.sleep( 1000 );
      System.out.println( "Producing echo task: " + k );
      executor.execute( new EchoTask( String.valueOf( k ) ) );
    }
    System.out.println( "EchoTaskMain finished!" );
  }
}
```


