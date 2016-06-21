
## Encryption

<font color="#3981DB">**Hazelcast Enterprise**</font>
<br></br>


Hazelcast allows you to encrypt the entire socket level communication among all Hazelcast members. Encryption is based on <a href="http://java.sun.com/javase/6/docs/technotes/guides/security/crypto/CryptoSpec.html" target="_blank">Java Cryptography Architecture</a>. In symmetric encryption, each node uses the same key, so the key is shared. Here is an example configuration for symmetric encryption.

You set the encryption algorithm, the salt value to use for generating the secret key, the password to use when generating the secret key, and the iteration count to use when generating the secret key. You also need to set `enabled` to true.

```xml
<hazelcast>
  ...
  <network>
    ...
    <!--
      Make sure to set enabled=true
      Make sure this configuration is exactly the same on
      all members
    -->
    <symmetric-encryption enabled="true">
      <!--
        encryption algorithm such as
        DES/ECB/PKCS5Padding,
        PBEWithMD5AndDES,
        Blowfish,
        DESede
      -->
      <algorithm>PBEWithMD5AndDES</algorithm>

      <!-- salt value to use when generating the secret key -->
      <salt>thesalt</salt>

      <!-- pass phrase to use when generating the secret key -->
      <password>thepass</password>

      <!-- iteration count to use when generating the secret key -->
      <iteration-count>19</iteration-count>
    </symmetric-encryption>
  </network>
  ...
</hazelcast>
```

<br> </br>


***RELATED INFORMATION***

*Please see the [SSL section](#ssl).*
