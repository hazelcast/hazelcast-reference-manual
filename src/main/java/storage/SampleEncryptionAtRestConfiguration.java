package storage;

import com.hazelcast.config.EncryptionAtRestConfig;
import com.hazelcast.config.HotRestartPersistenceConfig;
import com.hazelcast.config.JavaKeyStoreSecureStoreConfig;
import com.hazelcast.config.SSLConfig;
import com.hazelcast.config.SecureStoreConfig;
import com.hazelcast.config.VaultSecureStoreConfig;

import java.io.File;

public class SampleEncryptionAtRestConfiguration {

    public static void main(String[] args) throws Exception{
        //tag::encryptionatrest[]
        HotRestartPersistenceConfig hotRestartPersistenceConfig = new HotRestartPersistenceConfig();
        EncryptionAtRestConfig encryptionAtRestConfig =
                hotRestartPersistenceConfig.getEncryptionAtRestConfig();
        encryptionAtRestConfig.setEnabled(true)
                .setAlgorithm("AES/CBC/PKCS5Padding")
                .setSalt("thesalt")
                .setKeySize(128)
                .setSecureStoreConfig(secureStore());
        //end::encryptionatrest[]
        //tag::keystore[]
        JavaKeyStoreSecureStoreConfig keyStoreConfig =
                new JavaKeyStoreSecureStoreConfig(new File("/path/to/keystore.file"))
                        .setType("PKCS12")
                        .setPassword("password")
                        .setCurrentKeyAlias("current")
                        .setPollingInterval(60);
        //end::keystore[]
        //tag::vault[]
        VaultSecureStoreConfig vaultConfig =
                new VaultSecureStoreConfig("http://localhost:1234", "secret/path", "token")
                        .setPollingInterval(60);
        configureSSL(vaultConfig.getSSLConfig());
        //end::vault[]
    }

    private static void configureSSL(SSLConfig sslConfig) {
    }

    private static SecureStoreConfig secureStore() {
        return null;
    }
}