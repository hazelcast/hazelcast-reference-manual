
### Configuring High-Density Memory Store

To use High-Density memory storage, the native memory usage must be enabled using the programmatic or declarative configuration.
You can also configure its size, memory allocator type, minimum block size, page size and metadata space percentage.

- **size:** Size of the total native memory to allocate. Default value is **512 MB**.
- **allocator type:** Type of the memory allocator. Available values are as follows:
  * STANDARD: With this option, the memory is allocated or freed using your operating system's default memory manager. 
  * POOLED: This is the default value. With this option, memory blocks are managed using internal memory pools. Each memory allocation/freeing operation (except the ones bigger than page size) does not interact with the operating system. For memory allocation, it tries to find available memory of the requested memory size inside the internal memory pools; if it can not be found, it interacts with OS. For freeing memory, it marks disposed memory block as available to be used later.Using the POOLED allocator is strongly recommended. Here are the advantages: * when allocation sizes vary in a wide range, fragmentation grows so large that the OOM killer can terminate the process; or, if available, process memory overflows to swap space which kills the performance. * malloc/free are subject to contention on multithreaded/multicore systems.◦ The STANDARD allocator is used internally by the POOLED allocator or for debugging purposes. If you still want to use OS memory management, you can set the allocator type to STANDARD in your native memory configuration.
  
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

