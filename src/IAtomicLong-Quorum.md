
### Split-Brain Protection for IAtomicLong

IAtomicLong can be configured to check for a minimum number of available members before applying its operations (see [Split-Brain Protection](#split-brain-protection)). This is a check to avoid performing successful operations on all parts of a cluster during a network partition.  Following is a list of methods that now support Split-Brain Protection checks. The list is grouped by quorum type.

- WRITE, READ_WRITE:
    - `addAndGet`
    - `addAndGetAsync`
    - `alter`
    - `alterAndGet`
    - `alterAndGetAsync`
    - `alterAsync`
    - `apply`
    - `applyAsync`
    - `compareAndSet`
    - `compareAndSetAsync`
    - `decrementAndGet`
    - `decrementAndGetAsync`
    - `getAndAdd`
    - `getAndAddAsync`
    - `getAndAlter`
    - `getAndAlterAsync`
    - `getAndIncrement`
    - `getAndIncrementAsync`
    - `getAndSet`
    - `getAndSetAsync`
    - `incrementAndGet`
    - `incrementAndGetAsync`
    - `set`
    - `setAsync`
- READ, READ_WRITE:
    - `get`
    - `getAsync`


**Configuring Split-Brain Protection**

Split-Brain protection for IAtomicLong can be configured programmatically using the method [`setQuorumName()`](http://docs.hazelcast.org/docs/3.10/javadoc/com/hazelcast/config/AtomicLongConfig.html), or declaratively using the element `quorum-ref`. Following is an example declarative configuration:

```xml
<atomic-long name="default">
   ...
   <quorum-ref>quorumname</quorum-ref>
   ...
</atomic-long>
```


The value of `quorum-ref` should be the quorum configuration name which you configured under the `quorum` element as explained in the [Split-Brain Protection section](#split-brain-protection).

