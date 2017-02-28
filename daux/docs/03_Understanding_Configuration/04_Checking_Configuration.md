
When you start a Hazelcast member without passing a `Config` object, as explained in the [Configuring Programmatically section](01_Configuring_Programmatically.md), Hazelcast checks the member's configuration as follows:

-	First, it looks for the `hazelcast.config` system property. If it is set, its value is used as the path. This is useful if you want to be able to change your Hazelcast configuration; you can do this because it is not embedded within the application. You can set the `config` option with the following command:
 
	`- Dhazelcast.config=`*`<path to the hazelcast.xml>`*.
	
	The path can be a regular one or a classpath reference with the prefix `classpath:`.
-	If the above system property is not set, Hazelcast then checks whether there is a `hazelcast.xml` file in the working directory.
-	If not, it then checks whether `hazelcast.xml` exists on the classpath.
-	If none of the above works, Hazelcast loads the default configuration (`hazelcast.xml`) that comes with your Hazelcast package.

Before configuring Hazelcast, please try to work with the default configuration to see if it works for you. This default configuration should be fine for most of the users. If not, you can consider to modify the configuration to be more suitable for your environment.


