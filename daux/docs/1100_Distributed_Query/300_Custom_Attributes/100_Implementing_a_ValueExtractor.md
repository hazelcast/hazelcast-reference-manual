

In order to implement a `ValueExtractor`, extend the abstract `com.hazelcast.query.extractor.ValueExtractor` class
and implement the `extract()` method. This method does not return any value since the extracted value is collected by the `ValueCollector`.
In order to return multiple results from a single extraction, invoke the `ValueCollector.collect()` method
multiple times, so that the collector collects all results.

Please refer to the [`ValueExtractor`](http://docs.hazelcast.org/docs/latest/javadoc/com/hazelcast/query/extractor/ValueExtractor.html) and [`ValueCollector`](http://docs.hazelcast.org/docs/latest/javadoc/com/hazelcast/query/extractor/ValueCollector.html) Javadocs.

#### ValueExtractor with Portable Serialization

Portable serialization is a special kind of serialization where there is no need to have the class of the serialized object on the
classpath in order to read its attributes. That is the reason why the target object passed to the `ValueExtractor.extract()`
method will not be of the exact type that has been stored. Instead, an instance of a `com.hazelcast.query.extractor.ValueReader` will be passed.
`ValueReader` enables reading the attributes of a Portable object in a generic and type-agnostic way.
It contains two methods:

 * `read(String path, ValueCollector<T> collector)` - enables passing all results directly to the `ValueCollector`.
 * `read(String path, ValueCallback<T> callback)` - enables filtering, transforming and grouping the result of the read operation and manually passing it to the `ValueCollector`.

Please refer to the [`ValueReader`](http://docs.hazelcast.org/docs/latest/javadoc/com/hazelcast/query/extractor/ValueReader.html) Javadoc.

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


