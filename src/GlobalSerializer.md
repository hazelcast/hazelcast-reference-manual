
## Global Serializer

The global serializer is identical to [custom serializers](#custom-serialization) from the implementation perspective. It is registered as a fallback serializer to handle all other objects if a serializer cannot be located for them.

By default, the global serializer does not handle `java.io.Serializable` and `java.io.Externalizable` instances but it can be configured to be responsible for them.

A custom serializer should be registered for a specific class type whereas the global serializer will handle all class types if all the steps in searching for a serializer fail as described in [Serialization Interface Types](#serialization-interface-types).


**Use cases**

* Third party serialization frameworks can be integrated using the global serializer.

* For your custom objects, you can implement a single serializer to handle all.
 
* You can replace the internal Java serialization by enabling the `overrideJavaSerialization` option of the global serializer configuration.


Any custom serializer can be used as the global serializer. Please refer to the [Custom Serialization section](#custom-serialization) for implementation details.

![image](images/NoteSmall.jpg) ***NOTE:*** *For a proper functioning, Hazelcast needs the Java serializable objects to be handled correctly. If the global serializer is configured to handle the Java serialization, it must properly serialize/deserialize the `java.io.Serializable` instances. Otherwise, it causes Hazelcast to malfunction.*


### Sample Global Serializer

A sample global serializer to integrate with a third party serializer is shown below.


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

Now, we can register it in the configuration file `hazelcast.xml`, as shown below.

```xml
<serialization>
  <serializers>
    <global-serializer override-java-serialization="true">GlobalStreamSerializer</global-serializer>
  </serializers>
</serialization>
```
