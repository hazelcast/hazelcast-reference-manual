

### Listening for Migration Events

The Migration Listener interface has methods that are invoked for the following events:

- `migrationStarted`: A partition migration is started.
- `migrationCompleted`: A partition migration is completed.
- `migrationFailed`: A partition migration failed.

To write a Migration Listener class, you implement the DistributedObjectListener interface and its methods.

The following is an example Migration Listener class.


```java
public class ClusterMigrationListener implements MigrationListener {
     @Override
     public void migrationStarted(MigrationEvent migrationEvent) {
       System.err.println("Started: " + migrationEvent);
     }
    @Override
     public void migrationCompleted(MigrationEvent migrationEvent) {
       System.err.println("Completed: " + migrationEvent);
     }
     @Override
     public void migrationFailed(MigrationEvent migrationEvent) {
       System.err.println("Failed: " + migrationEvent);
     }
}     
```

When a respective event is fired, the migration listener outputs the partition ID, status of the migration, the old member and the new member. The following is an example output.

```
Started: MigrationEvent{partitionId=98, oldOwner=Member [127.0.0.1]:5701,
newOwner=Member [127.0.0.1]:5702 this} 
```

