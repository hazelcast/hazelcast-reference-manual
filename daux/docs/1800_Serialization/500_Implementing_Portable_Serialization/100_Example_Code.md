
Here is example code for Portable implementation of a Foo class.

```java
public class Foo implements Portable{
  final static int ID = 5;

  private String foo;

  public String getFoo() {
    return foo;
  }

  public void setFoo( String foo ) {
    this.foo = foo;
  }

  @Override
  public int getFactoryId() {
    return 1;
  }

  @Override
  public int getClassId() {
    return ID;
  }

  @Override
  public void writePortable( PortableWriter writer ) throws IOException {
    writer.writeUTF( "foo", foo );
  }

  @Override
  public void readPortable( PortableReader reader ) throws IOException {
    foo = reader.readUTF( "foo" );
  }
}        
```

Similar to `IdentifiedDataSerializable`, a Portable Class must provide `classId` and `factoryId`. The Factory object creates the Portable object given the `classId`.

An example `Factory` could be implemented as follows:

```java
public class MyPortableFactory implements PortableFactory {

  @Override
  public Portable create( int classId ) {
    if ( Foo.ID == classId )
      return new Foo();
    else
      return null;
  }
}            
```
