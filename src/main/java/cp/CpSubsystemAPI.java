import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.core.IAtomicLong;
import com.hazelcast.core.IAtomicReference;
import com.hazelcast.core.ICompletableFuture;
import com.hazelcast.core.ICountDownLatch;
import com.hazelcast.core.ISemaphore;
import com.hazelcast.cp.CPGroup;
import com.hazelcast.cp.CPGroupId;
import com.hazelcast.cp.CPMember;
import com.hazelcast.cp.CPSubsystem;
import com.hazelcast.cp.CPSubsystemManagementService;
import com.hazelcast.cp.lock.FencedLock;
import com.hazelcast.cp.session.CPSession;
import com.hazelcast.cp.session.CPSessionManagementService;

import java.util.Collection;

public class CpSubsystemAPI {

    public static void main(String[] args) throws Exception {
        HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
        String name = "test";
        String groupName = "test";
        String memberUUID = "test";
        long sessionId = 1;

        //tag::apisample[]
        CPSubsystem cpSubsystem = hazelcastInstance.getCPSubsystem();

        IAtomicLong atomicLong = cpSubsystem.getAtomicLong(name);

        IAtomicReference atomicRef = cpSubsystem.getAtomicReference(name);

        FencedLock lock = cpSubsystem.getLock(name);

        ISemaphore semaphore = cpSubsystem.getSemaphore(name);

        ICountDownLatch latch = cpSubsystem.getCountDownLatch(name);
        //end::apisample[]

        //tag::localmember[]
        CPMember localMember = cpSubsystem.getLocalCPMember();
        //end::localmember[]

        {
        //tag::cpgroups[]
        CPSubsystemManagementService managementService = cpSubsystem.getCPSubsystemManagementService();
        ICompletableFuture<Collection<CPGroupId>> future = managementService.getCPGroupIds();
        Collection<CPGroupId> groups = future.get();
        //end::cpgroups[]
        }

        {
        //tag::cpmembers[]
        CPSubsystemManagementService managementService = cpSubsystem.getCPSubsystemManagementService();
        ICompletableFuture<Collection<CPMember>> future = managementService.getCPMembers();
        Collection<CPMember> members = future.get();
        //end::cpmembers[]
        }

        {
        //tag::cpgroup[]
        CPSubsystemManagementService managementService = cpSubsystem.getCPSubsystemManagementService();
        ICompletableFuture<CPGroup> future = managementService.getCPGroup(groupName);
        CPGroup group = future.get();
        //end::cpgroup[]
        }

        {
        //tag::destroygroup[]
        CPSubsystemManagementService managementService = cpSubsystem.getCPSubsystemManagementService();
        ICompletableFuture<Void> future = managementService.forceDestroyCPGroup(groupName);
        future.get();
        //end::destroygroup[]
        }

        {
        //tag::removemember[]
        CPSubsystemManagementService managementService = cpSubsystem.getCPSubsystemManagementService();
        ICompletableFuture<Void> future = managementService.removeCPMember(memberUUID);
        future.get();
        //end::removemember[]
        }

        {
        //tag::promotemember[]
        CPSubsystemManagementService managementService = cpSubsystem.getCPSubsystemManagementService();
        ICompletableFuture<Void> future = managementService.promoteToCPMember();
        future.get();
        //end::promotemember[]
        }

        {
        //tag::restart[]
        CPSubsystemManagementService managementService = cpSubsystem.getCPSubsystemManagementService();
        ICompletableFuture<Void> future = managementService.restart();
        future.get();
        //end::restart[]
        }

        {
        //tag::sessions[]
        CPSessionManagementService sessionManagementService = cpSubsystem.getCPSessionManagementService();
        ICompletableFuture<Collection<CPSession>> future = sessionManagementService.getAllSessions(groupName);
        Collection<CPSession> sessions = future.get();
        //end::sessions[]
        }

        {
        //tag::closesession[]
        CPSessionManagementService sessionManagementService = cpSubsystem.getCPSessionManagementService();
        ICompletableFuture<Boolean> future = sessionManagementService.forceCloseSession(groupName, sessionId);
        future.get();
        //end::closesession[]
        }
    }
}
