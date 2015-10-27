

## User Defined Services

In the case of special/custom needs, Hazelcast's SPI (Service Provider Interface) module allows users to develop their own distributed data structures and services.

Throughout this section, we create an example distributed counter that will be the guide to reveal the Hazelcast Services SPI usage.

Here is our counter.

```java
public interface Counter{
   int inc(int amount);
}
```

This counter will have the following features:
- It will be stored in Hazelcast. 
- Different cluster members can call it. 
- It will be scalable, meaning that the capacity for the number of counters scales with the number of cluster members.
- It will be highly available, meaning that if a member hosting this counter goes down, a backup will be available on a different member.

All these features are done with the steps below. Each step adds a new functionality to this counter.

1. Create the class.
2. Enable the class.
3. Add properties.
5. Place a remote call.
5. Create the containers.
6. Enable partition migration.
6. Create the backups.



