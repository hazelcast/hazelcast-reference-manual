package security;

import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;

import org.junit.Test;

import com.hazelcast.config.Config;
import com.hazelcast.config.SecurityConfig;
import com.hazelcast.config.security.RealmConfig;
import com.hazelcast.config.security.TokenIdentityConfig;
import com.hazelcast.config.XmlConfigBuilder;

public class SecurityXmlTest {

    @Test
    public void testPasswordRealm() throws Exception {
        Config config = new Config();
        // tag::password-realm[]
        RealmConfig realmConfig = new RealmConfig()
                .setUsernamePasswordIdentityConfig("member1", "s3crEt");
        config.getSecurityConfig().setMemberRealmConfig("passwordRealm", realmConfig);
        // end::password-realm[]

        Config xconfig = null;
        try (InputStream is=getClass().getResourceAsStream("/hazelcast-password-realm.xml")) {
            xconfig = new XmlConfigBuilder(is).build();
        }
        SecurityConfig securityConfig = xconfig.getSecurityConfig();
        assertTrue(securityConfig.isEnabled());
        RealmConfig xmlRealmConfig = securityConfig.getRealmConfig("passwordRealm");
        assertNotNull(xmlRealmConfig);
        assertEquals(realmConfig, xmlRealmConfig);
    }

    @Test
    public void testRealms() throws Exception {
        Config config = null;
        try (InputStream is=getClass().getResourceAsStream("/hazelcast-security-realms.xml")) {
            config = new XmlConfigBuilder(is).build();
        }
        SecurityConfig securityConfig = config.getSecurityConfig();
        assertTrue(securityConfig.isEnabled());
        RealmConfig realmConfig = securityConfig.getRealmConfig("realm1");
        assertNotNull(realmConfig);
        assertNotNull(realmConfig.getJaasAuthenticationConfig());
        assertNotNull(realmConfig.getCredentialsFactoryConfig());
    }

    @Test
    public void testAuthenticationTypes() throws Exception {
        Config config = null;
        try (InputStream is=getClass().getResourceAsStream("/hazelcast-authentication-types.xml")) {
            config = new XmlConfigBuilder(is).build();
        }
        SecurityConfig securityConfig = config.getSecurityConfig();
        assertTrue(securityConfig.isEnabled());
        assertNotNull(securityConfig.getRealmConfig("jaasRealm"));
        assertNotNull(securityConfig.getRealmConfig("ldapsRealm"));
        assertNotNull(securityConfig.getRealmConfig("tlsRealm"));
        assertNotNull(securityConfig.getRealmConfig("ldapFallbackRealm"));
        assertNotNull(securityConfig.getRealmConfig("credentialsFactoryRealm"));

        //tag::token-realm[]
        TokenIdentityConfig tokenConfig = new TokenIdentityConfig("Hazelcast".getBytes(StandardCharsets.US_ASCII));
        RealmConfig realmConfig = new RealmConfig().setTokenIdentityConfig(tokenConfig);
        //end::token-realm[]

        assertEquals(realmConfig, securityConfig.getRealmConfig("tokenRealm1"));
        assertArrayEquals(
                securityConfig.getRealmConfig("tokenRealm1").getTokenIdentityConfig().getToken(),
                securityConfig.getRealmConfig("tokenRealm2").getTokenIdentityConfig().getToken()
                );
    }

}
