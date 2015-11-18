
### Discovering Members with JClouds

Hazelcast supports jclouds&reg; for node discovery. It is useful when you do not want to provide or you cannot provide the list of possible IP addresses on various cloud provider.

To configure your cluster to use jclouds Auto Discovery, follow the below steps:

- Add the *hazelcast-jclouds.jar* dependency to your project. Note that, it is also bundled inside *hazelcast-all.jar*. The Hazelcast jclouds module depends on jclouds; please make sure the necessary JARs for your provider is present on the classpath.
- Disable the multicast and TCP/IP join mechanisms. For this, set the `enabled` attributes of the `multicast` and `tcp-ip` elements to `false`.
- Set the `enabled` attribute of the `hazelcast.discovery.enabled` property to `true`.
- Within the `discovery-providers` element, provide your credentials (access and secret key), your region, etc.

The following is an example declarative configuration.

```xml
 ...
  <properties>
    <property name="hazelcast.discovery.enabled">true</property>
  </properties>
   ....
 <join>
    <multicast enabled="false">
    </multicast>
    <tcp-ip enabled="false">
    </tcp-ip>
    <discovery-providers>
        <discovery-provider class="com.hazelcast.jclouds.JCloudsDiscoveryStrategy" enabled="true">
          <properties>
           <property name="provider">aws-ec2</property>
           <property name="identity">AWS_IDENTITY</property>
           <property name="credential">AWS_CREDENTIAL</property>
          </properties>
        </discovery-provider>
    </discovery-providers>
</join>
...
```
The table below lists the jclouds configuration properties with their descriptions.

Property Name | Type | Description
:--------------|:------|:------------
`provider`|String|String value which is used to identify ComputeService provider. For example, "google-compute-engine" is used for Google Cloud services. See full provider list <a href="https://jclouds.apache.org/reference/providers/#compute " target="_blank">here</a>.
`identity`|String|Cloud Provider identity, can be thought as user name for cloud services.
`credential`|String|Cloud Provider credential, can be thought as password for cloud services.
`zones`|String|Used to define zone for a cloud service (optional) Can be used with comma separated values for multiple values.
`regions`|String|Used to define region for a cloud service (optional) Can be used with comma separated values for multiple values.
`tag-keys`|String|Used to filter cloud instances with tags (optional) Can be used with comma separated values for multiple values.
`tag-values`|String|Used to filter cloud instances with tags (optional) Can be used with comma separated values for multiple values.
`group`|String|Used for filtering instance groups. When used with aws it maps to security group.(optional)
`hz-port`|Int|Port which hazelcast instance service on the cluster node. Default value is 5701. (optional)
`role-name*`|String|Used for IAM role support specific to aws (optional but if defined no identity or credential should be defined in the config)
`credentialPath*`|String|Used for cloud providers which requires extra JSON or P12 key file. This denotes path of that file. Only tested with google compute engine. (Required if google-compute engine is used)

#### Configuring Dependencies for jclouds via Maven
JClouds depends on many libraries internally, hazelcast-jclouds.jar does not contain any of them. If you want to use jclouds recommended way is to use it dependency management tool, here is a simple maven dependency configuration which uses
maven assembly plugin to create an uber jar with necessary jclouds properties.
```xml

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>group-id</groupId>
    <artifactId>artifact-id </artifactId>
    <version>version</version>
    <name>compute-basics</name>

    <properties>
        <jclouds.version>latest-version</jclouds.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.apache.jclouds</groupId>
            <artifactId>jclouds-compute</artifactId>
            <version>${jclouds.version}</version>
        </dependency>
        <dependency>
            <groupId>org.apache.jclouds</groupId>
            <artifactId>jclouds-allcompute</artifactId>
            <version>${jclouds.version}</version>
        </dependency>
        <dependency>
            <groupId>org.apache.jclouds.labs</groupId>
            <artifactId>google-compute-engine</artifactId>
            <version>${jclouds.version}</version>
        </dependency>
    </dependencies>
    <build>
        <plugins>
            ...
            <plugin>
                <artifactId>maven-assembly-plugin</artifactId>
                <executions>
                    <execution>
                        <phase>package</phase>
                        <goals>
                            <goal>single</goal>
                        </goals>
                    </execution>
                </executions>
                <configuration>
                    <descriptorRefs>
                        <descriptorRef>jar-with-dependencies</descriptorRef>
                    </descriptorRefs>
                </configuration>
            </plugin>
            ...
        </plugins>
    </build>
</project>
```


#### Configuring IAM roles for AWS

IAM roles are used to make secure requests from your clients. You can provide the name of your IAM role that you created previously on your AWS console to jclouds config. IAM roles only works in AWS and when a role name is provided other credentials properties should be empty.
```xml
 ...
  <properties>
    <property name="hazelcast.discovery.enabled">true</property>
  </properties>
   ....
 <join>
    <multicast enabled="false">
    </multicast>
    <tcp-ip enabled="false">
    </tcp-ip>
    <discovery-providers>
        <discovery-provider class="com.hazelcast.jclouds.JCloudsDiscoveryStrategy" enabled="true">
          <properties>
                  <property name="provider" value="aws-ec2"/>
                  <property name="role-name">i-am-role-for-node</property>
                  <property name="credential">AWS_CREDENTIAL</property>
          </properties>
        </discovery-provider>
    </discovery-providers>
</join>
...
```

#### Discovering nodes on different regions

You can define multiple regions in jclouds config. By default, Hazelcast Discovery SPI uses private IP addresses for node connection. If you want nodes to find each over different region, you must set `hazelcast.discovery.public.ip.enabled` system property to true,
so that nodes on different regions can connect to each other by using public IPs.

```xml
 ...
  <properties>
    <property name="hazelcast.discovery.enabled">true</property>
    <property name="hazelcast.discovery.public.ip.enabled">true</property>
  </properties>
   ....
 <join>
    <multicast enabled="false">
    </multicast>
    <tcp-ip enabled="false">
    </tcp-ip>
    <discovery-providers>
        <discovery-provider class="com.hazelcast.jclouds.JCloudsDiscoveryStrategy" enabled="true">
          <properties>
           <property name="provider">aws-ec2</property>
           <property name="identity">AWS_IDENTITY</property>
           <property name="credential">AWS_CREDENTIAL</property>
          </properties>
        </discovery-provider>
    </discovery-providers>
</join>
...
```
