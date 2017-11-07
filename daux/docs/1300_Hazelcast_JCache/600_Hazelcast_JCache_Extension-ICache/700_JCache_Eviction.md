
Caches are generally not expected to grow to an infinite size. Implementing an expiry policy is one way you can
prevent infinite growth, but sometimes it is hard to define a meaningful expiration timeout. Therefore, Hazelcast JCache provides the eviction feature. Eviction offers the possibility of removing entries based on the cache size or amount of used memory
(Hazelcast IMDG Enterprise Only) and not based on timeouts.

#### Eviction and Runtime

Since a cache is designed for high throughput and fast reads, Hazelcast put a lot of effort into designing the eviction system to be as
predictable as possible. All built-in implementations provide an amortized O(1) runtime. The default operation runtime is
rendered as O(1), but it can be faster than the normal runtime cost if the algorithm finds an expired entry while sampling.

#### Cache Types

Most importantly, typical production systems have two common types of caches:

- **Reference Caches**: Caches for reference data are normally small and are used to speed up the de-referencing as a lookup table. Those
caches are commonly tend to be small and contain a previously known, fixed number of elements, e.g., states of the USA or
abbreviations of elements.
- **Active DataSet Caches**:  The other type of caches normally caches an active data set. These caches run to their maximum
size and evict the oldest or not frequently used entries to keep in memory bounds. They sit in front of a database or HTML
generators to cache the latest requested data.

Hazelcast JCache eviction supports both types of caches using a slightly different approach based on the configured maximum size
of the cache. For detailed information, please see the Eviction Algorithm section below.

#### Configuring Eviction Policies

Hazelcast JCache provides two commonly known eviction policies, LRU and LFU, but loosens the rules for predictable runtime
behavior. LRU, normally recognized as `Least Recently Used`, is implemented as `Less Recently Used`, and LFU known as `Least Frequently Used` is implemented as
`Less Frequently Used`. The details about this difference are explained in the
Eviction Algorithm section.

Eviction Policies are configured by providing the corresponding abbreviation to the configuration as shown in the [ICache Configuration section](03_Configuring_ICache.md). As already mentioned, two built-in policies are available:

To configure the use of the LRU (Less Recently Used) policy:

```xml
<eviction size="10000" max-size-policy="ENTRY_COUNT" eviction-policy="LRU" />
```

And to configure the use of the LFU (Less Frequently Used) policy:

```xml
<eviction size="10000" max-size-policy="ENTRY_COUNT" eviction-policy="LFU" />
```

The default eviction policy is LRU. Therefore, Hazelcast JCache does not offer the possibility of performing no eviction.

##### Custom Eviction Policies

Besides out of the box eviction policies LFU and LRU, you can also specify your custom eviction policies 
through the eviction configuration either programmatically or declaratively.

You can provide your `com.hazelcast.cache.CacheEvictionPolicyComparator` implementation to compare `com.hazelcast.cache.CacheEntryView`s. Supplied `CacheEvictionPolicyComparator` is used to compare cache entry views to select the one with higher priority to evict.

Here is an example for custom eviction policy comparator implementation for JCache:

```java
public class MyCacheEvictionPolicyComparator
        extends CacheEvictionPolicyComparator<Long, String> {

    @Override
    public int compare(CacheEntryView<Long, String> e1, CacheEntryView<Long, String> e2) {
        long id1 = e1.getKey();
        long id2 = e2.getKey();
        if (id1 > id2) {
            return FIRST_ENTRY_HAS_HIGHER_PRIORITY_TO_BE_EVICTED; // -1
        } else if (id1 < id2) {
            return SECOND_ENTRY_HAS_HIGHER_PRIORITY_TO_BE_EVICTED; // +1
        } else {
            return BOTH_OF_ENTRIES_HAVE_SAME_PRIORITY_TO_BE_EVICTED; // 0
        }
    }

}
```

###### Configuration

Custom eviction policy comparator can be specified through the eviction configuration 
by giving the full class name of the `EvictionPolicyComparator` (`CacheEvictionPolicyComparator` for JCache and its Near Cache) 
implementation or by specifying its instance itself.

**Programmatic:**

You can specify the full class name of custom `EvictionPolicyComparator` (`CacheEvictionPolicyComparator` for JCache and its Near Cache) implementation 
through `EvictionConfig`. This approach is useful when eviction configuration is specified at the client side 
and custom `EvictionPolicyComparator` implementation class itself does not exist at the client but at server side.

