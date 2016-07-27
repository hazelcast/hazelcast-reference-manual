
## Solace Integration

This section explains how you can integrate Hazelcast's WAN replication with [Solace](http://www.solacesystems.com/) messaging platform. With this integration, you can publish and consume WAN replication events to/from Solace appliances. For this purpose, Hazelcast WAN replication module has the following classes:

- `SolaceWanPublisher`
- `SolaceWanConsumer`

You can register these classes using the configuration elements `<wan-publisher>` and `<wan-consumer>` while configuring your WAN replication. Please see the following sections for configuration details.

### Solace WAN Publisher

Following is an example declarative configuration for 

 
