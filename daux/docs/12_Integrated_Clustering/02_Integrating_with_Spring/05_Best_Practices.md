
Spring tries to create a new `Map`/`Collection` instance and fill the new instance by iterating and converting values of the original `Map`/`Collection` (`IMap`, `IQueue`, etc.) to required types when generic type parameters of the original `Map`/`Collection` and the target property/attribute do not match.

Since Hazelcast `Map`s/`Collection`s are designed to hold very large data which a single machine cannot carry, iterating through whole values can cause out of memory errors.

To avoid this issue, the target property/attribute can be declared as un-typed `Map`/`Collection` as shown below.

```java
public class SomeBean {
  @Autowired
  IMap map; // instead of IMap<K, V> map

  @Autowired
  IQueue queue; // instead of IQueue<E> queue

  ...
}
```

Or, parameters of injection methods (constructor, setter) can be un-typed as shown below.

```java
public class SomeBean {

  IMap<K, V> map;

  IQueue<E> queue;

  // Instead of IMap<K, V> map
  public SomeBean(IMap map) {
    this.map = map;
  }

  ...

  // Instead of IQueue<E> queue
  public void setQueue(IQueue queue) {
    this.queue = queue;
  }
  ...
}
```
<br> </br>

***RELATED INFORMATION***

*For more information please see <a href="https://jira.springsource.org/browse/SPR-3407" target="_blank">Spring issue-3407</a>.*

