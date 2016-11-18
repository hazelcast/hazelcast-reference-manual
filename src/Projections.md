
## Projections

There are cases where instead of sending all the data returned by a query from a Node we want to transform (strip down) each result object in order to avoid redundant network traffic.
For example, we select all employees based on some criteria, but we just want to return their name instead of the whole Employee object.
It is easy doable with the Projection API.

### The Projections's API

The API of the Projection looks as follows:

```java
package com.hazelcast.projection;

import java.io.Serializable;

/**
 * Enables transforming object into other objects.
 * Exemplary usage scenario is the project() method of the {@link com.hazelcast.core.IMap}
 * <p>
 * Only 1:1 transformations allowed. Use an Aggregator to perform N:1 aggregations.
 *
 * @param <I> input type
 * @param <O> output type
 */
public abstract class Projection<I, O> implements Serializable {

    /**
     * Transforms the input object into the output object.
     *
     * @param input object.
     * @return the output object.
     */
    public abstract O transform(I input);

}

```

The `transform()` method is called on each result object. Its result is then gathered as the final query result entity.

#### Projections and Map Interfaces

Projections are available on `com.hazelcast.core.IMap` only.

There are two methods that enable using the Projections:

```java
/**
     * Applies the projection logic on all map entries and returns the result
     *
     * @param projection projection to transform the entries with. May return null.
     * @param <R>        type of the result
     * @return the result of the given type
     */
    <R> Collection<R> project(Projection<Map.Entry<K, V>, R> projection);

    /**
     * Applies the projection logic on map entries filtered with the Predicated and returns the result
     *
     * @param projection projection to transform the entries with. May return null.
     * @param predicate  predicate to filter the entries with
     * @param <R>        type of the result
     * @return the result of the given type
     */
    <R> Collection<R> project(Projection<Map.Entry<K, V>, R> projection, Predicate<K, V> predicate);
```


### Sample implementation

Let's consider the following domain object stored in an IMap.

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

In order to return just the names the Employees the user can run the Query in the following way:

```java
        Collection<String> names = employees.project(new Projection<Map.Entry<String, Employee>, String>() {
            @Override
            public String transform(Map.Entry<String, Employee> entry) {
                return entry.getValue().getName();
            }
        }, somePredicate);
```


