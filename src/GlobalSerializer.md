
## Global Serializer

Global Serializer is identical to [Custom Serializers](#custom-serialization) from the implementation perspective. They are registered as a fallback serializer to handle all other objects if a serializer cannot be located for them.

It can be configured to be responsible from `java.io.Serializable` and `java.io.Externalizable` instances. By default the global serializer does not handle java serialization and they are handled from global serializer.

A Custom serializer should be registered for a specific class type whereas a global serializer will handle all class types if all serializer search steps fail as described in [Serialization Interface Types](#serialization-interface-types).


**Use cases**

* Third party serialization frameworks can be integrated using global serializer.

* For your custom objects, you can implement a single serializer to handle all.
 
* Replace internal java serialization by enabling overrideJavaSerialization option of Global Serializer configuration.


Any Custom Serializer can be used as a Global Serializer. Please to [Custom Serializers](#custom-serialization) for implementation details.

![image](images/NoteSmall.jpg) ***NOTE:*** *Hazelcast needs java serializable objects handled correctly to function properly. If the global serializer is configured to handle Java Serialization, It must properly serialize/deserialize `java.io.Serializable` instances. A Global serializer not doing so will cause hazelcast malfunction*


### Sample Global Serializer

A sample global serializer to integrate a third part serializer


```java
public class GlobalStreamSerializer
    implements StreamSerializer<Object> {

  private SomeThirdPartySerializer someThirdPartySerializer;
  
  private init() {
    //someThirdPartySerializer  = ... 
  }
  
  @Override
  public int getTypeId () {
    return 123; 
  }

  @Override
  public void write( ObjectDataOutput out, Object object ) throws IOException { 
     byte[] bytes = someThirdPartySerializer.encode(object);
     out.writeByteArray(bytes);
  }

  @Override
  public Object read( ObjectDataInput in ) throws IOException { 
    byte[] bytes = in.readByteArray();
    return someThirdPartySerializer.decode(bytes);
  }

  @Override
  public void destroy () {
     someThirdPartySerializer.destroy();
  }
}
```

Now we can register it in the configuration file `hazelcast.xml`, as shown below.

```xml
<serialization>
  <serializers>
    <global-serializer override-java-serialization="true">GlobalStreamSerializer</global-serializer>
  </serializers>
</serialization>
```
