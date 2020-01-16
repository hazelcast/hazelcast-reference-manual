import com.hazelcast.nio.ObjectDataInput;
import com.hazelcast.nio.ObjectDataOutput;
import com.hazelcast.spi.merge.MergingValue;
import com.hazelcast.spi.merge.SplitBrainMergePolicy;

import java.util.ArrayList;
import java.util.Collection;

//tag::mivmp2[]
public class MergeIntegerValuesMergePolicy2<V, T extends MergingValue<V>> implements SplitBrainMergePolicy<V, T, Object> {

    @Override
    public Object merge(T mergingValue, T existingValue) {
        if (mergingValue.getValue() instanceof Integer) {
            return mergingValue.getRawValue();
        }
        if (existingValue != null && existingValue.getValue() instanceof Integer) {
            return existingValue.getRawValue();
        }
        if (mergingValue.getRawValue() instanceof Collection) {
            Collection<Object> result = new ArrayList<>();
            addIntegersToCollection(mergingValue, result);
            if (result.isEmpty() && existingValue != null) {
                addIntegersToCollection(existingValue, result);
            }
            return result;
        }
        return null;
    }

    private void addIntegersToCollection(T mergingValue, Collection<Object> result) {
        for (Object value : (Collection<Object>) mergingValue.getValue()) {
            if (value instanceof Integer) {
                result.add(value);
            }
        }
    }

    @Override
    public void writeData(ObjectDataOutput out) {
    }

    @Override
    public void readData(ObjectDataInput in) {
    }
}
//end::mivmp2[]