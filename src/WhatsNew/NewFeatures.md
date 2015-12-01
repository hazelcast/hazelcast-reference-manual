# What's New in Hazelcast 3.6

This chapter includes the release notes, information on how to upgrade Hazelcast from previous releases and the revision history for this document.


## Release Notes

This section lists the new features and enhancements developed and bugs fixed for this release.


### New Features

The following the new features introduced with Hazelcast 3.6 release.

- **High-Density Memory Store for Hazelcast Map**: With this release, Hazelcast Map data structure is now equipped with the High-Density Memory Store, previously implemented for Hazelcast JCache. Please refer to the [Setting In Memory Format section](#setting-in-memory-format).
- **Discovery Service Provider Interface (Discovery SPI)**: You can use this SPI to discover  Hazelcast instances on cloud environments provided by jclouds&reg;, Kubernetes and many more. The existing discovery mechanisms that Hazelcast provides (Multicast, TCP/IP and Amazon EC2) have been re-implemented on top of this new Discovery SPI. Please refer to the [Discovery SPI section](#discovery-spi).
- **Client Protocol**: This feature presents the Hazelcast's new open binary client protocol. Please refer to <a href="http://hazelcast.org/documentation/" target="_blank">Open Binary Client Protocol Documentation</a>.
- **Client Cross Version Compatibility**: Now you can upgrade your Hazelcast clients independently from servers and other clients. Please refer to <a href="http://hazelcast.org/documentation/" target="_blank">Open Binary Client Protocol Documentation</a>.
- **Support for cloud providers through jclouds&reg;**: Hazelcast now supports deployments on all the well-known cloud providers through the <a href="https://jclouds.apache.org/" target="_blank">jclouds&reg;</a> open source library. Please refer to the [Discovering Members with jclouds section](#discovering-members-with-jclouds).
- **Hot Restart Store**: This new feature provides fast restarting of the Hazelcast clusters. This is achieved by storing the state of the cluster members to the disk. Please refer to the [Hot Restart Store section](#hot-restart-store) for more details.
- **Ringbuffer and Reliable Topic in Hazelcast Clients**: The data structures Ringbuffer and Reliable Topic recently introduced by Hazelcast (with the release 3.5) are now implemented for Hazelcast Java Client. Ringbuffer has also been implemented for .NET Client.
- **Cluster Quorum for Hazelcast JCache**: Cluster Quorum checks are now provided for Hazelcast JCache implementations, too. Please refer to the [Defining a Cluster Quorum section](#defining-a-cluster-quorum) to refresh and to the [ICache Configuration section](#icache-configuration) to learn configuring it for JCache.
- **Split Brain Syndrome handler for Hazelcast JCache**: Now Split Brain Syndrome is handled in JCache as it is taken care in Hazelcast Map. Please refer to the [JCache Split-Brain section](#jcache-split-brain).  
- **Partition Lost Listener for Hazelcast JCache**: You can listen to partition lost events fired in your Hazelcast JCache implementation. Please refer to the [ICache Configuration section](#icache-configuration).
- **Hazelcast Docker image**: Now you can run Hazelcast using our image in the Docker platform. Please refer to <a href="https://hub.docker.com/r/hazelcast/" target="_blank">here</a>.
- **Lite Members**: With the re-introduction of Hazelcast Lite Members (it was removed starting with Hazelcast 3.0 release), you are able to specify certain members in your cluster so that they do not store data. You can use these lite members mostly for your task executions and listener registrations. Please refer to [Enabling Lite Members](#enabling-lite-members).
- **Querying in collections and arrays**: Hazelcast is now able to query and index attributes of objects stored in a collection or array. Please refer to the [Querying in collections section](#querying-in-collections-and-arrays).
- **Custom attributes extraction**: It is now possible to extract a value of an object's attribute using a custom extractor class. Please refer to the [Custom attributes](#custom-attributes).
- **Acquiring locks with a lease time**: Now, you can try to acquire locks with a lease time. Please refer to the the comment for the method `tryLock()` in [ILock code](https://github.com/hazelcast/hazelcast/blob/master/hazelcast/src/main/java/com/hazelcast/core/ILock.java).
- **Monitoring the WAN replication**: You can now monitor the state of your WAN replications using the Hazelcast Management Center. Please refer to the [Monitoring WAN Replication section](#monitoring-wan-replication).


