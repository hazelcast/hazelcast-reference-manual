
### Using High-Density Memory Store with Near Cache

<font color="##153F75">**Hazelcast Enterprise HD**</font>
<br></br>

Hazelcast offers High-Density Memory Store for the near caches in your maps. You can enable your near cache to use the High-Density Memory Store by setting the in-memory format to `NATIVE`. The following snippet is the declarative configuration example.


```xml
<hazelcast>
  ...
  <map name="my-read-mostly-map">
    ...
    <near-cache>
       ...
       <in-memory-format>NATIVE</in-memory-format>
       <eviction size="1000" max-size-policy="ENTRY_COUNT" eviction-policy="LFU"/>
       ...
    </near-cache>
    ...  
  </map>
</hazelcast>  
```

The element `<eviction>` is used to specify the eviction behavior when you use High-Density Memory Store for your near cache. It has the following attributes:

- `size`: Maximum size (entry count) of the near cache.
- `max-size-policy`: Maximum size policy for eviction of the near cache. Available values are as follows:
	* ENTRY_COUNT: Maximum entry count per member.
	* USED_NATIVE_MEMORY_SIZE: Maximum used native memory size in megabytes.
	* USED_NATIVE_MEMORY_PERCENTAGE: Maximum used native memory percentage.
	* FREE_NATIVE_MEMORY_SIZE: Minimum free native memory size to trigger cleanup.
	* FREE_NATIVE_MEMORY_PERCENTAGE: Minimum free native memory percentage to trigger cleanup.
- `eviction-policy`: Eviction policy configuration. Its default values is NONE. Available values are as follows:
	- NONE: No items will be evicted and the property max-size will be ignored. You still can combine it with time-to-live-seconds and max-idle-seconds.
	- LRU: 	Least Recently Used.
	- LFU: 	Least Frequently Used.

Keep in mind that you should have already enabled the High-Density Memory Store usage for your cluster. Please see the [Configuring High-Density Memory Store section](#configuring-high-density-memory-store).

Note that a map and its near cache can independently use High-Density Memory Store. For example, if your map does not use High-Density Memory Store, its near cache can still use it.

