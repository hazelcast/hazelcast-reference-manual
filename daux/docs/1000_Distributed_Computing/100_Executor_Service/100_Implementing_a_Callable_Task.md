

One of the coolest features of Java is the Executor framework, which allows you to asynchronously execute your tasks (logical units of work), such as database queries, complex calculations, and image rendering.

The default implementation of this framework (`ThreadPoolExecutor`) is designed to run within a single JVM (cluster member). In distributed systems, this implementation is not desired since you may want a task submitted in one JVM and processed in another one. Hazelcast offers `IExecutorService` for you to use in distributed environments. It implements `java.util.concurrent.ExecutorService` to serve the applications requiring computational and data processing power.

<br>

----
![Note](../../images/NoteSmall.jpg) ***NOTE:*** *Note that you may want to use [Hazelcast Jet](https://jet.hazelcast.org/) if you want to process batch or real-time streaming data. Please see the [Fast Batch Processing](https://jet.hazelcast.org/use-cases/fast-batch-processing/) and [Real-Time Stream Processing](https://jet.hazelcast.org/use-cases/real-time-stream-processing/) use cases for Hazelcast Jet.*

----

<br>


With `IExecutorService`, you can execute tasks asynchronously and perform other useful tasks. If your task execution takes longer than expected, you can cancel the task execution. Tasks should be `Serializable` since they will be distributed.

In the Java Executor framework, you implement tasks two ways: Callable or Runnable.

* Callable: If you need to return a value and submit it to Executor, implement the task as `java.util.concurrent.Callable`.
* Runnable: If you do not need to return a value, implement the task as `java.util.concurrent.Runnable`.

### Implementing a Callable Task


In Hazelcast, when you implement a task as `java.util.concurrent.Callable` (a task that returns a value), you implement Callable and Serializable.

Below is an example of a Callable task. SumTask prints out map keys and returns the summed map values.

```java
import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.core.HazelcastInstanceAware;
import com.hazelcast.core.IMap;

import java.io.Serializable;
import java.util.concurrent.Callable;

public class SumTask
    implements Callable<Integer>, Serializable, HazelcastInstanceAware {
        
  private transient HazelcastInstance hazelcastInstance;

  public void setHazelcastInstance( HazelcastInstance hazelcastInstance ) {
    this.hazelcastInstance = hazelcastInstance;
  }

  public Integer call() throws Exception {
    IMap<String, Integer> map = hazelcastInstance.getMap( "map" );
    int result = 0;
    for ( String key : map.localKeySet() ) {
      System.out.println( "Calculating for key: " + key );
      result += map.get( key );
    }
    System.out.println( "Local Result: " + result );
    return result;
  }
}
```

Another example is the Echo callable below. In its call() method, it returns the local member and the input passed in. Remember that `instance.getCluster().getLocalMember()` returns the local member and `toString()` returns the member's address (IP + port) in String form, just to see which member actually executed the code for our example. Of course, the `call()` method can do and return anything you like. 

```java
import java.util.concurrent.Callable;
import java.io.Serializable;

public class Echo implements Callable<String>, Serializable {
    String input = null;

    public Echo() {
    }

    public Echo(String input) {
        this.input = input;
    }

    public String call() {
        Config cfg = new Config();
        HazelcastInstance instance = Hazelcast.newHazelcastInstance(cfg);
        return instance.getCluster().getLocalMember().toString() + ":" + input;
    }
}
```

#### Executing a Callable Task

To execute a callable task with the executor framework:

* Obtain an `ExecutorService` instance (generally via `Executors`).
* Submit a task which returns a `Future`. 
* After executing the task, you do not have to wait for the execution to complete, you can process other things. 
* When ready, use the `Future` object to retrieve the result as shown in the code example below.

Below, the Echo task is executed.

```java
ExecutorService executorService = Executors.newSingleThreadExecutor();
Future<String> future = executorService.submit( new Echo( "myinput") );
//while it is executing, do some useful stuff
//when ready, get the result of your execution
String result = future.get();
```

Please note that the Echo callable in the above code sample also implements a Serializable interface, since it may be sent to another member to be processed.

![image](../../images/NoteSmall.jpg) ***NOTE:*** *When a task is deserialized, HazelcastInstance needs to be accessed. To do this, the task should implement `HazelcastInstanceAware` interface. Please see the [HazelcastInstanceAware Interface section](/16_Serialization/07_Implementing_HazelcastInstanceAware.md) for more information.*
<br></br>


