
## User Code Deployment - BETA

Hazelcast can dynamically load your custom classes or domain classes from a remote class repository, which typically includes [lite members](#enabling-lite-members). For this purpose Hazelcast offers a distributed  dynamic class loader.

Using this dynamic class loader, you can control the local caching of the classes loaded from other members, 
control the classes to be served to other members, and create blacklists or whitelists of classes and packages. When you enable this feature, you will not have to deploy your classes to all cluster members.

The following is the brief working mechanism of the User Code Deployment feature:

1. Dynamic class loader first checks the local classes, i.e., your classpath, for your custom class. If it is there, Hazelcast does not try to load it from the remote class repository.
2. Then, it checks the cache of classes loaded from the remote class repository (for this, caching should have been enabled in your local, please refer to [Configuring User Code Deployment section](#configuring-used-code-deployment)). If your class is found here, again, Hazelcast does not try to load it from the remote class repository.
3. Finally, dynamic class loader checks the remote class repository. If a member in this repository returns the class, it means your class is found and will be used. You can also put this class into your local class cache as mentioned in the previous step.


### Configuring User Code Deployment

User Code Deployment feature is not enabled by default. You can configure this feature declaratively or programmatically. Following are example configuration snippets:

**Declarative Configuration**

```xml
<user-code-deployment enabled="true">
	<class-cache-mode>ETERNAL</class-cache-mode>
	<provider-mode>LOCAL_CLASSES_ONLY</provider-mode>
	<blacklist-prefixes>com.foo</blacklist-prefixes>
	<whitelist-prefixes>com.bar.MyClass</whitelist-prefixes>
	<provider-filter>HAS_ATTRIBUTE:lite<provider-filter>
</user-code-deployment>
```

**Programmatic Configuration**

```java
Config config = new Config();
UserCodeDeploymentConfig distCLConfig = config.getUserCodeDeploymentConfig();
	distCLConfig.setEnabled( true )
	            .setClassCacheMode( "ETERNAL" )
	            .setProviderMode( "LOCAL_CLASSES_ONLY" )
	            .setBlacklistedPrefixes( "com.foo" )
	            .setWhitelistPrefixes( "com.bar.MyClass" )
	            .setProviderFilter( "HAS_ATTRIBUTE:lite" );
```

User Code Deployment has the following configuration elements and attributes:

- `enabled`: Specifies whether dynamic class loading is enabled or not. Its default value is "true" and it is a mandatory attribute.
- `<class-cache-mode>`: Controls the local caching behavior for the classes loaded from the remote class repository. Available values are as follows:
  - `ETERNAL`: Cache the loaded classes locally. This is the default value and suitable when you load long-living objects, such as domain objects stored in a map.
  - `OFF`: Do not cache the loaded classes locally. It is suitable for loading runnables, callables, entry processors, etc.
- `<provider-mode>`: Controls how the classes are served to the other cluster members. Available values are as follows:
  - `LOCAL_AND_CACHED_CLASSES`: Serve classes loaded from both local classpath and from other members. This is the default value.
  - `LOCAL_CLASSES_ONLY`: Serve classes from the local classpath only. Classes loaded from other members will be used locally, but they are not served to other members.
  - `OFF`: Never serve classes to other members.
- `<blacklist-prefixes>`: Comma separated name prefixes of classes/packages to be prevented from dynamic class loading. For example, if you set it as "com.foo", remote loading of all classes from the "com.foo" package will be blacklisted, including the classes from all its sub-packages. If you set it as "com.foo.Class", then the "Class" and all classes having the "Class" as prefix in the "com.foo" package will be blacklisted.
- `<whitelist-prefixes>`: Comma separated name prefixes of classes/packages only from which the classes will be loaded. It allows to quickly configure remote loading only for classes from selected packages. It can be used together with blacklisting. For example, you can whitelist the prefix "com.foo" and blacklist the prefix "com.foo.secret".
- `<provider-filter>`: Filter to constraint members to be used for a class loading request when a class is not available locally. The value is in the format "HAS_ATTRIBUTE:foo". When it is set as "HAS_ATTRIBUTE:foo", the class loading request will only be sent to the members which have "foo" as a [member attribute](#defining-member-attributes). Setting the this to null will allow to load classes from all members.

#### Example for Filtering Members

As described above, the configuration element `provider-filter` is used to constrain a member to load classes only from a subset of all cluster members. The value of the `provider-filter` must be set as a member attribute in the desired members from which the classes will be loaded. Please see the following example usage provided as programmatic configurations.

The below example configuration will allow the Hazelcast member to load classes only from members with the `class-provider` attribute set. It will not ask any other member to provide a locally unavailable class:

```java
Config hazelcastConfig = new Config();
DistributedClassloadingConfig distributedClassloadingConfig = hazelcastConfig.getDistributedClassloadingConfig();
distributedClassloadingConfig.setProviderFilter("HAS_ATTRIBUTE:class-provider");

HazecastInstance instance = Hazelcast.newHazelcastInstance(hazelcastConfig);
```

And the below example configuration sets the attribute `class-provider` for a member. So, the above member will load classes from the members who have the attribute `class-provider`:

```java
Config hazelcastConfig = new Config();
MemberAttributeConfig memberAttributes = hazelcastConfig.getMemberAttributeConfig();
memberAttributes.setAttribute("class-provider", "true");

HazecastInstance instance = Hazelcast.newHazelcastInstance(hazelcastConfig);
```






