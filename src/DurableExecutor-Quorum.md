
### Split-Brain Protection for Durable Executor Service

Durable Executor Service can be configured to check for a minimum number of available members before applying its operations (see [Split-Brain Protection](#split-brain-protection)). This is a check to avoid performing successful queue operations on all parts of a cluster during a network partition.

Following is a list of methods that now support Split-Brain Protection checks. The list is grouped by quorum type.

- WRITE, READ_WRITE:
    - `disposeResult`
    - `execute`
    - `executeOnKeyOwner`
    - `retrieveAndDisposeResult`
    - `shutdown`
    - `shutdownNow`
    - `submit`
    - `submitToKeyOwner`
- READ, READ_WRITE:
    - `retrieveResult`

**Configuring Split-Brain Protection**

Split-Brain protection for Durable Executor Service can be configured programmatically using the method [`setQuorumName()`](http://docs.hazelcast.org/docs/3.10/javadoc/com/hazelcast/config/DurableExecutorConfig.html), or declaratively using the element `quorum-ref`. Following is an example declarative configuration:

```xml
<durable-executor-service name="myDurableExecSvc">
    ...
	<quorum-ref>quorumname</quorum-ref>
	...
</durable-executor-service>
```


The value of `quorum-ref` should be the quorum configuration name which you configured under the `quorum` element as explained in the [Split-Brain Protection section](#split-brain-protection).


