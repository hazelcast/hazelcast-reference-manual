
## Coordinator

The Coordinator is responsible for actually running the Simulator Tests.

You can start the Coordinator without any parameters.

```
coordinator
```

This command will use default values for all mandatory parameters, e.g. the file `test.properties` as TestSuite, a single member Worker as cluster layout, and 60 seconds for the test duration.

### Controlling the TestSuite

You can specify the used TestSuite file by adding a single non-option argument (an argument without an `--option`).

```
coordinator small-testsuite.properties
```

### Controlling the Test Duration

You can control the duration of the test execution by using the `--duration` argument. The default duration is 60 seconds. You can specify the time unit for this argument by using

- `s` for seconds
- `m` for minutes
- `h` for hours
- `d` for days

If you omit the time unit the value will be parsed as seconds.

You can see the usage of the `--duration` argument in the following example commands.

```
coordinator --duration 90s
coordinator --duration 3m
coordinator --duration 12h
coordinator --duration 2d
```

The duration is used as the run phase of a Simulator Test (that's the actual test execution). If you have long running warmup or verify phases, the total runtime of the TestSuite will be longer.

There is another option for the use case where you want to run a Simulator Test until some event occurs (which is not time bound), e.g. stop after five million operations have been done. In this case, the test code must stop the `TestContext` itself. Use the following command to let Coordinator wait indefinitely.

```
coordinator --waitForTestCaseCompletion
```

### Controlling the Cluster Layout

Hazelcast has two basic instance types: member and client. The member instances form the cluster and client instances connect to an existing cluster. Hazelcast Simulator can spawn Workers for both instance types. You can configure the number of member and client Workers and also their distribution on the available remote machines. Available remote machines are the ones, that are configured in the `agents.txt` file (either manually in static setups or via Provisioner in cloud setups).

Use the options `--members` and `--clients` to control how many member and client Workers you want to have. The following command creates a cluster with four member Workers and eight client Workers (which connect to that cluster).

```
coordinator --members 4 --clients 8
```

A setup without client Workers is fine, but out of the box it won't work without member Workers.

The Workers will be distributed among the available remote machines with a round robin selection. By default, the machines will be mixed with member and client Workers. You can reserve machines for member Workers. The distribution of machines will then be limited to the according group of remote machines. Use the following command to specify the number of dedicated member machines:

```
coordinator --dedicatedMemberMachines 2
```

You cannot specify more dedicated member machines than you have available. If you define client Workers, there must be at least a single remote machine left (e.g. with three remote machines you can specify a maximum of two dedicated member machines). The round robin assignment will be done in the two sub-groups of remote machines.

If you need more control over the cluster layout, you can make use of the `coordinator-remote` which allows full control on layout, versions of clients, servers, etc. Please refer to the [Coordinator Remote section](#coordinator-remote).

### Controlling the Load Generation

Beside the cluster layout you can also control which Workers will execute their RUN phase. The default is that client Workers are preferred over member Workers. That means if client Workers are used, they will create the load in the cluster, otherwise the member Workers will be used. In addition you can limit the number of Workers which will generate the load.

```
coordinator --targetType MEMBER --targetCount 2
```

This will limit the load generation to two member Workers, regardless of the client Workers' availability. Please have a look at command line help via `coordinator --help` to see all allowed values for these arguments.

### Controlling the Hazelcast Configuration

By default Coordinator uses the files `${SIMULATOR_HOME}/conf/hazelcast.xml` and `${SIMULATOR_HOME}/conf/client-hazelcast.xml` to configure the created Hazelcast instances. You can override these files by placing a `hazelcast.xml` or `client-hazelcast.xml` in your working directory. You can also specify a path (outside your working directory) with the following arguments:

```
coordinator --hzFile your-hazelcast.xml --clientHzFile=your-client-hazelcast.xml
```
