import com.hazelcast.nio.ObjectDataInput;
import com.hazelcast.nio.ObjectDataOutput;
import com.hazelcast.spi.merge.MergingCreationTime;
import com.hazelcast.spi.merge.MergingHits;
import com.hazelcast.spi.merge.SplitBrainMergePolicy;

//tag::ch[]
public class ComposedHitsAndCreationTimeMergePolicy<V, T extends MergingHits<V> & MergingCreationTime<V>>
        implements SplitBrainMergePolicy<V, T> {

    @Override
    public V merge(T mergingValue, T existingValue) {
        if (existingValue == null) {
            return mergingValue.getValue();
        }
        System.out.println("========================== Merging value " + mergingValue.getDeserializedValue() + "..."
                + "\n    mergingValue creation time: " + mergingValue.getCreationTime()
                + "\n    existingValue creation time: " + existingValue.getCreationTime()
                + "\n    mergingValue hits: " + mergingValue.getHits()
                + "\n    existingValue hits: " + existingValue.getHits()
        );
 
        if (mergingValue.getCreationTime() < existingValue.getCreationTime()
                && mergingValue.getHits() > existingValue.getHits()) {
            return mergingValue.getValue();
        }
        return existingValue.getValue();
    }

    @Override
    public void writeData(ObjectDataOutput out) {
    }

    @Override
    public void readData(ObjectDataInput in) {
    }
}
//end::ch[]