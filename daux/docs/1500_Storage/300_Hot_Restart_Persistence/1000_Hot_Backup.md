
During Hot Restart operations you can take a snapshot of the Hot Restart Store at a certain point in time. This is useful when you wish to bring up a new cluster with the same data or parts of the data. The new cluster can then be used to share load with the original cluster, to perform testing, QA or reproduce an issue on production data. 

Simple file copying of a currently running cluster does not suffice and can produce inconsistent snapshots with problems such as resurrection of deleted values or missing values.

#### Configuring Hot Backup

To create snapshots you must first configure the Hot Restart backup directory. You can configure the directory programmatically or declaratively using the following configuration element:

- `backup-dir`: This element is included in the `hot-restart-persistence` and denotes the destination under which backups will be stored. If this element is not defined, hot backup will be disabled. If a directory is defined which does not exist, it will be created on first backup. To avoid clashing data on multiple backups, each backup has a unique sequence ID which determines the name of the directory which will contain all Hot Restart data. This unique directory is created as a subdirectory of the configured `backup-dir`.

The following are examples configurations for Hot backup.

**Declarative Configuration**:

An example configuration is shown below.

```xml
<hazelcast>
   ...
   <hot-restart-persistence enabled="true">
	   ...
	   <backup-dir>/mnt/hot-backup</backup-dir>
	   ...
   </hot-restart-persistence>
   ...
</hazelcast>
```


**Programmatic Configuration**:

The programmatic equivalent of the above declarative configuration is shown below.

```java
HotRestartPersistenceConfig hotRestartPersistenceConfig = new HotRestartPersistenceConfig();
hotRestartPersistenceConfig.setBackupDir(new File("/mnt/hot-backup"));
...
config.setHotRestartPersistenceConfig(hotRestartPersistenceConfig);
```

#### Using Hot Backup

Once configured, you can initiate a new backup via API or from the management center. The backup is started transactionally and cluster-wide. This means that either all none of the members will start the same backup. The member which receives the backup request will determine a new backup sequence ID and send that information to all members. If all members respond that no other backup is currently in progress and that no other backup request has already been made, then the coordinating member will command the other members to start the actual backup process. This will create a directory under the configured `backup-dir` with the name `backup-<backupSeq>` and start copying the data from the original store.

The backup process is initiated nearly instantaneously on all members. Note that since there is no limitation as to when the backup process is initiated, it may be initiated during membership changes, partition table changes or during normal data update. Some of these operations may not be completed fully yet, which means that some members will backup some data while some members will backup a previous version of the same data. This will usually be solved by the anti-entropy mechanism on the new cluster which will reconcile different versions of the same data. Please check the Achieving High Consistency of Backup Data section below for more information.

The duration of the backup process and the disk data usage drastically depends on what is supported by the system and the configuration. Please check the Achieving high performance of backup process section below for more information on achieving better resource usage of the backup process.

Following is an example of how to trigger the Hot Backup via API: 

```java
HotRestartService service = instance.getCluster().getHotRestartService();
service.backup();
```

You can also define the backup sequence yourself:

```java
HotRestartService service = instance.getCluster().getHotRestartService();
long backupSeq = ...
service.backup(backupSeq);
```

Keep in mind that the backup will fail if any member contains a backup directory with the name `backup-<backupSeq>`, where `backupSeq` is the given sequence.

#### Achieving High Consistency of Backup Data

The backup is initiated nearly simultaneously on all members but you can encounter some inconsistencies in the data. This is because some members might have and some might not have received updated values yet from executed operations, because the system could be undergoing partition and membership changes or because there are some transactions which have not yet been committed. 

