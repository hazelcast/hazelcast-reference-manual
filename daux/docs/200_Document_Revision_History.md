
This chapter lists the changes made to this document from the previous release.


![image](images/NoteSmall.jpg)***NOTE:*** *Please refer to the <a href="http://docs.hazelcast.org/docs/release-notes/" target="_blank">Release Notes</a> for the new features, enhancements and fixes performed for each Hazelcast IMDG release.*


|Chapter/Section|Description|
|:-------|:-----------|
|[Consistency and Replication Model](/450_Consistency_and_Replication_Model.md)]| Added as a new chapter to explain the full picture of Hazelcast's consistency model. 
|[Configuration Pattern Matcher](/500_Understanding_Configuration/550_Configuration_Pattern_Matcher.md)| Added as a new section.
|[Dynamically Adding Configuration on a Cluster](/500_Understanding_Configuration/450_Dynamically_Adding_Configuration_on_a_Cluster.md)|Added as a new section.
|[User Code Deployment](/04_Setting_Up_Clusters/07_User_Code_Deployment_-_BETA.md)|Added "Example for Member Filtering Members" as a new section to explain how to use the `provider-filter` element.
|[Client User Code Deployment](/04_Setting_Up_Clusters/07_Client_User_Code_Deployment_-_BETA.md)|Added as a new section.
|[Lock](06_Distributed_Data_Structures/09_Lock.md)|Added "Lock vs. IMap.lock" as a new section.
|[Entry Processor](/08_Distributed_Computing/03_Entry_Processor)|Added the new section "Entry Processor Optimization" explaining Offloadable and Readonly entry processors.|
|[Scoping to Join Clusters](/11_Hazelcast_JCache/05_Hazelcast_JCache_Extension-ICache/00_Scoping_to_Join_Clusters.md)|Enhanced the content to explain and give examples about the Hazelcast instance creations during cache manager starts (Hazelcast JCache).
|[Enabling Client TLS/SSL](/14_Hazelcast_Java_Client/02_Configuring_Java_Client/00_Configuring_Client_Network.md)|Added information related to mutual authentication.
|[Client System Properties](/1600_Hazelcast_Java_Client/600_Client_System_Properties.md)|Added client statistics related system properties definitions.
|[Async Start and Reconnect Modes](/1600_Hazelcast_Java_Client/200_Java_Client_Overview.md#page_AsyncStartandReconnectMode.html) and [Configuring Client Connection Strategy](/1600_Hazelcast_Java_Client/300_Configuring_Java_Client/750_Configuring_Client_Connection_Strategy.md)| Added as new sections.
|[SSL](/18_Security/04_TLS-SSL.md)|Added the new section "Authenticating Mutually".
|[Management Center](/17_Management/06_Management_Center)|Updated by adding "Metrics-Only" privilege definition and "Enabling TLS/SSL when starting with WAR file" section.
|[Using Management Center with TLS/SSL Only](/17_Management/06_Management_Center/01_Using_Management_Center_with_TLS-SSL_Only.md)|Added as a new section.
|[LDAP Password Encryption](/17_Management/06_Management_Center/02_LDAP_Authentication.md)|Added as a new section.
|[Validating Secrets Using Strength Policy](/2000_Security/650_Validating_Secrets_Using_Strength_Policy.md)| Added as a new section.
|[Promoting Lite Members to Data Member](/17_Management/03_Cluster_Utilities/04_Enabling_Lite_Members.md)|Added as a new section.
|[Using the Script cluster.sh](/17_Management/03_Cluster_Utilities/02_Using_the_Script_cluster.sh.md)|Added the explanation for the new cluster state `NO_MIGRATION`.
|[Defining Member Attributes](/17_Management/03_Cluster_Utilities/05_Defining_Member_Attributes.md)|Added information related to member filtering for distributed class loading (user code deployment)
|[Native Client Security](/18_Security/08_Native_Client_Security.md)|Added description for the Cache Permissions.|
|[Near Cache](/19_Performance/04_Near_Cache/06_Near_Cache_Consistency.md)|Added "Locally Initiated Changes" as a new section.
|[System Properties](/25_System_Properties.md)|Added definitions for the following new properties: <br> - hazelcast.partition.migration.fragments.enabled <br> - hazelcast.diagnostics.max.rolled.file.size.mb <br> - hazelcast.diagnostics.max.rolled.file.count
