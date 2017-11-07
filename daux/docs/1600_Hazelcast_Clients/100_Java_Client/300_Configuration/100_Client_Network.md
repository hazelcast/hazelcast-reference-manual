
All network related configuration of Hazelcast Java Client is performed via the `network` element in the declarative configuration file, or in the class `ClientNetworkConfig` when using programmatic configuration. Let's first give the examples for these two approaches. Then we will look at its sub-elements and attributes.

#### Declarative Client Network Configuration

Here is an example of configuring network for Java Client declaratively.

```xml
<hazelcast-client xsi:schemaLocation=
    "http://www.hazelcast.com/schema/client-config hazelcast-client-config-<version>.xsd"
                  xmlns="http://www.hazelcast.com/schema/client-config"
                  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
...
<network>
  <cluster-members>
    <address>127.0.0.1</address>
    <address>127.0.0.2</address>
  </cluster-members>
  <outbound-ports>
     <ports>34600</ports>
     <ports>34700-34710</ports>
  </outbound-ports>
  <smart-routing>true</smart-routing>
  <redo-operation>true</redo-operation>
  <socket-interceptor enabled="true">
    <class-name>com.hazelcast.XYZ</class-name>
    <properties>
      <property name="kerberos-host">kerb-host-name</property>
      <property name="kerberos-config-file">kerb.conf</property>
    </properties>
   </socket-interceptor>
  <aws enabled="true" connection-timeout-seconds="11">
    <inside-aws>false</inside-aws>
    <access-key>my-access-key</access-key>
    <secret-key>my-secret-key</secret-key>
    <iam-role>s3access</iam-role>
    <region>us-west-1</region>
    <host-header>ec2.amazonaws.com</host-header>
    <security-group-name>hazelcast-sg</security-group-name>
    <tag-key>type</tag-key>
    <tag-value>hz-members</tag-value>
  </aws>
</network>
```

#### Programmatic Client Network Configuration

Here is an example of configuring network for Java Client programmatically.

```java
ClientConfig clientConfig = new ClientConfig();
ClientNetworkConfig networkConfig = clientConfig.getNetworkConfig();
networkConfig.addAddress("10.1.1.21", "10.1.1.22:5703")
             .setSmartRouting(true)
             .addOutboundPortDefinition("34700-34710")
             .setRedoOperation(true)
             .setConnectionTimeout(5000)
             .setConnectionAttemptLimit(5)
             
ClientAwsConfig clientAwsConfig = new ClientAwsConfig();
clientAwsConfig.setInsideAws( false )
               .setAccessKey( "my-access-key" )
               .setSecretKey( "my-secret-key" )
               .setRegion( "us-west-1" )
               .setHostHeader( "ec2.amazonaws.com" )
               .setSecurityGroupName( ">hazelcast-sg" )
               .setTagKey( "type" )
               .setTagValue( "hz-members" )
               .setIamRole( "s3access" )
               .setEnabled( true );
clientConfig.getNetworkConfig().setAwsConfig( clientAwsConfig );
HazelcastInstance client = HazelcastClient.newHazelcastClient( clientConfig );
```

#### Configuring Address List

Address List is the initial list of cluster addresses to which the client will connect. The client uses this list to find an alive member. Although it may be enough to give only one address of a member in the cluster (since all members communicate with each other), it is recommended that you give the addresses for all the members.

**Declarative**:

```xml
<hazelcast-client>
  ...
  <network>
    <cluster-members>
      <address>10.1.1.21</address>
      <address>10.1.1.22:5703</address>
    </cluster-members>
  ...
  </network>
...
</hazelcast-client>
```

**Programmatic**:

```java
ClientConfig clientConfig = new ClientConfig();
ClientNetworkConfig networkConfig = clientConfig.getNetworkConfig();
networkConfig.addAddress("10.1.1.21", "10.1.1.22:5703");
```

If the port part is omitted, then 5701, 5702, and 5703 will be tried in random order.

You can provide multiple addresses with ports provided or not, as seen above. The provided list is shuffled and tried in random order. Default value is *localhost*.

#### Setting Outbound Ports

You may want to restrict outbound ports to be used by Hazelcast-enabled applications. To fulfill this requirement, you can configure Hazelcast Java client to use only defined outbound ports. The following are example configurations.


**Declarative:**

```xml
  <network>
    <outbound-ports>
      <!-- ports between 34700 and 34710 -->
      <ports>34700-34710</ports>
      <!-- comma separated ports -->
      <ports>34700,34701,34702,34703</ports> 
      <ports>34700,34705-34710</ports>
    </outbound-ports>
  </network>
```

**Programmatic:**

