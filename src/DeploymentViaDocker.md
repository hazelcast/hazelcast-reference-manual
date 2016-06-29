
## Deploying using Docker

![image](images/Plugin.png)
<br></br>

You can deploy your Hazelcast projects using the Docker containers. Hazelcast has the following images on Docker:

- Hazelcast
- Hazelcast Enterprise
- Hazelcast Management Center
- Hazelcast OpenShift


After you pull an image from the Docker registry, you can run your image to start the management center or a Hazelcast instance with Hazelcast's default configuration. All repositories provide the latest stable releases but you can pull a specific release too. You can also specify environment variables when running the image.

If you want to start a customized Hazelcast instance, you can extend the Hazelcast image by providing your own configuration file.

This feature is provided as a Hazelcast plugin. Please see its own GitHub repo at <a href="https://github.com/hazelcast/hazelcast-docker" target="_blank">Hazelcast JClouds</a> for details on configurations and usages.
