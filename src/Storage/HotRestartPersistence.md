## Hot Restart Persistence

<font color="##153F75">**Hazelcast Enterprise HD**</font>
<br></br>




This chapter explains the Hazelcast's Hot Restart Persistence feature, introduced with Hazelcast 3.6. Hot Restart Persistence provides fast cluster restarts by storing the states of the cluster members on the disk. This feature is currently provided for the Hazelcast map data structure and the Hazelcast JCache implementation.

### Hot Restart Persistence Overview

Hot Restart Persistence enables you to get your cluster up and running swiftly after a cluster restart. A restart can be caused by a planned shutdown (including rolling upgrades) or a sudden cluster-wide crash (e.g. power outage). For Hot Restart Persistence, required states for Hazelcast clusters and members are introduced. Please refer to the [Managing Cluster and Member States section](#managing-cluster-and-member-states) for information on the cluster and member states.

#### Hot Restart Types

The Hot Restart feature is supported for the following restart types:

- **Restart after a planned shutdown**:
	- The cluster is shutdown completely and restarted with the exact same previous setup and data.

		You can shutdown the cluster completely using the method `HazelcastInstance.getCluster().shutdown()` or you can manually change the cluster state to `PASSIVE` and then shut down each member one by one. When you send the command to shut the cluster down, i.e. `HazelcastInstance.getCluster().shutdown()`, the members that are not in the `PASSIVE` state change their states to `PASSIVE`. Then, each member shuts itself down by calling the method `HazelcastInstance.shutdown()`.

	- Rolling upgrade: The cluster is restarted intentionally member by member. For example, this could be done to install an operating system patch or new hardware.

		To be able to shutdown the cluster member by member as part of a planned restart, each member in the cluster should be in the `FROZEN` or `PASSIVE` state. After the cluster state is changed to `FROZEN` or `PASSIVE`, you can manually shutdown each member by calling the method `HazelcastInstance.shutdown()`. When that member is restarted, it will rejoin the running cluster. After all members are restarted, the cluster state can be changed back to `ACTIVE`.

- **Restart after a cluster crash**: The cluster is restarted after all its members crashed at the same time due to a power outage, networking interruptions, etc.

#### The Restart Process

During the restart process, each member waits to load data until all the members in the partition table are started. During this process, no operations are allowed. Once all cluster members are started, Hazelcast changes the cluster state to `PASSIVE` and starts to load data. When all data is loaded, Hazelcast changes the cluster state to its previous known state before shutdown and starts to accept the operations which are allowed by the restored cluster state.

If a member fails to either start, join the cluster in time (within the timeout), or load its data, then that member will be terminated immediately. After the problems causing the failure are fixed, that member can be restarted. If the cluster start cannot be completed in time, then all members will fail to start. Please refer to the [Configuring Hot Restart section](#configuring-hot-restart) for defining timeouts.

In the case of a restart after a cluster crash, the Hot Restart feature realizes that it was not a clean shutdown and Hazelcast tries to restart the cluster with the last saved data following the process explained above. In some cases, specifically when the cluster crashes while it has an ongoing partition migration process, currently it is not possible to restore the last saved state.

#### Force Start

A member can crash permanently and then be unable to recover from the failure. In that case, restart process cannot be completed since some of the members do not start or fail to load their own data. In that case, you can force the cluster to clean its persisted data and make a fresh start. This process is called **force start**. 
   
You can trigger the force start process using the Management Center, REST API and cluster management scripts. Force start process is managed by the master member. Therefore, you should trigger the force start on master member.

Please refer to the [Hot Restart functionality](#hot-restart) of the Management Center section to learn how you can perform a force start using the Management Center.

### Configuring Hot Restart

You can configure Hot Restart programmatically or declaratively. The configuration includes elements to enable/disable the feature, to specify the directory where the Hot Restart data will be stored, and to define timeout values.

#### Hot Restart Configuration Elements

The following are the descriptions of the Hot Restart configuration elements.

- `hot-restart-persistence`: The configuration that enables the Hot Restart feature. It includes the element `base-dir` that is used to specify the directory where the Hot Restart data will be stored. The default value for `base-dir` is `hot-restart`. You can use the default value, or you can specify the value of another folder containing the Hot Restart configuration, but it is mandatory that this `hot-restart` element has a value. This directory will be created automatically if it does not exist.
- `validation-timeout-seconds`: Validation timeout for the Hot Restart process when validating the cluster members expected to join and the partition table on the whole cluster.
- `data-load-timeout-seconds`: Data load timeout for the Hot Restart process. All members in the cluster should finish restoring their local data before this timeout.
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
	   <validation-timeout-seconds>120</validation-timeout-seconds>
	   <data-load-timeout-seconds>900</data-load-timeout-seconds>
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
hotRestartPersistenceConfig.setValidationTimeoutSeconds(120);
hotRestartPersistenceConfig.setDataLoadTimeoutSeconds(900);
config.setHotRestartPersistenceConfig(hotRestartPersistenceConfig);

...
MapConfig mapConfig = new MapConfig();
mapConfig.getHotRestartConfig().setEnabled(true);

...
CacheConfig cacheConfig = new CacheConfig();
cacheConfig.getHotRestartConfig().setEnabled(true);
```


### Hot Restart and IP Address-Port

Hazelcast relies on the IP address-port pair as a unique identifier for a cluster member. The member must restart with these address-port settings the same as before shutdown. Otherwise, Hot Restart fails.

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

In this section you can find a performance test summary which is a result of benchmark tests performed on a single Hazelcast member running on a physical server. This member has an IMap data structure with High-Density Memory Store. Its data size is changed for each test, started from 10 GB to 500 GB (each map entry has a value of 1 KB). The tests investigate the write and read performance of Hot Restart Persistence.

Tests are performed on HP ProLiant servers with RHEL 7 operating system using Hazelcast Simulator. 

The following are the spefications of the server hardware used for the test:

* CPU: 2x Intel(R) Xeon(R) CPU E5-2687W v3 @ 3.10GHz – with 10 cores per processor. Total 20 cores, 40 with hyper threading enabled.
* Memory: 768GB 2133 MHz memory 24x HP 32GB 4Rx4 PC4-2133P-L Kit

The following are the storage media used for the test:

* A hot-pluggable 2.5 inch HDD with 1 TB capacity and 10K RPM.
* An SSD, Light Endurance PCle Workload Accelerator.

The below table shows the test results.

![image](images/HotRestartPerf.png) 




