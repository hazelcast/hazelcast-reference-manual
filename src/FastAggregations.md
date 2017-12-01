
## Fast-Aggregations

Fast-Aggregations functionality is the successor of the [Aggregators](#aggregators).
They are equivalent to the MapReduce Aggregators in most of the use cases, but instead of running on the MapReduce engine they run on the Query infrastructure.
Their performance is tens to hundreds times better since they run in parallel for each partition and are highly optimized for speed and low memory consumption.

### Aggregator API

The Fast-Aggregation consists of three phases represented by three methods:

- `accumulate()`,
- `combine()`,
- `aggregate()`.

There are also two callbacks:

- `onAccumulationFinished()` called when the accumulation phase finishes.
- `onCombinationFinished()` called when the combination phase finishes.

These callbacks enable releasing the state that might have been initialized and stored in the Aggregator - to reduce the network traffic.

Each phase is described below, and you can also refer to the [Aggregator Javadoc](http://docs.hazelcast.org/docs/latest/javadoc/com/hazelcast/aggregation/Aggregator.html) for the API's details.

##### Accumulation

During the accumulation phase each Aggregator accumulates all entries passed to it by the query engine.
It accumulates only those pieces of information that are required to calculate the aggregation result in the last phase - that's implementation specific.

In case of the `DoubleAverage` aggregation the Aggregator would accumulate:

- the sum of the elements it accumulated
- the count of the elements it accumulated

##### Combination

Since Fast-Aggregation is executed in parallel on each partition of the cluster, the results need to be combined after the accumulation phase in order to be able to calculate the final result.

In case of the `DoubleAverage` aggregation, the aggregator would sum up all the sums of the elements and all the counts.


##### Aggregation

Aggregation is the last phase that calculates the final result from the results accumulated and combined in the preceding phases.

In case of the `DoubleAverage` aggregation, the Aggregator would just divide the sum of the elements by their count (if non-zero).


#### Fast-Aggregations and Map Interfaces

Fast-Aggregations are available on `com.hazelcast.core.IMap` only. IMap offers the method `aggregate` to apply the aggregation logic on the map entries. This method can be called with or without a predicate. You can refer to its [Javadoc](http://docs.hazelcast.org/docs/latest/javadoc/com/hazelcast/core/IMap.html#aggregate-com.hazelcast.aggregation.Aggregator-) to see the method details.

### Sample Implementation

Here's a sample implementation of the Aggregator:

```java
public class DoubleAverageAggregator<I> extends AbstractAggregator<I, Double> {

    private double sum;

    private long count;

    public DoubleAverageAggregator() {
        super();
    }

    public DoubleAverageAggregator(String attributePath) {
        super(attributePath);
    }

    @Override
    public void accumulate(I entry) {
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

### Built-In Aggregations

The `com.hazelcast.aggregation.Aggregators` class provides a wide variety of built-in Aggregators.
The full list is presented below:

- count
- distinct
- bigDecimal sum/avg/min/max
- bigInteger sum/avg/min/max
- double sum/avg/min/max
- integer sum/avg/min/max
- long sum/avg/min/max
- number avg
- comparable min/max
- fixedPointSum, floatingPointSum

To use the any of these Aggregators, instantiate them using the `Aggregators` factory class.

Each built-in Aggregator can also navigate to an attribute of the object passed to the `accumulate()` method (via reflection). For example, `Aggregators.distinct("address.city")` will extract the `address.city` attribute from the object passed to the Aggregator and accumulate the extracted value.

### Configuration Options

On each partition, after the entries have been passed to the aggregator, the accumulation runs in parallel.
It means that each aggregator is cloned and receives a sub-set of the entries received from a partition.
Then, it runs the accumulation phase in all of the cloned aggregators - at the end, the result is combined into a single accumulation result.
It speeds up the processing by at least the factor of two - even in case of simple aggregations. If the accumulation logic is more "heavy", the speed-up may be more significant.

In order to switch the accumulation into a sequential mode just set the `hazelcast.aggregation.accumulation.parallel.evaluation` property to `false` (it's set to `true` by default).

