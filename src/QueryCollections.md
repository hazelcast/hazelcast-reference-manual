
## Querying in Collections and Arrays

Hazelcast allows querying in collections and arrays.
Querying in collections and arrays is compatible with all Hazelcast serialization methods, including the Portable serialization.


Let's have a look at the following data structure expressed in pseudo-code:

```java
class Motorbike {
    Wheel wheels[2];
}

class Wheel {
   String name;

}
```

In order to query a single element of a collection/array, you can execute the following query:

```java
// it matches all motorbikes where the zero wheel's name is 'front-wheel'
Predicate p = Predicates.equals('wheels[0].name', 'front-wheel');
Collection<Motorbike> result = map.values(p);
```

It is also possible to query a collection/array using the `any` semantic as shown below:

```java
// it matches all motorbikes where any wheel's name is 'front-wheel'
Predicate p = Predicates.equals('wheels[any].name', 'front');
Collection<Motorbike> result = map.values(p);
```

The exact same query may be executed using the `SQLPredicate` as shown below:

```
Predicate p = new SQLPredicate('wheels[any].name', 'front');
Collection<Motorbike> result = map.values(p);
```

`[]` notation applies to both collections and arrays.

### Indexing in Collections and Arrays

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
Predicate p = Predicates.equals('wheels[any].name', 'front-wheel');
```


The following query, however, will NOT leverage the index, since it does not use exactly the same attribute name that
was used in the index:

```java
Predicates.equals('wheels[0].name', 'front-wheel')
```

In order to use the index in the case mentioned above, you have to create another index, as shown below:

```xml
<indexes>
  <index ordered="false">wheels[0].name</index>
</indexes>
```

### Corner cases

Handling of corner cases may be a bit different than in a programming language like `Java`.

Let's have a look at the following examples in order to understand the differences.
To make the analysis simpler, let's assume that there is only one `Motorbike` object stored in a Hazelcast Map.

| Id  | Query                                                 | Data state                          | Extraction Result | Match |
| --- | ----------------------------------------------------- | ----------------------------------- | ----------------- | ----- |
|  1  | Predicates.equals('wheels[7].name', 'front-wheel')    | wheels.size() == 1                  | null              | No    |
|  2  | Predicates.equals('wheels[7].name', null)             | wheels.size() == 1                  | null              | Yes   |
|  3  | Predicates.equals('wheels[0].name', 'front-wheel')    | wheels[0].name == null              | null              | No    |
|  4  | Predicates.equals('wheels[0].name', null)             | wheels[0].name == null              | null              | Yes   |
|  5  | Predicates.equals('wheels[0].name', 'front-wheel')    | wheels[0] == null                   | null              | No    |
|  6  | Predicates.equals('wheels[0].name', null)             | wheels[0] == null                   | null              | Yes   |
|  7  | Predicates.equals('wheels[0].name', 'front-wheel')    | wheels == null                      | null              | No    |
|  8  | Predicates.equals('wheels[0].name', null)             | wheels == null                      | null              | Yes   |


As you can see, **no** `NullPointerException`s or `IndexOutOfBoundException`s are thrown in the extraction process, even
though parts of the expression are `null`.

Looking at examples 4, 6 and 8, we can also easily notice that it is impossible to distinguish which part of the
expression was null.
If we execute the following query `wheels[1].name = null`, it may be evaluated to true because:

* `wheels` collection/array is null.
* `index == 1` is out of bound.
* `name` attribute of the wheels[1] object is `null`.

In order to make the query unambiguous, extra conditions would have to be added, e.g.,
`wheels != null AND wheels[1].name = null`.
