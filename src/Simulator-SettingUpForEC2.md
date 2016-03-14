
## Setting up for Amazon EC2

Having installed Simulator, this section describes how to prepare Simulator for testing a Hazelcast cluster deployed at Amazon EC2.

Simulator provides support to create and terminate EC2 instances via the [Provisioner](#provisioner). If you want to create and setup the EC2 instances by yourself, please use the configuration as described in [Setting up for Static Setup](#setting-up-for-static-setup).

The Provisioner uses AWS access keys (access key ID and secret access key) for authentication (see [Types of Security Credentials](http://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html)). Please see [Creating, Disabling, and Deleting Access Keys for your AWS Account](http://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html) to generate and download your access keys.

For security reasons we store the cloud credentials outside of the working directory (e.g. to prevent an accidental commit into your project files). The default locations for the credentials are

- `~/ec2.identity` for the access key ID
- `~/ec2.credential` for the secret access key

You can store the credentials in a different location, but then you need to configure the `simulator.properties` later.

- Create a working directory for your Simulator TestSuite. Use the Simulator Wizard to create an example setup for you and change into the directory.

  ```
  simulator-wizard --createWorkDir tests --cloudProvider aws-ec2
  cd tests
  ```

- If you stored your AWS credentials in a different location please update the paths of `CLOUD_IDENTITY` and `CLOUD_CREDENTIALS` in your `simulator.properties` file.

- You can also change the `MACHINE_SPEC` to change the instance type, EC2 region and operating system (AMI) of the created AWS instances.

- Execute the created `prepare` script to create the EC2 instances and install Simulator on them.

  ```
  ./prepare
  ```

- Execute the created `run` script to run the TestSuite.

  ```
  ./run
  ```

- Execute the created `download` script to download the log files from the Workers.

  ```
  ./download
  ```

- Execute the following command to destroy the created EC2 instances.

  ```
  provisioner --terminate
  ```

Congratulations, you successfully ran Simulator on Amazon EC2!

![image](images/NoteSmall.jpg) ***NOTE***: *Creating the credential files in your home directory instead of directly setting the access key ID and secret access key in the `simulator.properties` file is for security reasons. It is too easy to share your credentials with the outside world. Now you can safely add the `simulator.properties` file in your source repository or share it with other people.*
