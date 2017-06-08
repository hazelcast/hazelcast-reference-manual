
### Discovering Members via Kubernetes

<img src="images/Plugin_New.png" alt="Kubernetes Plugin" height="22" width="84">
<br></br>

This plugin provides the possibility to lookup IP addresses of other members by resolving the requests against a Kubernetes Service Discovery system. It supports two different options of resolving against the discovery registry: (i) a request to the REST API, (ii) DNS Lookup against a given DNS service name. This discovery feature is provided as a Hazelcast plugin. Please see its documentation at <a href="https://github.com/hazelcast/hazelcast-kubernetes/blob/master/README.adoc" target="_blank">Hazelcast Kubernetes</a> for information on configuring and using it.