



### Setting In Memory Format

IMap (and a few other Hazelcast data structures, such as ICache) has an `in-memory-format` configuration option. By default, Hazelcast stores data into memory in binary (serialized) format. But sometimes, it can be efficient to store the entries in their object form, especially in cases of local processing, such as entry processor and queries.

To set how the data will be stored in memory, set `in-memory-format` in configuration. You have the following format options.

- `BINARY` (default): This is the default option. The data will be stored in serialized binary format. You can use this option if you mostly perform regular map operations, such as `put` and `get`.

- `OBJECT`: The data will be stored in de-serialized form. This configuration is good for maps where entry processing and queries form the majority of all operations and the objects are complex, making the serialization cost respectively high. By storing objects, entry processing will not contain the de-serialization cost.

- `NATIVE`: (Enterprise Only) The data will be stored in serialized binary form in Hazelcast High-Density Memory Store. In other in-memory-formats, Hazelcast stores your distributed data into Java heap which is subject to garbage collection (GC). As your heap gets bigger, garbage collection might cause your application to pause for tens of seconds, badly affecting your application performance and response times. Even if you have terabytes of cache in-memory with lots of updates, GC will have almost no effect; this results in more predictable latency and throughput.
    Here is an example configuration for High-Density Memory Store backed `IMap` :

    ```xml
    <map name="nativeMap*">
        <in-memory-format>NATIVE</in-memory-format>
    </map>
    ```
    
<br></br>
***RELATED INFORMATION***

*Please refer to the [High-Density Memory Store section](#high-density-memory-store) for more information.*
<br></br>


Regular operations like `get` rely on the object instance. When the `OBJECT` format is used and a `get` is performed, the map does not return the stored instance, but creates a clone. Therefore, this whole `get` operation first includes a serialization on the member owning the instance, and then a deserialization on the member calling the instance. When the `BINARY` format is used, only a deserialization is required; `BINARY` is faster.

Similarly, a `put` operation is faster when the `BINARY` format is used. If the format was `OBJECT`, map would create a clone of the instance, and there would first be a serialization and then a deserialization. When BINARY is used, only a deserialization is needed.


![image](images/NoteSmall.jpg) ***NOTE:*** *If a value is stored in `OBJECT` format, a change on a returned value does not affect the stored instance. In this case, the returned instance is not the actual one but a clone. Therefore, changes made on an object after it is returned will not reflect on the actual stored data. Similarly, when a value is written to a map and the value is stored in `OBJECT` format, it will be a copy of the `put` value. Therefore, changes made on the object after it is stored will not reflect on the stored data.*