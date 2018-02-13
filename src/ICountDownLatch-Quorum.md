
### Split-Brain Protection for ICountDownLatch

ICountDownLatch can be configured to check for a minimum number of available members before applying ICountDownLatch operations (see [Split-Brain Protection](#split-brain-protection)). This is a check to avoid performing successful queue operations on all parts of a cluster during a network partition.

Following is a list of methods that now support Split-Brain Protection checks. The list is grouped by quorum type.

- WRITE, READ_WRITE:
    - `countDown`
    - `trySetCount`
- READ, READ_WRITE:
    - `await`
    - `getCount`


**Configuring Split-Brain Protection**

Split-Brain protection for ICountDownLatch can be configured programmatically using the method [`setQuorumName()`](http://docs.hazelcast.org/docs/3.10/javadoc/com/hazelcast/config/CountDownLatchConfig.html), or declaratively using the element `quorum-ref`. Following is an example declarative configuration:

```xml
<count-down-latch name="default">
   ...
   <quorum-ref>quorumname</quorum-ref>
   ...
</count-down-latch>
```


The value of `quorum-ref` should be the quorum configuration name which you configured under the `quorum` element as explained in the [Split-Brain Protection section](#split-brain-protection).