```java
CacheConfig cacheConfig = new CacheConfig();
...
EvictionConfig evictionConfig = 
    new EvictionConfig(50000, 
                       MaxSizePolicy.ENTRY_COUNT, 
                       "com.mycompany.MyEvictionPolicyComparator");
cacheConfig.setEvictionConfig(evictionConfig);
```

You can specify the custom `EvictionPolicyComparator` (`CacheEvictionPolicyComparator` for JCache and its Near Cache) instance itself directly through `EvictionConfig`. 

```java
CacheConfig cacheConfig = new CacheConfig();
...
EvictionConfig evictionConfig = 
    new EvictionConfig(50000, 
                       MaxSizePolicy.ENTRY_COUNT, 
                       new MyEvictionPolicyComparator());
cacheConfig.setEvictionConfig(evictionConfig);
```

**Declarative:**

You can specify the full class name of custom `EvictionPolicyComparator` (`CacheEvictionPolicyComparator` for JCache and its Near Cache) implementation 
in the `<eviction>` tag through `comparator-class-name` attribute in Hazelcast configuration XML file.

```xml
<cache name="cacheWithCustomEvictionPolicyComparator"> 
    <eviction size="50000" max-size-policy="ENTRY_COUNT" comparator-class-name="com.mycompany.MyEvictionPolicyComparator"/> 
</cache>
```

**Declarative for Spring:**

You can specify the full class name of custom `EvictionPolicyComparator` (`CacheEvictionPolicyComparator` for JCache and its Near Cache) implementation 
in the `<eviction>` tag through `comparator-class-name` attribute in Hazelcast *Spring* configuration XML file.

```xml
<hz:cache name="cacheWithCustomEvictionPolicyComparator">
    <hz:eviction size="50000" max-size-policy="ENTRY_COUNT" comparator-class-name="com.mycompany.MyEvictionPolicyComparator"/>
</hz:cache>
```

You can specify the custom `EvictionPolicyComparator` (`CacheEvictionPolicyComparator` for JCache and its Near Cache) bean in the `<eviction>` tag 
by referencing through `comparator-bean` attribute in Hazelcast *Spring* configuration XML file

```xml
<hz:cache name="cacheWithCustomEvictionPolicyComparator">
    <hz:eviction size="50000" max-size-policy="ENTRY_COUNT" comparator-bean="myEvictionPolicyComparatorBean"/>
</hz:cache>
```

#### Eviction Strategy

Eviction strategies implement the logic of selecting one or more eviction candidates from the underlying storage implementation and
passing them to the eviction policies. Hazelcast JCache provides an amortized O(1) cost implementation for this strategy to select a
fixed number of samples from the current partition that it is executed against.

The default implementation is `com.hazelcast.cache.impl.eviction.impl.strategy.sampling.SamplingBasedEvictionStrategy` which, as
mentioned, samples 15 random elements. A detailed description of the algorithm will be explained in the next section.

#### Eviction Algorithm

The Hazelcast JCache eviction algorithm is specially designed for the use case of high performance caches and with predictability
in mind. The built-in implementations provide an amortized O(1) runtime and therefore provide a highly predictable runtime behavior
which does not rely on any kind of background threads to handle the eviction. Therefore, the algorithm takes some assumptions into
account to prevent network operations and concurrent accesses.

As an explanation of how the algorithm works, let's examine the following flowchart step by step.

![Hazelcast JCache Eviction Algorithm](../../images/EvictionFlowchart.png)

1. A new cache is created. Without any special settings, the eviction is configured to kick in when the **cache** exceeds 10.000
elements and an LRU (Less Recently Used) policy is set up.
2. The user puts in a new entry, e.g., a key-value pair.
3. For every put, the eviction strategy evaluates the current cache size and decides if an eviction is necessary or not. If not, the entry is stored in step 10.
4. If eviction is required, a new sampling is started. The built-in sampler is implemented as an lazy iterator.
5. The sampling algorithm selects a random sample from the underlying data storage.
6. The eviction strategy tests whether the sampled entry is already expired (lazy expiration). If expired, the sampling stops and the entry is removed in step 9.
7. If not yet expired, the entry (eviction candidate) is compared to the last best matching candidate (based on the eviction policy) and the new best matching candidate is remembered.
8. The sampling is repeated 15 times and then the best matching eviction candidate is returned to the eviction strategy.
9. The expired or best matching eviction candidate is removed from the underlying data storage.
10. The new put entry is stored.
11. The put operation returns to the user.

