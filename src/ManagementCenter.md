## Management Center

Hazelcast Management Center enables you to monitor and manage your cluster members running Hazelcast. In addition to monitoring overall state of your clusters, you can also analyze and browse your data structures in detail, update map configurations and take thread dump from members. With its scripting and console module, you can run scripts (JavaScript, Groovy, etc.) and commands on your members.

### Installing Management Center

You have two options for installing Hazelcast Management Center. You can either deploy the `mancenter`-*version*`.war` application into your Java application server/container or you can start Hazelcast Management Center from the command line and then have the Hazelcast cluster members communicate with that web application. This means that your members should know the URL of the `mancenter` application before they start.

Here are the steps.

1. Download the latest Hazelcast ZIP from <a href="http://www.hazelcast.org/download/" target="_blank">hazelcast.org</a>. The ZIP contains the `mancenter`-*version*`.war` file. 
2. You can directly start `mancenter`-*version*`.war` file from the command line. The following command will start Hazelcast Management Center on port 8080 with context root 'mancenter' (`http://localhost:8080/mancenter`).

        ```java
        java -jar mancenter-*version*.war 8080 mancenter
        ```

3. Or, instead of starting at the command line, you can deploy it to your web server (Tomcat, Jetty, etc.). Let us say it is running at `http://localhost:8080/mancenter`.
4. After you perform the above steps, make sure that `http://localhost:8080/mancenter` is up.
5. Configure your Hazelcast members by adding the URL of your web application to your `hazelcast.xml`. Hazelcast members will send their states to this URL.

        ```xml
        <management-center enabled="true">
          http://localhost:8080/mancenter
        </management-center>
        ```

6. Start your Hazelcast cluster.
7. Browse to `http://localhost:8080/mancenter` and login. **Initial login username/password is `admin/admin`**

The Management Center creates a folder with the name "mancenter" under your "user/home" folder to save data files. You can change the data folder by setting the `hazelcast.mancenter.home` system property.

<br></br>

***RELATED INFORMATION***

