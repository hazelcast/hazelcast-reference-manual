As described above, Hazelcast can be configured in a declarative or programmatic way; configuration must be completed before starting a Hazelcast member and this configuration cannot be altered at runtime, thus we refer to this as _static_ configuration. 

Starting with Hazelcast 3.9, it is possible to dynamically add certain configuration elements at runtime; these can be added by invoking one of the `Config.add*Config` methods on the `Config` object obtained from a running member's `HazelcastInstance.getConfig()` method. For example:
 
```
Config config = new Config():
MapConfig mapConfig = new MapConfig("sessions");
config.addMapConfig(mapConfig);

HazelcastInstance instance = Hazelcast.newHazelcastInstance(config);

// need to configure another map with no sync backups
MapConfig noBackupsMap = new MapConfig("dont-backup").setBackupCount(0);

// DO NOT DO THIS -- never modify the original Config object
// config.addMapConfig(noBackupsMap);

// Instead do this. The added config will be propagated to all members of the cluster
instance.getConfig().addMapConfig(noBackupsMap);
```

Dynamic configuration elements must be fully configured before the invocation of `add*Config` method: at that point, the configuration object will be delivered to every member of the cluster and added to each member's dynamic configuration, so mutating the configuration object after the `add*Config` invocation will have no effect.

Adding new dynamic configuration is supported for all `add*Config` methods except:

- `JobTracker` which has been deprecated since Hazelcast 3.8
- `QuorumConfig`: new quorum configuration cannot be dynamically added but other configuration can reference quorums configured in the existing static configuration
- `WanReplicationConfig`: new WAN replication configuration cannot be dynamically added, however existing static ones can be referenced from other configurations, e.g., a new dynamic `MapConfig` may include a `WanReplicationRef` to a statically configured WAN replication config.

### Handling Configuration Conflicts
 
Attempting to add a dynamic configuration, when a static configuration for the same element already exists, will throw `ConfigurationException`. For example, assuming we start a member with the following fragment in `hazelcast.xml` configuration:

```
  <map name="sessions">
     ...
  </map>
```

Then adding a dynamic configuration for a map with the name `sessions` will throw a `ConfigurationException`:

```
HazelcastInstance instance = Hazelcast.newHazelcastInstance();

MapConfig sessionsMapConfig = new MapConfig("sessions");

// this will throw ConfigurationException:
instance.getConfig().addMapConfig(sessionsMapConfig);
```

When attempting to add dynamic configuration for an element for which dynamic configuration has already been added, then if a configuration conflict is detected a `ConfigurationException` will be thrown. For example:

```
HazelcastInstance instance = Hazelcast.newHazelcastInstance();

MapConfig sessionsMapConfig = new MapConfig("sessions").setBackupCount(0);
instance.getConfig().addMapConfig(sessionsMapConfig);

MapConfig sessionsWithBackup = new MapConfig("sessions").setBackupCount(1);
// throws ConfigurationException because the new MapConfig conflicts with existing one
instance.getConfig().addMapConfig(sessionsWithBackup);

MapConfig sessionsWithoutBackup = new MapConfig("sessions").setBackupCount(0);
// does not throw exception: new dynamic config is equal to existing dynamic config of same name
instance.getConfig().addMapConfig(sessionsWithoutBackup);
```
