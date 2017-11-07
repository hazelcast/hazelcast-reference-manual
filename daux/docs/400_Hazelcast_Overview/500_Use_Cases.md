
Hazelcast can be used:

-	to share server configuration/information to see how a cluster performs.
-	to cluster highly changing data with event notifications, e.g., user based events, and to queue and distribute background tasks.
-	as a simple Memcache with Near Cache.
-	as a cloud-wide scheduler of certain processes that need to be performed on some members.
-	to share information (user information, queues, maps, etc.) on the fly with multiple members in different installations under OSGI environments.
-	to share thousands of keys in a cluster where there is a web service interface on an application server and some validation.
-	as a distributed topic (publish/subscribe server) to build scalable chat servers for smartphones.
-	as a front layer for a Cassandra back-end.
-	to distribute user object states across the cluster, to pass messages between objects, and to share system data structures (static initialization state, mirrored objects, object identity generators).
-	as a multi-tenancy cache where each tenant has its own map.
-	to share datasets, e.g., table-like data structure, to be used by applications.
-	to distribute the load and collect status from Amazon EC2 servers where the front-end is developed using, for example, Spring framework.
-	as a real-time streamer for performance detection.
-	as storage for session data in web applications (enables horizontal scalability of the web application).
