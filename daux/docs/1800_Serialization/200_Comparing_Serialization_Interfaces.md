
The table below provides a comparison between the interfaces listed in the previous section to help you in deciding which interface to use in your applications.

*Serialization Interface*|*Advantages*|*Drawbacks*
:-|:-|:-
**Serializable**|- A standard and basic Java interface <br> - Requires no implementation |- More time and CPU usage <br> - More space occupancy <br> - Not supported by Native clients
**Externalizable**|- A standard Java interface <br> - More CPU and memory usage efficient than Serializable| - Serialization interface must be implemented <br> - Not supported by Native clients
**DataSerializable**| - More CPU and memory usage efficient than Serializable| - Specific to Hazelcast <br> - Not supported by Native clients
**IdentifiedDataSerializable**| - More CPU and memory usage efficient than Serializable <br> - Reflection is not used during deserialization <br> - Supported by all Native Clients| - Specific to Hazelcast <br> - Serialization interface must be implemented <br> - A Factory and configuration must be implemented
**Portable**| - More CPU and memory usage efficient than Serializable <br> - Reflection is not used during deserialization <br> - Versioning is supported <br> Partial deserialization is supported during Queries <br> - Supported by all Native Clients| - Specific to Hazelcast <br> - Serialization interface must be implemented <br> - A Factory and configuration must be implemented <br> - Class definition is also sent with data but stored only once per class
**Custom Serialization**| - Does not require class to implement an interface <br> - Convenient and flexible <br> - Can be based on StreamSerializer ByteArraySerializer|- Serialization interface must be implemented <br> - Plug in and configuration is required



Let's dig into the details of the above serialization mechanisms in the following sections.

