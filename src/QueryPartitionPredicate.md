

### Filtering with Partition Predicate

You can run queries on a single partition in your cluster using the partition predicate (`PartitionPredicate`). 

It takes a predicate and partition key as parameters, gets the partition ID using the key, and  runs that predicate only on the partition where that key belongs.

Please see the following code snippet:

```java
...
Predicate predicate = new PartitionPredicate<String, Integer>(partitionKey, TruePredicate.INSTANCE);

Collection<Integer> values = map.values(predicate);
Collection<String> keys = map.keySet(predicate);
...
```

Note that the partition predicate runs faster than the regular predicates if you know the partition where the data is located.