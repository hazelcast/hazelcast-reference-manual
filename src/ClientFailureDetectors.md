### Java Client Failure Detectors

The client failure detectors are responsible to determine if a member in the cluster is unreachable or crashed. The most important problem in the failure detection is to distinguish whether a member is still alive but slow, or has crashed. But according to the famous [FLP result](http://dl.acm.org/citation.cfm?doid=3149.214121), it is impossible to distinguish a crashed member from a slow one in an asynchronous system. A workaround to this limitation is to use unreliable failure detectors. An unreliable failure detector allows a member to suspect that others have failed, usually based on liveness criteria but it can make mistakes to a certain degree.

Hazelcast Java client has two built-in failure detectors: Deadline Failure Detector and Ping Failure Detector. These client failure detectors work independently from the member failure detectors, e.g., you do not need to enable the member failure detectors to benefit from the client ones.

#### Client Deadline Failure Detector

_Deadline Failure Detector_ uses an absolute timeout for missing/lost heartbeats. After timeout, a member is considered as crashed/unavailable and marked as suspected.

_Deadline Failure Detector_ has two configuration properties:

- `hazelcast.client.heartbeat.interval`: This is the interval at which client sends heartbeat messages to members. 
- `hazelcast.client.heartbeat.timeout`: This is the timeout which defines when a cluster member is suspected, because it has not sent any response back to client requests.

The following is a declarative example showing how you can configure the Deadline Failure Detector for your client (in the client's  configuration XML file, e.g., `hazelcast-client.xml`):


```xml
<hazelcast-client>
    [...]
	<properties>
        <property name="hazelcast.client.heartbeat.timeout">60000</property>
        <property name="hazelcast.client.heartbeat.interval">5000</property>
        [...]
    </properties>
    [...]
</hazelcast-client>
```

And, the following is the equivalent programmatic configuration:

```java
ClientConfig config = ...;
config.setProperty("hazelcast.client.heartbeat.timeout", "60000");
config.setProperty("hazelcast.client.heartbeat.interval", "5000");
[...]
```


#### Client Ping Failure Detector

The Ping Failure Detector may be configured in addition to the Deadline Failure Detector. It operates at Layer 3 of the OSI protocol, and provides much quicker and more deterministic detection of hardware and other lower level events. 
When the JVM process has enough permissions to create RAW sockets, the implementation will choose to rely on ICMP Echo requests. This is preferred.

If there are not enough permissions, it can be configured to fallback on attempting a TCP Echo on port 7. In the latter case, both a successful connection or an explicit rejection will be treated as "Host is Reachable". Or, it can be forced to use only RAW sockets. This is not preferred as each call creates a heavy weight socket and moreover the Echo service is typically disabled. 

For the Ping Failure Detector to rely **only** on ICMP Echo requests, there are some criteria that need to be met:

- Supported OS: as of Java 1.8 only Linux/Unix environments are supported.
- The Java executable must have the `cap_net_raw` capability.
- The file `ld.conf` must be edited to overcome the rejection by the dynamic linker when loading libs from untrusted paths.
- ICMP Echo Requests must not be blocked by the receiving hosts.

The details of these requirements are explained in the [Requirements section](#requirements-and-linux-unix-configuration) of Hazelcast members' [Ping Failure Detector](#ping-failure-detector).


If any of the above criteria isn't met, then the `isReachable` will always fallback on TCP Echo attempts on port 7.

An example declarative configuration to use the Ping Failure Detector is as follows (in the client's  configuration XML file, e.g., `hazelcast-client.xml`):

```xml
<hazelcast-client>
    [...]
    <network>
        [...]
        <icmp-ping enabled="true">
            <timeout-milliseconds>1000</timeout-milliseconds>
            <interval-milliseconds>1000</interval-milliseconds>
            <ttl>255<ttl>
            <echo-fail-fast-on-startup>false</echo-fail-fast-on-startup>
            <max-attempts>2</max-attempts>
        </icmp-ping>
        [...]
    </network>
    [...] 
</hazelcast-client>  

```

And, the equivalent programmatic configuration:

```java
ClientConfig config = ...;
 
ClientNetworkConfig networkConfig = clientConfig.getNetworkConfig();
ClientIcmpPingConfig clientIcmpPingConfig = networkConfig.getClientIcmpPingConfig();
clientIcmpPingConfig.setIntervalMilliseconds(1000)
        .setTimeoutMilliseconds(1000)
        .setTtl(255)
        .setMaxAttempts(2)
        .setEchoFailFastOnStartup(false)
        .setEnabled(true);
[...]
```

- `enabled` (default false) - Enables the legacy ICMP detection mode, works cooperatively with the existing failure detector, and only kicks-in after a pre-defined period has passed with no heartbeats from a member.
- `timeout-milliseconds` (default 1000) - Number of milliseconds until a ping attempt is considered failed if there was no reply.
- `max-attempts` (default 3) - Maximum number of ping attempts before the member gets suspected by the detector.
- `interval-milliseconds` (default 1000) - Interval, in milliseconds, between each ping attempt. 1000ms (1 sec) is also the minimum interval allowed.
- `ttl` (default 255) - Maximum number of hops the packets should go through or 0 for the default.

In the above example configuration, the Ping Failure Detector will attempt 2 pings, one every second and will wait up to 1 second for each to complete. If there is no successful ping after 2 seconds, the member will get suspected.

To enforce the [Requirements](#requirements-and-linux-unix-configuration), the property `echo-fail-fast-on-startup` can also be set to `true`, in which case Hazelcast will fail to start if any of the requirements
isn't met.


Unlike the Hazelcast members, Ping Failure Detector works always in parallel with Deadline Failure Detector on the clients.
Below is a summary table of all possible configuration combinations of the Ping Failure Detector.

| ICMP  	| Fail-Fast 	| Description                                                                                                                                                                                                                                                                                                                                   | Linux                                                                                                  	| Windows                       	| macOS                                                                	|
|-------	|-----------	|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |--------------------------------------------------------------------------------------------------------	|-------------------------------	|----------------------------------------------------------------------	|
| true  	| false     	| Parallel ping detector, works in parallel with the configured failure detector. Checks periodically if members are live (OSI Layer 3), and suspects them immediately, regardless of the other detectors.                      	                                                                                                            | Supported  ICMP Echo if available - Falls back on TCP Echo on port 7                                   	| Supported  TCP Echo on port 7 	| Supported  ICMP Echo if available - Falls back on TCP Echo on port 7 	|
| true  	| true      	| Parallel ping detector, works in parallel with the configured failure detector. Checks periodically if members are live (OSI Layer 3), and suspects them immediately, regardless of the other detectors.                      	                                                                                                            | Supported - Requires OS Configuration  Enforcing ICMP Echo if available - No start up if not available 	| Not Supported                 	| Not Supported - Requires root privileges                            	|