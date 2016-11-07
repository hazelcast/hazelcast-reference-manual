
## Writing a Simulator test

The main part of a simulator test is writing the actual test. The simulator test is heavily inspired by the Junit testing framework and JMH microbenchmarking framework. To demonstrate how to write a test, we'll start with a very basic case and slowely add additional features. 

For the intial test case we are going to use the IAtomicLong. 

```
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
The above code example shows one of the most basic tests one can write. The AbstractTest is used to remove duplicate code from tests, so it provides access to a logger, the testContext, targetInstance HazelcastInstance etc. 

A simulator test class needs to be a public, non abstract class with a public no arg constructor.

The property file to start the test:
```
class=example.MyTest
```
The main property that needs to be in the property file is the 'class' property which needs to point to the full classname.

Timestep methods (just like the other annotated methods) need to be public (due to the code generator) and are allowed to throw Throwable like a checked exceptions:
```
  @TimeStep public void inc() throws Exception{
    counter.incrementAndGet();
  }
```
Any Throwable, apart from the StopException, being thrown leads will lead to a Failure being reported.

### Adding properties

Properties can be added to a test to make it easy to modify these properties from the outside. Properties must be public fields and can be primitives, wrappers around primities like java.lang.Long, enums, strings and classes. Properties are case sensitive.

In the below example the 'countersLength' property has been added and it defaults to 20.
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

The 'countersLength' can be configured like this:
```
class=example.MyTest
countersLength=1000
```
The order of the properties in the file is irrelevant.

Properties don't need to be simple fields. The property binding supports complex object graphs to be created and configured.
Properties can be nested and no arg constructor must be used to build up the graph of objects.

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

Such a config can be configured using
```
class=SomeTest
config.nestedConfig.value=10
```

If a property is not used in a test, the test fail when starting. The reason is that if one would make a typing error and the in reality something different is tested then you think is being tested, it is best to know this as soon as possible.

### Number of threads
By default 10 threads are used to call the timestep methods. But in practice you want to control the number of thread. This can be done using the threadCount property.

```
class=example.MyTest
threadCount=5
```

This property doesn't need to be defined on the test itself. It is one of the magic properties used by the Simulator.

### Probabilities
Most test require different functionality to be called, for example in the IAtomicLong case I would like to be able to do 10% writes and 90% reads. With the simulator this is very easy. 

In the below example a new timestep method 'get' has been added. 
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
In this case the get method has a probability of 0.9 and the inc method has a probability of -1. The -1 indicates that this method will get all remaining probability, so 1-0.9=0.1. Of course one can configure the inc method to have a probability of 0.1.

This probability can be overridden from the test properties:
```
class=example.MyTest
getProb=0.8
```
In this example, the get probility is 0.8, and therefor the inc probability is 0.2. 

If the probability is not equal to 1, the test will be terminated when the timestep code is generated during the test start.

### ThreadState

A Simulator test instance is shared between all timestep-threads for that test and only on the test instance level there was state. But in some cases you want to track state per timestep-thread. Of course a thread-local can be used for this, but the Simulator has a more practical and faster mechanism 'thread state' which is demonstrated in the example below.

In the code example below a TreadState is defined that tracks the number of increments per thread.

```
import com.hazelcast.simulator.test.BaseThreadState
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
In this example tracking the number of increments isn't that interesting, since nothing is done with it. But it can be used to verify that the the data-structure under test (the IAtomicLong in this case) is working correctly. For more information see the 'verify' section.

The class of the threadstate is determined by timestep code-generator and it will automatically create an instance of this class per timestep-thread. This instance will then be passed to each invocation of the timestep method of that timestep-thread. This means that you don't need to deal with more expensive thread-locals.

Exending the BaseThreadState class is the recommended way to define your own ThreadState because it provides various random utility methods that frequently are needed. But ThreadState doesn't need to extend from BaseThreadState. ThreadState can be any class as long as it has a no arg constructor, or it has a constructor with the type of the enclosing class as argument (a non static inner class). The ThreadState class unfortunately needs to be a public class due to the code generator. But the internals of the class don't require any special treatment.

