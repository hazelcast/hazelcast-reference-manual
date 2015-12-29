



### Using High-Density Memory Store with Map

<font color="##153F75">**Hazelcast Enterprise HD**</font>
<br></br>

In the `BINARY` and `OBJECT` in-memory formats, Hazelcast stores your distributed data into Java heap which is subject to garbage collection (GC). As your heap gets bigger, garbage collection might cause your application to pause for tens of seconds, badly affecting your application performance and response times. Even if you have terabytes of cache in-memory with lots of updates, GC will have almost no effect; this results in more predictable latency and throughput. 

To overcome this challenge, Hazelcast offers High-Density Memory Store for your maps. You can enable your map to use the High-Density Memory Store by simply setting the in-memory format to `NATIVE`. The following snippet is the declarative configuration example.


```xml
<map name="nativeMap*">
   <in-memory-format>NATIVE</in-memory-format>
</map>
```

Keep in mind that you should have already enabled the High-Density Memory Store usage for your cluster. Please see the [Configuring High-Density Memory Store section](#configuring-high-density-memory-store).


#### Required configuration changes when using NATIVE

Beware that eviction mechanism is different for `NATIVE` in-memory format.
The new eviction algorithm is described [here](eviction-algorithm).

  - Eviction percentage has no effect.

    ```xml
    <map name="nativeMap*">
      <in-memory-format>NATIVE</in-memory-format>
      <eviction-percentage>25</eviction-percentage> <-- NO IMPACT with NATIVE
    </map>
    ```
  - These IMap eviction policies for `max-size` cannot be used: `FREE_HEAP_PERCENTAGE`, `FREE_HEAP_SIZE`, `USED_HEAP_PERCENTAGE`, `USED_HEAP_SIZE`.

  - Near cache eviction configuration should also be changed when the in-memory format is `NATIVE`.

    Existing configuration for a map's near cache when the in-memory format is `BINARY`:
    
    ```xml
        <map name="nativeMap*">

          <near-cache>
            <in-memory-format>BINARY</in-memory-format>
            <max-size>10000</max-size> <-- NO IMPACT with NATIVE
            <eviction-policy>LFU</eviction-policy> <-- NO IMPACT with NATIVE
          </near-cache>

        </map>
     ```

     If it is `NATIVE`, then the proper near cache configuration should be as follows:
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

*Please refer to the [High-Density Memory Store section](#high-density-memory-store) for more information.*
<br></br>

