
### Discovering Members with jclouds

Hazelcast supports jclouds&reg; for cluster member discovery. It is useful when you do not want to provide or you cannot provide the list of possible IP addresses on various cloud providers. However currently, for AWS EC2 which is also based on jclouds, you still need to configure your cluster using the <aws> element as described in the above [Discovering Members within EC2 Cloud](#discovering-members-within-ec2-cloud) section.

To configure your cluster to use jclouds Auto Discovery, follow these steps:

- Add the *hazelcast-jclouds.jar* dependency to your project. Note that this is also bundled inside *hazelcast-all.jar*. The Hazelcast jclouds module depends on jclouds; please make sure the necessary JARs for your provider are present on the classpath.
- Disable the multicast and TCP/IP join mechanisms. To do this, set the `enabled` attributes of the `multicast` and `tcp-ip` elements to `false`.
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
           <property name="provider">google-compute-engine</property>
           <property name="identity">GCE_IDENTITY</property>
           <property name="credential">GCE_CREDENTIAL</property>
          </properties>
        </discovery-provider>
    </discovery-providers>
</join>
...
```
The table below lists the jclouds configuration properties with their descriptions.

Property Name | Type | Description
:--------------|:------|:------------
`provider`|String|String value which is used to identify ComputeService provider. For example, "google-compute-engine" is used for Google Cloud services. See the <a href="https://jclouds.apache.org/reference/providers/#compute " target="_blank">full provider list here</a>.
`identity`|String|Cloud Provider identity, can be thought of as a user name for cloud services.
`credential`|String|Cloud Provider credential, can be thought of as a password for cloud services.
`zones`|String|Defines zone for a cloud service (optional). Can be used with comma separated values for multiple values.
`regions`|String|Defines region for a cloud service (optional). Can be used with comma separated values for multiple values.
`tag-keys`|String|Filters cloud instances with tags (optional). Can be used with comma separated values for multiple values.
`tag-values`|String|Filters cloud instances with tags (optional) Can be used with comma separated values for multiple values.
`group`|String|Filters instance groups (optional). When used with AWS it maps to security group.
`hz-port`|Int|Port which the hazelcast instance service uses on the cluster member. Default value is 5701. (optional)
`role-name*`|String|Used for IAM role support specific to AWS (optional, but if defined, no identity or credential should be defined in the configuration).
`credentialPath*`|String|Used for cloud providers which require an extra JSON or P12 key file. This denotes the path of that file. Only tested with google compute engine. (Required if google-compute engine is used.)

#### Configuring Dependencies for jclouds via Maven

jclouds depends on many libraries internally and `hazelcast-jclouds.jar` does not contain any of them. If you want to use jclouds, the recommended way is to use its dependency management tool. The following is a simple maven dependency configuration which uses
maven assembly plugin to create an uber JAR with the necessary jclouds properties.

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
        <hazelcast.version>latest-version</hazelcast.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>com.hazelcast</groupId>
            <artifactId>hazelcast</artifactId>
            <version>${hazelcast.version}</version>
        </dependency>
        <dependency>
            <groupId>com.hazelcast</groupId>
            <artifactId>hazelcast-jclouds</artifactId>
            <version>${hazelcast.version}</version>
        </dependency>
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


#### Configuring IAM Roles for AWS

IAM roles are used to make secure requests from your clients. You can provide the name of your IAM role that you created previously on your AWS console to the jclouds configuration. IAM roles only work in AWS and when a role name is provided, the other credentials properties should be empty.

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
                  <property name="role-name">i-am-role-for-member</property>
                  <property name="credential">AWS_CREDENTIAL</property>
          </properties>
        </discovery-provider>
    </discovery-providers>
</join>
...
```

#### Discovering Members on Different Regions

You can define multiple regions in your jclouds configuration. By default, Hazelcast Discovery SPI uses private IP addresses for member connection. If you want the members to find each other over a different region, you must set the system property `hazelcast.discovery.public.ip.enabled` to `true`. In this way, the members on different regions can connect to each other by using public IPs.

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
