

With Hazelcast's extensible, JAAS based security feature, you can:

- authenticate both cluster members and clients, 
- and perform access control checks on client operations. Access control can be done according to endpoint principal and/or endpoint address. 

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

Also, see the [Setting License Key section](/01_Getting_Started/02_Setting_The_License_Keys.md) for information on how to set your <font color="#3981DB">**Hazelcast IMDG Enterprise**</font> license.

