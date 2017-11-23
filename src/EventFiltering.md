
### Event Filtering API

Starting with Hazelcast 3.6, WAN replication allows you to intercept WAN replication events before they are placed to
WAN event replication queues by providing a filtering API. Using this API, you can monitor WAN replication events of each data structure
separately.

You can attach filters to your data structures using  `filter` property of `wan-replication-ref` configuration inside `hazelcast.xml` as shown in the following example configuration. You can also configure it using the programmatic configuration.

```xml
<hazelcast>
  <map name="testMap">
    <wan-replication-ref name="test">
      <filters>
        <filter-impl>com.example.SampleFilter</filter-impl>
        <filter-impl>com.example.SampleFilter2</filter-impl>
      </filters>
    </wan-replication-ref>
  </map>
</hazelcast>
```

As shown in the above configuration, you can define more than one filter. Filters are called in the order that they are introduced.
A WAN replication event is only eligible to publish if it passes all the filters.

Map and Cache have different filter interfaces: `MapWanEventFilter` and `CacheWanEventFilter`. Both of these interfaces have the method `filter` which takes the following parameters:

- `mapName`/`cacheName`: Name of the related data structure.
- `entryView`: [EntryView](http://docs.hazelcast.org/docs/latest/javadoc/com/hazelcast/core/EntryView.html) 
or [CacheEntryView](http://docs.hazelcast.org/docs/latest/javadoc/com/hazelcast/cache/CacheEntryView.html) depending on the data structure.
- `eventType`: Enum type - `UPDATED(1)` or `REMOVED(2)` - depending on the event.
