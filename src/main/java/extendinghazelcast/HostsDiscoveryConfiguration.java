import com.hazelcast.config.properties.PropertyDefinition;
import com.hazelcast.config.properties.PropertyTypeConverter;
import com.hazelcast.config.properties.SimplePropertyDefinition;


//tag::hdc[]
public final class HostsDiscoveryConfiguration {

    public static final PropertyDefinition DOMAIN = new SimplePropertyDefinition("site-domain", PropertyTypeConverter.STRING);

    private HostsDiscoveryConfiguration() {
    }
}
//end::hdc[]