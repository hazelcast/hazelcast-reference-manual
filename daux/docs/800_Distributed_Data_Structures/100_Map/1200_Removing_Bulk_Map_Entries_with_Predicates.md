

### Removing Bulk Map Entries with Predicates

You can remove all map entries that match your predicate. For this, Hazelcast offers the method `removeAll()`. Its syntax is as follows:

```
void removeAll(Predicate<K, V> predicate);
```

Normally the map entries matching the predicate are found with a full scan in the map. But if the entries are indexed, then Hazelcast uses index search to find those entries. In the case of indexing, you can expect that finding the entries is faster.


![Note](../../images/NoteSmall.jpg) ***NOTE:*** *When `removeAll()` is called, ALL entries in the caller member's Near Cache are also removed.*

