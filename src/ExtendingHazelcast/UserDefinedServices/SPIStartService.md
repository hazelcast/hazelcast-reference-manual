
### Starting the Service

Now, let's start a `HazelcastInstance` as shown below, which will start the `CounterService`.


```java
import com.hazelcast.core.Hazelcast;

public class Member {
    public static void main(String[] args) {
        Hazelcast.newHazelcastInstance();
    }
}
```

Once it starts, the `CounterService init` method prints the following output.

`CounterService.init`

Once the HazelcastInstance is shutdown (for example, with Ctrl+C), the `CounterService shutdown` method prints the following output.

`CounterService.shutdown`

