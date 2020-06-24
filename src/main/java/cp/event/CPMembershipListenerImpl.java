import com.hazelcast.cp.event.*;

//tag::impl[]
public class CPMembershipListenerImpl implements CPMembershipListener {

    /**
     * Called when a new CP member is added to the CP Subsystem.
     */
    public void memberAdded(CPMembershipEvent event) {
        System.out.println("Added: " + event);
    }

    /**
     * Called when a CP member is removed from the CP Subsystem.
     */
    public void memberRemoved(CPMembershipEvent event) {
        System.out.println("Removed: " + event);
    }
}
//end::impl[]
