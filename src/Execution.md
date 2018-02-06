

### Executing Code in the Cluster

The distributed executor service is a distributed implementation of `java.util.concurrent.ExecutorService`. It allows you to execute your code in the cluster. In this section, the code examples are based on the [Echo class above](#implementing-a-callable-task) (please note that the Echo class is `Serializable`). The code examples show how Hazelcast can execute your code (`Runnable, Callable`):

- `echoOnTheMember`: On a specific cluster member you choose with the `IExecutorService` `submitToMember` method.
- `echoOnTheMemberOwningTheKey`: On the member owning the key you choose with the `IExecutorService` `submitToKeyOwner` method.
- `echoOnSomewhere`: On the member Hazelcast picks with the `IExecutorService` `submit` method.
- `echoOnMembers`: On all or a subset of the cluster members with the `IExecutorService` `submitToMembers` method.

```java
public void echoOnTheMember( String input, Member member ) throws Exception {
    Callable<String> task = new Echo( input );
    HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
    IExecutorService executorService = 
      hazelcastInstance.getExecutorService( "default" );
      
    Future<String> future = executorService.submitToMember( task, member );
    String echoResult = future.get();
}

public void echoOnTheMemberOwningTheKey( String input, Object key ) throws Exception {
    Callable<String> task = new Echo( input );
    HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
    IExecutorService executorService =
      hazelcastInstance.getExecutorService( "default" );
      
    Future<String> future = executorService.submitToKeyOwner( task, key );
    String echoResult = future.get();
}

public void echoOnSomewhere( String input ) throws Exception { 
    HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
    IExecutorService executorService =
      hazelcastInstance.getExecutorService( "default" );
      
    Future<String> future = executorService.submit( new Echo( input ) );
    String echoResult = future.get();
}

public void echoOnMembers( String input, Set<Member> members ) throws Exception {
    HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
    IExecutorService executorService = 
      hazelcastInstance.getExecutorService( "default" );
      
    Map<Member, Future<String>> futures = executorService
      .submitToMembers( new Echo( input ), members );
      
    for ( Future<String> future : futures.values() ) {
        String echoResult = future.get();
        // ...
    }
}
```


![image](images/NoteSmall.jpg) ***NOTE:*** *You can obtain the set of cluster members via `HazelcastInstance.getCluster().getMembers()` call.*


