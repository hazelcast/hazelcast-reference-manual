

### Paging Predicate

Hazelcast provides paging for defined predicates. With its `PagingPredicate` class, you can
get a collection of keys, values, or entries page by page by filtering them with predicates and giving the size of the pages. Also, you
can sort the entries by specifying comparators.

In the example code below, the `greaterEqual` predicate gets values from the "students" map. This predicate has a filter
to retrieve the objects with a "age" greater than or equal to 18. Then a `PagingPredicate` is
constructed in which the page size is 5, so there will be 5 objects in each page.

The first time the values are called creates the first page. You can get the subsequent pages by using the `nextPage()`
method of `PagingPredicate` and querying the map again with the updated `PagingPredicate`.


```java
IMap<Integer, Student> map = hazelcastInstance.getMap( "students" );
Predicate greaterEqual = Predicates.greaterEqual( "age", 18 );
PagingPredicate pagingPredicate = new PagingPredicate( greaterEqual, 5 );
// Retrieve the first page
Collection<Student> values = map.values( pagingPredicate );
...
// Set up next page
pagingPredicate.nextPage();
// Retrieve next page
values = map.values( pagingPredicate );
...
```

If a comparator is not specified for `PagingPredicate`, but you want to get a collection of keys or values page by page, this collection must be an instance of `Comparable` (i.e. it must implement `java.lang.Comparable`). Otherwise, the `java.lang.IllegalArgument` exception is thrown.

Paging Predicate, also known as Order & Limit, is not supported in Transactional Context.
<br></br>

![image](images/NoteSmall.jpg) ***NOTE:*** *Currently, random page accessing is not supported.*

***RELATED INFORMATION***

*Please see the
<a href="https://github.com/hazelcast/hazelcast/blob/master/hazelcast/src/main/java/com/hazelcast/query/Predicates.java" target="_blank">
Predicates class</a> for all predicates provided.*

