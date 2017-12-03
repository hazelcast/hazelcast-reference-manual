
***Sample Code***: *Please see our <a href="https://github.com/hazelcast/hazelcast-code-samples/tree/master/hazelcast-integration/spring-transaction-manager" target="_blank">sample application</a> for Hazelcast Transaction Manager in our code samples repository.*
<br></br>

Starting with Hazelcast 3.7, you can get rid of the boilerplate code to begin, commit or rollback transactions by using <a href="http://docs.hazelcast.org/docs/latest/javadoc/com/hazelcast/spring/transaction/HazelcastTransactionManager.html" target="_blank">HazelcastTransactionManager</a>
which is a `PlatformTransactionManager` implementation to be used with Spring Transaction API.

#### Sample Configuration for Hazelcast Transaction Manager

You need to register `HazelcastTransactionManager` as your transaction manager implementation and also you need to
register <a href="http://docs.hazelcast.org/docs/latest/javadoc/com/hazelcast/spring/transaction/ManagedTransactionalTaskContext.html" target="_blank">ManagedTransactionalTaskContext</a>
to access transactional data structures within your service class.


```xml
...
<hz:hazelcast id="instance">
      ...
</hz:hazelcast>
...
<tx:annotation-driven transaction-manager="transactionManager"/>
<bean id="transactionManager" class="com.hazelcast.spring.transaction.HazelcastTransactionManager">
    <constructor-arg ref="instance"/>
</bean>
<bean id="transactionalContext" class="com.hazelcast.spring.transaction.ManagedTransactionalTaskContext">
    <constructor-arg ref="transactionManager"/>
</bean>
<bean id="YOUR_SERVICE" class="YOUR_SERVICE_CLASS">
    <property name="transactionalTaskContext" ref="transactionalContext"/>
</bean>
...
```

#### Sample Transactional Method

```java
public class ServiceWithTransactionalMethod {

    private TransactionalTaskContext transactionalTaskContext;

    @Transactional
    public void transactionalPut(String key, String value) {
        transactionalTaskContext.getMap("testMap").put(key, value);
    }

    ...
}
```

After marking your method as `Transactional` either declaratively or by annotation and accessing the data structure
through the `TransactionalTaskContext`, `HazelcastTransactionManager` will begin, commit or rollback the transaction for you.

