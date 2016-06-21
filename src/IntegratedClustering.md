# Integrated Clustering

In this chapter, we show you how Hazelcast is integrated with Hibernate 2nd level cache and Spring, and how Hazelcast helps with your Filter, Tomcat and Jetty based web session replications.

The [Hibernate Second Level Cache section](#hibernate-second-level-cache) tells how you should configure both Hazelcast and Hibernate to integrate them. It explains the modes of Hazelcast that can be used by Hibernate and also provides how to perform advanced settings like accessing the underlying Hazelcast instance used by Hibernate.

The [Web Session Replication section](#web-session-replication) tells how to cluster user HTTP sessions automatically. You will learn how to enable session replication using filter based solution. In addition, Tomcat and Jetty specific modules will be explained.

The [Spring Integration section](#spring-integration) tells how you can integrate Hazelcast into a Spring project by explaining the Hazelcast instance and client configurations with the *hazelcast* namespace. It also lists the supported Spring bean attributes. 



