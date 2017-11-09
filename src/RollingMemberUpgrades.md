# Rolling Member Upgrades

<font color="#3981DB">**Hazelcast IMDG Enterprise**</font>
<br></br>

This chapter explains the procedure of upgrading the version of Hazelcast members in a running cluster without interrupting the operation of the cluster.

## Terminology

* **Minor version**: A version change after the decimal point, e.g., 3.8 and 3.9.
* **Patch version**: A version change after the second decimal point, e.g., 3.8.1 and 3.8.2.
* **Member codebase version**: The `major.minor.patch` version of the Hazelcast binary on which the member executes. For example, when running on `hazelcast-3.8.jar`, your member's codebase version is `3.8.0`.
* **Cluster version**: The `major.minor` version at which the cluster operates. This ensures that cluster members are able to communicate using the same cluster protocol and
determines the feature set exposed by the cluster.


## Hazelcast Members Compatibility Guarantees

Hazelcast members operating on binaries of the same major and minor version numbers are compatible regardless of patch version.
  For example, in a cluster with members running on version 3.7.1, it is possible to perform a rolling upgrade to 3.7.2 by shutting down, upgrading to `hazelcast-3.7.2.jar` binary 
  and starting each member one by one. _Patch level compatibility applies to both Hazelcast IMDG and Hazelcast IMDG Enterprise_.

Starting with Hazelcast IMDG Enterprise 3.8, each next minor version released will be compatible with the previous one. For example, it will
 be possible to perform a rolling upgrade on a cluster running Hazelcast IMDG Enterprise 3.8 to Hazelcast IMDG Enterprise 3.9 whenever that is released.
 _Rolling upgrades across minor versions is a Hazelcast IMDG Enterprise feature, starting with version 3.8_.
 
The compatibility guarantees described above are given in the context of rolling member upgrades and only apply to GA (general availability) releases. It is never advisable to run a
 cluster with members running on different patch or minor versions for prolonged periods of time.


## Rolling Upgrade Procedure

***NOTE:*** *The version numbers used in the paragraph below are only used as an example.*

Let's assume a cluster with four members running on codebase version `3.8.0` with cluster version `3.8`, that should be upgraded to codebase version
`3.9.0` and cluster version `3.9`. The rolling upgrade process for this cluster, i.e., replacing existing `3.8.0` members one by one with an upgraded
one at version `3.9.0`, includes the following steps which should be repeated for each member:

 * Shutdown gracefully an existing `3.8.0` member.
 * Wait until all partition migrations are completed; during migrations, membership changes (member joins or removals) are not allowed.
 * Update the member with the new `3.9.0` Hazelcast binaries.
 * Start the member and wait until it joins the cluster. You should see something like the following in your logs:

```
 ...
 INFO: [192.168.2.2]:5701 [cluster] [3.9] Hazelcast 3.9 (20170630 - a67dc3a) starting at [192.168.2.2]:5701
 ...
 INFO: [192.168.2.2]:5701 [cluster] [3.9] Cluster version set to 3.8
```
 
 The version in brackets `[3.9]` still denotes the member's codebase version (running on the hypothetical `hazelcast-3.9.jar` binary). Once the member
 locates existing cluster members, it sends its join request to the master. The master validates that the new member is allowed to join the cluster and
 lets the new member know that the cluster is currently operating at `3.8` cluster version. The new member sets `3.8` as its cluster version and starts operating
 normally.
 
 At this point all members of the cluster have been upgraded to codebase version `3.9.0` but the cluster still operates at cluster version `3.8`. In order to use `3.9` features
 the cluster version must be changed to `3.9`. There are two ways to accomplish this:
 
- Use [Management Center](http://docs.hazelcast.org/docs/management-center/latest/manual/html/Rolling_Upgrade.html).
- Use the command line [cluster.sh script](#using-the-script-cluster-sh).
 
***NOTE:*** *You need to upgrade your Management Center version *before* upgrading the member version if you want to 
change cluster version using Management Center. Management Center is compatible with the previous minor version of 
Hazelcast, starting with version 3.9. For example, Management Center 3.9 works with both Hazelcast IMDG 
3.8 and 3.9. To change your cluster version to 3.9, you need Management Center 3.9.*
 
## Network Partitions and Rolling Upgrades

In the event of network partitions which split your cluster into two subclusters, split brain handling works as explained in the [Network Partitioning section](#network-partitioning), with the
additional constraint that two subclusters will only merge as long as they operate on the same cluster version. This is a requirement to ensure that all members participating
in each one of the subclusters will be able to operate as members of the merged cluster at the same cluster version.

With regards to rolling upgrades, the above constraint implies that if a network partition occurs while a change of cluster version is in progress, then with some unlucky timing, one subcluster may be upgraded to the new cluster version and another subcluster may have upgraded members but still operate at the old cluster version.

In order for the two subclusters to merge, it is necessary to change the cluster version of the subcluster that still operates at the old cluster version, so that both subclusters
will be operating at the same, upgraded cluster version and will be able to merge as soon as the network partition is fixed.

  
## Rolling Upgrade FAQ

The following provide answers to the frequently asked questions related to rolling member upgrades.

<br>
**How is the cluster version set?**

When a new member starts, it is not yet joined to a cluster; therefore its cluster version is still undetermined. In order for the cluster version to be
set, one of the following must happen:

 * the member cannot locate any members of the cluster to join or is configured without a joiner: in this case, the member will appoint itself as the
 master of a new single-member cluster and its cluster version will be set to the `major.minor` version of its own codebase version. So a standalone
 member running on codebase version `3.8.0` will set its own cluster version to `3.8`.
 * the member that is starting locates members of the cluster and identifies which is the master: in this case, the master will validate that the
 joining member's codebase version is compatible with the current cluster version. If it is found to be compatible, then the member joins and the master
 sends the cluster version, which is set on the joining member. Otherwise, the starting member fails to join and shuts down.

<br>
**What if a new Hazelcast minor version changes fundamental cluster protocol communication, like join messages?**

![Note](images/NoteSmall.jpg) ***NOTE:*** *The version numbers used in the paragraph below are only used as an example.*

On startup, as answered in the above question (How is the cluster version set?), the cluster version is not yet known to a member that has not joined any cluster.
By default the newly started member will use the cluster protocol that corresponds to its codebase version until this member joins a cluster
(so for codebase `3.9.0` this means implicitly assuming cluster version `3.9`). If, hypothetically, major changes in discovery & join operations
have been introduced which do not allow the member to join a `3.8` cluster, then the member should be explicitly configured to start
assuming a `3.8` cluster version.

<br>
**Do I have to upgrade clients to work with rolling upgrades?**

Starting with Hazelcast 3.6, the Hazelcast Open Binary Client Protocol was introduced. Clients which implement the Open Binary Client Protocol
are compatible with Hazelcast version 3.6 and newer minor versions. Thus older client versions will be compatible with next minor versions. Newer clients
connected to a cluster will operate at the lower version of capabilities until all members are upgraded and the cluster version upgrade occurs.

<br>
**Can I stop and start multiple members at once during a rolling member upgrade?**

It is not recommended due to potential network partitions. It is advised to always stop and start one member in each upgrade step.

<br>
**Can I upgrade my business app together with Hazelcast while doing a rolling member upgrade?**

Yes, but make sure to make the new version of your app compatible with the old one since there will be a timespan when both versions interoperate. Checking if two versions of your app are compatible includes verifying binary and algorithmic compatibility, and some other steps.

It is worth mentioning that a business app upgrade is orthogonal to a rolling member upgrade. A rolling business app upgrade may be done without upgrading the members.

