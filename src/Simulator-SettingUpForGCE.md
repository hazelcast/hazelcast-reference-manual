
## Setting up for Google Compute Engine

Having installed Simulator, this section describes how to prepare Simulator for testing a Hazelcast cluster deployed at Google Compute Engine (GCE).

Simulator provides support to create and terminate GCE instances via the [Provisioner](#provisioner). If you want to create and setup the GCE instances by yourself, please use the configuration as described in [Setting up for Static Setup](#setting-up-for-static-setup).

The `Provisioner` uses a private PKCS12 key for authentication (see [Service account credentials](https://cloud.google.com/storage/docs/authentication#service_accounts)). Please create a Service account for your project. Please see [Generating a service account credential](https://cloud.google.com/storage/docs/authentication#generating-a-private-key) to generate and download your PKCS12 key.

You will need your email address as cloud identity. Usually this email address is in this form: `<your account ID>@developer.gserviceaccount.com`. You also have to convert the PKCS12 key into the PKCS1 (PEM) format, before you can use it with Simulator.

- Execute the following command to create the GCE credentials in the correct format in the default location.

  ```
  gce-setup <your account ID>@developer.gserviceaccount.com /path/to/your/google.p12
  ```

For security reasons we store the cloud credentials outside of the working directory (e.g. to prevent an accidental commit into your project files). The default locations for the credentials are

- `~/gce.id` for your email address
- `~/gce.pem` for the converted PEM key

You can store the credentials in a different location, but then you need to configure the `simulator.properties` later.

- Create a working directory for your Simulator TestSuite. Use the Simulator Wizard to create an example setup for you and change into the directory.

  ```
  simulator-wizard --createWorkDir tests --cloudProvider google-compute-engine
  cd tests
  ```

- If you stored your GCE credentials in a different location please update the paths of `CLOUD_IDENTITY` and `CLOUD_CREDENTIALS` in your `simulator.properties` file.

- You can also change the `MACHINE_SPEC` to change the instance type and operating system of the created GCE instances.

- Execute the created `prepare` script to create the GCE instances and install Simulator on them.

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

- Execute the following command to destroy the created GCE instances.

  ```
  provisioner --terminate
  ```

Congratulations, you successfully ran Simulator on Google Compute Engine!

![image](images/NoteSmall.jpg) ***NOTE***: *Creating the credential files in your home directory instead of directly setting the access key ID and secret access key in the `simulator.properties` file is for security reasons. It is too easy to share your credentials with the outside world. Now you can safely add the `simulator.properties` file in your source repository or share it with other people.*
