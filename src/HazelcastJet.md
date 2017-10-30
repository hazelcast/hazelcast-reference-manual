

# Hazelcast Jet

![Note](images/NoteSmall.jpg) ***NOTE:*** *This chapter briefly describes Hazelcast Jet. For detailed information and Jet documentation, please visit [jet.hazelcast.org](https://jet.hazelcast.org/).*

## Overview

Hazelcast Jet, an Apache 2 licensed open source project and built on top of the Hazelcast IMDG platform, is a distributed processing engine for large data sets. It reuses the features and services of Hazelcast IMDG, but it is a separate product with features not available in IMDG. 

With Hazelcast IMDG providing storage functionality, Jet performs parallel execution in a Hazelcast Jet cluster to enable data-intensive applications to operate in near real-time. Jet uses green threads (threads that are scheduled by a runtime library or VM) to achieve this parallel execution.

Hazelcast Jet uses directed acyclic graphs (DAG) to model the relationships between individual steps of the data processing. Therefore, it can execute both fast batch- and stream-based data processing applications. 

Hazelcast Jet is appropriate for applications that require a near real-time experience such as operations in IoT architectures (house thermostats, lighting systems, etc.), in-store e-commerce systems and social media platforms. Typical use cases include the following:

- Real-time (low-latency) stream processing
- Implementing Change Data Capture (CDC)
- Moving from batch to stream processing
- Fast batch processing
- Internet-of-things (IoT) data ingestion, processing and storage
- Data processing microservice architectures

The aforementioned applications produce huge amounts of data that require near real-time processing. Hazelcast Jet achieves this by processing the incoming records as soon as possible,  hence lowering the latency, and ingesting the data at high-velocity. Jet's execution model and keeping both the computation and data storage in memory enables high application speeds. 

Since Jet uses Hazelcast IMDG’s discovery mechanisms, it can be used both on-premises and cloud environments. Hazelcast Jet typically runs on several machines that form a cluster. 

Following is the logical architecture of Hazelcast Jet

![Jet Logical Arhictecture](images/JetLogicalArch.png)

## Components

Jet's core is a distributed computation engine based on DAG (Directed Acyclic Graph) model. In this model the following components exist:

- **Vertex**: Main unit of work in a Jet computation. There are three kinds of vertex in Jet: source, computational, and sink. Source vertex injects data from the environment into the Jet job. Computational vertex accepts data, performs the computation and emits the results; these are the vertices where the main action takes place. Sink vertex drains these results of the Jet job into the environment.
- **Processor**: Contains the code of the computation to be performed by a vertex. Each vertex’s computation is implemented by a Processor. On each Jet cluster member there are one or more instances of the processor running in parallel for a single vertex.
- **Edge**: Transfers data from one vertex to the next. It decides which target processor an item should be routed to. This could be guided by the partitioning logic, or could be one of the other choices like broadcast or pooled unicast.
- **Job**: Unit of work which is executed; it is composed of processors. 

Please refer to the [The DAG section](http://docs.hazelcast.org/docs/jet/0.4/manual/Architecture.html#page_The+DAG) in Hazelcast Jet's Reference Manual for more information on the units of a DAG.


## How You Can Use It

You can use Jet in one of the following ways: 

1. Building your DAG using Jet's Core API which exposes the full potential of Jet. To build the DAG, you basically create all the vertices, configure the local parallelism of these vertices, and create the edges using the Core API.
2. Using `java.util.stream` as a high-level API. The operations of `java.util.stream` are first mapped to a DAG and executed. Then the result of executions is returned in the same way as in JDK`s implementation.

You can refer to the [Word Counting example section](http://docs.hazelcast.org/docs/jet/0.4/manual/Getting_Started/Hazelcast_Jet_101_-_Word_Counting_Batch_Job.html) in Hazelcast Jet's Reference Manual for more information on how to model, implement and run a DAG.


## Data Processing Styles

The data processing is traditionally divided into batch and stream processing.

Batch data is considered as bounded, i.e., finite, and batch processing typically may refer to running a job on a data set which is available in a data center.

Stream data is considered as unbounded, i.e., infinite, and stream processing deals with in-flight data before it is stored. It offers lower latency; data is processed on-the-fly and you do not have to wait for the whole data set to arrive in order to run a computation.

???Maybe talk about windowing here???

## Relationship with Hazelcast IMDG

Hazelcast Jet leans on Hazelcast IMDG for cluster formation and maintenance, data partitioning, and networking; all the services of IMDG are available to your Jet Jobs. A Jet instance is also a fully functional Hazelcast IMDG instance and a Jet cluster is also a Hazelcast IMDG cluster.

A Jet job is implemented as a Hazelcast IMDG proxy, similar to the other services and data structures in Hazelcast. Hazelcast operations are used for different actions that can be performed on a job. Jet can also be used with the Hazelcast Client, which uses the Hazelcast Open Binary Protocol to communicate different actions to the server instance.

Hazelcast Jet can use Hazelcast IMDG maps, caches and lists on the embedded cluster as sources and sinks of data and make use of data locality. Hazelcast IMDG's IMap or ICache is a partitioned data structure distributed across the cluster and Jet members can read from these structures by having each member read just its local partitions. Hazelcast IMDG's IList is stored on a single partition, all the data will be read on the single member that owns that partition. 

When using a map, cache or list as a sink, it is not possible to directly make use of data locality because the emitted key-value pair may belong to a non-local partition. In this case the pair must be transmitted over the network to the member which owns that particular partition. 

Hazelcast Jet can also use any remote Hazelcast IMDG instance via Hazelcast IMDG connector. 

Benefits of embedded Hazelcast IMDG:

- Sharing the processing state among Jet Jobs.
- Caching intermediate processing results.
- Enriching processed events; cache remote data, e.g., fact tables from a database, on Jet nodes.
- Running advanced data processing tasks on top of Hazelcast data structures.
- Improving development processes by making start up of a Jet cluster simple and fast.

Jet Jobs take advantage of the Hazelcast IMDG connector by allowing reading and writing records to/from a remote Hazelcast IMDG instance.

Use a remote Hazelcast IMDG cluster for:

- Distributing data across IMap, ICache and IList structures.
- Sharing state or intermediate results among more Jet clusters.
- Isolating the processing cluster (Jet) from operational data storage cluster (IMDG).
- Publishing intermediate results, e.g., to show real-time processing stats on a dashboard.



