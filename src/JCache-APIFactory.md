
### Implementing Factory and FactoryBuilder

The `javax.cache.configuration.Factory` implementations configure features like
`CacheEntryListener`, `ExpiryPolicy`, and `CacheLoader`s or `CacheWriter`s. These factory implementations are required to distribute the
different features to members in a cluster environment like Hazelcast. Therefore, these factory implementations have to be serializable.

`Factory` implementations are easy to do, as they follow the default Provider- or Factory-Pattern. The sample class
`UserCacheEntryListenerFactory` shown below implements a custom JCache `Factory`.

```java
public class UserCacheEntryListenerFactory
    implements Factory<CacheEntryListener<Integer, User>> {

    @Override
    public CacheEntryListener<Integer, User> create() {
        // Just create a new listener instance
        return new UserCacheEntryListener();
    }
}
```

To simplify the process for the users, JCache API offers a set of helper methods collected in
`javax.cache.
configuration.FactoryBuilder`. In the above configuration example, `FactoryBuilder.factoryOf()` creates a
singleton factory for the given instance.

