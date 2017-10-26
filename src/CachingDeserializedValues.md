

## Caching Deserialized Values

There may be cases where you do not want to deserialize some values in your Hazelcast map again which were already deserialized previously. This way your query operations get faster. This is possible by using the `cache-deserialized-values` element in your declarative Hazelcast configuration, as shown below.

```xml
<hazelcast>
   ...
   ...
   <map name="myMap">
      ...
      <in-memory-format>BINARY</in-memory-format>
      <cache-deserialized-values>INDEX-ONLY</cache-deserialized-values>
      <backup-count>1</backup-count>
      ...
   </map>
   ...
   ...
</hazelcast>
```

The element `cache-deserialized-values` controls the caching of deserialized values. Note that caching makes the query evaluation faster, but it will consume more memory. This element has the following values:

- NEVER: Deserialized values will never be cached.
- INDEX-ONLY: Deserialized values will be cached only when they are inserted into an index.
- ALWAYS: Deserialized values will always be cached.

If you are using portable serialization or your map's in-memory format is `OBJECT` or `NATIVE`, then `cache-deserialized-values` element does not have any effect.