

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

The aforementioned applications produce massive amounts of data that need near real-time processing. Hazelcast Jet achieves this by processing the incoming records as soon as possible,  hence lowering the latency, and ingesting the data at high-velocity. Execution model of Jet and keeping both the computation and data storage in memory enables breakthrough application speeds. Since Jet uses Hazelcast IMDG’s discovery mechanisms, it can be used both on-premises and cloud environments.

Following is the logical architecture of Hazelcast Jet

![Jet Logical Arhictecture](images/JetLogicalArch.png)

## Components








