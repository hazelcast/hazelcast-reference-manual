

## Executing a Simulator Test

After you install and prepare the Hazelcast Simulator for your environment, it is time to perform a test. In the following sections, you are going to verify the setup by running a simple map test with strings as keys and values. 

You can start with creating the working folder.

```
mkdir simulator-example
```

A path of working folder needs to be visible in the output of the provisioner/coordinator.

### Creating and Editing Properties File

You need to create the file `test.properties` in the working folder. Execute the following command to create and edit this file.
	
```
cat > test.properties
```

Copy the following lines into the file `test.properties`.

```
class=com.hazelcast.simulator.tests.map.StringStringMapTest
threadCount=10
keyLocality=Random
keyLength=300
valueLength=300
keyCount=100000
putProb=0.2
basename=map
```

The property `class` defines the actual test case and the rest are the properties you want to bind to your test. If a
property is not defined in this file, the default value of the property given in your test code is used. Please see the `properties` comment in the `StringStringMapTest`. You will see the following.

```
    // properties
    public int keyLength = 10;
    public int valueLength = 10;
    public int keyCount = 10000;
    public int valueCount = 10000;
    public String basename = "stringStringMap";
    public KeyLocality keyLocality = KeyLocality.RANDOM;
    public int minNumberOfMembers = 0;
```
 
After you created the file `test.properties` and set your properties successfully, you need to configure the simulator using the file `simulator.properties`.

Execute the following command to create and edit this file.

```
cat > simulator.properties
```

Copy the following lines into this file and set the properties.

```
CLOUD_PROVIDER=aws-ec2
CLOUD_IDENTITY=~/ec2.identity
CLOUD_CREDENTIAL=~/ec2.credential
MACHINE_SPEC=hardwareId=m3.medium,locationId=us-east-1,imageId=us-east-1/ami-fb8e9292
JDK_FLAVOR=oracle
JDK_VERSION=7
```

Please refer to <a href="http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSGettingStartedGuide/AWSCredentials.html" target="_blank">here</a> for information on `CLOUD_IDENTITY` and `CLOUD_CREDENTIAL`.


