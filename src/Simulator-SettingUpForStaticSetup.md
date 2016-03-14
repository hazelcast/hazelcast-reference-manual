
## Setting up for Static Setup

Having installed Simulator locally, this section describes how to prepare Simulator for testing a Hazelcast cluster deployed on a fixed list of given remote machines, e.g. your local machines or a test laboratory.

- Create a working directory for your Simulator TestSuite. Use the Simulator Wizard to create an example setup for you and change into the directory.

  ```
  simulator-wizard --createWorkDir tests --cloudProvider static
  cd tests
  ```

- Add the IP addresses of your remote machines to the file `agents.txt`, one address per line.

  ```
  192.0.2.0.1
  192.0.2.0.2
  ```

  You can also configure a different public and private IP address per machine (with 192.0.2.0 being the public and 172.16.16.0 the private IP address ranges).

  ```
  192.0.2.0.1,172.16.16.1
  192.0.2.0.2,172.16.16.2
  ```

  The public IP addresses will be used by the Provisioner and Coordinator to connect to the remote machines. The private IP addresses will be used by Hazelcast to form a cluster.

- The default username used by Hazelcast Simulator is `simulator`. You can change this via the `USER` property in the `simulator.properties` file in your working folder.

  ```
  USER=preferredUserName
  ```

  Ensure that a user account with this name exists on all configured remote machines.

- Ensure you have appended your public RSA key (`id_rsa.pub`) to the `~/.ssh/authorized_keys` file on all remote machines. You can create and execute a script to copy the RSA key to all machines in your `agents.txt` file with the following commands.

  ```
  simulator-wizard --createSshCopyIdScript
  ./ssh-copy-id-script
  ```

- You can check if the SSH connection for all remote machines work as expected using the following command.

  ```
  simulator-wizard --sshConnectionCheck
  ```

- Execute the created `prepare` script to install Simulator on the remote machines.

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

Congratulations, you successfully ran Simulator on your remote machines! Please refer to the [Customizing your Simulator Setup section](#customizing-your-simulator-setup) to learn how to configure your test setup.
