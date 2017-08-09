## Hazelcast Striim Hot Cache

<font color="#3981DB">**Hazelcast IMDG Enterprise**</font>
<br></br>

With Hazelcast Striim Hot Cache, you can reduce the latency of propagation of data from your backend database into your Hazelcast cache to milliseconds. You have the flexibility to run multiple applications off a single database, keeping Hazelcast cache refreshes current while adhering to low latency SLAs.

This joint solution with Hazelcast's in-memory data grid uses Striim's Change Data Capture (CDC) to solve the cache consistency problems.

When you have an application that needs to retrieve and store information in a database, you can use a Hazelcast in-memory cache for rapid access to data. There may be some other applications that make database updates; in this case, your application may show out-of-date or invalid information.

Hazelcast Striim Hot Cache solves this by using streaming CDC to synchronize the cache with the database in real time. This ensures that both the cache and your application always have the most current data.

Through CDC, Striim is able to recognize which tables and key values have changed. It immediately captures these changes with their table and key, and, using the Hazelcast Striim writer, pushes those changes into the cache.

To learn more, please see the [full press release](http://www.striim.com/blog/newsroom/press/hazelcast-striim-hot-cache/), visit the Hazelcast Striim Hot Cache [product page](https://hazelcast.com/products/solutions/hazelcast-striim-hot-cache/), or download a fully loaded evaluation copy of [Striim for Hazelcast Hot Cache](http://www.striim.com/download-striim-for-hazelcast-hot-cache/).
