
## Customizing your Simulator Setup

After you installed Hazelcast Simulator for your environment and did a first run, it is time to learn more about the setup and customize it.

### TestSuite

The TestSuite defines the Simulator Tests which are executed during the Simulator run. The generated TestSuite file is `test.properties`, which contains a single test.

```
IntIntMapTest@class = com.hazelcast.simulator.tests.map.IntIntMapTest
IntIntMapTest@threadCount = 10
IntIntMapTest@putProb = 0.1
```

Tests can be configured with properties to change the behavior of the test (e.g. the number of used keys or the probability of GET and PUT operations). With properties you can re-use the same code to test different scenarios. They are defined in the following format:

```
TestId@key = value
```

There are two special properties which are used by the Simulator framework itself.

| Property | Example value | Description |
|:-|:-|:-|
| `class` | `com.hazelcast.simulator.tests.map.IntIntMapTest` | Defines the fully qualified class name for the Simulator Test. Used to create the test class instance on the Simulator Worker.<br>This is the only mandatory property which has to be defined. |
| `threadCount` | `5` | Defines the number of worker threads for Simulator Tests which use the @RunWithWorker annotation. |

All other properties must match a public field in the test class. If a defined property cannot be found in the Simulator Test class or the value cannot be converted to the according field type, a BindException is thrown. If there is no property defined for a public field, its default value will be used. 

### Simulator Properties

You can configure Simulator itself using the file `simulator.properties` in your working directory. The default properties are always loaded from the `${SIMULATOR_HOME}/simulator-tests/simulator.properties` file. Your local properties are overriding the defaults. You can compare your `simulator.properties` with the default values with the following command.

```
simulator-wizard --compareSimulatorProperties
```

Often changed properties are the `MACHINE_SPEC` to specify the instance type for cloud setups or the `VERSION_SPEC` to run Simulator with a different Hazelcast version.

Please refer to the [Simulator.Properties File Description section](#simulator-properties-file-description) for detailed information about the `simulator.properties` file.

### Preparing the Test Run

To prepare a Simulator run you have to ensure that the remote machines are available (e.g. your cloud instances have been created) and that Simulator has been installed on them.

- For a `local` setup there is nothing to do.

- For a `static` setup you just need to install Simulator on them. The created prepare script executes a single command to achieve this.

  ```
  provisioner --install
  ```

- For any cloud based setup you need to create the instances. The created prepare script executes a single command to achieve this.

  ```
  provisioner --scale 2
  ```
  
  This will create two instances in your configured cloud environment. Simulator will automatically be installed during the instance creation.

Please refer to the [Provisioner section](#provisioner) for detailed information about the arguments of Provisioner.

### Running the Test

The actual Simulator Test run is done by the `Coordinator`. The created `run` script is a good start to customize your test setup. I takes four optional parameters to define the number of member and client Workers, the run duration and the name of the TestSuite file. So the following command will spawn four member Workers, twenty client Workers and will run for five minutes (with the default `test.properties` file).
 
 ```
 ./run 4 20 5m
 ```

The run script also defines a number of JVM options like verbose GC logging and Java heap sizes. It also shows how to define Hazelcast [System Properties](#system-properties) like the partition count. You can customize these values to tune your TestSuite execution.

Please refer to the [Coordinator section](#coordinator) for detailed information about the arguments of Coordinator.

### Analyzing your Simulator Run

During the simulator run, a directory is created that stores all output for that given run. By default this directory's name is a timestamp such as `2016-08-02__22_08_09`. After the test is completed, all artifacts from the remote workers are downloaded to this directory. So if you have, for example, enabled `Flightrecorder`, then you find the generated JFR files there as well. 

The name of this output directory can be modified by using the `--sessionId` command line option. It is recommended to clean up the remote workers once in a while if they stay around for an extended period. You can clean up using the following command: 

```
coordinator --clean
```

To download all artifacts manually, execute the following command:

```
coordinator --download
```

Both `clean` and `download` commands allow you to pass `sessionId`. Please see the following examples:

```
coordinator --download 2016-08-02__22_08_09
coordinator --clean 2016-08-02__22_08_09
```