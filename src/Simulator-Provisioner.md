
## Provisioner

The provisioner is responsible for creating and destroying cloud instances. It will create an instance of the configured type, open firewall ports and install Java and Hazelcast Simulator on it.

You can configure the cloud provider, operating system, region, hardware, JVM version and Hazelcast version through
the file `simulator.properties`. Please see the [Simulator.Properties File Description section](#simulator-properties-file-description) for more information. 

### Creating and destroying instances 

To create instances use `--scale` with the target size. This command will create a single instance.

```
provisioner --scale 1
```

Executing the following command will create two new instances (to a total of three).  

```
provisioner --scale 3
```

To scale back to two cloud instances execute the following command.

```
provisioner --scale 2
```

You can terminate all existing instances with these commands.   

```
provisioner --terminate
```

OR

```
provisioner --scale 0
```

The file `agents.txt` will be updated automatically by Provisioner.

### Installing Hazelcast Simulator

If you already have your cloud instances provisioned or run a `static` setup you can just install Hazelcast Simulator with the following command.

```
provisioner --install
```

This is also useful whenever you update or change your local installation and want to re-install Hazelcast Simulator on the remote machines. This is just necessary if the JAR files have been changed. Configuration changes in your `test.properties` or `simulator.properties` don't require a new Simulator installation.

### Download and clean log files

Execute the following command to download all the Worker home folders (containing Worker and GC log files and Java heap dumps in cause of an OOM).

```
provisioner --download
```

To clean up all Worker homes execute this command.

```
provisioner --clean
```

### Stopping all remote processes

If your test run hangs for any reason you can kill all Java processes on the remote machines with the following command:

```
provisioner --kill
```

After that you can download the log files and analyze what went wrong.

### Connecting to the cloud instances

By default the Provisioner creates a user with the name `simulator`. That user is added to the sudoers list. Also, the public RSA key of your local user is copied to the remote machine and added to the file `~/.ssh/authorized_keys`. You can login to that machine using the following command.

```
ssh simulator@ip
```

You can change the name of the created user by setting the `USER=preferredUserName` property in the file `simulator.properties`. Be careful not to pick a name that is already used on the target image. For example `ec2-user` or `ubuntu` often exist and you can run into authentication problems if you use the same username.
