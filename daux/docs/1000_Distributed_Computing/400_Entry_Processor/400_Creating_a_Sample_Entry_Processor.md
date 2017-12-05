

### Creating an Entry Processor

The class `IncrementingEntryProcessor` creates an entry processor to process the map 
entries. It implements:

- the map interfaces `EntryProcessor` and `EntryBackupProcessor`.
- `java.io.Serializable` interface.
- `EntryProcessor` methods `process` and `getBackupProcessor`.
- `EntryBackupProcessor` method `processBackup`.

```java
public class IncrementingEntryProcessor
      implements EntryProcessor<Integer, Integer>, EntryBackupProcessor<Integer, Integer>, Serializable {

    public Object process( Map.Entry<Integer, Integer> entry ) {
      Integer value = entry.getValue();
      entry.setValue( value + 1 );
      return value + 1;
    }

    public EntryBackupProcessor<Integer, Integer> getBackupProcessor() {
      return IncrementingEntryProcessor.this;
    }

    public void processBackup( Map.Entry<Integer, Integer> entry ) {
      entry.setValue( entry.getValue() + 1 );
    }
  }
}
```

A sample usage is shown below:

```java
IMap<Integer, Integer> map = hazelcastInstance.getMap( "myMap" );
for ( int i = 0; i < 100; i++ ) {
  map.put( i, i );
}
Map<Integer, Object> res = map.executeOnEntries( new IncrementingEntryProcessor() );
```


![image](../../images/NoteSmall.jpg) ***NOTE***: *You should explicitly call the `setValue` method of `Map.Entry` when modifying data in the entry processor. Otherwise, the entry processor will be accepted as read-only.*

![image](../../images/NoteSmall.jpg) ***NOTE***: *An entry processor instance is not thread safe. If you are storing a partition specific state between invocations, be sure to register this in a thread-local.  An entry processor instance can be used by multiple partition threads.*

