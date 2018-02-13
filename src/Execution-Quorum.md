
### Split-Brain Protection for IExecutorService

IExecutorService can be configured to check for a minimum number of available members before applying its operations (see [Split-Brain Protection](#split-brain-protection)). This is a check to avoid performing successful queue operations on all parts of a cluster during a network partition.

Following is a list of methods that now support Split-Brain Protection checks. The list is grouped by quorum type.


- WRITE, READ_WRITE:
    - `execute`
    - `executeOnAllMembers`
    - `executeOnKeyOwner`
    - `executeOnMember`
    - `executeOnMembers`
    - `shutdown`
    - `shutdownNow`
    - `submit`
    - `submitToAllMembers`
    - `submitToKeyOwner`
    - `submitToMember`
    - `submitToMembers`

**Configuring Split-Brain Protection**

Split-Brain protection for Executor Service can be configured programmatically using the method [`setQuorumName()`](http://docs.hazelcast.org/docs/3.10/javadoc/com/hazelcast/config/ExecutorConfig.html), or declaratively using the element `quorum-ref`. Following is an example declarative configuration:

```xml
<executor-service name="default">
   ...
   <quorum-ref>quorumname</quorum-ref>
   ...
</executor-service>
```


The value of `quorum-ref` should be the quorum configuration name which you configured under the `quorum` element as explained in the [Split-Brain Protection section](#split-brain-protection).


