

## JCache Setup and Configuration

This section shows what is necessary to provide the JCache API and the Hazelcast JCache implementation for your application. In
addition, it demonstrates the different configuration options and describes the configuration properties.

### Setting up Your Application

To provide your application with this JCache functionality, your application needs the JCache API inside its classpath. This API is the bridge between the specified JCache standard and the implementation provided by Hazelcast.

The method of integrating the JCache API JAR into the application classpath depends on the build system used. For Maven, Gradle, SBT,
Ivy, and many other build systems, all using Maven-based dependency repositories, perform the integration by adding
the Maven coordinates to the build descriptor.

As already mentioned, you have to add JCache
coordinates next to the default Hazelcast coordinates that might be already part of the application.

For Maven users, the coordinates look like the following code:

```xml
<dependency>
  <groupId>javax.cache</groupId>
  <artifactId>cache-api</artifactId>
  <version>1.1.0</version>
</dependency>
```
With other build systems, you might need to describe the coordinates in a different way.

#### Activating Hazelcast as JCache Provider

To activate Hazelcast as the JCache provider implementation, add either `hazelcast-all.jar` or
`hazelcast.jar` to the classpath (if not already available) by either one of the following Maven snippets.

If you use `hazelcast-all.jar`:

```xml
<dependency>
  <groupId>com.hazelcast</groupId>
  <artifactId>hazelcast-all</artifactId>
  <version>"your Hazelcast version, e.g. 3.9.3"</version>
</dependency>
```

If you use `hazelcast.jar`:

```xml
<dependency>
  <groupId>com.hazelcast</groupId>
  <artifactId>hazelcast</artifactId>
  <version>"your Hazelcast version, e.g. 3.9.3"</version>
</dependency>
```
The users of other build systems have to adjust the definition of the dependency to their needs.

#### Connecting Clients to Remote Member

When the users want to use Hazelcast clients to connect to a remote cluster, the `hazelcast-client.jar` dependency is also required
on the client side applications. This JAR is already included in `hazelcast-all.jar`. Or, you can add it to the classpath using the following
Maven snippet:

```xml
<dependency>
  <groupId>com.hazelcast</groupId>
  <artifactId>hazelcast-client</artifactId>
  <version>"your Hazelcast version, e.g. 3.9.3"</version>
</dependency>
```

For other build systems, for instance, ANT, the users have to download these dependencies from either the JSR-107 specification and
Hazelcast community website (<a href="https://hazelcast.org/" target="_blank">http://www.hazelcast.org</a>) or from the Maven repository search page
(<a href="http://search.maven.org" target="_blank">http://search.maven.org</a>).

