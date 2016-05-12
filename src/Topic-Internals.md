

### Understanding Topic Behavior

Each cluster member has a list of all registrations in the cluster. When a new member is registered for a topic, it sends a registration message to all members in the cluster. Also, when a new member joins the cluster, it will receive all registrations made so far in the cluster.

The behavior of a topic varies depending on the value of the configuration parameter `globalOrderEnabled`.

#### Ordering Messages as Published

If `globalOrderEnabled` is disabled, messages are not ordered and listeners (subscribers) process the messages in the order that the messages are published. If cluster member M publishes messages *m1, m2, m3, ..., mn* to a topic **T**, then Hazelcast makes sure that all of the subscribers of topic **T** will receive and process *m1, m2, m3, ..., mn* in the given order.

Here is how it works. Let's say that we have three members (*member1*, *member2* and *member3*) and that *member1* and *member2* are registered to a topic named `news`. Note that all three members know that *member1* and *member2* are registered to `news`.
	
In this example, *member1* publishes two messages, `a1` and `a2`, and *member3* publishes two messages, `c1` and `c2`. When *member1* and *member3* publish a message, they will check their local list for registered members, they will discover that *member1* and *member2* are in their lists, and then they will fire messages to those members. One possible order of the messages received could be the following.

*member1* -> `c1`, `a1`, `a2`, `c2`

*member2* -> `c1`, `c2`, `a1`, `a2`

#### Ordering Messages for Members

If `globalOrderEnabled` is enabled, all members listening to the same topic will get its messages in the same order.

Here is how it works. Let's say that we have three members (*member1*, *member2* and *member3*) and that *member1* and *member2* are registered to a topic named `news`. Note that all three members know that *member1* and *member2* are registered to `news`.

In this example, *member1* publishes two messages: `a1` and `a2`, and *member3* publishes two messages: `c1` and `c2`. When a member publishes messages over the topic `news`, it first calculates which partition the `news` ID corresponds to. Then it sends an operation to the owner of the partition for that member to publish messages. Let's assume that `news` corresponds to a partition that *member2* owns. *member1* and *member3* first sends all messages to *member2*. Assume that the messages are published in the following order:

*member1* -> `a1`, `c1`, `a2`, `c2`

*member2* then publishes these messages by looking at registrations in its local list. It sends these messages to *member1* and *member2* (it makes a local dispatch for itself).

*member1* -> `a1`, `c1`, `a2`, `c2`

*member2* -> `a1`, `c1`, `a2`, `c2`

This way we guarantee that all members will see the events in the same order.

#### Keeping Generated and Published Order the Same

In both cases, there is a `StripedExecutor` in EventService that is responsible for dispatching the received message. For all events in Hazelcast, the order that events are generated and the order they are published to the user are guaranteed to be the same via this `StripedExecutor`.

In `StripedExecutor`, there are as many threads as are specified in the property  `hazelcast.event.thread.count` (default is five). For a specific event source (for a particular topic name), *hash of that source's name % 5* gives the ID of the responsible thread. Note that there can be another event source (entry listener of a map, item listener of a collection, etc.) corresponding to the same thread. In order not to make other messages to block, heavy processing should not be done in this thread. If there is time-consuming work that needs to be done, the work should be handed over to another thread. Please see the [Getting a Topic and Publishing Messages section](#getting-a-topic-and-publishing-messages).
