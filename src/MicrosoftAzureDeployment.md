

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

Please note that all the values of properties under `<properties>` tag should come from your Azure subscription setup, as explained at [setting up your application and credentials](https://azure.microsoft.com/en-us/documentation/articles/resource-group-create-service-principal-portal/).

### Configuring Azure for Hazelcast

At the Azure side, you need to specify the following configuration elements on your Hazelcast virtual machine resources:

* `client-id` - The Azure Active Directory Service Principal client ID.
* `client-secret` - The Azure Active Directory Service Principal client secret.
* `tenant-id` - The Azure Active Directory tenant ID.
* `subscription-id` - The Azure subscription ID.
* `cluster-id` - The name of the tag on the Hazelcast virtual machine resources.
* group-name - The Azure resource group name of the cluster. You can find this in the Azure portal or CLI. 

Please note that each of your Hazelcast virtual machine (VM) resources should have `cluster-id` as their tag. Please refer to [tagging your VM resources](https://azure.microsoft.com/en-us/documentation/articles/virtual-machines-linux-tag/) for more information on how to tag your virtual machines.



## Deploying Onto Azure

This section explains how you can deploy your Hazelcast cluster onto Azure platform. 

### Hazelcast Open Source

1. Go to [Microsoft Azure Marketplace](https://azure.microsoft.com/en-us/marketplace/) and login to your Azure account. 
2. Search for Hazelcast Open Source, or simply follow [this](https://azure.microsoft.com/en-us/marketplace/partners/hazelcast/3-6-ossoss/) link.
3. Click on the **Deploy** button.
4. Specify the following information in the first step, which is the **Basics** step:
	* `Username`: Username used to login to your virtual machine.
	* `Authentication type`: Type of authentication, `SSH Public Key` or `Password`.
	* `Password`: Password used to login to your virtual machine, if you select `Authentication Type` as `Password`. You need to confirm the password on the next field, `Confirm Password`.
	* `SSH Public Key`: SSH public key used to login to your virtual machine, if you select `Authentication Type` as `SSH public key`.
	* `Subscription`: Subscription that you used to purchase your resources.
	* `Resource group`: Resource group that will store all the created resources. Select from the combo box, or click on the `Create new` checkbox if you want to create a new one.
	* `Location`: Region that will host all the created resources. Select from the combo box.
5. Specify the following information in the second step, which is the **Infrastructure settings** step:
	* `Version of Hazelcast`: Hazelcast version to be installed onto your virtual machine.
	* `Custom Jar upload`: Custom JAR to be added to each virtual machine classpath.
	* `Hazelcast user name`: Username to be used to login to Hazelcast grid.
	* `Hazelcast password`: Password to be used to login to Hazelcast grid.
	* `Storage account`: Storage account used for all resource storage needs.
	* `Ubuntu version`: Ubuntu version to be installed.
	* `Virtual machine size`: Size of each virtual machine for the Hazelcast grid.
6. After you complete the above two steps, verify your information in the third step, which is the **Summary** step.
7. Click on the "Purchase" button to start deploying your cluster. 

As soon as the deployment starts, Microsoft Azure Linux Agent (waagent) first creates the required environment variables, calls the scripts to install Hazelcast Open Source and to modify the configuration and starts a service called **hazelcast-server** on each of your virtual machines.	



### Hazelcast Enterprise

??? Provide step-by-step instructions for Enterprise deployment.

### Hazelcast Management Center

??? Provide step-by-step instructions for Management Center deployment.

## Accessing Your Cluster

??? Operations after the deployment.

![](images/???.png)
