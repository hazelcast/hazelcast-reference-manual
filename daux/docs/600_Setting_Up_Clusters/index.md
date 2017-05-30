

This chapter describes Hazelcast clusters and the methods cluster members and native clients use to form a Hazelcast cluster. 

#### Discovering Cluster Members

A Hazelcast cluster is a network of cluster members that run Hazelcast. Cluster members (also called nodes) automatically join together to form a cluster. This automatic joining takes place with various discovery mechanisms that the cluster members use to find each other. Hazelcast uses the following discovery mechanisms:

- [Multicast](00_Discovering_Members_by_Multicast.md)
- [TCP](01_Discovering_Members_by_TCP.md)
- [EC2 Cloud](02_Discovering_Members_within_EC2_Cloud.md)
- [jclouds&reg;](04_Discovering_Members_with_jclouds.md)

Each discovery mechanism is explained in the following sections.

	
![image](../images/NoteSmall.jpg) ***NOTE:*** *After a cluster is formed, communication between cluster members is always via TCP/IP, regardless of the discovery mechanism used.*



