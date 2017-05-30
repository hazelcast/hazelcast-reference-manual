
As mentioned in [Implementing Java Serializable & Externalizable](02_Implementing_Java_Serializable_and_Externalizable.md), Java serialization is an easy mechanism. However, it does not control how fields are serialized or deserialized. Moreover, Java serialization can lead to excessive CPU loads since it keeps track of objects to handle the cycles and streams class descriptors. These are performance decreasing factors; thus, serialized data may not have an optimal size.

The `DataSerializable` interface of Hazelcast overcomes these issues. Here is an example of a class implementing the `com.hazelcast.nio.serialization.DataSerializable` interface.

```java
public class Address implements DataSerializable {
  private String street;
  private int zipCode;
  private String city;
  private String state;

  public Address() {}

  //getters setters..

  public void writeData( ObjectDataOutput out ) throws IOException {
    out.writeUTF(street);
    out.writeInt(zipCode);
    out.writeUTF(city);
    out.writeUTF(state);
  }

  public void readData( ObjectDataInput in ) throws IOException {
    street = in.readUTF();
    zipCode = in.readInt();
    city = in.readUTF();
    state = in.readUTF();
  }
}
```

#### Reading and Writing and DataSerializable

Let's take a look at another example which encapsulates a `DataSerializable` field. 

Since the `address` field itself is `DataSerializable`, it calls `address.writeData(out)` when writing and `address.readData(in)` when reading. Also note that you should have writing and reading of the fields occur 
in the same order. When Hazelcast serializes a `DataSerializable`, it writes the `className` first. When Hazelcast deserializes it, `className` is used to instantiate the object using reflection.


```java
public class Employee implements DataSerializable {
  private String firstName;
  private String lastName;
  private int age;
  private double salary;
  private Address address; //address itself is DataSerializable

  public Employee() {}

  //getters setters..

  public void writeData( ObjectDataOutput out ) throws IOException {
    out.writeUTF(firstName);
    out.writeUTF(lastName);
    out.writeInt(age);
    out.writeDouble (salary);
    address.writeData (out);
  }

  public void readData( ObjectDataInput in ) throws IOException {
    firstName = in.readUTF();
    lastName = in.readUTF();
    age = in.readInt();
    salary = in.readDouble();
    address = new Address();
    // since Address is DataSerializable let it read its own internal state
    address.readData(in);
  }
}
```

As you can see, since the `address` field itself is `DataSerializable`, it calls `address.writeData(out)` when writing and `address.readData(in)` when reading. Also note that you should have writing and reading of the fields occur in the same order. While Hazelcast serializes a `DataSerializable`, it writes the `className` first. When Hazelcast deserializes it, `className` is used to instantiate the object using reflection.

![image](../images/NoteSmall.jpg) ***NOTE:*** *Since Hazelcast needs to create an instance during deserialization,`DataSerializable` class has a no-arg constructor.*

![image](../images/NoteSmall.jpg) ***NOTE:*** *`DataSerializable` is a good option if serialization is only needed for in-cluster communication.*

![image](../images/NoteSmall.jpg) ***NOTE:*** *`DataSerializable` is not supported by non-Java clients as it uses Java reflection. If you need non-Java clients, please use [`IdentifiedDataSerializable`](#identifieddataserializable) or [`Portable`](/04_Implementing_Portable_Serialization).*


### IdentifiedDataSerializable

For a faster serialization of objects, avoiding reflection and long class names, Hazelcast recommends you implement `com.hazelcast.nio.serialization.IdentifiedDataSerializable` which is a slightly better version of `DataSerializable`.

`DataSerializable` uses reflection to create a class instance, as mentioned in [Implementing DataSerializable](03_Implementing_DataSerializable.md). But `IdentifiedDataSerializable` uses a factory for this purpose and it is faster during deserialization, which requires new instance creations.

#### getID and getFactoryId Methods

`IdentifiedDataSerializable` extends `DataSerializable` and introduces two new methods.

-   `int getId();`
-   `int getFactoryId();`


`IdentifiedDataSerializable` uses `getId()` instead of class name, and it uses `getFactoryId()` to load the class when given the Id. To complete the implementation, you should also implement  `com.hazelcast.nio.serialization.DataSerializableFactory` and register it into `SerializationConfig`, which can be accessed from `Config.getSerializationConfig()`. Factory's responsibility is to return an instance of the right `IdentifiedDataSerializable` object, given the Id. This is currently the most efficient way of Serialization that Hazelcast supports off the shelf.

#### Implementing IdentifiedDataSerializable

Let's take a look at the following example code and configuration to see `IdentifiedDataSerializable` in action.

```java
public class Employee
    implements IdentifiedDataSerializable {
     
  private String surname;
  
  public Employee() {}
  
  public Employee( String surname ) { 
    this.surname = surname;
  }
  
  @Override
  public void readData( ObjectDataInput in ) 
      throws IOException {
    this.surname = in.readUTF();
  }
  
  @Override
  public void writeData( ObjectDataOutput out )
      throws IOException { 
    out.writeUTF( surname );
  }
  
  @Override
  public int getFactoryId() { 
    return EmployeeDataSerializableFactory.FACTORY_ID;
  }
  
  @Override
  public int getId() { 
    return EmployeeDataSerializableFactory.EMPLOYEE_TYPE;
  }
   
  @Override
  public String toString() {
    return String.format( "Employee(surname=%s)", surname ); 
  }
}
```
 
The methods `getId` and `getFactoryId` return a unique positive number within the `EmployeeDataSerializableFactory`. Now, let's create an instance of this `EmployeeDataSerializableFactory`.

```java
public class EmployeeDataSerializableFactory 
    implements DataSerializableFactory{
   
  public static final int FACTORY_ID = 1;
   
  public static final int EMPLOYEE_TYPE = 1;

  @Override
  public IdentifiedDataSerializable create(int typeId) {
    if ( typeId == EMPLOYEE_TYPE ) { 
      return new Employee();
    } else {
      return null; 
    }
  }
}
```

The only method you should implement is `create`, as seen in the above example. It is recommended that you use a `switch-case` statement instead of multiple `if-else` blocks if you have a lot of subclasses. Hazelcast throws an exception if null is returned for `typeId`.

#### Registering EmployeeDataSerializableFactory

As the last step, you need to register `EmployeeDataSerializableFactory` declaratively (declare in the configuration file `hazelcast.xml`) as shown below. Note that `factory-id` has the same value of `FACTORY_ID` in the above code. This is crucial to enable Hazelcast to find the correct factory.

```xml
<hazelcast> 
  ...
  <serialization>
    <data-serializable-factories>
      <data-serializable-factory factory-id="1">
        EmployeeDataSerializableFactory
      </data-serializable-factory>
    </data-serializable-factories>
  </serialization>
  ...
</hazelcast>
```


***RELATED INFORMATION***


*Please refer to the [Serialization Configuration Wrap-Up section](08_Serialization_Configuration_Wrap-Up.md) for a full description of Hazelcast Serialization configuration.*

 