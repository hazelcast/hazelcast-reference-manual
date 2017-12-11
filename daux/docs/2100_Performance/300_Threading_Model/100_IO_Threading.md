
Your application server has its own threads. Hazelcast does not use these; it manages its own threads.

### I/O Threading

Hazelcast uses a pool of threads for I/O. A single thread does not perform all the I/O. Instead, multiple threads perform the I/O. On each cluster member, the I/O threading is split up in 3 types of I/O threads:

* I/O thread for the accept requests.
* I/O threads to read data from other members/clients.
* I/O threads to write data to other members/clients.

You can configure the number of I/O threads using the `hazelcast.io.thread.count` system property. Its default value is 3 per member. If 3 is used, in total there are 7 I/O threads: 1 accept I/O thread, 3 read I/O threads, and 3 write I/O threads. Each I/O thread has its own Selector instance and waits on the `Selector.select` if there is nothing to do.

![image](../../images/NoteSmall.jpg) ***NOTE:*** *You can also specify counts for input and output threads separately. There are `hazelcast.io.input.thread.count` and `hazelcast.io.output.thread.count` properties for this purpose. Please refer to the [System Properties section](25_System_Properties.md) for information on these properties and how to set them.*


Hazelcast periodically scans utilization of each I/O thread and can decide to migrate a connection to a new thread if the existing thread is servicing a disproportionate number of I/O events. You can customize the scanning interval by configuring the `hazelcast.io.balancer.interval.seconds` system property; its default interval is 20 seconds. You can disable the balancing process by setting this property to a negative value.

In case of the read I/O thread, when sufficient bytes for a packet have been received, the `Packet` object is created. This `Packet` object is 
then sent to the system where it is de-multiplexed. If the `Packet` header signals that it is an operation/response, the `Packet` is handed 
over to the operation service (please see the [Operation Threading section](03_Operation_Threading.md)). If the `Packet` is an event, it is handed 
over to the event service (please see the [Event Threading section](01_Event_Threading.md)). 

