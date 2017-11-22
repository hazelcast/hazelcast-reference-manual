
### Deploying on Amazon EC2

<img src="../images/Plugin_New.png" alt="AWS Plugin" height="22" width="84">
<br></br>

You can deploy your Hazelcast project onto an Amazon EC2 environment using Third Party tools such as <a href="https://www.vagrantup.com" target="_blank">Vagrant</a> and <a href="https://www.chef.io/chef/" target="_blank">Chef</a>.

You can find information about this plugin on its GitHub repository at [Hazelcast AWS](https://github.com/hazelcast/hazelcast-aws).

You can find a sample deployment project (`amazon-ec2-vagrant-chef`) with step-by-step instructions in the `hazelcast-integration` folder of the **hazelcast-code-samples** package, which you can download at <a href="https://hazelcast.org/download/" target="_blank">hazelcast.org</a>. Please refer to this sample project for more information.

### Deploying on Azure


<img src="../images/Plugin_New.png" alt="Azure Plugin" height="22" width="84">
<br></br>

You can deploy your Hazelcast cluster onto a Microsoft Azure environment. For this, your cluster should make use of Hazelcast Discovery Plugin for Microsoft Azure. You can find information about this plugin on its GitHub repository at [Hazelcast Azure](https://github.com/hazelcast/hazelcast-azure).

For information on how to automatically deploy your cluster onto Azure, please see the [Deployment](https://github.com/hazelcast/hazelcast-azure/blob/master/README.md#automated-deployment) section of [Hazelcast Azure](https://github.com/hazelcast/hazelcast-azure) plugin repository.

### Deploying on PCF


<img src="../images/Plugin_New.png" alt="CloudFoundry Plugin" height="22" width="84">
<br></br>




Starting with Hazelcast 3.7, you can deploy your Hazelcast cluster onto Pivotal Cloud Foundry. It is available as a Pivotal Cloud Foundry Tile which you can download at [https://network.pivotal.io/products/hazelcast/](https://network.pivotal.io/products/hazelcast/). You can find the installation and usage instructions, and the release notes documents at [https://docs.pivotal.io/partners/hazelcast/index.html](https://docs.pivotal.io/partners/hazelcast/index.html).


### Deployment via Docker


<img src="../images/Plugin_New.png" alt="Docker Plugin" height="22" width="84">
<br></br>

You can deploy your Hazelcast projects using the Docker containers. Hazelcast has the following images on Docker:

- Hazelcast IMDG
- Hazelcast IMDG Enterprise
- Hazelcast Management Center
- Hazelcast OpenShift


After you pull an image from the Docker registry, you can run your image to start the management center or a Hazelcast instance with Hazelcast's default configuration. All repositories provide the latest stable releases but you can pull a specific release too. You can also specify environment variables when running the image.

If you want to start a customized Hazelcast instance, you can extend the Hazelcast image by providing your own configuration file.

This feature is provided as a Hazelcast plugin. Please see its own GitHub repo at <a href="https://github.com/hazelcast/hazelcast-docker" target="_blank">Hazelcast Docker</a> for details on configurations and usages.


