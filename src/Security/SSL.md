
## SSL

<font color="#3981DB">**Hazelcast Enterprise**</font>
<br></br>


Hazelcast allows you to encrypt socket level communication between Hazelcast members and between Hazelcast clients and members, for end to end encryption. To use it, you need to implement `com.hazelcast.nio.ssl.SSLContextFactory` and configure the SSL section in network configuration.

```java
public class MySSLContextFactory implements SSLContextFactory {
  public void init( Properties properties ) throws Exception {
  }

  public SSLContext getSSLContext() {
    ...
    SSLContext sslCtx = SSLContext.getInstance( protocol );
    return sslCtx;
  }
}
```

```xml
<hazelcast>
  ...
  <network>
    ...
    <ssl enabled="true">
      <factory-class-name>
          com.hazelcast.examples.MySSLContextFactory
      </factory-class-name>
      <properties>
        <property name="foo">bar</property>
      </properties>
    </ssl>
  </network>
  ...
</hazelcast>
```

Hazelcast provides a default SSLContextFactory, `com.hazelcast.nio.ssl.BasicSSLContextFactory`, which uses configured keystore to initialize `SSLContext`. You define `keyStore` and `keyStorePassword`, and you can set `keyManagerAlgorithm` (default `SunX509`), `trustManagerAlgorithm` (default `SunX509`) and `protocol` (default `TLS`).

```xml
<hazelcast>
  ...
  <network>
    ...
    <ssl enabled="true">
      <factory-class-name>
          com.hazelcast.nio.ssl.BasicSSLContextFactory
      </factory-class-name>
      <properties>
        <property name="keyStore">keyStore</property>
        <property name="keyStorePassword">keyStorePassword</property>
        <property name="keyManagerAlgorithm">SunX509</property>
        <property name="trustManagerAlgorithm">SunX509</property>
        <property name="protocol">TLS</property>
      </properties>
    </ssl>
  </network>
  ...
</hazelcast>
```

Hazelcast client also has SSL support. You can configure Client SSL programmatically as shown below.

```java
System.setProperty("javax.net.ssl.keyStore", new File("hazelcast.ks").getAbsolutePath());
System.setProperty("javax.net.ssl.trustStore", new File("hazelcast.ts").getAbsolutePath());
System.setProperty("javax.net.ssl.keyStorePassword", "password");

ClientConfig clientConfig = new ClientConfig();
clientConfig.getNetworkConfig().addAddress("127.0.0.1");
```

For example, you can set `keyStore` and `keyStorePassword` with the following system properties.

 - `javax.net.ssl.keyStore`
 - `javax.net.ssl.keyStorePassword` 

![image](images/NoteSmall.jpg) ***NOTE:*** *You cannot use SSL when [Hazelcast Encryption](#encryption) is enabled.*
