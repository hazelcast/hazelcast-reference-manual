
Starting with 3.7 you can initiate a synchronization operation on an IMap for a specific target cluster. 
Synchronization operation sends all the data of an IMap to a target cluster to align the state of target IMap with source IMap.
Synchronization is useful if two remote clusters lost their synchronization due to WAN queue overflow or in restart scenarios.

Synchronization can be initiated through Hazelcast's REST API. Below is the URL for the REST call;

```
http://member_ip:port/hazelcast/rest/wan/sync/map
```

You need to add parameters to the request in the following order separated by "&";

  - Name of the WAN replication configuration
  - Target group name
  - Map name to be synchronized

Assume that you have configured an IMap with a WAN replication configuration as follows:

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

Then, a sample CURL command to initiate the synchronization for "my-map" would be as follows:

```
curl -H "Content-type: text/plain" -X POST -d "my-wan-cluster&istanbul&my-map" --URL http://127.0.0.1:5701/hazelcast/rest/wan/sync/map
```