As seen in the flowchart, the general eviction operation is easy. As long as the cache does not reach its maximum capacity,
or you execute updates (put/replace), no eviction is executed.

To prevent network operations and concurrent access, as mentioned earlier, the cache size is estimated based on the size of the
currently handled partition. Due to the imbalanced partitions, the single partitions might start to evict
earlier than the other partitions.

As mentioned in the Cache Types section above, typically two types of caches are found in the production systems. For small caches,
referred to as *Reference Caches*, the eviction algorithm has a special set of rules depending on the maximum configured cache
size. Please see the Reference Caches section below for details. The other type of cache is referred to as an *Active DataSet Cache*,
which in most cases makes heavy use of the eviction to keep the most active data set in the memory. Those kinds of caches use a very
simple but efficient way to estimate the cluster-wide cache size.

All of the following calculations have a well known set of fixed variables:

- `GlobalCapacity`: User defined maximum cache size (cluster-wide).
- `PartitionCount`: Number of partitions in the cluster (defaults to 271).
- `BalancedPartitionSize`: Number of elements in a balanced partition state, `BalancedPartitionSize := GlobalCapacity / PartitionCount`.
- `Deviation`: An approximated standard deviation (tests proofed it to be pretty near), `Deviation := sqrt(BalancedPartitionSize)`.

##### Reference Caches

A Reference Cache is typically small and the number of elements to store in the reference caches is normally 
known prior to creating the cache. Typical examples of reference caches are lookup tables for abbreviations or the states of a
country. They tend to have a fixed but small element number and the eviction is an unlikely event, and rather undesirable behavior.

Since an imbalanced partition is a worse problem in small and mid-sized caches than in caches with millions of entries, the normal
estimation rule (as discussed in a bit) is not applied to these kinds of caches. To prevent unwanted eviction on the small and
mid-sized caches, Hazelcast implements a special set of rules to estimate the cluster size.

To adjust the imbalance of partitions as found in the typical runtime, the actual calculated maximum cache size (known as the eviction
threshold) is slightly higher than the user defined size. That means more elements can be stored into the cache
than expected by the user. This needs to be taken into account especially for large objects, since those can easily exceed the
expected memory consumption!

**Small caches:**

If a cache is configured with no more than `4.000` elements, this cache is considered to be a small cache. The actual partition
size is derived from the number of elements (`GlobalCapacity`) and the deviation using the following formula:

```plain
MaxPartitionSize := Deviation * 5 + BalancedPartitionSize
```

This formula ends up with big partition sizes which, summed up, exceed the expected maximum cache size (set by the user). 
Since the small caches typically have a well known maximum number of elements, this is not a big
issue. Only if the small caches are used for a use case other than as a reference cache, this needs to be taken into account.

**Mid-sized caches**

A mid-sized cache is defined as a cache with a maximum number of elements that is bigger than `4.000` but not bigger than
`1.000.000` elements. The calculation of mid-sized caches is similar to that of the small caches but with a different
multiplier. To calculate the maximum number of elements per partition, the following formula is used:

```plain
MaxPartitionSize := Deviation * 3 + BalancedPartitionSize
```

##### Active DataSet Caches

For large caches, where the maximum cache size is bigger than `1.000.000` elements, there is no additional calculation needed. The maximum
partition size is considered to be equal to `BalancedPartitionSize` since statistically big partitions are expected to almost
balance themselves. Therefore, the formula is as easy as the following:

```plain
MaxPartitionSize := BalancedPartitionSize
```

##### Cache Size Estimation

As mentioned earlier, Hazelcast JCache provides an estimation algorithm to prevent cluster-wide network operations, concurrent
access to other partitions and background tasks. It also offers a highly predictable operation runtime when the eviction is necessary.

The estimation algorithm is based on the previously calculated maximum partition size (please see the Reference Caches and Active DataSet Caches sections above) and is calculated
against the current partition only.

The algorithm to reckon the number of stored entries in the cache (cluster-wide) and decide if the eviction is necessary is shown in the
following pseudo-code example:

```plain
RequiresEviction[Boolean] := CurrentPartitionSize >= MaxPartitionSize
```
