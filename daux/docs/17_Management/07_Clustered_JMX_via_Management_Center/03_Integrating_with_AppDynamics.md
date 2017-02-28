
Use the Clustered JMX interface to integrate Hazelcast Management Center with *AppDynamics*. To perform this integration, attach AppDynamics Java agent to the Management Center.

For agent installation, refer to <a href="http://docs.appdynamics.com/display/PRO14S/Install+the+App+Agent+for+Java" target="_blank">Install the App Agent for Java</a> page.

For monitoring on AppDynamics, refer to <a href="http://docs.appdynamics.com/display/PRO14S/Monitor+JMX+MBeans#MonitorJMXMBeans-UsingAppDynamicsforJMXMonitoring" target="_blank">Using AppDynamics for JMX Monitoring</a> page.

After installing AppDynamics agent, you can start Management Center as shown below.

```plain
java -javaagent:/path/to/javaagent.jar -Dhazelcast.mc.jmx.enabled=true\
    -Dhazelcast.mc.jmx.port=9999 -jar mancenter-3.3.jar
```

When Management Center starts, you should see the logs below.

```plain
Started AppDynamics Java Agent Successfully.
Hazelcast Management Center starting on port 8080 at path : /mancenter
```
