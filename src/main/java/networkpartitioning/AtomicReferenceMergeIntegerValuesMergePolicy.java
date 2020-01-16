import com.hazelcast.nio.ObjectDataInput;
import com.hazelcast.nio.ObjectDataOutput;
import com.hazelcast.spi.merge.SplitBrainMergePolicy;
import com.hazelcast.spi.merge.SplitBrainMergeTypes.AtomicReferenceMergeTypes;

//tag::ar[]
public class AtomicReferenceMergeIntegerValuesMergePolicy
        implements SplitBrainMergePolicy<Object, AtomicReferenceMergeTypes, Object> {

    @Override
    public Object merge(AtomicReferenceMergeTypes mergingValue, AtomicReferenceMergeTypes existingValue) {
        Object mergingUserValue = mergingValue.getValue();
        Object existingUserValue = existingValue == null ? null : existingValue.getValue();
        System.out.println("========================== Merging..."
                + "\n    mergingValue: " + mergingUserValue
                + "\n    existingValue: " + existingUserValue
                + "\n    mergingValue class: " + mergingUserValue.getClass().getName()
                + "\n    existingValue class: " + (existingUserValue == null ? "null" : existingUserValue.getClass().getName())
        );
        if (mergingUserValue instanceof Integer) {
            return mergingValue.getRawValue();
        }
        return null;
    }

    @Override
    public void writeData(ObjectDataOutput out) {
    }

    @Override
    public void readData(ObjectDataInput in) {
    }
}
//end::ar[]