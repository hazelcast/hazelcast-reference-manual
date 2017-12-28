
## Client User Code Deployment - BETA

You can use the User Code Deployment at the client side for the following situations:

1. You have objects that will run on the cluster via the clients such as `Runnable`, `Callable`, and Entry Processors.
2. You have new or amended user domain objects (in-memory format of the IMap set to `Object`) which need to be deployed into the cluster.

When this feature is enabled, the clients will deploy these classes to the members. By this way, when a client adds a new class, the members will not require restarts to include the new classes in classpath. 


You can also use the client permission policy to specify which clients are permitted to use User Code Deployment. Please see the [Permissions](#permissions).

### Configuring Client User Code Deployment

Client User Code Deployment feature is not enabled by default. You can configure this feature declaratively or programmatically. Following are example configuration snippets:

**Declarative Configuration**

In your `hazelcast-client.xml`:

```xml

<user-code-deployment enabled="true">
    <jarPaths>
        <jarPath>/User/sample/sample.jar</jarPath>
        <jarPath>sample.jar</jarPath> <!--from class path -->
        <jarPath>https://com.sample.com/sample.jar</jarPath>
        <jarPath>file://Users/sample/sample.jar</jarPath>
    </jarPaths>
    <classNames>
    	<!-- for the classes available in client class path -->
        <className>sample.ClassName</className>
        <className>sample.ClassName2</className>
    </classNames>
</user-code-deployment>
```

**Programmatic Configuration**

```java
ClientConfig clientConfig = new ClientConfig();
ClientUserCodeDeploymentConfig clientUserCodeDeploymentConfig = new ClientUserCodeDeploymentConfig();

clientUserCodeDeploymentConfig.addJar("/User/sample/sample.jar");
clientUserCodeDeploymentConfig.addJar("https://com.sample.com/sample.jar");
clientUserCodeDeploymentConfig.addClass("sample.ClassName");
clientUserCodeDeploymentConfig.addClass("sample.ClassName2");

clientUserCodeDeploymentConfig.setEnabled(true);
clientConfig.setUserCodeDeploymentConfig(clientUserCodeDeploymentConfig);
```

##### Important to Know

Note that User Code Deployment should also be enabled on the members to use this feature. 

```java
Config config = new Config();
UserCodeDeploymentConfig userCodeDeploymentConfig = config.getUserCodeDeploymentConfig();
userCodeDeploymentConfig.setEnabled( true );
```

Please refer to the [Member User Code Deployment section](#member-user-code-deployment-beta) for more information on enabling it on the member side and its configuration properties. 

For the property `class-cache-mode`, Client User Code Deployment supports only the `ETERNAL` mode, regardless of the configuration set at the member side (which can be `ETERNAL` and `OFF`).

For the property, `provider-mode`, Client User Code Deployment supports only the `LOCAL_AND_CACHED_CLASSES` mode, regardless of the configuration set at the member side (which can be `LOCAL_AND_CACHED_CLASSES`, `LOCAL_CLASSES_ONLY` and `OFF`).

The remaining properties, which are `blacklist-prefixes`, `whitelist-prefixes` and `provider-filter` configured at the member side, will effect the client user code deployment's behavior too. For example, assuming that you provide `com.foo` as a blacklist prefix at the member side, the member will discard the classes with the prefix `com.foo` loaded by the client.