***NOTE:*** *For a full description of the file `simulator.properties`, please see the [Simulator.Properties File Description section](#simulator-properties-file-description). You can find the sample simulator properties in the `dist/simulator-tests/simulator.properties`. You can also copy this file to the working folder and then edit according to your needs.*

### Running the Test

When in the working folder, execute the following commands step by step to run the test.

**1. Starting Instances**

First of all, you need agents to run the test on them. Execute the following command to start 4 EC2 instances and install Java and the agents to these instances.

```
provisioner --scale 4
```
	
The output of the command looks like the following.

```
INFO  09:05:06 Hazelcast Simulator Provisioner
INFO  09:05:06 Version: 0.5, Commit: c6e82c5, Build Time: 18.06.2015 @ 11:58:06 UTC
INFO  09:05:06 SIMULATOR_HOME: /disk1/hazelcast-simulator-0.5
INFO  09:05:07 Loading simulator.properties: /disk1/exampleSandbox/simulator.properties
INFO  09:05:07 ==============================================================
INFO  09:05:07 Provisioning 4 aws-ec2 machines
INFO  09:05:07 ==============================================================
INFO  09:05:07 Current number of machines: 0
INFO  09:05:07 Desired number of machines: 4
INFO  09:05:07 Using init script:/disk1/hazelcast-simulator-0.5/conf/init.sh
INFO  09:05:07 JDK spec: oracle 7
INFO  09:05:07 Hazelcast version-spec: outofthebox
INFO  09:05:11 Created compute
INFO  09:05:11 Machine spec: hardwareId=m3.medium,locationId=us-east-1,imageId=us-east-1/ami-fb8e9292
INFO  09:05:18 Created template
INFO  09:05:18 Login name to the remote machines: simulator
INFO  09:05:18 Security group: 'simulator' is found in region 'us-east-1'
INFO  09:05:18 Creating machines... (can take a few minutes)
INFO  09:06:18     54.211.146.186 LAUNCHED
INFO  09:06:18     54.166.1.79 LAUNCHED
INFO  09:06:18     54.147.196.63 LAUNCHED
INFO  09:06:18     54.144.235.111 LAUNCHED
INFO  09:06:30     54.211.146.186 JAVA INSTALLED
INFO  09:06:32     54.166.1.79 JAVA INSTALLED
INFO  09:06:32     54.144.235.111 JAVA INSTALLED
INFO  09:06:34     54.147.196.63 JAVA INSTALLED
INFO  09:06:40     54.166.1.79 SIMULATOR AGENT INSTALLED
INFO  09:06:40 Killing Agent on: 54.166.1.79
INFO  09:06:40 Starting Agent on: 54.166.1.79
INFO  09:06:40     54.211.146.186 SIMULATOR AGENT INSTALLED
INFO  09:06:40 Killing Agent on: 54.211.146.186
INFO  09:06:40     54.166.1.79 SIMULATOR AGENT STARTED
INFO  09:06:40 Starting Agent on: 54.211.146.186
INFO  09:06:40     54.211.146.186 SIMULATOR AGENT STARTED
INFO  09:06:42     54.144.235.111 SIMULATOR AGENT INSTALLED
INFO  09:06:42 Killing Agent on: 54.144.235.111
INFO  09:06:42 Starting Agent on: 54.144.235.111
INFO  09:06:43     54.144.235.111 SIMULATOR AGENT STARTED
INFO  09:06:47     54.147.196.63 SIMULATOR AGENT INSTALLED
INFO  09:06:47 Killing Agent on: 54.147.196.63
INFO  09:06:47 Starting Agent on: 54.147.196.63
INFO  09:06:47     54.147.196.63 SIMULATOR AGENT STARTED
INFO  09:06:47 Pausing for machine warmup... (10 sec)
INFO  09:06:57 Duration: 00d 00h 01m 49s
INFO  09:06:57 ==============================================================
INFO  09:06:57 Successfully provisioned 4 aws-ec2 machines
INFO  09:06:57 ==============================================================
INFO  09:06:57 Shutting down Provisioner...
INFO  09:06:57 Done!
```

You can also see the file `agents.txt` that was created automatically by the provisioner in the working folder. The file `agents.txt` includes IP addresses of the started EC2 instances. You can see this file's content using the following command.

```
less agents.txt
```

First column lists the public IP addresses and the second one lists the private IP addresses. A public IP address is used for the communication between the coordinator and agent. A private IP address is used for the communications between client and member and also between member and member. A private IP address cannot be connected to from the outside of EC2 environment.

**2. Running the Test Suite**

After you created the instances and agents are installed to them, execute the following command to run your test suite.
	
```
coordinator test.properties
```

Please refer to the [Coordinator section](#coordinator) for detailed information about the arguments of `coordinator`.

The output looks like the following.

```
INFO  09:57:17 Hazelcast Simulator Coordinator
INFO  09:57:17 Version: 0.5, Commit: c6e82c5, Build Time: 02.07.2015 @ 09:50:21 UTC
INFO  09:57:17 SIMULATOR_HOME: /disk1/hazelcast-simulator-0.5
INFO  09:57:17 Loading simulator.properties: /disk1/exampleSandbox/simulator.properties
INFO  09:57:17 Loading testsuite file: /disk1/exampleSandbox/test.properties
INFO  09:57:17 Loading Hazelcast configuration: /disk1/hazelcast-simulator-0.5/conf/hazelcast.xml
INFO  09:57:17 Loading Hazelcast client configuration: /disk1/hazelcast-simulator-0.5/conf/client-hazelcast.xml
INFO  09:57:17 Loading Log4j configuration for worker: /disk1/hazelcast-simulator-0.5/conf/worker-log4j.xml
INFO  09:57:17 Loading agents file: /disk1/exampleSandbox/agents.txt
INFO  09:57:17 HAZELCAST_VERSION_SPEC: maven=3.5
INFO  09:57:17 --------------------------------------------------------------
INFO  09:57:17 Waiting for agents to start
INFO  09:57:17 --------------------------------------------------------------
INFO  09:57:17 Connect to agent 54.211.146.186 OK
INFO  09:57:17 Connect to agent 54.166.1.79 OK
INFO  09:57:17 Connect to agent 54.147.196.63 OK
INFO  09:57:17 Connect to agent 54.144.235.111 OK
INFO  09:57:17 --------------------------------------------------------------
INFO  09:57:17 All agents are reachable!
INFO  09:57:17 --------------------------------------------------------------
INFO  09:57:21 Performance monitor enabled: false
INFO  09:57:21 Total number of agents: 4
INFO  09:57:21 Total number of Hazelcast member workers: 4
INFO  09:57:21 Total number of Hazelcast client workers: 0
INFO  09:57:21     Agent 54.211.146.186 members: 1 clients: 0 mode: MIXED
INFO  09:57:21     Agent 54.166.1.79 members: 1 clients: 0 mode: MIXED
INFO  09:57:21     Agent 54.147.196.63 members: 1 clients: 0 mode: MIXED
INFO  09:57:21     Agent 54.144.235.111 members: 1 clients: 0 mode: MIXED
INFO  09:57:21 Killing all remaining workers
INFO  09:57:21 Successfully killed all remaining workers
INFO  09:57:21 Starting 4 member workers
INFO  09:57:41 Successfully started member workers
INFO  09:57:41 Skipping client startup, since no clients are configured
INFO  09:57:41 Successfully started a grand total of 4 Workers JVMs after 20120 ms
INFO  09:57:41 Starting testsuite: 2015-07-02__09_57_17
INFO  09:57:41 Tests in testsuite: 1
INFO  09:57:41 Running time per test: 00d 00h 01m 00s
INFO  09:57:41 Expected total testsuite time: 00d 00h 01m 00s
INFO  09:57:41 Running 1 tests sequentially
INFO  09:57:41 --------------------------------------------------------------
Running Test:
TestCase{
      id=
    , class=com.hazelcast.simulator.tests.map.StringStringMapTest
    , keyCount=100000
    , keyLength=300
    , keyLocality=Random
    , putProb=0.2
    , threadCount=10
    , valueLength=300
}
--------------------------------------------------------------
INFO  09:57:41 Starting Test initialization
INFO  09:57:42 Completed Test initialization
INFO  09:57:42 Starting Test setup
INFO  09:57:44 Completed Test setup
INFO  09:57:44 Starting Test local warmup
INFO  09:57:46 Waiting for localWarmup completion: 00d 00h 00m 00s
INFO  09:57:52 Waiting for localWarmup completion: 00d 00h 00m 06s
INFO  09:57:57 Waiting for localWarmup completion: 00d 00h 00m 12s
INFO  09:58:03 Waiting for localWarmup completion: 00d 00h 00m 18s
INFO  09:58:09 Waiting for localWarmup completion: 00d 00h 00m 24s
INFO  09:58:15 Waiting for localWarmup completion: 00d 00h 00m 30s
INFO  09:58:20 Waiting for localWarmup completion: 00d 00h 00m 35s
INFO  09:58:26 Waiting for localWarmup completion: 00d 00h 00m 41s
INFO  09:58:32 Completed Test local warmup
INFO  09:58:32 Starting Test global warmup
INFO  09:58:33 Completed Test global warmup
INFO  09:58:33 Starting Test start
INFO  09:58:34 Completed Test start
INFO  09:58:34 Test will run for 00d 00h 01m 00s
INFO  09:59:04 Running 00d 00h 00m 30s   50.00% complete
INFO  09:59:34 Running 00d 00h 01m 00s  100.00% complete
INFO  09:59:34 Test finished running
INFO  09:59:34 Starting Test stop
INFO  09:59:36 Completed Test stop
INFO  09:59:37 Starting Test global verify
INFO  09:59:39 Completed Test global verify
INFO  09:59:39 Starting Test local verify
INFO  09:59:41 Completed Test local verify
INFO  09:59:41 Starting Test global tear down
INFO  09:59:43 Finished Test global tear down
INFO  09:59:43 Starting Test local tear down
INFO  09:59:45 Completed Test local tear down
INFO  09:59:45 Terminating workers
INFO  09:59:45 All workers have been terminated
INFO  09:59:45 Starting cool down (10 sec)
INFO  09:59:55 Finished cool down
INFO  09:59:55 Total running time: 133 seconds
INFO  09:59:55 -----------------------------------------------------------------------------
INFO  09:59:55 No failures have been detected!
INFO  09:59:55 -----------------------------------------------------------------------------
```

**3. Downloading the Results**

 Now you need the logs and results that the workers generated. You can get these requirements from agents via `provisioner`.  

```
provisioner --download
```

The output looks like the following.

```
INFO  10:05:41 Hazelcast Simulator Provisioner
INFO  10:05:41 Version: 0.5, Commit: c6e82c5, Build Time: 02.07.2015 @ 09:50:21 UTC
INFO  10:05:41 SIMULATOR_HOME: /disk1/hazelcast-simulator-0.5
INFO  10:05:41 Loading simulator.properties: /disk1/exampleSandbox/simulator.properties
INFO  10:05:42 ==============================================================
INFO  10:05:42 Download artifacts of 4 machines
INFO  10:05:42 ==============================================================
INFO  10:05:42 Downloading from 54.211.146.186
INFO  10:05:42 Downloading from 54.166.1.79
INFO  10:05:42 Downloading from 54.147.196.63
INFO  10:05:42 Downloading from 54.144.235.111
INFO  10:05:43 ==============================================================
INFO  10:05:43 Finished Downloading Artifacts of 4 machines
INFO  10:05:43 ==============================================================
INFO  10:05:43 Shutting down Provisioner...
INFO  10:05:43 Done!
```
 
The artifacts (log files) are downloaded into the `workers` subfolder of the working folder.

**4. Terminating the Instances**

If want to terminate the instances, execute the following command.

```
provisioner --terminate
```
	
If an EC2 machine with an agent running is idle for 2 hours, that machine will automatically terminate itself to prevent running into a big bill.

The output looks like the following.

```
INFO  10:26:46 Hazelcast Simulator Provisioner
INFO  10:26:46 Version: 0.5, Commit: c6e82c5, Build Time: 02.07.2015 @ 09:50:21 UTC
INFO  10:26:46 SIMULATOR_HOME: /disk1/hazelcast-simulator-0.5
INFO  10:26:46 Loading simulator.properties: /disk1/exampleSandbox/simulator.properties
INFO  10:26:46 ==============================================================
INFO  10:26:46 Terminating 4 aws-ec2 machines (can take some time)
INFO  10:26:46 ==============================================================
INFO  10:26:46 Current number of machines: 4
INFO  10:26:46 Desired number of machines: 0
INFO  10:27:10     54.211.146.186 Terminating
INFO  10:27:10     54.147.196.63 Terminating
INFO  10:27:10     54.144.235.111 Terminating
INFO  10:27:10     54.166.1.79 Terminating
INFO  10:28:13 Updating /disk1/exampleSandbox/agents.txt
INFO  10:28:13 Duration: 00d 00h 01m 27s
INFO  10:28:13 ==============================================================
INFO  10:28:13 Terminated 4 of 4, remaining=0
INFO  10:28:13 ==============================================================
INFO  10:28:13 Shutting down Provisioner...
INFO  10:28:13 Done!
```

### Running the Test with a Script

Another option to run the test is using a script. Execute the following command to create a script called, for example, `run.sh`.

```
cat > run.sh
```


This option is for your convenience. It gathers all the commands used to perform a test into one script. The following is the content of this example `run.sh` script.

```
#!/bin/bash
set -e
provisioner --scale 4
coordinator test.properties
provisioner --download
```

Note that you should make the script `run.sh` executable executing the following command.

```
chmod +x run.sh
```
	
<br></br>
***RELATED INFORMATION***

*Please see the [Provisioner section](#provisioner) and the [Coordinator section](#coordinator) for more `provisioner` and `coordinator` commands.*
<br></br>

### Using Maven Archetypes

Alternatively, you can execute tests using the Simulator archetype. Please see the following.

```
mvn archetype:generate  \
    -DarchetypeGroupId=com.hazelcast.simulator \
    -DarchetypeArtifactId=archetype \
    -DarchetypeVersion=0.5 \
    -DgroupId=yourgroupid  \
    -DartifactId=yourproject
```

This creates a fully working Simulator project, including the test having `yourgroupid`. 

1. After this project is generated, go to the created folder and execute the following command.

   ```
mvn clean install
   ```

2. Then, go to your working folder.
 
   ```
cd <working folder>
   ```
 
3. Edit the `simulator.properties` file as explained in the [Editing the Simulator.Properties File section](#editing-the-simulator-properties-file). 

4. Run the test from your working folder using the following command.

   ```
./run.sh
   ```

The output is the same as shown in the [Running the Test section](#running-the-test).
