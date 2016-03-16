

## Integrating into J2EE

You can integrate Hazelcast into J2EE containers via the Hazelcast Resource Adapter (`hazelcast-jca-rar-`*version*`.rar`). After proper configuration, Hazelcast can participate in standard J2EE transactions.

```java
<%@page import="javax.resource.ResourceException" %>
<%@page import="javax.transaction.*" %>
<%@page import="javax.naming.*" %>
<%@page import="javax.resource.cci.*" %>
<%@page import="java.util.*" %>
<%@page import="com.hazelcast.core.*" %>
<%@page import="com.hazelcast.jca.*" %>

<%
UserTransaction txn = null;
HazelcastConnection conn = null;
HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();

try {
  Context context = new InitialContext();
  txn = (UserTransaction) context.lookup( "java:comp/UserTransaction" );
  txn.begin();

  HazelcastConnectionFactory cf = (HazelcastConnectionFactory)
      context.lookup ( "java:comp/env/HazelcastCF" );
        
  conn = cf.getConnection();

  TransactionalMap<String, String> txMap = conn.getTransactionalMap( "default" );
  txMap.put( "key", "value" );

  txn.commit();
    
} catch ( Throwable e ) {
  if ( txn != null ) {
    try {
      txn.rollback();
    } catch ( Exception ix ) {
      ix.printStackTrace();
    };
  }
  e.printStackTrace();
} finally {
  if ( conn != null ) {
    try {
      conn.close();
    } catch (Exception ignored) {};
  }
}
%>
```


Sometimes Hazelcast class loader might not be able to find the classes you provide, i.e. your class loader might be different than that of Hazelcast. In this case, you need to specify the class loader through `Config` to be used internally by Hazelcast.

Assume that Hazelcast is embedded in a container and you want to run your own `Runnable` through `IExecutorService`. Here, Hazelcast class loader and your class loader are different. Therefore, Hazelcast class loader does not know your `Runnable` class.
You need to tell Hazelcast to use a specified class loader to lookup classes internally. A sample code line for this could be `config.setClassLoader(getClass().getClassLoader())`. 


### Sample Code for J2EE Integration

Please see our sample application for <a href="https://github.com/hazelcast/hazelcast-code-samples/tree/master/hazelcast-integration/jca-ra" target="_blank">J2EE Integration</a>.


