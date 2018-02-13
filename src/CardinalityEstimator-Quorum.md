
### Split-Brain Protection for Cardinality Estimator

Cardinality Estimator can be configured to check for a minimum number of available members before applying its operations (see [Split-Brain Protection](#split-brain-protection)). This is a check to avoid performing successful queue operations on all parts of a cluster during a network partition.

Following is a list of methods that now support Split-Brain Protection checks. The list is grouped by quorum type.

- WRITE, READ_WRITE:
    - `add`
    - `addAsync`
- READ, READ_WRITE:
    - `estimate`
    - `estimateAsync`

**Configuring Split-Brain Protection**

Split-Brain protection for Cardinality Estimator can be configured programmatically using the method [`setQuorumName()`](http://docs.hazelcast.org/docs/3.10/javadoc/com/hazelcast/config/CardinalityEstimatorConfig.html), or declaratively using the element `quorum-ref`. Following is an example declarative configuration:

```xml
<cardinality-estimator name="default">
   ...
   <quorum-ref>quorumname</quorum-ref>
   ...
</cardinality-estimator>
```


The value of `quorum-ref` should be the quorum configuration name which you configured under the `quorum` element as explained in the [Split-Brain Protection section](#split-brain-protection).


**Configuring Merge Policy**

While recovering from a Split-Brain syndrome, Cardinality Estimator in the small cluster merges into the bigger cluster based on a configured merge policy. When an estimator merges into the cluster, an estimator with the same name might already exist in the cluster.
So the merge policy resolves these kinds of conflicts with different out-of-the-box strategies. It can be configured programmatically using the method [`setMergePolicyConfig()`](http://docs.hazelcast.org/docs/3.10/javadoc/com/hazelcast/config/CardinalityEstimatorConfig.html), or declaratively using the element `merge-policy`. Following is an example declarative configuration:

```xml
<cardinality-estimator name="default">
   ...
   <merge-policy>HyperLogLogMergePolicy</merge-policy>
   ...
</cardinality-estimator>
```

Following out-of-the-box merge policies are available:

- `DiscardMergePolicy`: Estimator from the smaller cluster will be discarded.
- `HyperLogLogMergePolicy`: Estimator will merge with the existing one, using the algorithmic merge for HyperLogLog. This is the default policy.
- `PassThroughMergePolicy`: Estimator from the smaller cluster wins.
- `PutIfAbsentMergePolicy`: Estimator from the smaller cluster wins if it doesn't exist in the cluster.