Another restriction is that all timestep, beforeRun and afterRun methods (of the same execution group), need to have the same type for the ThreadState argument. So the following is illegal:
```
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

It is optional for any timestep/beforeRun/afterRun method to declare this ThreadState argument. So the following is valid:

```
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

The reason why there is a single test-instance shared between all threads, instead of having a test-instance per thread (and dropping the need for the ThreadState) is that it will be a lot more cache friendly. It isn't the test instance which needs to be put into the cache, everything refered from the test-instance. Another advantage is that if there is shared state, it is easier to share state e.g. keys to select from for a map.get test between threads, instead of each test-instance generating its own keys (and therefor increasing memory usage). In the future a '@Scope' option will probably be added so that one can choose if each thread gets its own test instance or that the test-instance is going to be shared.

### AfterRun/BeforeRun

The timestep methods are called by a timestep-thread and each thread will do a loop over its timestep methods. In some cases before this loop begins or after this loop ends, some additional logic is required. For example initialization of the ThreadState object is needed when the loop starts, or updating some shared state when the loop completes. This can be done using beforeRun and afterRun methods. Multiple beforeRun and afterRun methods can be defined, but the order of their executed is unfortunately not defined, so be careful with that.

The beforeRun and afterRun methods accept the ThreadState as argument, but this argument is allowed to be ommitted. 

In the below example a beforeRun and afterRun method are defined that log when the timestep thread starts, and log when it completes and also writes the number of increments the timestep thread executed:

```
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
Once a Simulator test has completed, one can do verifications using the '@Verify' annotation. In the case of IAtomicLong.inc test, we could count the number of increments per thread and after the test completes, we can verify the total count of expected increments, but the actual number of increments.
```
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
In the above example once once the timestep-loop completes, each timestep-thread will call the afterRun method and add the actual number of increments to the 'expected' IAtomicLong. In the verify method the expected number of increments is compared with the expected number of increments.

The example also shows we make use of the junit assertEquals method. So you can use junit or any else that can verify behavior. It is even fine to throw an exception.

It is allowed to define zero, one or more verify methods.

By default the verify will run on all workers, but it can be configured to run on a single worker using the global property on the @Verify annotatio.

### Teardown
To automatically remove created resources, a teardown can be added. It depends on the situation if this is needed at all for your test because in most cases the workers will be terminated anyway after the Simulator test completes. But just in case you need to tear down resources, it is possible.

In the below example the teardown is demonstrated.
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

By default the teardown is executed on all participating workers, but can be influenced using the global property. 
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
When global is set to true, only 1 worker is going to trigger the destroy. It is allowed to define multiple tearDown methods.

### Latency testing
Out of the box the timestep code generator emits code for tracking latencies using the excellent HdrHistogram library. Per timestep method a hdr file is created, so we can e.g. compare a Map.put with a Map.get latency from the same test. 

By default the timestep-threads will loop over the timestep methods as fast as they can and this is great for throughput testing and as a bonus you get an impression of the latency for that throughout. However for a propper latency test, you want to control the rate and measure the latency for that rate. Luckily using the Simulator this is very easy. 

```
class=example.MyTest
threadCount=10
interval=10ms
```
If for discussion sake we assume the MyTest has a single timestep method called 'inc', then with the above configuration each timestep thread will make 1 inc call every 100ms. Because there are 10 threads, we get an interval per request of 10ms. The interval is configured per load generating client/member, so if there are 2 workers generating load, then globally every 5ms a call is made.

Another way to configure the throughout is using the 'ratePerSecond' property.

```
class=example.MyTest
threadCount=10
ratePerSecond=100
```
In this case each thread wil make 10 requests per second. The ratePerSecond under the hood is transformed to interval, so it is a matter of convenience which one is prefered.

