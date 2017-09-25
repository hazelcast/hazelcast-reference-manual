
## TLS/SSL

<font color="#3981DB">**Hazelcast IMDG Enterprise**</font>
<br></br>


![image](images/NoteSmall.jpg) ***NOTE:*** *You cannot use TLS/SSL when [Hazelcast Encryption](#encryption) is enabled.*
<br></br>

One of the offers of Hazelcast is the SSL (Secure Sockets Layer) protocol which you can use to establish an encrypted communication across your cluster with key stores and trust stores. Note that, if you are developing applications using Java 8, you will be using its successor TLS (Transport Layer Security).


<br></br>
![image](images/NoteSmall.jpg) ***NOTE:*** *It is NOT recommended to reuse the key stores and trust stores for external applications.*
<br></br>


### TLS/SSL for Hazelcast Members

Hazelcast allows you to encrypt socket level communication between Hazelcast members and between Hazelcast clients and members, for end to end encryption. To use it, you need to implement `com.hazelcast.nio.ssl.SSLContextFactory` and configure the SSL section in the network configuration.

The following is the implementation code snippet:

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

The following is the base declarative configuration for the implemented `SSLContextFactory`:

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

Hazelcast provides a default SSLContextFactory, `com.hazelcast.nio.ssl.BasicSSLContextFactory`, which uses the configured keystore to initialize `SSLContext`; see the following example configuration for TLS/SSL.

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
        <property name="trustStore">trustStore</property>
        <property name="trustStorePassword">trustStorePassword</property>
        <property name="keyManagerAlgorithm">SunX509</property>
        <property name="trustManagerAlgorithm">SunX509</property>
        <property name="protocol">TLS</property>
      </properties>
    </ssl>
  </network>
  ...
</hazelcast>
```

Here are the descriptions for the properties:
 
* `keystore`: Path of your keystore file. Note that your keystore's type must be `JKS`.
* `keyStorePassword`: Password to access the key from your keystore file.
* `keyManagerAlgorithm`: Name of the algorithm based on which the authentication keys are provided.
* `keyStoreType`: The type of the keystore. Its default value is `JKS`. 
* `truststore`: Path of your truststore file. The file truststore is a keystore file that contains a collection of certificates trusted by your application. Its type should be `JKS`.
* `trustStorePassword`: Password to unlock the truststore file.
* `trustManagerAlgorithm`: Name of the algorithm based on which the trust managers are provided.
* `trustStoreType`: The type of the truststore. Its default value is `JKS`. 
* `protocol`: Name of the algorithm which is used in your TLS/SSL. Its default value is `TLS`. Available values are:
  * SSL
  * SSLv2
  * SSLv3
  * TLS
  * TLSv1
  * TLSv1.1
  * TLSv1.2

  All of the above algorithms support Java 6 and higher versions, except the TLSv1.2 supports Java 7 and higher versions. For the `protocol` property, we recommend you to provide SSL or TLS with its version information, e.g., `TLSv1.2`. Note that if you write only `SSL` or `TLS`, your application will choose the SSL or TLS version according to your Java version.

#### Other Property Configuration Options

You can set all the properties presented in this section using the `javax.net.ssl` prefix, e.g., `javax.net.ssl.keyStore` and `javax.net.ssl.keyStorePassword`.

Also note that these properties can be specified using the related Java system properties and also Java's `-D` command line option. See below equivalent examples:

```
System.setProperty("javax.net.ssl.trustStore", "/user/home/hazelcast.ts");
```

Or, 

```
-Djavax.net.ssl.trustStore=/user/home/hazelcast.ts
```
 

### TLS/SSL for Hazelcast Clients

Hazelcast clients which support TLS/SSL should have the following properties to configure the TLS/SSL:

```java
Properties clientSslProps = TestKeyStoreUtil.createSslProperties();
clientSslProps.setProperty("javax.net.ssl.trustStore", getTrustStoreFilePath());
clientSslProps.setProperty("javax.net.ssl.trustStorePassword", "123456");
ClientConfig config = new ClientConfig();
config.getNetworkConfig().setSSLConfig(new SSLConfig().setEnabled(true).setProperties(clientSslProps));
```

### Mutual Authentication

As explained above, Hazelcast members have keyStore used to identify themselves (to other members) and Hazelcast clients have trustStore used to define which members they can trust. 

Starting with Hazelcast 3.8.1, mutual authentication is introduced. This allows the clients also to have their keyStores and members to have their trustStores so that the members can know which clients they can trust.

To enable mutual authentication, you need to set the following property at the member side:

```
props.setProperty("javax.net.ssl.mutualAuthentication", "REQUIRED");
```

And at the client side, you need to set the following properties:

```
clientSslProps.setProperty("javax.net.ssl.keyStore", getKeyStoreFilePath());
clientSslProps.setProperty("javax.net.ssl.keyStorePassword", "123456");
```

Please see the below example snippet to see the full configuration at the member side:

```java
Config cfg = new Config();
Properties props = new Properties();
 
props.setProperty("javax.net.ssl.keyStore", getKeyStoreFilePath());
props.setProperty("javax.net.ssl.trustStore", getTrustStoreFilePath());
props.setProperty("javax.net.ssl.keyStorePassword", "123456");
props.setProperty("javax.net.ssl.trustStorePassword", "123456");
props.setProperty("javax.net.ssl.mutualAuthentication", "REQUIRED");
 
cfg.getNetworkConfig().setSSLConfig(new SSLConfig().setEnabled(true).setProperties(props));
Hazelcast.newHazelcastInstance(cfg);
```

The property `javax.net.ssl.mutualAuthentication` has two options:

* REQUIRED: If the client does not provide a keystore or the provided keys are not included in the member's truststore, the client will not be authenticated.
* OPTIONAL: If the client does not provide a keystore, it will be authenticated. But if the client provides keys that are not included in the member's truststore, the client will not be authenticated.


<br></br>
![image](images/NoteSmall.jpg) ***NOTE:*** *When a new client is introduced with a new keystore, the truststore at the member side should be updated accordingly to include new clients' information to be able to accept it.*
<br></br>


Please see the below example snippet to see the full configuration at the client side:

```java
Properties clientSslProps = new Properties();
clientSslProps.setProperty("javax.net.ssl.keyStore", getKeyStoreFilePath());
clientSslProps.setProperty("javax.net.ssl.trustStore", getTrustStoreFilePath());
clientSslProps.setProperty("javax.net.ssl.keyStorePassword", "123456");
clientSslProps.setProperty("javax.net.ssl.trustStorePassword", "123456");
ClientConfig config = new ClientConfig();
config.getNetworkConfig().setSSLConfig(new SSLConfig().setEnabled(true).setProperties(clientSslProps));
 
HazelcastClient.newHazelcastClient(config);
```


### TLS/SSL Performance Improvements for Java

TLS/SSL can have a significant impact on performance. There are a few ways to increase the performance. 

The first thing that can be done is making sure that AES intrensics are used. Modern CPUs (2010 or newer Westmere) have hardware support for AES encryption/decryption and if a Java 8 or newer JVM is
used, the JIT will automatically make use of these AES instructions. They can also be explicitly enabled using `-XX:+UseAES -XX:+UseAESIntrinsics`, 
or disabled using `-XX:-UseAES -XX:-UseAESIntrinsics`. 

A lot of encryption algorithms make use of padding because they encrypt/decrypt in fixed sized blocks. If not enough data is available 
for a block, the algorithm relies on random number generation to pad. Under Linux, the JVM automatically makes use of `/dev/random` for 
the generation of random numbers. `/dev/random` relies on entropy to be able to generate random numbers. However if this entropy is 
insufficient to keep up with the rate requiring random numbers, it can slow down the encryption/decryption since `/dev/random` will
block; it could block for minutes waiting for sufficient entropy . This can be fixed
by adding the following system property `-Djava.security.egd=file:/dev/./urandom`. For a more permanent solution, modify 
`<JAVA_HOME>/jre/lib/security/java.security` file, look for the `securerandom.source=/dev/urandom` and change it 
to `securerandom.source=file:/dev/./urandom`. Switching to `/dev/urandom` could be controversial because the `/dev/urandom` will not 
block if there is a shortage of entropy and the returned random values could theoretically be vulnerable to a cryptographic attack. 
If this is a concern in your application, use `/dev/random` instead.

Another way to increase performance for the Java smart client is to make use of Hazelcast 3.8. In Hazelcast 3.8, the Java smart client 
automatically makes use of extra I/O threads for encryption/decryption and this have a significant impact on the performance. This can
be changed using the `hazelcast.client.io.input.thread.count` and `hazelcast.client.io.input.thread.count` client system properties.
By default it is 1 input thread and 1 output thread. If TLS/SSL is enabled, it will default to 3 input threads and 3 output threads.
Having more client I/O threads than members in the cluster will not lead to an increased performance. So with a 2-member cluster,
2 in and 2 out threads will give the best performance.

### TLS/SSL Debugging

To assist with TLS/SSL issues, the following system property can be used:

```
-Djavax.net.debug=all
```

The property will provide a lot of logging output including the TLS/SSL handshake, that can be used to determine the cause of the problem. For more information please see [Debugging TSL/SSL Connections](http://docs.oracle.com/javase/8/docs/technotes/guides/security/jsse/ReadDebug.html).