To achieve a high consistency of data on all members, the cluster should be put to `PASSIVE` state for the duration of the call to the backup method. See the [Cluster Member States section](/17_Management/03_Cluster_Utilities/01_Managing_Cluster_and_Member_States.md) on information on how to do this. The cluster does not need to be in `PASSIVE` state for the entire duration of the backup process, though. Because of the design, only partition metadata is copied synchronously during the invocation of the backup method. Once the backup method has returned all cluster metadata has been copied and the exact partition data which needs to be copied will have been marked. After that, the backup process continues asynchronously and you can return the cluster to the `ACTIVE` state and resume operations.

#### Achieving High Performance of Backup Process

Because of the design of Hot Restart Store, we can use hard links to achieve backups/snapshots of the store. The hot backup process will use hard links whenever possible because they provide big performance benefits and because the backups share disk usage. 

The performance benefit comes from the fact that Hot Restart file contents are not being duplicated (thus using disk and IO resources) but rather a new file name is created for the same contents on disk (another pointer to the same inode). Since all backups and stores share the same inode, disk usage drops. 

The bigger the percentage of stable data in the Hot Restart Store (data not undergoing changes), the more files will each backup share with the operational Hot Restart Store and the less disk space it will be using. For the hot backup to use hard links, you must be running Hazelcast members on JDK 7 or higher and must satisfy all requirements for the <a href="https://docs.oracle.com/javase/7/docs/api/java/nio/file/Files.html#createLink(java.nio.file.Path,%20java.nio.file.Path)" target="_blank">`Files#createLink` method</a> to be supported. 

The backup process will initially attempt to create a new hard link and if that fails for any reason it will continue by copying the data. Subsequent backups will also attempt to use hard links.

#### Backup Process Progress and Completion

Only cluster and distributed object metadata is copied synchronously during the invocation of the backup method. The rest of the Hot Restart Store containing partition data will be copied asynchronously after the method call has ended. You can track the progress by API or view it from the management center. 

An example of how to track the progress via API is shown below:

```java
HotRestartService service = instance.getCluster().getHotRestartService();
HotRestartStateImpl status = service.getBackupTaskStatus();
...
```

The returned object contains local member backup status:

- the backup state (NOT_STARTED, IN_PROGRESS, FAILURE, SUCCESS)
- the completed count
- the total count


The completed and total count can provide you a way to track the percentage of the copied data. Currently the count defines the number of copied and total local member Hot Restart Stores (defined by `HotRestartPersistenceConfig#setParallelism`) but this can change at a later point to provide greater resolution.

Besides tracking the Hot Restart status by API, you can view the status in the management center and you can inspect the on-disk files for each member. Each member creates an `inprogress` file which is created in each of the copied Hot Restart Stores. This means that the backup is currently in progress. As the backup task completes the backup operation, the file will be removed. If an error occurs during the backup task, the `inprogress` file will be renamed to `failure` and it will contain a stack trace of the exception.

#### Backup Task Interruption and Cancellation

Once the backup method call has returned and asynchronous copying of the partition data has started, the backup task can be interrupted. This is helpful in situations where the backup task has started at an inconvenient time. For instance, the backup task could be automatized and it could be accidentally triggered during high load on the Hazelcast instances, causing the performance of the Hazelcast instances to drop.

The backup task mainly uses disk IO, consumes little CPU and it generally does not last for a long time (although you should test it with your environment to determine the exact impact). Nevertheless, you can abort the backup tasks on all members via a cluster-wide interrupt operation. This operation can be triggered programmatically or from the management center. 

An example of programmatic interruption is shown below:

```java
HotRestartService service = instance.getCluster().getHotRestartService();
service.interruptBackupTask();
...
```

This method will send an interrupt to all members. The interrupt is ignored if the backup task is currently not in progress so you can safely call this method even though it has previously been called or when some members have already completed their local backup tasks.

You can also interrupt the local member backup task as shown below:

```java
HotRestartService service = instance.getCluster().getHotRestartService();
service.interruptLocalBackupTask();
...
```

The backup task will stop as soon as possible and it will not remove the disk contents of the backup directory meaning that you must remove it manually.