## Hot Restart Store

![](images/enterprise-onlycopy.jpg)
<br></br>

![image](images/NoteSmall.jpg) ***NOTE:*** *This feature is still in progress and will be fully available with the final release of Hazelcast 3.6.*


![image](images/NoteSmall.jpg) ***NOTE:*** *This feature is supported for Hazelcast Enterprise 3.6 or higher.*


This chapter explains the Hazelcast's Hot Restart Store feature which provides fast cluster restarts by storing the states of the cluster members into the disk. This feature is currently provided for Hazelcast map data structure and Hazelcast JCache implementation.

### Overview

Hot Restart Store enables you to get your cluster up and running swiftly after a cluster restart that can be caused by planned shutdown (including rolling upgrades) or sudden cluster-wide crash (i.e., power outage). Configuring Hazelcast for hot restart is simple: just enable it on whichever data structures need it. It is also advised to provide an explicit home directory for the storage.

### IP address and port

Hazelcast relies on the pair (IP address, port) as a unique identifier of a node in the cluster. The node must restart with these settings the same as before shutdown, otherwise Hot Restart will fail.
 
###Design details for the Hot Restart store

Hazelcast's Hot Restart store uses the log-structured storage approach. This is a top-level description of what goes on: 

1. The only kind of update operation on persistent data is _appending_. 
2. What is appended are facts about events that happened to the data model represented by the store: either a new value was assigned to a key or a key was removed.
3. Each record associated with key K makes the previous record associated with the same key stale.
4. Stale records contribute to the amount of _garbage_ present in the persistent storage.
5. Measures are taken to remove garbage from storage.

This kind of design focuses almost all of the system's complexity into the garbage collection process, stripping down the client's operation to the bare necessity of guaranteeing persistent behavior: a simple file append operation. Consequently, the latency of operations is close to the theoretical minimum in almost all cases. Complications arise only during prolonged periods of maximum load, and this is where the details of the garbage collection process begin to matter.

###Concurrent, incremental, generational garbage collection

In order to maintain the lowest possible footprint in the update operation latency, the following properties were built into the garbage collection process:

1. There is a dedicated thread which performs garbage collection. We'll call it the Collector and we'll refer to the application thread as the Mutator.
2. On each update there is metadata to be maintained; this is done asynchronously by the Collector thread. The Mutator enqueues update events to the Collector's work queue.
3. The Collector keeps draining its work queue at all times, including while going through the garbage collection cycle. Updates are taken into account at each stage in the GC cycle, preventing the copying of already dead records into compacted files.
4. All GC-induced I/O will compete for the same resources as the Mutator's update operations, therefore measures are taken to minimize the amount of I/O done during garbage collection. Additionally measures are taken to achieve a good interleaving of Collector and Mutator operations, minimizing latency outliers perceived by the Mutator.
5. I/O minimization is subject to a bet on the Weak Generational Garbage Hypothesis, which states that a new record entering the system is likely to soon become garbage. In other words, a key updated now is more likely than average to be updated again soon. 

The I/O minimization scheme was taken from the seminal Sprite LFS paper, [Rosenblum, Ousterhout, _The Design and Implementation of a Log-Structured File System_](http://www.cs.berkeley.edu/~brewer/cs262/LFS.pdf), this is the outline:

1. Data is not written to one huge file, but to many files of moderate size (8 MB). We call them "chunks".
2. Garbage is collected incrementally: by choosing several chunks, copying all their live data to new chunks, then deleting the old ones.
3. I/O is minimized using a collection technique which results in a bimodal distribution of chunks with respect to their garbage content: most files are either almost all live data or all garbage.
4. The technique consists of two main principles:
    1. chunks are seleceted based on their _Cost-Benefit factor_ (see below);
    2. records are sorted by age before copying to new chunks.

The Cost-Benefit factor of a chunk consists of two components multiplied together:

1. the ratio of benefit (amount of garbage that can be collected) to I/O cost (amount of live data to be written);
2. the age of the data in the chunk, measured as the age of the youngest record it contains.

The essence is in the second component: given equal amount of garbage in all chunks, it will make the young ones less attractive to the collector. Assuming the generational garbage hypothesis, this will allow the young chunks to quickly accumulate more garbage.

Sorting records by age will group young records together in a single chunk and will do the same for older records. Therefore the chunks will either tend to keep their data live for a longer time, or quickly become full of garbage.

