package security;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.security.auth.Subject;
import javax.security.auth.callback.Callback;
import javax.security.auth.callback.CallbackHandler;
import javax.security.auth.callback.UnsupportedCallbackException;
import javax.security.auth.login.FailedLoginException;
import javax.security.auth.login.LoginException;

import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

import com.hazelcast.config.Config;
import com.hazelcast.security.ClusterLoginModule;
import com.hazelcast.security.ClusterNameCallback;
import com.hazelcast.security.ConfigCallback;
import com.hazelcast.security.Credentials;
import com.hazelcast.security.CredentialsCallback;
import com.hazelcast.security.EndpointCallback;
import com.hazelcast.security.HazelcastPrincipal;
import com.hazelcast.security.PasswordCredentials;
import com.hazelcast.security.UsernamePasswordCredentials;
import com.hazelcast.security.impl.ClusterCallbackHandler;

public class CustomLoginModuleTest {
    @Rule
    public ExpectedException expected = ExpectedException.none();

    @Test
    public void test() throws LoginException {
        Subject subject = new Subject();
        CustomLoginModule lmPass = new CustomLoginModule();
        Map<String, String> options = new HashMap<>();
        options.put("name", "john");
        options.put("password", "doe");
        lmPass.initialize(subject, new TestCallbackHandler("john", "doe"), new HashMap<String, Object>(), options);
        lmPass.login();
        assertEquals("Login should not add Principals to the Subject", 0,
                subject.getPrincipals(HazelcastPrincipal.class).size());
        lmPass.commit();
        assertEquals(3, subject.getPrincipals().size());

        CustomLoginModule lmFail = new CustomLoginModule();
        lmFail.initialize(subject, new TestCallbackHandler("john", "wrongPass"), new HashMap<String, Object>(), options);
        expected.expect(LoginException.class);
        lmFail.login();
    }

    @Test
    public void testCallbacks() throws LoginException {
        CallbackHandler callbackHandler = callbacks->{};

        //tag::callback-sample[]
        CredentialsCallback credcb = new CredentialsCallback();
        ConfigCallback ccb = new ConfigCallback();
        ClusterNameCallback cncb = new ClusterNameCallback();
        try {
            callbackHandler.handle(new Callback[] { credcb, ccb, cncb });
        } catch (IOException | UnsupportedCallbackException e) {
            throw new LoginException("Unable to retrieve necessary data");
        }
        Credentials remoteCredentials = credcb.getCredentials();
        String remoteClusterName = cncb.getClusterName();
        Config hazelcastConfig = ccb.getConfig();
        //end::callback-sample[]

        assertNull(remoteCredentials);
        assertNull(remoteClusterName);
        assertNull(hazelcastConfig);
    }

    public static class CustomLoginModule extends ClusterLoginModule {

        private String name;

        @Override
        public boolean onLogin() throws LoginException {
            String expectedName = getStringOption("name", null);
            String expectedPassword = getStringOption("password", null);
            if (expectedName == null || expectedPassword == null) {
                throw new FailedLoginException(
                        "Name or password login module options were not provided. Fix your configuration.");
            }

            //tag::credentials-callback[]
            CredentialsCallback credcb = new CredentialsCallback();
            try {
                callbackHandler.handle(new Callback[] { credcb });
            } catch (IOException | UnsupportedCallbackException e) {
                throw new LoginException("Unable to retrieve credetials");
            }
            Credentials credentials = credcb.getCredentials();
            if (credentials instanceof PasswordCredentials) {
                PasswordCredentials passwordCredentials = (PasswordCredentials) credentials;
                if (expectedName.equals(credentials.getName())
                        && expectedPassword.equals(passwordCredentials.getPassword())) {
                    name = credentials.getName();
                    addRole(name);
                    return true;
                }
            }
            throw new FailedLoginException("Credentials verification failed.");
            //end::credentials-callback[]
        }

        @Override
        protected String getName() {
            return name;
        }
    }

    static class TestCallbackHandler implements CallbackHandler {

        private final String name;
        private final String password;

        TestCallbackHandler(String name, String password) {
            this.name = name;
            this.password = password;
        }

        @Override
        public void handle(Callback[] callbacks) throws IOException, UnsupportedCallbackException {
            for (Callback cb : callbacks) {
                if (cb instanceof EndpointCallback) {
                    ((EndpointCallback) cb).setEndpoint("127.0.0.1");
                } else if (cb instanceof CredentialsCallback) {
                    ((CredentialsCallback) cb).setCredentials(new UsernamePasswordCredentials(name, password));
                } else {
                    throw new UnsupportedCallbackException(cb);
                }
            }
        }
    }

}
