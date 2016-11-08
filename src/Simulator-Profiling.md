
## Profiling your Simulator Test

To determine, for example, where the time is spent or other resources are being used, you want to profile your application. The recommended way to profile is using the Java Flight Recorder (JFR) which is only available in the Oracle JVMs. The JFR, unlike the other commercial profilers like JProbe and Yourkit, does not make use of sampling or instrumentation. It hooks into some internal APIs and is quite reliable and causes very little overhead. The problem with most other profilers is that they distort the numbers and frequently point you in the wrong direction; especially when I/O or concurrency is involved. Most of the recent performance improvements in Hazelcast are based on using JFR.

To enable the JFR, the JVM settings for the member or client need to be modified depending on what needs to be profiled. Please see the following example:

```
JFR_ARGS="-XX:+UnlockCommercialFeatures  \
          -XX:+FlightRecorder \
          -XX:StartFlightRecording=duration=120m,filename=recording.jfr  \
          -XX:+UnlockDiagnosticVMOptions \
          -XX:+DebugNonSafepoints"

coordinator --members 1 \
            --workerVmOptions "$JFR_ARGS" \
            --clients 1 \
            --clientVmOptions "$JFR_ARGS" \
            sometest.properties
```

In the above example, both client and members are configured with JFR. Once the Simulator test has completed, all artifacts including the JFR files are downloaded. The JFR files can be opened using the Java Mission Control command `jmc`.

### Reducing Fluctuations

Fore more stable performance numbers, set the minimum and maximum heap size to the same value. Please see the following example:

```
coordinator --members 1 \
            --workerVmOptions "-Xmx4g -Xms4g" \
            --clients 1 \
            --clientVmOptions "-Xmx1g -Xms1g" \
            sometest.properties
```

Also set the minimum cluster size to the expected number of members using the following property:

```
-Dhazelcast.initial.min.cluster.size=4
```

This prevents Hazelcast cluster from starting before the minimum number of members has been reached. Otherwise, the benchmark numbers of the tests can be distorted due to partition migrations during the test. Especially with a large number of partitions and short tests, this can lead to a very big impact on the benchmark numbers.

### Enabling Diagnostics

Hazelcast 3.7+ has a diagnostics system which provides detailed insights on what is happening inside the client or server `HazelcastInstance`. It is designed to run in production and has very little performance overhead. It has so little overhead that we always enable it when doing benchmarks.

```
coordinator --members 1 \
            --workerVmOptions "-Dhazelcast.diagnostics.enabled=true \
                               -Dhazelcast.diagnostics.metric.level=info \
                               -Dhazelcast.diagnostics.invocation.sample.period.seconds=30 \
                               -Dhazelcast.diagnostics.pending.invocations.period.seconds=30 \
                               -Dhazelcast.diagnostics.slowoperations.period.seconds=30" \
            --clients 1 \
            --clientVmOptions "-Dhazelcast.diagnostics.enabled=true \
                               -Dhazelcast.diagnostics.metric.level=info" \
            sometest.properties
```

Using the above example, both client and server have diagnostics enabled. Both will write a diagnostics file. Once the Simulator run is completed and the artifacts are downloaded, the diagnostics files can be analyzed.

### Enabling Different Profilers or Other Startup Customizations

If you want to use a different profiler than JFR and you require more than simple JVM args, or you want to play with features like numactrl, OpenOnload, etc., you need to override the worker startup script. This is done by copying the startup script to the working directory. For example to modify a member worker:

```
cp $SIMULATOR_HOME/conf/worker-hazelcast-member.sh .
```

This bash script controls the startup of the member. This particular file also contains full examples for the following features:

- Yourkit
- Intel VTune
- Linux Perf
- HProf
- numactrl
- dstat
- OpenOnload

It also allows to experiment with different profilers like [`honest-profiler`](https://github.com/RichardWarburton/honest-profiler).

To upload the required artifacts, create the directory `upload` in the working directory. This upload directory will automatically be copied to all worker machines. It can be found in the parent directory of the worker, e.g., `../upload/someartifact`.
            
