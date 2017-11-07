
Unless you delete the map entries manually or use an eviction policy, they will remain in the map. Hazelcast supports policy-based eviction for distributed maps. Currently supported policies are LRU (Least Recently Used) and LFU (Least Frequently Used).

#### Understanding Map Eviction

Hazelcast Map performs eviction based on partitions. For example, when you specify a size using the `PER_NODE` attribute for `max-size` (please see [Configuring Map Eviction](#configuring-map-eviction)), Hazelcast internally calculates the maximum size for every partition. Hazelcast uses the following equation to calculate the maximum size of a partition:

```
partition maximum size = max-size * member-count / partition-count
```

The eviction process starts according to this calculated partition maximum size when you try to put an entry. When entry count in that partition exceeds partition maximum size, eviction starts on that partition.

Assume that you have the following figures as examples:

* Partition count: 200
* Entry count for each partition: 100
* `max-size` (PER_NODE): 20000

The total number of entries here is 20000 (partition count * entry count for each partition). This means you are at the eviction threshold since you set the `max-size` to 20000. When you try to put an entry

1. the entry goes to the relevant partition;
2. the partition checks whether the eviction threshold is reached (`max-size`);
3. only one entry will be evicted.

As a result of this eviction process, when you check the size of your map, it is 19999. After this eviction, subsequent put operations will not trigger the next eviction until the map size is again close to the `max-size`.

![image](../../images/NoteSmall.jpg) ***NOTE:*** *The above scenario is simply an example that describes how the eviction process works. Hazelcast finds the most optimum number of entries to be evicted according to your cluster size and selected policy.*


#### Configuring Map Eviction

The following is an example declarative configuration for map eviction.

```xml
<hazelcast>
  <map name="default">
    ...
    <time-to-live-seconds>0</time-to-live-seconds>
    <max-idle-seconds>0</max-idle-seconds>
    <eviction-policy>LRU</eviction-policy>
    <max-size policy="PER_NODE">5000</max-size>
    ...
  </map>
</hazelcast>
```

Let's describe each element:

- `time-to-live`. Maximum time in seconds for each entry to stay in the map. If it is not 0, entries that are older than this time and not updated for this time are evicted automatically. Valid values are integers between 0 and `Integer.MAX VALUE`. Default value is 0, which means infinite. If it is not 0, entries are evicted regardless of the set `eviction-policy`.
- `max-idle-seconds`. Maximum time in seconds for each entry to stay idle in the map. Entries that are idle for more than this time are evicted automatically. An entry is idle if no `get`, `put`, `EntryProcessor.process` or `containsKey` is called. Valid values are integers between 0 and `Integer.MAX VALUE`. Default value is 0, which means infinite.
- `eviction-policy`. Valid values are described below.
	- NONE: Default policy. If set, no items will be evicted and the property `max-size` will be ignored. You still can combine it with `time-to-live-seconds` and `max-idle-seconds`.
	- LRU: Least Recently Used.
	- LFU: Least Frequently Used.

- `max-size`. Maximum size of the map. When maximum size is reached, the map is evicted based on the policy defined. Valid values are integers between 0 and `Integer.MAX VALUE`. Default value is 0. If you want `max-size` to work, set the `eviction-policy` property to a value other than NONE. Its attributes are described below.
	- `PER_NODE`. Maximum number of map entries in each cluster member. This is the default policy. If you use this option, please note that you cannot set the `max-size` to a value lower than the partition count (which is 271 by default).		

		`<max-size policy="PER_NODE">5000</max-size>`

	- `PER_PARTITION`. Maximum number of map entries within each partition. Storage size depends on the partition count in a cluster member. This attribute should not be used often. For instance, avoid using this attribute with a small cluster. If the cluster is small, it will be hosting more partitions, and therefore map entries, than that of a larger cluster. Thus, for a small cluster, eviction of the entries will decrease performance (the number of entries is large).

		`<max-size policy="PER_PARTITION">27100</max-size>`

	- `USED_HEAP_SIZE`. Maximum used heap size in megabytes per map for each Hazelcast instance. Please note that this policy does not work when [in-memory format](03_Setting_In_Memory_Format.md) is set to `OBJECT`, since the memory footprint cannot be determined when data is put as `OBJECT`.

		`<max-size policy="USED_HEAP_SIZE">4096</max-size>`

	- `USED_HEAP_PERCENTAGE`. Maximum used heap size percentage per map for each Hazelcast instance. If, for example, a JVM is configured to have 1000 MB and this value is 10, then the map entries will be evicted when used heap size exceeds 100 MB. Please note that this policy does not work when [in-memory format](03_Setting_In_Memory_Format.md) is set to `OBJECT`, since the memory footprint cannot be determined when data is put as `OBJECT`.

		`<max-size policy="USED_HEAP_PERCENTAGE">10</max-size>`

	- `FREE_HEAP_SIZE`. Minimum free heap size in megabytes for each JVM.

		`<max-size policy="FREE_HEAP_SIZE">512</max-size>`

	- `FREE_HEAP_PERCENTAGE`. Minimum free heap size percentage for each JVM. If, for example, a JVM is configured to have 1000 MB and this value is 10, then the map entries will be evicted when free heap size is below 100 MB.

		`<max-size policy="FREE_HEAP_PERCENTAGE">10</max-size>`

	- `USED_NATIVE_MEMORY_SIZE`. (<font color="##153F75">**Hazelcast IMDG Enterprise HD**</font>) Maximum used native memory size in megabytes per map for each Hazelcast instance.

		`<max-size policy="USED_NATIVE_MEMORY_SIZE">1024</max-size>`

	- `USED_NATIVE_MEMORY_PERCENTAGE`. (<font color="##153F75">**Hazelcast IMDG Enterprise HD**</font>) Maximum used native memory size percentage per map for each Hazelcast instance.

		`<max-size policy="USED_NATIVE_MEMORY_PERCENTAGE">65</max-size>`

	- `FREE_NATIVE_MEMORY_SIZE`. (<font color="##153F75">**Hazelcast IMDG Enterprise HD**</font>) Minimum free native memory size in megabytes for each Hazelcast instance.

		`<max-size policy="FREE_NATIVE_MEMORY_SIZE">256</max-size>`

	- `FREE_NATIVE_MEMORY_PERCENTAGE`. (<font color="##153F75">**Hazelcast IMDG Enterprise HD**</font>) Minimum free native memory size percentage for each Hazelcast instance.

		`<max-size policy="FREE_NATIVE_MEMORY_PERCENTAGE">5</max-size>`



![image](../../images/NoteSmall.jpg) ***NOTE:*** *As of Hazelcast 3.7, the elements `eviction-percentage` and `min-eviction-check-millis` are deprecated. They will be ignored if configured since map eviction is based on the sampling of entries. Please see the [Eviction Algorithm section](/11_Hazelcast_JCache/05_Hazelcast_JCache_Extension-ICache/06_JCache_Eviction.md) for details.*


#### Example Eviction Configurations


```xml
<map name="documents">
  <max-size policy="PER_NODE">10000</max-size>
  <eviction-policy>LRU</eviction-policy>
  <max-idle-seconds>60</max-idle-seconds>
</map>
```

In the above example, `documents` map starts to evict its entries from a member when the map size exceeds 10000 in that member. Then the entries least recently used will be evicted. The entries not used for more than 60 seconds will be evicted as well.

And the following is an example eviction configuration for a map having `NATIVE` as the in-memory format:

```xml
<map name="nativeMap*">
    <in-memory-format>NATIVE</in-memory-format>
    <eviction-policy>LFU</eviction-policy>
    <max-size policy="USED_NATIVE_MEMORY_PERCENTAGE">99</max-size>
</map>
```


#### Evicting Specific Entries


The eviction policies and configurations explained above apply to all the entries of a map. The entries that meet the specified eviction conditions are evicted.


You may also want to evict some specific map entries.  To do this, you can use the `ttl` and `timeunit` parameters of the method `map.put()`. An example code line is given below.

`myMap.put( "1", "John", 50, TimeUnit.SECONDS )`

The map entry with the key "1" will be evicted 50 seconds after it is put into `myMap`.


#### Evicting All Entries

To evict all keys from the map except the locked ones, use the method `evictAll()`. If a MapStore is defined for the map, `deleteAll` is not called by `evictAll`. If you want to call the method `deleteAll`, use `clear()`.

An example is given below.

```java
public class EvictAll {

    public static void main(String[] args) {
        final int numberOfKeysToLock = 4;
        final int numberOfEntriesToAdd = 1000;

        HazelcastInstance node1 = Hazelcast.newHazelcastInstance();
        HazelcastInstance node2 = Hazelcast.newHazelcastInstance();

        IMap<Integer, Integer> map = node1.getMap(EvictAll.class.getCanonicalName());
        for (int i = 0; i < numberOfEntriesToAdd; i++) {
            map.put(i, i);
        }

        for (int i = 0; i < numberOfKeysToLock; i++) {
            map.lock(i);
        }

        // should keep locked keys and evict all others.
        map.evictAll();

        System.out.printf("# After calling evictAll...\n");
        System.out.printf("# Expected map size\t: %d\n", numberOfKeysToLock);
        System.out.printf("# Actual map size\t: %d\n", map.size());

    }
}
```

![image](../../images/NoteSmall.jpg) ***NOTE:*** *Only EVICT_ALL event is fired for any registered listeners.*

#### Forced Eviction

<font color="#3981DB">**Hazelcast IMDG Enterprise**</font>
<br></br>

Hazelcast may use forced eviction in the cases when the eviction explained in [Understanding Map Eviction](#understanding-map-eviction) is not enough to free up your memory. Note that this is valid if you are using <font color="#3981DB">**Hazelcast IMDG Enterprise**</font> and you set your in-memory format to `NATIVE`.

Forced eviction mechanism is explained below as steps in the given order:

* When the normal eviction is not enough, forced eviction is triggered and first it tries to evict approx. 20% of the entries from the current partition. It retries this five times.
* If the result of above step is still not enough, forced eviction applies the above step to all maps. This time it might perform eviction from some other partitions too,provided that they are owned by the same thread.
* If that is still not enough to free up your memory, it evicts not the 20% but all the entries from the current partition.
* if that is not enough, it will evict all the entries from the other data structures; from the partitions owned by the local thread.

Finally, when all the above steps are not enough, Hazelcast throws a  Native Out of Memory Exception.


#### Custom Eviction Policy

![image](../../images/NoteSmall.jpg) ***NOTE:*** *This section is valid for Hazelcast 3.7 and higher releases.*


Apart from the policies such as LRU and LFU, which Hazelcast provides out-of-the-box, you can develop and use your own eviction policy. 

To achieve this, you need to provide an implementation of `MapEvictionPolicy` as in the following `OddEvictor` example:

```java
public class MapCustomEvictionPolicy {

    public static void main(String[] args) {
        Config config = new Config();
        config.getMapConfig("test")
                .setMapEvictionPolicy(new OddEvictor())
                .getMaxSizeConfig()
                .setMaxSizePolicy(PER_NODE).setSize(10000);

        HazelcastInstance instance = Hazelcast.newHazelcastInstance(config);
        IMap<Integer, Integer> map = instance.getMap("test");

        final Queue<Integer> oddKeys = new ConcurrentLinkedQueue<Integer>();
        final Queue<Integer> evenKeys = new ConcurrentLinkedQueue<Integer>();

        map.addEntryListener(new EntryEvictedListener<Integer, Integer>() {
            @Override
            public void entryEvicted(EntryEvent<Integer, Integer> event) {
                Integer key = event.getKey();
                if (key % 2 == 0) {
                    evenKeys.add(key);
                } else {
                    oddKeys.add(key);
                }
            }
        }, false);

        // Wait some more time to receive evicted events.
        parkNanos(SECONDS.toNanos(5));

        for (int i = 0; i < 15000; i++) {
            map.put(i, i);
        }

        String msg = "IMap uses sampling based eviction. After eviction is completed, we are expecting " +
                "number of evicted-odd-keys should be greater than number of evicted-even-keys" +
                "\nNumber of evicted-odd-keys = %d, number of evicted-even-keys = %d";
        out.println(format(msg, oddKeys.size(), evenKeys.size()));

        instance.shutdown();
    }

    /**
     * Odd evictor tries to evict odd keys first.
     */
    private static class OddEvictor extends MapEvictionPolicy {

        @Override
        public int compare(EntryView o1, EntryView o2) {
            Integer key = (Integer) o1.getKey();
            if (key % 2 != 0) {
                return -1;
            }

            return 1;
        }
    }
}
```

Then you can enable your policy by setting it via the method `MapConfig#setMapEvictionPolicy`
programmatically or via XML declaratively. Following is the example declarative configuration for the eviction policy `OddEvictor` implemented above:

```xml
<map name="test">
   ...
   <map-eviction-policy-class-name>com.package.OddEvictor</map-eviction-policy-class-name>
   ....
</map>
```

If you Hazelcast with Spring, you can enable your policy as shown below.

```
<hz:map name="test">
    <hz:map-eviction-policy class-name="com.package.OddEvictor"/>
</hz:map>
```

![image](../../images/NoteSmall.jpg) ***NOTE:*** *Starting with Hazelcast 3.7, Hazelcast Map uses a new eviction mechanism which is based on the sampling of entries. Please see the [Eviction Algorithm section](/11_Hazelcast_JCache/05_Hazelcast_JCache_Extension-ICache/06_JCache_Eviction.md) for details.*
