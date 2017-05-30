
Fast-Aggregations functionality is the successor of the [Aggregators](../04_Aggregators).
They are equivalent to the MapReduce Aggregators in most of the use cases, but instead of running on the MapReduce engine they run on the Query infrastructure.
Their performance is tens to hundreds times better since they run in parallel for each partition and are highly optimized for speed and low memory consumption.

