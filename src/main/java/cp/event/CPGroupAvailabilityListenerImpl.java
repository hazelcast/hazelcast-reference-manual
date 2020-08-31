import com.hazelcast.cp.event.*;

//tag::impl[]
public class CPGroupAvailabilityListenerImpl implements CPGroupAvailabilityListener {

    /**
     * Called when a CP group's availability decreases,
     * but still has the majority of members available.
     */
    public void availabilityDecreased(CPGroupAvailabilityEvent event) {
        System.out.println("Availability decreased: " + event);
    }

    /**
     * Called when a CP group has lost its majority.
     */
    public void majorityLost(CPGroupAvailabilityEvent event) {
        System.out.println("Majority Lost: " + event);
    }
}
//end::impl[]
