import com.hazelcast.nio.serialization.ByteArraySerializer;

import java.io.IOException;

//tag::empbas[]
public class EmployeeByteArraySerializer
        implements ByteArraySerializer<EmployeeSS> {

    @Override
    public void destroy () {
    }

    @Override
    public int getTypeId () {
        return 1;
    }

    @Override
    public byte[] write( EmployeeSS object )
            throws IOException {
        return object.getName().getBytes();
    }

    @Override
    public EmployeeSS read( byte[] buffer )
            throws IOException {
        String surname = new String( buffer );
        return new EmployeeSS( surname );
    }
}
//end::empbas[]