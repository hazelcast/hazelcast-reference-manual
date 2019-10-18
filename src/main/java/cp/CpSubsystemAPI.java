import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.cp.CPGroup;
import com.hazelcast.cp.CPGroupId;
import com.hazelcast.cp.CPMember;
import com.hazelcast.cp.CPSubsystem;
import com.hazelcast.cp.CPSubsystemManagementService;
import com.hazelcast.cp.IAtomicLong;
import com.hazelcast.cp.IAtomicReference;
import com.hazelcast.cp.ICountDownLatch;
import com.hazelcast.cp.ISemaphore;
import com.hazelcast.cp.lock.FencedLock;
import com.hazelcast.cp.session.CPSession;
import com.hazelcast.cp.session.CPSessionManagementService;

import java.util.Collection;
import java.util.concurrent.CompletionStage;
import java.util.UUID;

public class CpSubsystemAPI {

    public static void main(String[] args) throws Exception {
        HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
        String name = "test";
        String groupName = "test";
        UUID memberUUID = UUID.randomUUID();
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
        CompletionStage<Collection<CPGroupId>> future = managementService.getCPGroupIds();
        Collection<CPGroupId> groups = future.toCompletableFuture().get();
        //end::cpgroups[]
        }

        {
        //tag::cpmembers[]
        CPSubsystemManagementService managementService = cpSubsystem.getCPSubsystemManagementService();
        CompletionStage<Collection<CPMember>> future = managementService.getCPMembers();
        Collection<CPMember> members = future.toCompletableFuture().get();
        //end::cpmembers[]
        }

        {
        //tag::cpgroup[]
        CPSubsystemManagementService managementService = cpSubsystem.getCPSubsystemManagementService();
        CompletionStage<CPGroup> future = managementService.getCPGroup(groupName);
        CPGroup group = future.toCompletableFuture().get();
        //end::cpgroup[]
        }

        {
        //tag::destroygroup[]
        CPSubsystemManagementService managementService = cpSubsystem.getCPSubsystemManagementService();
        CompletionStage<Void> future = managementService.forceDestroyCPGroup(groupName);
        future.toCompletableFuture().get();
        //end::destroygroup[]
        }

        {
        //tag::removemember[]
        CPSubsystemManagementService managementService = cpSubsystem.getCPSubsystemManagementService();
        CompletionStage<Void> future = managementService.removeCPMember(memberUUID);
        future.toCompletableFuture().get();
        //end::removemember[]
        }

        {
        //tag::promotemember[]
        CPSubsystemManagementService managementService = cpSubsystem.getCPSubsystemManagementService();
        CompletionStage<Void> future = managementService.promoteToCPMember();
        future.toCompletableFuture().get();
        //end::promotemember[]
        }

        {
        //tag::reset[]
        CPSubsystemManagementService managementService = cpSubsystem.getCPSubsystemManagementService();
        CompletionStage<Void> future = managementService.reset();
        future.toCompletableFuture().get();
        //end::reset[]
        }

        {
        //tag::sessions[]
        CPSessionManagementService sessionManagementService = cpSubsystem.getCPSessionManagementService();
        CompletionStage<Collection<CPSession>> future = sessionManagementService.getAllSessions(groupName);
        Collection<CPSession> sessions = future.toCompletableFuture().get();
        //end::sessions[]
        }

        {
        //tag::closesession[]
        CPSessionManagementService sessionManagementService = cpSubsystem.getCPSessionManagementService();
        CompletionStage<Boolean> future = sessionManagementService.forceCloseSession(groupName, sessionId);
        future.toCompletableFuture().get();
        //end::closesession[]
        }
    }
}
