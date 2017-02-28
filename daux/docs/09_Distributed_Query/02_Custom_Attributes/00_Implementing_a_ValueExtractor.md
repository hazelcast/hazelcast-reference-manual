

In order to implement a `ValueExtractor`, extend the abstract `com.hazelcast.query.extractor.ValueExtractor` class
and implement the `extract()` method.

The `ValueExtractor` interface looks as follows:

```java
/***
 * Common superclass for all extractors.
 *
 * @param <T> type of the target object to extract the value from
 * @param <A> type of the extraction argument object passed to the extract() method
 *
 */
public abstract class ValueExtractor<T, A> {

    /**
     * Extracts custom attribute's value from the given target object.
     *
     * @param target    object to extract the value from
     * @param argument  extraction argument
     * @param collector collector of the extracted value(s)
     *
     */
    public abstract void extract(T target, A argument, ValueCollector collector);

}
```

The `extract()` method does not return any value since the extracted value is collected by the `ValueCollector`.
In order to return multiple results from a single extraction, invoke the `ValueCollector.collect()` method
multiple times, so that the collector collects all results.

Here is the `ValueCollector` contract:

```java
/**
 * Enables collecting values extracted by a {@see com.hazelcast.query.extractor.ValueExtractor}
 */
public abstract class ValueCollector {

    /**
     * Collects a value extracted by a ValueExtractor.
     * <p/>
     * More than one value may be collected in a single extraction
     *
     * @param value value to be collected
     */
    public abstract void addObject(Object value);

}
```

#### ValueExtractor with Portable Serialization

Portable serialization is a special kind of serialization where there is no need to have the class of the serialized object on the
classpath in order to read its attributes. That is the reason why the target object passed to the `ValueExtractor.extract()`
method will not be of the exact type that has been stored. Instead, an instance of a `com.hazelcast.query.extractor.ValueReader` will be passed.
`ValueReader` enables reading the attributes of a Portable object in a generic and type-agnostic way.
It contains two methods:

 * `read(String path, ValueCollector<T> collector)` - enables passing all results directly to the `ValueCollector`.
 * `read(String path, ValueCallback<T> callback)` - enables filtering, transforming and grouping the result of the read operation and manually passing it to the `ValueCollector`.

Here is the `ValueReader` contract:

```java
/**
 * Enables reading the value of the attribute specified by the path
 * <p>
 * The path may be:
 * - simple -> it includes a single attribute only, like "name"
 * - nested -> it includes more then a single attribute separated with a dot (.), e.g. person.address.city
 * <p>
 * The path may also includes array cells:
 * - specific quantifier, like person.leg[1] -> returns the leg with index 1
 * - wildcard quantifier, like person.leg[any] -> returns all legs
 * <p>
 * The wildcard quantifier may be used a couple of times, like person.leg[any].finger[any] which returns all fingers
 * from all legs.
 */
public abstract class ValueReader {

    /**
     * Read the value of the attribute specified by the path and returns the result via the callback.
     *
     */
    public abstract <T> void read(String path, ValueCallback<T> callback) throws ValueReadingException;

    /**
     * Read the value of the attribute specified by the path and returns the result directly to the collector.
     *
     */
    public abstract <T> void read(String path, ValueCollector<T> collector) throws ValueReadingException;

}

```

#### Returning Multiple Values from a Single Extraction

It sounds counter-intuitive, but a single extraction may return multiple values when arrays or collections are
involved.
Let's have a look at the following data structure in pseudo-code:

```java
class Motorbike {
    Wheel wheel[2];
}

class Wheel {
    String name;
}
```

Let's assume that we want to extract the names of all wheels from a single motorbike object. Each motorbike has two
wheels so there are two names for each bike. In order to return both values from the extraction operation, collect them
separately using the `ValueCollector`. Collecting multiple values in this way allows you to operate on these multiple
values as if they were single values during the evaluation of the predicates.

Let's assume that we registered a custom extractor with the name `wheelName` and executed the following query:
`wheelName = front-wheel`.

The extraction may return up to two wheel names for each `Motorbike` since each `Motorbike` has up to two wheels.
In such a case, it is enough if a single value evaluates the predicate's condition to true to return a match, so
it will return a `Motorbike` if "any" of the wheels matches the expression.


