
## Writing a simulator test

The main part of a simulator test is writing the actual test. The simulator test is heavily inspired by the Junit testing framework and JMH microbenchmarking framework. To demonstrate how to write a test, we'll start with a very basic case and slowely add additional features. 

The initial case, testing the IAtomicLong. 

```
package example;

...

class MyTest extends AbstractTest{
  private IAtomicLong counter;

  @Setup public void setup(){
    counter = targetInstance.getAtomicLong("c");
  }

  @TimeStep public void inc(){
    counter.inc();
  }
}
```
The above code example shows one of the most basic tests one can write. The AbstractTest is used to remove duplicate code from tests, so it provides access to a logger, the testContext, targetInstance etc. 

The property file

```
class=example.MyTest
```


### Adding properties

Properties must be public fields. Properties can be primitives, enums, strings, classes. Properties can be nested and no arg constructor must be used to build up the graph of objects. case sensitive.
....

```
class MyTest extends AbstractTest{
  public int countersLength; 

  private IAtomicLong[] counters;

  @Setup public void setup(){
    this.counters = new IAtomicLong[countersLength];
    for(int k=0;k<countersLength;k++)
      counters[k] = targetInstance.getAtomicLong(""+k);
  }

  @TimeStep public void inc(BaseThreadState state){
      int counterIndex = state.randomInt(countersLength);
      counters[counterIndex].inc();
  }
}
```

```
class=example.MyTest
countersLength=1000
```

### Number of threads
By default 10 threads are used to call the timestep methods. But in practice you want to control the number of thread. This can be done using the threadCount property.

```
class=example.MyTest
threadCount=5
```

This property doesn't need to be defined on the test itself. It is one of the magic properties intercepted by Simulator.

### Probabilities
Most test require different functionality to be called, for example in the IAtomicLong case I would like to be able to do 10% writes and 90% reads. With the simulator this is very easy. 

In the below example a new timestep method 'get' has been added. 
```
class MyTest extends AbstractTest{
  public int countersLength; 

  private AtomicLong counter;

  @Setup public void setup(){
    this.counter = targetInstance.getAtomicLong("counter");
  }

  @TimeStep(prob=0.9) public void get(){
    counter.get();
  }  

  @TimeStep(prob=-1) public void inc(){
    counter.inc();
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

If the probability is not equal to 1, the test will be terminated when the timestep code is generated.

### ThreadState

In the examples so far there is only state at the test instance level. The test instance is shared between all timestep threads; but in some cases you want to track state per timestep thread. This can be done using 'thread state'. 

In the code example below a TreadState is defined that tracks the number of increments per thread.

```
class MyTest extends AbstractTest{
  public int countersLength; 

  private AtomicLong counter;

  @Setup public void setup(){
    this.counter = targetInstance.getAtomicLong("counter");
  }

  @TimeStep public void inc(ThreadState state){
    counter.inc();
    state.increments++;
  }

  public class ThreadState extends BaseThreadState{
    long increments;
  }
}
```
In this example tracking the number of incremnts isn't that interesting, since nothing is done with it. But it can be used to verify that the actual data-structure is working correctly. For more information see the 'verify' section.

The BaseThreadState class is the recommended way to define your own ThreadState because it provides various random utility methods that frequently are needed.

Thread state doesn't need to extend from BaseThreadState. It can be any object as log as it has a no arg constructor, or it has a constructor with the type of the enclosing class as argument (a non static inner class). The ThreadState class unfortunately needs to be a public class due to the code generator. But the internals of the class don't require any special treatment.

Another restriction is that all timestep, beforeRun and afterRun methods (of the same execution group), need to have the same type for the ThreadState argument. So the following is illegal:
```
class MyTest extends AbstractTest{

  @TimeStep public void inc(IncThreadState state){
    counter.inc();
    state.increments++;
  }

  @TimeStep public void get(GetThreadState list){
    counter.inc();
  }
}
```

 It is otional for any timestep method to declare this thread state argument. So the following is valid:

```
class MyTest extends AbstractTest{

  @TimeStep public void inc(ThreadState state){
    counter.inc();
    state.increments++;
  }

  @TimeStep public void get(){
    counter.inc();
  }

