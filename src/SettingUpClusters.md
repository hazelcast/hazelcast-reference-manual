
# Setting Up Clusters

This chapter describes Hazelcast clusters and the methods cluster members and native clients use to form a Hazelcast cluster. 

## Discovery Mechanisms

A Hazelcast cluster is a network of cluster members that run Hazelcast. Cluster members (also called nodes) automatically join together to form a cluster. This automatic joining takes place with various discovery mechanisms that the cluster members use to find each other.

Please note that, after a cluster is formed, communication between cluster members is always via TCP/IP, regardless of the discovery mechanism used.

Hazelcast uses the following discovery mechanisms.

![image](images/NoteSmall.jpg) ***NOTE:*** *You can refer to the [Hazelcast IMDG Deployment and Operations Guide](https://hazelcast.com/resources/hazelcast-deployment-operations-guide/) for advice on the best discovery mechanism to use.*


### TCP

You can configure Hazelcast to be a full TCP/IP cluster. Please see the [Discovering Members by TCP](#discovering-members-by-tcp) section for configuration details.

### Multicast

Multicast mechanism is not recommended for production since UDP is often blocked in production environments and other discovery mechanisms are more definite.

With this mechanism, Hazelcast allows cluster members to find each other using multicast communication. Please see the [Discovering Members by Multicast](#discovering-members-by-multicast) section.

### AWS Cloud Discovery

Hazelcast supports EC2 auto-discovery. It is useful when you do not want to provide or you cannot provide the list of possible IP addresses. This discovery feature is provided as a Hazelcast plugin. Please see its [documentation](https://github.com/hazelcast/hazelcast-aws/blob/master/README.md) for information on configuring and using it.

### Apache jclouds® Cloud Discovery

Hazelcast members and native clients support jclouds® for discovery. This mechanism allows applications to be deployed in various cloud infrastructure ecosystems in an infrastructure-agnostic way. This discovery feature is provided as a Hazelcast plugin. Please see its [documentation](https://github.com/hazelcast/hazelcast-jclouds/blob/master/README.md) for information on configuring and using it.

### Azure Cloud Discovery

Hazelcast offers a discovery strategy for your Hazelcast applications running on Azure. This strategy provides all of your Hazelcast instances by returning the virtual machines within your Azure resource group that are tagged with a specified value. This discovery feature is provided as a Hazelcast plugin. Please see its [documentation](https://github.com/hazelcast/hazelcast-azure/blob/master/README.md) for information on configuring and using it.

### Zookeeper Cloud Discovery

This discovery mechanism provides a service based discovery strategy by using Apache Curator to communicate with your Zookeeper server. You can use this plugin with [Discovery SPI](http://docs.hazelcast.org/docs/latest-development/manual/html/Extending_Hazelcast/Discovery_SPI/index.html) enabled Hazelcast 3.6.1 and higher applications. This is provided as a Hazelcast plugin. Please see its [documentation](https://github.com/hazelcast/hazelcast-zookeeper/blob/master/README.md) for information on configuring and using it.

### Consul Cloud Discovery

Consul is a highly available and distributed service discovery and key-value store designed with support for the modern data center to make distributed systems and configuration easy. This mechanism provides a Consul based discovery strategy for Hazelcast enabled applications (Hazelcast 3.6 and higher) and enables Hazelcast members to dynamically discover one another via Consul. This discovery feature is provided as a Hazelcast plugin. Please see its [documentation](https://github.com/bitsofinfo/hazelcast-consul-discovery-spi) for information on configuring and using it.

### etcd Cloud Discovery

This mechanism provides an [etcd](https://coreos.com/etcd/) based discovery strategy for Hazelcast enabled applications (Hazelcast 3.6 and higher). This is an easy to configure plug-and-play Hazelcast discovery strategy that will optionally register each of your Hazelcast members with etcd and enable Hazelcast members to dynamically discover one another via etcd. This discovery feature is provided as a Hazelcast plugin. Please see its [documentation](https://github.com/bitsofinfo/hazelcast-etcd-discovery-spi/blob/master/README.md) for information on configuring and using it.

### Hazelcast for PCF

Using a clickable Hazelcast Tile for Pivotal Cloud Foundry (PCF), you can deploy your Hazelcast cluster on PCF. This feature is provided as a Hazelcast plugin. Please see its [documentation](https://docs.pivotal.io/partners/hazelcast/index.html) on how to install, configure and use the plugin Hazelcast for PCF.

### Hazelcast OpenShift Integration

Hazelcast can run inside OpenShift benefiting from its cluster management software Kubernetes for discovery of members. Using Hazelcast Docker images, templates and default configuration files, you can deploy Hazelcast IMDG and Hazelcast IMDG Enterprise onto OpenShift. This discovery feature is provided as a Hazelcast plugin. Please see its [documentation](https://github.com/hazelcast/hazelcast-openshift) for information on this deployment.

### Eureka Cloud Discovery

Eureka is a REST based service that is primarily used in the AWS cloud for locating services for the purpose of load balancing and failover of middle-tier servers. Hazelcast supports Eureka V1 discovery; Hazelcast members within EC2 Virtual Private Cloud can discover each other using this mechanism. This discovery feature is provided as a Hazelcast plugin. Please see its [documentation](https://github.com/hazelcast/hazelcast-eureka).

### Heroku Cloud Discovery

Heroku is a platform as a service (PaaS) with which you can build, run, and operate applications entirely in the cloud. It is a cloud platform based on a managed container system, with integrated data services and a powerful ecosystem. Hazelcast offers a discovery plugin that looks for IP addresses of other members by resolving service names against the Heroku DNS Discovery in Heroku Private Spaces. This discovery feature is provided as a Hazelcast plugin. Please see its [documentation](https://github.com/jkutner/hazelcast-heroku-discovery/blob/master/README.md).

### Kubernetes Cloud Discovery

Kubernetes is an open source system for automating deployment, scaling, and management of containerized applications. Hazelcast provides Kubernetes discovery mechanism that looks for IP addresses of other members by resolving the requests against a Kubernetes Service Discovery system. It supports two different options of resolving against the discovery registry: (i) a request to the REST API, (ii) DNS Lookup against a given DNS service name. This discovery feature is provided as a Hazelcast plugin. Please see its [documentation](https://github.com/hazelcast/hazelcast-kubernetes/blob/master/README.adoc) for information on configuring and using it.
