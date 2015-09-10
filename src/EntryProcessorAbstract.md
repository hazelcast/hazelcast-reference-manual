
### Abstract Entry Processor

You can use the `AbstractEntryProcessor` when the same processing will be performed both on the primary and backup map entries (i.e. the same logic applies to them). If you use `EntryProcessor`, you need to apply the same logic to the backup entries separately. The `AbstractEntryProcessor` class makes this primary/backup processing easier.

The code below is the Hazelcast AbstractEntryProcessor class. You use this to create your AbstractEntryProcessor class.

```java
public abstract class AbstractEntryProcessor <K, V>
    implements EntryProcessor <K, V> {
    
  private final EntryBackupProcessor <K,V> entryBackupProcessor;
  public AbstractEntryProcessor() {
    this(true);
  }

  public AbstractEntryProcessor(boolean applyOnBackup) {
    if ( applyOnBackup ) {
      entryBackupProcessor = new EntryBackupProcessorImpl();
    } else {
      entryBackupProcessor = null;
    }
  } 

  @Override
  public abstract Object process(Map.Entry<K, V> entry);

  @Override
  public final EntryBackupProcessor <K, V> getBackupProcessor() {
    return entryBackupProcessor;
  }

  private class EntryBackupProcessorImpl implements EntryBackupProcessor <K,V>{
    @Override
    public void processBackup(Map.Entry<K, V> entry) {
      process(entry); 
    }
  }	
}
```

In the above example, the method `getBackupProcessor` returns an `EntryBackupProcessor` instance. This means the same processing will be applied to both the primary and backup entries. If you want to apply the processing only upon the primary entries, then make the `getBackupProcessor` method return null. 

![image](images/NoteSmall.jpg) ***NOTE***: *Beware of the null issue described at the end of the [EntryProcessor Overview](#entry-processor-overview) section of this documentation. Due to an yet unsent backup from a previous operation, an `EntryBackupProcessor` may temporarily receive `null` from `Map.Entry.getValue()` even though the value actually exists in the map. If you decide to use `AbstractEntryProcessor`, make sure your code logic is not sensitive to null values, or you may encounter `NullPointerException` during runtime.*
