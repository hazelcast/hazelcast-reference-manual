
## Integrating OpenSSL

<font color="#3981DB">**Hazelcast IMDG Enterprise**</font>
<br></br>


![image](../images/NoteSmall.jpg) ***NOTE:*** *You cannot integrate OpenSSL into Hazelcast when [Hazelcast Encryption](03_Encryption.md) 
is enabled.*

TLS/SSL in Java normally is provided by the JRE; however the performance overhead can be significant; even with AES intrensics
enabled. If you are using Linux, Hazelcast provides OpenSSL integration for TLS/SSL which can provide significant performance
improvements.

OpenSSL can be used on client and or server. For best performance, it is recommended to install on client and server and 
configure the appropriate cipher-suite(s).

Integrating OpenSSL into Hazelcast is achieved with the following steps:

- Installing OpenSSL
- Configuring Hazelcast to use OpenSSL
- Configuring Cipher Suites

Below sections explain these steps.

### Installing OpenSSL

Install OpenSSL. Make sure that you are installing 1.0.1 or 1.0.2 releases. Please refer to its documentation at 
[github.com/openssl](https://github.com/openssl/openssl/blob/master/INSTALL). 

On the major distributions OpenSSL is installed by default. Make sure the OpenSSL version is not suffering from the 
[Heartbleed Bug](http://heartbleed.com). 

### Apache Portable Runtime library

Install Apache Portable Runtime library. Please refer to [apr.apache.org](https://apr.apache.org/download.cgi). 

For RHEL:
`sudo yum -y install apr`

For Ubuntu:
`sudo apt-get -y install libapr1`

### Netty libraries

For the OpenSSL integration in Java, the [Netty](https://netty.io/) library is used. 

Make sure the following libraries from tne Netty framework are on the classpath:
   - `netty-buffer-4.1.8.Final.jar`
   - `netty-codec-4.1.8.Final.jar`
   - `netty-common-4.1.8.Final.jar`
   - `netty-buffer-4.1.8.Final.jar`
   - `netty-resolver-4.1.8.Final.jar`
   - `netty-transport-4.1.8.Final.jar`
   - `netty-tcnative-boringssl-static-1.1.33.Fork26-linux-x86_64.jar`

For a Maven based project, the following snippet adds the jars.
```xml
    <dependencies>
        <dependency>
            <groupId>io.netty</groupId>
            <artifactId>netty-tcnative-boringssl-static</artifactId>
            <version>1.1.33.Fork26</version>
        </dependency>
        <dependency>
            <groupId>io.netty</groupId>
            <artifactId>netty-buffer</artifactId>
            <version>4.1.8.Final</version>
        </dependency>
        <dependency>
            <groupId>io.netty</groupId>
            <artifactId>netty-codec</artifactId>
            <version>4.1.8.Final</version>
        </dependency>
        <dependency>
            <groupId>io.netty</groupId>
            <artifactId>netty-common</artifactId>
            <version>4.1.8.Final</version>
        </dependency>
        <dependency>
            <groupId>io.netty</groupId>
            <artifactId>netty-handler</artifactId>
            <version>4.1.8.Final</version>
        </dependency>
        <dependency>
            <groupId>io.netty</groupId>
            <artifactId>netty-resolver</artifactId>
            <version>4.1.8.Final</version>
        </dependency>
        <dependency>
            <groupId>io.netty</groupId>
            <artifactId>netty-transport</artifactId>
            <version>4.1.8.Final</version>
        </dependency>
        ...
   </dependencies>
```
  
### Configuring Hazelcast for OpenSSL

Configuring OpenSSL in Hazelcast is pretty straight forward. On client and or member side, the following snippet enables TLS/SSL
using OpenSSL:

```xml
<ssl enabled="true">
    <factory-class-name>com.hazelcast.nio.ssl.OpenSSLEngineFactory</factory-class-name>
     
    <properties>
        <property name="keyStore">hazelcast.keystore</property>
        <property name="keyStorePassword">123456</property>
        <property name="keyManagerAlgorithm">SunX509</property>
        <property name="trustManagerAlgorithm">SunX509</property>
        <property name="trustStore">hazelcast.truststore</property>
        <property name="trustStorePassword">123456</property>
        <property name="protocol">TLSv1.2</property>
    </properties>
</ssl>
```
The configuration is almost the same as regular TLS/SSL integration. The main difference is the OpenSSLEngineFactory factory-class.

Here are the descriptions for the properties:
 
* `keystore`: Path of your keystore file. Note that your keystore's type must be `JKS`.
* `keyStorePassword`: Password to access the key from your keystore file.
* `keyManagerAlgorithm`: Name of the algorithm based on which the authentication keys are provided.
* `trustManagerAlgorithm`: Name of the algorithm based on which the trust managers are provided.
* `truststore`: Path of your truststore file. The file truststore is a keystore file that contains a collection of certificates
 trusted by your application. Its type should be `JKS`.
* `trustStorePassword`: Password to unlock the truststore file.
* `protocol`: Name of the algorithm which is used in your TLS/SSL. Its default value is `TLS`. Available values are:
  * SSL
  * SSLv2
  * SSLv3
  * TLS
  * TLSv1
  * TLSv1.1
  * TLSv1.2

All of the above algorithms support Java 6 and higher versions, except the TLSv1.2 supports Java 7 and higher versions. For 
the `protocol` property, we recommend you to provide SSL or TLS with its version information, e.g., `TLSv1.2`. Note that if you
configure only `SSL` or `TLS`, it will be converted to `SSLv3` and `TLSv1.2`.

### Configuring Cipher Suites

To get the best performance out of OpenSSL, the correct [cipher suites](https://en.wikipedia.org/wiki/Cipher_suite) needs to be configured.
Each cipher-suite has different performance and security characteristics and depending on the hardware and the
selected cipher-suite, the overhead of TLS can range from dramatic to almost negligible.

The cipher-suites is configured using:
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
The `ciphersuites` property accepts a comma separated list (spaces, enters, tabs are filtered out) of cipher suites in the order 
of preference.

You can configure a member and client with different cipher suites; but there should be at least one shared cipher-suite. 

One of the cipher-suites that gave very low overhead but still provides solid security is the 'TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256'.
However in our measurements this cipher-suite only performs well using OpenSSL; using the regular Java TLS integration, it performs
badly. So keep that in mind when configuring a client using regular SSL and a server using OpenSSL.

Please check your security expert to determine which cipher-suites are appropriate and run performance tests which ones perform
well in your environment.

### Other Ways of Configuring Properties

You can set all the properties presented in this section using the `javax.net.ssl` prefix, e.g., `javax.net.ssl.keyStore` 
and `javax.net.ssl.keyStorePassword`.

Also note that these properties can be specified using the related Java system properties and also Java's `-D` command line 
option. This is very useful if you require a more flexible configuration e.g. when doing performance tests.

See below examples equivalent to each other:

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

