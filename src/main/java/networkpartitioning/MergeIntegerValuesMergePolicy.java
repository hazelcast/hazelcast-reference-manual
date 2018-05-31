import com.hazelcast.cardinality.CardinalityEstimator;
import com.hazelcast.nio.ObjectDataInput;
import com.hazelcast.nio.ObjectDataOutput;
import com.hazelcast.spi.merge.MergingValue;
import com.hazelcast.spi.merge.SplitBrainMergePolicy;

//tag::mivmp[]
public class MergeIntegerValuesMergePolicy<V> implements SplitBrainMergePolicy<V, MergingValue<V>> {

    @Override
    public V merge(MergingValue<V> mergingValue, MergingValue<V> existingValue) {
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
//end::mivmp[]