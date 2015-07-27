

## Hazelcast Topology

If you have an application whose main focal point is asynchronous or high performance computing and lots of task
executions, then embedded deployment is very useful. In this type, nodes include both the application and data.
See the below illustration.

![](images/P2Pcluster.jpg)



You can have a cluster of server nodes that can be independently created and scaled. Your clients communicate with
these server nodes to reach to the data on them. Hazelcast provides native clients (Java, .NET and C++), Memcache
clients and REST clients. See the below illustration.

![](images/CSCluster.jpg)

