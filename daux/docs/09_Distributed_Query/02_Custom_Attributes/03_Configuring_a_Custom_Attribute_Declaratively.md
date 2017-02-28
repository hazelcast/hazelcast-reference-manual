
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