*Please refer to the [Management Center Configuration section](#management-center-configuration) for a full description of Hazelcast Management Center configuration.*


### Management Center Tools

Once the page is loaded after selecting a cluster, the tool's home page appears as shown below.

![](images/NonHostedMCHomePage.jpg)

This page provides the fundamental properties of the selected cluster which are explained in the [Home Page](#home-page) section. The page has a toolbar on the top and a menu on the left.

#### Toolbar

The toolbar has the following buttons:

-	**Home**: Loads the home page shown above. Please see [Management Center Home Page](#management-center-home-page).
-	**Scripting**: Loads the page used to write and execute the user`s own scripts on the cluster. Please see the [Scripting section](#scripting).
-	**Console**: Loads the page used to execute commands on the cluster. Please see the [Console section](#executing-console-commands).
-	**Alerts**: Creates alerts by specifying filters. Please see [Setting Alerts](#creating-alerts).
-	**Documentation**: Opens the Management Center documentation in a window inside the tool. Please see the [Documentation section](#management-center-documentation).
-	**Administration**: Used by the admin users to manage users in the system. Please see [Administering Management Center](#administering-management-center).
-	**Time Travel**: Sees the cluster's situation at a time in the past. Please see the [Time Travel section](#checking-past-status-with-time-travel).
-	**Cluster Selector**: Switches between clusters. When the mouse is moved onto this item, a drop down list of clusters appears.

  ![](images/4ChangeCluster.jpg)

  The user can select any cluster and once selected, the page immediately loads with the selected cluster's information.
-	**Logout**: Closes the current user's session.

![image](images/NoteSmall.jpg) ***NOTE:*** *Some of the above listed toolbar items are not visible to users who are not admin or who have **read-only** permission. Also, some of the operations explained in the later sections cannot be performed by users with read-only permission. Please see the [Administration section](#administration) for details.*

#### Menu

The Home Page includes a menu on the left which lists the distributed data structures in the cluster and all the cluster members, as shown below.

![](images/LeftMenu.png)

![image](images/NoteSmall.jpg) ***NOTE:*** *Distributed data structures will be shown there when the proxies are created for them.*

You can expand and collapse menu items by clicking on them. Below is the list of menu items with links to their explanations.

-	[Caches](#monitoring-caches)
-	[Maps](#managing-maps)
-   [Replicated Maps](#monitoring-replicated-maps)
-	[Queues](#monitoring-queues)
-	[Topics](#monitoring-topics)
-	[MultiMaps](#monitoring-multimaps)
-	[Executors](#monitoring-executors)
-	[Members](#members)

#### Tabbed View

Each time you select an item from the toolbar or menu, the item is added to the main view as a tab, as shown below.

![](images/NonHMCTabbedView.jpg)

In the above example, *Home*, *Scripting*, *Console*, *queue1* and *map1* windows can be seen as tabs. Windows can be closed using the ![](images/CloseIcon.jpg) icon on each tab (except the Home Page; it cannot be closed).


### Management Center Home Page

This is the first page appearing after logging in. It gives an overview of the connected cluster. The following subsections describe each portion of the page.

#### CPU Utilization

This part of the page provides load and utilization information for the CPUs for each node (cluster member), as shown below.

![](images/NonHMCCPUUtil.jpg)

The first column lists the nodes with their IPs and ports. The next columns list the system load averages on each node for the last 1, 5 and 15 minutes. These average values are calculated as the sum of the count of runnable entities running on and queued to the available CPUs averaged over the last 1, 5 and 15 minutes. This calculation is operating system specific, typically a damped time-dependent average. If system load average is not available, these columns show negative values.

The last column (**Chart**) graphically shows the recent load on the CPUs. When you move the mouse cursor on a chart, you can see the CPU load at the time where the cursor is placed. Charts under this column shows the CPU loads approximately for the last 2 minutes. If recent CPU load is not available, you will see a negative value.

#### Memory Utilization

This part of the page provides information related to memory usages for each node (cluster member), as shown below.

![](images/NonHMCMemoryUtil.jpg)

The first column lists the nodes with their IPs and ports. The next columns show the used and free memories out of the total memory reserved for Hazelcast usage, in real-time. The **Max** column lists the maximum memory capacity of each node and the **Percent** column lists the percentage value of used memory out of the maximum memory. The last column (**Chart**) shows the memory usage of nodes graphically. When you move the mouse cursor on a desired graph, you can see the memory usage at the time where the cursor is placed. Graphs under this column shows the memory usages approximately for the last 2 minutes.

#### Memory Distribution

This part of the page graphically provides the cluster wise breakdown of memory, as shown below. The blue area is the memory used by maps. The dark yellow area is the memory used by both non-Hazelcast entities and all Hazelcast entities except the map (i.e. the memory used by all entities subtracted by the memory used by map). The green area is the free memory out of the whole cluster`s memory capacity.

![](images/Home-MemoryDistribution.jpg)

In the above example, you can see 0.32% of the total memory is used by Hazelcast maps (it can be seen by placing the mouse cursor on it), 58.75% is used by non-Hazelcast entities and 40.85% of the total memory is free.

#### Map Memory Distribution

This part is the breakdown of the blue area shown in the **Memory Distribution** graph explained above. It provides the percentage values of the memories used by each map, out of the total cluster memory reserved for all Hazelcast maps.

![](images/Home-MapMemoryDistribution.jpg)

In the above example, you can see 49.55% of the total map memory is used by **map1** and 49.55% is used by **map2**.

#### Partition Distribution

This pie chart shows what percentage of partitions each node (cluster member) has, as shown below.

![](images/Home-PartitionDistribution.jpg)

You can see each node's partition percentages by placing the mouse cursor on the chart. In the above example, you can see the node "127.0.0.1:5708" has 5.64% of the total partition count (which is 271 by default and configurable, please see the `hazelcast.partition.count` property explained in the [System Properties section](#system-properties)).


### Monitoring Caches

You can monitor your caches' metrics by clicking the cache name listed on the left panel under **Caches** menu item. A new tab for monitoring that cache instance is opened on the right, as shown below.

![](images/ManCenter-Caches.jpg)

On top of the page, four charts monitor the **Gets**, **Puts**, **Removals** and **Evictions** in real-time. The X-axis of all the charts show the current system time. To open a chart as a separate dialog, click on the ![](images/MaximizeChart.jpg) button placed at the top right of each chart.

Under these charts is the Cache Statistics Data Table. From left to right, this table lists the IP addresses and ports of each member, and the get, put, removal, eviction, and hit and miss counts per second in real-time.

You can navigate through the pages using the buttons at the bottom right of the table (**First, Previous, Next, Last**). You can ascend or descend the order of the listings in each column by clicking on column headings.

![image](images/NoteSmall.jpg) ***NOTE:*** *You need to enable the statistics for caches to monitor them in the Management Center. Use the `<statistics-enabled>` element or `setStatisticsEnabled()` method in declarative or programmatic configuration, respectively, to enable the statistics. Please refer to the [Cache Configuration section] for more information.*



### Managing Maps

Map instances are listed under the **Maps** menu item on the left. When you click on a map, a new tab for monitoring that map instance opens on the right, as shown below. In this tab, you can monitor metrics and also re-configure the selected map.

![](images/MapsHome.jpg)

The below subsections explain the portions of this window.

#### Map Browser

Use the Map Browser tool to retrieve properties of the entries stored in the selected map. To open the Map Browser tool, click on the **Map Browser** button, located at the top right of the window. Once opened, the tool appears as a dialog, as shown below.

![](images/Map-MapBrowser.jpg)

Once the key and the key's type are specified and the **Browse** button is clicked, the key's properties along with its value are listed.

#### Map Config

Use the Map Config tool to set the selected map's attributes, such as the backup count, TTL, and eviction policy. To open the Map Config tool, click on the **Map Config** button, located at the top right of the window. Once opened, the tool appears as a dialog, as shown below.

![](images/Map-MapConfig.jpg)

You can change any attribute and click the **Update** button to save your changes.


#### Map Monitoring

Besides the Map Browser and Map Config tools, the map monitoring page has monitoring options that are explained below. All of these options perform real-time monitoring.

On top of the page, small charts monitor the size, throughput, memory usage, backup size, etc. of the selected map in real-time. The X-axis of all the charts show the current system time. You can select other small monitoring charts using the ![](images/ChangeWindowIcon.jpg) button at the top right of each chart. When you click the button, the monitoring options are listed, as shown below.

![](images/SelectConfOpt.jpg)

When you click on a desired monitoring, the chart is loaded with the selected option. To open a chart as a separate dialog, click on the ![](images/MaximizeChart.jpg) button placed at the top right of each chart. The monitoring charts below are available:

-	**Size**: Monitors the size of the map. Y-axis is the entry count (should be multiplied by 1000).
-	**Throughput**: Monitors get, put and remove operations performed on the map. Y-axis is the operation count.
-	**Memory**: Monitors the memory usage on the map. Y-axis is the memory count.
-	**Backups**: Chart loaded when "Backup Size" is selected. Monitors the size of the backups in the map. Y-axis is the backup entry count (should be multiplied by 1000).
-	**Backup Memory**: Chart loaded when "Backup Mem." is selected. Monitors the memory usage of the backups. Y-axis is the memory count.
-	**Hits**: Monitors the hit count of the map.
-	**Puts/s, Gets/s, Removes/s**: These three charts monitor the put, get and remove operations (per second) performed on the selected map.

Under these charts are **Map Memory** and **Map Throughput** data tables. The Map Memory data table provides memory metrics distributed over members, as shown below.

![](images/Map-MemoryDataTable.jpg)

From left to right, this table lists the IP address and port, entry counts, memory used by entries, backup entry counts, memory used by backup entries, events, hits, locks and dirty entries (in the cases where *MapStore* is enabled, these are the entries that are put to/removed from the map but not written to/removed from a database yet) of each entry in the map. You can navigate through the pages using the buttons at the bottom right of the table (**First, Previous, Next, Last**). You can ascend or descend the order of the listings by clicking on the column headings.

Map Throughput data table provides information about the operations (get, put, remove) performed on each member in the map, as shown below.

![](images/Map-MapThroughputDataTable.jpg)

From left to right, this table lists:

- the IP address and port of each member, 
- the put, get and remove operations on each member, 
- the average put, get, remove latencies, 
- and the maximum put, get, remove latencies on each member.

You can select the period in the combo box placed at the top right corner of the window, for which the table data will be shown. Available values are **Since Beginning**, **Last Minute**, **Last 10 Minutes** and **Last 1 Hour**.

You can navigate through the pages using the buttons placed at the bottom right of the table (**First, Previous, Next, Last**). To ascend or descent the order of the listings, click on the column headings.

### Monitoring Replicated Maps

Replicated Map instances are shown under the **Replicated Maps** menu item on the left. When you click on a Replicated Map, a new tab for monitoring that instance opens on the right, as shown below. 

![](images/replicated-map-stats.png)

In this tab, you can monitor metrics and also re-configure the selected Replicated Map. All of the statistics are real-time monitoring statistics.

When you click on a desired monitoring, the chart is loaded with the selected option. Also you can open the chart in new window.

-	**Size**: Monitors the size of the Replicated Map. Y-axis is the entry count (should be multiplied by 1000).
-	**Throughput**: Monitors get, put and remove operations performed on the Replicated Map. Y-axis is the operation count.
-	**Memory**: Monitors the memory usage on the Replicated Map. Y-axis is the memory count.
-	**Hits**: Monitors the hit count of the Replicated Map.
-	**Puts/s, Gets/s, Removes/s**: These three charts monitor the put, get and remove operations (per second) performed on the selected Replicated Map, the average put, get, remove latencies, and the maximum put, get, remove latencies on each member.

The Replicated Map Throughput Data Table provides information about operations (get, put, remove) performed on each member in the selected Replicated Map.

![](images/replicated-map-throughput.png)

From left to right, this table lists:

- the IP address and port of each member,
- the put, get, and remove operations on each member,
- the average put, get, and remove latencies,
- and the maximum put, get, and remove latencies on each member.

You can select the period from the combo box placed at the top right corner of the window, in which the table data is shown. Available values are **Since Beginning**, **Last Minute**, **Last 10 Minutes** and **Last 1 Hour**.

You can navigate through the pages using the buttons placed at the bottom right of the table (**First, Previous, Next, Last**). To ascend or descent the order of the listings, click on the column headings.


### Monitoring Queues

Using the menu item **Queues**, you can monitor your queues data structure. When you expand this menu item and click on a queue, a new tab for monitoring that queue instance is opened on the right, as shown below.

![](images/Queues-Home.jpg)

On top of the page, small charts monitor the size, offers and polls of the selected queue in real-time. The X-axis of all the charts shows the current system time. To open a chart as a separate dialog, click on the ![](images/MaximizeChart.jpg) button placed at the top right of each chart. The monitoring charts below are available:

-	**Size**: Monitors the size of the queue. Y-axis is the entry count (should be multiplied by 1000).
-	**Offers**: Monitors the offers sent to the selected queue. Y-axis is the offer count.
-	**Polls**: Monitors the polls sent to the selected queue. Y-axis is the poll count.

Under these charts are **Queue Statistics** and **Queue Operation Statistics** tables. The Queue Statistics table provides item and backup item counts in the queue and age statistics of items and backup items at each member, as shown below.

![](images/QueueStatistics.jpg)

From left to right, this table lists the IP address and port, items and backup items on the queue of each member, and maximum, minimum and average age of items in the queue. You can navigate through the pages using the buttons placed at the bottom right of the table (**First, Previous, Next, Last**). The order of the listings in each column can be ascended or descended by clicking on column headings.

Queue Operations Statistics table provides information about the operations (offers, polls, events) performed on the queues, as shown below.

![](images/QueueOperationStatistics.jpg)

From left to right, this table lists the IP address and port of each member, and counts of offers, rejected offers, polls, poll misses and events.

You can select the period in the combo box placed at the top right corner of the window to show the table data. Available values are **Since Beginning**, **Last Minute**, **Last 10 Minutes** and **Last 1 Hour**.

You can navigate through the pages using the buttons placed at the bottom right of the table (**First, Previous, Next, Last**). Click on the column headings to ascend or descend the order of the listings.


### Monitoring Topics

To monitor your topics' metrics, click the topic name listed on the left panel under the **Topics** menu item. A new tab for monitoring that topic instance opens on the right, as shown below.

![](images/ManCenter-Topics.jpg)

On top of the page, two charts monitor the **Publishes** and **Receives** in real-time. They show the published and received message counts of the cluster, the members of which are subscribed to the selected topic. The X-axis of both charts show the current system time. To open a chart as a separate dialog, click on the ![](images/MaximizeChart.jpg) button placed at the top right of each chart.

Under these charts is the Topic Operation Statistics table. From left to right, this table lists the IP addresses and ports of each member, and counts of message published and receives per second in real-time. You can select the period in the combo box placed at top right corner of the table to show the table data. The available values are **Since Beginning**, **Last Minute**, **Last 10 Minutes** and **Last 1 Hour**.

You can navigate through the pages using the buttons placed at the bottom right of the table (**First, Previous, Next, Last**). Click on the column heading to ascend or descend the order of the listings.


### Monitoring MultiMaps

MultiMap is a specialized map where you can associate a key with multiple values. This monitoring option is similar to the **Maps** option: the same monitoring charts and data tables monitor MultiMaps. The differences are that you cannot browse the MultiMaps and re-configure it. Please see [Managing Maps](#managing-maps).


### Monitoring Executors

Executor instances are listed under the **Executors** menu item on the left. When you click on a executor, a new tab for monitoring that executor instance opens on the right, as shown below.

![](images/ExecutorsHome.jpg)

On top of the page, small charts monitor the pending, started, completed, etc. executors in real-time. The X-axis of all the charts shows the current system time. You can select other small monitoring charts using the ![](images/ChangeWindowIcon.jpg) button placed at the top right of each chart. Click the button to list the monitoring options, as shown below.

![](images/SelectExecMonOpt.jpg)

When you click on a desired monitoring, the chart loads with the selected option. To open a chart as a separate dialog, click on the ![](images/MaximizeChart.jpg) button placed at top right of each chart. The below monitoring charts are available:

-	**Pending**: Monitors the pending executors. Y-axis is the executor count.
-	**Started**: Monitors the started executors. Y-axis is the executor count.
-	**Start Lat. (msec.)**: Shows the latency when executors are started. Y-axis is the duration in milliseconds.
-	**Completed**: Monitors the completed executors. Y-axis is the executor count.
-	**Comp. Time (msec.)**: Shows the completion period of executors. Y-axis is the duration in milliseconds.

Under these charts is the **Executor Operation Statistics** table, as shown below.

![](images/ExecutorOperationStats.jpg)

From left to right, this table lists the IP address and port of members, the counts of pending, started and completed executors per second, and the execution time and average start latency of executors on each member. You can navigate through the pages using the buttons placed at the bottom right of the table (**First, Previous, Next, Last**). Click on the column heading to ascend or descend the order of the listings.


### Monitoring Members

Use this menu item to monitor each cluster member and perform operations like running garbage collection (GC) and taking a thread dump. Once you select a member from the menu, a new tab for monitoring that member opens on the right, as shown below.

![](images/MembersHome.png)

The **CPU Utilization** chart shows the percentage of CPU usage on the selected member. The **Memory Utilization** chart shows the memory usage on the selected member with three different metrics (maximum, used and total memory). You can open both of these charts as separate windows using the ![](images/ChangeWindowIcon.jpg) button placed at top right of each chart; this gives you a clearer view of the chart.

The window titled **Partitions** shows which partitions are assigned to the selected member. **Runtime** is a dynamically updated window tab showing the processor number, the start and up times, and the maximum, total and free memory sizes of the selected member. Next to this, the **Properties** tab shows the system properties. The **Member Configuration** window shows the connected Hazelcast cluster's XML configuration.

The **List of Slow Operations** gives an overview of detected slow operations which occurred on that member. The data is collected by the [SlowOperationDetector](#slowoperationdetector).

![](images/ListOfSlowOperations.png)

By clicking on an entry you can open a dialog which shows the stacktrace and detailed information about each slow invocation of this operation.

![](images/SlowOperationDetail.png)

Besides the aforementioned monitoring charts and windows, you can also perform operations on the selected member through this page. The operation buttons are located at the top right of the page, as explained below:

-	**Run GC**: When pressed, garbage collection is executed on the selected member. A notification stating that the GC execution was successful will be shown.
-	**Thread Dump**: When pressed, thread dump of the selected member is taken and shown as a separate dialog to the user.
-	**Shutdown Node**: It is used to shutdown the selected member.

### Scripting

You can use the scripting feature of this tool to execute codes on the cluster. To open this feature as a tab, select **Scripting** located at the toolbar on top. Once selected, the scripting feature opens as shown below.

![](images/scripting.jpg)

In this window, the **Scripting** part is the actual coding editor. You can select the members on which the code will execute from the **Members** list shown at the right side of the window. Below the members list, a combo box enables you to select a scripting language: currently, JavaScript, Ruby, Groovy and Python languages are supported. After you write your script and press the **Execute** button, you can see the execution result in the **Result** part of the window.

![image](images/NoteSmall.jpg) ***NOTE:*** *To use the scripting languages other than JavaScript on a member, the libraries for those languages should be placed in the classpath of that member.*

There are **Save** and **Delete** buttons on the top right of the scripting editor. To save your scripts, press the **Save** button after you type a name for your script into the field next to this button. The scripts you saved are listed in the **Saved Scripts** part of the window, located at the bottom right of the page. Click on a saved script from this list to execute or edit it. If you want to remove a script that you wrote and saved before, select it from this list and press the **Delete** button.

In the scripting engine you have a `HazelcastInstance` bonded to a variable named `hazelcast`. You can invoke any method that `HazelcastInstance` has via the `hazelcast` variable. You can see example usage for JavaScript below.

```javascript
var name = hazelcast.getName();
var node = hazelcast.getCluster().getLocalMember();
var employees = hazelcast.getMap("employees");
employees.put("1","John Doe");
employees.get("1"); // will return "John Doe"
```


### Executing Console Commands

The Management Center has a console feature that enables you to execute commands on the cluster. For example, you can perform `put`s and `get`s on a map, after you set the namespace with the command `ns <name of your map>`. The same is valid for queues, topics, etc. To execute your command, type it into the field below the console and press **Enter**. Type `help` to see all the commands that you can use.

Open a console window by clicking on the **Console** button located on the toolbar. Below is a sample view with some executed commands.

![](images/console.jpg)


### Creating Alerts

You can use the alerts feature of this tool to receive alerts and/or e-mail notifications by creating filters. In these filters, you can specify criteria for cluster members or data structures. When the specified criteria are met for a filter, the related alert is shown as a pop-up message on the top right of the page or sent as an e-mail.

Once you click the **Alerts** button located on the toolbar, the page shown below appears.

![](images/Alerts-Home.png)

If you want to enable the Management Center to send e-mail notifications to the Management Center Admin users, you need to configure the SMTP server. To do this, click on the **Create STMP Config** shown above. The form shown below appears.

![](images/CreateSMTPConfig.png)

In this form, specify the e-mail address from which the notifications will be sent and also its password. Then, provide the SMTP server host address and port. Finally, check the **TLS Connection** checkbox if the connection is secured by TLS (Transport Layer Security).

After you provide the required information, click on the **Save Config** button. After a processing period (for a couple of seconds), the form will be closed if the configuration is created successfully. In this case, an e-mail will be sent to the e-mail address you provided in the form stating that the SMTP configuration is successful and e-mail alert system is created.

If not, you will see an error message at the bottom of this form as shown below.   

![](images/SMTPConfigFormWithError.png)

As you can see, the reasons can be wrong SMTP configuration or connectivity problems. In this case, please check the form fields and check for any causes for the connections issues with your server.

**Creating Filters for Cluster Members**

Select **Member Alerts** check box to create filters for some or all members in the cluster. Once selected, the next screen asks for which members the alert will be created. Select the desired members and click on the **Next** button. On the next page (shown below), specify the criteria.

![](images/MemberAlert1.jpg)

Alerts can be created when:

-	free memory on the selected member nodes is less than the specified number.
-	used heap memory is larger than the specified number.
-	the number of active threads are less than the specified count.
-	the number of daemon threads are larger than the specified count.

When two or more criteria is specified they will be bound with the logical operator **AND**.

On the next page, give a name for the filter. Then, select whether notification e-mails will be sent to the Management Center Admins using the **Send Email Alert** checkbox. Then, provide a time interval (in seconds) for which the e-mails with the **same notification content** will be sent using the **Email Interval (secs)** field.  Finally, select whether the alert data will be written to the disk (if checked, you can see the alert log at the folder */users/<your user>/mancenter<version>*).

Click on the **Save** button; your filter will be saved and put into the **Filters** part of the page. To edit the filter, click on the ![](images/EditIcon.jpg) icon. To delete it, click on the ![](images/DeleteIcon.jpg) icon.

**Creating Filters for Data Types**

Select the **Data Type Alerts** check box to create filters for data structures. The next screen asks for which data structure (maps, queues, multimaps, executors) the alert will be created. Once a structure is selected, the next screen immediately loads and you then select the data structure instances (i.e. if you selected *Maps*, it will list all the maps defined in the cluster, you can select one map or more). Select as desired, click on the **Next** button, and select the members on which the selected data structure instances will run.

The next screen, as shown below, is the one where you specify the criteria for the selected data structure.

![](images/DataAlert1.jpg)

As the screen shown above shows, you will select an item from the left combo box, select the operator in the middle one, specify a value in the input field, and click on the **Add** button. You can create more than one criteria in this page; those will be bound by the logical operator **AND**.

After you specify the criteria, click the **Next** button. On the next page, give a name for the filter. Then, select whether notification e-mails will be sent to the Management Center Admins using the **Send Email Alert** checkbox. Then, provide a time interval (in seconds) for which the e-mails with the **same notification content** will be sent using the **Email Interval (secs)** field.  Finally, select whether the alert data will be written to the disk (if checked, you can see the alert log at the folder */users/<your user>/mancenter<version>*).

Click on the **Save** button; your filter will be saved and put into the **Filters** part of the page. To edit the filter, click on the ![](images/EditIcon.jpg) icon. To delete it, click on the ![](images/DeleteIcon.jpg) icon.


### Administering Management Center

![image](images/NoteSmall.jpg) ***NOTE:*** *This toolbar item is available only to admin users, i.e. the users who initially have ***admin*** as their both usernames and passwords.*

The **Admin** user can add, edit, and remove users and specify the permissions for the users of Management Center. To perform these operations, click on the **Administration** button located on the toolbar. The page below appears.

![](images/admin.jpg)

To add a user to the system, specify the username, e-mail and password in the **Add/Edit User** part of the page. If the user to be added will have administrator privileges, select **isAdmin** checkbox. **Permissions** checkboxes have two values:

-	**Read Only**: If this permission is given to the user, only *Home*, *Documentation* and *Time Travel* items will be visible at the toolbar at that user's session. Also, users with this permission cannot update a [map configuration](#map-config), run a garbage collection and take a thread dump on a cluster member, or shutdown a member (please see [Monitoring Members](#monitoring-members)).
-	**Read/Write**: If this permission is given to the user, *Home*, *Scripting*, *Console*, *Documentation* and *Time Travel* items will be visible. The users with this permission can update a map configuration and perform operations on the members.

After you enter/select all fields, click **Save** button to create the user. You will see the newly created user's username on the left side, in the **Users** part of the page.

To edit or delete a user, select a username listed in the **Users**. Selected user information appears on the right side of the page. To update the user information, change the fields as desired and click the **Save** button. To delete the user from the system, click the **Delete** button.


### Checking Past Status with Time Travel

Use the Time Travel toolbar item to check the status of the cluster at a time in the past. When this item is selected on the toolbar, a small window appears on top of the page, as shown below.

![](images/timetravel.jpg)

To see the cluster status in a past time, Time Travel should be enabled first. Click on the area where it says **OFF** (on the right of Time Travel window). It will turn to **ON** after it asks whether to enable the Time Travel with a dialog: click on **Enable** in the dialog to enable Time Travel.

Once it is **ON**, the status of your cluster will be stored on your disk as long as your web server is alive.

You can go back in time using the slider and/or calendar and check your cluster's situation at the selected time. All data structures and members can be monitored as if you are using the management center normally (charts and data tables for each data structure and members). Using the arrow buttons placed at both sides of the slider, you can go back or further with steps of 5 seconds. It will show status if Time Travel has been **ON** at the selected time in past; otherwise, all the charts and tables will be shown as empty.

The historical data collected with Time Travel feature are stored in a file database on the disk. These files can be found in the folder `<User's Home Directory>/mancenter<Hazelcast version>`, e.g. `/home/mancenter3.5`. This folder can be changed using the `hazelcast.mancenter.home` property on the server where Management Center is running.

Time travel data files are created monthly. Their file name format is `[group-name]-[year][month].db` and
 `[group-name]-[year][month].lg`. Time travel data is kept in the `*.db` files. The files with the extension `lg` are temporary files created internally and you do not have to worry about them.
 
Management Center has no automatic way of removing or archiving old time travel data files. They remain in the aforementioned folder until you delete or archive them.


### Management Center Documentation

To see the documentation, click on the **Documentation** button located at the toolbar. Management Center manual will appear as a tab.


### Suggested Heap Size

**For 2 Nodes (Cluster Members)**

| Mancenter Heap Size | # of Maps | # of Queues | # of Topics |
| -------- | --------- | ---------- | ------------ |
| 256m | 3k | 1k | 1k |
| 1024m | 10k | 1k | 1k |

**For 10 Nodes**

| Mancenter Heap Size | # of Maps | # of Queues | # of Topics |
| -------- | --------- | ---------- | ------------ |
| 256m | 50 | 30 | 30 |
| 1024m | 2k | 1k | 1k | 

**For 20 Nodes**

| Mancenter Heap Size | # of Maps | # of Queues | # of Topics |
| -------- | --------- | ---------- | ------------ |
| 256m* | N/A | N/A | N/A |
| 1024m | 1k | 1k | 1k |

\* With 256m heap, management center is unable to collect statistics.
