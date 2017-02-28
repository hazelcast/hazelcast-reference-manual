
Hazelcast provides extension methods to Cache API through the interface `com.hazelcast.cache.ICache`.

It has two sets of extensions:

* Asynchronous version of all cache operations. See [Async Operations](#icache-async-methoods).
* Cache operations with custom `ExpiryPolicy` parameter to apply on that specific operation. See [Custom ExpiryPolicy](#defining-a-custom-expirypolicy).

