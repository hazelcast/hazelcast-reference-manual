
### Split-Brain Protection for Replicated Map

Replicated Map can be configured to check for a minimum number of available members before applying its operations (see [Split-Brain Protection](#split-brain-protection)). This is a check to avoid performing successful queue operations on all parts of a cluster during a network partition.

Following is a list of methods that now support Split-Brain Protection checks. The list is grouped by quorum type.

- WRITE, READ_WRITE:
    - `clear`
    - `put`
    - `putAll`
    - `remove`
- READ, READ_WRITE:
    - `containsKey`
    - `containsValue`
    - `entrySet`
    - `get`
    - `isEmpty`
    - `keySet`
    - `size`
    - `values`


**Configuring Split-Brain Protection**

Split-Brain protection for Replicated Map can be configured programmatically using the method [`setQuorumName()`](http://docs.hazelcast.org/docs/3.10/javadoc/com/hazelcast/config/ReplicatedMapConfig.html), or declaratively using the element `quorum-ref`. Following is an example declarative configuration:

```xml
<replicatedmap name="default">
   ...
   <quorum-ref>quorumname</quorum-ref>
   ...
</replicatedmap>
```


The value of `quorum-ref` should be the quorum configuration name which you configured under the `quorum` element as explained in the [Split-Brain Protection section](#split-brain-protection).

