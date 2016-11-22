
## Diagnostics

Starting with the release 3.7, Hazelcast offers an extended set of diagnostics plugins for both Hazelcast members and clients. A dedicated log file is used to write the diagnostics content, and a rolling file approach is used to prevent taking up too much disk space.

### Enabling Diagnostics Logging

To enable diagnostics logging, you should specify the following properties an the member side:

```
-Dhazelcast.diagnostics.enabled=true
-Dhazelcast.diagnostics.metric.level=info
-Dhazelcast.diagnostics.invocation.sample.period.seconds=30
-Dhazelcast.diagnostics.pending.invocations.period.seconds=30
-Dhazelcast.diagnostics.slowoperations.period.seconds=30
```

In addition to the properties at the member side, you should also specify the following properties at the client side:

```
-Dhazelcast.diagnostics.enabled=true
-Dhazelcast.diagnostics.metric.level=info
```

### Diagnostics Log File

You can use the following property to specify the location of the diagnostics log file:


```
-Dhazelcast.diagnostics.directory=/your/log/directory
```

The name of the log file has the following format:

```
diagnostics-<host IP>#<port>-<unique ID>.log
```

The content format of the diagnostics log file is depicted below:

```
<Date> BuildInfo[
				<log content for BuildInfo diagnostics plugin>]

<Date> SystemProperties[
				<log content for SystemProperties diagnostics plugin>]
				
<Date> ConfigProperties[
				<log content for ConfigProperties diagnostics plugin>]

<Date> Metrics[
				<log content for Metrics diagnostics plugin>]
				
<Date> SlowOperations[
				<log content for SlowOperations diagnostics plugin>]
				
<Date> HazelcastInstance[
				<log content for HazelcastInstance diagnostics plugin>]
				
...
...
...
```




### Diagnostics Plugins

As it is stated in the introduction of this section and shown in the log file format above, diagnostics utility consists of plugins such as BuildInfo, SystemProperties, and HazelcastInstance. The following subsections explain these diagnostic plugins.