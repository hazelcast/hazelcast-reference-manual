


### Using REST API for Cluster Management

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
**Partial starting the cluster:**

To partial start the cluster when Hot Restart is enabled, use the following command:

```
curl --data "${GROUPNAME}&${PASSWORD}" http://127.0.0.1:${PORT}/hazelcast/rest/management/cluster/partialStart/
```


<br></br>
**Force starting the cluster:**

To force start the cluster when Hot Restart is enabled, use the following command:

```
curl --data "${GROUPNAME}&${PASSWORD}" http://127.0.0.1:${PORT}/hazelcast/rest/management/cluster/forceStart/
```


<br></br>
![image](images/NoteSmall.jpg) ***NOTE:*** *You can also perform the above operations using the Hot Restart tab of Hazelcast Management Center or using the script `cluster.sh`. Please see the [Hot Restart section](http://docs.hazelcast.org/docs/management-center/latest/manual/html/Hot_Restart.html) and [Using the Script cluster.sh section](#using-the-script-cluster-sh).*
<br></br>

**Querying the current cluster version:**

To get the current cluster version, use the following `curl` command:

```
$ curl http://127.0.0.1:${PORT}/hazelcast/rest/management/cluster/version
  {"status":"success","version":"3.9"}
```

<br></br>

**Changing the cluster version:**

To upgrade the cluster version, after having upgraded all members of your cluster to a new minor version, use the following `curl` command:

```
$ curl --data "${GROUPNAME}&${PASSWORD}&${CLUSTER_VERSION}" http://127.0.0.1:${PORT}/hazelcast/rest/management/cluster/version

```

For example, assuming the default group name and password, issue the following command to any member of the cluster to upgrade from cluster version 3.8 to 3.9:

```
$ curl --data "dev&dev-pass&3.9" http://127.0.0.1:5701/hazelcast/rest/management/cluster/version
  {"status":"success","version":"3.9"}
```

<br></br>
![image](images/NoteSmall.jpg) ***NOTE:*** *You can also perform the above cluster version operations using Hazelcast Management Center or using the script `cluster.sh`. Please see the [Rolling Member Upgrades chapter](http://docs.hazelcast.org/docs/management-center/latest/manual/html/Rolling_Upgrade.html) and [Using the Script cluster.sh section](#using-the-script-cluster-sh).*
<br></br>
