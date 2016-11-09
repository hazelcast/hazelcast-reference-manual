
## Writing a Simulator test

The main part of a Simulator test is writing the actual test. The Simulator test is heavily inspired by the JUnit testing and Java Microbenchmark Harness (JMH) frameworks. To demonstrate writing a test, we will start with a very basic case and progressively add additional features. 

For the initial test case we are going to use the `IAtomicLong`. Please see the following snippet:

```java
package example;

...

public class MyTest extends AbstractTest{
  private IAtomicLong counter;

  @Setup public void setup(){
    counter = targetInstance.getAtomicLong("c");
  }

  @TimeStep public void inc(){
    counter.incrementAndGet();
  }
}
```

The above code example shows one of the most basic tests. `AbstractTest` is used to remove duplicate code from tests; so it provides access to a logger, `testContext`, `targetInstance` HazelcastInstance, etc. 

A Simulator test class needs to be a public, non-abstract class with a public no-arg constructor.

Assume the property file to start the test is as follows:

```
class=example.MyTest
```

The main property that needs to be in the property file is the `class` property which needs to point to the full class name.

Just like the other annotated methods, `Timestep` methods need to be public due to the code generator and they are allowed to throw `Throwable` like a checked exceptions:

```
  @TimeStep public void inc() throws Exception{
    counter.incrementAndGet();
  }
```

Any `Throwable`, apart from the `StopException`, that is being thrown will lead to a Failure to be reported.

### Adding properties

Properties can be added to a test to make it easy to modify them from the outside. Properties must be public fields and can be primitives, wrappers around primitives like `java.lang.Long`, enums, strings and classes. Properties are case sensitive.

In the below example the `countersLength` property has been added and it defaults to 20.

```
public class MyTest extends AbstractTest{
  public int countersLength = 20;

  private IAtomicLong[] counters;

  @Setup public void setup(){
    this.counters = new IAtomicLong[countersLength];
    for(int k=0;k<countersLength;k++)
      counters[k] = targetInstance.getAtomicLong(""+k);
  }

  @TimeStep public void inc(BaseThreadState state){
      int counterIndex = state.randomInt(countersLength);
      counters[counterIndex].incrementAndGet();
  }
}
```

In most cases it is best to provide defaults for properties to make customization of a test less verbose.

The `countersLength` can be configured as shown below:

```
class=example.MyTest
countersLength=1000
```

The order of the properties in the file is irrelevant.

Properties do not need to be simple fields. The property binding supports complex object graphs to be created and configured.
Properties can be nested and no-arg constructor must be used to build up the graph of objects. Please see the following example:

```
public class SomeTest{
	
	pubic Config config;

	public static class Config{
		NestedConfig nestedConfig;
	}

	public static class NestedConfig{
		public int value;	
	}
}
```

The `config` object can be configured as shown below:

```
class=SomeTest
config.nestedConfig.value=10
```

If a property is not used in a test, the test fails during its startup. The reason is that if you would make a typing error and, in reality, something different is tested different from what you think is being tested, it is best to know this as soon as possible.

### Number of Threads

By default 10 threads are used to call the `Timestep` methods. But in practice you want to control the number of threads. This can be done using the `threadCount` property as shown below:

```
class=example.MyTest
threadCount=5
```

This property does not need to be defined on the test itself. It is one of the magic properties used by the Simulator.

### Probabilities

Most tests require different functionalities to be called. For example in the `IAtomicLong` case, you would like to do 10% writes and 90% reads. With the Simulator this is very easy. 

In the below example a new timestep method `get` has been added:

```
public class MyTest extends AbstractTest{
  public int countersLength; 

  private AtomicLong counter;

  @Setup public void setup(){
    this.counter = targetInstance.getAtomicLong("counter");
  }

  @TimeStep(prob=0.9) public void get(){
    counter.get();
  }  

  @TimeStep(prob=-1) public void inc(){
    counter.incrementAndGet();
  }
}
```

In this case the `get` method has a probability of 0.9 and the `inc` method has a probability of -1. The -1 indicates that this method will get all the remaining probabilities, so 1-0.9=0.1. Of course, you can configure the `inc` method to have a probability of 0.1.

This probability can be overridden from the test properties as shown below:

