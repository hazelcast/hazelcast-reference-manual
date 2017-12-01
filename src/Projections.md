
## Projections

There are cases where instead of sending all the data returned by a query from a member, you want to transform (strip down) each result object in order to avoid redundant network traffic.

For example, you select all employees based on some criteria, but you just want to return their name instead of the whole Employee object. It is easily doable with the Projection API.

### Projection API

The Projection API provides the method `transform()` which is called on each result object. Its result is then gathered as the final query result entity. You can refer to the [Projection Javadoc](http://docs.hazelcast.org/docs/latest/javadoc/com/hazelcast/projection/Projection.html) for the API's details.

#### Projections and Map Interfaces

Projections are available on `com.hazelcast.core.IMap` only. IMap offers the method `project` to apply the projection logic on the map entries. This method can be called with or without a predicate. You can refer to its [Javadoc](http://docs.hazelcast.org/docs/latest/javadoc/com/hazelcast/core/IMap.html#project-com.hazelcast.projection.Projection-) to see the method details.


### Sample implementation

Let's consider the following domain object stored in an IMap:

```java
public class Employee implements Serializable {

    private String name;

    public Employee() {
    }

    public String getName() {
        return name;
    }

    public void setName(String firstName) {
        this.name = name;
    }
}

```

To return just the names of the Employees, you can run the query in the following way:

```java
        Collection<String> names = employees.project(new Projection<Map.Entry<String, Employee>, String>() {
            @Override
            public String transform(Map.Entry<String, Employee> entry) {
                return entry.getValue().getName();
            }
        }, somePredicate);
```


### Built-In Projections

The `com.hazelcast.projection.Projections` class provides two built-in Projections:

- singleAttribute
- multiAttribute

The `singleAttribute` Projection enables extracting a single attribute from an object (via reflection). For example, `Projection.singleAttribute("address.city")` will extract the `address.city` attribute from the object passed to the Projection.

The `multiAttribute` Projection enables extracting multiples attributes from an object (via reflection). For example, `Projection.multiAttribute("address.city", "postalAddress.city")` will extract both attributes from the object passed to the Projection and return them in an `Object[]` array.