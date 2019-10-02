import com.hazelcast.partition.MigrationListener;
import com.hazelcast.partition.MigrationState;
import com.hazelcast.partition.ReplicaMigrationEvent;

//tag::clstrmigrationlistener[]
public class ClusterMigrationListener implements MigrationListener {

    @Override
    public void migrationStarted(MigrationState state) {
        System.out.println("Migration Started: " + state);
    }

    @Override
    public void migrationFinished(MigrationState state) {
        System.out.println("Migration Finished: " + state);
    }

    @Override
    public void replicaMigrationCompleted(ReplicaMigrationEvent event) {
        System.out.println("Replica Migration Completed: " + event);
    }

    @Override
    public void replicaMigrationFailed(ReplicaMigrationEvent event) {
        System.out.println("Replica Migration Failed: " + event);
    }
}
//end::clstrmigrationlistener[]
