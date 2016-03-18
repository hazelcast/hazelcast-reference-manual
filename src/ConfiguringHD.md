
### Configuring High-Density Memory Store

To use the High-Density memory storage, the native memory usage must be enabled using the programmatic or declarative configuration.
Also, you can configure its size, memory allocator type, minimum block size, page size and metadata space percentage.

- **size:** Size of the total native memory to allocate. Default value is **512 MB**.
- **allocator type**: Type of the memory allocator. Available values are as follows:
  * **STANDARD**: This option is used internally by Hazelcast's POOLED allocator type or for debugging/testing purposes:
	- With this option, the memory is allocated or deallocated using your operating system's default memory manager. 
  	- It uses GNU C Library's standard `malloc()` and `free()` methods which are subject to contention on multithreaded/multicore systems.
  	- Memory operations may become slower when you perform a lot of small allocations and deallocations. 
  	- It may cause large memory fragmentations, unless you use a method in the background that emphasizes fragmentation avoidance, such as `jemalloc()`. Note that, a large memory fragmentation can trigger the Linux Out of Memory Killer if there is no swap space enabled in your system.
  	- If you still want to use the operating system's default memory management, you can set the allocator type to STANDARD in your native memory configuration.

  * **POOLED**: This is the default option, Hazelcast's own pooling memory allocator:
  	- With this option, memory blocks are managed using internal memory pools. 
  	- It allocates memory blocks, each of which has a 8MB size by default, and splits them into chunks or merges them to create larger chunks when required. Sizing of these chunks follows the [buddy memory allocation](https://en.wikipedia.org/wiki/Buddy_memory_allocation) algorithm, i.e. power-of-two sizing.
  	- It never frees memory blocks back to the operating system. It marks a disposed memory block as available to be used later meaning that these blocks are reusable.
  	- Memory allocation and deallocation operations (except the ones requiring larger sizes than the page size) do not interact with the operating system mostly.
  	- For memory allocation, it tries to find the  requested memory size inside the internal memory pools. If it cannot be found, then it interacts with the operating system.   
- **minimum block size:** Minimum size of the blocks in bytes to split and fragment a page block to assign to an allocation request. It is used only by the **POOLED** memory allocator. Default value is **16**.
- **page size:** Size of the page in bytes to allocate memory as a block. It is used only by the **POOLED** memory allocator. Default value is `1 << 22` = **4194304 Bytes**, about **4 MB**.
- **metadata space percentage:** Defines the percentage of the allocated native memory that is used for the metadata such as indexes, offsets, etc. It is used only by the **POOLED** memory allocator. Default value is **12.5**.

The following is the programmatic configuration example.

```java
MemorySize memorySize = new MemorySize(512, MemoryUnit.MEGABYTES);
NativeMemoryConfig nativeMemoryConfig =
                new NativeMemoryConfig()
                        .setAllocatorType(NativeMemoryConfig.MemoryAllocatorType.POOLED)
                        .setSize(memorySize)
                        .setEnabled(true)
                        .setMinBlockSize(16)
                        .setPageSize(1 << 20);
```

The following is the declarative configuration example.

```xml
<native-memory enabled="true" allocator-type="POOLED">
  <size value="512" unit="MEGABYTES"/>
</native-memory>
```

