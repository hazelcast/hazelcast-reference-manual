
## Config Properties SPI

The Config Properties SPI is an easy way to add configuration to SPI plugins using a prebuilt system of automatic conversion and validation.

### Config Properties SPI Overview

The Config Properties SPI consists of a small set of classes and provided implementations.

#### PropertyDefinition and SimplePropertyDefinition

The `com.hazelcast.config.properties.PropertyDefinition` interface defines a single property inside a given configuration. It is by a key string and type (in form of a `com.hazelcast.core.TypeConverter`).

Properties can be marked as optional and can have an additional validation step to make sure the provided value matches certain rules (like port numbers must be between 0-65535 or similar).

For convenience the `com.hazelcast.config.properties.SimplePropertyDefinition` class is provided. It is a basic implementation of the `PropertyDefinition` interface and should be enough for most situations. In case additional needs exists, users are free to provide their own implementation of the `PropertyDefinition` interface.
  
#### PropertyTypeConverter

The `com.hazelcast.config.properties.PropertyTypeConverter` enum provides a preset of `TypeConverter`s. Provided are the most common basic types:

 - String
 - Short
 - Integer
 - Long
 - Float
 - Double
 - Boolean
 
#### ValueValidator and ValidationException

The `com.hazelcast.config.properties.ValueValidator` interface can be used to implement additional value validation. The configured value will be validated before it is returned to the requester. If validation fails a `com.hazelcast.config.properties.ValidationException` is thrown and the requester has to handle it or throw it further.

### Config Properties SPI Example

This sub-section will show a quick example of how to setup, configure and use the Config Properties SPI.

#### Defining a Config PropertyDefinition
Defining a property is as easy as to give it a name and a type.

```java
PropertyDefinition property = new SimplePropertyDefinition(
    "my-key", PropertyTypeConverter.STRING
);
```

We now defined a property named `my-key` with a type of a string. If non of the predefined `TypeConverter`s matches the need, users are free to provide their own implementation.

#### Providing a value in XML

The above property is now configurable in two ways:

```xml
<!-- option 1 -->
<my-key>value</my-key>

<!-- option 2 -->
<property name="my-key">value</property>
```

![image](images/NoteSmall.jpg) ***NOTE:*** *In any case, both options are useable interchangeably, however the later version is recommended by Hazelcast for schema applicability.* 

#### Retrieving a PropertyDefinition value

To eventually retrieve a value the `PropertyDefinition` can be used to get and convert the value automatically.
 
```java
public <T> T getConfig( PropertyDefinition property, 
                        Map<String, Comparable> properties ) {

  Map<String, Comparable> properties = ...;
  TypeConverter typeConverter = property.typeConverter();

  Comparable value = properties.get( property.key() );
  return typeConverter.convert( value );
}
```
