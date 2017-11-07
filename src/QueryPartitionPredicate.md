

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

By default there are 271 partitions, and using a regular predicate, each partition needs to be accessed. But if the 
Partition Predicate will only access a single partition and this can lead to a big performance gain.

For the partition predicate to work correctly, you need to know to which partition your data belongs to so you can send the
request to the correct partition. One of the ways to do it is to make use of the PartitionAware interface when data is 
inserted, thereby controlling the owning partition. 

A concrete example, imagine there is a webshop that sells phones and accessories. To find all the accessories of a phone, 
a query could be executed that selects all accessories for that phone. This query is executing on all members in the cluster and
therefor could generate quite a lot of load. However if we would store the accessories in the same partition as the phone, the 
PartitionPredicate could be use the partitionkey of the phone to select the right partition and then queries for 
the accessories for that phone, thereby reducing the load on the system and get faster query results.