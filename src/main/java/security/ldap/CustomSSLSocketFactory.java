package security.ldap;

import java.io.FileInputStream;
import java.io.IOException;
import java.net.InetAddress;
import java.net.Socket;
import java.security.KeyStore;
import java.security.SecureRandom;

import javax.net.SocketFactory;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManagerFactory;

public class CustomSSLSocketFactory extends SSLSocketFactory {

    private static final SocketFactory INSTANCE = new CustomSSLSocketFactory();

    /**
     * JNDI uses this method when creating {@code ldaps} connections.
     */
    public static SocketFactory getDefault() {
        return INSTANCE;
    }

    private SSLSocketFactory delegate;

    public CustomSSLSocketFactory() {
        try {
            KeyStore trustStore = KeyStore.getInstance(KeyStore.getDefaultType());
            try (FileInputStream fis = new FileInputStream("/opt/ldap.truststore")) {
                trustStore.load(fis, "S3cr3t".toCharArray());
            }
            TrustManagerFactory tmFactory = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
            tmFactory.init(trustStore);
            SSLContext sc = SSLContext.getInstance("TLS");
            sc.init(null, tmFactory.getTrustManagers(), new SecureRandom());
            delegate = sc.getSocketFactory();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public String[] getDefaultCipherSuites() {
        return delegate.getDefaultCipherSuites();
    }

    @Override
    public String[] getSupportedCipherSuites() {
        return delegate.getSupportedCipherSuites();
    }

    @Override
    public Socket createSocket(Socket arg0, String arg1, int arg2, boolean arg3) throws IOException {
        return delegate.createSocket(arg0, arg1, arg2, arg3);
    }

    @Override
    public Socket createSocket(String arg0, int arg1) throws IOException {
        return delegate.createSocket(arg0, arg1);
    }

    @Override
    public Socket createSocket(InetAddress arg0, int arg1) throws IOException {
        return delegate.createSocket(arg0, arg1);
    }

    @Override
    public Socket createSocket(String arg0, int arg1, InetAddress arg2, int arg3) throws IOException {
        return delegate.createSocket(arg0, arg1, arg2, arg3);
    }

    @Override
    public Socket createSocket(InetAddress arg0, int arg1, InetAddress arg2, int arg3) throws IOException {
        return delegate.createSocket(arg0, arg1, arg2, arg3);
    }
}
