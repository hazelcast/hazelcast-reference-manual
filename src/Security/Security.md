

# Security

<font color="#3981DB">**Hazelcast Enterprise**</font>
<br></br>

This chapter describes the security features of Hazelcast. These features allow you to perform security activities, such as intercepting socket connections and remote operations executed by the clients, encrypting the communications between the members at socket level, and using SSL socket communication. All of the Security features explained in this chapter are the features of <font color="#3981DB">**Hazelcast Enterprise**</font> edition.

## Enabling Security for Hazelcast Enterprise


With Hazelcast's extensible, JAAS based security feature, you can:

- authenticate both cluster members and clients, 
- and perform access control checks on client operations. Access control can be done according to endpoint principal and/or endpoint address. 

You can enable security declaratively or programmatically, as shown below.


```xml
<hazelcast>
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

Also, see the [Setting License Key section](#setting-the-license-key) for information on how to set your <font color="#3981DB">**Hazelcast Enterprise**</font> license.

