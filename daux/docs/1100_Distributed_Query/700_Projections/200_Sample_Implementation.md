
Let's consider the following domain object stored in an IMap:

```java
public class Employee implements Serializable {

    private String name;

    public Employee() {
    }

    public String getName() {
        return name;
    }

    public void setName(String firstName) {
        this.name = name;
    }
}

```

To return just the names of the Employees, you can run the query in the following way:

```java
        Collection<String> names = employees.project(new Projection<Map.Entry<String, Employee>, String>() {
            @Override
            public String transform(Map.Entry<String, Employee> entry) {
                return entry.getValue().getName();
            }
        }, somePredicate);
```
