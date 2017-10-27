

# Hazelcast Jet

![Note](images/NoteSmall.jpg) ***NOTE:*** *This chapter briefly describes Hazelcast Jet. For detailed information and Jet documentation, please visit [jet.hazelcast.org](https://jet.hazelcast.org/).*

## Overview

Hazelcast Jet, an Apache 2 licensed open source project and built on top of the Hazelcast IMDG platform, is a distributed processing engine for large data sets. It reuses some features and services of Hazelcast IMDG, but it is a separate product with features not available in IMDG. 

With Hazelcast IMDG providing storage functionality, Jet performs parallel execution to enable data-intensive applications to operate in near real-time. This parallel execution is achieved by using green threads (threads that are scheduled by a runtime library or VM) to optimize the utilization of the computing resources. Jet uses directed acyclic graphs (DAG) to model the relationships between individual steps of the data processing. Therefore, it can execute both batch- and stream-based data processing applications. 

Hazelcast Jet is appropriate for applications that require a near real-time experience such as sensor updates in IoT architectures (house thermostats, lighting systems, etc.), in-store e-commerce systems and social media platforms. Typical use cases include the following:

- Real-time (low-latency) stream processing
- Implementing Change Data Capture (CDC)
- Moving from batch to stream processing
- Fast batch processing
- Internet-of-things (IoT) data ingestion, processing and storage
- Data processing microservice architectures

The aforementioned applications produce massive amounts of data that need near real-time processing. Hazelcast Jet achieves this by processing the incoming records as soon as possible,  hence lowering the latency, and ingesting the data at high-velocity. Execution model of Jet and keeping both the computation and data storage in memory enables high application speeds. Since Jet uses Hazelcast IMDG’s discovery mechanisms, it can be used both on-premises and cloud environments. Hazelcast Jet typically runs on several machines that form a cluster. 

Following is the logical architecture of Hazelcast Jet

![Jet Logical Arhictecture](images/JetLogicalArch.png)

## Components

Jet's core is a distributed computation engine based on DAG (Directed Acyclic Graph) model. In this model the following components exist:

- **Vertex**: Main unit of work in a Jet computation. There are three kinds of vertex in Jet: source, computational, and sink. Source vertex injects data from the environment into the Jet job. Computational vertex accepts data, performs the computation and emits the results. Sink vertex drains these results of the Jet job into the environment.
- **Processor**: Contains the code of the computation to be performed by a vertex. Each vertex’s computation is implemented by a Processor. On each Jet cluster member there are one or more instances of the processor running in parallel for a single vertex.
- **Edge**: Transfers data from one vertex to the next. It decides which target processor an item should be routed to. This could be guided by the partitioning logic, or could be one of the other choices like broadcast or pooled unicast.
- **Job**: Unit of work which is executed and it is composed of processors. 


## How You Can Use It

???

## How Data is Processed

???

## Relationship with Hazelcast IMDG

???





