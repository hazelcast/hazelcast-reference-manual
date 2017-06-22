
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

A rolling file approach is used to prevent creating too much data. By default 10 files of 10MB each are allowed
to exist. The size of the file can be changed using the following property:

```
-Dhazelcast.diagnostics.max.rolled.file.size.mb=20
```

You can also set the number of files using the following property:

```
-Dhazelcast.diagnostics.max.rolled.file.count=5
```