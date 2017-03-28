

To encrypt data transmitted over all channels of Management Center using TLS/SSL, make sure you do all of the following:

* Deploy Management Center on a TLS/SSL enabled container. See [Installing Management Center](00_Installing_Management_Center.md).
* Enable TLS/SSL for your Hazelcast cluster. See [TLS/SSL](/18_Security/04_TLS-SSL.md)
* If you're using Clustered JMX on Management center, enable TLS/SSL for it. See [Enabling TLS/SSL for Clustered JMX](/17_Management/07_Clustered_JMX_via_Management_Center/00_Configuring_Clustered_JMX.md).
* If you're using LDAP authentication, make sure you use LDAPS or enable the "Start TLS" field. See [LDAP-Active Directory Authentication](02_LDAP-Active_Directory_Authentication.md)
