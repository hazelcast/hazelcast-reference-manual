## Event journal

The event journal is a distributed data structure that stores the history of mutation actions on data structures such as map or cache. Each action on the map or cache which modifies its contents (such as `put`, `remove` or scheduled tasks which are not triggered by using the public API) will create an event which will be stored in the event journal. The event will store the event type as well as the key, old value and updated value for the entry (when applicable). As a user, you can only append to the journal indirectly by using the map and cache methods or by configuring expiration and eviction. 

By reading from the event journal you can recreate the state of the map or cache at any point in time. Currently the event journal does not expose public API for reading the event journal in Hazelcast IMDG. The event journal should be used in conjunction with Hazelcast Jet. Because of this we will describe how to configure it but not how to use it from IMDG.
The event journal has a fixed capacity and an expiration time. Internally it is structured as a ringbuffer and shares much similarities with it. 

# Configuring the event journal

### Configuring event journal Capacity

By default, a event journal is configured with a `capacity` of 10000 items. This creates an array with a size of 10000. If 
a `time-to-live` is configured, then an array of longs is also created that stores the expiration time for every item. 
In a lot of cases you may want to change this `capacity` number to something that better fits your needs. 

Below is a declarative configuration example of a event journal with a `capacity` of 2000 items.

```xml
<event-journal enabled="true">
    <mapName>myMap</mapName>
    <capacity>5000</capacity>
    <time-to-live-seconds>20</time-to-live-seconds>
</event-journal>

<event-journal enabled="true">
    <cacheName>myCache</cacheName>
    <capacity>10000</capacity>
    <time-to-live-seconds>0</time-to-live-seconds>
</event-journal>
``` 
You can also configure an event journal programmatically. The following is a programmatic version of the above declarative configuration. 

```java
EventJournalConfig myMapJournalConfig = new EventJournalConfig()
                .setMapName("myMap")
                .setEnabled(true)
                .setCapacity(5000)
                .setTimeToLiveSeconds(20);

        EventJournalConfig myCacheJournalConfig = new EventJournalConfig()
                .setMapName("myCache")
                .setEnabled(true)
                .setCapacity(10000)
                .setTimeToLiveSeconds(0);
        
        Config config = new Config();
        config.addEventJournalConfig(myMapJournalConfig);
        config.addEventJournalConfig(myCacheJournalConfig);
```


The `mapName` and `cacheName` attributes define the map or cache to which this event journal configuration applies. You can use pattern-matching and the `default` keyword when doing so. For instance, by using a `mapName` of `journaled*`, the journal configuration will apply to all maps whose names start with "journaled" and don't have other journal configurations that match (e.g. if you would have a more specific journal config with an exact name match). If you specify the `mapName` or `cacheName` as `default`, the journal configuration will apply to all maps and caches that don't have any other journal configuration. This means that potentially all maps and/or caches will have one single event journal configuration.


### Event journal partitioning

The event journal is a partitioned data structure. The partitioning is done by the event key. Because of this, the map and cache entry with a specific key is co-located with the events for that key and will be migrated accordingly.
Also, the backup count for the event journal is equal to the backup count of the map or cache for which it contains events. The events on the backup replicas will be created with the map or cache backup operations and no additional network traffic is introduced when appending events to the event journal. 

### Configuring event journal Time To Live

You can configure Hazelcast event journal with a time to live in seconds. Using this setting, you can control how long the items remain in 
the event journal before they are expired. By default, the time to live is set to 0, meaning that unless the item is overwritten, 
it will remain in the journal indefinitely. The expiration time of the existing journal events is checked whenever an new event is appended to the event journal or when the event journal is being read. If the journal is not being read or written to, the journal may keep expired items indefinitely. 

In the example below, a event journal is configured with a time to live of 180 seconds.

```xml
<event-journal enabled="true">
    <cacheName>myCache</cacheName>
    <capacity>10000</capacity>
    <time-to-live-seconds>180</time-to-live-seconds>
</event-journal>
```

