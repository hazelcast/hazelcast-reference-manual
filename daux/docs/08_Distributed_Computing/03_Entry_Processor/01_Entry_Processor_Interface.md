

The following is the `EntryProcessor` interface:

```java
public interface EntryProcessor<K, V> extends Serializable {
  Object process( Map.Entry<K, V> entry );

  EntryBackupProcessor<K, V> getBackupProcessor();
}
```

![image](../../images/NoteSmall.jpg) ***NOTE***: *If you want to execute a task on a single key, you can also use `executeOnKeyOwner` provided by Executor Service. However, in this case you need to perform a lock and serialization.*

When using the `executeOnEntries` method, if the number of entries is high and you need the results, then returning null with the `process()` method is a good practice. By returning null, results of the processing is not stored in the map and thus out of memory errors are eliminated.

