

You can also create an index using a query in collections and arrays.

Please note that in order to leverage the index, the attribute name used in the query has to be the same as the one used
in the index definition.

Let's assume you have the following index definition:

```xml
<indexes>
  <index ordered="false">wheels[any].name</index>
</indexes>
```

The following query will use the index:

```java
Predicate p = Predicates.equal('wheels[any].name', 'front-wheel');
```


The following query, however, will NOT leverage the index, since it does not use exactly the same attribute name that
was used in the index:

```java
Predicates.equal('wheels[0].name', 'front-wheel')
```

In order to use the index in the case mentioned above, you have to create another index, as shown below:

```xml
<indexes>
  <index ordered="false">wheels[0].name</index>
</indexes>
```

