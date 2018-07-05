import com.hazelcast.map.EntryBackupProcessor;
import com.hazelcast.map.EntryProcessor;

import java.io.Serializable;
import java.util.Map;

//tag::iep[]
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
//end::iep[]