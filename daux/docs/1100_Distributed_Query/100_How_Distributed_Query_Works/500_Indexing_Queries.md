
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
![image](../../images/NoteSmall.jpg) ***NOTE:*** *Non-primitive types to be indexed should implement *`Comparable`*.*

<br></br>
![image](../../images/NoteSmall.jpg) ***NOTE:*** *Starting with Hazelcast 3.9, if you configure the data structure to use [High-Density Memory Store](/1500_Storage/100_High-Density_Memory_Store.md) ***and*** indexes, the indexes are automatically stored in the High-Density Memory Store as well. This prevents from running into full GCs, when doing a lot of updates to index.*


#### Indexing Attributes with ValueExtractor

You can also define custom attributes that may be referenced in predicates, queries and indexes. Custom attributes can be defined by implementing a `ValueExtractor`. Please see the [Indexing Custom Attributes section](/1100_Distributed_Query/300_Custom_Attributes/500_Indexing_Custom_Attributes.md) for details.


