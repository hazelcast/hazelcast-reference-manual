
# Setting Up Clusters

This chapter describes Hazelcast clusters and the methods cluster members and native clients use to form a Hazelcast cluster. 

## Discovering Cluster Members

A Hazelcast cluster is a network of cluster members that run Hazelcast. Cluster members (also called nodes) automatically join together to form a cluster. This automatic joining takes place with various discovery mechanisms that the cluster members use to find each other. Hazelcast uses the following discovery mechanisms:

- [TCP](#discovering-members-by-tcp)
- [EC2 Cloud](#discovering-members-within-ec2-cloud)
- [jclouds&reg;](#discovering-members-with-jclouds)
- [Multicast](#discovering-members-by-multicast)


Please note that, after a cluster is formed, communication between cluster members is always via TCP/IP, regardless of the discovery mechanism used.

Each discovery mechanism is explained in the following sections.
	
![image](../images/NoteSmall.jpg) ***NOTE:*** *Please refer to the [Hazelcast IMDG Deployment and Operations Guide](https://hazelcast.com/resources/hazelcast-deployment-operations-guide/) for advice on the best discovery mechanism to use.*