
<font color="#3981DB">**Hazelcast IMDG Enterprise**</font>
<br></br>


![image](../images/NoteSmall.jpg) ***NOTE:*** *You cannot integrate OpenSSL into Hazelcast when [Hazelcast Encryption](03_Encryption.md) is enabled.*

???

Integrating OpenSSL into Hazelcast is achieved with two steps:

- Installing OpenSSL
- Configuring Hazelcast to use OpenSSL

Below sections explain these steps.


### Installing OpenSSL

To install OpenSSL and have it ready for Hazelcast configuration please follow the below steps:

- Install OpenSSL. Make sure that you are installing 1.0.1 or 1.0.2 releases. Please refer to its documentation at [github.com/openssl](https://github.com/openssl/openssl/blob/master/INSTALL).
- Install Apache Portable Runtime library. Please refer to [apr.apache.org](https://apr.apache.org/download.cgi).
- Install the following libraries from the Netty framework:
  - netty-buffer-4.1.8.Final.jar
  - netty-common-4.1.8.Final.jar
  - netty-handler-4.1.8.Final.jar
  - netty-tcnative-boringssl-static-1.1.33.Fork26-linux-x86_64.jar
  


