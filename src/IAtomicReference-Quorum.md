
### Split-Brain Protection for IAtomicReference

IAtomicReference can be configured to check for a minimum number of available members before applying its operations (see [Split-Brain Protection](#split-brain-protection)). This is a check to avoid performing successful operations on all parts of a cluster during a network partition.

Following is a list of methods that now support Split-Brain Protection checks. The list is grouped by quorum type.

- WRITE, READ_WRITE:
    - `alter`
    - `alterAndGet`
    - `alterAndGetAsync`
    - `alterAsync`
    - `apply`
    - `applyAsync`
    - `clear`
    - `clearAsync`
    - `compareAndSet`
    - `compareAndSetAsync`
    - `getAndAlter`
    - `getAndAlterAsync`
    - `getAndSet`
    - `getAndSetAsync`
    - `set`
    - `setAndGet`
    - `setAsync`
- READ, READ_WRITE:
    - `contains`
    - `containsAsync`
    - `get`
    - `getAsync`
    - `isNull`
    - `isNullAsync`

**Configuring Split-Brain Protection**

Split-Brain protection for IAtomicReference can be configured programmatically using the method [`setQuorumName()`](http://docs.hazelcast.org/docs/3.10/javadoc/com/hazelcast/config/AtomicReferenceConfig.html), or declaratively using the element `quorum-ref`. Following is an example declarative configuration:

```xml
<atomic-reference name="default">
   ...
   <quorum-ref>quorumname</quorum-ref>
   ...
</atomic-reference>
```


The value of `quorum-ref` should be the quorum configuration name which you configured under the `quorum` element as explained in the [Split-Brain Protection section](#split-brain-protection).