```
class=example.MyTest
getProb=0.8
```

In this example, the `get` probability is 0.8, and therefore the `inc` probability is 0.2. 

If the probability is not equal to 1, the test will be terminated when the `Timestep` code is generated during the test start.

### ThreadState

A Simulator test instance is shared between all timestep-threads for that test and only on the test instance level where there was a state. But in some cases you want to track the state for each timestep-thread. Of course a thread-local can be used for this, but the Simulator has a more practical and faster mechanism, `ThreadState`.

In the following code example, a `ThreadState` is defined that tracks the number of increments per thread:

```java
import com.hazelcast.Simulator.test.BaseThreadState
....

public class MyTest extends AbstractTest{
  public int countersLength; 

  private AtomicLong counter;

  @Setup public void setup(){
    this.counter = targetInstance.getAtomicLong("counter");
  }

  @TimeStep public void inc(ThreadState state){
    counter.incrementAndGet();
    state.increments++;
  }

  public class ThreadState extends BaseThreadState{
    long increments;
  }
}
```

In this example, tracking the number of increments is not that interesting since nothing is done with it. But it can be used to verify that the data structure under the test (`IAtomicLong` in this case) is working correctly. Please see the [Verification section](#verification) for more information.

The class of the `ThreadState` is determined by timestep code-generator and it will automatically create an instance of this class per timestep-thread. This instance will then be passed to each invocation of the timestep method in that timestep-thread. This means that you do not need to deal with more expensive thread-locals.

Extending the `BaseThreadState` class is the recommended way to define your own `ThreadState` because it provides various random utility methods that are needed frequently.

However, `ThreadState` does not need to extend `BaseThreadState`. `ThreadState` can be any class as long as it has a no-arg constructor, or it has a constructor with the type of the enclosing class as argument (a non-static inner class). `ThreadState` class unfortunately needs to be a public class due to the code generator. But the internals of the class do not require any special treatment.

Another restriction is that all `timestep`, `beforeRun` and `afterRun` methods (of the same execution group) need to have the same type for the `ThreadState` argument. So the following is not valid:

```java
public class MyTest extends AbstractTest{

  @TimeStep public void inc(IncThreadState state){
    counter.incrementAndGet();
    state.increments++;
  }

  @TimeStep public void get(GetThreadState list){
    counter.get();
  }
  
  public class IncThreadState{long increments;}
  public class GetThreadState{}
}
```

It is optional for any `timestep`, `beforeRun`, and `afterRun` methods to declare this `ThreadState` argument. So the following is valid:

```java
public class MyTest extends AbstractTest{

  @TimeStep public void inc(ThreadState state){
    counter.incrementAndGet();
    state.increments++;
  }

  @TimeStep public void get(){
    counter.get();
  }

  public class ThreadState extends BaseThreadState{
    long increments;
  }
}
```

The reason of having a single test instance shared between all threads, instead of having a test instance per thread (and dropping the need for the `ThreadState`) is that it will be a lot more cache friendly. It is not the test instance which needs to be put into the cache, everything referred from the test instance.

Another advantage is that if there is a shared state, it is easier to share it; for example, keys to select from for a `map.get` test between threads, instead of each test instance generating its own keys (and therefore increasing memory usage). In the future a `@Scope` option will probably be added so that you can choose if each thread gets its own test instance or that the test instance is going to be shared.

### AfterRun and BeforeRun

The timestep methods are called by a timestep-thread and each thread will do a loop over its timestep methods. In some cases before this loop begins or after this loop ends, some additional logic is required. For example initialization of the `ThreadState` object is needed when the loop starts, or updating some shared state when the loop completes. This can be done using `beforeRun` and `afterRun` methods. Multiple `beforeRun` and `afterRun` methods can be defined, but the order of their execution is unfortunately not defined, so be careful with that.

The `beforeRun` and `afterRun` methods accept the `ThreadState` as an argument, but this argument is allowed to be omitted. 

In the following example, `beforeRun` and `afterRun` methods are defined that log when the timestep thread starts, and log when it completes. It also writes the number of increments the timestep thread executed:

```java
public class MyTest extends AbstractTest{
  public int countersLength; 

  private AtomicLong counter;

  @Setup public void setup(){
    this.counter = targetInstance.getAtomicLong("counter");
  }

  @BeforeRun public void beforeRun(ThreadState state){
    System.out.println(Thread.currentThread().getName()+" starting");
  }

  @TimeStep public void inc(ThreadState state){
    counter.incrementAndGet();
    state.increments++;
  }

  @AfterRun public void afterRun(ThreadState state){
    System.out.println(Thread.currentThread().getName()+
      " completed with "+state.increments+" increments");
  }

  public class ThreadState extends BaseThreadState{
    long increments;
  }
}
```

### Verification

Once a Simulator test is completed, you can do the verifications using the `@Verify` annotation. In the case of `IAtomicLong.inc` test, you could count the number of increments per thread. After the test completes, you can verify the total count of expected increments and the actual number of increments.

```java
public class MyTest extends AbstractTest{
  private IAtomicLong counter;
  private IAtomicLong expected;

  @Setup public void setup(){
    this.counter = targetInstance.get("counter");
    this.expected = targetInstance.get("expected");  
  }

  @TimeStep public void inc(ThreadState state){
      state.increments++;
      counter.incrementAndGet();
  }
 
  @AfterRun public void afterRun(ThreadState state){
     expected.addAndGet(state.increments);
  }
  
  @Verify public void verify(){
    assertEquals(expected.get(), counter.get())
  }
  
  public class ThreadState extends BaseThreadState {
    long increments;
  }
}
```

In the above example once the timestep-loop completes, each timestep-thread will call the `afterRun` method and add the actual number of increments to the `expected` IAtomicLong object. In the `verify` method the expected number of increments is compared with the actual number of increments.

The example also shows we make use of the JUnit's `assertEquals` method. So you can use JUnit or any other framework that can verify behaviors. It is even fine to throw an exception.

It is allowed to define zero, one or more verify methods.

By default the verify will run on all workers, but it can be configured to run on a single worker using the global property on the `@Verify` annotation.

### TearDown

To automatically remove created resources, a `tearDown` can be added. It depends on the situation if this is needed at all for your test because in most cases the workers will be terminated anyway after the Simulator test completes. But just in case you need to tear down the resources, it is possible.

In the following example the `tearDown` is demonstrated:

```
public class MyTest extends AbstractTest{
  private IAtomicLong counter;

  @Setup public void setup(){
    counter = targetInstance.getAtomicLong("c");
  }

  @TimeStep public void inc(){
    counter.inc();
  }

  @TearDown public void tearDown(){
    counter.destroy();
  }
}
```

By default the `tearDown` is executed on all participating workers, but can be influenced using the global property as shown below:

```
public class MyTest extends AbstractTest{
  private IAtomicLong counter;

  @Setup public void setup(){
    counter = targetInstance.getAtomicLong("c");
  }

  @TimeStep public void inc(){
    counter.inc();
  }

  @TearDown(global=true) public void tearDown(){
    counter.destroy();
  }
}
```

When `global` is set to `true`, only one worker is going to trigger the `destroy`. It is allowed to define multiple `tearDown` methods.

### Latency Testing

Out of the box the timestep code generator emits code for tracking latencies using the excellent `HdrHistogram` library. An `HDR` file is created for each timestep method. This way you can, for example, compare a `Map.put` with a `Map.get` latency from the same test. 

By default the timestep-threads will loop over the timestep methods as fast as they can and this is great for throughput testing. As a bonus you get an impression of the latency for that throughput. However, for a proper latency test, you want to control the rate and measure the latency for that rate. Luckily using the Simulator this is very easy. 

```
class=example.MyTest
threadCount=10
interval=10ms
```

If for discussion sake we assume the `MyTest` has a single timestep method called `inc`, then with the above configuration each timestep thread will make one `inc` call every 100ms. Because there are 10 threads, we get an interval per request of 10ms. The interval is configured per load generating client/member. So if there are two workers generating load, then globally a call is made every 5ms.

Another way to configure the throughput is using the `ratePerSecond` property. Please see the following example:

```
class=example.MyTest
threadCount=10
ratePerSecond=100
```

In this case each thread will make 10 requests per second. The `ratePerSecond` under the hood is transformed to interval, so it is a matter of convenience which one is preferred.

#### Coordinated Omission

By default the Simulator prevents the coordinated omission problems by using the expected start time of a request instead of the actual time. So instead of trying to do some kind of a repair after it happened, the Simulator actually prevents the problem happening in the first place. Similar technique is used in [JLBH](http://www.rationaljava.com/2016/04/jlbh-introducing-java-latency.html).

If you are interested in the impact of coordinated omission, the protection against it can be disabled using the `accountForCoordinatedOmission` property:
```
class=example.MyTest
threadCount=10
ratePerSecond=100
accountForCoordinatedOmission=false
```

Be extremely careful when setting this property to false and publishing the results. Because the number will be a lot more positive than they actually are.

The rate of doing requests is controlled using the `Metronome` abstraction and a few flavors are available. One very interesting metronome is the `ConstantCombinedRateMetronome`. By default each timestep-thread will wait for a given amount of time for the next request and if there is some kind of an obstruction, e.g., a `map.get` is obstructed by a fat entry processor, a bubble of requests is built up that is processed as soon as the entry processor has completed.

Instead of building up this bubble, the `ConstantCombinedRateMetronome` can be used. If one thread is obstructing while it wants to do a `get`, other timestep-threads from the same execution group will continue with the requests this timestep thread was supposed to do. This way the bubble is prevented; unless all timestep threads from the same execution group are obstructed.

The `ConstantCombinedRateMetronome` can be configured as shown below:

```
class=example.MyTest
threadCount=10
ratePerSecond=100
metronomeClass=com.hazelcast.simulator.worker.metronome.ConstantCombinedRateMetronome
```

### Logging

In some cases, especially when debugging, logging is required. One easy way to add logging is to add the logging into the timestep method. But this can be inefficient and it is frequently noisy. Using some magic properties logging can be enabled on any timestep based Simulator test. There are two types of logging:

- **frequency based**; for example every 1000th iteration, each timestep thread will log where it is.
- **time rate based**; for example every 100ms each timestep thread will log where it is. Time rate based is quite practical because you do not get swamped or a shortage of log entries, like the frequency based one.

You can configure frequency based logging as shown below:
```
class=example.MyTest
logFrequency=10000
```

In this example, every 10000 iteration, a log entry is made per timestep thread.

You can configure time rate based logging as shown below:

```
class=example.MyTest
logRateMs=100
```

In this example, at most every 100ms, a log entry is made per timestep thread.

### Execution Groups

### Code Generation

The timestep methods rely on code generation, that is why a JDK is required to run a timestep based test. The code is generated on the fly based on the test and its test parameters. The philosophy is that you should not pay the price for something that is not used. For example, if there is a single timestep method, no randomization/switch-case is needed to execute the right method. If no logging is configured, no logs are generated. 

This way many features can be added to the timestep test without impacting the performance if the actual feature is not used.

The generator timestep worker code can be found in the worker directory. Feel free to have a look at it and send any suggestions how it can be improved.

Currently there is no support yet for dead code elimination.

### Stopping a Test

By default a Simulator test will run for a given amount of time using the duration property. Please see the following example:

```
coordinator --duration 5m test.properties
```

In this example, the test will run for five minutes. In some cases you need more control on when to stop. Currently there are following options available:

- **Configuring the number of iterations**:
  The number of iterations can be specified using the test properties:

   ```
   class=example.MyTest
   iterations=1000000
   warmupIterations=10000
   ```

   In this case the warmup will run for 10k iterations and the test will run for 1000k iterations. 
 
- **`StopException` to stop a single thread**: When a timestep thread wants to stop, it can throw a `StopException`. This exception does not lead to a failure of the test. It also has no influence on any other timestep thread.

- **`TestContext.stop` to stop all timestep threads**: All timestep threads for a given period on a single worker can be stopped using the `TestContext.stop` method. 


In all cases, Coordinator will wait for all timestep threads of all workers to complete. If a duration has been specified, the test will not run longer than this duration.

### Total Lifecycle of Calls on the Test

- setup
- prepare local
- prepare global
  - timestep-thread:before run
  - timestep-thread:timestep ...
  - timestep-thread:after run
- after warmup local
- after warmup global
  - timestep-thread:before run
  - timestep-thread:timestep ...
  - timestep-thread:after run
- local verify
- global verify
- local teardown
- global teardown

