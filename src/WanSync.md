
### Synchronizing WAN Target Cluster

Starting with 3.7, You can initiate a synchronization operation on an IMap for a specific target cluster. 
Synchronization operation sends all the data of an IMap to a target cluster to align the state of the target IMap with the source IMap.
Synchronization is useful if two remote clusters lost their synchronization due to WAN queue overflow or in restart scenerios.

Synchronization can be initiated through the Hazelcast's REST API. Below is the URL for the REST call;

```
http://member_ip:port/hazelcast/rest/wan/sync/map
```

You need to add parameters to the request in the following order seperated by "&";
  - Name of the wan replication config
  - Target group name
  - Map name to be synced

Imagine that you've configured an IMap with below WAN replication config;

```xml
<wan-replication name="my-wan-cluster">
      <wan-publisher group-name="istanbul">
          <class-name>com.hazelcast.enterprise.wan.replication.WanBatchReplication</class-name>
            ...
      </wan-publisher>
<wan-replication>
...
<map name="my-map">
    <wan-replication-ref name="my-wan-cluster">
       <merge-policy>com.hazelcast.map.merge.PassThroughMergePolicy</merge-policy>
    </wan-replication-ref>
</map>
```

A sample CURL command to initiate synchronization for "my-map" would be;

```
curl -H "Content-type: text/plain" -X POST -d "my-wan-cluster&istanbul&my-map" --URL http://127.0.0.1:5701/hazelcast/rest/wan/sync/map
```




