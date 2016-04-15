
## Using the Scripts In The Package

When you download and extract the Hazelcast ZIP or TAR.GZ package, you will see three scripts under the `/bin` folder that provide basic functionalities for member and cluster management.

The following are the names and descriptions of each script:

- `start.sh` / `start.bat`: Starts a Hazelcast member with default configuration in the working directory*.
- `stop.sh` / `stop.bat`: Stops the Hazelcast member that was started in the current working directory.
- `cluster.sh`: Provides basic functionalities for cluster management, such as getting and changing the cluster state, shutting down the cluster or forcing the cluster to clean its persisted data and make a fresh start.

![image](images/NoteSmall.jpg) ***NOTE:*** *`start.sh` / `start.bat` scripts lets you start one Hazelcast instance per folder. To start a new instance, please unzip Hazelcast ZIP or TAR.GZ package in a new folder. *

Please refer to the [Using the Script cluster.sh section](#using-the-script-cluster-sh) to learn the usage of this script.


