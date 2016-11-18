
## Fast-Aggregations

Fast-Aggregations are the successor of the [Aggregators](#aggregators).
They are equivalent to the Map-Reduce Aggregators in most of the use-cases, but instead of running on the Map-Reduce engine they run on the Query infrastructure.
Their performance is tens to hundreds times better due to the fact that they run in parallel for each partition and are highly optimized for speed and low memory consumption.

### The Aggregator's API

The API of the Aggregator looks as follows:

```java
package com.hazelcast.aggregation;

/**
 * Base class for all aggregators. Exposes API for parallel two-phase aggregations:
 * - accumulation of entries by multiple instance of aggregators
 * - combining all aggregators into one to calculate the final result
 * <p>
 * Aggregator does not have to be thread-safe.
 * accumulate() and combine() calls may be interwoven.
 * <p>
 * The very instance passed to an aggregate() method will not be used at all. It is just a prototype object
 * that will be cloned using serialization, since each partition gets its own instance of an aggregator.
 * In this way the aggregator is not used by multiple-threads. Each thread gets its own aggregator instance.
 *
 * @param <R> aggregation result
 * @param <K> entry key type
 * @param <V> entry value type
 */
public abstract class Aggregator<R, K, V> implements Serializable {

    /**
     * Accumulates the given entries.
     *
     * @param entry entries to accumulate.
     */
    public abstract void accumulate(Map.Entry<K, V> entry);

    /**
     * Called after the last call to combine on a specific instance. Enables disposing of the intermediary state.
     * This should be a very fast operation that just disposes unnecessary state (if applicable).
     * <p>
     * IMPORTANT: It may not be called if the instance aggregator does not take part in the accumulation phase.
     * It's caused by the fact that the aggregation may be run in a parallel way and each thread gets a clone of the
     * aggregator.
     */
    public void onAccumulationFinished() {
    }

    /**
     * Incorporates the intermediary result of the given aggregator to this instance of the aggregator.
     * Enables merging the intermediary state from a given aggregator.
     * It is used when the aggregation is split into a couple of aggregators.
     *
     * @param aggregator aggregator providing intermediary results to be combined into the results of this aggregator.
     */
    public abstract void combine(Aggregator aggregator);

    /**
     * Called after the last call to combine on a specific instance. Enables disposing of the intermediary state.
     * This should be a very fast operation that just disposes unnecessary state (if applicable).
     * <p>
     * IMPORTANT: It may not be called if the instance aggregator does not take part in the combination phase.
     * It's caused by the fact that the aggregation may be run in a parallel way and each thread gets a clone of the
     * aggregator.
     */
    public void onCombinationFinished() {
    }

    /**
     * Returns the result of the aggregation. The result may be calculated in this call or cached by the aggregator.
     *
     * @return returns the result of the aggregation.
     */
    public abstract R aggregate();

}
```

The Fast-Aggregation consists of three phases represented by three methods:
- `accumulate()`,
- `combine`,
- `aggreagate`.

There are also two callbacks:
- `onAccumulationFinished()` called when the accumulation phase finishes.
- `onCombinationFinished()` called when the combination phase finishes.

These callbacks enables releasing state that might have been initialised and stored in the Aggregator - to reduce the network traffic.

Each phase is described below.

##### Accumulation

During the Accumulation phase each Aggregator accumulates all entries passed to it by the query engine.
It accumulates only those pieces of information that are required to calculate the aggregation result in the last phase - that's implementation specific.

In case of the `DoubleAverage` aggregation the Aggregator would accumulate:
- the sum of the elements it accumulated
- the count of the elements it accumulated

##### Combination

Due to the fact that the Fast-Aggregation is executed in parallel on each partition of the cluster the results need to be combined after the Accumulation phase in order to be able calculate the final result.

In case of the `DoubleAverage` aggregation the aggregatot would sum up all the sums of the elements and all the counts.


##### Aggregation

Aggregation is the last phase that calculates the final result from the results accumulated and combined in the preceding phases.

In case of the `DoubleAverage` aggregation the Aggregator would just divide the sum of the elements by their count (if non-zero).


#### Fast-Aggregations and Map Interfaces

Fast-Aggregations are available on `com.hazelcast.core.IMap` only.

There are two methods that enables using them:

```java
    /**
     * Applies the aggregation logic on all map entries and returns the result
     *
     * @param aggregator aggregator to aggregate the entries with
     * @param <R>        type of the result
     * @return the result of the given type
     */
    <R> R aggregate(Aggregator<R, K, V> aggregator);

    /**
     * Applies the aggregation logic on map entries filtered with the Predicated and returns the result
     *
     * @param aggregator aggregator to aggregate the entries with
     * @param predicate  predicate to filter the entries with
     * @param <R>        type of the result
     * @return the result of the given type
     */
    <R> R aggregate(Aggregator<R, K, V> aggregator, Predicate<K, V> predicate);
```

#### Sample implementation

Here's a sample implementation of the Aggregator:

```java
public class DoubleAverageAggregator<K, V> extends AbstractAggregator<Double, K, V> {

    private double sum;

    private long count;

    public DoubleAverageAggregator() {
        super();
    }

    public DoubleAverageAggregator(String attributePath) {
        super(attributePath);
    }

    @Override
    public void accumulate(Map.Entry<K, V> entry) {
        count++;
        Double extractedValue = (Double) extract(entry);
        sum += extractedValue;
    }

    @Override
    public void combine(Aggregator aggregator) {
        DoubleAverageAggregator doubleAverageAggregator = (DoubleAverageAggregator) aggregator;
        this.sum += doubleAverageAggregator.sum;
        this.count += doubleAverageAggregator.count;
    }

    @Override
    public Double aggregate() {
        if (count == 0) {
            return null;
        }
        return (sum / (double) count);
    }

}

```

As you can see:
- the `accumulate()` method calculates the sum and the count of the elements.
- the `combine()` method combines the results from all the accumulations.
- the `aggregate()` method calculates the final result.

#### Config options

On each partition, after the entries have been passed to the aggregator, the accumulation runs in parallel.
It means that each aggregator is cloned and receives a sub-set of the entries received from a partition.
Then, it runs the accumulation phase in all of the cloned aggregators - at the end, the result is combined into a single accumulation result.
It speeds up the processing by at least the factor of two - even in case of simple aggregations. If the accumulation logic is more "heavy", the speed-up may be more significant.

In order to switch the accumulationn into a sequential mode just set the `hazelcast.aggregation.accumulation.parallel.evaluation` property to `false` (it's set to `true` by default).

