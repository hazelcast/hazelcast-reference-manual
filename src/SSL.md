
## SSL

<font color="#3981DB">**Hazelcast Enterprise**</font>
<br></br>


![image](images/NoteSmall.jpg) ***NOTE:*** *You cannot use SSL when [Hazelcast Encryption](#encryption) is enabled.*
<br></br>

One of the offers of Hazelcast is the SSL (Secure Sockets Layer) protocol which you can use to establish an encrypted communication across your cluster. Note that, if you are developing applications using Java 8, you wıll be using its successor TLS (Transport Layer Security).

### SSL for Hazelcast Members

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

You can set `keyStore` and `keyStorePassword` also using the following system properties.

 - `javax.net.ssl.keyStore`
 - `javax.net.ssl.keyStorePassword` 

### SSL for Hazelcast Clients

Hazelcast Java and .NET clients also have SSL support. Following is a programmatic configuration for Java client:

```java
System.setProperty("javax.net.ssl.keyStore", new File("hazelcast.ks").getAbsolutePath());
System.setProperty("javax.net.ssl.trustStore", new File("hazelcast.ts").getAbsolutePath());
System.setProperty("javax.net.ssl.keyStorePassword", "password");

ClientConfig clientConfig = new ClientConfig();
clientConfig.getNetworkConfig().addAddress("127.0.0.1");
```

![image](images/NoteSmall.jpg) ***NOTE:*** *When you use SSL with the Java client, it will have a throughput that is 50% of a non-SSL Java client with the same configuration. If it is a .NET client, it will have a throughput that is 46% of a non-SSL .NET client.*
