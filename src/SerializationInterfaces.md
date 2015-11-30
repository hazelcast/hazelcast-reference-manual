



## Serialization Interface Types

For complex objects, use the following interfaces for serialization and deserialization.

- `java.io.Serializable` See [Implementing Java Serializable and Externalizable](#implementing-java-serializable-and-externalizable).

- `java.io.Externalizable` See [Implementing Java Externalizable](#implementing-java-externalizable).

- `com.hazelcast.nio.serialization.DataSerializable` See [Implementing DataSerializable](#implementing-dataserializable).

- `com.hazelcast.nio.serialization.IdentifiedDataSerializable` See [Implementing IdentifiedDataSerializable](#implementing-identifieddataserializable)

- `com.hazelcast.nio.serialization.Portable`, and

- Custom Serialization (using [StreamSerializer](#implementing-streamserializer), [ByteArraySerializer](#implementing-bytearrayserializer))

- Global Serializer, see [Global Serializer](#global-serializer) for details.


**When Hazelcast serializes an object into `Data`:

**(1)** It first checks whether the object is `null`

**(2)** If the above check fails, then Hazelcast checks if it is an instance of `com.hazelcast.nio.serialization.DataSerializable` or `com.hazelcast.nio.serialization.IdentifiedDataSerializable`.

**(3)** If the above check fails, then Hazelcast checks if it is an instance of `com.hazelcast.nio.serialization.Portable`.

**(4)** If the above check fails, then Hazelcast checks if it is an instance of one of the default types, (see above for default types) 

**(5)** If the above check fails, then Hazelcast search for a user-specified [Custom Serializer](#custom-serializer) , i.e. an implementation of `ByteArraySerializer` or `StreamSerializer`. Custom serializer is searched using the input Object's Class and its parent class up to Object. If parent class search fail, all interfaces implemented by the class are also checked (excluding `java.io.Serializable` and `java.io.Externalizable` ) 

**(6)** If the above checks fail, then Hazelcast checks if it is an instance of `java.io.Serializable` and `java.io.Externalizable` and a Global Serializer is not registered with Java Serialization Override feature

**(7)** If the above checks fail, Hazelcast will use the registered Global Serializer if one exist.

If all of the above checks do not work, then serialization will fail. When a class implements multiple interfaces, the above steps are important to determine the serialization mechanism that Hazelcast will use. When a class definition is required for any of these serializations, you need to have all the classes needed by the application on your classpath because Hazelcast does not download them automatically.

