
## Deploying On Pivotal Cloud Foundry

<img src="images/Plugin_New.png" alt="Azure Plugin" height="22" width="84">
<br></br>



Starting with Hazelcast 3.7, you can deploy your Hazelcast cluster onto Cloud Foundry. This deployment enables Hazelcast to be used in multiple ways on Cloud Foundry platform. You can deploy Hazelcast in the following ways:

- **Unmanaged/User Managed Service**: In this way of deployment, Hazelcast members run as a service. This service is hosted in an environment outside of Cloud Foundry platform and bound to the applications pushed to Cloud Foundry by the User Provided Services framework. 
- **Embedded**: Applications with Hazelcast embedded topology are pushed onto Cloud Foundry as individual instances. These instances discover each other using the Discovery SPI implementation. This implementation is integrated with a registration service such as Consul and Eureka.
- **Hazelcast Service Broker**: In this way of deployment, Hazelcast runs as a native Cloud Foundry service. Using the Hazelcast Service Broker implementation, this service is provisioned and maintained by the Cloud Foundry platform itself. 



Integration between Hazelcast and Pivotal Cloud Foundry is provided as a Hazelcast plugin. Please see its own GitHub repo at <a href="https://github.com/hazelcast/hazelcast-cloudfoundry" target="_blank">Hazelcast Cloud Foundry</a> for details on configurations and usages.






