import com.hazelcast.config.Config;
import com.hazelcast.config.SecurityConfig;


public class EnablingSecurity {

    public static void main(String[] args) throws Exception{
//tag::es[]
        Config cfg = new Config();
        SecurityConfig securityCfg = cfg.getSecurityConfig();
        securityCfg.setEnabled( true );
//end::es[]
    }
}
