
#### Capacity

By default, a Ringbuffer is configured with a `capacity` of 10000 items. This creates an array with a size of 10000. If 
a `time-to-live` is configured, then an array of longs is also created that stores the expiration time for every item. 
In a lot of cases you may want to change this `capacity` number to something that better fits your needs. 

Below is a declarative configuration example of a Ringbuffer with a `capacity` of 2000 items.

```xml
<ringbuffer name="rb">
    <capacity>2000</capacity>
</ringbuffer>
```

Currently, Hazelcast Ringbuffer is not a partitioned data structure; its data is stored in a single partition and the replicas
 are stored in another partition. Therefore, create a Ringbuffer that can safely fit in a single cluster member. 


#### Back Up

Hazelcast Ringbuffer has a single synchronous backup by default. You can control the Ringbuffer backup just like most of the other Hazelcast 
distributed data structures by setting the synchronous and asynchronous backups: `backup-count` and `async-backup-count`. In the example below, a Ringbuffer is configured with no
synchronous backups and one asynchronous backup:

```xml
<ringbuffer name="rb">
    <backup-count>0</backup-count>
    <async-backup-count>1</async-backup-count>
</ringbuffer>
```

An asynchronous backup will probably give you better performance. However, there is a chance that the item added will be lost 
when the member owning the primary crashes before the backup could complete. You may want to consider batching
methods if you need high performance but do not want to give up on consistency.


#### Time To Live

You can configure Hazelcast Ringbuffer with a time to live in seconds. Using this setting, you can control how long the items remain in 
the Ringbuffer before they are expired. By default, the time to live is set to 0, meaning that unless the item is overwritten, 
it will remain in the Ringbuffer indefinitely. If you set a time to live and an item is added, then, depending on the Overflow Policy, 
either the oldest item is overwritten, or the call is rejected. 

In the example below, a Ringbuffer is configured with a time to live of 180 seconds.

```xml
<ringbuffer name="rb">
    <time-to-live-seconds>180</time-to-live-seconds>
</ringbuffer>
```


#### Overflow Policy

Using the overflow policy, you can determine what to do if the oldest item in the Ringbuffer is not old enough to expire when
 more items than the configured Ringbuffer capacity are being added. The below options are currently available.
 
* `OverflowPolicy.OVERWRITE`: The oldest item is overwritten. 
* `OverflowPolicy.FAIL`: The call is aborted. The methods that make use of the OverflowPolicy return `-1` to indicate that adding
the item has failed. 

Overflow policy gives you fine control on what to do if the Ringbuffer is full. You can also use the overflow policy to apply 
a back pressure mechanism. The following example code shows the usage of an exponential backoff.

```java
long sleepMs = 100;
for (; ; ) {
    long result = ringbuffer.addAsync(item, OverflowPolicy.FAIL).get();
    if (result != -1) {
        break;
    }
    
    TimeUnit.MILLISECONDS.sleep(sleepMs);
    sleepMs = min(5000, sleepMs * 2);
}
```


#### In-Memory Format

You can configure Hazelcast Ringbuffer with an in-memory format that controls the format of the Ringbuffer's stored items. By default, `BINARY` in-memory format is used, 
meaning that the object is stored in a serialized form. You can select the `OBJECT` in-memory format, which is useful when filtering is 
applied or when the `OBJECT` in-memory format has a smaller memory footprint than `BINARY`. 

In the declarative configuration example below, a Ringbuffer is configured with the `OBJECT` in-memory format:

```xml
<ringbuffer name="rb">
    <in-memory-format>BINARY</in-memory-format>
</ringbuffer>
```




#### Configuration Examples

The following shows the declarative configuration of a Ringbuffer called `rb`. The configuration is modeled after the Ringbuffer defaults.

```xml
<ringbuffer name="rb">
    <capacity>10000</capacity>
    <backup-count>1</backup-count>
    <async-backup-count>0</async-backup-count>
    <time-to-live-seconds>0</time-to-live-seconds>
    <in-memory-format>BINARY</in-memory-format>
</ringbuffer>
```

You can also configure a Ringbuffer programmatically. The following is a programmatic version of the above declarative configuration.

```java
RingbufferConfig rbConfig = new RingbufferConfig("rb")
    .setCapacity(10000)
    .setBackupCount(1)
    .setAsyncBackupCount(0)
    .setTimeToLiveSeconds(0)
    .setInMemoryFormat(InMemoryFormat.BINARY);
Config config = new Config();
config.addRingbufferConfig(rbConfig);
```        

