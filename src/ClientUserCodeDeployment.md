
## Client User Code Deployment - BETA

You can use the User Code Deployment at the client side for the following situations:

1. You have objects that will run on the cluster via the clients such as `Runnable`, `Callable`, and Entry Processors.
2. You have new or amended user domain objects (in-memory format of the IMap set to `Object`) which need to be deployed into the cluster.

When this feature is enabled, the clients will deploy these classes to the members. By this way, when a client adds a new class, the members will not require restarts to include the new classes in classpath. 


You can also use the client permission policy to specify which clients are permitted to use User Code Deployment. Please see the [Permissions](#permissions).

### Configuring Client User Code Deployment

Client User Code Deployment feature is not enabled by default. You can configure this feature declaratively or programmatically. Following are example configuration snippets:

**Declarative Configuration**

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

Note that User Code Deployment should also be enabled on the members to use this feature. 

```java
Config config = new Config();
UserCodeDeploymentConfig userCodeDeploymentConfig = config.getUserCodeDeploymentConfig();
userCodeDeploymentConfig.setEnabled( true );
```
