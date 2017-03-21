
### Entry Processor Performance Optimizations

By default the EntryProcessor executes on a partition-thread. There is exactly one thread responsible for handling
each partition and each of such threads may handle more than one partition.
The present design of EntryProcessor assumes users have fast user code execution of the `process()` method.
In the pathological case where the code that is very heavy and executes in multi-milliseconds, this may create a bottleneck.

An EntryProcessor may implement Offloadable and/or ReadOnly interfaces in order to significantly improve the throughput.

Currently, the optimizations apply to the following IMap methods' only:

- executeOnKey(Object, EntryProcessor)
- submitToKey(Object, EntryProcessor)
- submitToKey(Object, EntryProcessor, ExecutionCallback)

#### Offloadable Entry Processor

If an EntryProcessor implements the Offloadable interface the `process()` method will be executed in the executor
specified by the Offloadable `getExecutorName()` method.

Offloading will unblock the partition-thread allowing the user to profit from much higher throughput.
The key will be locked for the time-span of the processing in order to not generate a write-conflict.

In this case the threading looks as follows:

1. partition-thread (fetch entry & lock key)
2. execution-thread (process(entry) method)
3. partition-thread (set new value & unlock key, or just unlock key if the entry has not been modified)

The `getExecutorName()` method may also return two constants defined in the Offloadable interface:
```
    /**
     * Constant meaning that there will be no off-loading if returned from the {@link #getExecutorName()} method.
     */
    String NO_OFFLOADING = "no-offloading";

    /**
     * Constant meaning that processing will be off-loaded to the default OFFLOADABLE_EXECUTOR executor.
     * if returned from the {@link #getExecutorName()} method.
     */
    String OFFLOADABLE_EXECUTOR = ExecutionService.OFFLOADABLE_EXECUTOR;

```

#### ReadOnly Entry Processor

By default, an EntryProcessor will not run if the key is locked.
It will wait until the key has been unlocked (it applies to the executeOnKey, submitToKey methods, that were mentioned before).

If the EntryProcessor implements the ReadOnly interface without implementing the Offloadable interface the processing will not
be offloaded to an external executor, however, the EntryProcessor will not observe if the key of the processed entry is
locked, nor will try to acquire the lock since the EntryProcessor will not do any modifications.

If the EntryProcessor implements ReadOnly and modifies the entry an UnsupportedOperationException will be thrown.


#### ReadOnly & Offloadable Entry Processor

If the EntryProcessor implements both ReadOnly and Offloadable interfaces we will observe the combination of both
optimizations described above.

The the `process()` method will be executed in the executor specified by the Offloadable `getExecutorName()` method.
Also, the EntryProcessor will not observe if the key of the processed entry is locked, nor will try to acquire the
lock since the EntryProcessor will not do any modifications.

In this case the threading looks as follows:

1. partition-thread (fetch entry)
2. execution-thread (process(entry))

In this case the `EntryProcessor.getBackupProcessor()` has to return null; otherwise an IllegalArgumentException
exception is thrown.

If the EntryProcessor implements ReadOnly and modifies the entry an UnsupportedOperationException will be thrown.

Putting it all together:
```
private static class OffloadableReadOnlyEntryProcessor implements EntryProcessor<String, Employee>,
            Offloadable, ReadOnly {

        @Override
        public Object process(Map.Entry<String, Employee> entry) {
            // heavy logic
            return null;
        }

        @Override
        public EntryBackupProcessor<String, Employee> getBackupProcessor() {
            // ReadOnly EntryProcessor has to return null, since it's just a read-only operation that will not be
            // executed on the backup
            return null;
        }

        @Override
        public String getExecutorName() {
            return OFFLOADABLE_EXECUTOR;
        }
}
```