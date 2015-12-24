


## Socket Interceptor

![](images/enterprise-onlycopy.jpg)


Hazelcast allows you to intercept socket connections before a member joins a cluster or a client connects to a member of a cluster. This allow you to add custom hooks to join and perform connection procedures (like identity checking using Kerberos, etc.). 

To use the socket interceptor, implement `com.hazelcast.nio.MemberSocketInterceptor` for members and `com.hazelcast.nio.SocketInterceptor` for clients.

The following example code enables the socket interceptor for members.

```java
public class MySocketInterceptor implements MemberSocketInterceptor {
  public void init( SocketInterceptorConfig socketInterceptorConfig ) {
    // initialize interceptor
  }

  void onConnect( Socket connectedSocket ) throws IOException {
    // do something meaningful when a member has connected to the cluster
  }

  public void onAccept( Socket acceptedSocket ) throws IOException {
    // do something meaningful when the cluster is ready to accept the member connection
  }
}
```

```xml
<hazelcast>
  ...
  <network>
    ...
    <socket-interceptor enabled="true">
      <class-name>com.hazelcast.examples.MySocketInterceptor</class-name>
      <properties>
        <property name="kerberos-host">kerb-host-name</property>
        <property name="kerberos-config-file">kerb.conf</property>
      </properties>
    </socket-interceptor>
  </network>
  ...
</hazelcast>
```

```java
public class MyClientSocketInterceptor implements SocketInterceptor {
  void onConnect( Socket connectedSocket ) throws IOException {
    // do something meaningful when connected
  }
}

ClientConfig clientConfig = new ClientConfig();
clientConfig.setGroupConfig( new GroupConfig( "dev", "dev-pass" ) )
    .addAddress( "10.10.3.4" );

MyClientSocketInterceptor clientSocketInterceptor = new MyClientSocketInterceptor();
clientConfig.setSocketInterceptor( clientSocketInterceptor );
HazelcastInstance client = HazelcastClient.newHazelcastClient( clientConfig );
```


