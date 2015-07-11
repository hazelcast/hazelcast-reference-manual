
## RingBuffer Configuration


The following are example RingBuffer configurations.


**Declarative:**

```xml
<ringbuffer name="default">
    <capacity>1000</capacity>
    <time-to-live-seconds>0</time-to-live-seconds>
    <backup-count>1</backup-count>
    <async-backup-count>0</async-backup-count>
    <in-memory-format>BINARY</in-memory-format>
</ringbuffer>
```

**Programmatic:**

```java
Config config = new Config();
RingbufferConfig rbConfig = config.getRingbufferConfig();
rbConfig.setCapacity( 1000 )
        .setTimeToLiveSeconds( 0 )
        .setBackupCount( 1 )
        .setAsyncBackupCount( 0 )
        .setInMemoryFormat( "BINARY" );
```

RingBuffer configuration has the following elements.

- `capacity`: Total number of items in the RingBuffer. The default value is 10000. If no time-to-live-seconds is set, the size will always be equal to capacity after the head completed the first loop around the ring. This is because no items are getting retired.
- `time-to-live-seconds`: The number of seconds that the RingBuffer retains the items before deleting them. When it is set to **0**, it will be disabled. The default value is 0.
- `backup-count`: Number of synchronous backups. The default value is 1.
- `async-backup-count`: Number of asynchronous backups. The default value is 0.
- `in-memory-format`: In-memory format of an item when stored in the RingBuffer. Available values are `OBJECT` and `BINARY`. The default value is `BINARY`.


Ringbuffer configuration has the following attributes.

- `name`: Name of the ringbuffer. Required.