```java
...
NetworkConfig networkConfig = config.getNetworkConfig();
// ports between 34700 and 34710
networkConfig.addOutboundPortDefinition("34700-34710");
// comma separated ports
networkConfig.addOutboundPortDefinition("34700,34701,34702,34703");
networkConfig.addOutboundPort(34705);
...
```

***Note:*** *You can use port ranges and/or comma separated ports.*

As shown in the programmatic configuration, you use the method `addOutboundPort` to add only one port. If you need to add a group of ports, then use the method `addOutboundPortDefinition`. 

In the declarative configuration, the element `ports` can be used for both single and multiple port definitions.

#### Setting Smart Routing

Smart routing defines whether the client mode is smart or dummy. The following are example configurations.

**Declarative**:

```xml
...
<network>
...
  <smart-routing>true</smart-routing>
...
</network>
...
```

**Programmatic**:

```java
ClientConfig clientConfig = new ClientConfig();
ClientNetworkConfig networkConfig = clientConfig.getNetworkConfig();
networkConfig().setSmartRouting(true);
```
The default is *smart client* mode.

#### Enabling Redo Operation

It enables/disables redo-able operations as described in [Handling Retry-able Operation Failure](/1600_Hazelcast_Clients/100_Java_Client/200_Getting_Started.md#page_HandlingFailures). The following are the example configurations.

**Declarative**:

```xml
...
<network>
...  
  <redo-operation>true</redo-operation>
...
</network>
```

**Programmatic**:

```java
ClientConfig clientConfig = new ClientConfig();
ClientNetworkConfig networkConfig = clientConfig.getNetworkConfig();
networkConfig().setRedoOperation(true);
```

Default is *disabled*.

#### Setting Connection Timeout

Connection timeout is the timeout value in milliseconds for members to accept client connection requests. The following are the example configurations.

**Declarative**:

```xml
...
<network>
...
  <connection-timeout>5000</connection-timeout>
...
</network>
```

**Programmatic**:

```java
ClientConfig clientConfig = new ClientConfig();
clientConfig.getNetworkConfig().setConnectionTimeout(5000);
```

The default value is *5000* milliseconds.

#### Setting Connection Attempt Limit

While the client is trying to connect initially to one of the members in the `ClientNetworkConfig.addressList`, all members might be not available. Instead of giving up, throwing an exception and stopping the client, the client will retry as many as `ClientNetworkConfig.connectionAttemptLimit` times. This is also the case when an existing client-member connection goes down. The following are example configurations.

**Declarative**:

```xml
...
<network>
...
  <connection-attempt-limit>5</connection-attempt-limit>
...
</network>
```

**Programmatic**:

```java
ClientConfig clientConfig = new ClientConfig();
clientConfig.getNetworkConfig().setConnectionAttemptLimit(5);
```

Default value is *2*.

#### Setting Connection Attempt Period

Connection timeout period is the duration in milliseconds between the connection attempts defined by `ClientNetworkConfig.connectionAttemptLimit`. The following are example configurations.

**Declarative**:

```xml
...
<network>
...
  <connection-attempt-period>5000</connection-attempt-period>
...
</network>
```

**Programmatic**:

```java
ClientConfig clientConfig = new ClientConfig();
clientConfig.getNetworkConfig().setConnectionAttemptPeriod(5000);
```

Default value is *3000*.

#### Setting a Socket Interceptor

<font color="#3981DB">**Hazelcast IMDG Enterprise**</font>
<br></br>


Following is a client configuration to set a socket intercepter. Any class implementing `com.hazelcast.nio.SocketInterceptor` is a socket interceptor.


```java
public interface SocketInterceptor {
    void init(Properties properties);
    void onConnect(Socket connectedSocket) throws IOException;
}
```

`SocketInterceptor` has two steps. First, it will be initialized by the configured properties. Second, it will be informed just after the socket is connected using `onConnect`.


```java
SocketInterceptorConfig socketInterceptorConfig = clientConfig
               .getNetworkConfig().getSocketInterceptorConfig();

MyClientSocketInterceptor myClientSocketInterceptor = new MyClientSocketInterceptor();

socketInterceptorConfig.setEnabled(true);
socketInterceptorConfig.setImplementation(myClientSocketInterceptor);
```

If you want to configure the socket connector with a class name instead of an instance, see the example below.

```java
SocketInterceptorConfig socketInterceptorConfig = clientConfig
            .getNetworkConfig().getSocketInterceptorConfig();

MyClientSocketInterceptor myClientSocketInterceptor = new MyClientSocketInterceptor();

socketInterceptorConfig.setEnabled(true);

//These properties are provided to interceptor during init
socketInterceptorConfig.setProperty("kerberos-host","kerb-host-name");
socketInterceptorConfig.setProperty("kerberos-config-file","kerb.conf");

socketInterceptorConfig.setClassName(myClientSocketInterceptor);
```

<br></br>
***RELATED INFORMATION***

*Please see the [Socket Interceptor section](/18_Security/01_Socket_Interceptor.md) for more information.*
<br></br>

#### Configuring Network Socket Options

You can configure the network socket options using `SocketOptions`. It has the following methods.

- `socketOptions.setKeepAlive(x)`: Enables/disables the *SO_KEEPALIVE* socket option. The default value is `true`.

- `socketOptions.setTcpNoDelay(x)`: Enables/disables the *TCP_NODELAY* socket option. The default value is `true`.

- `socketOptions.setReuseAddress(x)`: Enables/disables the *SO_REUSEADDR* socket option. The default value is `true`.

- `socketOptions.setLingerSeconds(x)`: Enables/disables *SO_LINGER* with the specified linger time in seconds. The default value is `3`.

- `socketOptions.setBufferSize(x)`: Sets the *SO_SNDBUF* and *SO_RCVBUF* options to the specified value in KB for this Socket. The default value is `32`.


```java
SocketOptions socketOptions = clientConfig.getNetworkConfig().getSocketOptions();
socketOptions.setBufferSize(32);
socketOptions.setKeepAlive(true);
socketOptions.setTcpNoDelay(true);
socketOptions.setReuseAddress(true);
socketOptions.setLingerSeconds(3);
```

#### Enabling Client TLS/SSL

<font color="#3981DB">**Hazelcast IMDG Enterprise**</font>
<br></br>



You can use TLS/SSL to secure the connection between the client and the members. If you want TLS/SSL enabled for the client-cluster connection, you should set `SSLConfig`. Once set, the connection (socket) is established out of an TLS/SSL factory defined either by a factory class name or factory implementation. Please see the [TLS/SSL section](/18_Security/04_TLS-SSL.md).

As explained in the [TLS/SSL section](/18_Security/04_TLS-SSL.md), Hazelcast members have keyStores used to identify themselves (to other members) and Hazelcast clients have trustStore used to define which members they can trust. Starting with Hazelcast 3.8.1 release, mutual authentication is introduced. This allows the clients also to have their keyStores and members to have their trustStores so that the members can know which clients they can trust. Please see the Mutual Authentication section in the [TLS/SSL section](/18_Security/04_TLS-SSL.md).



#### Configuring Client for AWS

The example declarative and programmatic configurations below show how to configure a Java client for connecting to a Hazelcast cluster in AWS.

**Declarative**:

```xml
...
<network>
  <aws enabled="true">
    <inside-aws>false</inside-aws>
    <access-key>my-access-key</access-key>
    <secret-key>my-secret-key</secret-key>
    <iam-role>s3access</iam-role>
    <region>us-west-1</region>
    <host-header>ec2.amazonaws.com</host-header>
    <security-group-name>hazelcast-sg</security-group-name>
    <tag-key>type</tag-key>
    <tag-value>hz-members</tag-value>
  </aws>
...
</network>
```

**Programmatic**:

```java
ClientConfig clientConfig = new ClientConfig();
ClientAwsConfig clientAwsConfig = new ClientAwsConfig();
clientAwsConfig.setInsideAws( false )
               .setAccessKey( "my-access-key" )
               .setSecretKey( "my-secret-key" )
               .setRegion( "us-west-1" )
               .setHostHeader( "ec2.amazonaws.com" )
               .setSecurityGroupName( ">hazelcast-sg" )
               .setTagKey( "type" )
               .setTagValue( "hz-members" )
               .setIamRole( "s3access" )
               .setEnabled( true );
clientConfig.getNetworkConfig().setAwsConfig( clientAwsConfig );
HazelcastInstance client = HazelcastClient.newHazelcastClient( clientConfig );
```

You can refer to the [aws element section](/04_Setting_Up_Clusters/10_Other_Network_Configurations.md) for the descriptions of above AWS configuration elements except `inside-aws` and `iam-role`, which are explained below.

If the `inside-aws` element is not set, the private addresses of cluster members will always be converted to public addresses. Also, the client will use public addresses to connect to the members. In order to use private addresses, set the `inside-aws` parameter to `true`. Also note that, when connecting outside from AWS, setting the `inside-aws` parameter to `true` will cause the client to not be able to reach the members.

IAM roles are used to make secure requests from your clients. You can provide the name of your IAM role that you created previously on your AWS console using the `iam-role` or `setIamRole()` method.

