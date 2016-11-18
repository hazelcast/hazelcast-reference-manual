
## Web Session Replication


This section explains how you can cluster your web sessions using Servlet Filter, Tomcat, and Jetty based solutions. Each web session clustering is explained in the following subsections.

[Filter](#filter-based-web-session-replication) based web session replication has the option to use a map with High-Density Memory Store to keep your session objects. Note that High-Density Memory Store is available in <font color="##153F75">**Hazelcast Enterprise HD**</font>. Please refer to the [High-Density Memory Store section](#high-density-memory-store) for details on this feature.



### Filter Based Web Session Replication

<img src="images/Plugin_New.png" alt="Azure Plugin" height="22" width="84">

<br></br>


***Sample Code***: *Please see our <a href="https://github.com/hazelcast/hazelcast-code-samples/tree/master/hazelcast-integration/filter-based-session-replication" target="_blank">sample application</a> for Filter Based Web Session Replication.*
<br></br>

Assume that you have more than one web server (A, B, C) with a load balancer in front of it. If server A goes down, your users on that server will be directed to one of the live servers (B or C), but their sessions will be lost.

We need to have all these sessions backed up somewhere if we do not want to lose the sessions upon server crashes. Hazelcast Web Manager (WM) allows you to cluster user HTTP sessions automatically. 

Filter Based Web Session Replication is provided as a Hazelcast plugin. Please see its own GitHub repo at <a href="https://github.com/hazelcast/hazelcast-wm" target="_blank">Hazelcast Filter Based Web Session Replication</a> for information on configuring and using it.

