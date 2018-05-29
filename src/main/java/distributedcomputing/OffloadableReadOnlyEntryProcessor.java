import com.hazelcast.core.Offloadable;
import com.hazelcast.core.ReadOnly;
import com.hazelcast.map.EntryBackupProcessor;
import com.hazelcast.map.EntryProcessor;

import java.util.Map;

//tag::oroep[]
public class OffloadableReadOnlyEntryProcessor implements EntryProcessor<String, Employee>,
        Offloadable, ReadOnly {

    @Override
    public Object process(Map.Entry<String, Employee> entry) {
        // heavy logic
        return null;
    }

    @Override
    public EntryBackupProcessor<String, Employee> getBackupProcessor() {
        // ReadOnly EntryProcessor has to return null, since it's just a read-only operation that will not be
        // executed on the backup
        return null;
    }

    @Override
    public String getExecutorName() {
        return OFFLOADABLE_EXECUTOR;
    }
}
//end::oroep[]