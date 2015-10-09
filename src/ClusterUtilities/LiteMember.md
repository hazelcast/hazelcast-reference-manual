


### Lite Member

Lite members are the Hazelcast cluster members that do not store data. These members are used mainly to execute tasks and register listeners, and they do not have partitions.

You can form your cluster to include the regular Hazelcast members to store data and Hazelcast lite members to run heavy computations. The presence of the lite members do not affect the operations performed on the other members in the cluster. You can directly submit your tasks to the lite members, register listeners on them and invoke operations for the Hazelcast data structures on them (e.g. `map.put()` and `map.get()`).

#### Enabling Lite Members

You can enable a cluster member to be a lite member using declarative or programmatic configuration. 

##### Declarative Configuration

```xml
<hazelcast>
    <lite-member enabled="true">
</hazelcast>
```

##### Programmatic Configuration

```java
Config config = new Config();
config.setLiteMember(true);
```

![image](images/NoteSmall.jpg) ***NOTE:*** *Note that you cannot change a member's role at runtime.*



