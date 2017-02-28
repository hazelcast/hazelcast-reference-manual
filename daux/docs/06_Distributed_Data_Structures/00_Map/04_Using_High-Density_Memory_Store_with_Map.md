
<font color="##153F75">**Hazelcast IMDG Enterprise HD**</font>
<br></br>

Hazelcast instances are Java programs. In case of `BINARY` and `OBJECT` in-memory formats, Hazelcast stores your distributed data into the heap of its server instances. Java heap is subject to garbage collection (GC). In case of larger heaps, garbage collection might cause your application to pause for tens of seconds (even minutes for really large heaps), badly affecting your application performance and response times.

As the data gets bigger, you either run the application with larger heap, which would result in longer GC pauses or run multiple instances with smaller heap which can turn into an operational nightmare if the number of such instances becomes very high.

To overcome this challenge, Hazelcast offers High-Density Memory Store for your maps. You can configure your map to use High-Density Memory Store by setting the in-memory format to `NATIVE`. The following snippet is the declarative configuration example.


```xml
<map name="nativeMap*">
   <in-memory-format>NATIVE</in-memory-format>
</map>
```

Keep in mind that you should have already enabled the High-Density Memory Store usage for your cluster. Please see [Configuring High-Density Memory Store section](/13_Storage/00_High-Density_Memory_Store/00_Configuring_High-Density_Memory_Store.md).


#### Required configuration changes when using NATIVE

Note that the eviction mechanism is different for `NATIVE` in-memory format.
The new eviction algorithm for map with High-Density Memory Store is similar to that of JCache with High-Density Memory Store and is described [here](/11_Hazelcast_JCache/05_Hazelcast_JCache_Extension-ICache/06_JCache_Eviction.md).

  - Eviction percentage has no effect.

    ```xml
    <map name="nativeMap*">
      <in-memory-format>NATIVE</in-memory-format>
      <eviction-percentage>25</eviction-percentage> <-- NO IMPACT with NATIVE
    </map>
    ```
  - These IMap eviction policies for `max-size` cannot be used: `FREE_HEAP_PERCENTAGE`, `FREE_HEAP_SIZE`, `USED_HEAP_PERCENTAGE`, `USED_HEAP_SIZE`.

  - Near cache eviction configuration is also different for `NATIVE` in-memory format.

    For a near cache configuration with in-memory format set to `BINARY`:
    
    ```xml
        <map name="nativeMap*">

          <near-cache>
            <in-memory-format>BINARY</in-memory-format>
            <max-size>10000</max-size> <-- NO IMPACT with NATIVE
            <eviction-policy>LFU</eviction-policy> <-- NO IMPACT with NATIVE
          </near-cache>

        </map>
     ```

     the equivalent configuration for `NATIVE` in-memory format would be similar to the following:
     ```xml
         <map name="nativeMap*">

           <near-cache>
             <in-memory-format>NATIVE</in-memory-format>
             <eviction size="10000" eviction-policy="LFU" max-size-policy="USED_NATIVE_MEMORY_SIZE"/>   <-- Correct configuration with NATIVE
           </near-cache>

         </map>
     ```

  - Near cache eviction policy `ENTRY_COUNT` cannot be used for `max-size-policy`.


<br></br>
***RELATED INFORMATION***

*Please refer to the [High-Density Memory Store section](/13_Storage/00_High-Density_Memory_Store) for more information.*
<br></br>

