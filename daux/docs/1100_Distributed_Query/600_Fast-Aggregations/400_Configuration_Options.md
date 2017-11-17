
On each partition, after the entries have been passed to the aggregator, the accumulation runs in parallel.
It means that each aggregator is cloned and receives a sub-set of the entries received from a partition.
Then, it runs the accumulation phase in all of the cloned aggregators - at the end, the result is combined into a single accumulation result.
It speeds up the processing by at least the factor of two - even in case of simple aggregations. If the accumulation logic is more "heavy", the speed-up may be more significant.

In order to switch the accumulation into a sequential mode just set the `hazelcast.aggregation.accumulation.parallel.evaluation` property to `false` (it's set to `true` by default).

