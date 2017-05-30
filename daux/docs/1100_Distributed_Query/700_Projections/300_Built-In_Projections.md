
The `com.hazelcast.projection.Projections` class provides two built-in Projections:

- singleAttribute
- multiAttribute

The `singleAttribute` Projection enables extracting a single attribute from an object (via reflection). For example, `Projection.singleAttribute("address.city")` will extract the `address.city` attribute from the object passed to the Projection.

The `multiAttribute` Projection enables extracting multiples attributes from an object (via reflection). For example, `Projection.multiAttribute("address.city", "postalAddress.city")` will extract both attributes from the object passed to the Projection and return them in an `Object[]` array.