

# Document Revision History

This chapter lists the changes made to this document from the previous release.

<br></br>
![image](images/NoteSmall.jpg)***NOTE:*** *Please refer to the <a href="http://docs.hazelcast.org/docs/rn/" target="_blank">Release Notes</a> for the new features, enhancements and fixes performed for each Hazelcast release.*

<br></br>

|Chapter|Section|Description|
|:-------|:-------|:-----------|
|[Preface](#preface)|[Phone Home](#phone-home)|Added information related to the new environment variable `HZ_PHONE_HOME_ENABLED` for disabling phone homes. 
|[Consistency and Replication Model](#consistency-and-replication-model)| |Added as a new chapter to explain the full picture of Hazelcast's consistency model.|
|[Understanding Configuration](#understanding-configuration)||Added [Configuration Pattern Patcher](#configuration-pattern-matcher) and [Dynamically Adding Configuration on a Cluster](#dynamically-adding-configuration-on-a-cluster) as a new sections.|
|[Setting Up Clusters](#setting-up-clusters)|[User Code Deployment](#user-code-deployment)|Added "Example for  Filtering Members" as a new section to explain how to use the `provider-filter` element.|
||[Client User Code Deployment](#client-user-code-deployment-beta)|Added as a new section.
|[Distributed Computing](#distributed-computing)|[Entry Processor](#entry-processor)|Added "Entry Processor Optimizations" as a new section explaining Offloadable and Readonly entry processors.|
|[Distributed Data Structures](#distributed-data-structures)|[Lock](#lock)|Added "Lock vs. IMap.lock" as a new section.|
||[Event Journal](#event-journal)| Added as a new section to explain the event journal distributed data structure that stores the history of mutation actions on the data structures such as map or cache.
|[Hazelcast JCache](#hazelcast-jcache)|[Scoping to Join Clusters](#scoping-to-join-clusters)|Enhanced the content to explain and give examples about the Hazelcast instance creations during cache manager starts.
|[Hazelcast Java Client](#hazelcast-java-client)|[Enabling Client TLS/SSL](#enabling-client-tlsssl)|Added information related to mutual authentication.
||[Configuring Client Connection Strategy](#configuring-client-connection-strategy)| Added as a new section.
||[Async Start and Reconnect Modes](#async-start-and-reconnect-modes)|Added as a new section.
|[Management](#management)|[Using Management Center with TLS/SSL Only](#;)|Added as a new section.
||[Promoting Lite Members to Data Member](#promoting-lite-members-to-data-member)| Added as a new section.
||[Managing Cluster and Member States](#managing-cluster-and-member-states)| Added the explanation for the new cluster state `NO_MIGRATION`.
|||Added [LDAP](#ldap-authentication), [Active Directory](#active-directory-authentication) and [JAAS Authentication](#jaas-authentication) as new sections.
|||Added [Password Encryption](#password-encryption) as a new section to explain how to encrypt LDAP passwords.
||[Defining Member Attributes](#defining-member-attributes)|Added information related to member filtering for distributed class loading (user code deployment).
||[Management Center](#management-center)|Updated by adding "Metrics-Only" privilege definition and "Enabling TLS/SSL when starting with WAR file" section.
||[Diagnostics](#diagnostics)| Added explanations for two new diagnostics plugins: OperationHeartbeats and MemberHeartbeats.
|[Security](#security)|[SSL](#ssl)|Added "Authenticating Mutually" as a new section.|
||[Native Client Security](#native-client-security)| Added description for the Cache Permissions.
||[Validating Secrets Using Strength Policy](#validating-secrets-using-strength-policy)| Added as a new section.
|[Performance](#performance)|[Near Cache](#near-cache)|Added "Locally Initiated Changes" as a new section.|
|[WAN](#wan)|| Added the new section [Defining WAN replication using Discovery SPI](#defining-wan-replication-using-discovery-spi) to explain how to use WAN with endpoints on various cloud infrastructures (such as Amazon EC2) where the IP addresses are not known in advance. <br> [WAN Replication Failure Detection and Recovery](#wan-replication-failure-detection-and-recovery) added as a new section.
|[System Properties](#system-properties)||Added definitions for the new properties: <br> - hazelcast.partition.migration.fragments.enabled <br> - hazelcast.legacy.memberlist.format.enabled<br> - hazelcast.mastership.claim.timeout.seconds<br> - hazelcast.diagnostics.operation-heartbeat.seconds <br> - hazelcast.diagnostics.operation-heartbeat.max-deviation-percentage <br> - hazelcast.diagnostics.member-heartbeat.seconds <br> - hazelcast.diagnostics.member-heartbeat.max-deviation-percentage|



<br> </br>
