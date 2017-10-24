## Validating Secrets Using Strength Policy

<font color="#3981DB">**Hazelcast IMDG Enterprise**</font>
<br></br>

Hazelcast IMDG Enterprise offers a secret validation mechanism including a strength policy. The term “secret” here refers to the cluster group password, symmetric encryption password and salt, and other passwords and keys.
 
For this validation, Hazelcast IMDG Enterprise comes with the class DefaultSecretStrengthPolicy to identify all possible weaknesses of secrets and to display a warning in the system logger. Note that, by default, no matter how weak the secrets are, the cluster members will still start after logging this warning; however, this is configurable (please see the “Enforcing the Secret Strength Policy” section).
 
Requirements (rules) for the secrets are as follows:

- Minimum length of eight characters; and
- Large keyspace use, ensuring the use of at least three of the following: 
  - mixed case; 
  - alpha;
  - numerals;
  - special characters; and
  - no dictionary words. 
 
The rules “Minimum length of eight characters” and “no dictionary words” can be configured using the following system properties:
 
`hazelcast.security.secret.policy.min.length`: Set the minimum secret length. The default is 8 characters. 

Example: 

```
-Dhazelcast.security.secret.policy.min.length=10
```
 
`hazelcast.security.dictionary.policy.wordlist.path`: Set the path of a wordlist available in the file system. The default is `/usr/share/dict/words`.

Example:

```
-Dhazelcast.security.dictionary.policy.wordlist.path=”/Desktop/myWordList”
```
 
#### Using a Custom Secret Strength Policy

You can implement SecretStrengthPolicy to develop your custom strength policy for a more flexible or strict security. After you implement it, you can use the following system property to point to your custom class:
 
`hazelcast.security.secret.strength.default.policy.class`: Set the full name of the custom class.  
 
Example:

```
-Dhazelcast.security.secret.strength.default.policy.class=”com.impl.myStrengthPolicy”
```
 
#### Enforcing the Secret Strength Policy

By default, secret strength policy is NOT enforced. This means, if a weak secret is detected, an informative warning will be showed in the system logger and the members will continue to initialize. However, you can enforce the policy using the following system property so that the members will not be started until the weak secret errors are fixed:
 
`hazelcast.security.secret.strength.policy.enforced`: Set to “true” to enforce the secret strength policy. The default is “false”. To enforce:
 
```
-Dhazelcast.security.secret.strength.policy.enforced=true
```
 
The following is a sample warning when secret strength policy is NOT enforced, i.e., the above system property is set to “false”:

``` 
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ SECURITY WARNING @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Group password does not meet the current policy and complexity requirements.
*Must not be set to the default.
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
```

The following is a sample warning when secret strength policy is enforced, i.e., the above system property is set to “true”:
 
```
WARNING: [192.168.2.112]:5701 [dev] [3.9-SNAPSHOT]
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ SECURITY WARNING @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Symmetric Encryption Password does not meet the current policy and complexity requirements.
*Must contain at least 1 number.
*Must contain at least 1 special character.
Group Password does not meet the current policy and complexity requirements.
*Must not be set to the default.
*Must have at least 1 lower and 1 upper case characters.
*Must contain at least 1 number.
*Must contain at least 1 special character.
Symmetric Encryption Salt does not meet the current policy and complexity requirements.
*Must contain 8 or more characters.
*Must contain at least 1 number.
*Must contain at least 1 special character.
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Exception in thread "main" com.hazelcast.security.WeakSecretException: Weak secrets found in configuration, check output above for more details.
at com.hazelcast.security.impl.WeakSecretsConfigChecker.evaluateAndReport(WeakSecretsConfigChecker.java:49)
at com.hazelcast.instance.EnterpriseNodeExtension.printNodeInfo(EnterpriseNodeExtension.java:197)
at com.hazelcast.instance.Node.<init>(Node.java:194)
at com.hazelcast.instance.HazelcastInstanceImpl.createNode(HazelcastInstanceImpl.java:163)
at com.hazelcast.instance.HazelcastInstanceImpl.<init>(HazelcastInstanceImpl.java:130)
at com.hazelcast.instance.HazelcastInstanceFactory.constructHazelcastInstance(HazelcastInstanceFactory.java:195)
at com.hazelcast.instance.HazelcastInstanceFactory.newHazelcastInstance(HazelcastInstanceFactory.java:174)
at com.hazelcast.instance.HazelcastInstanceFactory.newHazelcastInstance(HazelcastInstanceFactory.java:124)
at com.hazelcast.core.Hazelcast.newHazelcastInstance(Hazelcast.java:58)
```
