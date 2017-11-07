

This section explains how you can cluster your web sessions using Servlet Filter, Tomcat, and Jetty based solutions. Each web session clustering is explained in the following subsections.

Filter based web session replication has the option to use a map with High-Density Memory Store to keep your session objects. Note that High-Density Memory Store is available in <font color="##153F75">**Hazelcast IMDG Enterprise HD**</font>. Please refer to the [High-Density Memory Store section](/13_Storage/00_High-Density_Memory_Store.md) for details on this feature.


### Filter Based Web Session Replication



<img src="../images/Plugin_New.png" alt="Filter Plugin" height="22" width="84">
<br></br>

***Sample Code***: *Please see our <a href="https://github.com/hazelcast/hazelcast-code-samples/tree/master/hazelcast-integration/filter-based-session-replication" target="_blank">sample application</a> for Filter Based Web Session Replication.*
<br></br>

Assume that you have more than one web server (A, B, C) with a load balancer in front of it. If server A goes down, your users on that server will be directed to one of the live servers (B or C), but their sessions will be lost.

We need to have all these sessions backed up somewhere if we do not want to lose the sessions upon server crashes. Hazelcast Web Manager (WM) allows you to cluster user HTTP sessions automatically. 

Filter Based Web Session Replication is provided as a Hazelcast plugin. Please see its own GitHub repo at <a href="https://github.com/hazelcast/hazelcast-wm" target="_blank">Hazelcast Filter Based Web Session Replication</a> for information on configuring and using it.

### Tomcat Based Web Session Replication


<img src="../images/Plugin_New.png" alt="Tomcat Plugin" height="22" width="84">


Tomcat based web session replication is offered through Hazelcast Tomcat Session Manager. It is a container specific module that enables session replication for JEE Web Applications without requiring changes to the application. Tomcat Session Manager is provided as a Hazelcast plugin. Please see its own GitHub repo at <a href="https://github.com/hazelcast/hazelcast-tomcat-sessionmanager" target="_blank">Hazelcast Tomcat Session Manager</a> for information on configuring and using it.

### Jetty Based Web Session Replication


<img src="../images/Plugin_New.png" alt="Jetty Plugin" height="22" width="84">
<br></br>

Jetty based web session replication is offered through Hazelcast Jetty Session Manager. It is a container specific module that enables session replication for JEE Web Applications without requiring changes to the application. Jetty Session Manager is provided as a Hazelcast plugin. Please see its own GitHub repo at <a href="https://github.com/hazelcast/hazelcast-jetty-sessionmanager" target="_blank">Hazelcast Jetty Session Manager</a> for information on configuring and using it.
