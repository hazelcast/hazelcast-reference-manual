
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


