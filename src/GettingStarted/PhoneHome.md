
## Phoning Home

Hazelcast uses phone home data to learn about usage of Hazelcast.

Hazelcast member instances call our phone home server initially when they are started and then for every 24 hours. This applies to all the instances joined to the cluster.

**What is sent in?**

- The following  information is sent in a phone home:
- Hazelcast version
- Local Hazelcast member UUID
- Download ID 
- A hash value of the cluster ID
- Cluster size bands for 5, 10, 20, 40, 60, 100, 150, 300, 600 and > 600
- Number of connected clients bands of 5, 10, 20, 40, 60, 100, 150, 300, 600 and  > 600
- Cluster uptime
- Member uptime
	- Hazelcast Enterprise specific: 
	- Number of clients by language (Java, C++, C#)
	- Flag for Hazelcast Enterprise 
	- Hash value of license key
	- Native memory usage

**Phone Home Code**

The phone home code itself is open source. Please see <a href="https://github.com/hazelcast/hazelcast/blob/master/hazelcast/src/main/java/com/hazelcast/util/VersionCheck.java" target="_blank">here</a>.

**Disabling Phone Homes**

Set the `hazelcast.version.check.enabled` system property to false either in the config or on the Java command line. Please see the [System Properties section](#system-properties) for information on how to set a property. 

**Phone Home URLs**

For older versions( versions 1.x - 2.x): <a href="http://www.hazelcast.com/version.jsp" target="_blank">http://www.hazelcast.com/version.jsp</a>.

For new versions (versions 3.x): <a href="http://versioncheck.hazelcast.com/version.jsp" target="_blank">http://versioncheck.hazelcast.com/version.jsp</a>.




