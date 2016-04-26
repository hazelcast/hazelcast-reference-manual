



## C++ Client


You can use Native C++ Client to connect to Hazelcast cluster members and perform almost all operations that a member can perform. Clients differ from members in that clients do not hold data. The C++ Client is by default a smart client, i.e. it knows where the data is and asks directly for the correct member. You can disable this feature (using the `ClientConfig::setSmart` method) if you do not want the clients to connect to every member.

The features of C++ Clients are:

- Access to distributed data structures (IMap, IQueue, MultiMap, ITopic, etc.).
- Access to transactional distributed data structures (TransactionalMap, TransactionalQueue, etc.).
- Ability to add cluster listeners to a cluster and entry/item listeners to distributed data structures.
- Distributed synchronization mechanisms with ILock, ISemaphore and ICountDownLatch.


### Setting Up C++ Client

Hazelcast C++ Client is shipped with 32/64 bit, shared and static libraries. You only need to include the boost *shared_ptr.hpp* header in your compilation since the API makes use of the boost `shared_ptr`.


The downloaded release folder consists of:

- Mac_64/
- Windows_32/
- Windows_64/
- Linux_32/
- Linux_64/
- docs/ *(HTML Doxygen documents are here)*


Each of the folders above contains the following:

- examples/
	There are a number of examples in this folder for each feature. Each example produces an executable which can be run in a cluster, you may need to set the server IP addresses for the examples to run.

- hazelcast/
	- lib/ => Contains both shared and static library of hazelcast.
	- include/ => Contains headers of client.

- external/
	- include/ => Contains headers of dependencies. (boost::shared_ptr)

### Installing C++ Client
The C++ Client is tested on Linux 32/64-bit, Mac 64-bit and Windows 32/64-bit machines. For each of the headers above, it is assumed that you are in the correct folder for your platform. Folders are Mac_64, Windows_32, Windows_64, Linux_32 or Linux_64.

### Compiling C++ Client
For compilation, you need to include the hazelcast/include and external/include folders in your distribution. You also need to link your application to the appropriate static or shared library.

#### Linux C++ Client

For Linux, there are two distributions: 32 bit and 64 bit.

Here is an example script to build with static library:

`g++ main.cpp -pthread -I./external/include -I./hazelcast/include
      ./hazelcast/lib/libHazelcastClientStatic_64.a`

Here is an example script to build with shared library:

`g++ main.cpp -lpthread -Wl,–no-as-needed -lrt -I./external/include -I./hazelcast/include -L./hazelcast/lib -lHazelcastClientShared_64`

#### Mac C++ Client

For Mac, there is one distribution: 64 bit.

Here is an example script to build with static library:

`g++ main.cpp -I./external/include -I./hazelcast/include ./hazelcast/lib/libHazelcastClientStatic_64.a`

Here is an example script to build with shared library:

`g++ main.cpp -I./external/include -I./hazelcast/include -L./hazelcast/lib -lHazelcastClientShared_64`

#### Windows C++ Client

For Windows, there are two distributions; 32 bit and 64 bit. The static library is located in a folder named "static" while the dynamic library(dll) is in the folder named as "shared".

When compiling for Windows environment the user should specify one of the following flags:
    HAZELCAST_USE_STATIC: You want the application to use the static Hazelcast library.
    HAZELCAST_USE_SHARED: You want the application to use the shared Hazelcast library.

### Serialization Support
C++ client supports the following types of object serializations:
1. Builtin primitive types: Some primitive types have builtin support for serialization. These are char, unsigned char(byte), bool, short, int, long, float, double, stl string and vector of these primitive types. 
2. IdentifiedDataSerializable: This interface enables a fast serialization by providing unique the factory and class ids. It requires server side class as well.
3. Portable Serialization: This serialization carries the meta data for the object structure. If no server side deserialization is needed, then the server side implementation may not be needed.
4. Custom Serialization: This serialization allow the use use an external custom serialization. E.g. google protobuf. It also allows serialization support without modifying user's existing libraries where object classes exist. 

#### Custom Serialization      
If your all classes that needs to be serialized inherited from same class you can use an implementation like following:
```
    class  MyCustomSerializer : public serialization::Serializer<ExampleBaseClass> {
        public:
           void write(serialization::ObjectDataOutput & out, const ExampleBaseClass& object);

           void read(serialization::ObjectDataInput & in, ExampleBaseClass& object);
           
         int getHazelcastTypeId() const;
    };
```    

If they are not inherited from same base class you can use a serializer class like following with templates:
```
    template<typename T>
    class MyCustomSerializer : public serialization::Serializer<T> {
       public:

         void write(serialization::ObjectDataOutput & out, const T& object) {
                            //.....
         }

         void read(serialization::ObjectDataInput & in, T& object) {
                           //.....
         }

         int getHazelcastTypeId() const {
                           //..
         }
    };
```
Along with serializer following function should be provided with same namespace that ExampleBaseClass belongs to
```
    int getHazelcastTypeId(const MyClass*);
```
which should return same id with its serializer.

