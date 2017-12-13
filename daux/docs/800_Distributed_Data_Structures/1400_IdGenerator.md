
Hazelcast IdGenerator is used to generate cluster-wide unique identifiers. Generated identifiers are long type primitive values between 0 and `Long.MAX_VALUE`.

![image](../images/NoteSmall.jpg) ***NOTE:*** ***Feature is deprecated.*** *The implementation can produce duplicate IDs in case of a network split, even with split-brain protection being enabled (during short window while split-brain is detected). Please use [Reliable IdGenerator](/1450_ReliableIdGenerator.md) for an alternative implementation which does not suffer from the mentioned issue.*

### Generating Cluster-Wide IDs

ID generation occurs almost at the speed of `AtomicLong.incrementAndGet()`. A group of 10,000 identifiers is allocated for each cluster member. In the background, this allocation takes place with an `IAtomicLong` incremented by 10,000. Once a cluster member generates IDs (allocation is done), `IdGenerator` increments a local counter. If a cluster member uses all IDs in the group, it will get another 10,000 IDs. This way, only one time of network traffic is needed, meaning that 9,999 identifiers are generated in memory instead of over the network. This is fast.

Let's write a sample identifier generator.

```java
public class IdGeneratorExample {
  public static void main( String[] args ) throws Exception {
    HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
    IdGenerator idGen = hazelcastInstance.getIdGenerator( "newId" );
    while (true) {
      Long id = idGen.newId();
      System.err.println( "Id: " + id );
      Thread.sleep( 1000 );
    }
  }
}
```

Let's run the above code two times. The output will be similar to the following.

```plain
Members [1] {
  Member [127.0.0.1]:5701 this
}
Id: 1
Id: 2
Id: 3
```


```plain
Members [2] {
  Member [127.0.0.1]:5701
  Member [127.0.0.1]:5702 this
}
Id: 10001
Id: 10002
Id: 10003
```

### Unique IDs and Duplicate IDs

You can see that the generated IDs are unique and counting upwards. If you see duplicated identifiers, it means your instances could not form a cluster. 


![image](../images/NoteSmall.jpg) ***NOTE:*** *Generated IDs are unique during the life cycle of the cluster. If the entire cluster is restarted, IDs start from 0, again or you can initialize to a value using the `init()` method of `IdGenerator`.*

![image](../images/NoteSmall.jpg) ***NOTE:*** *`IdGenerator` has one synchronous backup and no asynchronous backups. Its backup count is not configurable.*


