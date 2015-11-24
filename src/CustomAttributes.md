
## Custom Attributes

It is possible to define a custom attribute that may be referenced in predicates, queries and indexes.

A custom attribute is a "synthetic" attribute which does not exist as a `field` or a `getter` in the object that it is extracted from.
Thus, it is required to define the policy how the attribute is supposed to be extracted.
Currently, the only way to extract a custom attribute is to implement a `com.hazelcast.query.extractor.ValueExtractor`
which encompasses the extraction logic.

### Implementing a ValueExtractor

In order to implement a `ValueExtractor` just extend the abstract `com.hazelcast.query.extractor.ValueExtractor` class
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

The `extract()` method does not return any value since the extracted value is collected by the ValueCollector.
In order to return multiple results from a single extraction just invoke the `ValueCollector.collect()` method
multiple times, so that the collector collects all results.

Here's the `ValueCollector` contract:

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
wheels so there are two names too. In order to return both values from the extraction operation just collect them
separately using the `ValueCollector`. Collecting multiple values in such a way allows operating on these multiple
values as if they were single-values during the evaluation of the predicates.

Let's assume that we registered a custom extractor with the name `wheelName` and executed the following query:
`wheelName = front-wheel`.

The extraction may return up to two wheel names for each Motorbike since each Motorbike has up to two wheels.
In such a case, it is enough if a single value evaluates the predicate's condition to true to return a match, so
it will return a Motorbike if "any" of the wheels matches the expression.


### Extraction Arguments

A `ValueExtractor` may use a custom argument if it is specified in the query.
The custom argument may be passed within the square brackets located after the name of the custom attribute,
e.g. `customAttribute[argument]`.

Let's have a look at the following query: `currency[incoming] == EUR`
The `currency` is a custom attribute that uses a `com.test.CurrencyExtractor` for extraction.

The string `incoming` is an argument that will be passed to the `ArgumentParser` during the extraction.
The parser will parse the string according to the parser's custom logic and it will return a parsed object.
The parsed object may be a single object, array, collection, or any arbitrary object.
It's up to the `ValueExtractor`'s implementor to understand the semantics of the parsed argument object.

For now, it's **not** possible to register a custom `ArgumentParser`, thus a default parser is used.
It follows a `pass-through` semantic, which means that the string located in the square-brackets is passed `as-is` to
the `ValueExtractor.extract()` method.

Please note that it is not allowed to use square brackets within the argument string.

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

Please, bear in mind that an extractor may not be added after the map has been instantiated.
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

Analogously to the example above, `currency` is the name of the custom attribute that will be extracted using the
`CurrencyExtractor` class.

Please note that it is not allowed to use dots or square brackets in the name of a custom attribute.

### Indexing Custom Attributes

You can create an index using a custom attribute.

The name of the attribute used in the index definition has to match the one used in the attributes configuration.

It is allowed to define indexes with extraction arguments, as shown in the example below:

```xml
<indexes>
    <!-- custom attribute without an extraction argument -->
    <index ordered="true">currency</index>

    <!-- custom attribute using an extraction argument -->
    <index ordered="true">currency[EUR]</index>
</indexes>
```
