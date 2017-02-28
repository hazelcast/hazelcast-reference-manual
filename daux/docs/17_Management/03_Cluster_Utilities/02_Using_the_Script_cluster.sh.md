
You can use the script `cluster.sh`, which comes with the Hazelcast package, to get/change the state of your cluster, to shutdown your cluster and to force your cluster to clean its persisted data and make a fresh start. The latter is the Force Start operation of Hazelcast's Hot Restart Persistence feature. Please refer to the [Force Start section](/13_Storage/02_Hot_Restart_Persistence/02_Force_Start.md).


![image](../../images/NoteSmall.jpg) ***NOTE:*** *The script `cluster.sh` uses `curl` command and `curl` must be installed to be able to use the script.*

The script `cluster.sh` needs the following parameters to operate according to your needs. If these parameters are not provided, the default values are used.

Parameter | Default Value | Description
:--------------|:------|:------------
`-o` or `--operation`|`get-state`|Executes a cluster-wide operation. Operation can be `get-state`, `change-state`, `shutdown`, `force-start`, `get-cluster-version` and `change-cluster-version`.
`-s` or `--state`|None|Updates the state of the cluster to a new state. New state can be `active`, `frozen`, `passive`. This is used with the operation `change-state`. This parameter has no default value; when you use this, you should provide a valid state.
`-a` or `--address`|`127.0.0.1`|Defines the IP address of a cluster member. If you want to manage your cluster remotely, you should use this parameter to provide the IP address of a member to this script.
`-p` or `--port`|`5701`|Defines on which port Hazelcast is running on the local or remote machine. The default value is `5701`.
`-g` or `--groupname`|`dev`|Defines the name of a cluster group which is used for a simple authentication. Please see the [Creating Cluster Groups section](/04_Setting_Up_Clusters/06_Creating_Cluster_Groups.md).
`-P` or `--password`|`dev-pass`|Defines the password of a cluster group. Please see the [Creating Cluster Groups section](/04_Setting_Up_Clusters/06_Creating_Cluster_Groups.md).
`-v` or `--version`|None|Defines the cluster version to change to. To be used in conjunction with `change-cluster-version` operation. 

The script `cluster.sh` is self-documented; you can see the parameter descriptions using the command `sh cluster.sh -h` or `sh cluster.sh --help`.


![image](../../images/NoteSmall.jpg) ***NOTE:*** *You can perform the above operations using the Hot Restart tab of Hazelcast Management Center or using the REST API. Please see the [Hot Restart section](/13_Storage/02_Hot_Restart_Persistence) and [Using REST API for Cluster Management section](/17_Management/03_Cluster_Utilities/03_Using_REST_API_for_Cluster_Management.md).*



#### Example Usages for cluster.sh

Let's say you have a cluster running on remote machines and one Hazelcast member is running on the IP  `172.16.254.1` and on the port
`5702`. The group name and password of the cluster are `test` and `test`.

<br></br>
**Getting the cluster state:**

To get the state of the cluster, use the following command:

`sh cluster.sh -o get-state -a 172.16.254.1 -p 5702 -g test -P test`

The following also gets the cluster state, using the alternative parameter names, e.g., `--port` instead of `-p`:

`sh cluster.sh --operation get-state --address 172.16.254.1 --port 5702 --groupname test --password test`

<br></br>
**Changing the cluster state:**

To change the state of the cluster to `frozen`, use the following command:

`sh cluster.sh -o change-state -s frozen -a 172.16.254.1 -p 5702 -g test -P test`

Similarly, you can use the following command for the same purpose:

`sh cluster.sh --operation change-state --state frozen --address 172.16.254.1 --port 5702 --groupname test --password test`


<br></br>
**Shutting down the cluster:**

To shutdown the cluster, use the following command:

`sh cluster.sh -o shutdown -a 172.16.254.1 -p 5702 -g test -P test`

Similarly, you can use the following command for the same purpose:


`sh cluster.sh --operation shutdown --address 172.16.254.1 --port 5702 --groupname test --password test`


<br></br>
**Partial starting the cluster:**

To partial start the cluster when Hot Restart is enabled, use the following command:

`sh cluster.sh -o partial-start -a 172.16.254.1 -p 5702 -g test -P test`

Similarly, you can use the following command for the same purpose:

`sh cluster.sh --operation partial-start --address 172.16.254.1 --port 5702 --groupname test --password test`


<br></br>
**Force starting the cluster:**

To force start the cluster when Hot Restart is enabled, use the following command:

`sh cluster.sh -o force-start -a 172.16.254.1 -p 5702 -g test -P test`

Similarly, you can use the following command for the same purpose:

`sh cluster.sh --operation force-start --address 172.16.254.1 --port 5702 --groupname test --password test`


<br></br>

**Getting the current cluster version:**

To get the cluster version, use the following command:

`sh cluster.sh -o get-cluster-version -a 172.16.254.1 -p 5702 -g test -P test`

The following also gets the cluster state, using the alternative parameter names, e.g., `--port` instead of `-p`:

`sh cluster.sh --operation get-cluster-version --address 172.16.254.1 --port 5702 --groupname test --password test`

<br></br>

**Changing cluster version:**

Learn more about when you should change the cluster version in [Rolling Member Upgrades section](/05_Rolling_Member_Upgrades.md).

To change the cluster version to `3.9`, use the following command:

`sh cluster.sh -o change-cluster-version -v 3.9 -a 172.16.254.1 -p 5702 -g test -P test`

Cluster version is always in `major.minor` format, using other formats will result in a failure.

<br></br>
![image](../../images/NoteSmall.jpg) ***NOTE:*** *Currently, this script is not supported on the Windows platforms.*
<br></br>