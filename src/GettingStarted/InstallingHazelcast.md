# Getting Started

This chapter explains how to install Hazelcast and start a Hazelcast member and client. It describes the executable files in the download package and also provides the fundamentals for configuring Hazelcast and its deployment options.


## Installation

The following sections explains the installation of Hazelcast and Hazelcast Enterprise. 


### Hazelcast

You can find Hazelcast in standard Maven repositories. If your project uses Maven, you do not need to add 
additional repositories to your `pom.xml` or add `hazelcast-<version>.jar` file into your 
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

-   Download the package `hazelcast-<version>.zip` or `hazelcast-<version>.tar.gz` from <a href="www.hazelcast.org" target="_blank">hazelcast.org</a>.

-   Extract the downloaded `hazelcast-<version>.zip` or `hazelcast-<version>.tar.gz`.

-   Add the file `hazelcast-<version>.jar` to your classpath.

