
The last step is to register the `Factory` to the `SerializationConfig`. Below are the programmatic and declarative configurations for this step.


```java
Config config = new Config();
config.getSerializationConfig().addPortableFactory( 1, new MyPortableFactory() );
```


```xml
<hazelcast>
  <serialization>
    <portable-version>0</portable-version>
    <portable-factories>
      <portable-factory factory-id="1">
          com.hazelcast.nio.serialization.MyPortableFactory
      </portable-factory>
    </portable-factories>
  </serialization>
</hazelcast>
```


Note that the `id` that is passed to the `SerializationConfig` is the same as the `factoryId` that the `Foo` class returns.
