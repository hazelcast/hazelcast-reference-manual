
## Installing Simulator

Hazelcast Simulator needs a Unix shell to run. Ensure that your local and remote machines are running under Unix, Linux or Mac OS. Hazelcast Simulator may work with Windows using a Unix-like environment such as Cygwin, but that is not officially supported at the moment.

### Setting up the Local Machine

The local machine will be the one on which you will eventually execute the Coordinator to run your TestSuite. It is also the source to install Simulator on your remote machines.

Hazelcast Simulator is provided as a separate downloadable package, in `zip` or `tar.gz` format. You can download either one [here](http://hazelcast.org/download/#simulator).

After the download is completed, follow the below steps.

- Unpack the `tar.gz` or `zip` file to a folder that you prefer to be the home folder for Hazelcast Simulator. The file extracts with the name `hazelcast-simulator-<`*version*`>`. If your are updating Simulator you are done and can skip the following steps.

- Configure the environment by either

  - Run the configuration wizard from the extracted folder.

    ```
    ./<extracted folder path>/bin/simulator-wizard --install
    ```  

  OR

  - Add the following lines to the file `~/.bashrc` (for Unix/Linux) or to the file `~/.profile` (for Mac OS).

    ```
    export SIMULATOR_HOME=<extracted folder path>/hazelcast-simulator-<version>
    PATH=$SIMULATOR_HOME/bin:$PATH
    ```

- Open a new terminal to make your changes in `~/.bashrc` or `~/.profile` effective. Call the Simulator Wizard with the `--help` option to see if your installation was successful.

  ```
  simulator-wizard --help
  ```

#### First Run of Simulator

After the installation you can already use Simulator on the local machine.

- Create a working directory for your Simulator TestSuite. Use the Simulator Wizard to create an example setup for you and change into that directory.

  ```
  simulator-wizard --createWorkDir tests
  cd tests
  ```
  
- Execute the created `run` script to run the TestSuite.

  ```
  ./run
  ```

Congratulations, you successfully ran Simulator for the first time!

### Preparations to setup Remote Machines

Beside the local setup there are also static setups (fixed list of given remote machines, e.g. your local machines, a test laboratory) and cloud setups (e.g. Amazon EC2, Google Compute Engine). For all those remote machines you need to configure password free SSH access. You may also need to configure the firewall between your local and the remote machines.

#### Firewall Settings

Please ensure that all remote machines are reachable via TCP ports 22, 9000 and 5701 to 57xx on their external network interface (e.g. `eth0`). The first two ports are used by Hazelcast Simulator. The other ports are used by Hazelcast itself. Ports 9001 to 90xx are used on the loopback device on all remote machines for local communication.

![](images/HazelcastSimulator/Network.png)

- Port 22 is used for SSH connections to install Simulator on remote machines, to start the Agent and to download test result and log files. If you use any other port for SSH you can configure Simulator to use it via the `SSH_OPTIONS` property in the `simulator.properties` file.
- Port 9000 is used for the communication between Coordinator and Agent. You can configure this port via the `AGENT_PORT` property in the `simulator.properties` file.
- Ports 9001 to 90xx are used for the communication between Agent and Worker. We use as many ports as Worker JVMs are spawned on the machine.
- Ports 5701 to 57xx are used for the Hazelcast instances to form a cluster. We use as many ports as Worker JVMs are spawned on the machine, since each of them will create its own Hazelcast instance.

#### Creating an RSA key pair

The preferred method for password free authentication is using an RSA (Rivest, Shamir and Adleman crypto-system) public/private key pair. The RSA key should not require you to enter the pass-phrase manually. A key with a pass-phrase and ssh-agent-forwarding is strongly recommended, but a key without a pass-phrase also works.

If you already have an RSA key pair you'll find the files `id_rsa.pub` and `id_rsa` in your local `~/.ssh` folder. If you do not have RSA keys, you can generate a public/private key pair using the following command.

```
ssh-keygen -t rsa -C "your-email@example.com"
```

Press `[Enter]` for all questions. The value for the email address is not relevant in this case. After you execute this command, you should have the files `id_rsa.pub` and `id_rsa` in your `~/.ssh` folder.
