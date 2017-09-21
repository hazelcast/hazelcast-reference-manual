

## Integrating into Java EE

<img src="images/Plugin_New.png" alt="J2EE Plugin" height="22" width="84">
<br></br>



You can integrate Hazelcast into Java EE containers. This integration is offered as a Hazelcast plugin. Please see its own GitHub repository at <a href="https://github.com/hazelcast/hazelcast-ra" target="_blank">Hazelcast Resource Adapter</a> for information on configuring the resource adapter, glassfish applications, and JBoss web applications.




#### Integrating with MuleSoft

Hazelcast is embedded within a MuleSoft container as an out-of-the-box offering. For a proper integration you should edit the `mule-deploy.properties` file to have the following entry:

```
loader.override=com.hazelcast
```