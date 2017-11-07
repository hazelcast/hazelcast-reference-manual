

### Indexing Queries

Hazelcast distributed queries will run on each member in parallel and will return only the results to the caller.
Then, on the caller side, the results will be merged.

When a query runs on a
member, Hazelcast will iterate through all the owned entries and find the matching ones. This can be made faster by indexing
the mostly queried fields, just like you would do for your database. Indexing will add overhead for each `write`
operation but queries will be a lot faster. If you query your map a lot, make sure to add indexes for the most frequently
queried fields. For example, if you do an `active and age < 30` query, make sure you add an index for the `active` and
`age` fields. The following example code does that by:

- getting the map from the Hazelcast instance, and
- adding indexes to the map with the IMap `addIndex` method.

```java
IMap map = hazelcastInstance.getMap( "employees" );
// ordered, since we have ranged queries for this field
map.addIndex( "age", true );
// not ordered, because boolean field cannot have range
map.addIndex( "active", false );
```

#### Indexing Ranged Queries

`IMap.addIndex(fieldName, ordered)` is used for adding index. For each indexed field, if you have ranged queries such as `age>30`,
`age BETWEEN 40 AND 60`, then you should set the `ordered` parameter to `true`. Otherwise, set it to `false`.

#### Configuring IMap Indexes

Also, you can define `IMap` indexes in configuration. An example is shown below.

```xml
<map name="default">
  ...
  <indexes>
    <index ordered="false">name</index>
    <index ordered="true">age</index>
  </indexes>
</map>
```

You can also define `IMap` indexes using programmatic configuration, as in the example below.

```java
mapConfig.addMapIndexConfig( new MapIndexConfig( "name", false ) );
mapConfig.addMapIndexConfig( new MapIndexConfig( "age", true ) );
```

The following is the Spring declarative configuration for the same sample.

```xml
<hz:map name="default">
  <hz:indexes>
    <hz:index attribute="name"/>
    <hz:index attribute="age" ordered="true"/>
  </hz:indexes>
</hz:map>
```
<br></br>
![image](images/NoteSmall.jpg) ***NOTE:*** *Non-primitive types to be indexed should implement *`Comparable`*.*


#### Copying Indexes

The underlying data structures used by the indexes need to copy the query results to make sure that the results are correct. This copying process is performed either when reading the index from the data structure (on-read) or writing to it (on-write).

On-read copying means that, for each index-read operation, the result of the query is copied before it is sent to the caller. Depending on the query result's size, this type of index copying may be slower since the result is stored in a map, i.e., all entries need to have the hash calculated before being stored. Unlike the index-read operations, each index-write operation is fast, since there will be no copying taking place. So, this option can be preferred in index-write intensive cases.

On-write copying means that each index-write operation completely copies the underlying map to provide the copy-on-write semantics, and this may be a slow operation depending on the index size. Unlike index-write operations, each index-read operation is fast since the operation only includes accessing the map that stores the results and returning them to the caller.

Another option is never copying the results of a query to a separate map. This means the results backed by the underlying index-map can change after the query has been executed (such as an entry might have been added or removed from an index, or it might have been remapped). This option can be preferred if you expect "mostly correct" results, i.e., if it is not a problem when some entries returned in the query result set do not match the initial query criteria. This is the fastest option since there is no copying.

You can set one these options using the system property `hazelcast.index.copy.behavior`. The following values, which are explained in the above paragraphs, can be set:

- `COPY_ON_READ` (the default value)
- `COPY_ON_WRITE`
- `NEVER`
 
<br></br>
![image](images/NoteSmall.jpg) ***NOTE:*** *Usage of this system property is supported for BINARY and OBJECT in-memory formats. Only in Hazelcast 3.8.7, it is also supported for NATIVE in-memory format.*

