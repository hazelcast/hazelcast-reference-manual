<font color="#3981DB">**Hazelcast IMDG Enterprise**</font>
<br></br>


![image](../images/NoteSmall.jpg) ***NOTE:*** *You cannot integrate OpenSSL into Hazelcast when [Hazelcast Encryption](03_Encryption.md) is enabled.*

Instead of making use of TLS/SSL by implementing `SSLContextFactory`, which is based on Java's default `SSLEngine`, you can also use [OpenSSL](https://www.openssl.org/) with Hazelcast. By integrating OpenSSL you can benefit from using a cipher suite too.

Integrating OpenSSL into Hazelcast is achieved with the following steps:

- Installing OpenSSL
- Configuring Hazelcast to use OpenSSL
- Configuring Cipher Suites

Below sections explain these steps.


### Installing OpenSSL

To install OpenSSL and have it ready for Hazelcast configuration please follow the below steps:

1. Install OpenSSL. Make sure that you are installing 1.0.1 or 1.0.2 releases. Please refer to its documentation at [github.com/openssl](https://github.com/openssl/openssl/blob/master/INSTALL).
2. Install Apache Portable Runtime library. Please refer to [apr.apache.org](https://apr.apache.org/download.cgi).
3. Install the following libraries from the Netty framework. They can be found at common package managers such as Maven:
   - `netty-buffer-4.1.8.Final.jar`
   - `netty-common-4.1.8.Final.jar`
   - `netty-handler-4.1.8.Final.jar`
   - `netty-tcnative-boringssl-static-1.1.33.Fork26-linux-x86_64.jar`
  


### Configuring Hazelcast for OpenSSL

On the client or member side, following is an example configuration snippet:

```xml
<ssl enabled="true">
    <factory-class-name>com.hazelcast.nio.ssl.OpenSSLEngineFactory</factory-class-name>
     
    <properties>
        <property name="keyStore">upload/hazelcast.keystore</property>
        <property name="keyStorePassword">123456</property>
        <property name="keyManagerAlgorithm">SunX509</property>
        <property name="trustManagerAlgorithm">SunX509</property>
        <property name="trustStore">upload/hazelcast.truststore</property>
        <property name="trustStorePassword">123456</property>
        <property name="protocol">TLSv1.2</property>
    </properties>
</ssl>
```

Here are the descriptions for the properties:
 
* `keystore`: Path of your keystore file. Note that your keystore's type must be `JKS`.
* `keyStorePassword`: Password to access the key from your keystore file.
* `keyManagerAlgorithm`: Name of the algorithm based on which the authentication keys are provided.
* `trustManagerAlgorithm`: Name of the algorithm based on which the trust managers are provided.
* `truststore`: Path of your truststore file. The file truststore is a keystore file that contains a collection of certificates trusted by your application. Its type should be `JKS`.
* `trustStorePassword`: Password to unlock the truststore file.
* `protocol`: Name of the algorithm which is used in your TLS/SSL. Its default value is `TLS`. Available values are:
  * SSL
  * SSLv2
  * SSLv3
  * TLS
  * TLSv1
  * TLSv1.1
  * TLSv1.2

  All of the above algorithms support Java 6 and higher versions, except the TLSv1.2 supports Java 7 and higher versions. For the `protocol` property, we recommend you to provide SSL or TLS with its version information, e.g., `TLSv1.2`. Note that if you write only `SSL` or `TLS`, your application will choose the SSL or TLS version according to your Java version.


### Configuring Cipher Suites

To get the most out of OpenSSL, you need to use [cipher suites](https://en.wikipedia.org/wiki/Cipher_suite). You can configure a member and client with different cipher suites; in this case, for the sake of a better performance, it is recommended to have at least one shared cipher suite between the members and clients. 

It is configured as a property just as the other OpenSSL properties listed in the previous section. Cipher suite configuration accepts a comma separated list (spaces, enters, tabs are filtered out) of cipher suites in the order of preference.

On the client or member side, following is an example configuration snippet where two cipher suites are provided:

```xml
<ssl enabled="true">
    <factory-class-name>com.hazelcast.nio.ssl.OpenSSLEngineFactory</factory-class-name>
     
    <properties>
        <property name="keyStore">upload/hazelcast.keystore</property>
        ...
        ...
        ...
        <property name="ciphersuites">TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256,
                                      TLS_ECDH_RSA_WITH_3DES_EDE_CBC_SHA
    </properties>
</ssl>
```



### Other Ways of Configuring Properties

You can set all the properties presented in this section using the `javax.net.ssl` prefix, e.g., `javax.net.ssl.keyStore` and `javax.net.ssl.keyStorePassword`.

Also note that these properties can be specified using the related Java system properties and also Java's `-D` command line option. See below examples equivalent to each other:

```
System.setProperty("javax.net.ssl.trustStore", "/user/home/hazelcast.ts");
```

Or, 

```
-Djavax.net.ssl.trustStore=/user/home/hazelcast.ts
```

Another two examples equivalent to each other:


```
System.setProperty("javax.net.ssl.ciphersuites", "TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256,TLS_ECDH_RSA_WITH_3DES_EDE_CBC_SHA");
```

Or,


```
-Djavax.net.ssl.ciphersuites=TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256,TLS_ECDH_RSA_WITH_3DES_EDE_CBC_SHA
```

