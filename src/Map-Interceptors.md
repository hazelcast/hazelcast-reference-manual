


### Adding Interceptors

You can add intercept operations and execute your own business logic synchronously blocking the operations. You can change the returned value from a `get` operation, change the value in `put`, or `cancel` operations by throwing an exception.

Interceptors are different from listeners. With listeners, you take an action after the operation has been completed. Interceptor actions are synchronous and you can alter the behavior of operation, change its values, or totally cancel it.

Map interceptors are chained, so adding the same interceptor multiple times to the same map can result in duplicate effects. This can easily happen when the interceptor is added to the map at member initialization, so that each member adds the same interceptor. When you add the interceptor in this way, be sure to implement the `hashCode()` method to return the same value for every instance of the interceptor. It is not strictly necessary, but it is a good idea to also implement `equals()` as this will ensure that the map interceptor can be removed reliably.

The IMap API has two methods for adding and removing an interceptor to the map: `addInterceptor` and `removeInterceptor`.

```java
/**
 * Adds an interceptor for the map. Added interceptor intercepts operations
 * and executes user defined methods and cancels operations if 
 * user defined methods throw exceptions. 
 *
 * @param interceptor map interceptor.
 * @return id of registered interceptor.
 */
String addInterceptor( MapInterceptor interceptor );

/**
 * Removes the given interceptor for this map. So it does not 
 * intercept operations anymore. 
 *
 * @param id registration ID of the map interceptor.
 */
void removeInterceptor( String id );
```

Here is the `MapInterceptor` interface:

```java
public interface MapInterceptor extends Serializable {

  /**
   * Intercept the get operation before it returns a value.
   * Return another object to change the return value of get().
   * Returning null causes the get() operation to return the original value,
   * namely return null if you do not want to change anything.
   * 
   *
   * @param value the original value to be returned as the result of get() operation.
   * @return the new value that is returned by get() operation.
   */
  Object interceptGet( Object value );

  /**
   * Called after get() operation is completed.
   * 
   *
   * @param value the value returned as the result of get() operation.
   */
  void afterGet( Object value );

  /**
   * Intercept put operation before modifying map data.
   * Return the object to be put into the map.
   * Returning null causes the put() operation to operate as expected,
   * namely no interception. Throwing an exception cancels the put operation.
   * 
   *
   * @param oldValue the value currently existing in the map.
   * @param newValue the new value to be put.
   * @return new value after intercept operation.
   */
  Object interceptPut( Object oldValue, Object newValue );

  /**
   * Called after put() operation is completed.
   * 
   *
   * @param value the value returned as the result of put() operation.
   */
  void afterPut( Object value );

  /**
   * Intercept remove operation before removing the data.
   * Return the object to be returned as the result of remove operation.
   * Throwing an exception cancels the remove operation.
   * 
   *
   * @param removedValue the existing value to be removed.
   * @return the value to be returned as the result of remove operation.
   */
  Object interceptRemove( Object removedValue );

  /**
   * Called after remove() operation is completed.
   * 
   *
   * @param value the value returned as the result of remove(.) operation
   */
  void afterRemove( Object value );
}
```

**Example Usage:**

```java
public class InterceptorTest {

    @org.junit.Test
    public void testMapInterceptor() throws InterruptedException {
        HazelcastInstance hazelcastInstance1 = Hazelcast.newHazelcastInstance();
        HazelcastInstance hazelcastInstance2 = Hazelcast.newHazelcastInstance();
        IMap<Object, Object> map = hazelcastInstance1.getMap( "testMapInterceptor" );
        SimpleInterceptor interceptor = new SimpleInterceptor();
        String interceptorId = map.addInterceptor( interceptor );
        map.put( 1, "New York" );
        map.put( 2, "Istanbul" );
        map.put( 3, "Tokyo" );
        map.put( 4, "London" );
        map.put( 5, "Paris" );
        map.put( 6, "Cairo" );
        map.put( 7, "Hong Kong" );

        try {
            map.remove( 1 );
        } catch ( Exception ignore ) {
        }
        try {
            map.remove( 2 );
        } catch ( Exception ignore ) {
        }

        assertEquals( map.size(), 6) ;

        assertEquals( map.get( 1 ), null );
        assertEquals( map.get( 2 ), "ISTANBUL:" );
        assertEquals( map.get( 3 ), "TOKYO:" );
        assertEquals( map.get( 4 ), "LONDON:" );
        assertEquals( map.get( 5 ), "PARIS:" );
        assertEquals( map.get( 6 ), "CAIRO:" );
        assertEquals( map.get( 7 ), "HONG KONG:" );

        map.removeInterceptor( interceptorId );
        map.put( 8, "Moscow" );

        assertEquals( map.get( 8 ), "Moscow" );
        assertEquals( map.get( 1 ), null );
        assertEquals( map.get( 2 ), "ISTANBUL" );
        assertEquals( map.get( 3 ), "TOKYO" );
        assertEquals( map.get( 4 ), "LONDON" );
        assertEquals( map.get( 5 ), "PARIS" );
        assertEquals( map.get( 6 ), "CAIRO" );
        assertEquals( map.get( 7 ), "HONG KONG" );
    }

    static class SimpleInterceptor implements MapInterceptor, Serializable {

        @Override
        public Object interceptGet( Object value ) {
            if (value == null)
                return null;
            return value + ":";
        }

        @Override
        public void afterGet( Object value ) {
        }

        @Override
        public Object interceptPut( Object oldValue, Object newValue ) {
            return newValue.toString().toUpperCase();
        }

        @Override
        public void afterPut( Object value ) {
        }

        @Override
        public Object interceptRemove( Object removedValue ) {
            if(removedValue.equals( "ISTANBUL" ))
                throw new RuntimeException( "you can not remove this" );
            return removedValue;
        }

        @Override
        public void afterRemove( Object value ) {
            // do something
        }
    }
}
```


