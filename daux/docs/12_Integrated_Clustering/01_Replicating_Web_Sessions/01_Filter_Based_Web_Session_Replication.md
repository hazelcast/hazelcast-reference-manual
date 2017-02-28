
<img src="../../images/Plugin_New.png" alt="Filter Plugin" height="22" width="84">
<br></br>

***Sample Code***: *Please see our <a href="https://github.com/hazelcast/hazelcast-code-samples/tree/master/hazelcast-integration/filter-based-session-replication" target="_blank">sample application</a> for Filter Based Web Session Replication.*
<br></br>

Assume that you have more than one web server (A, B, C) with a load balancer in front of it. If server A goes down, your users on that server will be directed to one of the live servers (B or C), but their sessions will be lost.

We need to have all these sessions backed up somewhere if we do not want to lose the sessions upon server crashes. Hazelcast Web Manager (WM) allows you to cluster user HTTP sessions automatically. 

Filter Based Web Session Replication is provided as a Hazelcast plugin. Please see its own GitHub repo at <a href="https://github.com/hazelcast/hazelcast-wm" target="_blank">Hazelcast Filter Based Web Session Replication</a> for information on configuring and using it.

