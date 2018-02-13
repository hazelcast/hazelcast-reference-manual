
### Split-Brain Protection for MultiMap and TransactionalMultiMap

MultiMap & TransactionalMultiMap can be configured to check for a minimum number of available members before applying their operations (see [Split-Brain Protection](#split-brain-protection)). This is a check to avoid performing successful queue operations on all parts of a cluster during a network partition.

Following is a list of methods that now support Split-Brain Protection checks. The list is grouped by quorum type.

MultiMap:

- WRITE, READ_WRITE:
    - `clear`
    - `forceUnlock`
    - `lock`
    - `put`
    - `remove`
    - `tryLock`
    - `unlock`
- READ, READ_WRITE:
    - `containsEntry`
    - `containsKey`
    - `containsValue`
    - `entrySet`
    - `get`
    - `isLocked`
    - `keySet`
    - `localKeySet`
    - `size`
    - `valueCount`
    - `values`


TransactionalMultiMap:

- WRITE, READ_WRITE:
    - `put`
    - `remove`
- READ, READ_WRITE:
    - `size`
    - `get`
    - `valueCount`



**Configuring Split-Brain Protection**

Split-Brain protection for MultiMap can be configured programmatically using the method [`setQuorumName()`](http://docs.hazelcast.org/docs/3.10/javadoc/com/hazelcast/config/MultiMapConfig.html), or declaratively using the element `quorum-ref`. Following is an example declarative configuration:

```xml
<multimap name="default">
    ...
    <quorum-ref>quorumname</quorum-ref>
    ...
</multimap>
```


The value of `quorum-ref` should be the quorum configuration name which you configured under the `quorum` element as explained in the [Split-Brain Protection section](#split-brain-protection).

