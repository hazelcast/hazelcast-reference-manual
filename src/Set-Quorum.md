
### Split-Brain Protection for ISet and TransactionalSet

ISet & TransactionalSet can be configured to check for a minimum number of available members before applying queue operations (see [Split-Brain Protection](#split-brain-protection)). This is a check to avoid performing successful queue operations on all parts of a cluster during a network partition.

Following is a list of methods that now support Split-Brain Protection checks. The list is grouped by quorum type.

ISet:

- WRITE, READ_WRITE:
    - `add`
    - `addAll`
    - `clear`
    - `remove`
    - `removeAll`
- READ, READ_WRITE:
    - `contains`
    - `containsAll`
    - `isEmpty`
    - `iterator`
    - `size`
    - `toArray`


TransactionalSet:

- WRITE, READ_WRITE:
    - `add`
    - `remove`
- READ, READ_WRITE:
    - `size`



**Configuring Split-Brain Protection**

Split-Brain protection for ISet can be configured programmatically using the method [`setQuorumName()`](http://docs.hazelcast.org/docs/3.10/javadoc/com/hazelcast/config/SetConfig.html), or declaratively using the element `quorum-ref`. Following is an example declarative configuration:

```xml
<set name="default">
    ...
    <quorum-ref>quorumname</quorum-ref>
    ...
</set>
```


The value of `quorum-ref` should be the quorum configuration name which you configured under the `quorum` element as explained in the [Split-Brain Protection section](#split-brain-protection).