It will be used to decide which serializer needs to be used for your classes. You can register serializer via SerializationConfig as follows:
```
    clientConfig.getSerializationConfig().registerSerializer(boost::shared_ptr<hazelcast::client::serialization::SerializerBase>(new MyCustomSerializer());
```

### Raw Pointer API
C++ client allows the user to get ownership of the raw pointers for the objects created and returned to the user. This allows you to keep the objects in your library/application without any need for copy.

For each container you can use the adaptor classes whose names start with RawPointer to access the raw pointers to the created objects. These adaptor classes are at the hazelcast::client::adaptor namespace. These are:
1. RawPointerList
2. RawPointerQueue
3. RawPointerTransactionalMultiMap
4. RawPointerMap 
5. RawPointerSet
6. RawPointerTransactionalQueue
7. RawPointerMultiMap
8. RawPointerTransactionalMap

These are just adaptor classes, they do not create any new structure. You just provide the legacy containers as a parameter and then you can just work with these raw capability containers freely. Example usage for RawPointerMap:

```
    hazelcast::client::IMap<std::string, std::string> m = hz.getMap<std::string, std::string>("map");
    hazelcast::client::adaptor::RawPointerMap<std::string, std::string> map(m);
    map.put("1", "Tokyo");
    map.put("2", "Paris");
    map.put("3", "New York");
    std::cout << "Finished loading map" << std::endl;

    std::auto_ptr<hazelcast::client::DataArray<std::string> > vals = map.values();
    std::auto_ptr<hazelcast::client::EntryArray<std::string, std::string> > entries = map.entrySet();

    std::cout << "There are " << vals->size() << " values in the map" << std::endl;
    std::cout << "There are " << entries->size() << " entries in the map" << std::endl;

    for (size_t i = 0; i < entries->size(); ++i) {
        const std::string * key = entries->getKey(i);
        if ((std::string *) NULL == key) {
            std::cout << "The key at index " << i << " is NULL" << std::endl;
        } else {
            std::auto_ptr<std::string> val = entries->releaseValue(i);
            std::cout << "(Key, Value) for index " << i << " is: (" << *key << ", " <<
                (val.get() == NULL ? "NULL" : *val) << ")" << std::endl;
        }
    }

    std::cout << "Finished" << std::endl;

```

### Query API
The C++ client allows you to query map values, keys, entries using Predicates. 

Similarly, the API also allows the usage of map executeOnKey and executeOnEntries with Predicates, which allows execution of the processor on a subset of the entries only. 

Furthermore, the API allows you to add entry listeners with Predicate, which means that only the events for the selected subset of entries matching the query criteria shall be received by your listener.

The C++ API provided a rich set of built-in Predicates as supported by the Java client. You can also implement your own Predicate just by iplementing the Predicate interfaces both for C++ client and at the server side.

The built-in predicates are:

1. AndPredicate
2. EqualPredicate 
3. ILikePredicate 
4. LikePredicate
5. OrPredicate
6. TruePredicate
7. BetweenPredicate 
8. FalsePredicate 
9. InPredicate 
10. NotEqualPredicate 
11. PagingPredicate 
12. RegexPredicate
13. GreaterLessPredicate 
14. InstanceOfPredicate 
15. NotPredicate 
16. SqlPredicate.h

An example query:

```
    IMap<int, int> intMap = client.getMap<int, int>("testValuesWithPredicateIntMap");
    adaptor::RawPointerMap<int, int> rawMap(intMap);

    // ...

    // BetweenPredicate
    // 5 <= key <= 10
    valuesArray = rawMap.values(query::BetweenPredicate<int>(query::QueryConstants::getKeyAttributeName(), 5, 10));
```

This example returns the values which are between 5 and 10 inclusive. For an example of each built-in predicate, please see distributed-map/query folder in the examples.


### Notes
API that returns pointers may return null pointers for null values. You need to check for null values.

### C++ Client Code Examples

You can try the following C++ client code examples. You need to have a Hazelcast client member running for the code examples to work. 

#### C++ Client Map Example

```cpp
#include <hazelcast/client/HazelcastAll.h>
#include <iostream>

using namespace hazelcast::client;

int main() {
  ClientConfig clientConfig;
  Address address( "localhost", 5701 );
  clientConfig.addAddress( address );

  HazelcastClient hazelcastClient( clientConfig );

  IMap<int,int> myMap = hazelcastClient.getMap<int ,int>( "myIntMap" );
  myMap.put( 1,3 );
  boost::shared_ptr<int> value = myMap.get( 1 );
  if( value.get() != NULL ) {
    //process the item
  }

  return 0;
}
```

#### C++ Client Queue Example

```cpp
#include <hazelcast/client/HazelcastAll.h>
#include <iostream>
#include <string>

using namespace hazelcast::client;

int main() {
  ClientConfig clientConfig;
  Address address( "localhost", 5701 );
  clientConfig.addAddress( address );

  HazelcastClient hazelcastClient( clientConfig );

  IQueue<std::string> queue = hazelcastClient.getQueue<std::string>( "q" );
  queue.offer( "sample" );
  boost::shared_ptr<std::string> value = queue.poll();
  if( value.get() != NULL ) {
    //process the item
  }
  return 0;
}
```

