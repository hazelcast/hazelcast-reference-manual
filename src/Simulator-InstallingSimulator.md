
## Installing Simulator

Hazelcast Simulator needs a Unix shell to run. Ensure that your local and remote machines are running under Unix, Linux or Mac OS. Hazelcast Simulator may work with Windows using a Unix-like environment such as Cygwin, but that is not officially supported at the moment.

### Firewall Settings

Please ensure that all remote machines are reachable via TCP ports 22, 9000 and 5701 to 57xx on their external network interface (e.g. `eth0`). The first two ports are used by Hazelcast Simulator. The other ports are used by Hazelcast itself. Ports 9001 to 90xx are used on the loopback device on all remote machines for local communication.

![](images/HazelcastSimulator/Network.png)

- Port 22 is used for SSH connections to install Simulator on remote machines and to download test result and log files. If you use any other port for SSH you can configure Simulator to use it via the `SSH_OPTIONS` property in the `simulator.properties` file.
- Port 9000 is used for the communication between `Coordinator` and `Agent`. You can configure this port via the `AGENT_PORT` property in the `simulator.properties` file.
- Ports 9001 to 90xx are used for the communication between `Agent` and `Worker`. We use as many ports as `Worker` JVMs are spawned on the machine.
- Ports 5701 to 57xx are used for the Hazelcast instances to form a cluster. We use as many ports as `Worker` JVMs are spawned on the machine, since each of them will create its own Hazelcast instance.

### Setting up the Local Machine (Coordinator)

Hazelcast Simulator is provided as a separate downloadable package, in `zip` or `tar.gz` format. You can download either one [here](http://hazelcast.org/download/#simulator).

After the download is completed, follow the below steps.

- Unpack the `tar.gz` or `zip` file to a folder that you prefer to be the home folder for Hazelcast Simulator. The file extracts with the name `hazelcast-simulator-<`*version*`>`. (If you are updating Hazelcast Simulator, perform this same unpacking, but skip the following steps.)

- Add the following lines to the file `~/.bashrc` (for Unix/Linux) or to the file `~/.profile` (for Mac OS).

```
export SIMULATOR_HOME=<extracted folder path>/hazelcast-simulator-<version>
PATH=$SIMULATOR_HOME/bin:$PATH
```

- You can test if your Simulator installation is working by calling one of the Simulator tools with the help option. Please keep in mind that you need to open a new terminal to make your changes in `~/.bashrc` or `~/.profile` effective.

```
simulator-wizard --help
```

- Create a working folder for your Simulator `TestSuite` (`tests` is an example name in the following commands).

```
mkdir ~/tests
```

- Copy the `simulator.properties` file to your working folder.

```
cp $SIMULATOR_HOME/conf/simulator.properties ~/tests
```

### Setting up the Remote Machines (Agents, Workers)

After you have installed Hazelcast Simulator as described in the previous section, make sure you create a user on the remote machines upon which you want to run `Agents` and `Workers`. The default username used by Hazelcast Simulator is `simulator`. You can change this in the `simulator.properties` file in your working folder.

Please ensure that you can connect to the remote machines with the configured username and without password authentication (see the next section). The [Provisioner](#provisioner) terminates when it needs to access a remote machine and cannot connect automatically.

### Setting up the Public/Private Key Pair

The preferred method for password free authentication is using an RSA (Rivest, Shamir and Adleman cryptosystem) public/private key pair. The RSA key should not require you to enter the pass-phrase manually. A key with a pass-phrase and ssh-agent-forwarding is strongly recommended, but a key without a pass-phrase also works.

#### Local Machine (Coordinator)

Make sure you have the files `id_rsa.pub` and `id_rsa` in your local `~/.ssh` folder.

If you do not have the RSA keys, you can generate a public/private key pair using the following command.

```
ssh-keygen -t rsa -C "your_email@example.com"
```

Press `[Enter]` for all questions. The value for the e-mail address is not relevant in this case. After you execute this command, you should have the files `id_rsa.pub` and `id_rsa` in your `~/.ssh` folder.

#### Remote Machines (Agents, Workers)

Please ensure you have appended the public key (`id_rsa.pub`) to the `~/.ssh/authorized_keys` file on all remote machines (`Agents` and `Workers`). You can 
copy the public key to all your remote machines using the following command.

```
ssh-copy-id -i ~/.ssh/id_rsa.pub simulator@remote-ip-address
```

#### SSH Connection Test

You can check if the connection works as expected using the following command from the `Coordinator` machine (it will print `ok` if everything is fine).

```
ssh -o BatchMode=yes simulator@remote-ip-address "echo ok" 2>&1
```
