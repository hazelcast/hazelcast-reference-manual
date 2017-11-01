
## Why Hazelcast?



**A Glance at Traditional Data Persistence**

Data is at the core of software systems. In conventional architectures, a relational database persists and provides access to data. Applications are talking directly with a database which has its backup as another machine. To increase performance, tuning or a faster machine is required. This can cost a large amount of money or effort.

There is also the idea of keeping copies of data next to the database, which is performed using technologies like external key-value stores or second level caching that help offload the database. However, when the database is saturated or the applications perform mostly "put" operations (writes), this approach is of no use because it insulates the database only from the "get" loads (reads). Even if the applications are read-intensive there can be consistency problems - when data changes, what happens to the cache, and how are the changes handled? This is when concepts like time-to-live (TTL) or write-through come in.

In the case of TTL, if the access is less frequent than the TTL, the result will always be a cache miss. On the other hand, in the case of write-through caches, if there are more than one of these caches in a cluster, we again will have consistency issues. This can be avoided by having the nodes communicate with each other so that entry invalidations can be propagated.

We can conclude that an ideal cache would combine TTL and write-through features. There are several cache servers and in-memory database solutions in this field. However, these are stand-alone single instances with a distribution mechanism that is provided by other technologies to an extent. So, we are back to square one; we experience saturation or capacity issues if the product is a single instance or if consistency is not provided by the distribution.

**And, there is Hazelcast**

Hazelcast, a brand new approach to data, is designed around the concept of distribution. Hazelcast shares data around the cluster for flexibility and performance. It is an in-memory data grid for clustering and highly scalable data distribution.

One of the main features of Hazelcast is that it does not have a master member. Each cluster member is configured to be the same in terms of functionality. The oldest member (the first member created in the cluster) automatically performs the data assignment to cluster members. If the oldest member dies, the second oldest member takes over.

Another main feature of Hazelcast is that the data is held entirely in-memory. This is fast. In the case of a failure, such as a member crash, no data will be lost since Hazelcast distributes copies of the data across all the cluster members.

As shown in the feature list in the [Hazelcast Overview](#hazelcast-overview), Hazelcast supports a number of distributed data structures and distributed computing utilities. These provide powerful ways of accessing distributed clustered memory and accessing CPUs for true distributed computing. 

**Hazelcast's Distinctive Strengths**


* Hazelcast is open source.
* Hazelcast is only a JAR file. You do not need to install software.
* Hazelcast is a library, it does not impose an architecture on Hazelcast users.
* Hazelcast provides out of the box distributed data structures, such as Map, Queue, MultiMap, Topic, Lock and Executor.
* There is no "master," meaning no single point of failure in a Hazelcast cluster; each member in the cluster is configured to be functionally the same.
* When the size of your memory and compute requirements increase, new members can be dynamically joined to the Hazelcast cluster to scale elastically.
* Data is resilient to member failure. Data backups are distributed across the cluster. This is a big benefit when a member in the cluster crashes as data will not be lost.
* Members are always aware of each other unlike in traditional key-value caching solutions.
* You can build your own custom-distributed data structures using the Service Programming Interface (SPI) if you are not happy with the data structures provided.

Finally, Hazelcast has a vibrant open source community enabling it to be continuously developed.

Hazelcast is a fit when you need:

-	analytic applications requiring big data processing by partitioning the data.
-	to retain frequently accessed data in the grid.
-	a cache, particularly an open source JCache provider with elastic distributed scalability.
-	a primary data store for applications with utmost performance, scalability and low-latency requirements.
-	an In-Memory NoSQL Key Value Store.
-	publish/subscribe communication at highest speed and scalability between applications.
-	applications that need to scale elastically in distributed and cloud environments.
-	a highly available distributed cache for applications.
-	an alternative to Coherence and Terracotta.