#### C++ Client Entry Listener Example

```cpp
#include "hazelcast/client/ClientConfig.h"
#include "hazelcast/client/EntryEvent.h"
#include "hazelcast/client/IMap.h"
#include "hazelcast/client/Address.h"
#include "hazelcast/client/HazelcastClient.h"
#include <iostream>
#include <string>

using namespace hazelcast::client;

class SampleEntryListener {
  public:

  void entryAdded( EntryEvent<std::string, std::string> &event ) {
    std::cout << "entry added " <<  event.getKey() << " "
        << event.getValue() << std::endl;
  };

  void entryRemoved( EntryEvent<std::string, std::string> &event ) {
    std::cout << "entry added " <<  event.getKey() << " " 
        << event.getValue() << std::endl;
  }

  void entryUpdated( EntryEvent<std::string, std::string> &event ) {
    std::cout << "entry added " <<  event.getKey() << " " 
        << event.getValue() << std::endl;
  }

  void entryEvicted( EntryEvent<std::string, std::string> &event ) {
    std::cout << "entry added " <<  event.getKey() << " " 
        << event.getValue() << std::endl;
  }
};


int main( int argc, char **argv ) {
  ClientConfig clientConfig;
  Address address( "localhost", 5701 );
  clientConfig.addAddress( address );

  HazelcastClient hazelcastClient( clientConfig );

  IMap<std::string,std::string> myMap = hazelcastClient
      .getMap<std::string ,std::string>( "myIntMap" );
  SampleEntryListener *  listener = new SampleEntryListener();

  std::string id = myMap.addEntryListener( *listener, true );
  // Prints entryAdded
  myMap.put( "key1", "value1" );
  // Prints updated
  myMap.put( "key1", "value2" );
  // Prints entryRemoved
  myMap.remove( "key1" );
  // Prints entryEvicted after 1 second
  myMap.put( "key2", "value2", 1000 );

  // WARNING: deleting listener before removing it from hazelcast leads to crashes.
  myMap.removeEntryListener( id );
  
  // listen using predicates
  // only listen the events for entries which has the value that matches the 
  // string "%VALue%1%", i.e. any string containing the text value1 case insensitive
  id = myMap.addEntryListener(*listener, query::ILikePredicate(
        query::QueryConstants::getValueAttributeName(), "%VALue%1%"), true);
  
  // this shall generate an event
  myMap.put("key1", "my__value1_new" );
  
  sleep(1);
    
  myMap.removeEntryListener( id );
    
  // Delete listener after remove it from hazelcast.
  delete listener;
  return 0;
};
```

#### C++ Client Serialization Example

Assume that you have the following two classes in Java and you want to use them with a C++ client. 

```java
class Foo implements Serializable {
  private int age;
  private String name;
}

class Bar implements Serializable {
  private float x;
  private float y;
} 
```

**First**, let them implement `Portable` or `IdentifiedDataSerializable` as shown below.

```java
class Foo implements Portable {
  private int age;
  private String name;

  public int getFactoryId() {
    // a positive id that you choose
    return 123;
  }

  public int getClassId() {
    // a positive id that you choose
    return 2;     
  }

  public void writePortable( PortableWriter writer ) throws IOException {
    writer.writeUTF( "n", name );
    writer.writeInt( "a", age );
  }

  public void readPortable( PortableReader reader ) throws IOException {
    name = reader.readUTF( "n" );
    age = reader.readInt( "a" );
  }
}

class Bar implements IdentifiedDataSerializable {
  private float x;
  private float y;

  public int getFactoryId() {
    // a positive id that you choose
    return 4;     
  }

  public int getId() {
    // a positive id that you choose
    return 5;    
  }

  public void writeData( ObjectDataOutput out ) throws IOException {
    out.writeFloat( x );
    out.writeFloat( y );
  }

  public void readData( ObjectDataInput in ) throws IOException {
    x = in.readFloat();
    y = in.readFloat();
  }
}
```

**Then**, implement the corresponding classes in C++ with same factory and class ID as shown below.

```cpp
class Foo : public Portable {
  public:
  int getFactoryId() const {
    return 123;
  };

  int getClassId() const {
    return 2;
  };

  void writePortable( serialization::PortableWriter &writer ) const {
    writer.writeUTF( "n", name );
    writer.writeInt( "a", age );
  };

  void readPortable( serialization::PortableReader &reader ) {
    name = reader.readUTF( "n" );
    age = reader.readInt( "a" );
  };

  private:
  int age;
  std::string name;
};

class Bar : public IdentifiedDataSerializable {
  public:
  int getFactoryId() const {
    return 4;
  };

  int getClassId() const {
    return 2;
  };

  void writeData( serialization::ObjectDataOutput& out ) const {
    out.writeFloat(x);
    out.writeFloat(y);
  };

  void readData( serialization::ObjectDataInput& in ) {
    x = in.readFloat();
    y = in.readFloat();
  };
  
  private:
  float x;
  float y;
};
```

Now, you can use the classes `Foo` and `Bar` in distributed structures. For example, you can use as Key or Value of `IMap` or as an Item in `IQueue`.
	

