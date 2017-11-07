
The Config Properties SPI is an easy way that you can configure SPI plugins using a prebuilt system of automatic conversion and validation.

### Config Properties SPI Classes

The Config Properties SPI consists of a small set of classes and provided implementations.

#### PropertyDefinition: Define a Single Property

The `com.hazelcast.config.properties.PropertyDefinition` interface defines a single property inside a given configuration. It consists of a key string and type (in form of a `com.hazelcast.core.TypeConverter`).

You can mark properties as optional and you can have an additional validation step to make sure the provided value matches certain rules (like port numbers must be between 0-65535 or similar).

#### SimplePropertyDefinition: Basic PropertyDefinition

For convenience, the `com.hazelcast.config.properties.SimplePropertyDefinition` class is provided. This class is a basic implementation of the `PropertyDefinition` interface and should be enough for most situations. In case of additional needs, you are free to provide your own implementation of the `PropertyDefinition` interface.
  
#### PropertyTypeConverter: Set of TypeConverters

The `com.hazelcast.config.properties.PropertyTypeConverter` enum provides a preset of `TypeConverter`s. Provided are the most common basic types:

 - String
 - Short
 - Integer
 - Long
 - Float
 - Double
 - Boolean
 
#### ValueValidator and ValidationException

The `com.hazelcast.config.properties.ValueValidator` interface implements additional value validation. The configured value will be validated before it is returned to the requester. If validation fails, a `com.hazelcast.config.properties.ValidationException` is thrown and the requester has to handle it or throw the exception further.

### Config Properties SPI Example

This sub-section will show a quick example of how to setup, configure and use the Config Properties SPI.

#### Defining a Config PropertyDefinition

Defining a property is as easy as giving it a name and a type.

```java
PropertyDefinition property = new SimplePropertyDefinition(
    "my-key", PropertyTypeConverter.STRING
);
```

We defined a property named `my-key` with a type of a string. If none of the predefined `TypeConverter`s matches the need, users are free to provide their own implementation.

#### Providing a value in XML

The above property is now configurable in two ways:

```xml
<!-- option 1 -->
<my-key>value</my-key>

<!-- option 2 -->
<property name="my-key">value</property>
```

![image](../images/NoteSmall.jpg) ***NOTE:*** *In any case, both options are useable interchangeably, however the later version is recommended by Hazelcast for schema applicability.* 

#### Retrieving a PropertyDefinition Value

To eventually retrieve a value, use the `PropertyDefinition` to get and convert the value automatically.
 
```java
public <T> T getConfig( PropertyDefinition property, 
                        Map<String, Comparable> properties ) {

  Map<String, Comparable> properties = ...;
  TypeConverter typeConverter = property.typeConverter();

  Comparable value = properties.get( property.key() );
  return typeConverter.convert( value );
}
```
