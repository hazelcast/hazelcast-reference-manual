### JCache Near Cache

The Hazelcast JCache implementation supports a local Near Cache for remotely stored entries to increase the performance of local read operations. Please refer to the [Near Cache section](#near-cache) for a detailed explanation of the Near Cache feature and its configuration.

![image](images/NoteSmall.jpg) ***NOTE:*** *Near Cache for JCache is only available for clients, NOT members.*

#### Configuring Invalidation Event Sending

Invalidation is the process of removing an entry from the near cache since the entry is not valid anymore (its value is updated or it is removed from actual cache). Near cache invalidation happens asynchronously at the cluster level, but synchronously in real-time at the current member. This means when an entry is updated (explicitly or via entry processor) or removed (deleted explicitly or via entry processor, evicted, expired), it is invalidated from all near caches asynchronously within the whole cluster but updated/removed at/from the current member synchronously. Generally, whenever the state of an entry changes in the record store by updating its value or removing it, the invalidation event is sent for that entry.

Invalidation events can be sent either individually or in batches. If there are lots of mutating operations such as put/remove on the cache, sending the events in batches is advised. This reduces the network traffic and keeps the eventing system less busy. 

You can use the following system properties to configure the sending of invalidation events in batches:

- `hazelcast.cache.invalidation.batch.enabled`: Specifies whether the cache invalidation event batch sending is enabled or not. The default value is `true`.
- `hazelcast.cache.invalidation.batch.size`: Maximum number of cache invalidation events to be drained and sent to the event listeners in a batch. The default value is `100`.
- `hazelcast.cache.invalidation.batchfrequency.seconds`: Cache invalidation event batch sending frequency in seconds. When event size does not reach to `hazelcast.cache.invalidation.batch.size` in the given time period, those events are gathered into a batch and sent to the target. The default value is `10` seconds.

So if there are many clients or many mutating operations, batching should remain enabled and the batch size should be configured with the `hazelcast.cache.invalidation.batch.size` system property to a suitable value.

#### JCache Near Cache Expiration

Expiration means the eviction of expired records. A record is expired: 
- if it is not touched (accessed/read) for `<max-idle-seconds>`,
- `<time-to-live-seconds>` passed since it is put to near-cache.

Expiration is performed in two cases:

- When a record is accessed, it is checked about if it is expired or not. If it is expired, it is evicted and returns `null` to caller.
- In the background, there is an expiration task that periodically (currently 5 seconds) scans records and evicts the expired records.
 
#### Configuring JCache Near Cache Eviction

In the scope of near cache, eviction means evicting (clearing) the entries selected according to the given `eviction-policy` when the specified `max-size-policy` has been reached. Eviction is handled with `max-size policy` and `eviction-policy` elements. Please see [Configuring JCache Near Cache](#configuring-jcache-near-cache).

##### `max-size-policy`

This element defines the state when the near cache is full and determines whether the eviction should be triggered. The following policies for maximum cache size are supported by the near cache eviction:

- **ENTRY_COUNT:** Maximum size based on the entry count in the near cache. Available only for `BINARY` and `OBJECT` in-memory formats.
- **USED_NATIVE_MEMORY_SIZE:** Maximum used native memory size of the specified near cache in MB to trigger the eviction. If the used native memory size exceeds this threshold, the eviction is triggered.  Available only for `NATIVE` in-memory format. This is supported only by Hazelcast Enterprise.
- **USED_NATIVE_MEMORY_PERCENTAGE:** Maximum used native memory percentage of the specified near cache to trigger the eviction. If the native memory usage percentage (relative to maximum native memory size) exceeds this threshold, the eviction is triggered. Available only for `NATIVE` in-memory format. This is supported only by Hazelcast Enterprise.
- **FREE_NATIVE_MEMORY_SIZE:** Minimum free native memory size of the specified near cache in MB to trigger the eviction.  If free native memory size goes below this threshold, eviction is triggered. Available only for `NATIVE` in-memory format. This is supported only by Hazelcast Enterprise.
- **FREE_NATIVE_MEMORY_PERCENTAGE:** Minimum free native memory percentage of the specified near cache to trigger eviction. If free native memory percentage (relative to maximum native memory size) goes below this threshold, eviction is triggered. Available only for `NATIVE` in-memory format. This is supported only by Hazelcast Enterprise.

##### `eviction-policy` 

Once a near cache is full (i.e., has reached its maximum size as specified by the `max-size-policy` element), an eviction policy determines which, if any, entries must be evicted. Currently, the following eviction policies are supported by near cache eviction:

- LRU (Least Recently Used)
- LFU (Least Frequently Used)

<br><br>
![image](images/NoteSmall.jpg) ***NOTE:*** *Specifying a `time-to-live-seconds` value is recommended in order to guarantee the eventual eviction of invalidated near cache records.*
<br><br>


#### Lookup for Client Near Cache Configuration

Near cache configuration can be defined at the client side (using `hazelcast-client.xml` or `ClientConfig`) as independent configuration (independent from the `CacheConfig`). Near cache configuration lookup is handled as described below:

- Look for near cache configuration with the name of the cache given in the client configuration.
- If a defined near cache configuration is found, use this near cache configuration defined at the client.
- Otherwise: 
	- If a defined default near cache configuration is found, use this default near cache configuration.
	- If there is no default near cache configuration, it means there is no near cache configuration for cache.
