

# Microsoft Azure Deployment

This chapter provides information on how you can deploy and use your Hazelcast cluster in Microsoft's cloud platform, Azure. ???.


## Prerequisites

You need to have a Microsoft Azure account with an active subscription and enough cores quota. Please refer to [Azure Subscription details](https://azure.microsoft.com/en-us/documentation/articles/azure-subscription-service-limits/) for more information on Azure platform limits.

## Adding Discovery Plugin

You need to add Hazelcast's Discovery Plugin for Azure to your project to enable your Hazelcast virtual machines find each other in your Azure resource group. To add the plugin, include the dependencies in your Maven or Gradle configuration files, as shown below.

For Maven:

```
<dependencies>
    <dependency>
        <groupId>com.hazelcast.azure</groupId>
        <artifactId>hazelcast-azure</artifactId>
        <version>1.0</version>
    </dependency>
</dependencies>
```

For Gradle:

```
repositories {
    jcenter() 
}
dependencies {
    compile 'com.hazelcast.azure:hazelcast-azure:1.0'
}
```


## Configuring Your Network

After you add the discovery plugin to your project, you should perform the configurations at your cluster side and Azure side.

### Configuring Hazelcast for Azure

In your Hazelcast network configuration, you need to include the discovery strategy for Azure, under `<discovery-strategies>` tag, as shown below.

```xml
<network>
    <join>
        <multicast enabled="false"/>
        <tcp-ip enabled="false" />
        <aws enabled="false"/>
        <discovery-strategies>
            <discovery-strategy enabled="true" class="com.hazelcast.azure.AzureDiscoveryStrategy">
                <properties>
                    <property name="client-id">your client ID</property>
                    <property name="client-secret">your client secret</property>
                    <property name="tenant-id">your tenant ID</property>
                    <property name="subscription-id">your Azure subscription ID</property>
                    <property name="cluster-id">your Hazelcast cluster ID</property>
                    <property name="group-name">your Azure resource group name</property>
                </properties>
            </discovery-strategy>
        </discovery-strategies>
    </join>
</network>
```

Please note that all the values of properties under `<properties>` tag should come from your Azure subcsription setup, as explained at [setting up an active directory and credentials](https://azure.microsoft.com/en-us/documentation/articles/resource-group-create-service-principal-portal/).

### Configuring Azure for Hazelcast



??? Configuration at Hazelcast and Azure sides. Also talk about network latencies and debugging.???



## Deploying Onto Azure

???

### Hazelcast Open Source

??? Provide step-by-step instructions for deployment.

### Hazelcast Enterprise

??? Provide step-by-step instructions for deployment.

### Hazelcast Management Center

??? Provide step-by-step instructions for deployment.

## Accessing Your Cluster

??? Operations after the deployment.

![](images/???.png)
