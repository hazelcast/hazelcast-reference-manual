
### WAN Replication Failure Detection and Recovery

The failure detection and recovery mechanisms in WAN handle failures during WAN replication and they closely interact with the list of endpoints that WAN is replicating to. There might be some small differences when using static endpoints or the discovery SPI but here we will outline the general mechanism of failure detection and recovery.

#### WAN Target Endpoint List
 
The WAN connection manager maintains a list of public addresses that it can replicate to at any moment. This list may change over time as failures are detected or as new addresses are discovered when using the discovery SPI. The connection manager does not eagerly create connections to these addresses as they are added to the list to avoid overloading the endpoint with connections from all members using the same configuration. It will try and connect to the endpoint just before WAN events are about to be transmitted. This means that if there are no updates on the map or cache using WAN replication, there will be no WAN events and the connection will not be established to the endpoint.

When more than one endpoint is configured, traffic will be load balanced between them using the partition, so that the same partitions are always sent to the same target member, ensuring ordering by partition.
 
#### WAN Failure Detection
 
If using the Hazelcast IMDG Enterprise edition class `WanBatchReplication` (see the [Defining WAN replication section](#defining-wan-replication)), the WAN replication will catch any exceptions when sending the WAN events to the endpoint. In the case of an exception, the endpoint will be removed from the endpoint list to which WAN replicates and the WAN events will be resent to a different address. The replication will be retried until it is successful.

### WAN Endpoint Recovery

Periodically the WAN connection manager will try and "rediscover" new endpoints. The period is 10 seconds by default but configurable with the `discovery.period` property (see the [Defining WAN replication section](#defining-wan-replication)).

The discovered endpoints depend on the configuration used to define WAN replication. If using static WAN endpoints (by using the `endpoints` property), the discovered endpoints are always the same and are equal to the values defined in the configuration. If using discovery SPI with WAN, the discovered endpoints may be different each time.

When the discovery returns a list of endpoints (addresses), the WAN target endpoint list is updated. Newly discovered endpoints are added and endpoints which are no longer in the discovered list are removed. Newly discovered endpoints may include addresses to which WAN replication has previously failed. This means that once a new WAN event is about to be sent, a connection will be reestablished to the previously failed endpoint and WAN replication will be retried. The endpoint can later be again removed from the target endpoint list if the replication again encounters failure.