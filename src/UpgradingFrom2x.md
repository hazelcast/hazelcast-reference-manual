
### Upgrading from 2.x


- **Removal of deprecated static methods:**
The static methods of Hazelcast class reaching Hazelcast data components have been removed. The functionality of these methods can be reached from the HazelcastInstance interface. You should replace the following:

```java
Map<Integer, String> customers = Hazelcast.getMap( "customers" );
```

with

```java
HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
// or if you already started an instance named "instance1"
// HazelcastInstance hazelcastInstance = Hazelcast.getHazelcastInstanceByName( "instance1" );
Map<Integer, String> customers = hazelcastInstance.getMap( "customers" );
```

- **Renaming "instance" to "distributed object":**
Before 3.0 there was confusion about the term "instance": it was used for both the cluster members and the distributed objects (map, queue, topic, etc. instances). Starting with 3.0, the term instance will be only used for Hazelcast instances, namely cluster members. We will use the term "distributed object" for map, queue, etc. instances. You should replace the related methods with the new renamed ones. 3.0 clients are smart client in that they know in which node the data is located, so you can replace your lite members with native clients.

```java
public static void main( String[] args ) throws InterruptedException {
  HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
  IMap map = hazelcastInstance.getMap( "test" );
  Collection<Instance> instances = hazelcastInstance.getInstances();
  for ( Instance instance : instances ) {
    if ( instance.getInstanceType() == Instance.InstanceType.MAP ) {
      System.out.println( "There is a map with name: " + instance.getId() );
    }
  }
}
```

with

```java
public static void main( String[] args ) throws InterruptedException {
  HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
  IMap map = hz.getMap( "test" );
  Collection<DistributedObject> objects = hazelcastInstance.getDistributedObjects();
  for ( DistributedObject distributedObject : objects ) {
    if ( distributedObject instanceof IMap ) {
      System.out.println( "There is a map with name: " + distributedObject.getName() );
    }
  }
}
```

- **Package structure change:**
PartitionService has been moved to package `com.hazelcast.core` from `com.hazelcast.partition`.


- **Listener API change:**
Before 3.0, `removeListener` methods were taking the Listener object as a parameter. But this caused confusion because same listener object may be used as a parameter for different listener registrations. So we have changed the listener API. `addListener` methods returns a unique ID and you can remove a listener by using this ID. So you should do the following replacement if needed:

```java
IMap map = hazelcastInstance.getMap( "map" );
map.addEntryListener( listener, true );
map.removeEntryListener( listener );
``` 
   
with
	
```java
IMap map = hazelcastInstance.getMap( "map" );
String listenerId = map.addEntryListener( listener, true );
map.removeEntryListener( listenerId );
```

- **IMap changes:**
- `tryRemove(K key, long timeout, TimeUnit timeunit)` returns boolean indicating whether operation is successful.
- `tryLockAndGet(K key, long time, TimeUnit timeunit)` is removed.
- `putAndUnlock(K key, V value)` is removed.
- `lockMap(long time, TimeUnit timeunit)` and `unlockMap()` are removed.
- `getMapEntry(K key)` is renamed as `getEntryView(K key)`. The returned object's type, MapEntry class is renamed as EntryView.
- There is no predefined names for merge policies. You just give the full class name of the merge policy implementation.

```xml
<merge-policy>com.hazelcast.map.merge.PassThroughMergePolicy</merge-policy>
```

Also MergePolicy interface has been renamed to MapMergePolicy and also returning null from the implemented `merge()` method causes the existing entry to be removed.

- **IQueue changes:**
There is no change on IQueue API but there are changes on how `IQueue` is configured. With Hazelcast 3.0 there will be no backing map configuration for queue. Settings like backup count will be directly configured on queue config. For queue configuration details, please see the [Queue section](#queue).
- **Transaction API change:**
In Hazelcast 3.0, transaction API is completely different. Please see the [Transactions chapter](#transactions).
- **ExecutorService API change:**
Classes MultiTask and DistributedTask have been removed. All the functionality is supported by the newly presented interface IExecutorService. Please see the [Executor Service section](#executor-service).
- **LifeCycleService API:**
The lifecycle has been simplified. `pause()`, `resume()`, `restart()` methods have been removed.
- **AtomicNumber:**
`AtomicNumber` class has been renamed to `IAtomicLong`.
- **ICountDownLatch:**
`await()` operation has been removed. We expect users to use `await()` method with timeout parameters.
- **ISemaphore API:**
The `ISemaphore` has been substantially changed. `attach()`, `detach()` methods have been removed.
- In 2.x releases, the default value for `max-size` eviction policy was **cluster_wide_map_size**. In 3.x releases, default is **PER_NODE**. After upgrading, the `max-size` should be set according to this new default, if it is not changed. Otherwise, it is likely that OutOfMemory exception may be thrown.




