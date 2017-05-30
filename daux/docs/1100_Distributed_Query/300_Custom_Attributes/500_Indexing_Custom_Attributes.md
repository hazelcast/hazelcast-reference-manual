
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
