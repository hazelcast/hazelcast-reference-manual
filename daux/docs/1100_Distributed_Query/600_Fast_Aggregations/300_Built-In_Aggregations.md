
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

