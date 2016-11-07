
## Coordinator Remote

The Simulator remote is a poweful addition to the Coordinator. The Coordinator is takes care of a lot of things like uploading Hazelcast, starting members, clients, running tests etc. The problem is that the Coordinator cli is very monolythic.

To open up the Coordinator, the Coordinator-remote is added. To give some impression:
```
coordinator-remote worker-start --count 2
coordinator-remote test-run --duration 2m map.properties
coordinator-remote stop

```
In the above example we first create some workers, then run the map tests for 2 minutes and then we stop the remote. The coordinator-remote looks very simple, but it is very flexible and allows for complex scenario's to be tested.

### Using the CLI Manual
Quite a lot of effort was put in setting up a comprehensive CLI manual for the coordinator-remote. To get an overview of all available commands, enter

```
coordinator-remote --help
```

This will show all command available, like install or worker-start. To get detailed information about the worker-start, enter the following command:
```
coordinator-remote worker-start --help
```

### Configuring the remote
By default the coordinator opens a port 5000 and listens to this port waiting for commands. If you do not want to enable remote commands, set the COORDINATOR_PORT=0 in the simulator.properties.

If you want to run multiple coordinators on a single machine, you need to give each coordinator instance a different port so that the remotes don't communicate with the wrong ports and the coordinator don't compete on getting the port.

### Basic usage

To use the coordinator remote, it is best to work with 2 terminals (or let the coordinator write to file). In the first terminal we start the coordinator using:
```
coordinator
```
Coordinator will not do anything and listen to command from the coordinator-remote

In the second terminal we enter following commands. This will start a single node cluster and execute the map test for 10 minutes and then shutdown the coordinator.
```
coordinator-remote worker-start
coordinator-remote test-run --duration 10m map.properties
coordinator-remote stop
```

### Starting workers

```
coordinator-remote worker-start
```
This wills start 1 extra worker.

Workers can be started while a test is running, but such a worker will not participate in generating load. So in case of the new worker being a member, it will become an extra member in the cluster. In such cases it is probably best to generate load through a client.

The command returns the list of Simulator addresses of the workers that have been created and could be stored in a variable like this:
```
workers=$(coordinator-remote worker-start)
```



### Clients

The below script demonstrates a basic usage of letting a test run using 5 clients.
```
coordinator-remote worker-start --count 1
coordinator-remote worker-start --workerType javaclient --count 5
coordinator-remote test-run --duration 10m map.properties
coordinator-remote stop
```

### Querying

The command like:
-test-start
-test-run
-worker-kill
-worker-script
Execute some kind of behavior one one or more workers. The selection of these commands can be filtered using various options and this allows for a  flexible selection mechanism. 

Examples:
- versionSpec. E.g. 'member-kill --versionSpec maven=3.8' which kills 1 member which has the given version.
- workerType. E.g. 'worker-script --workerType javaclient --command 'bash:ls' executes the ls command on all javaclients
- agents. E.g. 'test-run --agents C_A1,C_A2 map.properties' runs a test on all members that belong to Agent 1 and 2.
- workers. E.g. 'test-start --workers C_A1_W1 map.properties' starts a test on worker C_A1_W1. Keep in mind that the --workers option can't be combined with the '--agents' option.
- workerTags. E.g. 'member-kill --tags bla'
All commands apart from the worker-kill command try to execute on the maximum number of items that are allowed. Only the worker-kill command has been configured to default to 1. 

Filters can also be combined:
```
script-member --versionSpec maven=3.8 --agents C_A1,C_A2 --command 'bash:ls'
```
The above will kill return the directory listing for all workers that have versionSpec maven=3.8 AND have agent C_A1 or C_A2 as parent.

And the number of selected members can be limited using '--maxCount'.
- maxCount

By default the selection of the workers is very predictable, but this can sometimes be a problem. E.g. when you want to kill random members and get them killed spread equally over all members. In such situations the '--random' option can be configured:
```
member-kill --random
```

### Starting tests

There are 2 test commands:
- test-run: runs a test and waits for completion.
- test-start: starts a test and return the simulator address of the test.
The test-start is the logical choice if you want to interact with the coordinator during the execution of a test. Perhaps you want to kill a member while a test on the clients is running.


The following command shows a basic example of the test-run
```
coordinator-remote test-run --duration 5m map.properties
```
In this case the map test is executed for a duration of 5 minutes.

One can control which worker is going to execute a test. 

#### Target count
One can control how many worker are going to execute a test ising the targetCount option

```
coordinator-remote worker-start --count 10
coordinator-remote test-run --targetCount 3 map.properties
```
Even though there are 10 members, only 3 are being used to generate load.

#### Target type

```
coordinator-remote worker-start --count 2
coordinator-remote worker-start --workerType javaclient --count 4
coordinator-remote worker-start --workerType litemember --count 8
coordinator-remote test-run --duration 1m --targetType litemember map.properties
```
In this contrived example, the test will run on the 4 lite members.

#### Warmup and duration
By default a test will not do any warmup and will run for

#### Agent address, Worker address

### Stopping test

A test can be stopped using the test-stop command. For example:
```
test_id=$(coordinator-remote test-start map.properties)
...
coordinator-remote test-stop $test_id
```
This command waits till the test has stopped. It will return the status of the test on completion "failed" or "completed".

### Status of a test

If you are running an test with test-start, you probably want to periodically ask what the status of the test is. This can be done using the test-status command. E.g.
```
testId=$(coordinator-remote test-start map.properties)
... doing stuff
coordinator-remote test-status $testId
```
This command will return the phase of the test like running, setup etc. Or it will return 'completed' if the test completed successfully or 'failed' in case of a failure. The actual reason of the failure can be found in the failures.txt in the created session directory.

