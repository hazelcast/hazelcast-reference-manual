


### Querying with Criteria API

Criteria API is a programming interface offered by Hazelcast that is similar to the Java Persistence Query Language (JPQL). Below is the code
for the [above example query](#employee-map-query-example).

```java
import com.hazelcast.core.IMap;
import com.hazelcast.query.Predicate;
import com.hazelcast.query.PredicateBuilder;
import com.hazelcast.query.EntryObject;
import com.hazelcast.config.Config;

IMap<String, Employee> map = hazelcastInstance.getMap( "employee" );

EntryObject e = new PredicateBuilder().getEntryObject();
Predicate predicate = e.is( "active" ).and( e.get( "age" ).lessThan( 30 ) );

Collection<Employee> employees = map.values( predicate );
```

In the above example code, `predicate` verifies whether the entry is active and its `age` value is less than 30. This `predicate` is
applied to the `employee` map using the `map.values(predicate)` method. This method sends the predicate to all cluster members
and merges the results coming from them. Since the predicate is communicated between the members, it needs to
be serializable.

![image](images/NoteSmall.jpg)***NOTE:*** *Predicates can also be applied to `keySet`, `entrySet` and `localKeySet` of the Hazelcast distributed map.*

#### Predicates Class Operators

The `Predicates` class offered by Hazelcast includes many operators for your query requirements. Some of them are
explained below.

- `equal`: Checks if the result of an expression is equal to a given value.
- `notEqual`: Checks if the result of an expression is not equal to a given value.
- `instanceOf`: Checks if the result of an expression has a certain type.
- `like`: Checks if the result of an expression matches some string pattern. % (percentage sign) is the placeholder for many
characters,  (underscore) is placeholder for only one character.
- `greaterThan`: Checks if the result of an expression is greater than a certain value.
- `greaterEqual`: Checks if the result of an expression is greater than or equal to a certain value.
- `lessThan`: Checks if the result of an expression is less than a certain value.
- `lessEqual`: Checks if the result of an expression is less than or equal to a certain value.
- `between`: Checks if the result of an expression is between two values (this is inclusive).
- `in`: Checks if the result of an expression is an element of a certain collection.
- `isNot`: Checks if the result of an expression is false.
- `regex`: Checks if the result of an expression matches some regular expression.
<br></br>

***RELATED INFORMATION*** 

*Please see the <a href="http://docs.hazelcast.org/docs/latest/javadoc/com/hazelcast/query/Predicates.html" target="_blank">Predicates Javadoc</a> for all predicates provided.*


#### Combining Predicates with AND, OR, NOT

You can combine predicates using the `and`, `or`, and `not` operators, as shown in the below examples.

```java
public Collection<Employee> getWithNameAndAge( String name, int age ) {
  Predicate namePredicate = Predicates.equal( "name", name );
  Predicate agePredicate = Predicates.equal( "age", age );
  Predicate predicate = Predicates.and( namePredicate, agePredicate );
  return employeeMap.values( predicate );
}
```

```java
public Collection<Employee> getWithNameOrAge( String name, int age ) {
  Predicate namePredicate = Predicates.equal( "name", name );
  Predicate agePredicate = Predicates.equal( "age", age );
  Predicate predicate = Predicates.or( namePredicate, agePredicate );
  return employeeMap.values( predicate );
}
```

```java
public Collection<Employee> getNotWithName( String name ) {
  Predicate namePredicate = Predicates.equal( "name", name );
  Predicate predicate = Predicates.not( namePredicate );
  return employeeMap.values( predicate );
}
```


#### Simplifying with PredicateBuilder

You can simplify predicate usage with the `PredicateBuilder` class, which offers simpler predicate building. Please see the
below example code which selects all people with a certain name and age.

```java
public Collection<Employee> getWithNameAndAgeSimplified( String name, int age ) {
  EntryObject e = new PredicateBuilder().getEntryObject();
  Predicate agePredicate = e.get( "age" ).equal( age );
  Predicate predicate = e.get( "name" ).equal( name ).and( agePredicate );
  return employeeMap.values( predicate );
}
```


