

If you have the open source edition of Hazelcast, Management Center can be used for at most 2 members in the cluster. To use it for more members, you need to have either a Management Center license, Hazelcast IMDG Enterprise license or Hazelcast IMDG Enterprise HD license. This license should be entered within the Management Center as described in the following paragraphs.

![image](../../images/NoteSmall.jpg) ***NOTE:*** *Even if you have a Hazelcast IMDG Enterprise or Enterprise HD license key and you set it as explained in the [Setting the License Key](#setting-the-license-key) section, you still need to enter this same license within the Management Center. Please see the following paragraphs to learn how you can enter your license.*
<br></br>


Once you browse to `http://localhost:8080/mancenter` and since you are going to use Management Center for the first time, the following dialog box appears.

![Signing Up](../../images/Signup.png)


![image](../../images/NoteSmall.jpg) ***NOTE:*** *If you already created an administrator account before, a login dialog box appears instead.*


It asks you to create a username and password and give a valid e-mail address of yours. Once you press the **Sign Up** button, your administrator account credentials are created and the following dialog box appears.

![Selecting Cluster to Connect](../../images/ConnectCluster.png)


"Select Cluster to Connect" dialog box lists the clusters that send statistics to Management Center. You can either select a cluster to connect using the **Connect** button or enter your Management Center license key using the **Enter License** button. Management Center can be used without a license if the cluster that you want to monitor has **at most** two members. Note that if your cluster has more than two members, Management Center (without a license) does not show any information

If you have a Management Center license or Hazelcast IMDG Enterprise license, you can enter it in the dialog box that appears once you press the **Enter License** button, as shown below.

![Providing License for Management Center](../../images/EnterLicense.png)


When you try to connect to a cluster that has more than 2 members without entering a license key or if your license key is expired, the following dialog box appears.

![Management Center License Warning](../../images/ExpiredLicense.png)


Here, you can either choose to connect to a cluster without providing a license key or to enter your license key. If you choose to continue without a license, please remember that Management Center works if your cluster has **at most** two members.

Management Center creates a folder with the name `mancenter` under your `user/home` folder to save data files and above settings/license information. You can change the data folder by setting the `hazelcast.mancenter.home` system property. Please see the [System Properties section](#system-properties) to see the description of this property and to learn how to set a system property.

<br></br>

***RELATED INFORMATION***

*Please refer to the [Management Center Configuration section](#management-center-configuration) for a full description of Hazelcast Management Center configuration.*