For a more comprehensive example see the 'rolling upgrade test' section.

### Killing workers

It is possible to kill one or more members while doing a test. In such cases it is probably best to drive the test through a client. Example:

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
In the above example we start with a 4 node cluster and the client doing a map test. Then we sleep 60 seconds, we keep a random member and we wait for another 60 seconds. Then we stop the test and wait for completion and then stop the coordinator.

The worker-kill is a very flexible command. One can kill a specific worker using its simulator address, one can create all workers on a given agent, or kill all workers with a given version. 

One can fully control how a worker is going to get killed. It can be done by a executing a bash script:

```
coordinator-remote worker-kill 'bash:kill -9 $PID'
```
The $PID, the pid of the worker, is available as variable for the bash script.

One can also send in embedded javascript:
```
coordinator-remote worker-kill 'js:code that kills the JVM'
```
So using the javascript execute embedded javascript in the jvm. Access to the hazelcast instance is possible using the injected 'hazelcastInstance' environment variable. In theory it is possible to execute any JVM scripting language, like Groovy, by prefixing the command by the extension of the language e.g. 'groovy:.....'. This will cause the scripting engine to load the appropriate scripting language. But you need to make sure the appropriate jars are on set on the classpath of the worker.

Another way to kill a member is by causing an OOME:
```
coordinator-remote worker-kill OOME
```
The OOME is actually build on top of the javascript version and allocates big arrays till the JVM runs out of memory.

By default a 'System.exit(0)' is called.

### Executing scripts on workers

It is possible to execute script on the workers. This can be a bash script, an embedded javascript or any other embedded JVM scripting language. See "killing members" for more information about the scripting options.

for example
```
coordinator-remote worker-script --command `bash:ls`
```
Will return the directory listing for every worker.

#### Fire and forget
By default the worker-script command will wait for the results of the execute command. But in some case the script should be executed in a fire and forget fashion. This can be done using the --fireAndForgetFlag option.

```
coordinator-remote worker-script --fireAndForgetFlag  --command 'bash:jstack $PID'
```
This command makes a thread dump of each worker JVM.

For more options regarding selecting the target members, see 'quering'.


### Using custom Hazelcast version

With the coordinator-remote it is very easy to control the exact version of Hazelcast being used. In the below example, the 3.7.1 version is used, but using the version spec 'git=hash' one can also execute a particular commit.
            
```
version=maven=3.7.1
coordinator &
coordinator-remote install ${version}
coordinator-remote worker-start --count 1 --versionSpec ${version}
coordinator-remote test-start --duration 10m map.properties
coordinator-remote stop
```

Because the remote is interactive, one can easily combine different Hazelcast versions in the same cluster. In the below example a 3.7 member is combined with a 3.7.1 member. This makes it an ideal tool to check patch level compatibility.

It is important to realize that the versions used in the worker-start, need to be installed using 'coordinator-remote install' before being used. 

### Combining Hazelcast versions

Because the coordinator is now interactive, it is possible to mix different versions.
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
In the example above, we create a 2 node cluster with a different patch level Hazelcast version. This is ideal for patch level compatibilty testing.

We can also combine a client of a different version than the members. This is ideal for client compatibility testing.
```
member_version=maven=3.6
client_version=maven=3.7
coordinator-remote install ${version_1}
coordinator-remote install ${version_2}
coordinator-remote worker-start --count 1 --workerType=member --versionSpec {member_version}
coordinator-remote worker-start --count 1 --workerType=javaclient --versionSpec {client_version}
coordinator-remote test-run --duration 10m map.properties
coordinator-remote stop
```
In the above example we start a 1 node cluster using Hazelcast 3.6 and a Hazelcast javaclient using 3.7.

### Rolling upgrade test
Because it is easy to mix versions and we can kill and start new members, we can easily create a rolling upgrade test. So imagine we want to verify if a Hazelcast 3.7 cluster can be upgraded to 3.8, we could start out with a 3.7 cluster, start a bunch of clients, start some test on the clients that verifies that the cluster is behavig correctly and then one by one replace the 3.7 members by 3.8 members. Once all members have been upgrded we complete the test. 

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

#### Reslience testing
Script should not cause a member to die; it it does, the test will receive a failure. Scripts can be used for a lot of purposes. One could read out some data, modify internal behavior of the Hazelcast cluster. It can for example be used to deliberately cause problems in the system. Perhaps one could close some connections, consume all CPU cycles, use most of the memory so that the member is almost running into an OOME.

By default the coordinator-remote script 
### Tags
Tags are the last piece of the puzzel. A tag is somethign that can be to an agent, worker or test. For example the following tags could be defined on agents:
```
10.31.44.31:clients
10.31.44.31:members
```

Using these tags, one can create workers. 

```
coordinator-remote worker-start --agentsTags clients --workerType client
```
The created worker will be spawned on the first agent, since that is the agent with the 'clients' tag. Once the worker is created, it will automaticaly inherit all tags from the agent.

Tags don't need to be a single identifier, it could be something like this 'foo,a=1,b=true'. Quite a few command have support for filtering on tags, see 'Quering'.

workers can be created with their own tags:

```
coordinator-remote worker-start --tags b=10 --workerType client
```

Tags are practical because they allow for a mechanism to configure e.g. the hazelcast.xml in a much more fine grained way

### Testing wan replication



