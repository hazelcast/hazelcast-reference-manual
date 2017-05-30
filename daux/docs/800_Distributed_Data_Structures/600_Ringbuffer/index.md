
Hazelcast Ringbuffer is a distributed data structure that stores its data in a ring-like structure. You can think of it as a circular array with a 
given capacity. Each Ringbuffer has a tail and a head. The tail is where the items are added and the head is where the items are overwritten 
or expired. You can reach each element in a Ringbuffer using a sequence ID, which is mapped to the elements between the head 
and tail (inclusive) of the Ringbuffer. 

### Getting a Ringbuffer and Reading Items

Reading from Ringbuffer is simple: get the Ringbuffer with the HazelcastInstance `getRingbuffer` method, get its current head with
the `headSequence` method, and start reading. Use the method `readOne` to return the item at the 
given sequence; `readOne` blocks if no item is available. To read the next item, increment the sequence by one.

```java
Ringbuffer<String> ringbuffer = hz.getRingbuffer("rb");
long sequence = ringbuffer.headSequence();
while(true){
    String item = ringbuffer.readOne(sequence);
    sequence++;
    ... process item
}  
```

By exposing the sequence, you can now move the item from the Ringbuffer as long as the item is still available. If the item is not available
any longer, `StaleSequenceException` is thrown.

### Adding Items to a Ringbuffer

Adding an item to a Ringbuffer is also easy with the Ringbuffer `add` method:

```java
Ringbuffer<String> ringbuffer = hz.getRingbuffer("rb");
ringbuffer.add("someitem")
```

Use the method `add` to return the sequence of the inserted item; the sequence value will always be unique. You can use this as a 
very cheap way of generating unique IDs if you are already using Ringbuffer.


### IQueue vs. Ringbuffer

Hazelcast Ringbuffer can sometimes be a better alternative than an Hazelcast IQueue. Unlike IQueue, Ringbuffer does not remove the items, it only
reads items using a certain position. There are many advantages to this approach:

* The same item can be read multiple times by the same thread. This is useful for realizing semantics of read-at-least-once or 
read-at-most-once.
* The same item can be read by multiple threads. Normally you could use an IQueue per thread for the same semantic, but this is 
less efficient because of the increased remoting. A take from an IQueue is destructive, so the change needs to be applied for backup 
also, which is why a `queue.take()` is more expensive than a `ringBuffer.read(...)`.
* Reads are extremely cheap since there is no change in the Ringbuffer. Therefore no replication is required. 
* Reads and writes can be batched to speed up performance. Batching can dramatically improve the performance of Ringbuffer.
 
