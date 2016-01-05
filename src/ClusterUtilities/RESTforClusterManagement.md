


#### Using REST API for Cluster Management

Besides the Management Center's Hot Restart tab and the script `cluster.sh`, you can also use REST API to manage your cluster's state. The following are the commands you can use.

<br></br>
**Getting the cluster state:**

To get the state of the cluster, use the following command:

```
curl --data "${GROUPNAME}&${PASSWORD}" http://127.0.0.1:5701/hazelcast/rest/management/cluster/state
```

<br></br>
**Changing the cluster state:**

To change the state of the cluster to `frozen`, use the following command:

```
curl --data "${GROUPNAME}&${PASSWORD}&${STATE}" http://127.0.0.1:${PORT}/hazelcast/rest/management/cluster/changeState 
```


<br></br>
**Shutting down the cluster:**

To shutdown the cluster, use the following command:

```
curl --data "${GROUPNAME}&${PASSWORD}"  http://127.0.0.1:${PORT}/hazelcast/rest/management/cluster/shutdown
```


<br></br>
**Force starting the cluster:**

To force start the cluster, use the following command:

```
curl --data "${GROUPNAME}&${PASSWORD}" http://127.0.0.1:${PORT}/hazelcast/rest/management/cluster/forceStart/
```


<br></br>
![image](images/NoteSmall.jpg) ***NOTE:*** *You can also perform the above operations using the Hot Restart tab of Hazelcast Management Center or using the script `cluster.sh`. Please see the [Hot Restart section](#hot-restart) and [Using the Script cluster.sh section](#using-the-script-cluster-sh).*
<br></br>