  public class ThreadState extends BaseThreadState{
    long increments;
  }
}
```

### AfterRun/BeforeRun

The timestep methods are called by a timestep thread and each thread will do a loop over its timestep methods. In some cases before this loop begins or after this loop ends, some additional logic is required. For example initialization of the ThreadState object is needed when the loop starts, or updating some shared state when the loop completes. This can be done using beforeRun and afterRun methods. Multiple beforeRun and afterRun methods can be defined, but the order of their executed is unfortunately not defined, so be careful with that.

The beforeRun and afterRun methods accept the ThreadState as argument, but this argument is allowed to be ommitted. 

In the below example a beforeRun and afterRun method are defined that log when the timestep thread starts, and log when it completes and also writes the number of increments the timestep thread executed:

```
class MyTest extends AbstractTest{
  public int countersLength; 

  private AtomicLong counter;

  @Setup public void setup(){
    this.counter = targetInstance.getAtomicLong("counter");
  }

  @BeforeRun public void beforeRun(ThreadState state){
    System.out.println(Thread.currentThread().getName()+" starting");
  }

  @TimeStep public void inc(ThreadState state){
    counter.inc();
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

```
class MyTest extends AbstractTest{
  private IAtomicLong counter;
  private IAtomicLong expected;

  @Setup public void setup(){
    this.counter = targetInstance.get("counter");
    this.expected = targetInstance.get("expected");  
  }

  @TimeStep public void inc(ThreadState state){
      state.increments++;
      counter.inc();
  }

  public class ThreadState extends BaseThreadState {
    long increments;
  }

  @Verify public void verify(){
    assertEquals(expected.get(), counter.get())
  }

}
```

### Teardown
To automatically remove created resources, a teardown can be added. It depends on the situation if this is needed at all for your test because in most cases the workers will be terminated anyway after the Simulator test completes. But just in case you need to tear down resources, it is possible.

In the below example the teardown is demonstrated.
```
class MyTest extends AbstractTest{
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

### Latency testing
Out of the box the timestep code generator emits code for tracking latencies. Latencies are tracked using HdrHistogram. Per timestep method a hdr file is created, so we can e.g. compare a Map.put with a Map.get latency from the same test. 

By default the timestep threads will loop over the timestep methods as fast as they can and this is great for throughput testing and as a bonus you get an impression of the latency for that throughout. However for a propper latency test, you want to control the rate and measure the latency for that rate. Luckily using the Simulator this is very easy. 

```
class=example.MyTest
threadCount=10
interval=10ms
```
If for discussion sake we assume the MyTest has a single timestep method called 'inc',  then with the above configuration each timestep thread will make 1 inc call every 100ms. Because there are 10 threads, we get an interval per request of 10ms. The interval is configured per load generating client/member, so if there are 2 machines generating load, then globally every 5ms a call is made.

Another way to configure the throughout is using the 'ratePerSecond' property.

```
class=example.MyTest
threadCount=10
ratePerSecond=100
```
In this case each thread wil make 10 requests per second. The ratePerSecond under the hood is transformed to interval. 

#### Coordinated Omission
By default the Simulator prevents coordinated omision problems by using the expected start time of a request instead of the actual time. So instead of trying to do some kind of repair after it happened, using this approach it prevents it ever from happening. 

If you are interested in on the impact of coordinated omission, the protection against it can be disabled using the accountForCoordinatedOmission property
```
class=example.MyTest
threadCount=10
ratePerSecond=100
accountForCoordinatedOmission=false
```
Be extremely careful when setting this property to false and publishing the results.

The rate of doing requests is controlled using the Metronome abstraction. There are a few flavors available. One very interesting metronome is the ConstantCombinedRateMetronome. By default each timestep thread will wait for a given amount of time for the next request and if there is some kind of obstruction, e.g. a map.get is obstructed by an fat entry processor, a bubble of requests is build up that is processed as soon as the entry processor has completed. Instead of building up this bubble, the ConstantCombinedRateMetronome can be used. If one thread is obstructing while its wants to do a get, other timestep threads from the same execution group will continue with the requests this timestep thread was supposed to do. This way the bubble is prevented; unless all timestep threads from the same execution group are obstructed.

The ConstantCombinedRateMetronome can be configured using:
```
class=example.MyTest
threadCount=10
ratePerSecond=100
accountForCoordinatedOmission=false
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
--     before run
--     timestep ...
--     after run
- after warmup local
- after warmup global
--     before run
--     timestep ...
--     after run
- local verify
- global verify
- local teardown
- global teardown

