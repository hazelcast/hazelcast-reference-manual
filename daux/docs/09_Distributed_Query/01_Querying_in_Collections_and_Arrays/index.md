
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
Predicate p = Predicates.equal('wheels[0].name', 'front-wheel');
Collection<Motorbike> result = map.values(p);
```

It is also possible to query a collection/array using the `any` semantic as shown below:

```java
// it matches all motorbikes where any wheel's name is 'front-wheel'
Predicate p = Predicates.equal('wheels[any].name', 'front');
Collection<Motorbike> result = map.values(p);
```

The exact same query may be executed using the `SQLPredicate` as shown below:

```
Predicate p = new SQLPredicate('wheels[any].name', 'front');
Collection<Motorbike> result = map.values(p);
```

`[]` notation applies to both collections and arrays.

