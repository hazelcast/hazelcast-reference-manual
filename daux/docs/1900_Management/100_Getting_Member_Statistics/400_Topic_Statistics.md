
To get local topic statistics, use the `getLocalTopicStats()` method from the `ITopic` interface.
This method returns a `LocalTopicStats` object that holds local topic statistics.

Below is example code where the `getLocalTopicStats()` method and the `getPublishOperationCount` method from `LocalTopicStats` get the number of publish operations.


```java
HazelcastInstance node = Hazelcast.newHazelcastInstance();
ITopic<Object> news = node.getTopic( "news" );
LocalTopicStats topicStatistics = news.getLocalTopicStats();
System.out.println( "number of publish operations = " 
    + topicStatistics.getPublishOperationCount() );
```

Below is the list of metrics that you can access via the `LocalTopicStats` object.

```java
/**
 * Returns the creation time of this topic on this member.
 */
long getCreationTime();

/**
 * Returns the total number of published messages of this topic on this member.
 */
long getPublishOperationCount();

/**
 * Returns the total number of received messages of this topic on this member.
 */
long getReceiveOperationCount();
```
