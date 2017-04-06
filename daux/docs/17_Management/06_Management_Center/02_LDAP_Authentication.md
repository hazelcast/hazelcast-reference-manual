
You can use your existing LDAP server for authentication/authorization on Management Center. In the "Configure Security" page, select **LDAP** from the "Security Provider" combo box, and the following form page appears:

![LDAP Configuration](../../images/ConfigureLDAP.png)

Provide the details in this form for your LDAP server:

- **URL:** URL of your LDAP server, including schema (`ldap://` or `ldaps://`) and port.
- **Search base DN:** Base DN to use for searching users/groups.
- **Additional user DN:** Appended to "Search base DN" and used for finding users.
- **Additional group DN:** Appended to "Search base DN" and used for finding groups.
- **Admin Group Name:** Members of this group will have admin privileges on Management Center.
- **User Group Name:** Members of this group will have read and write privileges on Management Center.
- **Read-only User Group Name:** Members of this group will only have read privilege on Management Center.
- **Start TLS:** Enable if your LDAP server uses Start TLS.
- **User Search Filter:** LDAP search filter expression to search for users. For example, `uid={0}` searches for a username that matches with the `uid` attribute.
- **Group Search Filter:** LDAP search filter expression to search for groups. For example, `uniquemember={0}` searches for a group that matches with the `uniquemember` attribute

Once configured, LDAP settings are saved in a file named `ldap.properties` under the `mancenter` folder mentioned in the previous section. If you want to update your settings afterwards, you need to update `ldap.properties` file and click "Reload Security Config" button on the login page.

