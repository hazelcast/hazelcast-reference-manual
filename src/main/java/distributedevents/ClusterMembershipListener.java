import com.hazelcast.cluster.MembershipEvent;
import com.hazelcast.cluster.MembershipListener;

//tag::cml[]
public class ClusterMembershipListener implements MembershipListener {

    public void memberAdded(MembershipEvent membershipEvent) {
        System.err.println("Added: " + membershipEvent);
    }

    public void memberRemoved(MembershipEvent membershipEvent) {
        System.err.println("Removed: " + membershipEvent);
    }
}
//end::cml[]