#### Coordinated Omission
By default the Simulator prevents the coordinated omision problems by using the expected start-time of a request instead of the actual time. So instead of trying to do some kind of repair after it happened, the simulator actually prevents the problem happening in the first place. Simular technique is used in JLBH http://www.rationaljava.com/2016/04/jlbh-introducing-java-latency.html.

If you are interested in on the impact of coordinated omission, the protection against it can be disabled using the:  'accountForCoordinatedOmission' property
```
class=example.MyTest
threadCount=10
ratePerSecond=100
accountForCoordinatedOmission=false
```
Be extremely careful when setting this property to false and publishing the results! Because the number will be a lot more positive than they actually are.

The rate of doing requests is controlled using the Metronome abstraction and a few flavors are available. One very interesting metronome is the ConstantCombinedRateMetronome. By default each timestep thread-will wait for a given amount of time for the next request and if there is some kind of obstruction, e.g. a map.get is obstructed by an fat entry processor, a bubble of requests is build up that is processed as soon as the entry processor has completed. Instead of building up this bubble, the ConstantCombinedRateMetronome can be used. If one thread is obstructing while its wants to do a get, other timestep-threads from the same execution group will continue with the requests this timestep thread was supposed to do. This way the bubble is prevented; unless all timestep threads from the same execution group are obstructed.

The ConstantCombinedRateMetronome can be configured using:
```
class=example.MyTest
threadCount=10
ratePerSecond=100
metronomeClass=com.hazelcast.simulator.worker.metronome.ConstantCombinedRateMetronome
```

### Logging
In some cases, especially when debugging, logging is required. One easy way to add logging is to add the logging into the timestep method, but this can be inefficient and frequently is noisy. Using some magic properties logging can be enabled on any timestep based simulator test

- frequency based: e.g. every 1000th iteration each timestep thread will log where it is.
- time rate based: e.g. every 100ms each timestep thread will log where it is. Time based is quite practical because you don't get swamped or a shortage of log entries, like the frequency based one.

To configure frequency based logging:
```
class=example.MyTest
logFrequency=10000
```
In this example, every 10000 iteration, a log entry is made per timestep thread.

To configure time rate based logging:
```
class=example.MyTest
logRateMs=100
```
In this example, at most every 100ms a log entry is made per timestep thread.

### Execution groups

### Code generation
The timestep method rely on code generation, that is why a JDK is required to run timestep based test. The code is generated on the fly based on the test and its test parameters. The philosophy is that one should not pay the price for something not used. For example, if there is a single timestep method, no randomization/switch-case is needed to execute the right method. If no logging is confgured, no logging is generator. 

This way many features can be added to the timestep test, without it impacting the performance if the actual feature isn't used.

The generator timestep worker code can be found in the worker directory. Feel free to have a look at it and send any suggestions how it can be improved.

Currently there is no support yet for dead code elimination.

### Stopping a test
By default a Simulator test will run for a given amount of time using the duration property, e.g.

```
coordinator --duration 5m test.properties
```
In this example the test will run for 5 minutes. In some cases one needs more control on when to stop. Currently there are 2 options available:


- Configure number of iterations
- StopException to stop a single thread
- TestContext.stop to stop all timestep threads

#### Configure iterations
The number of configuration can be configured using the test properties

```
class=example.MyTest
iterations=1000000
warmupIterations=10000
```
In this case the warmup will run for 10k iterations and the test will run for 1000k iterations. 

#### StopException
When a timestep thread wants to stop, it can throw a StopException. This exception doesn't lead to an failure of the test. It also has no influence on any other timestep thread.

#### TestContext.stop
All timestep threads for a given on a single worker can be stopped using the TestContext.stop method. 

In all cases coordinator will wait for all timestep threads of all workers to complete. If a duration has been specified, the test will not running longer than this duration.

### Total lifecycle of calls on the test

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

