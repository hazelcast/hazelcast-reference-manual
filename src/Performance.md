# Performance

This chapter provides information on the performance features of Hazelcast including slow operations detector, back pressure and data affinity. Moreover, the chapter describes the best performance practices for Hazelcast deployed on Amazon EC2. It also describes the threading models for I/O, events, executors and operations. 

## Data Affinity

Data affinity ensures that related entries exist on the same member. If related data is on the same member, operations can be executed without the cost of extra network calls and extra wire data. This feature is provided by using the same partition keys for related data.

#### PartitionAware

**Co-location of related data and computation**

Hazelcast has a standard way of finding out which member owns/manages each key object. The following operations will be routed to the same member, since all of them are operating based on the same key `"key1"`.

```java
HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
Map mapA = hazelcastInstance.getMap( "mapA" );
Map mapB = hazelcastInstance.getMap( "mapB" );
Map mapC = hazelcastInstance.getMap( "mapC" );

// since map names are different, operation will be manipulating
// different entries, but the operation will take place on the
// same member since the keys ("key1") are the same
mapA.put( "key1", value );
mapB.get( "key1" );
mapC.remove( "key1" );

// lock operation will still execute on the same member
// of the cluster since the key ("key1") is same
hazelcastInstance.getLock( "key1" ).lock();

// distributed execution will execute the 'runnable' on the
// same member since "key1" is passed as the key.   
hazelcastInstance.getExecutorService().executeOnKeyOwner( runnable, "key1" );
```

When the keys are the same, entries are stored on the same member. But we sometimes want to have related entries stored on the same member, such as a customer and his/her order entries. We would have a customers map with customerId as the key and an orders map with orderId as the key. Since customerId and orderId are different keys, a customer and his/her orders may fall into different members in your cluster. So how can we have them stored on the same member? We create an affinity between customer and orders. If we make them part of the same partition then these entries will be co-located. We achieve this by making orderIds `PartitionAware`.

```java
public class OrderKey implements Serializable, PartitionAware {

    private final long customerId;
    private final long orderId;

    public OrderKey( long orderId, long customerId ) {
        this.customerId = customerId;
        this.orderId = orderId;
    }

    public long getCustomerId() {
        return customerId;
    }

    public long getOrderId() {
        return orderId;
    }

    public Object getPartitionKey() {
        return customerId;
    }

    @Override
    public String toString() {
        return "OrderKey{"
                + "customerId=" + customerId
                + ", orderId=" + orderId
                + '}';
    }
}
```

Notice that OrderKey implements `PartitionAware` and that `getPartitionKey()` returns the `customerId`. This will make sure that the `Customer` entry and its `Order`s will be stored on the same member.

```java
HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
Map mapCustomers = hazelcastInstance.getMap( "customers" );
Map mapOrders = hazelcastInstance.getMap( "orders" );

// create the customer entry with customer id = 1
mapCustomers.put( 1, customer );

// now create the orders for this customer
mapOrders.put( new OrderKey( 21, 1 ), order );
mapOrders.put( new OrderKey( 22, 1 ), order );
mapOrders.put( new OrderKey( 23, 1 ), order );
```

Assume that you have a customers map where `customerId` is the key and the customer object is the value. You want to remove one of the customer orders and return the number of remaining orders. Here is how you would normally do it.

```java
public static int removeOrder( long customerId, long orderId ) throws Exception {
    IMap<Long, Customer> mapCustomers = instance.getMap( "customers" );
    IMap mapOrders = hazelcastInstance.getMap( "orders" );

    mapCustomers.lock( customerId );
    mapOrders.remove( orderId );
    Set orders = orderMap.keySet(Predicates.equal( "customerId", customerId ));
    mapCustomers.unlock( customerId );

    return orders.size();
}
```

There are couple of things you should consider.

1. There are four distributed operations there: lock, remove, keySet, unlock. Can you reduce 
the number of distributed operations?
2. The customer object may not be that big, but can you not have to pass that object through the 
wire? Think about a scenario where you set order count to the customer object for fast access, so you 
should do a get and a put, and as a result, the customer object is passed through the wire twice.

Instead, why not move the computation over to the member (JVM) where your customer data resides. Here is how you can do this with distributed executor service.

1. Send a `PartitionAware` `Callable` task.
2. `Callable` does the deletion of the order right there and returns with the remaining 
order count.
3. Upon completion of the `Callable` task, return the result (remaining order count). You 
do not have to wait until the task is completed; since distributed executions are asynchronous, you can do other things in the meantime.

Here is an example code.

