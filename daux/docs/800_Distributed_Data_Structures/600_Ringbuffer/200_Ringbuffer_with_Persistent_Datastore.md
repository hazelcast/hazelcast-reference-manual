

Hazelcast allows you to load and store the Ringbuffer items from/to a persistent datastore using the interface `RingbufferStore`. If a Ringbuffer store is enabled, each item added to the Ringbuffer will also be stored at the configured Ringbuffer store. 

If the Ringbuffer store is configured, you can get items with sequences which are no longer in the actual Ringbuffer but are only in the Ringbuffer store. This will probably be much slower but still allow you to continue consuming items from the Ringbuffer even if they are overwritten with newer items in the Ringbuffer.

When a Ringbuffer is being instantiated, it will check if the Ringbuffer store is configured and will request the latest sequence in the Ringbuffer store. This is to enable the Ringbuffer to start with sequences larger than the ones in the Ringbuffer store. In this case, the Ringbuffer is empty but you can still request older items from it (which will be loaded from the Ringbuffer store).

The Ringbuffer store will store items in the same format as the Ringbuffer. If the `BINARY` in-memory format is used, the Ringbuffer store must implement the interface `RingbufferStore<byte[]>` meaning that the Ringbuffer will receive items in the binary format. If the `OBJECT` in-memory format is used, the Ringbuffer store must implement the interface `RingbufferStore<K>`, where `K` is the type of item being stored (meaning that the Ringbuffer store will receive the deserialized object).

When adding items to the Ringbuffer, the method `storeAll` allows you to store items in batches.

The following example class includes all of the `RingbufferStore` methods.

```java
public class TheRingbufferObjectStore implements RingbufferStore<Item> {

    @Override
    public void store(long sequence, Item data) {
        System.out.println("Object store");
    }

    @Override
    public void storeAll(long firstItemSequence, Item[] items) {
        System.out.println("Object store all");
    }

    @Override
    public Item load(long sequence) {
        System.out.println("Object load");
        return null;
    }

    @Override
    public long getLargestSequence() {
        System.out.println("Object get largest sequence");
        return -1;
    }
}
```


`Item` must be serializable. The following is an example of a Ringbuffer with the Ringbuffer store configured and enabled.


```xml
    <ringbuffer name="default">
        <capacity>10000</capacity>
        <time-to-live-seconds>30</time-to-live-seconds>
        <backup-count>1</backup-count>
        <async-backup-count>0</async-backup-count>
        <in-memory-format>BINARY</in-memory-format>
        <ringbuffer-store>
            <class-name>com.hazelcast.RingbufferStoreImpl</class-name>
        </ringbuffer-store>
    </ringbuffer>
```

Below are the explanations for the Ringbuffer store configuration elements: 

- **class-name**: Name of the class implementing the `RingbufferStore` interface. 
    
- **factory-class-name**: Name of the class implementing the `RingbufferStoreFactory` interface. This interface allows a factory class to be registered instead of a class implementing the `RingbufferStore` interface.
    
Either the `class-name` or the `factory-class-name` element should be used.


