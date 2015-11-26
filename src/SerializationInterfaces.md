



## Serialization Interface Types

For complex objects, use the following interfaces for serialization and deserialization.

- `java.io.Serializable` See [Implementing Java Serializable and Externalizable](#implementing-java-serializable-and-externalizable).

- `java.io.Externalizable` See [Implementing Java Externalizable](#implementing-java-externalizable).

- `com.hazelcast.nio.serialization.DataSerializable` See [Implementing DataSerializable](#implementing-dataserializable).

- `com.hazelcast.nio.serialization.IdentifiedDataSerializable` See [Implementing IdentifiedDataSerializable](#implementing-identifieddataserializable)

- `com.hazelcast.nio.serialization.Portable`, and
- Custom Serialization (using [StreamSerializer](#implementing-streamserializer), [ByteArraySerializer](#implementing-bytearrayserializer))


When Hazelcast serializes an object into `Data`:

**(1)** It first checks whether the object is an instance of `com.hazelcast.nio.serialization.DataSerializable`.

**(2)** If the above check fails, then Hazelcast checks if it is an instance of `com.hazelcast.nio.serialization.Portable`.

**(3)** If the above check fails, then Hazelcast checks whether the object is a well-known type like String, Long, or Integer, or if it is a user-specified type like `ByteArraySerializer` or `StreamSerializer`.

**(4)** If the above checks fail, Hazelcast will use Java serialization.

If all of the above checks do not work, then serialization will fail. When a class implements multiple interfaces, the above steps are important to determine the serialization mechanism that Hazelcast will use. When a class definition is required for any of these serializations, you need to have all the classes needed by the application on your classpath because Hazelcast does not download them automatically.

