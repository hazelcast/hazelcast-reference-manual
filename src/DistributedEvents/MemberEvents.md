
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

