
## Coordinator Remote

The Simulator remote is a powerful addition to the Coordinator. The Coordinator takes care of a lot of things such as copying Hazelcast to the remote machines, starting members, clients and running tests. The problem is that the Coordinator command line interface is very monolithic.

To open up the Coordinator, the command `coordinator-remote` is added. To give some impressions:

```
coordinator-remote worker-start --count 2
coordinator-remote test-run --duration 2m map.properties
coordinator-remote stop
```

In the above example we first create some workers, then run the map tests for two minutes and then we stop the remote. The `coordinator-remote` looks very simple, but it is very flexible and allows introducing complex scenarios to be tested.

### Using the CLI Manual

Quite a lot of effort was put in setting up a comprehensive CLI manual for the `coordinator-remote`. To get an overview of all available commands, use the following command:

```
coordinator-remote --help
```

This will show all the available commands such as `install` or `worker-start`. You can get detailed information about a command by adding its name, a sample of which is shown below:

```
coordinator-remote worker-start --help
```

### Configuring the Remote

By default the coordinator opens a port 5000 and listens to this port waiting for commands. If you do not want to enable remote commands, set the `COORDINATOR_PORT=0` in the `simulator.properties` file.

If you want to run multiple coordinators on a single machine, you need to give each coordinator instance a different port so that the remotes do not communicate with the wrong ports and the coordinator does not compete on getting the port.

### Basic Usage

To use the coordinator remote, it is best to work with two terminals (or let the coordinator write to file). In the first terminal we start the coordinator using the following command:

```
coordinator
```

Coordinator will not do anything and listen to commands from the `coordinator-remote`.

In the second terminal we enter following commands:

```
coordinator-remote worker-start
coordinator-remote test-run --duration 10m map.properties
coordinator-remote stop
```

These commands will start a single node cluster, execute the map test for 10 minutes and then shutdown the coordinator.


### Starting Workers

The following command starts one extra worker:


```
coordinator-remote worker-start
```

Workers can be started while a test is running, but such a worker will not participate in generating a load. So in case of the new worker being a member, it will become an extra member in the cluster. In such cases it is probably best to generate load through a client.

The command returns the list of Simulator addresses of the workers that have been created and could be stored in a variable like this:

```
workers=$(coordinator-remote worker-start)
```

### Clients

The following script demonstrates a basic usage of letting a test run using five clients:

```
coordinator-remote worker-start --count 1
coordinator-remote worker-start --workerType javaclient --count 5
coordinator-remote test-run --duration 10m map.properties
coordinator-remote stop
```

### Querying

The commands such as the following execute a behavior on one or more workers:

- `test-start`
- `test-run`
- `worker-kill`
- `worker-script`

You can specify some filters using various options with these commands and this allows a flexible selection mechanism. Please see the following examples:


- Example for the option `versionSpec`:
  - `member-kill --versionSpec maven=3.8` which kills one member having the given version.
  <br></br>
- Example for the option `workerType`:
  - `worker-script --workerType javaclient --command 'bash:ls'` executes the `ls` command on all Java clients.
  <br></br>
- Example for the option `agents`:
  - `test-run --agents C_A1,C_A2 map.properties` runs a test on all members that belong to Agent 1 and 2.
  <br></br>
- Example for the option `workers`:
  - `test-start --workers C_A1_W1 map.properties` starts a test on worker `C_A1_W1`. Keep in mind that the `--workers` option cannot be combined with the `--agents` option.
  <br></br>
- Example for the option `workerTags`:
  - `member-kill --tags bla`

All commands apart from `worker-kill` try to execute on the maximum number of items that are allowed. Only the `worker-kill` command has been defaulted to 1. 

Filters can also be combined as shown below:

```
script-member --versionSpec maven=3.8 --agents C_A1,C_A2 --command 'bash:ls'
```

The above will return the directory listing for all workers that have `versionSpec maven=3.8` AND have agent `C_A1` or `C_A2` as parent.

The number of selected members can be limited using the option `--maxCount`.

By default the selection of the workers is very predictable, but this can sometimes be a problem, for example, when you want to kill random members and get them killed spread equally over all members. In such situations the option `--random` can be used as shown below:

```
member-kill --random
```

### Starting Tests

There are two test commands:

- `test-run`, runs a test and waits for completion.
- `test-start`, starts a test and returns the Simulator address of the test.

The `test-start` is the logical choice if you want to interact with the `coordinator-remote` during the execution of a test. Perhaps you want to kill a member while a test on the clients is running.

The following command shows a basic example of the `test-run`:

```
coordinator-remote test-run --duration 5m map.properties
```

In this case the map test is executed for five minutes.

The following command shows the basic usage of the `test-start`:

```
test_id=$(coordinator-remote test-start --duration 5m map.properties
```

In this case the map test is executed for five minutes. The call will return immediately and the ID of the test is written to the `test_id` Bash variable.

