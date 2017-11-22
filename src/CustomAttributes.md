
## Custom Attributes

It is possible to define a custom attribute that may be referenced in predicates, queries and indexes.

A custom attribute is a "synthetic" attribute that does not exist as a `field` or a `getter` in the object that it is extracted from.
Thus, it is necessary to define the policy on how the attribute is supposed to be extracted.
Currently the only way to extract a custom attribute is to implement a `com.hazelcast.query.extractor.ValueExtractor`
that encompasses the extraction logic.

Custom Attributes are compatible with all Hazelcast serialization methods, including the Portable serialization.

### Implementing a ValueExtractor

In order to implement a `ValueExtractor`, extend the abstract `com.hazelcast.query.extractor.ValueExtractor` class
and implement the `extract()` method. This method does not return any values since the extracted value is collected by the `ValueCollector`.
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


### Extraction Arguments

A `ValueExtractor` may use a custom argument if it is specified in the query.
The custom argument may be passed within the square brackets located after the name of the custom attribute,
e.g., `customAttribute[argument]`.

Let's have a look at the following query: `currency[incoming] == EUR`
The `currency` is a custom attribute that uses a `com.test.CurrencyExtractor` for extraction.

The string `incoming` is an argument that will be passed to the `ArgumentParser` during the extraction.
The parser will parse the string according to the parser's custom logic and it will return a parsed object.
The parsed object may be a single object, array, collection, or any arbitrary object.
It is up to the `ValueExtractor`'s implementor to understand the semantics of the parsed argument object.

For now it is **not** possible to register a custom `ArgumentParser`, thus a default parser is used.
It follows a `pass-through` semantic, which means that the string located in the square brackets is passed "as is" to
the `ValueExtractor.extract()` method.

Please note that using square brackets within the argument string is not allowed.

### Configuring a Custom Attribute Programmatically

The following snippet demonstrates how to define a custom attribute using a `ValueExtractor`.

```java
MapAttributeConfig attributeConfig = new MapAttributeConfig();
attributeConfig.setName("currency");
attributeConfig.setExtractor("com.bank.CurrencyExtractor");

MapConfig mapConfig = new MapConfig();
mapConfig.addMapAttributeConfig(attributeConfig);
```

`currency` is the name of the custom attribute that will be extracted using the `CurrencyExtractor` class.

Keep in mind that an extractor may not be added after the map has been instantiated.
All extractors have to be defined upfront in the map's initial configuration.

### Configuring a Custom Attribute Declaratively

The following snippet demonstrates how to define a custom attribute in the Hazelcast XML Configuration.

```xml
<map name="trades">
   <attributes>
       <attribute extractor="com.bank.CurrencyExtractor">currency</attribute>
   </attributes>
</map>
```

Analogous to the example above, `currency` is the name of the custom attribute that will be extracted using the
`CurrencyExtractor` class.

Please note that an attribute name may begin with an ASCII letter [A-Za-z] or digit [0-9] and may contain
ASCII letters [A-Za-z], digits [0-9] or underscores later on.

### Indexing Custom Attributes

You can create an index using a custom attribute.

The name of the attribute used in the index definition has to match the one used in the attributes configuration.

Defining indexes with extraction arguments is allowed, as shown in the example below:

```xml
<indexes>
    <!-- custom attribute without an extraction argument -->
    <index ordered="true">currency</index>

    <!-- custom attribute using an extraction argument -->
    <index ordered="true">currency[EUR]</index>
</indexes>
```
