
## Client User Code Deployment 

1. Objects that is will be runned on cluster by clients like Runnable, Callable, Entry Processor 
2. User domain objects that is stored in Members when InMemoryFormat is set to Object
needs to be deployed to members.

With this feature open, clients will deploy these classes to members. This way, when a client adds a new class members
does not require to restarted to include new classes in classpath. 


There is security permission for user code deployment see related section here
http://docs.hazelcast.org/docs/3.8/manual/html-single/index.html#native-client-security

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

Note that user code deployment should also be enabled on members to use this feature. 

```java
Config config = new Config();
UserCodeDeploymentConfig userCodeDeploymentConfig = config.getUserCodeDeploymentConfig();
userCodeDeploymentConfig.setEnabled( true );
```
