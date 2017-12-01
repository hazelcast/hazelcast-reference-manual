




### Listening to Map Entries with Predicates

You can listen to the modifications performed on specific map entries. You can think of it as an entry listener with predicates. Please see the [Listening for Map Events section](#listening-for-map-events) for information on how to add entry listeners to a map.


![image](images/NoteSmall.jpg) ***IMPORTANT:*** *The default backwards-compatible event publishing strategy only publishes
`UPDATED` events when map entries are updated to a value that matches the predicate with which the listener was registered.
This implies that when using the default event publishing strategy, your listener will not be notified about an entry whose
value is updated from one that matches the predicate to a new value that does not match the predicate.*

Since version 3.7, when you configure Hazelcast members with property `hazelcast.map.entry.filtering.natural.event.types` set to `true`,
handling of entry updates conceptually treats value transition as entry, update or exit with regards to the predicate value space.
The following table compares how a listener is notified about an update to a map entry value under the default
backwards-compatible Hazelcast behavior (when property `hazelcast.map.entry.filtering.natural.event.types` is not set or is set
to `false`) versus when set to `true`:

&nbsp; | Default | `hazelcast.map.entry.filtering.natural.event.types = true`
:--------------|:---------------|:------
When old value matches predicate,<br/>new value does not match predicate | No event is delivered to entry listener | `REMOVED` event is delivered to entry listener
When old value matches predicate,<br/>new value matches predicate | `UPDATED` event is delivered to entry listener | `UPDATED` event is delivered to entry listener
When old value does not match predicate,<br/>new value does not match predicate | No event is delivered to entry listener | No event is delivered to entry listener
When old value does not match predicate,<br/>new value matches predicate | `UPDATED` event is delivered to entry listener | `ADDED` event is delivered to entry listener  


As an example, let's listen to the changes made on an employee with the surname "Smith". First, let's create the `Employee` class.

```java
public class Employee implements Serializable {

    private final String surname;

    public Employee(String surname) {
        this.surname = surname;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "surname='" + surname + '\'' +
                '}';
    }
}
```

Then, let's create a listener with predicate by adding a listener that tracks `ADDED`, `UPDATED` and `REMOVED` entry events with the `surname` predicate.

```java
public class ListenerWithPredicate {

    public static void main(String[] args) {
        Config config = new Config();
        config.setProperty("hazelcast.map.entry.filtering.natural.event.types", "true");
        HazelcastInstance hz = Hazelcast.newHazelcastInstance(config);
        IMap<String, String> map = hz.getMap("map");
        map.addEntryListener(new MyEntryListener(),
                new SqlPredicate("surname=smith"), true);
        System.out.println("Entry Listener registered");
    }

    static class MyEntryListener
            implements EntryAddedListener<String, String>,
                       EntryUpdatedListener<String, String>,
                       EntryRemovedListener<String, String> {
        @Override
        public void entryAdded(EntryEvent<String, String> event) {
            System.out.println("Entry Added:" + event);
        }

        @Override
        public void entryRemoved(EntryEvent<String, String> event) {
            System.out.println("Entry Removed:" + event);
        }

        @Override
        public void entryUpdated(EntryEvent<String, String> event) {
            System.out.println("Entry Updated:" + event);
        }
        
    }
}
```

And now, let's play with the employee "smith" and see how that employee will be listened to.

```java
public class Modify {

    public static void main(String[] args) {
        Config config = new Config();
        config.setProperty("hazelcast.map.entry.filtering.natural.event.types", "true");
        HazelcastInstance hz = Hazelcast.newHazelcastInstance(config);
        IMap<String, Employee> map = hz.getMap("map");

        map.put("1", new Employee("smith"));
        map.put("2", new Employee("jordan"));
        System.out.println("done");
        System.exit(0);
    }
}
```

When you first run the class `ListenerWithPredicate` and then run `Modify`, you will see output similar to the listing below.

```
entryAdded:EntryEvent {Address[192.168.178.10]:5702} key=1,oldValue=null,
value=Person{name= smith }, event=ADDED, by Member [192.168.178.10]:5702
```

***RELATED INFORMATION***

*Please refer to [Continuous Query Cache](#continuous-query-cache) for more information.*




