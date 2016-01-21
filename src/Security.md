

# Security

<font color="#3981DB">**Hazelcast Enterprise**</font>

<br></br>


This chapter provides information on the security features of Hazelcast. These features allow you to perform security activities including intercepting socket connections and remote operations executed by the clients, encrypting the communications between the members at socket level and using SSL socket communication.


## Enabling Security for Hazelcast Enterprise



Hazelcast has an extensible, JAAS based security feature you can use to authenticate both cluster members and clients, and to perform access control checks on client operations. Access control can be done according to endpoint principal and/or endpoint address. 

You can enable security declaratively or programmatically, as shown below.


```xml
<hazelcast xsi:schemaLocation="http://www.hazelcast.com/schema/config
    http://www.hazelcast.com/schema/config/hazelcast-config-3.3.xsd"
    xmlns="http://www.hazelcast.com/schema/config"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    
  ...
    
  <security enabled="true">
    ...
  </security>
</hazelcast>
```



```java
Config cfg = new Config();
SecurityConfig securityCfg = cfg.getSecurityConfig();
securityCfg.setEnabled( true );
```

Also, see [Setting License Key](#setting-the-license-key).

