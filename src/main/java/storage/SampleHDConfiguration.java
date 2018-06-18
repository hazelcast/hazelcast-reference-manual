import com.hazelcast.config.NativeMemoryConfig;
import com.hazelcast.memory.MemorySize;
import com.hazelcast.memory.MemoryUnit;


public class SampleHDConfiguration {

    public static void main(String[] args) throws Exception{
//tag::hdconf[]
        MemorySize memorySize = new MemorySize(512, MemoryUnit.MEGABYTES);
        NativeMemoryConfig nativeMemoryConfig =
                new NativeMemoryConfig()
                        .setAllocatorType(NativeMemoryConfig.MemoryAllocatorType.POOLED)
                        .setSize(memorySize)
                        .setEnabled(true)
                        .setMinBlockSize(16)
                        .setPageSize(1 << 20);
//end::hdconf[]
    }
}
