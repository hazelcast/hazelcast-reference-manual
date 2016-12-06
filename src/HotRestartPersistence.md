## Hot Restart Persistence

<font color="##153F75">**Hazelcast Enterprise HD**</font>
<br></br>




This chapter explains the Hazelcast's Hot Restart Persistence feature, introduced with Hazelcast 3.6. Hot Restart Persistence provides fast cluster restarts by storing the states of the cluster members on the disk. This feature is currently provided for the Hazelcast map data structure and the Hazelcast JCache implementation.

### Hot Restart Persistence Overview

Hot Restart Persistence enables you to get your cluster up and running swiftly after a cluster restart. A restart can be caused by a planned shutdown (including rolling upgrades) or a sudden cluster-wide crash (e.g. power outage). For Hot Restart Persistence, required states for Hazelcast clusters and members are introduced. Please refer to the [Managing Cluster and Member States section](#managing-cluster-and-member-states) for information on the cluster and member states. The purpose of the Hot Restart Persistence is to provide a maintenance window for member operations and restart the cluster in a fast way. It is not meant to recover the catastrophic shutdown of one member.

### Hot Restart Types

The Hot Restart feature is supported for the following restart types:

- **Restart after a planned shutdown**:
	- The cluster is shut down completely and restarted with the exact same previous setup and data.

		You can shut down the cluster completely using the method `HazelcastInstance.getCluster().shutdown()` or you can manually change the cluster state to `PASSIVE` and then shut down each member one by one. When you send the command to shut the cluster down, i.e. `HazelcastInstance.getCluster().shutdown()`, the members that are not in the `PASSIVE` state temporarily change their states to `PASSIVE`. Then, each member shuts itself down by calling the method `HazelcastInstance.shutdown()`.

		Difference between explicitly changing state to `PASSIVE` before shutdown and shutting down cluster directly via `HazelcastInstance.getCluster().shutdown()` is, on latter case when cluster is restarted, cluster state will be in the latest state before shutdown. That means if cluster is `ACTIVE` before shutdown, cluster state will automatically become `ACTIVE` after restart is completed.

	- Rolling upgrade: The cluster is restarted intentionally member by member. For example, this could be done to install an operating system patch or new hardware.

		To be able to shut down the cluster member by member as part of a planned restart, each member in the cluster should be in the `FROZEN` or `PASSIVE` state. After the cluster state is changed to `FROZEN` or `PASSIVE`, you can manually shut down each member by calling the method `HazelcastInstance.shutdown()`. When that member is restarted, it will rejoin the running cluster. After all members are restarted, the cluster state can be changed back to `ACTIVE`.

- **Restart after a cluster crash**: The cluster is restarted after all its members crashed at the same time due to a power outage, networking interruptions, etc.

### Restart Process

During the restart process, each member waits to load data until all the members in the partition table are started. During this process, no operations are allowed. Once all cluster members are started, Hazelcast changes the cluster state to `PASSIVE` and starts to load data. When all data is loaded, Hazelcast changes the cluster state to its previous known state before shutdown and starts to accept the operations which are allowed by the restored cluster state.

If a member fails to either start, join the cluster in time (within the timeout), or load its data, then that member will be terminated immediately. After the problems causing the failure are fixed, that member can be restarted. If the cluster start cannot be completed in time, then all members will fail to start. Please refer to the [Configuring Hot Restart section](#configuring-hot-restart) for defining timeouts.

In the case of a restart after a cluster crash, the Hot Restart feature realizes that it was not a clean shutdown and Hazelcast tries to restart the cluster with the last saved data following the process explained above. In some cases, specifically when the cluster crashes while it has an ongoing partition migration process, currently it is not possible to restore the last saved state.

#### Example Scenarios

Assume the following:

- You have a cluster consisting of members A and B with Hot Restart enabled, which is initially stable.
- Member B is killed.
- Member B restarts.

Since only a single member has failed, the cluster performed the standard High Availability routine by recovering member B's data from backups and redistributing the data among the remaining members (the single member A in this case). Member B's persisted Hot Restart data is completely irrelevant.

Furthermore, when a member starts with existing Hot Restart data, it expects to find itself within a cluster that has been shut down as a whole and is now restarting as a whole. Since the reality is that the cluster has been running all along, member B's persisted cluster state does not match the actual state. Therefore, member B aborts initialization and shuts down.

As another scenario, assume the following:

- You have a cluster consisting of members A and B with Hot Restart enabled, which is initially stable.
- Member B is killed.
- Member B's Hot Restart [base directory(`base-dir`)](#configuring-hot-restart) is deleted.
- Member B restarts.

Now member B joins the cluster as a fresh, empty member. The cluster will assign some partitions to it, unrelated to the partitions it owned before going down. 


### Force Start

A member can crash permanently and then be unable to recover from the failure. In that case, restart process cannot be completed since some of the members do not start or fail to load their own data. In that case, you can force the cluster to clean its persisted data and make a fresh start. This process is called **force start**.

Assume the following which is a valid scenario to use force start:

- You have a cluster consisting of members A and B which is initially stable.
- Cluster transitions into `FROZEN` or `PASSIVE` state.
- Cluster gracefully shuts down.
- Member A restarts, but member B does not.
- Member A uses its Hot Restart data to initiate the Hot Restart procedure.
- Since it knows the cluster originally contained member B as well, it waits for it to join.
- This never happens.
- Now you have the choice to Force Start the cluster without member B.
- Cluster discards all Hot Restart data and starts empty.

You can trigger the force start process using the Management Center, REST API and cluster management scripts.

Please note that force start is a destructive process, which results in deletion of persisted Hot Restart data.

Please refer to the [Hot Restart functionality](#hot-restart) of the Management Center section to learn how you can perform a force start using the Management Center.

### Partial Start

When one or more members fail to start or have incorrect Hot Restart data (stale or corrupted data) or fail to load their Hot Restart data, cluster will become incomplete and restart mechanism cannot proceed. One solution is to use [Force Start](#force-start) and make a fresh start with existing members. Another solution is to do a partial start.

Partial start means that the cluster will start with an incomplete member set. Data belonging to those missing members will be assumed lost and Hazelcast will try to recover missing data using the restored backups.  For example, if you have minimum two backups configured for all maps and caches, then a partial start up to two missing members will be safe against data loss. If there are more than two missing members or there are maps/caches with less than two backups, then data loss is expected.

Partial start is controlled by `cluster-data-recovery-policy` configuration parameter and is not allowed by default. To enable partial start, one of the configuration values `PARTIAL_RECOVERY_MOST_RECENT` or `PARTIAL_RECOVERY_MOST_COMPLETE` should be set. Please see [Configuring Hot Restart section](#configuring-hot-restart) for details.

When partial start is enabled, Hazelcast can perform a partial start automatically or manually, in case of some members are unable to restart successfully. Partial start proceeds automatically when some members fail to start and join to the cluster in `validation-timeout-seconds`. After the `validation-timeout-seconds` duration is passed, Hot Restart chooses to perform partial start with the members present in the cluster. Moreover, partial start can be requested manually using the [Management Center](#hot-restart), [REST API](#using-rest-api-for-cluster-management) and [cluster management scripts](#example-usages-for-cluster-sh) before the `validation-timeout-seconds` duration passes.

The other situation to decide to perform a partial start is failures during the data load phase. When Hazelcast learns data load result of all members which have passed the validation step, it automatically performs a partial start with the ones which have successfully restored their Hot Restart data. Please note that partial start does not expect every member to succeed in the data load step. It completes the process when it learns data load result for every member and there is at least one member which has successfully restored its Hot Restart data. Relatedly, if it cannot learn data load result of all members before `data-load-timeout-seconds` duration, it proceeds with the ones which have already completed the data load process.

Selection of members to perform partial start among live members is done according to the `cluster-data-recovery-policy` configuration. Set of members which are not selected by the `cluster-data-recovery-policy` are called `Excluded members`, and they are instructed to perform [force start](#force-start). Excluded members are allowed to join cluster only when they clean their Hot Restart data and make a fresh-new start. This is a completely automatic process. For instance, if you start the missing members after partial start is completed, they clean their Hot Restart data and join to the cluster.

Please note that partial start is a destructive process. Once it is completed, it cannot be repeated with a new configuration. For this reason, one may need to perform the partial start process manually. Automatic behavior of partial start relies on `validation-timeout-seconds` and `data-load-timeout-seconds` configuration values. If you need to control the process manually, `validation-timeout-seconds` and `data-load-timeout-seconds` properties can be set to very big values so that Hazelcast cannot make progress on timeouts automatically. Then, the overall process can be managed manually via aforementioned methods, i.e. Management Center, REST API and cluster management scripts.

### Configuring Hot Restart

You can configure Hot Restart programmatically or declaratively. The configuration includes elements to enable/disable the feature, to specify the directory where the Hot Restart data will be stored, and to define timeout values.

The following are the descriptions of the Hot Restart configuration elements.

- `hot-restart-persistence`: The configuration that enables the Hot Restart feature. It includes the element `base-dir` that is used to specify the directory where the Hot Restart data will be stored. The default value for `base-dir` is `hot-restart`. You can use the default value, or you can specify the value of another folder containing the Hot Restart configuration, but it is mandatory that this `hot-restart` element has a value. This directory will be created automatically if it does not exist.
A single `base-dir` can be used only and only by a single Hazelcast member, it cannot be shared by multiple members. An attempt to use the same `base-dir` by multiple members will make these members abort the startup process except one which wins the ownership of the directory.
- `parallelism`: Level of parallelism in Hot Restart Persistence. There will be this many IO threads, each writing in parallel to its own files. During the Hot Restart procedure, this many IO threads will be reading the files and this many rebuilder threads will be rebuilding the Hot Restart metadata.
- `validation-timeout-seconds`: Validation timeout for the Hot Restart process when validating the cluster members expected to join and the partition table on the whole cluster.
- `data-load-timeout-seconds`: Data load timeout for the Hot Restart process. All members in the cluster should finish restoring their local data before this timeout.
- `cluster-data-recovery-policy`: Specifies the data recovery policy that will be respected during Hot Restart cluster start. Valid values are;
    * `FULL_RECOVERY_ONLY`: Starts the cluster only when all expected members are present and correct. Otherwise, it fails. This is the default value.
    * `PARTIAL_RECOVERY_MOST_RECENT`: Starts the cluster with the members which have most up-to-date partition table and successfully restored their data. All other members will leave the cluster and force start themselves. If no member restores its data successfully, cluster start fails.	     
    * `PARTIAL_RECOVERY_MOST_COMPLETE`: Starts the cluster with the largest group of members which have the same partition table version and successfully restored their data. All other members will leave the cluster and force start themselves. If no member restores its data successfully, cluster start fails.
- `hot-restart`: The configuration that enables or disables the Hot Restart feature per data structure. This element is used for the supported data structures (in the above examples, you can see that it is included in `map` and `cache`). Turning on `fsync` guarantees that data is persisted to the disk device when a write operation returns successful response to the caller. By default, `fsync` is turned off. That means data will be persisted to the disk device eventually, instead of on every disk write. This generally provides better performance.

#### Hot Restart Configuration Examples

The following are example configurations for a Hazelcast map and JCache implementation.

**Declarative Configuration**:

An example configuration is shown below.

```xml
<hazelcast>
   ...
   <hot-restart-persistence enabled="true">
	   <base-dir>/mnt/hot-restart</base-dir>
	   <parallelism>1</parallelism>
	   <validation-timeout-seconds>120</validation-timeout-seconds>
	   <data-load-timeout-seconds>900</data-load-timeout-seconds>
	   <cluster-data-recovery-policy>FULL_RECOVERY_ONLY</cluster-data-recovery-policy>
   </hot-restart-persistence>
   ...
   <map>
	   <hot-restart enabled="true">
		   <fsync>false</fsync>
	   </hot-restart>
   </map>
   ...
   <cache>
	   <hot-restart enabled="true">
		   <fsync>false</fsync>
	   </hot-restart>
   </cache>
   ...
</hazelcast>
```


**Programmatic Configuration**:

The programmatic equivalent of the above declarative configuration is shown below.

```java
HotRestartPersistenceConfig hotRestartPersistenceConfig = new HotRestartPersistenceConfig();
hotRestartPersistenceConfig.setEnabled(true);
hotRestartPersistenceConfig.setBaseDir(new File("/mnt/hot-restart"));
hotRestartPersistenceConfig.setParallelism(1);
hotRestartPersistenceConfig.setValidationTimeoutSeconds(120);
hotRestartPersistenceConfig.setDataLoadTimeoutSeconds(900);
hotRestartPersistenceConfig.setClusterDataRecoveryPolicy(HotRestartClusterDataRecoveryPolicy.FULL_RECOVERY_ONLY);
config.setHotRestartPersistenceConfig(hotRestartPersistenceConfig);

...
MapConfig mapConfig = new MapConfig();
mapConfig.getHotRestartConfig().setEnabled(true);

...
CacheConfig cacheConfig = new CacheConfig();
cacheConfig.getHotRestartConfig().setEnabled(true);
```


### Moving/Copying Hot Restart Data

After Hazelcast member owning the Hot Restart data is shutdown, Hot Restart `base-dir` can be copied/moved to a different server (which may have different IP address and/or different number of CPU cores) and Hazelcast member can be restarted using the existing Hot Restart data on that new server. Having a new IP address does not affect Hot Restart, since it does not rely on the IP address of the server but instead uses `Member` UUID as a unique identifier.

This flexibility provides;
- ability to replace one or more faulty servers with new ones easily without touching remaining cluster
- ability to use Hot Restart on cloud environments easily. Sometimes cloud providers do not preserve IP addresses on restart or after shutdown. Also it is possible to startup whole cluster on a different set of machines.
- ability to copy production data to test environment, so that a more functional test cluster can bet setup  

Unfortunately having different number of CPU cores is not that straightforward. Hazelcast partition threads, by default, will use a heuristic from the number of cores e.g. `# of partition threads = # of CPU cores`. When Hazelcast member is started on a server with a different CPU core count, number of Hazelcast partition threads will change and that will make Hot Restart fail during startup. Solution is to explicitly set number of Hazelcast partition threads (`hazelcast.operation.thread.count` system property) and Hot Restart `parallelism` configuration and use the same parameters on the new server. For setting system properties see [System Properties section](#system-properties).

### Hot Restart Persistence Design Details

Hazelcast's Hot Restart Persistence uses the log-structured storage approach. The following is a top-level design description:

- The only kind of update operation on persistent data is _appending_.
- What is appended are facts about events that happened to the data model represented by the store; either a new value was assigned to a key or a key was removed.
- Each record associated with a key makes stale the previous record that was associated with that key.
- Stale records contribute to the amount of _garbage_ present in the persistent storage.
- Measures are taken to remove garbage from the storage.

This kind of design focuses almost all of the system's complexity into the garbage collection (GC) process, stripping down the client's operation to the bare necessity of guaranteeing persistent behavior: a simple file append operation. Consequently, the latency of operations is close to the theoretical minimum in almost all cases. Complications arise only during prolonged periods of maximum load; this is where the details of the GC process begin to matter.

### Concurrent, Incremental, Generational GC

In order to maintain the lowest possible footprint in the update operation latency, the following properties are built into the garbage collection process:

- A dedicated thread performs the GC. In Hazelcast terms, this thread is called the Collector and the application thread is called the Mutator.
<br></br>
- On each update there is metadata to be maintained; this is done asynchronously by the Collector thread. The Mutator enqueues update events to the Collector's work queue.
<br></br>
- The Collector keeps draining its work queue at all times, including the time it goes through the GC cycle. Updates are taken into account at each stage in the GC cycle, preventing the copying of already dead records into compacted files.
<br></br>
- All GC-induced I/O competes for the same resources as the Mutator's update operations. Therefore, measures are taken to minimize the impact of I/O done during GC:
  - data is never read from files, but from RAM;
  - a heuristic scheme is employed which minimizes the number of bytes written to disk for each kilobyte of reclaimed garbage;
  - measures are also taken to achieve a good interleaving of Collector and Mutator operations, minimizing latency outliers perceived by the Mutator.

#### I/O Minimization Scheme

The success of this scheme is subject to a bet on the Weak Generational Garbage Hypothesis, which states that a new record entering the system is likely to become garbage soon. In other words, a key updated now is more likely than average to be updated again soon.

The scheme was taken from the seminal Sprite LFS paper, [Rosenblum, Ousterhout, _The Design and Implementation of a Log-Structured File System_](http://www.cs.berkeley.edu/~brewer/cs262/LFS.pdf). The following is an outline of the paper:

- Data is not written to one huge file, but to many files of moderate size (8 MB) called "chunks".
- Garbage is collected incrementally, i.e. by choosing several chunks, then copying all their live data to new chunks, then deleting the old ones.
- I/O is minimized using a collection technique which results in a bimodal distribution of chunks with respect to their garbage content: most files are either almost all live data or they are all garbage.
- The technique consists of two main principles:
    1. Chunks are selected based on their _Cost-Benefit factor_ (see below).
    2. Records are sorted by age before copying to new chunks.

#### Cost-Benefit Factor

The Cost-Benefit factor of a chunk consists of two components multiplied together:

1. The ratio of benefit (amount of garbage that can be collected) to I/O cost (amount of live data to be written).
2. The age of the data in the chunk, measured as the age of the youngest record it contains.

The essence is in the second component: given equal amount of garbage in all chunks, it will make the young ones less attractive to the Collector. Assuming the generational garbage hypothesis, this will allow the young chunks to quickly accumulate more garbage. On the flip side, it will also ensure that even files with little garbage are eventually garbage collected. This removes garbage which would otherwise linger on, thinly spread across many chunk files.

Sorting records by age will group young records together in a single chunk and will do the same for older records. Therefore the chunks will either tend to keep their data live for a longer time, or quickly become full of garbage.

### Hot Restart Performance Considerations

In this section you can find performance test summaries which are results of benchmark tests performed with a single Hazelcast member running on a physical server and on AWS R3. 

#### Performance on a Physical Server

The member has the following:

- An IMap data structure with High-Density Memory Store. 
- Its data size is changed for each test, started from 10 GB to 500 GB (each map entry has a value of 1 KB). 

The tests investigate the write and read performance of Hot Restart Persistence and are performed on HP ProLiant servers with RHEL 7 operating system using Hazelcast Simulator. 

The following are the specifications of the server hardware used for the test:

* CPU: 2x Intel(R) Xeon(R) CPU E5-2687W v3 @ 3.10GHz – with 10 cores per processor. Total 20 cores, 40 with hyper threading enabled.
* Memory: 768GB 2133 MHz memory 24x HP 32GB 4Rx4 PC4-2133P-L Kit

The following are the storage media used for the test:

* A hot-pluggable 2.5 inch HDD with 1 TB capacity and 10K RPM.
* An SSD, Light Endurance PCle Workload Accelerator.

The below table shows the test results.

![image](images/HotRestartPerf.png)


#### Performance on AWS R3

The member has the following:

- An IMap data structure with High-Density Memory Store. 
- IMap has 40 million distinct keys, each map entry is 1 KB. 
- High-Density Memory Store is 59 GiB whose 19% is metadata. 
- Hot Restart is configured with `fsync` turned off. 
- Data size reloaded on restart is 38 GB.

The tests investigate the write and read performance of Hot Restart Persistence and are performed on R3.2xlarge and R3.4xlarge EC2 instances using Hazelcast Simulator.

The following are the AWS storage types used for the test:

- Elastic Block Storage (EBS) General Purpose SSD (GP2).
- Elastic Block Storage with Provisioned IOPS (IO1). Provisioned 10,000 IOPS on a 340 GiB volume, enabled EBS-optimized on instance.
- SSD-backed instance store.

The below table shows the test results.

![image](images/HotRestartPerf2.png)

### Hot Backup

During hot restart operations you can take a snapshot of the hot restart store at a certain point in time. This is useful when you wish to bring up a new cluster with the same data or parts of the data. The new cluster can then be used to share load with the original cluster, to perform testing, QA or reproduce an issue on production data. 

Simple file copying of a currently running does not suffice and can produce inconsistent snapshots with problems such as resurrection of deleted values or missing values.

To create snapshots you must first configure the hot restart backup directory. You can configure the directory programmatically or declaratively. 

#### Hot backup configuration elements

- `backup-dir`: This element is included in the `hot-restart-persistence` and denotes the destination under which backups will be stored. If this element is not defined, hot backup will be disabled. If a directory is defined which does not exist, it will be created on first backup. To avoid clashing data on multiple backups, each backup has a unique sequence ID which determines the name of the directory which will contain all hot restart data. This unique directory is created as a subdirectory of the configured `backup-dir`.

#### Hot backup configuration examples

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

### Using Hot backup

Once configured, you can initiate a new backup via API or from the management center. The backup is started transactionally and cluster-wide. This means that either all members will start the same backup or none will. The member which receives the backup request will determine a new backup sequence ID and send that information to all members. If all members respond that no other backup is currently in progress and that no other backup request has already been made then the coordinating node will command nodes to start the actual backup process. This will create a directory under the configured `backup-dir` with the name `backup-<backupSeq>` and start copying the data from the original store.

The backup process is initiated nearly instantaneously on all nodes. Note that since there is no limitation as to when the backup process is initiated. This means that it can happen that the backup process is initiated during membership changes, partition table changes or during normal data update. Some of these operations may not be completed fully yet which means that some nodes will backup some data while some nodes will backup a previous version of the same data. This will usually be solved by the anti-entropy mechanism on the new cluster which will reconcile different versions of the same data. Please check the [Achieving high consistency of backup data section](#achieving-high-consistency-of-backup-data) for more information on achieving high consistency of data.

The duration of the backup process and the disk data usage drastically depends on what is supported by the system and the configuration. Please check the [Achieving high performance of backup process section](#achieving-high-performance-of-backup-process) for more information on achieving better resource usage of the backup process.

Following is an example of how to trigger the hot backup via API : 

```java
HotRestartBackupService service = ...;
service.backup();
```

You can also define the backup sequence yourself :

```java
HotRestartBackupService service = ...;
long backupSeq = ...
service.backup(backupSeq);
```

Keep in mind that the backup will fail if any node contains a backup directory with the name `backup-<backupSeq>` given sequence.

### Achieving high consistency of backup data

The backup is initiated nearly simultaneously on all members but you can encounter some inconsistencies in the data. This is because some members might have and some might not have received updated values yet from executed operations, because the system could be undergoing partition and membership changes or because there are some transactions which have not yet been committed. 

To achieve a high consistency of data on all members, the cluster should be put to `PASSIVE` state for the duration of the call to the backup method. See the [Cluster Member States section](#cluster-member-states) on information on how to do this. The cluster does not need to be in `PASSIVE` state for the entire duration of the backup process, though. Because of the design, only partition metadata is copied synchronously during the invocation of the backup method. Once the backup method has returned all cluster metadata has been copied and the exact partition data which needs to be copied will have been marked. After that, the backup process continues asynchronously and you can return the cluster to the `ACTIVE` state and resume operations.

### Achieving high performance of backup process

Because of the design of the hot restart store, we can use hard links to achieve backups/snapshots of the store. The hot backup process will use hard links whenever possible because they provide big performance benefits and because the backups share disk usage. The performance benefit comes from the fact that hot restart file contents are not being duplicated (thus using disk and IO resources) but rather by creating a new file name for the same contents on disk (another pointer to the same inode). Since all backups and stores share the same inode, disk usage drops. The bigger the percentage of stable data in the hot restart store (data not undergoing changes), the more files will each backup share with the operational hot restart store and the less disk space it will be using. For the hot backup to use hard links, you must be running Hazelcast nodes on JDK 7 or higher and must satisfy all requirements for the <a href="https://docs.oracle.com/javase/7/docs/api/java/nio/file/Files.html#createLink(java.nio.file.Path,%20java.nio.file.Path)" target="_blank">`Files#createLink` method</a> to be supported. The backup process will initially attempt to create a new hard link and if that fails for any reason it will continue by copying the data. Subsequent backups will also attempt to use hard links.

### Backup process progress and completion

Only cluster and distributed object metadata is copied synchronously during the invocation of the backup method. The rest of the hot restart store containing partition data will be copied asynchronously after the method call has ended. You can track the progress by API or view it from the management center. 

An example of how to track the progress via API : 
```java
HotRestartBackupService service = ...;
HotRestartStateImpl status = service.getBackupTaskStatus();
...
```

The returned object contains local member backup status :
- the backup state (NOT_STARTED, IN_PROGRESS, FAILURE, SUCCESS)
- the completed count
- the total count
The completed and total count can provide you a way to track the percentage of the copied data. Currently the count defines the number of copied and total local member hot restart stores (defined by `HotRestartPersistenceConfig#setParallelism`) but this can change at a later point to provide greater resolution.

Besides tracking the hot restart status by API, you can view the status in the management center and you can inspect the on-disk files for each member. Each member creates a `inprogress` file which is created in each of the copied hot restart stores. This means that the backup is currently in progress. As the backup task completes the backup operation the file will be removed. If an error occurrs during the backup task, the `inprogress` file will be renamed to `failure` and it will contain a stack trace of the exception.

### Backup task interruption and cancellation

Once the backup method call has returned and asynchronous copying of the partition data has started, the backup task can be interrupted. This is helpful in situations where the backup task has started at an inconvenient time. For instance, the backup task could be automatized and it could be accidentally triggered during high load on the Hazelcast instances, causing the performance of the Hazelcast instances to drop. The backup task mainly uses disk IO, consumes little CPU and it generally does not last for a long time (although you should test it with your environment to determine the exact impact). Nevertheless, you can abort the backup tasks on all nodes via a cluster-wide interrupt operation. This operation can be triggered programmatically or from the management center. 

An example of programmatic interruption : 
```java
HotRestartBackupService service = ...;
service.interruptBackupTask();
...
```

This method will send an interrupt to all members. The interrupt is ignored if the backup task is currently not in progress so you can safely call this method even though it has previously been called or when some members have already completed their local backup tasks.

You can also interrupt the local member backup task :
```java
HotRestartBackupService service = ...;
service.interruptLocalBackupTask();
...
```

The backup task will stop as soon as possible and it will not remove the disk contents of the backup directory meaning that you must remove it manually.