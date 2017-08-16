
## Failure Detector Configuration

A failure detector is responsible to determine if a member in cluster is unreachable/crashed. The most important problem in failure detection is to distinguish whether a member is still alive but slow or has crashed. But according to famous [FLP result](http://dl.acm.org/citation.cfm?doid=3149.214121), it's impossible to distinguish a crashed member from a slow one in an asynchronous system. A workaround to this limitation is to use unreliable failure detectors. An unreliable failure detector allows a member to suspect that others have failed, usually based on liveness criteria but it can make mistakes to a certain degree.

Hazelcast has two built-in failure detectors; _Deadline Failure Detector_ and _Phi (ϕ) Accrual Failure Detector_.

### Deadline Failure Detector

_Deadline Failure Detector_ uses an absolute timeout for missing/lost heartbeats. After timeout, a member is considered as crashed/unavailable and marked as suspected.

_Deadline Failure Detector_ has two configuration properties:

- `hazelcast.heartbeat.interval.seconds`: This is the interval at which member heartbeat messages are sent to each other.
- `hazelcast.max.no.heartbeat.seconds`: This is the timeout which defines when a cluster member is suspected because it has not sent any heartbeats.

To use _Deadline Failure Detector_ configuration property `hazelcast.heartbeat.failuredetector.type` should be set to `"deadline"`.

```xml
<hazelcast>
    [...]
	<properties>
        <property name="hazelcast.heartbeat.failuredetector.type">deadline</property>
        <property name="hazelcast.heartbeat.interval.seconds">5</property>
        <property name="hazelcast.max.no.heartbeat.seconds">120</property>
        [...]
    </properties>
    [...]
</hazelcast>
```

```java
Config config = ...;
config.setProperty("hazelcast.heartbeat.failuredetector.type", "deadline");
config.setProperty("hazelcast.heartbeat.interval.seconds", "5");
config.setProperty("hazelcast.max.no.heartbeat.seconds", "120");
[...]
```

![image](images/NoteSmall.jpg) ***NOTE:*** _Deadline Failure Detector_ is the default failure detector in Hazelcast.

### ϕ (Phi) Accrual Failure Detector

This is the failure detector based on [The ϕ Accrual Failure Detector' by Hayashibara et al.](https://www.computer.org/csdl/proceedings/srds/2004/2239/00/22390066-abs.html)

_ϕ (Phi) Accrual Failure Detector_ keeps track of the intervals between heartbeats in a sliding window of time and measures the mean and variance of these samples and calculates a value of suspicion level (ϕ). The value of ϕ (phi) will increase the longer it has been since the last heartbeat. If the network becomes slow or unreliable, the resulting mean and variance will increase, there will need to be a longer period for which no heartbeat is received before the process is suspected. 

`hazelcast.heartbeat.interval.seconds` and `hazelcast.max.no.heartbeat.seconds` properties will still be used as period of heartbeat messages and deadline of heartbeat messages. Since _ϕ (Phi) Accrual Failure Detector_ is adaptive to network conditions, a much lower `hazelcast.max.no.heartbeat.seconds` can be defined than _Deadline Failure Detector_'s timeout.

Additional to above two properties, _ϕ (Phi) Accrual Failure Detector_ has three more configuration properties:

- `hazelcast.heartbeat.phiaccrual.failuredetector.threshold`: This is the ϕ threshold for suspicion. After calculated ϕ (phi) exceeds this threshold, a member is considered as unreachable and marked as suspected. A low threshold allows to detect member crashes/failures faster but can generate more mistakes and cause wrong member suspicions. A high threshold generates fewer mistakes but is slower detect actual crashes/failures.

 `ϕ = 1` means likeliness that we will make a mistake is about `10%`. The likeliness is about `1%` with `ϕ = 2`, `0.1%` with `ϕ = 3`, and so on. Default ϕ (phi) threshold is 10.

- `hazelcast.heartbeat.phiaccrual.failuredetector.sample.size`: Number of samples to keep for history. Default value is 200.

- `hazelcast.heartbeat.phiaccrual.failuredetector.min.std.dev.millis`: Minimum standard deviation to use for the normal distribution used when calculating ϕ (phi). Too low standard deviation might result in too much sensitivity.

To use _ϕ (Phi) Accrual Failure Detector_ configuration property `hazelcast.heartbeat.failuredetector.type` should be set to `"phi-accrual"`.

```xml
<hazelcast>
    [...]
	<properties>
        <property name="hazelcast.heartbeat.failuredetector.type">phi-accrual</property>
        <property name="hazelcast.heartbeat.interval.seconds">1</property>
        <property name="hazelcast.max.no.heartbeat.seconds">60</property>
        <property name="hazelcast.heartbeat.phiaccrual.failuredetector.threshold">10</property>
        <property name="hazelcast.heartbeat.phiaccrual.failuredetector.sample.size">200</property>
        <property name="hazelcast.heartbeat.phiaccrual.failuredetector.min.std.dev.millis">100</property>
        [...]
    </properties>
    [...]
</hazelcast>
```

```java
Config config = ...;
config.setProperty("hazelcast.heartbeat.failuredetector.type", "phi-accrual");
config.setProperty("hazelcast.heartbeat.interval.seconds", "1");
config.setProperty("hazelcast.max.no.heartbeat.seconds", "60");
config.setProperty("hazelcast.heartbeat.phiaccrual.failuredetector.threshold", "10");
config.setProperty("hazelcast.heartbeat.phiaccrual.failuredetector.sample.size", "200");
config.setProperty("hazelcast.heartbeat.phiaccrual.failuredetector.min.std.dev.millis", "100");
[...]
```
