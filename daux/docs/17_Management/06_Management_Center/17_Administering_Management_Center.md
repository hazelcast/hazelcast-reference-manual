
![image](../../images/NoteSmall.jpg) ***NOTE:*** *This toolbar item is available only to admin users.*

The **Admin** user can add, edit, and remove users and specify the permissions for the users of Management Center. To perform these operations, click on the **Administration** button located on the toolbar. The page below appears.

![Administration](../../images/Administration.png)

##### Users

To add a user to the system, specify the username, e-mail and password in the **Add/Edit User** part of the page. If the user to be added will have administrator privileges, select **isAdmin** checkbox. **Permissions** checkboxes have two values:

-	**Read Only**: If this permission is given to the user, only *Home*, *Documentation* and *Time Travel* items will be visible at the toolbar at that user's session. Also, users with this permission cannot update a [map configuration](06_Managing_Maps.md), run a garbage collection and take a thread dump on a cluster member, or shutdown a member (please see [Monitoring Members](13_Monitoring_Members.md)).
-	**Read/Write**: If this permission is given to the user, *Home*, *Scripting*, *Console*, *Documentation* and *Time Travel* items will be visible. The users with this permission can update a map configuration and perform operations on the members.

After you enter/select all fields, click **Save** button to create the user. You will see the newly created user's username on the left side, in the **Users** part of the page.

To edit or delete a user, select a username listed in the **Users**. Selected user information appears on the right side of the page. To update the user information, change the fields as desired and click the **Save** button. To delete the user from the system, click the **Delete** button.

##### License

To update the management center license, you can click on the **Update License** button and enter the new license code. You will see the expiration date of your current license on the screen.

![License](../../images/License.png)

