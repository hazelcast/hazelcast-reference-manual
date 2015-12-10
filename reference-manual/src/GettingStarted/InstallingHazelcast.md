# Getting Started

This chapter explains how to install Hazelcast, start a Hazelcast member and client, and gives Hazelcast configuration fundamentals.


## Installation

The following sections explains the installation of Hazelcast and Hazelcast Enterprise. 


### Hazelcast

You can find Hazelcast in standard Maven repositories. If your project uses Maven, you do not need to add 
additional repositories to your `pom.xml` or add `hazelcast-<`*version*`>.jar` file into your 
classpath (Maven does that for you). Just add the following lines to your `pom.xml`:

```xml
<dependencies>
	<dependency>
		<groupId>com.hazelcast</groupId>
		<artifactId>hazelcast</artifactId>
		<version>3.6</version>
	</dependency>
</dependencies>
```
As an alternative, you can download and install Hazelcast yourself. You only need to:

-   Download `hazelcast-<`*version*`>.zip` file from <a href="www.hazelcast.org" target="_blank">hazelcast.org</a>.

-   Unzip `hazelcast-<`*version*`>.zip` file.

-   Add `hazelcast-<`*version*`>.jar` file into your classpath.

