
Hazelcast needs to serialize the Java objects that you put into Hazelcast because Hazelcast is a distributed system. The data and its replicas are stored in different partitions on multiple cluster members. The data you need may not be present on the local member, and in that case, Hazelcast retrieves that data from another member. This requires serialization.

Hazelcast serializes all your objects into an instance of `com.hazelcast.nio.serialization.Data`. `Data` is the binary representation of an object. 

Serialization is used when:

- key/value objects are added to a map,
- items are put in a queue/set/list,
- a runnable is sent using an executor service,
- an entry processing is performed within a map,
- an object is locked, and
- a message is sent to a topic.


Hazelcast optimizes the serialization for the basic types and their array types. You cannot override this behavior.

**Default Types**; 

* Byte, Boolean, Character, Short, Integer, Long, Float, Double, String
* byte[], boolean[], char[], short[], int[], long[], float[], double[], String[]
* `java.util.Date`, `java.math.BigInteger`, `java.math.BigDecimal`, `java.lang.Class`

<br><br>
Hazelcast optimizes all of the above object types. You do not need to worry about their (de)serializations.

