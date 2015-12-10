

## Cluster Utilities

This section provides information on programmatic utilities you can use to listen to the cluster events, to change the state of your cluster, to check whether the cluster and/or members are safe before shutting down a member, and to define the minimum number of cluster members required for the cluster to remain up and running. It also gives information on the Hazelcast Lite Member.

### Getting Member Events and Member Sets

Hazelcast allows you to register for membership events so you will be notified when members are added or removed. You can also get the set of cluster members.

The following example code does the above: registers for member events, notified when members are added or removed, and gets the set of cluster members.

```java
import com.hazelcast.core.*;

HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
Cluster cluster = hazelcastInstance.getCluster();
cluster.addMembershipListener( new MembershipListener() {
  public void memberAdded( MembershipEvent membershipEvent ) {
    System.out.println( "MemberAdded " + membershipEvent );
  }

  public void memberRemoved( MembershipEvent membershipEvent ) {
    System.out.println( "MemberRemoved " + membershipEvent );
  }
} );

Member localMember  = cluster.getLocalMember();
System.out.println ( "my inetAddress= " + localMember.getInetAddress() );

Set setMembers  = cluster.getMembers();
for ( Member member : setMembers ) {
  System.out.println( "isLocalMember " + member.localMember() );
  System.out.println( "member.inetaddress " + member.getInetAddress() );
  System.out.println( "member.port " + member.getPort() );
}
```

***RELATED INFORMATION***

*Please refer to the [Membership Listener section](#membership-listener) for more information on membership events.*