You can control which worker is going to execute a test.

#### Target Count

You can control the number of workers that will execute a test using the option `targetCount` as shown below:

```
coordinator-remote worker-start --count 10
coordinator-remote test-run --targetCount 3 map.properties
```

Even though there are 10 members, only three are being used to generate load.

#### Worker Type

Using the `worker-type` you can control what type of worker is going to act as a driver (so has `timestep-threads` running). If there are only members, then by default all members will be drivers. If there are one or more clients (lite member is considered a form of client), then only the clients will act as drivers.

```
coordinator-remote worker-start --count 2
coordinator-remote test-run --duration 1m --targetType litemember map.properties
```

In the above example, two member workers will act as drivers.

```
coordinator-remote worker-start --count 2
coordinator-remote worker-start --workerType javaclient --count 4
coordinator-remote worker-start --workerType litemember --count 8
coordinator-remote test-run --duration 1m --targetType litemember map.properties
```

In this contrived example above, eight lite members will be drivers and the Java clients will be completely ignored. The current available types of workers are as follows:

- `member`
- `litemember`
- `javaclient`

As soon as the native clients are added, you will be able to configure, for example C# or C++ clients.

If a non-member `workerType` is defined, then these workers will be the drivers. 

#### Warmup and Duration

By default a test will not do any warmup and will run till the test is explicitly stopped. 

```
coordinator-remote test-run map.properties
```

But you can configure the warmup and duration as shown below:

```
coordinator-remote test-run --warmup 1m --duration 10m map.properties
```

Valid time units are as follows:

- s: second
- m: minute
- h: hour
- d: day

