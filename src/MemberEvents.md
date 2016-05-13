
### Listening for Member Events

The Membership Listener interface has methods that are invoked for the following events.

- `memberAdded`: A new member is added to the cluster.
- `memberRemoved`: An existing member leaves the cluster.
- `memberAttributeChanged`: An attribute of a member is changed. Please refer to [Defining Member Attributes](#defining-member-attributes) to learn about member attributes.

To write a Membership Listener class, you implement the MembershipListener interface and its methods.

The following is an example Membership Listener class.

```java
public class ClusterMembershipListener
     implements MembershipListener {
     
public void memberAdded(MembershipEvent membershipEvent) {
  System.err.println("Added: " + membershipEvent);
}

public void memberRemoved(MembershipEvent membershipEvent) {
       System.err.println("Removed: " + membershipEvent);
     }

public void memberAttributeChanged(MemberAttributeEvent memberAttributeEvent) {
       System.err.println("Member attribute changed: " + memberAttributeEvent);
     }
     
}
```

When a respective event is fired, the membership listener outputs the addresses of the members that joined and left, and also which attribute changed on which member.

#### Registering Membership Listeners

After you create your class, you can configure your cluster to include the membership listener. Below is an example using the method `addMembershipListener`.

```java
HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
hazelcastInstance.getCluster().addMembershipListener( new ClusterMembershipListener() );
```

With the above approach, there is the possibility of missing events between the creation of the instance and registering the listener. To overcome this race condition, Hazelcast allows you to register listeners in configuration. You can register listeners using declarative, programmatic, or Spring configuration, as shown below.

The following is an example programmatic configuration.

```java
Config config = new Config();
config.addListenerConfig(
new ListenerConfig( "com.your-package.ClusterMembershipListener" ) );
```


The following is an example of the equivalent declarative configuration. 

```xml
<hazelcast>
   ...
   <listeners>
      <listener type="membership-listener">
         com.your-package.ClusterMembershipListener
      </listener>
   </listeners>
   ...
</hazelcast>
```

The following is an example of the equivalent Spring configuration.

```
<hz:listeners>
 <hz:listener class-name="com.your-package.ClusterMembershipListener"/>
 <hz:listener implementation="MembershipListener"/>
</hz:listeners>
```