```java
HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();

    public int removeOrder(long customerId, long orderId) throws Exception {
        IExecutorService executorService = hazelcastInstance.getExecutorService("ExecutorService");

        OrderDeletionTask task = new OrderDeletionTask(customerId, orderId);
        Future<Integer> future = executorService.submit(task);
        int remainingOrders = future.get();

        return remainingOrders;
    }

    public static class OrderDeletionTask
            implements Callable<Integer>, PartitionAware, Serializable, HazelcastInstanceAware {

        private long orderId;
        private long customerId;
        private HazelcastInstance hazelcastInstance;

        public OrderDeletionTask() {
        }

        public OrderDeletionTask(long customerId, long orderId) {
            this.customerId = customerId;
            this.orderId = orderId;
        }

        @Override
        public Integer call() {
            IMap<Long, Customer> customerMap = hazelcastInstance.getMap("customers");
            IMap<OrderKey, Order> orderMap = hazelcastInstance.getMap("orders");

            customerMap.lock(customerId);

            Predicate predicate = Predicates.equal("customerId", customerId);
            Set<OrderKey> orderKeys = orderMap.localKeySet(predicate);
            int orderCount = orderKeys.size();
            for (OrderKey key : orderKeys) {
                if (key.orderId == orderId) {
                    orderCount--;
                    orderMap.delete(key);
                }
            }

            customerMap.unlock(customerId);

            return orderCount;
        }

        @Override
        public Object getPartitionKey() {
            return customerId;
        }

        @Override
        public void setHazelcastInstance(HazelcastInstance hazelcastInstance) {
            this.hazelcastInstance = hazelcastInstance;
        }
    }
```

The benefits of doing the same operation with distributed `ExecutorService` based on the key are:

- Only one distributed execution (`executorService.submit(task)`), instead of four.
- Less data is sent over the wire.
- Since lock/update/unlock cycle is done locally (local to the customer data), lock duration for the `Customer` entry is much less, thus enabling higher concurrency.


#### PartitioningStrategy

Another way of storing the related data on the same location is using/implementing the class `PartitioningStrategy`. Normally (if no partitioning strategy is defined), Hazelcast finds the partition of a key first by converting the object to binary and then by hashing this binary. If a partitioning strategy is defined, Hazelcast injects the key to the strategy and the strategy returns an object out of which the partition is calculated by hashing it.

Hazelcast offers the following out-of-the-box partitioning strategies:

- `DefaultPartitioningStrategy`: Default strategy. It checks whether the key implements `PartitionAware`. If it implements, the object is converted to binary and then hashed, to find the partition of the key.
- `StringPartitioningStrategy`: Works only for string keys. It uses the string after `@` character as the partition ID. For example, if you have two keys `ordergroup1@region1` and `customergroup1@region1`, both `ordergroup1` and `customergroup1` will fall into the partition where `region1` is located.
- `StringAndPartitionAwarePartitioningStrategy`: Works as the combination of the above two strategies. If the key implements `PartitionAware`, it works like the `DefaultPartitioningStrategy`. If it is a string key, it works like the `StringPartitioningStrategy`.

Following are the example configuration snippets. Note that these strategy configurations are **per map**.


**Declarative Configuration**


```xml
<hazelcast>
...
   <map name="name-of-the-map">
   ...
      <partition-strategy>
         com.hazelcast.partition.strategy.StringAndPartitionAwarePartitioningStrategy
      </partition-strategy>
   ...
   </map>
...
</hazelcast>
```

**Programmatic Configuration**

```java
Config config = new Config();
MapConfig mapConfig = config.getMapConfig("name-of-the-map");
PartitioningStrategyConfig psConfig = mapConfig.getPartitioningStrategyConfig();
psConfig.setPartitioningStrategyClass( "StringAndPartitionAwarePartitioningStrategy" );

// OR
psConfig.setPartitioningStrategy(YourCustomPartitioningStrategy);
...
```



You can also define your own partition strategy by implementing the class `PartitioningStrategy`. To enable your implementation, add the full class name to your Hazelcast configuration using either the declarative or programmatic approach, as sampled above.

As stated previously, above strategies are defined **per map** in your Hazelcast member. You can also define a strategy **per member** in your Hazelcast cluster. This can be done by defining the `hazelcast.partitioning.strategy.class` system property. An example declarative way of configuring this property is shown below:

```xml
<hazelcast>
...
  <properties>
    <property name="hazelcast.partitioning.strategy.class">
       com.hazelcast.partition.strategy.StringAndPartitionAwarePartitioningStrategy
    </property>
    ....
  </properties>
  ...
</hazelcast>
```

You can also use other system property configuring options as explained in the [Configuring with System Properties section](#configuring-with-system-properties).



