
You can use your existing LDAP or Active Directory server for authentication/authorization on Management Center. Click "Configure LDAP" button on Sign Up page and fill in the following details for your LDAP/Active Directory server:

- **URL:** URL of your LDAP/Active Directory server, including schema (`ldap://` or `ldaps://`) and port.
- **LDAP Type:** Choose `Active Directory` if you're using Microsoft Active Directory, `LDAP` for other LDAP servers such as Apache DS or Open LDAP
- **Domain:** Domain of your organization on Active Directory.
- **Distinguished name (DN) of user:** DN of a user that has admin privileges on the LDAP server. Will be used to connect to the server when authenticating users. 
- **Password:** Password for the same user.
- **Search base DN:** Base DN to use for searching users/groups.
- **Additional user DN:** Appended to "Search base DN" and used for finding users.
- **Additional group DN:** Appended to "Search base DN" and used for finding groups.
- **Admin Group Name:** Members of this group will have admin privileges on Management Center.
- **User Group Name:** Members of this group will have read and write privileges on Management Center.
- **Read-only User Group Name:** Members of this group will only have read privilege on Management Center.
- **Start TLS:** Enable if your LDAP server uses Start TLS.

Once configured, LDAP settings are saved in a file named `ldap.properties` under the `mancenter` folder mentioned in the previous section. If you want to update your settings afterwards, you need to update `ldap.properties` file and click "Reload LDAP Config" button on the login page. 

