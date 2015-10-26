
## Custom Attributes

It is possible to define custom attributes that may be used in predicates, queries and indexes.
In order to define a custom attribute you need to implement a `com.hazelcast.query.extractor.ValueExtractor`
which encompasses the extraction logic.

### Implementing ValueExtractor

In order to implement your own `ValueExtractor` extend the abstract `com.hazelcast.query.extractor.ValueExtractor` class
and implement the `extract` method.

The `ValueExtractor` interface looks as follows:

```java
/***
 * Common superclass for all extractors.
 *
 * @param <T> type of the target object to extract the value from
 * @param <R> type of the result object - the extracted value
 * @see com.hazelcast.query.extractor.MultiResult
 */
public abstract class ValueExtractor<T, R> {

    /**
     * Extracts custom attribute's value from the given target object.
     *
     * @return extracted value
     */
    public abstract R extract(T target);

}

```

### Defining a Custom Attribute in Java Config

The following snippet demonstrates how to define a custom attribute using a `ValueExtractor`

```java
MapAttributeConfig attributeConfig = new MapAttributeConfig();
attributeConfig.setName("currency");
attributeConfig.setExtractor("com.bank.CurrencyExtractor");

MapConfig mapConfig = new MapConfig();
mapConfig.addMapAttributeConfig(attributeConfig);
```

`currency` is the name of the custom attribute that will be extracted using the `CurrencyExtractor` class.


### Defining a Custom Attribute in XML

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

### Indexing Custom Attributes

You can also create an index on a Custom Attribute.
The name of the attribute used in the index definition has to match the one used in the attributes config.


```xml
<indexes>
  <index ordered="false">currency</index>
</indexes>
```
