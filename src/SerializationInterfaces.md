



## Serialization Interface Types

For complex objects, use the following interfaces for serialization and deserialization.

- `java.io.Serializable`: Please see the [Implementing Java Serializable and Externalizable section](#implementing-java-serializable-and-externalizable).

- `java.io.Externalizable`: Please see the [Implementing Java Externalizable section](#implementing-java-externalizable).

- `com.hazelcast.nio.serialization.DataSerializable`: Please see the [Implementing DataSerializable section](#implementing-dataserializable).

- `com.hazelcast.nio.serialization.IdentifiedDataSerializable`: Please see the [IdentifiedDataSerializable section](#identifieddataserializable).

- `com.hazelcast.nio.serialization.Portable`: Please see the [Implementing Portable Serialization section](#implementing-portable-serialization).

- Custom Serialization (using [StreamSerializer](#implementing-streamserializer) and [ByteArraySerializer](#implementing-bytearrayserializer)).

- Global Serializer: Please see the [Global Serializer section](#global-serializer) for details.


When Hazelcast serializes an object into `Data`:

**(1)** It first checks whether the object is `null`.

**(2)** If the above check fails, then Hazelcast checks if it is an instance of `com.hazelcast.nio.serialization.DataSerializable` or `com.hazelcast.nio.serialization.IdentifiedDataSerializable`.

**(3)** If the above check fails, then Hazelcast checks if it is an instance of `com.hazelcast.nio.serialization.Portable`.

**(4)** If the above check fails, then Hazelcast checks if it is an instance of one of the default types (see the [Serialization chapter introduction](#serialization) for default types).

**(5)** If the above check fails, then Hazelcast looks for a user-specified [Custom Serializer](#custom-serialization), i.e. an implementation of `ByteArraySerializer` or `StreamSerializer`. Custom serializer is searched using the input Object's Class and its parent class up to Object. If parent class search fails, all interfaces implemented by the class are also checked (excluding `java.io.Serializable` and `java.io.Externalizable`). 

**(6)** If the above check fails, then Hazelcast checks if it is an instance of `java.io.Serializable` or `java.io.Externalizable` and a Global Serializer is not registered with Java Serialization Override feature.

**(7)** If the above check fails, Hazelcast will use the registered Global Serializer if one exists.

If all of the above checks fail, then serialization will fail. When a class implements multiple interfaces, the above steps are important to determine the serialization mechanism that Hazelcast will use. When a class definition is required for any of these serializations, you need to have all the classes needed by the application on your classpath because Hazelcast does not download them automatically, unless you are using [user code deployment](#member-user-code-deployment-beta).

