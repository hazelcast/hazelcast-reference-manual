


#### Using the Script cluster.sh

`cluster.sh` needs a few parameters to operate, if these parameters are not provided default values are used. Table below describes these parameters,

Parameter | Default Value | Description
:--------------|:------|:------------
`-o` or `--operation`|`get-state`|Executes cluster-wide operation. Operation can be `get-state`, `change-state`, `shutdown` and `force-start`.
`-s` or `--state`|None|Updates state of the cluster to new state. New state can be `active`, `frozen`, `passive`. Used with `change-state` operation and has no default value. A valid state should be provided.
`-a` or `--address`|`127.0.0.1`|Defines ip address of a member who is part of a cluster. If you want to manage your cluster from a remote machine, you should provide ip address of a member to the script.
`-p` or `--port`|`5701`|Defines which port hazelcast is running on local or remote machine. Default value is `5701`.
`-g` or `--groupname`|`dev`|Defines group-name property of hazelcast cluster. Groupname property is used for simple authentication mechanism.
`-P` or `--password`|`dev-pass`|Defines group password property of hazelcast cluster. Password property is used for simple authentication mechanism.

Script is self-documented, you can reach parameters via `sh cluster.sh -h` or `sh cluster.sh --help` command.

#### Use Cases

In this tutorial we will sample usages for script, let's say we have cluster running on remote machines and one hazelcasst member is running on ip `172.16.254.1` and on port
`5702`. Group name and password of the cluster is `test/test`.

Sample usage to get cluster state :

`sh cluster.sh -o get-state -a 172.16.254.1 -p 5702 -g test -P test`

or

`sh cluster.sh --operation get-state --address 172.16.254.1 --port 5702 --groupname test --password test`


Sample usage to change cluster state to frozen state :

`sh cluster.sh -o change-state -s frozen -a 172.16.254.1 -p 5702 -g test -P test`

or

`sh cluster.sh --operation change-state --state frozen --address 172.16.254.1 --port 5702 --groupname test --password test`



Sample usage to shutdown cluster:

`sh cluster.sh -o shutdown -a 172.16.254.1 -p 5702 -g test -P test`

or

`sh cluster.sh --operation shutdown --address 172.16.254.1 --port 5702 --groupname test --password test`

Sample usage to forcing cluster to start:

`sh cluster.sh -o force-start -a 172.16.254.1 -p 5702 -g test -P test`

or

`sh cluster.sh --operation force-start --address 172.16.254.1 --port 5702 --groupname test --password test`


<br></br>
![image](images/NoteSmall.jpg) ***NOTE:*** * `cluster.sh` script uses `curl` command and must be installed before using the script. Also there is no cluster management scripts provided for windows platform at the moment.
<br></br>