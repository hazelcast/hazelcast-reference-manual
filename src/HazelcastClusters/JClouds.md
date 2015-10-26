
### Discovering Members with jclouds

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
                  <property name="provider" value="aws-ec2"/>
                  <property name="identity" value="AWS_IDENTITY"/>
                  <property name="credential" value="AWS_CREDENTIAL"/>
          </properties>
        </discovery-provider>
    </discovery-providers>
</join>
...
```
The table below lists the jclouds configuration properties with their descriptions.

Property Name | Type | Description
:--------------|:------|:------------
`provider`|string|String value which is used to identify ComputeService provider. For example, "google-compute-engine" is used for Google Cloud services. See full provider list <a href="https://jclouds.apache.org/reference/providers/#compute " target="_blank">here/a>.
`identity`|string|Cloud Provider identity, can be thought as user name for cloud services.
`credential`|string|Cloud Provider credential, can be thought as password for cloud services.
`zones`|string|Used to define zone for a cloud service (optional) Can be used with comma seperated values for multiple values.
`regions`|string|Used to define region for a cloud service (optional) Can be used with comma seperated values for multiple values.
`tag-keys`|string|Used to filter cloud instances with tags (optional) Can be used with comma seperated values for multiple values.
`tag-values`|string|Used to filter cloud instances with tags (optional) Can be used with comma seperated values for multiple values.
`group`|string|Used for filtering instance groups. When used with aws it maps to security group.(optional)
`hz-port`|int|Port which hazelcast instanse service on the cluster node. Default value is 5701. (optional)
`role-name*`|string|Used for IAM role support specific to aws (optional but if defined no identity or credential should be defined in the config)
`credentialPath*`|string|Used for cloud providers which requires extra JSON or P12 key file. This denotes path of that file. Only tested with google compute engine. (Required if google-compute engine is used)

