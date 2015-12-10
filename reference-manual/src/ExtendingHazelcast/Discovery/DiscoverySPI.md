
## Discovery SPI

By default, Hazelcast is bundled with multiple ways to define and find other members in the same network. Commonly used, especially with development, is the Multicast discovery. This sends out a multicast request to a network segment and awaits other members to answer with their IP addresses. In addition, Hazelcast supports fixed IP addresses: [JClouds](https://jclouds.apache.org/reference/providers/) or [AWS (Amazon EC2)](https://aws.amazon.com/de/ec2/) based discoveries.
  
Since there is a ever growing number of public and private cloud environments, as well as numerous Service Discovery systems in the wild, Hazelcast provides cloud or service discovery vendors with the option to implement their own discovery strategy.
  
Over the course of this section, we will build a simple discovery strategy based on the `/etc/hosts` file.
