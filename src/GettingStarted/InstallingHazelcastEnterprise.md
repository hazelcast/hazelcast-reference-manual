

### Hazelcast Enterprise

There are two Maven repositories defined for Hazelcast Enterprise:

```
<repository>
       <id>Hazelcast Private Snapshot Repository</id>
       <url>https://repository-hazelcast-l337.forge.cloudbees.com/snapshot/</url>
</repository>
<repository>
        <id>Hazelcast Private Release Repository</id>
        <url>https://repository-hazelcast-l337.forge.cloudbees.com/release/</url>
</repository>
```

Hazelcast Enterprise customers may also define dependencies, a sample of which is shown below.

```
<dependency>
     <groupId>com.hazelcast</groupId>
     <artifactId>hazelcast-enterprise-tomcat6</artifactId>
     <version>${project.version}</version>
</dependency>
<dependency>
     <groupId>com.hazelcast</groupId>
     <artifactId>hazelcast-enterprise-tomcat7</artifactId>
     <version>${project.version}</version>
</dependency>
<dependency>
      <groupId>com.hazelcast</groupId>
      <artifactId>hazelcast-enterprise</artifactId>
      <version>${project.version}</version>
</dependency>
<dependency>
      <groupId>com.hazelcast</groupId>
      <artifactId>hazelcast-enterprise-all</artifactId>
      <version>${project.version}</version>
</dependency>
```


### Setting the License Key

To use Hazelcast Enterprise, you need to set the provided license key using one of the configuration methods shown below. 

<br></br>
**Declarative Configuration:**

Add the below line to any place you like in the file `hazelcast.xml`. This XML file offers you a declarative way to configure your Hazelcast. It is included in the Hazelcast download package. When you extract the downloaded package, you will see the file `hazelcast.xml` under the `/bin` directory.

```xml
<hazelcast>
  ...
  <license-key>Your Enterprise License Key</license-key>
  ...
</hazelcast>
```

<br></br>
**Client Declarative Configuration:**

Native client distributions (Java, C++, .NET) of Hazelcast are open source. However, there are some Hazelcast Enterprise features which can be used with the Java Client such as SSL, Socket Interceptors, High-Density backed Near Cache, etc. In that case, you also need to have a Hazelcast Enterprise license and you should include this license in the file `hazelcast-client-full.xml` which is located under the directory `src/main/resources` of your `hazelcast-client` package, as shown below.

```xml
<hazelcast-client>
  ...
  <license-key>Your Enterprise License Key</license-key>
  ...
</hazelcast-client>
```

<br></br>
**Programmatic Configuration:**

Alternatively, you can set your license key programmatically as shown below.

```java
Config config = new Config();
config.setLicenseKey( "Your Enterprise License Key" );
```


<br></br>
**Spring XML Configuration:**

If you are using Spring with Hazelcast, then you can set the license key using the Spring XML schema, as shown below.

```xml
<hz:config>
  ...
  <hz:license-key>Your Enterprise License Key</hz:license-key>
  ...
</hz:config>
```


<br></br>
**JVM System Property:**

As another option, you can set your license key using the below command (the "-D" command line option).

```plain
-Dhazelcast.enterprise.license.key=Your Enterprise License Key
```

<br> </br>


