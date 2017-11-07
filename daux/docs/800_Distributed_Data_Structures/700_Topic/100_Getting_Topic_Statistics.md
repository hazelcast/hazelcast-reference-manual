
Topic has two statistic variables that you can query. These values are incremental and local to the member.

```java
HazelcastInstance hazelcastInstance = Hazelcast.newHazelcastInstance();
ITopic<Object> myTopic = hazelcastInstance.getTopic( "myTopicName" );

myTopic.getLocalTopicStats().getPublishOperationCount();
myTopic.getLocalTopicStats().getReceiveOperationCount();
```


`getPublishOperationCount` and `getReceiveOperationCount` returns the total number of published and received messages since the start of this member, respectively. Please note that these values are not backed up, so if the member goes down, these values will be lost.

You can disable this feature with topic configuration. Please see the [Configuring Topic section](04_Configuring_Topic.md).

![image](../../images/NoteSmall.jpg) ***NOTE:*** *These statistics values can be also viewed in Hazelcast Management Center*.




