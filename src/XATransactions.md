 

## Providing XA Transactions

XA describes the interface between the global transaction manager and the local resource manager. XA allows multiple resources (such as databases, application servers, message queues, transactional caches, etc.) to be accessed within the same transaction, thereby preserving the ACID properties across applications. XA uses a two-phase commit to ensure that all resources either commit or rollback any particular transaction consistently (all do the same).

When you implement the `XAResource` interface, Hazelcast provides XA transactions. You can obtain the `HazelcastXAResource` instance via the `HazelcastInstance getXAResource` method. You can see the
[HazelcastXAResource API here](http://docs.hazelcast.org/docs/latest/javadoc/com/hazelcast/transaction/HazelcastXAResource.html).

Below is example code that uses JTA API for transaction management.
  
```java
public class XATransaction {

    public static void main(String[] args) throws Exception {
        HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
        HazelcastXAResource xaResource = hazelcastInstance.getXAResource();

        TransactionManager tm = getTransactionManager(); // depends on JTA implementation
        tm.setTransactionTimeout(60);
        tm.begin();


        Transaction transaction = tm.getTransaction();
        transaction.enlistResource(xaResource);
        // other resources (database, app server etc...) can be enlisted

       try {
           TransactionContext context = xaResource.getTransactionContext();
           TransactionalMap map = context.getMap("m");
           map.put("key", "value");
           // other resource operations
          tm.commit();
          } catch (Exception e) {
              tm.rollback();
          }
     }
}
```
