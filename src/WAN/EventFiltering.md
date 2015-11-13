
### WAN Replication Event Filtering API

Starting with 3.6, Enterprise WAN replication allows you to intercept WAN replication events before they are placed to
WAN event replication queues by providing a filtering API. Using this API, you can monitor WAN replication events of each data structure
separately.

You can attach filters to your data structures using  `filter` property of `wan-replication-ref` configuration inside `hazelcast.xml` as shown in the following example configuration. You can also configure it using programmatic configuration.

```xml
<hazelcast>
  <map name="testMap">
    <wan-replication-ref name="test">
      ...
      <filters>
        <filter-impl>com.example.SampleFilter</filter-impl>
        <filter-impl>com.example.SampleFilter2</filter-impl>
      </filters>
    </wan-replication-ref>
  </map>"
</hazelcast>
```

As shown in the above configuration, you can define more than one filter. Filters are called in the order that they are introduced.
A WAN replication event is only eligible to publish if it passes all the filters.

Map and Cache have different filter interfaces. These interfaces are shown below.

**For map**:

```java
package com.hazelcast.map.wan.filter;
...

/**
 * Wan event filtering interface for {@link com.hazelcast.core.IMap}
 * based wan replication events
 *
 * @param <K> the type of the key
 * @param <V> the type of the value
 */
public interface MapWanEventFilter<K, V> {

    /**
     * This method decides whether this entry view is suitable to replicate
     * over WAN
     *
     * @param mapName
     * @param entryView
     * @return <tt>true</tt> if WAN event is not eligible for replication
     */
    boolean filter(String mapName, EntryView<K, V> entryView, WanFilterEventType eventType);
}
``` 

**For cache**:

```java
package com.hazelcast.cache.wan.filter;
...

/**
 * Wan event filtering interface for cache based wan replication events
 *
 * @param <K> the type of the key
 * @param <V> the type of the value
 */
public interface CacheWanEventFilter<K, V> {

    /**
     * This method decides whether this entry view is suitable to replicate
     * over WAN.
     *
     * @param entryView
     * @return <tt>true</tt> if WAN event is not eligible for replication.
     */
    boolean filter(String cacheName, CacheEntryView<K, V> entryView, WanFilterEventType eventType);
}
```

The method `filter` takes three parameters:

- `mapName`/`cacheName`: Name of the related data structure.
- `entryView`: [EntryView](https://github.com/hazelcast/hazelcast/blob/master/hazelcast/src/main/java/com/hazelcast/core/EntryView.java) 
or [CacheEntryView](https://github.com/hazelcast/hazelcast/blob/master/hazelcast/src/main/java/com/hazelcast/cache/CacheEntryView.java) depending on the data structure.
- `eventType`: Enum type - `UPDATED(1)` or `REMOVED(2)` - depending on the event.

