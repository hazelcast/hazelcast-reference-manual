
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

