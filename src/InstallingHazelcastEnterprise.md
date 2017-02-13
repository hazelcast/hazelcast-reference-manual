

### Hazelcast IMDG Enterprise

There are two Maven repositories defined for Hazelcast IMDG Enterprise:

```
<repository>
       <id>Hazelcast Private Snapshot Repository</id>
       <url>https://repository-hazelcast-l337.forge.cloudbees.com/snapshot/</url>
</repository>
<repository>
        <id>Hazelcast Private Release Repository</id>
        <url>https://repository-hazelcast-l337.forge.cloudbees.com/release/</url>
</repository>
```

Hazelcast IMDG Enterprise customers may also define dependencies, a sample of which is shown below.

```
<dependency>
     <groupId>com.hazelcast</groupId>
     <artifactId>hazelcast-enterprise-tomcat6</artifactId>
     <version>${project.version}</version>
</dependency>
<dependency>
     <groupId>com.hazelcast</groupId>
     <artifactId>hazelcast-enterprise-tomcat7</artifactId>
     <version>${project.version}</version>
</dependency>
<dependency>
      <groupId>com.hazelcast</groupId>
      <artifactId>hazelcast-enterprise</artifactId>
      <version>${project.version}</version>
</dependency>
<dependency>
      <groupId>com.hazelcast</groupId>
      <artifactId>hazelcast-enterprise-all</artifactId>
      <version>${project.version}</version>
</dependency>
```