Using the query options like agents, workers and tags, you have the perfect control on which workers are going to run a particular test. For more information please see the [Querying section](#querying). 

### Stopping Test

A test can be stopped using the `test-stop` command. Please see the example below:

```
test_id=$(coordinator-remote test-start map.properties)
...
coordinator-remote test-stop $test_id
```

This command waits till the test stops. It will return the status of test on completion as "failed" or "completed".

### Status of a Test

If you are running a test with `test-start`, you probably want to periodically ask what the status of the test is. You can do this using the `test-status` command as shown below:

```
testId=$(coordinator-remote test-start map.properties)
... doing stuff
coordinator-remote test-status $testId
```

This command returns the phase of test as "running", "setup", etc. Or, it returns "completed" if the test is completed successfully or "failed" in case of a failure. The actual reason of the failure can be found in the `failures.txt` in the created session directory.

For a more comprehensive example see the [Rolling Upgrade Test section](#rolling-upgrade-test).

### Killing Workers

It is possible to kill one or more members while doing a test. This is useful, for example, for resilience testing. In such cases it is probably best to use clients as drivers. Please see the below example:

```
coordinator-remote worker-start --count 4
coordinator-remote worker-start --workerType javaclient --count 1 
test_id=$(coordinator-remote test-start map.properties)
sleep 60
coordinator-remote worker-kill 
sleep 60
coordinator-remote test-stop $test_id
coordinator-remote stop
```

In the above example we start with a four node cluster and the client doing a map test. Then we sleep 60 seconds, we keep a random member and we wait for another 60 seconds. Then we stop the test and wait for completion.

The `worker-kill` is a very flexible command. You can kill a specific worker using its simulator address, create all workers on a given agent, or kill all workers with a given version. Please see the [Querying section](#querying) for more information.

You can fully control how a worker is going to get killed. It can be done, for example, by executing a bash script:

```
coordinator-remote worker-kill 'bash:kill -9 $PID'
```

The `$PID`, the PID of the worker, is available as an environment variable for the bash script.

You can also send an embedded JavaScript as shown below:

```
coordinator-remote worker-kill 'js:code that kills the JVM'
```

Using the JavaScript you can execute commands on the JVM without needing to have the that code on the worker. Access to the Hazelcast instance is possible using the injected `hazelcastInstance` environment variable. 

In theory it is possible to execute any JVM scripting language, such as Groovy, by prefixing the command by the extension of that language, e.g., `groovy:.....`. This will cause the scripting engine to load the appropriate scripting language. But you need to make sure the appropriate JAR files are set on the worker's classpath.

Another way to kill a member is by causing an OOME as shown below:

```
coordinator-remote worker-kill OOME
```

The OOME is actually built on top of the JavaScript version and it allocates big arrays till the JVM runs out of memory.

By default a `System.exit(0)` is called.

### Executing Scripts on Workers

It is possible to execute scripts on the workers. This can be a bash script, an embedded JavaScript or any other embedded JVM scripting language. Please see the [Killing Workers](#killing-workers) for more information about the scripting options.

For example, the following command will return the directory listing for every worker:

```
coordinator-remote worker-script --command `bash:ls`
```


#### Fire and Forget

By default the `worker-script` command will wait for the results of the `execute` command. But in some cases, the script should be executed in a fire and forget fashion. This can be done using the `--fireAndForgetFlag` option as shown below:

```
coordinator-remote worker-script --fireAndForgetFlag  --command 'bash:jstack $PID'
```

This command makes a thread dump of each worker JVM.

For more options regarding selecting the target members, see the [Querying section](#querying).

### Using Custom Hazelcast Version

With the `coordinator-remote`, it is very easy to control the exact version of Hazelcast being used. In the below example, the 3.7.1 version is used, but using the `versionSpec 'git=hash'` one can also execute a particular commit.
            
```
version=maven=3.7.1
coordinator &
coordinator-remote install ${version}
coordinator-remote worker-start --count 1 --versionSpec ${version}
coordinator-remote test-start --duration 10m map.properties
coordinator-remote stop
```

Because the remote is interactive, you can easily combine different Hazelcast versions in the same cluster. In the below example a 3.7 member is combined with a 3.7.1 member. This makes it an ideal tool to check patch level compatibility.

It is important to realize that the versions used in the `worker-start` need to be installed using `coordinator-remote install` before being used. 

### Combining Hazelcast Versions

Because the coordinator is now interactive, it is possible to mix different versions as shown below:

```
version_1=maven=3.7.1
version_2=maven=3.7
coordinator-remote install ${version_1}
coordinator-remote install ${version_2}
coordinator-remote worker-start --versionSpec ${version_1}
coordinator-remote worker-start --versionSpec ${version_2}
coordinator-remote test-run --duration 10m map.properties
coordinator-remote stop
```

In the example above, we create a two-member cluster with a different patch level Hazelcast version. This is ideal for patch level compatibility testing.

We can also combine a client of a different version than the members. This is ideal for client compatibility testing:

```
member_version=maven=3.6
client_version=maven=3.7
coordinator-remote install ${version_1}
coordinator-remote install ${version_2}
coordinator-remote worker-start --versionSpec {member_version}
coordinator-remote worker-start --workerType=javaclient --versionSpec {client_version}
coordinator-remote test-run --duration 10m map.properties
coordinator-remote stop
```

In the above example we start a one-member cluster using Hazelcast 3.6 and a Hazelcast Java client using 3.7.

### Rolling Upgrade Test

Because it is easy to mix versions and we can kill and start new members, we can easily create a rolling upgrade test. So imagine we want to verify if a Hazelcast 3.7 cluster can be upgraded to 3.8, we could start out with a 3.7 cluster, start a bunch of clients, start some tests on the clients that verify the cluster is behaving correctly and then one by one replace the 3.7 members by 3.8 members. Once all members have been upgraded we complete the test. This scenario is depicted in the following example:

```
members=10
clients=2
old_version=maven=3.7
new_version=maven=3.8

coordinator-remote install ${old_version}
coordinator-remote install ${new_version}
coordinator-remote worker-start --count ${members} --versionSpec ${old_version}
coordinator-remote worker-start --count ${clients} --workerType javaclient --versionSpec ${old_version}
test_id=$(coordinator-remote test-start --duration 0s atomiclong.properties)
sleep 30s

for i in {1..$members}
do
   coordinator-remote worker-kill --versionSpec ${old_version}
   coordinator-remote worker-start --versionSpec ${new_version}

   sleep 10s

   status=$(coordinator-remote test-status $test_id)
   echo test_status $status
   if [ $status == "failure" ]; then
       echo Error detected!!!!!!!
       break
   fi
done

coordinator-remote test-stop $test_id
coordinator-remote stop
```

#### Resilience Testing

Script should not cause a member to die; if it does, the test will be aborted with a failure. Scripts can be used for a lot of purposes. One could read out some data, modify internal behavior of the Hazelcast cluster. It can for example be used to deliberately cause problems that should not lead to dying members. Perhaps one could close some connections, consume most CPU cycles, use most of the memory so that the member is almost running into an OOME.

### Tags

Tags are the last pieces of the puzzle. A tag can be given to an agent, worker or test. For example the following tags could be defined on agents:

```
10.31.44.31:clients
10.31.44.31:members
```

Using these tags, you can create workers:

```
coordinator-remote worker-start --agentsTags clients --workerType client
```

The created worker will be spawned on the first agent, since that is the agent with the `clients` tag. Once the worker is created, it will automatically inherit all tags from the agent.

Tags do not need to be a single identifier, it may contain multiple identifiers such as `foo,a=1,b=true`. Quite a few commands have support for filtering on tags, please see the [Querying section](#querying).

You can created workers with their own tags:

```
coordinator-remote worker-start --tags b=10 --workerType client
```

Tags are practical because they allow for a mechanism to configure, for example the `hazelcast.xml`, in a much more fine grained way.

### Testing wan replication

???


