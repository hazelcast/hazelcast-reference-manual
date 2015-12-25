

## Monitoring with JMX

You can monitor your Hazelcast members via the JMX protocol.

- Add the following system properties to enable [JMX agent](http://download.oracle.com/javase/1.5.0/docs/guide/management/agent.html):

   - `-Dcom.sun.management.jmxremote`
   - `-Dcom.sun.management.jmxremote.port=\_portNo\_` (to specify JMX port) (*optional*)
   - `-Dcom.sun.management.jmxremote.authenticate=false` (to disable JMX auth) (*optional*)


- Enable the Hazelcast property `hazelcast.jmx` (please refer to the [System Properties section](#system-properties)):

   - using Hazelcast configuration (API, XML, Spring).
   - or by setting the system property `-Dhazelcast.jmx=true`
   - or by programmatic configuration:
    `config.setProperty(GroupProperties.PROP_ENABLE_JMX, "true");`



 - If you want to use cluster-wide stats (referred as total) in [List](#List), [Map](#Map), [ReplicatedMap](#ReplicatedMap), [Queue](#Queue), [Set](#Set) and [Topic](#Topic): enable the Hazelcast property `hazelcast.jmx.detailed` (please refer to the [System Properties section](#system-properties)):

  - using Hazelcast configuration (API, XML, Spring).
  - or by setting the system property `-Dhazelcast.jmx=true`
  - or by programmatic configuration:
   `config.setProperty(GroupProperties.PROP_ENABLE_JMX_DETAILED, "true");`

![image](images/NoteSmall.jpg) ***NOTE:*** *Note that this might cause some performance overheads since underlying structure adds listeners to get these total statistics.*

- Use jconsole, jvisualvm (with mbean plugin) or another JMX compliant monitoring tool.
