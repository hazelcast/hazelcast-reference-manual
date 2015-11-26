

### Creating an Entry Processor

The EntryProcessorTest class has the following methods.

* `testMapEntryProcessor` puts one map entry and calls `executeOnKey` to process that map entry.
* `testMapEntryProcessor` puts all the entries in a map and calls `executeOnEntries` to process 
   all the entries.

The static class `IncrementingEntryProcessor` creates an entry processor to process the map 
entries in the EntryProcessorTest class. It creates the entry processor class by:

- implementing the map interfaces `EntryProcessor` and `EntryBackupProcessor`.
- implementing the `java.io.Serializable` interface.
- implementing the `EntryProcessor` methods `process` and `getBackupProcessor`.
- implementing the `EntryBackupProcessor` method `processBackup`.

```java
public class EntryProcessorTest {

  @Test
  public void testMapEntryProcessor() throws InterruptedException {
    Config config = new Config().getMapConfig( "default" )
        .setInMemoryFormat( MapConfig.InMemoryFormat.OBJECT );
        
    HazelcastInstance hazelcastInstance1 = Hazelcast.newHazelcastInstance( config );
    HazelcastInstance hazelcastInstance2 = Hazelcast.newHazelcastInstance( config );
    IMap<Integer, Integer> map = hazelcastInstance1.getMap( "mapEntryProcessor" );
    map.put( 1, 1 );
    EntryProcessor entryProcessor = new IncrementingEntryProcessor();
    map.executeOnKey( 1, entryProcessor );
    assertEquals( map.get( 1 ), (Object) 2 );
    hazelcastInstance1.getLifecycleService().shutdown();
    hazelcastInstance2.getLifecycleService().shutdown();
  }

  @Test
  public void testMapEntryProcessorAllKeys() throws InterruptedException {
    StaticNodeFactory factory = new StaticNodeFactory( 2 );
    Config config = new Config().getMapConfig( "default" )
        .setInMemoryFormat( MapConfig.InMemoryFormat.OBJECT );
        
    HazelcastInstance hazelcastInstance1 = factory.newHazelcastInstance( config );
    HazelcastInstance hazelcastInstance2 = factory.newHazelcastInstance( config );
    IMap<Integer, Integer> map = hazelcastInstance1
        .getMap( "mapEntryProcessorAllKeys" );
        
    int size = 100;
    for ( int i = 0; i < size; i++ ) {
      map.put( i, i );
    }
    EntryProcessor entryProcessor = new IncrementingEntryProcessor();
    Map<Integer, Object> res = map.executeOnEntries( entryProcessor );
    for ( int i = 0; i < size; i++ ) {
      assertEquals( map.get( i ), (Object) (i + 1) );
    }
    for ( int i = 0; i < size; i++ ) {
      assertEquals( map.get( i ) + 1, res.get( i ) );
    }
    hazelcastInstance1.getLifecycleService().shutdown();
    hazelcastInstance2.getLifecycleService().shutdown();
  }

  static class IncrementingEntryProcessor
      implements EntryProcessor, EntryBackupProcessor, Serializable {
      
    public Object process( Map.Entry entry ) {
      Integer value = (Integer) entry.getValue();
      entry.setValue( value + 1 );
      return value + 1;
    }

    public EntryBackupProcessor getBackupProcessor() {
      return IncrementingEntryProcessor.this;
    }

    public void processBackup( Map.Entry entry ) {
      entry.setValue( (Integer) entry.getValue() + 1 );
    }
  }
}
```

![image](images/NoteSmall.jpg) ***NOTE***: *You should explicitly call `setValue` method of `Map.Entry` when modifying data in Entry Processor. Otherwise, Entry Processor will be accepted as read-only.*

![image](images/NoteSmall.jpg) ***NOTE***: *An Entry Processor instance is not thread safe. If you are storing partition specific state between invocations, be sure to register this in a thread-local.  An Entry Processor instance can be used by multiple partition threads.*

