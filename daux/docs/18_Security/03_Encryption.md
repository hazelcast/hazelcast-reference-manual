
<font color="#3981DB">**Hazelcast IMDG Enterprise**</font>
<br></br>


Hazelcast allows you to encrypt the entire socket level communication among all Hazelcast members and clients. Encryption is based on <a href="http://java.sun.com/javase/6/docs/technotes/guides/security/crypto/CryptoSpec.html" target="_blank">Java Cryptography Architecture</a>. 

Hazelcast provides symmetric and asymmetric encryption. For asymmetric encryption, SSL/TLS cryptographic protocols are used. For symmetric encryption, the following algorithms are used.

* DES/ECB/PKCS5Padding
* PBEWithMD5AndDES
* Blowfish
* DESede

Hazelcast uses MD5 message-digest algorithm as the cryptographic hash function. You can also use the salting process by giving a salt and password which are then concatenated and processed with MD5, and the resulting output is stored with the salt.


In symmetric encryption, each member uses the same key, so the key is shared. Here is an example configuration for symmetric encryption.


```xml
<hazelcast>
  ...
  <network>
    ...
    <symmetric-encryption enabled="true">
      <algorithm>PBEWithMD5AndDES</algorithm>
      <salt>thesalt</salt>
      <password>thepass</password>
      <iteration-count>19</iteration-count>
    </symmetric-encryption>
  </network>
  ...
</hazelcast>
```

You set the encryption algorithm, the salt value to use for generating the secret key, the password to use when generating the secret key, and the iteration count to use when generating the secret key. You also need to set `enabled` to true. Note that all members should have the same encryption configuration.

<br></br>
![image](../images/NoteSmall.jpg)***NOTE:*** *Encryption cannot be used on Hazelcast clients. Moreover, when you enable encryption on your Hazelcast cluster, the clients will not work, i.e., they will not be able to connect to the cluster.*
<br></br>


***RELATED INFORMATION***

*Please see the [SSL section](04_SSL.md).*
