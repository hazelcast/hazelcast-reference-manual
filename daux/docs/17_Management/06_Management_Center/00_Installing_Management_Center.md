
You have two options for installing Hazelcast Management Center:

1. Deploy the file `mancenter`-*version*`.war` on your Java application server/container.
2. Start Hazelcast Management Center from the command line and then have the Hazelcast cluster members communicate with it. This means that your members should know the URL of the `mancenter` application before they start.

Here are the steps.

- Download the latest Hazelcast ZIP from <a href="http://www.hazelcast.org/download/" target="_blank">hazelcast.org</a>. The ZIP contains the `mancenter`-*version*`.war` file under the directory `mancenter`.
- You can directly start `mancenter`-*version*`.war` file from the command line. The following command will start Hazelcast Management Center on port 8080 with context root 'mancenter' (`http://localhost:8080/mancenter`).

```java
java -jar mancenter-*version*.war 8080 mancenter
```

- You can also start it using the scripts `startManCenter.bat` or `startManCenter.sh` located in the directory `mancenter`.
- Or, instead of starting at the command line, you can deploy it to your web server (Tomcat, Jetty, etc.). Let us say it is running at `http://localhost:8080/mancenter`.
- After you perform the above steps, make sure that `http://localhost:8080/mancenter` is up.
- Configure your Hazelcast members by adding the URL of your web application to your `hazelcast.xml`. Hazelcast members will send their states to this URL.

```xml
<management-center enabled="true">
    http://localhost:8080/mancenter
</management-center>
```

- If you have deployed `mancenter-*version*.war` in your already-SSL-enabled web container, configure `hazelcast.xml` as follows.

```xml
<management-center enabled="true">
    https://localhost:sslPortNumber/mancenter
</management-center>
```

If you are using an untrusted certificate for your container, which you created yourself, you need to add that certificate to your JVM first. Download the certificate from the browser, after this you can add it to JVM as follows.

`keytool -import -noprompt -trustcacerts -alias <AliasName> -file <certificateFile> -keystore $JAVA_HOME/jre/lib/security/cacerts -storepass <Password>`

- You can also set a frequency (in seconds) for which Management Center will take information from the Hazelcast cluster, using the element `update-interval` as shown below. `update-interval` is optional and its default value is 3 seconds.

```xml
<management-center enabled="true" update-interval="3">http://localhost:8080/
mancenter</management-center>
```


- Start your Hazelcast cluster.
- Browse to `http://localhost:8080/mancenter` and setup your [administrator account](01_Getting_Started.md) explained in the next section.

