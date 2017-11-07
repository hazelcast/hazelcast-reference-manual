
You can configure Hot Restart programmatically or declaratively. The configuration includes elements to enable/disable the feature, to specify the directory where the Hot Restart data will be stored, and to define timeout values.

The following are the descriptions of the Hot Restart configuration elements.

- `hot-restart-persistence`: The configuration that enables the Hot Restart feature. It includes the element `base-dir` that is used to specify the directory where the Hot Restart data will be stored. The default value for `base-dir` is `hot-restart`. You can use the default value, or you can specify the value of another folder containing the Hot Restart configuration, but it is mandatory that this `hot-restart` element has a value. This directory will be created automatically if it does not exist.
A single `base-dir` can be used only and only by a single Hazelcast member, it cannot be shared by multiple members. An attempt to use the same `base-dir` by multiple members will make these members abort the startup process except one which wins the ownership of the directory.
- `parallelism`: Level of parallelism in Hot Restart Persistence. There will be this many IO threads, each writing in parallel to its own files. During the Hot Restart procedure, this many IO threads will be reading the files and this many rebuilder threads will be rebuilding the Hot Restart metadata. The default value for this property is 1. This is a good default in most but not all cases. You should measure the raw IO throughput of your infrastructure and test with different values of parallelism. In some cases such as dedicated hardware higher parallelism can yield more throughput of Hot Restart. In other cases such as running on EC2, it can yield diminishing returns - more thread scheduling, more contention on IO and less efficient garbage collection.
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
