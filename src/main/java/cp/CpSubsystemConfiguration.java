import com.hazelcast.config.*;
import com.hazelcast.config.cp.*;


public class CpSubsystemConfiguration {

    public static void main(String[] args) throws Exception{
        Config config = new Config();
        //tag::cpconf[]
        config.getCPSubsystemConfig()
              .setCPMemberCount(7)
              .setGroupSize(3)
              .setSessionTimeToLiveSeconds(300)
              .setSessionHeartbeatIntervalSeconds(5)
              .setMissingCPMemberAutoRemovalSeconds(14400)
              .setFailOnIndeterminateOperationState(false);
        //end::cpconf[]

        //tag::cpraftconf[]
        config.getCPSubsystemConfig()
              .getRaftAlgorithmConfig()
              .setLeaderElectionTimeoutInMillis(2000)
              .setLeaderHeartbeatPeriodInMillis(5000)
              .setMaxMissedLeaderHeartbeatCount(5)
              .setAppendRequestMaxEntryCount(50)
              .setAppendRequestMaxEntryCount(1000)
              .setUncommittedEntryCountToRejectNewAppends(200)
              .setAppendRequestBackoffTimeoutInMillis(250);
        //end::cpraftconf[]

        //tag::cpsemaconf[]
        config.getCPSubsystemConfig()
              .addSemaphoreConfig(new CPSemaphoreConfig("jdk-compatible-semaphore", true))
              .addSemaphoreConfig(new CPSemaphoreConfig("another-semaphore", false));
        //end::cpsemaconf[]

        //tag::cplockconf[]
        config.getCPSubsystemConfig()
              .addLockConfig(new FencedLockConfig("reentrant-lock", 0))
              .addLockConfig(new FencedLockConfig("limited-reentrant-lock", 10))
              .addLockConfig(new FencedLockConfig("non-reentrant-lock", 1));
        //end::cplockconf[]
    }
}
