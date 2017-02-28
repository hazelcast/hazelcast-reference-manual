

You can register for Hazelcast entry events so you will be notified when those events occur. Event Listeners are cluster-wide--when a listener is registered in one member of cluster, it is actually registered for events that originated at any member in the cluster. When a new member joins, events originated at the new member will also be delivered.

An Event is created only if you registered an event listener. If no listener is registered, then no event will be created. If you provided a predicate when you registered the event listener, pass the predicate before sending the event to the listener (member/client).

As a rule of thumb, your event listener should not implement heavy processes in its event methods that block the thread for a long time. If needed, you can use `ExecutorService` to transfer long running processes to another thread and thus offload the current listener thread.

![image](../images/NoteSmall.jpg) ***NOTE:*** *In a failover scenario, events are not highly available and may get lost. Eventing mechanism is being improved for failover scenarios.*



