import com.hazelcast.core.IAtomicReference;
import com.hazelcast.nio.ObjectDataInput;
import com.hazelcast.nio.ObjectDataOutput;
import com.hazelcast.spi.merge.MergingValue;
import com.hazelcast.spi.merge.SplitBrainMergePolicy;
import com.hazelcast.spi.merge.SplitBrainMergeTypes.AtomicReferenceMergeTypes;

//tag::ar[]
public class AtomicReferenceMergeIntegerValuesMergePolicy implements SplitBrainMergePolicy<Object, AtomicReferenceMergeTypes> {

    @Override
    public Object merge(AtomicReferenceMergeTypes mergingValue, AtomicReferenceMergeTypes existingValue) {
        Object mergingUserValue = mergingValue.getDeserializedValue();
        Object existingUserValue = existingValue == null ? null : existingValue.getDeserializedValue();
        System.out.println("========================== Merging..."
                + "\n    mergingValue: " + mergingUserValue
                + "\n    existingValue: " + existingUserValue
                + "\n    mergingValue class: " + mergingUserValue.getClass().getName()
                + "\n    existingValue class: " + (existingUserValue == null ? "null" : existingUserValue.getClass().getName())
        );
        if (mergingUserValue instanceof Integer) {
            return mergingValue.getValue();
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