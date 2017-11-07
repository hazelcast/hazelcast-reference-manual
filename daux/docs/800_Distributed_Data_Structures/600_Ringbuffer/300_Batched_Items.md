
#### Adding Batched Items

In the previous examples, the method `ringBuffer.add()` is used to add an item to the Ringbuffer. The problems with this method 
are that it always overwrites and that it does not support batching. Batching can have a huge
impact on the performance. You can use the method `addAllAsync` to support batching. 

Please see the following example code.

```java
List<String> items = Arrays.asList("1","2","3");
ICompletableFuture<Long> f = rb.addAllAsync(items, OverflowPolicy.OVERWRITE);
f.get()
```  
      
In the above case, three strings are added to the Ringbuffer using the policy `OverflowPolicy.OVERWRITE`. Please see the [Overflow Policy section](02_Configuring_Ringbuffer.md) 
for more information.

#### Reading Batched Items

In the previous example, the `readOne` method read items from the Ringbuffer. `readOne` is simple but not very efficient for the following reasons:

* `readOne` does not use batching.
* `readOne` cannot filter items at the source; the items need to be retrieved before being filtered.

The method `readManyAsync` can read a batch of items and can filter items at the source. 

Please see the following example code.

```java
ICompletableFuture<ReadResultSet<E>> readManyAsync(
   long startSequence, 
   int minCount,                                              
   int maxCount, 
   IFunction<E, Boolean> filter);
```

The meanings of the `readManyAsync` arguments are given below.

* `startSequence`: Sequence of the first item to read.
* `minCount`: Minimum number of items to read. If you do not want to block, set it to 0. If you want to block for at least one item,
set it to 1.
* `maxCount`: Maximum number of the items to retrieve. Its value cannot exceed 1000.
* `filter`: A function that accepts an item and checks if it should be returned. If no filtering should be applied, set it to null.

A full example is given below.

```java
long sequence = rb.headSequence();
for(;;) {
    ICompletableFuture<ReadResultSet<String>> f = rb.readManyAsync(sequence, 1, 10, null);
    ReadResultSet<String> rs = f.get();
    for (String s : rs) {
        System.out.println(s);
    }
    sequence+=rs.readCount();
}
``` 
       
Please take a careful look at how your sequence is being incremented. You cannot always rely on the number of items being returned
if the items are filtered out.


