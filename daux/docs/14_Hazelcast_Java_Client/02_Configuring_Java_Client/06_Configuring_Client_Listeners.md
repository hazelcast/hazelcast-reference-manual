
You can configure global event listeners using `ListenerConfig` as shown below.


```java
ClientConfig clientConfig = new ClientConfig();
ListenerConfig listenerConfig = new ListenerConfig(LifecycleListenerImpl);
clientConfig.addListenerConfig(listenerConfig);
```

```java
ClientConfig clientConfig = new ClientConfig();
ListenerConfig listenerConfig = new ListenerConfig("com.hazelcast.example.MembershipListenerImpl");
clientConfig.addListenerConfig(listenerConfig);
```

You can add three types of event listeners.

- LifecycleListener
- MembershipListener
- DistributedObjectListener


***RELATED INFORMATION***

*Please refer to <a href="https://github.com/hazelcast/hazelcast/blob/master/hazelcast/src/main/java/com/hazelcast/core/LifecycleListener.java" target="_blank">LifecycleListener</a>, <a href="https://github.com/hazelcast/hazelcast/blob/master/hazelcast/src/main/java/com/hazelcast/core/MembershipListener.java" target="_blank">MembershipListener</a> and <a href="https://github.com/hazelcast/hazelcast/blob/master/hazelcast/src/main/java/com/hazelcast/core/DistributedObjectListener.java" target="_blank">DistributedObjectListener</a>.*
<br></br>


