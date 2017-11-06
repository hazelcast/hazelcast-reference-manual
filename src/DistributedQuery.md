

# Distributed Query

Distributed queries access data from multiple data sources stored on either the same or different members.

Hazelcast partitions your data and spreads it across cluster of members. You can iterate over the map entries and look for certain entries (specified by predicates) you are interested in. However, this is not very efficient because you will have to bring the entire entry set and iterate locally. Instead, Hazelcast allows you to run distributed queries on your distributed map.


## How Distributed Query Works

1. The requested predicate is sent to each member in the cluster.
2. Each member looks at its own local entries and filters them according to the predicate. At this stage, key/value pairs of the entries are deserialized and then passed to the predicate.
3. The predicate requester merges all the results coming from each member into a single set.

Distributed query is highly scalable. If you add new members to the cluster, the partition count for each member is reduced and thus the time spent by each member on iterating its entries is reduced. In addition, the pool of partition threads evaluates the entries concurrently in each member, and the network traffic is also reduced since only filtered data is sent to the requester.

Hazelcast offers the following APIs for distributed query purposes:

- Criteria API
- Distributed SQL Query
<br></br>


### Employee Map Query Example

Assume that you have an "employee" map containing values of `Employee` objects, as coded below.

```java
import java.io.Serializable;

public class Employee implements Serializable {
  private String name;
  private int age;
  private boolean active;
  private double salary;

  public Employee(String name, int age, boolean active, double salary) {
    this.name = name;
    this.age = age;
    this.active = active;
    this.salary = salary;
  }

  public Employee() {
  }

  public String getName() {
    return name;
  }

  public int getAge() {
    return age;
  }

  public double getSalary() {
    return salary;
  }

  public boolean isActive() {
    return active;
  }
}
```

Now let's look for the employees who are active and have an age less than 30 using the aforementioned APIs (Criteria API and Distributed SQL Query). The following subsections describe each query mechanism for this example.

![image](images/NoteSmall.jpg)***NOTE:*** *When using Portable objects, if one field of an object exists on one member but does not exist on another one, Hazelcast does not throw an unknown field exception.
Instead, Hazelcast treats that predicate, which tries to perform a query on an unknown field, as an always false predicate.*


