## Split-Brain Recovery

Hazelcast deploys a background task that periodically searches for split clusters. When a split is detected, the side that will going to initiate the merge process is decided. This decision is based on the cluster size; the smaller cluster will merge into the bigger one. If they have an equal number of members, then a hashing algorithm determines the merging cluster. When deciding the merging side, both sides ensure that there's no intersection in their member lists.

After the merging side is decided, the master member (the eldest one) of the merging cluster initiates the cluster merge process by sending merge instructions to the members in its cluster.

While recovering from partitioning, Hazelcast uses merge policies for supported data structures to resolve data conflicts between split clusters. A merge policy is a callback function to resolve conflicts between the existing and merging data. Hazelcast provides an interface to be implemented and also a couple of out-of-the-box policies. Data structures without split-brain support discard the data from merging side.

Each member of the merging cluster will do the following:

- Close all of its network connections (detach from its cluster).
- Take a snapshot of local data structures which support split-brain recovery.
- Discard all data structure data.
- Join to the new cluster as lite member.
- Send merge operations to the new cluster from local snapshots.

For more information, please see the [Consistency and Replication Model chapter](#consistency-and-replication-model).

### Merge Policies

Since Hazelcast 3.10 all merge policies are implementing the unified interface `com.hazelcast.spi.SplitBrainMergePolicy`. We provide the following out-of-the-box implementations:

- `DiscardMergePolicy`: the entry from the smaller cluster will be discarded
- `ExpirationTimeMergePolicy`: the entry with the higher expiration time wins
- `HigherHitsMergePolicy`: the entry with the higher number of hits wins
- `HyperLogLogMergePolicy`: specialized merge policy for the `CardinalityEstimator`, which uses the default merge algorithm from HyperLogLog research, keeping the max register value of the two given instances
- `LatestAccessMergePolicy`: the entry with the latest access wins
- `LatestUpdateMergePolicy`: the entry with the latest update wins
- `PassThroughMergePolicy`: the entry from the smaller cluster wins
- `PutIfAbsentMergePolicy`: the entry from the smaller cluster wins if it doesn't exist in the cluster

Additionally you can develop a custom merge policy by implementing the `SplitBrainMergePolicy` interface.

### Supported Data Structures

Since Hazelcast 3.10 most of the data structures support split-brain recovery:

- `IMap` (including HD memory)
- `ICache` (including HD memory)
- `ReplicatedMap`
- `MultiMap`
- `IAtomicLong`
- `IAtomicReference`
- `IQueue`
- `IList`
- `ISet`
- `Ringbuffer`
- `CardinalityEstimator`
- `ScheduledExecutorService`

The statistic based out-of-the-box merge policies are just supported by `IMap`, `ICache`, `ReplicatedMap` and `MultiMap`. The `HyperLogLogMergePolicy` is just supported by the `CardinalityEstimator`.

Please have a look at `com.hazelcast.spi.merge.SplitBrainMergeTypes` for a complete overview of supported merge types of each data structure. There is a config validation which checks these constraints to provide fail-fast behavior for invalid configurations.

![image](images/NoteSmall.jpg) ***NOTE:*** *For the other data structures, e.g., `ISemaphore`, `ICountdownLatch` and `ILock`, the instance from the smaller cluster is discarded during the split-brain recovery.*

### Configuring Merge Policies

The merge policies are configured via a `MergePolicyConfig`, which can be set for all supported data structures. The only exception is `ICache`, which just accepts the merge policy classname (due to compatibility reasons with older Hazelcast clients). For `ICache` all other configurable merge parameters are the default values from `MergePolicyConfig`.

For your custom merge policy you should set the full class name of your implementation to the merge-policy configuration. For the out-of-the-box merge policies the simple classname is enough. 

#### Declarative Configuration

Here are examples how merge policies can be specified for various data structures:

```xml
<hazelcast>
  ...
  <map name="default">
    ...
    <merge-policy batch-size="100">LatestUpdateMergePolicy</merge-policy>
  </map>
  
  <replicatedmap name="default">
    ...
    <merge-policy batch-size="100">org.example.merge.MyMergePolicy</merge-policy>
  </replicatedmap>

  <multimap name="default">
    ...
    <merge-policy batch-size="50">HigherHitsMergePolicy</merge-policy>
  </multimap>

  <list name="default">
    ...
    <merge-policy batch-size="500">org.example.merge.MyMergePolicy</merge-policy>
  </list>
  
  <atomic-long name="default">
    ...
    <merge-policy>PutIfAbsentMergePolicy</merge-policy>
  </atomic-long>
</hazelcast>
```

Here is how merge policies are specified for `ICache` (it's the same configuration tag, but lacks the support for additional attributes like `batch-size`):

```xml
<hazelcast>
  ...
  <cache name="default">
    ...
    <merge-policy>org.example.merge.MyMergePolicy</merge-policy>        
  </cache>
</hazelcast>    
```

#### Programmatic Configuration

Here are examples how merge policies can be specified for various data structures:

```java
MergePolicyConfig mergePolicyConfig = new MergePolicyConfig()
  .setPolicy("org.example.merge.MyMergePolicy")
  .setBatchSize(100);

MapConfig mapConfig = new MapConfig("default")
  .setMergePolicyConfig(mergePolicyConfig);

ListConfig listConfig = new ListConfig("default")
  .setMergePolicyConfig(mergePolicyConfig);

Config config = new Config()
  .addMapConfig(mapConfig)
  .addListConfig(listConfig);
```

Here is how merge policies are specified for `ICache` (you can only set the merge policy classname):

```java
CacheConfig mapConfig = new CacheConfig()
  .setName("default")
  .setMergePolicy("org.example.merge.MyMergePolicy");

Config config = new Config()
  .addMapConfig(mapConfig);
```

### Custom Merge Policies

To implement a custom merge policy you have to implement `com.hazelcast.spi.SplitBrainMergePolicy`:

```java
public interface SplitBrainMergePolicy<V, T extends MergingValue<V>>
    extends DataSerializable {

  V merge(T mergingValue, T existingValue);
}
```

`MergingValue` is an interface which describes a merge type.

![image](images/NoteSmall.jpg) ***NOTE:*** *Please have in mind that `existingValue` can be `null`. This happens when a data structure or key-based entry was just created in the smaller cluster.*

#### Merge Types

A merge type defines an attribute which is required by a merge policy and provided by a data structure.

`MergingValue` is the base type, which is required by all merge policies and provided by all data structures. It contains the value of the merged data in raw and deserialized format:

```java
public interface MergingValue<V> {

  V getValue();

  <DV> DV getDeserializedValue();
}
```

The most common extension is `MergingEntry`, which additionally provides the key in raw and deserialized format (used by all key-based data structures like `IMap` or `ICache`):

```java
public interface MergingEntry<K, V> extends MergingValue<V> {

  K getKey();

  <DK> DK getDeserializedKey();
}
```

In addition we have a bunch of specialized merge types, e.g. for provided statistics. An example is `MergingHits`, which provides the hit counter of the merge data:

```java
public interface MergingHits<V> extends MergingValue<V> {

  long getHits();
}
```

The class `com.hazelcast.spi.merge.SplitBrainMergeTypes` contains composed interfaces, which show the provided merge types and required merge policy return type for each data structure:

```java
public interface ReplicatedMapMergeTypes extends MergingEntry<Object, Object>,
    MergingCreationTime<Object>, MergingHits<Object>, MergingLastAccessTime<Object>,
    MergingLastUpdateTime<Object>, MergingTTL<Object> {
}

public interface QueueMergeTypes extends MergingValue<Collection<Object>> {
}
```

The `ReplicatedMap` provides key/value merge data, with the creation time, access hits, last access time, last update time and TTL. The return type of the merge policy is `Object`.

The `IQueue` just provides a collection of values. The return type is also a `Collection<Object>`.

The following sections will show various examples how to implement this interface for all data structures, specific merge types or a specific data structure.

#### Accessing Deserialized Values

`MergingValue.getValue()` and `MergingEntry.getKey()` always return the data in the in-memory format of the data structure. For some data structure like `IMap` this depends on your configuration. Other data structure like `ISet` or `IList` always use the `BINARY` in-memory format. So it is very likely, that you will receive a `Data` instance as key or value from those methods.

If you need the deserialized key or value, you have to call `MergingValue.getDeserializedValue()` or `MergingEntry.getDeserializedKey()`. The deserialization is done lazily on that method call, since it's quite expensive and should be avoided if the result is not needed. This will also require the deserialized classes to be on the classpath of the server. Otherwise a `ClassNotFoundException` will be thrown.

This is an example which checks if the (deserialized) value of the `mergingValue` or `existingValue` is an `Integer`. If so it will be merged, otherwise `null` is returned (which will remove the entry):

```java
class MergeIntegerValuesMergePolicy<V, T extends MergingValue<V>>
    implements SplitBrainMergePolicy<V, T> {

  @Override
  public V merge(T mergingValue, T existingValue) {
    if (mergingValue.getDeserializedValue() instanceof Integer) {
      return mergingValue.getValue();
    }
    if (existingValue != null && existingValue.getDeserializedValue() instanceof Integer) {
      return existingValue.getValue();
    }
    return null;
  }

  @Override
  public void writeData(ObjectDataOutput out) {
  }

  @Override
  public void readData(ObjectDataInput in) {
  }
}
```

For data structures like `ISet` or `ICollection` you need a merge policy, which supports collections:

```java
class MergeCollectionOfIntegerValuesMergePolicy
    implements SplitBrainMergePolicy<Collection<Object>, MergingValue<Collection<Object>>> {

  @Override
  public Collection<Object> merge(MergingValue<Collection<Object>> mergingValue,
                                  MergingValue<Collection<Object>> existingValue) {
    Collection<Object> result = new ArrayList<Object>();
    addIntegersToCollection(mergingValue);
    if (result.isEmpty() && existingValue != null) {
      addIntegersToCollection(existingValue);
    }
    return result;
  }
  
  private void addIntegersToCollection(MergingValue<Collection<Object>> mergingValue,
                                       Collection<Object> result) {
    for (Object value : mergingValue.<Collection<Object>>getDeserializedValue()) {
      if (value instanceof Integer) {
        result.add(value);
      }
    }
  }
    
  @Override
  public void writeData(ObjectDataOutput out) {
  }
    
  @Override
  public void readData(ObjectDataInput in) {
  }
}
```

You can also combine both merge policies to support single values and collections. This merge policy is a bit more complex and less type safe, but can be configured on all data structures:

```java
class MergeIntegerValuesMergePolicy<V, T extends MergingValue<V>> implements SplitBrainMergePolicy<V, T> {

  @Override
  public V merge(T mergingValue, T existingValue) {
    if (mergingValue.getDeserializedValue() instanceof Integer) {
      return mergingValue.getValue();
    }
    if (existingValue != null && existingValue.getDeserializedValue() instanceof Integer) {
      return existingValue.getValue();
    }
    if (mergingValue.getValue() instanceof Collection) {
      Collection<Object> result = new ArrayList<Object>();
      addIntegersToCollection(mergingValue, result);
      if (result.isEmpty() && existingValue != null) {
        addIntegersToCollection(existingValue, result);
      }
      return (V) result;
    }
    return null;
  }

  private void addIntegersToCollection(T mergingValue, Collection<Object> result) {
    for (Object value : mergingValue.<Collection<Object>>getDeserializedValue()) {
      if (value instanceof Integer) {
        result.add(value);
      }
    }
  }

  @Override
  public void writeData(ObjectDataOutput out) {
  }

  @Override
  public void readData(ObjectDataInput in) {
  }
}
```

![image](images/NoteSmall.jpg) ***NOTE:*** *Please have in mind that `existingValue` can be `null`, so a `null` check is mandatory before calling `existingValue.getValue()` or `existingValue.getDeserializedValue()`.*

![image](images/NoteSmall.jpg) ***NOTE:*** *If you return `null` on a collection based data structure, the whole data structure will be removed. An empty collection works in the same way, so you don't have to check `Collection.isEmpty()` in your merge policy.*

#### Accessing Hazelcast UserContext

If you need access to external references in your merge policy, you can use the Hazelcast `UserContext` to get them injected. An example would be a database connection to check which value is stored in your database. To achieve this your merge policy needs to implement `HazelcastInstanceAware` and call `HazelcastInstance.getUserContext()`:

```java
class UserContextMergePolicy<V>
    implements SplitBrainMergePolicy<V, MergingValue<V>>, HazelcastInstanceAware { 

  private transient TruthProvider truthProvider;

  @Override
  public V merge(MergingValue<V> mergingValue, MergingValue<V> existingValue) {
    Object mergingUserValue = mergingValue.getDeserializedValue();
    Object existingUserValue = existingValue == null ? null : existingValue.getDeserializedValue();
    if (truthProvider.isMergeable(mergingUserValue, existingUserValue)) {
        return mergingValue.getValue();
    }
    return existingUserValue;
  }
  
  @Override
  public void writeData(ObjectDataOutput out) {
  }

  @Override
  public void readData(ObjectDataInput in) {
  }

  @Override
  public void setHazelcastInstance(HazelcastInstance hazelcastInstance) {
    ConcurrentMap<String, Object> userContext = hazelcastInstance.getUserContext();
    truthProvider = (TruthProvider) userContext.get(TruthProvider.TRUTH_PROVIDER_ID);
  }
}

interface TruthProvider {

  String TRUTH_PROVIDER_ID = "truthProvider";

  boolean isMergeable(Object mergingValue, Object existingValue);
}

class ExampleTruthProvider implements TruthProvider {

  @Override
  public boolean isMergeable(Object mergingValue, Object existingValue) {
    return mergingValue instanceof Integer && (Integer) mergingValue == 42;
  }
}
```

The `UserContext` can be setup like this:

```java
MergePolicyConfig mergePolicyConfig = new MergePolicyConfig()
  .setPolicy(UserContextMergePolicy.class.getName());

MapConfig mapConfig = new MapConfig("default")
  .setMergePolicyConfig(mergePolicyConfig);

ConcurrentMap<String, Object> userContext = new ConcurrentHashMap<String, Object>();
userContext.put(TruthProvider.TRUTH_PROVIDER_ID, new ExampleTruthProvider());

Config config = new Config()
  .addMapConfig(mapConfig)
  .setUserContext(userContext);
  
Hazelcast.newHazelcastInstance(config);
```

![image](images/NoteSmall.jpg) ***NOTE:*** *The merge operations are executed on the partition threads. Database accesses are slow compared to in-memory operations. The `SplitBrainMergePolicy.merge()` method will be called for every key-value pair or every collection from your smaller cluster, which has a merge policy defined. So there can be millions of database accesses due to a merge policy, which implements this. Be aware that this can block your cluster for a long time or overload your database due to the high amount of queries.*

*Also the `com.hazelcast.core.LifeCycleEvent.MERGED` will be thrown after a timeout (we don't wait forever for merge operations to continue). At the moment this timeout is 500 milliseconds per merged item or entry, but at least 5 seconds. If your database is slow, you might get the `LifeCycleEvent` while there are still merge operations in progress.*

#### Merge Policies With Multiple Merge Types

You can also write a merge policy, which requires multiple merge types. This merge policy is supported by all data structures, which provide `MergingHits` and `MergingCreationTime`:

```java
class ComposedHitsAndCreationTimeMergePolicy<V, T extends MergingHits<V> & MergingCreationTime<V>>
    implements SplitBrainMergePolicy<V, T> {

  @Override
  public V merge(T mergingValue, T existingValue) {
    if (existingValue == null) {
      return mergingValue.getValue();
    }
    // the merging value wins, if it's older and has more hits
    if (mergingValue.getCreationTime() < existingValue.getCreationTime()
          && mergingValue.getHits() > existingValue.getHits()) {
      return mergingValue.getValue();
    }
    return existingValue.getValue();
  }

  @Override
  public void writeData(ObjectDataOutput out) {
  }

  @Override
  public void readData(ObjectDataInput in) {
  }
}
```

If you configure this merge policy on a data structures, which does not provide these merge types, you will get an `InvalidConfigurationException` with a message like:

```text
The merge policy org.example.merge.ComposedHitsAndCreationTimeMergePolicy
can just be configured on data structures which provide the merging type
com.hazelcast.spi.merge.MergingHits.
See SplitBrainMergingTypes for supported merging types.
```

#### Merge Policies For Specific Data Structures

It's also possible to restrict a merge policy to a specific data structure. This merge policy will only work on `IMap`:

```java
class MapEntryCostsMergePolicy
    implements SplitBrainMergePolicy<Data, SplitBrainMergeTypes.MapMergeTypes> {

  @Override
  public Data merge(MapMergeTypes mergingValue, MapMergeTypes existingValue) {
    if (existingValue == null) {
      return mergingValue.getValue();
    }
    // the merging value wins, if it's costs are higher
    if (mergingValue.getCost() > existingValue.getCost()) {
      return mergingValue.getValue();
    }
    return existingValue.getValue();
  }

  @Override
  public void writeData(ObjectDataOutput out) {
  }

  @Override
  public void readData(ObjectDataInput in) {
  }
}
```

If you configure it on other data structures, you will get an `InvalidConfigurationException` with a message like:

```text
The merge policy org.example.merge.MapEntryCostsMergePolicy
can just be configured on data structures which provide the merging type
com.hazelcast.spi.merge.SplitBrainMergeTypes$MapMergeTypes.
See SplitBrainMergingTypes for supported merging types.
```

This is another example for a merge policy, which will only work on the `IAtomicReference` and uses a named type parameter `T`:

```java
class AtomicReferenceMergeIntegerValuesMergePolicy<T extends AtomicReferenceMergeTypes>
    implements SplitBrainMergePolicy<Object, T> {

  @Override
  public Object merge(T mergingValue, T existingValue) {
    if (mergingValue.getDeserializedValue() instanceof Integer) {
      return mergingValue.getValue();
    }
    if (existingValue != null && existingValue.getDeserializedValue() instanceof Integer) {
      return existingValue.getValue();
    }
    return null;
  }

  @Override
  public void writeData(ObjectDataOutput out) {
  }

  @Override
  public void readData(ObjectDataInput in) {
  }
}
```

Although every data structure supports `MergingValue`, which is the only merge type of `AtomicReferenceMergeTypes`, this merge policy is restricted to `IAtomicReference` data structures:

```text
The merge policy org.example.merge.AtomicReferenceMergeIntegerValuesMergePolicy
can just be configured on data structures which provide the merging type
com.hazelcast.spi.merge.SplitBrainMergeTypes$AtomicReferenceMergeTypes.
See SplitBrainMergingTypes for supported merging types.
```

#### Best Practices

Here are some best practices when implementing your own merge policy:

* Only call `MergingValue.getDeserializedValue()` and `MergingEntry.getDeserializedKey()` when you really need the deserialized value to save costs (CPU and memory) and avoid `ClassNotFoundException`.
* If you want to return one of the given values (merging or existing), it's best to return `mergingValue.getValue()` or `existingValue.getValue()`, since they are already in the correct in-memory format of the data structure. If you return a deserialized value, it might need to be serialized again, which are avoidable costs.
* Be careful with slow operations in the merge policy (like database accesses), since they will block your partition threads. Also the `LifeCycleEvent.MERGED` or `LifeCycleEvent.MERGE_FAILED` may be thrown too early, if the merge operations take too long to finish.
