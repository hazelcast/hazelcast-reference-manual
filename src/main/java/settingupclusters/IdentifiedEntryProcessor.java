import com.hazelcast.map.AbstractEntryProcessor;
import com.hazelcast.nio.ObjectDataInput;
import com.hazelcast.nio.ObjectDataOutput;
import com.hazelcast.nio.serialization.IdentifiedDataSerializable;
import java.io.IOException;
import java.util.Map;

//tag::iep[]
public class IdentifiedEntryProcessor extends AbstractEntryProcessor<String, String> implements IdentifiedDataSerializable {
     static final int CLASS_ID = 1;
     private String value;
     public IdentifiedEntryProcessor() {
    }
     @Override
    public int getFactoryId() {
        return IdentifiedFactory.FACTORY_ID;
    }
     @Override
    public int getId() {
        return CLASS_ID;
    }
     @Override
    public void writeData(ObjectDataOutput out) throws IOException {
        out.writeUTF(value);
    }
     @Override
    public void readData(ObjectDataInput in) throws IOException {
        value = in.readUTF();
    }
     @Override
    public Object process(Map.Entry<String, String> entry) {
        entry.setValue(value);
        return value;
    }
}
//end::iep[]