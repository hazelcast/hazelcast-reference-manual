
Hazelcast's cardinality estimator service is a data structure which implements Flajolet's HyperLogLog algorithm for estimating cardinalities of unique objects in theoretically huge data sets.
The implementation offered by Hazelcast includes improvements from Google's version of the algorithm, i.e., HyperLogLog++.

The cardinality estimator service does not provide any ways to configure its properties, but rather uses some well tested defaults.

- `P`: Precision - 14, using the 14 LSB of the hash for the index.
- `M`: 2 ^ P = 16384 (16K) registers
- `P'`: Sparse Precision - 25
- `Durability`: How many backups for each estimator, default 2

![image](../images/NoteSmall.jpg)***NOTE:*** *It is important to understand that this data structure is not 100% accurate, it is used to provide estimates. The error rate is typically a result of `1.04/sqrt(M)` which in our implementation is around 0.81% for high percentiles.*



The memory consumption of this data structure is close to 16K despite the size of elements in the source data set or stream.

### Cardinality Estimator API

The following is a brief view of the cardinality estimator API:

```
package com.hazelcast.cardinality;

import com.hazelcast.core.DistributedObject;
import com.hazelcast.core.ICompletableFuture;
import com.hazelcast.spi.annotation.Beta;

/**
 * CardinalityEstimator is a redundant and highly available distributed data-structure used
 * for probabilistic cardinality estimation purposes, on unique items, in significantly sized data cultures.
 *
 * CardinalityEstimator is internally based on a HyperLogLog++ data-structure,
 * and uses P^2 byte registers for storage and computation. (Default P = 14)
 */
@Beta
public interface CardinalityEstimator extends DistributedObject {

    /**
     * Add a new object in the estimation set. This is the method you want to
     * use to feed objects into the estimator.
     *
     * Objects are considered identical if they are serialized into the same binary blob.
     * In other words: It does not use Java equality.
     */
    void add(Object obj);


    /**
     * Estimates the cardinality of the aggregation so far.
     * If it was previously estimated and never invalidated, then a cached version is used.
     */
    long estimate();

    /**
     * Add a new object in the estimation set. This is the method you want to
     * use to feed objects into the estimator.
     *
     * Objects are considered identical if they are serialized into the same binary blob.
     * In other words: It does not use Java equality.
     *
     * This method will dispatch a request and return immediately an ICompletableFuture.
     * The operations result can be obtained in a blocking way, or a
     * callback can be provided for execution upon completion, as demonstrated in the following examples:
     * 1.  ICompletableFuture&lt;Void&gt; future = estimator.addAsync();
     *     // do something else, then read the result
     *     Boolean result = future.get(); // this method will block until the result is available
     * 
     * 2.  ICompletableFuture&lt;Void&gt; future = estimator.addAsync();
     *     future.andThen(new ExecutionCallback&lt;Void&gt;() {
     *          void onResponse(Void response) {
     *              // do something
     *          }
     *
     *          void onFailure(Throwable t) {
     *              // handle failure
     *          }
     *     });
     */
    ICompletableFuture<Void> addAsync(Object obj);

    /**
     * Estimates the cardinality of the aggregation so far.
     * If it was previously estimated and never invalidated, then a cached version is used.
     *
     * This method will dispatch a request and return immediately an ICompletableFuture.
     * The operations result can be obtained in a blocking way, or a
     * callback can be provided for execution upon completion, as demonstrated in the following examples:
     * 1.  ICompletableFuture&lt;Long&gt; future = estimator.estimateAsync();
     *     // do something else, then read the result
     *     Long result = future.get(); // this method will block until the result is available
     * 
     * 2.  ICompletableFuture&lt;Long&gt; future = estimator.estimateAsync();
     *     future.andThen(new ExecutionCallback&lt;Long&gt;() {
     *          void onResponse(Long response) {
     *              // do something with the result
     *          }
     *
     *          void onFailure(Throwable t) {
     *              // handle failure
     *          }
     *     });
     */
    ICompletableFuture<Long> estimateAsync();

}
```

There are two phases in using the cardinality estimator.

1. Add objects to the instance of the estimator, e.g., for IPs `estimator.add("0.0.0.0.")`.
The provided object is first serialized, and then the byte array is used to generate a hash for that object.<br>
![image](../images/NoteSmall.jpg)***NOTE:*** *Objects must be serializable in a form that Hazelcast understands.*</br>

2. Compute the estimate of the set so far `estimator.estimate()`.

### Examples

```
HazelcastInstance hazelcast = Hazelcast.newHazelcastInstance();
CardinalityEstimator uniqueVisitorsEstimator = instance.getCardinalityEstimator("visitors");
for (String ip : _visitorIpsBuffer_) {
  uniqueVisitorsEstimator.add(ip);
}

long estimate = uniqueVisitorsEstimator.estimate();
```

### Split-Brain Protection for CardinalityEstimator

CardinalityEstimator can be configured to check for a minimum number of available members before applying queue operations (see [Split-Brain Protection](/2600_Network_Partitioning/100_Split-Brain_Protection.md)). This is a check to avoid performing successful queue operations on all parts of a cluster during a network partition.

Following is a list of methods that now support Split-Brain Protection checks. The list is grouped by quorum type.

- WRITE, READ_WRITE:
    - `add`
    - `addAsync`
- READ, READ_WRITE:
    - `estimate`
    - `estimateAsync`