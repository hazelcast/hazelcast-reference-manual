

# Transactions

This chapter explains the usage of Hazelcast in a transactional context. It describes the Hazelcast transaction types and how they work, how to provide XA (e**X**tended **A**rchiteture) transactions, and how to integrate Hazelcast with J2EE containers.

## Creating a Transaction Interface

You create a `TransactionContext` object to begin, commit, and rollback a transaction. You can obtain transaction-aware instances of queues, maps, sets, lists, multimaps via `TransactionContext`, work with them, and commit/rollback in one shot. You can see the [TransactionContext source code here](https://github.com/hazelcast/hazelcast/blob/master/hazelcast/src/main/java/com/hazelcast/transaction/TransactionContext.java).

Hazelcast supports two types of transactions: ONE_PHASE and TWO_PHASE. The type of transaction controls what happens when a member crashes while a transaction is committing. The default behavior is TWO_PHASE.
<br><br>
![image](images/NoteSmall.jpg) ***NOTE:*** *Starting with Hazelcast 3.6, the transaction type `LOCAL` has been deprecated. Please use `ONE_PHASE` for the Hazelcast releases 3.6 and higher.*
<br><br>

- **ONE_PHASE**: By selecting this transaction type, you execute the transactions with a single phase that is committing the changes. Since a preparing phase does not exist, the conflicts are not detected. When a conflict happens while committing the changes, e.g., due to a member crash, not all the changes are written and this leaves the system in an inconsistent state.

- **TWO_PHASE**: When you select this transaction type, Hazelcast first tries to execute the prepare phase. This phase fails if there are any conflicts. Once the prepare phase is successful, Hazelcast executes the commit phase (writing the changes). Before TWO_PHASE commits, Hazelcast copies the commit log to other members, so in case of a member failure, another member can complete the commit.

```java
import java.util.Queue;
import java.util.Map;
import java.util.Set;
import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.Transaction;

HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();

TransactionOptions options = new TransactionOptions()
    .setTransactionType( TransactionType.ONE_PHASE );
    
TransactionContext context = hazelcastInstance.newTransactionContext( options );
context.beginTransaction();

TransactionalQueue queue = context.getQueue( "myqueue" );
TransactionalMap map = context.getMap( "mymap" );
TransactionalSet set = context.getSet( "myset" );

try {
  Object obj = queue.poll();
  //process obj
  map.put( "1", "value1" );
  set.add( "value" );
  //do other things..
  context.commitTransaction();
} catch ( Throwable t ) {
  context.rollbackTransaction();
}
```

In a transaction, operations will not be executed immediately. Their changes will be local to the `TransactionContext` until committed. However, they will ensure the changes via locks. 

For the above example, when `map.put` is executed, no data will be put in the map but the key will be locked against changes. While committing, operations will be executed, the value will be put to the map, and the key will be unlocked.

The isolation level in Hazelcast Transactions is `READ_COMMITTED`. If you are in a transaction, you can read the data in your transaction and the data that is already committed. If you are not in a transaction, you can only read the committed data.

![image](images/NoteSmall.jpg) ***NOTE:*** *The REPEATABLE_READ isolation level can also be exercised using the method `getForUpdate()` of `TransactionalMap`.*

### Queue/Set/List vs. Map/Multimap

Hazelcast implements queue/set/list operations differently than map/multimap operations. For queue operations (offer, poll), offered and/or polled objects are copied to the owner member in order to safely commit/rollback. For map/multimap, Hazelcast first acquires the locks for the write operations (put, remove) and holds the differences (what is added/removed/updated) locally for each transaction. When the transaction is set to commit, Hazelcast will release the locks and apply the differences. When rolling back, Hazelcast will release the locks and discard the differences.

`MapStore` and `QueueStore` do not participate in transactions. Hazelcast will suppress exceptions thrown by the store in a transaction. Please refer to the [XA Transactions section](#providing-xa-transactions) for further information.

### ONE_PHASE vs. TWO_PHASE

As discussed in [Creating a Transaction Interface](#creating-a-transaction-interface), when you choose ONE_PHASE as the transaction type, Hazelcast tracks all changes you make locally in a commit log, i.e., a list of changes. In this case, all the other members are asked to agree that the commit can succeed and once they agree, Hazelcast starts to write the changes. 
However, if the member that initiates the commit crashes after it has written to at least one member (but has not completed writing to all other members), your system may be left in an inconsistent state.

On the other hand, if you choose TWO_PHASE as the transaction type, the commit log is again tracked locally but it is copied to another cluster member. Therefore, when a failure happens, e.g., the member initiating the commit crashes, you still have the commit log in another member and that member can complete the commit. However, copying the commit log to another member makes the TWO_PHASE approach slow.

Consequently, it is recommended that you choose ONE_PHASE as the transaction type if you want better performance, and that you choose TWO_PHASE if reliability of your system is more important than the performance. 

