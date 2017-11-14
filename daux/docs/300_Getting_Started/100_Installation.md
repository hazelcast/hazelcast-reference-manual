

The following sections explain the installation of Hazelcast IMDG and Hazelcast IMDG Enterprise.

### Installing Hazelcast IMDG

You can find Hazelcast IMDG in standard Maven repositories. If your project uses Maven, you do not need to add 
additional repositories to your `pom.xml` or add `hazelcast-<version>.jar` file into your 
classpath (Maven does that for you). Just add the following lines to your `pom.xml`:

```xml
<dependencies>
	<dependency>
		<groupId>com.hazelcast</groupId>
		<artifactId>hazelcast</artifactId>
		<version>Hazelcast IMDG Version To Be Installed</version>
	</dependency>
</dependencies>
```
As an alternative, you can download and install Hazelcast yourself. You only need to:

- Download the package `hazelcast-<version>.zip` or `hazelcast-<version>.tar.gz` from 
<a 
href="https://hazelcast.org/download/" target="_blank">hazelcast.org</a>.

- Extract the downloaded `hazelcast-<version>.zip` or `hazelcast-<version>.tar.gz`.

- Add the file `hazelcast-<version>.jar` to your classpath.

### Installing Hazelcast IMDG Enterprise


There are two Maven repositories defined for Hazelcast IMDG Enterprise:

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

Hazelcast IMDG Enterprise customers may also define dependencies, a sample of which is shown below.

```
<dependency>
     <groupId>com.hazelcast</groupId>
     <artifactId>hazelcast-enterprise-tomcat6</artifactId>
     <version>Hazelcast IMDG Enterprise Version To Be Installed</version>
</dependency>
<dependency>
     <groupId>com.hazelcast</groupId>
     <artifactId>hazelcast-enterprise-tomcat7</artifactId>
     <version>Hazelcast IMDG Enterprise Version To Be Installed</version>
</dependency>
<dependency>
      <groupId>com.hazelcast</groupId>
      <artifactId>hazelcast-enterprise</artifactId>
      <version>Hazelcast IMDG Enterprise Version To Be Installed</version>
</dependency>
<dependency>
      <groupId>com.hazelcast</groupId>
      <artifactId>hazelcast-enterprise-all</artifactId>
      <version>Hazelcast IMDG Enterprise Version To Be Installed</version>
</dependency>
```

### Setting the License Keys


Hazelcast IMDG Enterprise offers you two types of licenses: **Enterprise** and **Enterprise HD**. The supported features differ in your Hazelcast setup according to the license type you own.

* **Enterprise license**: In addition to the open source edition of Hazelcast, Enterprise features are the following:
	* Security
	* WAN Replication
	* Clustered REST
	* Clustered JMX 
	* Striim Hot Cache
	* Rolling Upgrades
<br></br>
* **Enterprise HD license**: In addition to the Enterprise features, Enterprise HD features are the following:
	* High-Density Memory Store
	* Hot Restart Persistence 


To use Hazelcast IMDG Enterprise, you need to set the provided license key using one of the configuration methods shown below. 

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

Native client distributions (Java, C++, .NET) of Hazelcast are open source. However, there are some Hazelcast Enterprise features which can be used with the Java Client such as SSL, Socket Interceptors, High-Density backed Near Cache, etc. In that case, you also need to have a Hazelcast Enterprise license and you should include this license in the file `hazelcast-client-full.xml` which is located under the directory `src/main/resources` of your `hazelcast-client` package. Set the license key in the `hazelcast-client-full.xml` as shown below.

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

##### License Key Format

License keys have the following format:

```
<Name of the Hazelcast edition>#<Count of the Members>#<License key>
```

The strings before the `<License key>` is the human readable part. You can use your license key with or without this human readable part. So, both the following example license keys are valid:

```
HazelcastEnterpriseHD#2Nodes#1q2w3e4r5t
```


```
1q2w3e4r5t
```



