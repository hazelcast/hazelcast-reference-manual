

## Credentials

<font color="#3981DB">**Hazelcast IMDG Enterprise**</font>
<br></br>



One of the key elements in Hazelcast security is the `Credentials` object, which carries all credentials of an endpoint (member or client). Credentials is an interface which extends `Serializable`. You can either implement the three methods in the `Credentials` interface, or you can extend the `AbstractCredentials` class, which is an abstract implementation of `Credentials`.

Hazelcast calls the `Credentials.setEndpoint()` method when an authentication request arrives at the member before authentication takes place.

```java
package com.hazelcast.security;
public interface Credentials extends Serializable {
  String getEndpoint();
  void setEndpoint( String endpoint ) ;    
  String getPrincipal() ;    
}
```

Here is an example of extending the `AbstractCredentials` class.

```java
package com.hazelcast.security;
...
public abstract class AbstractCredentials implements Credentials, DataSerializable {
  private transient String endpoint;
  private String principal;
  ...
}
```

`UsernamePasswordCredentials`, a custom implementation of Credentials, is in the Hazelcast `com.hazelcast.security` package. `UsernamePasswordCredentials` is used for default configuration during the authentication process of both members and clients.

```java
package com.hazelcast.security;
...
public class UsernamePasswordCredentials extends Credentials {
  private byte[] password;
  ...
}
```
