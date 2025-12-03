# Admin Interface

Imunify360 is an all-in-one security solution with robust cloud protection against the newest attacks, and it is available directly within your control panel (cPanel, Plesk, and DirectAdmin).

When you log in to your control panel, Imunify360 asks you to enter your email address.

![](/images/admin_notify1.png)

By entering your email address you agree to receive email reports about critical issues, security alerts or system misconfigurations detected on your servers.

:::tip Note
This email address is used ONLY for receiving server reports.
:::

Or you can do it later in the <span class="notranslate">[Settings | General | Contact Details](/dashboard/#contact-details)</span>.

Log in to your control panel as an admin and go to <span class="notranslate">Plugins</span>, choose Imunify360 to get to the Imunify360 admin interface.

It allows to access:
* <span class="notranslate">[Support](/dashboard/#support)</span> – allows you to contact our support team directly from your Imunify360 Admin Interface
  
* <span class="notranslate">[Dashboard](/dashboard/#dashboard)</span> – allows you to see retrospective data in form of charts/heatmaps in your Imunify360 Admin Interface

* <span class="notranslate">[Incidents](/dashboard/#incidents)</span> – the list of all suspicious activity on the server.

* <span class="notranslate">[Firewall](/dashboard/#firewall)</span> – a dashboard of <span class="notranslate">Black List, White List</span> and <span class="notranslate">Gray List</span>, and <span class="notranslate">Blocked Ports</span> with the ability to manage them.

* <span class="notranslate">[Malware Scanner](/dashboard/#malware-scanner)</span> – real-time file scanner.

* <span class="notranslate">[Proactive Defense](/dashboard/#proactive-defense)</span> – a unique Imunify360 feature that can prevent malicious activity through PHP scripts

* <span class="notranslate">[Reputation Management](/dashboard/#reputation-management)</span> – analyzing and notifying tool intended to inform about websites blocking and blacklisting.

* <span class="notranslate">[KernelCare](/dashboard/#kernelcare-integration)</span> – KernelCare current state.

* <span class="notranslate">[Imunify360 Settings](/dashboard/#settings)</span> – configuring and controlling Imunify360 options.


## Support


This tab allows you to contact our support team directly from your Imunify360 Admin Interface. You can create a request and attach some files to it.

To contact our support team in Imunify360 Admin Interface, please click the _Call_ icon at the top right corner of the page.

![](/images/contactsupport_zoom70.png)

A support ticket will be created and an email will be sent to a specified email address. When a status of your request will change you receive a notification to your email address. You will be able to track your request via [https://cloudlinux.zendesk.com/hc/](https://cloudlinux.zendesk.com/hc/) and email.

## Dashboard

You can access the Imunify360 Dashboard from your control panel. It shows security events as charts and heat maps.
It's a great way to analyze incidents that happened within the past day, week or month.

Click <span class="notranslate">_Dashboard_</span> tab to display an overview of incidents recorded during the selected time interval, an estimate of the intensity of attacks, and correlate events across all sources.

![](/images/DashboardGeneral3.png)

Here you can see notifications about server security and Imunify360 configuration, along with recommendations for making server security effective and proactive.

### Imunify Advisor

The Imunify Advisor checks your server’s current settings, then provides a list of optimal settings for your individual server. 

![](/images/Imunify_Advisor.png)

A dialog box pops up to display recommendations.

You can accept or reject them (by unchecking a corresponding checkbox) and apply settings by clicking <span class="notranslate">_Apply_</span>.

Rejected recommendations will not appear again for a while.

:::tip Note
If you do not want to use the recommendations you can disable Imunify Advisor via the [config file](/config_file_description/).
:::

:::tip Note
If your server's settings differ from the recommended, the Imunify Advisor will pop up again to display the settings.
:::


<div class="notranslate">

### Multi-server Dashboard

</div>


<span class="notranslate">Dashboard</span> can display Imunify360 performance data for a number of specified servers. 
* You can add a specified server using its server key – a unique server id that identifies an installed Imunify360 instance.

    :::tip Note
   **Server key is NOT a license key**.
    :::
* You can easily remove a server from the Dashboard.
* You can use <span class="notranslate">_Server_</span> drop-down to show a list of all servers added into the Dashboard.
* You can choose in the multi-server drop-down for which server the Dashboard would represent its data: a current server (where the Imunify360 is installed) or a remote one (it is indicated on the Dashboard).

![](/images/dashboard_servers2.png)


#### **How to get a server key**

There are two ways to get a server key.

1. Click the key symbol ![](/images/copy_key.png) to copy server key of the selected server to the clipboard.

2. Go to the <span class="notranslate">`/var/imunify360/license.json`</span> file and find `id` field. Your server id looks like an alphanumeric string `SghjhgFESDh65CFLfvz`.
   
   
  ![](/images/id_from_license.png)

#### **How to add a server**

If you'd like to display performance data for the server **A** on the <span class="notranslate">Dashboard</span> of the server **B**, please do the following:

   * Go to the server **A** <span class="notranslate">Dashboard</span> and copy its server key (see [How to get a server key](/dashboard/#how-to-get-a-server-key))
   * Go to the server **B** <span class="notranslate">Dashboard</span> and click the <span class="notranslate">_Add Server_</span> button ![](/images/add_server.png)
   * The <span class="notranslate">_Add server key_</span> pop-up opens

  ![](/images/add_server_key.png)

   * Paste the server key belonging to the server **A** to the <span class="notranslate">_Server key_</span> field
   * Click <span class="notranslate">_Confirm_</span> to add the server **A** to the <span class="notranslate">Dashboard</span> of the server **B**. To stop adding the server and close the pop-up, click <span class="notranslate">_Cancel_</span>.
  
Go to the <span class="notranslate">_Server_</span> drop-down to check all added servers – it contains a list of hostnames of all added servers and/or a list of IPs (if a hostname is not found).

#### **How to remove a server**

To remove a server, click the <span class="notranslate">_Trash Can_</span> symbol ![](/images/remove_server.png). The <span class="notranslate">_Remove Server_</span> pop-up opens.
||
|--|
|![](/images/remove_server_popup.png)|

Click <span class="notranslate">_Confirm_</span> to remove the server. To stop removing the server and close the pop-up, click <span class="notranslate">_Cancel_</span>.

::: tip Note
You cannot remove a server from its <span class="notranslate">Imunify360 Dashboard</span>.
:::

### Charts and heat maps

The following time periods are available:

* Last 24 hours
* Last 7 days
* Last 30 days

The following representation forms are available:

* **Heatmap** visualizes the geographical distribution of incidents
* **Histogram** represents the numerical distribution of incidents

![](/images/DashboardGeo.png)

![](/images/DashboardNum.png)

Hover mouse over the particular bar to check the accurate value.

::: tip Note
Charts may have gaps. This means that no incidents or alerts were recorded during that day/time period.
:::

The following charts are available.

* **Alerts total**

Security incidents recorded within the selected time interval. Data includes all ModSecurity incidents, Imunify360 DOS plugin alerts, cPanel Login Failure Daemon (for cPanel only) and OSSEC alerts. This is a summary of all major alert sources.

* **Anti-Bot challenge events**

Recorded requests coming from detected attackers or bad bots that show the Anti-Bot challenge within the selected interval.

* **WAF alerts**

Web attacks recorded by ModSecurity within the selected time interval. It may include CMS brute-force and login attempts, websites hacking attempts, attempts to access “sensitive” files or restricted areas, and other malicious requests.

* **Web-based Brute-force Attacks**

Web-based brute-force attacks against the CMS and hosting panel, and incidents recorded by ModSecurity.

* **OSSEC: Network Level Attacks**

Attacks against network services, e.g. FTP, SSH, POP, IMAP, etc., recorded by OSSEC IDS  within the selected time interval. It includes authentication failures, requests from blocked IPs, break-in attempts alerts and more.

* **Denied Requests from Bad Bots**

Attacks detected by the Imunify360 Bot-Detector heuristics-based plugin. Bot-Detector is a part of Imunify360’s “cloud heuristics” feature that collects and analyzes a massive amount of information on new attacks on a global scale which it uses to prevent attacks across multiple servers.

* **Cleaned malicious files**

This chart lists the number of cleaned malicious files. 

:::tip Note
Some charts may be hidden if no alerts of a particular type were recorded within the selected time interval.
:::


## Incidents


Choose <span class="notranslate">_Incidents_</span> tab to view and manage the list of all the [incidents](/terminology/). The table displays a list of detected incidents with all the information about the incidents reasons.

Use filters to show the exact list of incidents:

* <span class="notranslate">_Timeframe_</span> – allows filtering incidents by different time periods.
* <span class="notranslate">_List_</span> – allows filtering incidents by <span class="notranslate">White List, Black List</span>, or <span class="notranslate">Gray List</span>, or showing the incidents from all lists.
* <span class="notranslate">_Search field_</span> – allows showing all the incidents of a proper IP address, domain or description. Tick <span class="notranslate">_Description/IP_</span> checkbox to enable input field where you can enter a proper IP or a part of it, domain or description and filter the list.
* <span class="notranslate">_Country_</span> – allows filtering the incidents by abusers country. Tick <span class="notranslate">_Country_</span> checkbox to enable input field with auto-complete where you can enter a proper country and  filter the incidents by clicking magnifier or _Enter_.

![](/images/IncidentsGeneral.png)

Move _Auto-refresh_ to enable or disable automatic refresh of the incidents in the table without reloading the web page.

The list of incidents contains the following information:

* <span class="notranslate">_Date_</span> – the time when the incident happened.
* _IP_ - the IP address of the abuser.
There is a color indication for IP address.
  * A gray bubble means that this IP address is currently in the <span class="notranslate">Gray List</span> (so, every connection from this IP address will redirect to the Anti-Bot Challenge).
  * A blue bubble means that this IP address is currently in no one list (<span class="notranslate">White/Gray/Black</span>). IP is not blocked.
  * A white bubble means that this IP address is currently in the <span class="notranslate">White List</span>. IP will never be blocked by Imunify360.
  * A black bubble means that this IP address is currently in the <span class="notranslate">Black List</span>. And access from this IP is totally blocked without ability to unblock by the Anti-Bot Challenge.
  * No bubble is shown when this incident doesn’t contain IP address.
* <span class="notranslate">_Country_ </span>– country origin of the abuser IP address.
* <span class="notranslate">_Count_</span> – the number of times the abuser tried to repeat the action.
* <span class="notranslate">_Event_</span> – description of the event or suspicious activity (as it is described by OSSEC and Mod_Security sensors).
* <span class="notranslate">_Severity_</span> – severity level of the incidents (as it is estimated in [OSSEC severity levels](https://ossec-docs.readthedocs.io/en/latest/docs/manual/rules-decoders/rule-levels.html?highlight=severity%20level) and [Mod_Security severity levels](https://github.com/SpiderLabs/ModSecurity/wiki/Reference-Manual-%28v2.x%29#severity)). The color of severity means:

  * Green – Mod_Security levels 7-5, OSSEC levels 00-03
  * Orange – Mod_Security level 4, OSSEC levels 04-10
  * Red – Mod_Security levels 3-0, OSSEC levels 11-15
* <span class="notranslate">_Actions_</span> – actions available for the Incident.

![](/images/list.jpg)

Click an incident to expand the detailed information.

![](/images/expand.jpg)


Starting from version 6.2 Imunify360 will scan zip archives by default. It will not be possible to disable this functionality through the UI, but it will be possible through the command line.

**For Ubuntu, CentOS/CloudLinux >= 7**

To disable scanning of archives, you will need to run the following command:

```
echo '' > /etc/sysconfig/aibolit-resident && systemctl daemon-reload && systemctl restart aibolit-resident.service
```

To switch the feature back on:

```
echo 'ARCHIVE_SCAN="--scan-archive"' > /etc/sysconfig/aibolit-resident && systemctl daemon-reload && systemctl restart aibolit-resident.service
```

**For CentOS/CloudLinux 6**

To disable scanning of archives, you will need to run the following command:

```
sed -i 's/--scan-archive//g' /etc/minidaemon/minidaemon-aibolit.cfg && /sbin/service minidaemon stop && /sbin/service minidaemon start
```

To switch the feature back on:

```
sed -ri "s/^(cmd=.*)$/\1--scan-archive/g" /etc/minidaemon/minidaemon-aibolit.cfg && /sbin/service minidaemon stop && /sbin/service
```

#### Actions available for the Incidents

* Disabling the rule of the incident and add it to the list of Disabled rules. Click _Ban_ icon in a proper incident row and confirm the action.

![](/images/disable_ossec_zoom85.png)

* Adding IP to the Black or White list. Click _Cog_ icon and choose the action.

![](/images/move_button_zoom94.png)

* Bulk actions on a list of IPs. The following actions are available:
  * Move to the White list/Black list
  * Delete from a list
  * Move IPs to the group

![](/images/IncidentsBulkActions.png)


## Firewall


Tne <span class="notranslate">_All Lists_</span> tab allows viewing and managing the IP addresses in the following lists (listed by priority):

* <span class="notranslate">White</span> - the IP will not be blocked
* <span class="notranslate">Drop/Black</span> - the IP will be blocked everywhere, on all ports and services
* <span class="notranslate">Greylist</span> - the IP will be blocked completely on non-web ports (SSH, FTP, etc.), and will be shown Anti-Bot Challenge on web ports (80, 443, hosting panel ports)
* <span class="notranslate">Anti-Bot Challenge</span> - the IP will be shown Anti-Bot challenge on web ports, and will not be blocked on others

The counters for the lists are presented at the top of the table, reflecting the number of records matching the category.

![](/images/Firewall.png)

All the lists are available for search by the IP address as well as by the _Country_ and _Comment_ fields.

The IP address can be in several lists at the same time, and the highest in priority list decides how the IP will be treated.

Here, you can add or edit a comment to an IP, delete IP permanently or move it to the White/Black list. For an IP with full access you can also remove it here.

The <span class="notranslate">_Ports_</span> tab allows to manage the list of blocked ports.


#### How to add IP manually

To add an IP, click <span class="notranslate">_Add_</span> on the right side of the page. The following pop-up opens.

![](/images/addip.png)

In the pop-up choose <span class="notranslate">_IP_</span> tab and fill out:

* <span class="notranslate">_Enter IP_</span> – IP or subnet in [CIDR notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing)
* <span class="notranslate">_Enter a comment_</span> – type a comment to the IP or subnet (optional)
* <span class="notranslate">_Enter TTL_</span> in days or hours – time to live – for how long the IP will be in the White List.
* Choose _White List_ or _Black List_
   * For the White List it is possible to tick <span class="notranslate">_Full Access_</span> checkbox to make this IP or subnet ignore the rules in Blocked ports. The IPs with full access have a crown icon in the IP column.
  ::: tip Note
  You can grant or remove full access afterwards in the table, just click _Cog_ icon and choose <span class="notranslate">_Grant Full Access_</span> to grant or <span class="notranslate">_Remove Full Access_</span> to remove it.
  :::

When done, click <span class="notranslate">_Add IP_</span> to confirm your action or <span class="notranslate">_Cancel_</span> to hide pop-up.

You will see a notification if an IP has been added successfully.

![](/images/added_zoom80.png)

Starting with imunify360-firewall-8.2.0, manual addition can be disabled. To disable it, set <span class="notranslate">`PERMISSIONS.allow_local_ip_management = false`</span> configuration option from a command line:

<div class="notranslate">

```
imunify360-agent config update '{"PERMISSIONS": {"allow_local_ip_management": false}}'
```
</div>

After local IP management is disabled an attempt to add IP address results in error:

![](/images/iplists-disabled-error.png)

#### How to add a country manually

To add a country to the Black List, click <span class="notranslate">_Add_</span> on the right side of the page.

In the pop-up choose <span class="notranslate">_Country_</span> tab and fill out:

* <span class="notranslate">_Enter country_</span> – autocomplete field. Just start typing.
* <span class="notranslate">_Enter comment_</span> – type a comment to IP or subnet (optional).

When done, click <span class="notranslate">_Add Country_</span> to confirm or <span class="notranslate">_Cancel_</span> to close the pop-up.

![](/images/north_korea_zoom92.png)

Be aware of the possibility that blocking countries can cause unexpected issues, for example visitors from adjacent countries may not be able to connect if at BGP level the decision to send the traffic through the blocked IP was made, when using glued DNS records, or with some mirrors.

You will see a notification if a country has been added successfully.

![](/images/sucess_country_zoom82.png)

#### How to add a comment to IP

In the proper IP row click ![](/images/plus_icon.png) in the <span class="notranslate">_Comment_</span> column, type a comment and click ![](/images/tick_icon.png).

To remove a comment, click ![](/images/pen_icon.png) and remove the text. Then click  ![](/images/tick_icon.png).

#### How to move IP from the Black List to the White List

To move IP from the <span class="notranslate">Black List</span> to the <span class="notranslate">White List</span>, choose proper IPs in the list (use checkboxes), click <span class="notranslate">_Group Actions_</span> at the top of the table and choose <span class="notranslate">_Move to White List_</span> in the drop-down. Then confirm the action.

![](/images/move_ip_black.png)

To move an exact IP, just click the _Cog_ icon in a proper IP row and choose <span class="notranslate">_Move to White List_</span> in the drop-down. Then confirm the action.

 ![](/images/move_black.png)
You will see a notification if an IP is moved to the <span class="notranslate">White List</span> successfully.

![](/images/success.jpg)

#### How to remove IP from the Black List

To remove IP from the <span class="notranslate">Black List</span>, choose proper IPs in the table (use checkboxes) and click <span class="notranslate">_Delete permanently_</span>. Then confirm the action.

![](/images/delete_permanently.png)
To remove an exact IP, just click _Bin_ icon in the proper IP row. Then confirm the action.

You will see a notification if an IP is successfully removed.

![](/images/success_01_zoom75.png)

See also: [How to use external files with the list of Black/White IPs](/features/#external-black-whitelist-management)

### Global Black/White list IP management

Administrator can manage IPs globally, this means that you can blacklist or whitelist an IP not only on one server but on a group of servers. 

Prior to manage IPs globally, you should create a group and add servers into it. This can be done via [CLN UI](https://cln.cloudlinux.com/). You can find the complete documentation on how to create and manage servers’ groups [here](https://docs.cln.cloudlinux.com/dashboard/#server-groups).

When you have created a group in CLN and added IPs into this group, go to _Imunify360 > Firewall > White list_ or _Black list_.
You will see the _Scope_ column and controls (on clicking the _Add_ button) to manage IP locally (on a current server) or globally (on a group of servers).

![](/images/global_IP_management.png)

#### How to change Scope to Group/Local

To change the scope to <span class="notranslate">_Group/Local_</span>, first [create your groups](https://docs.cln.cloudlinux.com/dashboard/#how-to-add-a-server-to-a-group) in the CLN.

![](/images/CLNGroups.png)

After that, go to <span class="notranslate">_Firewall > White/Black list_</span> and select an IP.


* In the <span class="notranslate">_Actions_</span> column click ![](/images/gear.png).
* Choose <span class="notranslate">_Change scope to Group/Local_</span>.
* In the opened popup click <span class="notranslate">_Yes, change scope to Group/Local_</span> or click <span class="notranslate">_Cancel_</span> to close the popup.

![](/images/change_scope.png)

### Ports

This feature allows to block specific ports for TCP/UDP connection. It is also possible to add specific IPs or subnet as a whitelisted so that the rule for the port will not work.

Click <span class="notranslate">_Firewall_</span> and choose <span class="notranslate">_Ports_</span>.

![](/images/Blocked_Ports1.png)

Choose the default blocking mode:

* All open, except specified
* All close, except specified

Or you can set the default blocking mode via [CLI and config file](/config_file_description/).

Exact ports and port-ranges to be allowed can be configured by the following fields in the config file:

* FIREWALL.TCP_IN_IPv4
* FIREWALL.TCP_OUT_IPv4
* FIREWALL.UDP_IN_IPv4
* FIREWALL.UDP_OUT_IPv4
* FIREWALL.TCP_IN_IPv6
* FIREWALL.TCP_OUT_IPv6
* FIREWALL.UDP_IN_IPv6
* FIREWALL.UDP_OUT_IPv6
  
Changes of config files will be applied automatically. You don’t need to restart the server or Imunify360.

:::warning Note
CSF needs to be disabled due to conflicts.
:::


::: tip Note
If CSF integration enabled, then <span class="notranslate">Blocked Ports</span> will be disabled. Imunify360 imports Closed ports and their whitelisted IPs from CSF.
:::

Use filters to show the exact list of the IPs:

* _IP_ – allows filtering the list by IP. Enter an IP or a part of it into the input field.
* <span class="notranslate">_Country_</span> – allows filtering the list by country origin. Enter a country name into the input field with autocomplete. Imunify360 will show the list of IPs of the chosen country.
* <span class="notranslate">Comments</span> – allows filtering the list by comments. Enter a comment into the input field.
* Use <span class="notranslate">_Items per page_</span> at the page bottom right to set the number of the incidents to be shown on the page.

The following actions are available for the ports:

* add port to the list of blocked ports
* edit ports in the list of blocked ports
* add a comment
* delete permanently

#### Add a port to the list of blocked ports

On the <span class="notranslate">_Lists_</span> page choose <span class="notranslate">_Blocked ports_</span> and click <span class="notranslate">_Add_</span>. In the pop-up specify the following:

* <span class="notranslate">Port</span> – the number of the port to be added to the list of blocked ports.
* TCP/UDP – tick the checkboxes of connection types for the port that should be blocked.
* <span class="notranslate">Enter comment</span> (optional) – a text to be added as a note for the port.
* <span class="notranslate">Whitelisted IPs</span> – add IPs separated by comma to the White List. They will be able to use the port.

Click <span class="notranslate">_Add Port_</span> to proceed or <span class="notranslate">_Cancel_</span> to close the pop-up.

![](/images/add_port.png)

#### Edit ports in the blocked ports list

To add an IP or a subnet to the <span class="notranslate">White List</span> for the port, click _+IP_ and in the <span class="notranslate">_Add IP/Subnet_</span> pop-up specify the following:

* Enter IP – IP or subnet that should be added to the whitelist
* Enter description – a description to be added as a note to the IP or subnet.

![](/images/add_ip_ports.png)


#### Delete permanently

To delete a port or separate IP/subnet, click _Bin_ icon in the row of the element.

![](/images/add_port_02.png)


## Malware Scanner

::: tip Note
 The functionality described here depends on <span class="notranslate">[Malware Scanner settings](/dashboard/#malware)</span>.
:::

Imunify360 <span class="notranslate">Malware Scanner</span> can scan file systems for malware injection and clean up infected files.

This is also a real time file scanner for vulnerability and it can:

* scan files uploaded via FTP (supporting [Pure-FTPd](https://www.pureftpd.org/project/pure-ftpd))

* scan files uploaded via HTTP/HTTPS

* scan files for changes via [inotify](https://en.wikipedia.org/wiki/Inotify)

* scan on-demand (any folder needed)

Malware scanning allows you to:

* observe scanner activity
* start on-demand file scanner
* manage malicious and cleaned up files
* manage Ignore List

Click <span class="notranslate">_Malware Scanner_</span> in the main menu of the Imunify360 admin interface.

![](/images/malwarescanner_general.png)

The following tabs are available:

* <span class="notranslate">[Users](/dashboard/#users)</span>
* <span class="notranslate">[Malicious](/dashboard/#malicious)</span>
* <span class="notranslate">[Scan](/dashboard/#scan)</span>
* <span class="notranslate">[History](/dashboard/#history)</span>
* <span class="notranslate">[Ignore List](/dashboard/#ignore-list)</span>

<div class="notranslate">

### Users

</div>

Go to <span class="notranslate">Imunify360 → Malware Scanner → Users</span> tab. Here, there is a table with a list of users on the server, except users with root privileges.

The badge in the <span class="notranslate">_History_</span> tab shows the number of missed events in the Malware Scanner’s History. You won’t miss any automatic actions applied to infected files, since they are listed in the <span class="notranslate">_History_</span> tab and shown in the badge.


![](/images/malwarescanner_users.png)

The table has the following columns:

* <span class="notranslate">**User name**</span> — displays the user name.
* <span class="notranslate">**Home directory**</span> — the path to the user home directory starting from the root.
* <span class="notranslate">**Infection status**</span> —  the current status depending on the last action made:
  * <span class="notranslate">**On-Demand scanning**</span> — scanning was initiated/made by an administrator;
  * <span class="notranslate">**Scanning queued**</span> — user's files are queued for scanning;
  * <span class="notranslate">**Background scanning**</span> — scheduled scanning is in progress;
  * <span class="notranslate">**Scanning scheduled**</span> — user's files scanning is scheduled;
  * <span class="notranslate">**Cleaning up**</span> — user's files are now cleaning up;
  * <span class="notranslate">**Not yet scanned**</span> — user's files have not  been scanned yet;
  * <span class="notranslate">**No malware found**</span> — no malware was found during scanning.
* <span class="notranslate">**Actions**</span>:
  * <span class="notranslate">**Scan for malware**</span> — click <span class="notranslate">_Scan_</span> ![](/images/scan_symbol.png) to start scanning files for a particular user.
  * <span class="notranslate">**View report**</span> — click <span class="notranslate">_View Report_</span> ![](/images/view_report_symbol.png) to go to the <span class="notranslate">_Malicious_</span> tab and display the results of the last scan.
  * <span class="notranslate">**Cleanup**</span> — click <span class="notranslate">_Cleanup_</span> ![](/images/cleanup_symbol.png) to start cleaning up infected files for the user.
  * <span class="notranslate">**Restore original**</span> — click <span class="notranslate">_Restore original_</span> ![](/images/restore_original_symbol.png) to restore original file after cleaning up if backup is available. To perform a bulk action, tick required users and click the corresponding button above the table.

To clean up all files of all users and scan all files, click <span class="notranslate">_Scan all_</span> or <span class="notranslate">_Cleanup all_</span> button above the table.

The following filters are available:

* <span class="notranslate">**Items per page displayed**</span> — click the number at the table bottom.

The table can be sorted by <span class="notranslate">_User name_</span> and <span class="notranslate">_Infection status_</span> (by the date of the last action).

### Malicious

Go to <span class="notranslate">Imunify360 → Malware Scanner → Malicious</span> tab. Here, there is a table with a list of infected files within all domains and user accounts.

![](/images/malwarescanner_malicious.png)

The table has the following columns:

* <span class="notranslate">**Scan date**</span> — displays the exact time when a file was detected as malicious.
* <span class="notranslate">**Type**</span> — <span class="notranslate">Malware Database Scanner</span> or <span class="notranslate">Malware Scanner</span>.
  :::tip Note
  To function properly <span class="notranslate">Malware Database Scanner</span> requires MariaDB/MySQL DB management system version 5.5. Recommended version is 5.6+. Note, that only WordPress, Joomla, and Magento databases are supported now.
  :::
* <span class="notranslate">**Username**</span> — displays file owner name.
* <span class="notranslate">**Malicious**</span> — the path where the file is located starting with root.
* <span class="notranslate">**Reason**</span> — describes the signature which was detected during the scanning process. Names in this column depend on the signature vendor. You can derive some information from the signature ID itself. `SMW-SA-05155-wshll` – in this Signature ID:
	* The first section can be either `SMW` or `CMW`. `SMW` stands for Server Malware and `CMW` stands for Client Malware
	* The second section of ID can be either `INJ` or `SA`. `INJ` stands for Injection (means Malware is Injected to some legitimate file) and `SA` stands for StandAlone (means File is Completely Malicious)
	* The third section is `05155`. This is simply an identification number for the signature.
	* The fourth section `wshll/mlw.wp/etc` explains the category and class of malware identified. Here, `wshll` stands for web shell (`mlw` stands for malware).
	* The fifth section is `0`, which provides the version number of the signature.
* <span class="notranslate">**Status**</span> — displays the file status:
  * <span class="notranslate">**Infected**</span> — threat was detected after scanning. If a file was not cleaned after cleanup, the info icon is displayed. Hover mouse over info icon to display the reason;
  * <span class="notranslate">**Cleaned**</span> —  infected file is cleaned up.
  * <span class="notranslate">**Content removed**</span> — a file content was removed after cleanup.
  * <span class="notranslate">**Cleanup in progress**</span> — infected file cleanup is in progress now.
* <span class="notranslate">**Actions**</span>:
  * <span class="notranslate">**Add to Ignore List**</span> — add file to the <span class="notranslate">Ignore List</span> and remove it from the <span class="notranslate">Malicious files</span> list. Note that if a file is added to the <span class="notranslate">Ignore List</span>, Imunify360 will no longer scan this file. Click the <span class="notranslate">_Gear_</span> symbol ![](/images/gear.png) and select <span class="notranslate">_Add to Ignore List_</span>.
  * <span class="notranslate">**View file**</span> — click <span class="notranslate">_View file_</span> symbol ![](/images/view_file_symbol.png) in the file line and the file content will be displayed in the pop-up. Only the first 100Kb of the file content will be shown in case if a file has bigger size.
  * <span class="notranslate">**Cleanup file**</span> — click <span class="notranslate">_Clean up_</span> symbol ![](/images/cleanup_symbol.png) to clean up all infected files within the account.
  * <span class="notranslate">**Restore original file (before cleanup)**</span> — click <span class="notranslate">_Restore original_</span> symbol ![](/images/restore_original_symbol.png) to restore the original content removed as infected.
  * <span class="notranslate">**Restore from backup**</span> — click the <span class="notranslate">_Gear_</span> symbol ![](/images/gear.png) and select <span class="notranslate">_Try to restore from backup_</span> to restore the original file before it got infected if it exists.

:::warning Warning
Starting from ImunifyAV(+) v.6.2, the _Quarantine_ and _Delete_ actions were removed permanently from the UI as well as the CLI in Imunify360. Previously quarantined files are also subject to deletion. After this change is implemented, the restoration of the previously quarantined files will become impossible. For more information see this [this blog post](https://blog.imunify360.com/file-quarantine-is-no-longer-effective).
:::

To perform a bulk action, tick required files and click the corresponding button above the table.

Click the desired string to display scan type.

![](/images/malwarescanner_scan_type.png)

To clean up all files of all users, click <span class="notranslate">_Clean up all_</span> button above the table.

The following filters are available:

* <span class="notranslate">**Timeframe**</span> — displays the results filtered by chosen period or date.
* <span class="notranslate">**Status**</span> — displays the results filtered by chosen status.
* <span class="notranslate">**Items per page displayed**</span> — click the number at the table bottom.

The table can be sorted by detection date (detected), user name, file path (file), reason, and status.

<div class="notranslate">

### Scan

</div>

It is possible to scan a specific directory for malware. Go to <span class="notranslate">_Malware Scanner_</span> page and choose <span class="notranslate">_Scan_</span> tab. Then proceed the following steps:

1. Enter a folder name you need to scan in the <span class="notranslate">_Folder to scan_</span> field. Start typing with the slash `/`.

    It is possible to use Advanced Settings:

   * <span class="notranslate">_Filename mask_</span>. It allows to set file type for scanning (for example, `*.php` – all the files with extension php). Default setting is `*` which means all files without restriction.
   * <span class="notranslate">_Ignore mask_</span>. It allows to set file type to ignore (for example, `*.html` – will ignore all file with extension html).
   * <span class="notranslate">_CPU consumption_</span>. Defines the CPU consumption for scanning without decreasing efficiency:
	     * from <span class="notranslate">Low</span> to <span class="notranslate">High</span>.
   * <span class="notranslate">_I/O consumption_</span>. Defines the I/O consumption for scanning without decreasing efficiency:
	     * from <span class="notranslate">Low</span> to <span class="notranslate">High</span>.
	* <span class="notranslate">_Follow symlinks_</span>. Follow all symlinks within the folder to scan. 

:::tip Note
If Imunify360 is running on CloudLinux OS, LVE is used to manage scan intensity. If it is running on other operating systems, “nice” is used to control CPU and “ionice” is used when the I/O scheduler is CFQ.
:::

![](/images/malware_scanner_4_7.png)

1. Click <span class="notranslate">_Start_</span>.

At the top right corner Malware Scanner progress and status are displayed:
* <span class="notranslate">Scanner is stopped</span> – means that there is no scanning process running.
* <span class="notranslate">Scanning…%</span> – means that the scanner is working at the moment. A percentage displays the scanning progress. You can also see the scanning status beneath the <span class="notranslate">_Mask_</span> or <span class="notranslate">_Advanced options_</span>.
  
![](/images/ondemandscannerprogressbar_zoom70.png)

After <span class="notranslate">Malware Scanner</span> stops on-demand scanning you will see the results in the table below with the following information:

* <span class="notranslate">_Date_</span> – the date when the scanning process was started.
* <span class="notranslate">_Path_</span> – the name of the folder that was scanned.
* <span class="notranslate">_Total files_</span> – the total number of files scanned.
* <span class="notranslate">_Result_</span> – the result of scanning.
* <span class="notranslate">_Actions_</span> – click icon in this column to perform particular action.

![](/images/MalwareScannerResults.png)

To review and manage malicious files go to the <span class="notranslate">_Malicious_</span> tab described below.

<div class="notranslate">

### History

</div>

<span class="notranslate">_History_</span> tab contains data of all actions for all files. Go to the <span class="notranslate">Imunify360 → History</span> tab. Here, there is a table with a list of files within all domains.

![](/images/malwarescanner_history.png)

The table has the following columns:

* <span class="notranslate">**Date**</span> — action timestamp.
* <span class="notranslate">**Path to File**</span> — path to the file starting from the root.
* <span class="notranslate">**Cause**</span> — displays the way malicious file was found:
  * <span class="notranslate">**Manual**</span> — scanning or cleaning was manually processed by a user.
  * <span class="notranslate">**On-demand**</span> — scanning or cleaning was initiated/made by a user;
  * <span class="notranslate">**Real time**</span> — scanning or cleaning was automatically processed by the system.
* <span class="notranslate">**Owner**</span> — displays a  user name of file owner.
* <span class="notranslate">**Initiator**</span> — displays the name of a user who was initiated the action. For system actions the name is <span class="notranslate">_System_</span>.
* <span class="notranslate">**Event**</span> — displays the action with the file:
  * <span class="notranslate">**Detected as malicious**</span> — after scanning the file was detected as infected.
  * <span class="notranslate">**Cleaned**</span> — the file is cleaned up.
  * <span class="notranslate">**Failed to clean up**</span> — there was a problem during cleanup. Hover mouse over the info icon to read more.
  * <span class="notranslate">**Added to Ignore List**</span> — the file was added to the <span class="notranslate">Ignore List</span>. Imunify360 will not scan it.
  * <span class="notranslate">**Restored original**</span> — file content was restored as not malicious.
  * <span class="notranslate">**Cleanup removed content**</span> — file contend was removed after cleanup.
  * <span class="notranslate">**Deleted from Ignore List**</span> — the file was removed from the <span class="notranslate">Ignore List</span>. Imunify360 will scan it.
  * <span class="notranslate">**Submitted for analysis**</span> — the file was submitted to Imunify360 team for analysis.
  * <span class="notranslate">**Failed to ignore**</span> — there was a problem during adding to the <span class="notranslate">Ignore List</span>. Hover mouse over the info icon to read more.
  * <span class="notranslate">**Failed to delete from ignore**</span> — there was a problem during removal from the <span class="notranslate">Ignore List</span>. Hover mouse over the info icon to read more.
  
The table can be sorted by <span class="notranslate">Date, Path to File, Cause</span>, and <span class="notranslate">Owner</span>.

<div class="notranslate">

### Ignore List

</div>

<span class="notranslate">Ignore List</span> tab contains the list of files, databases and directories that are excluded from <span class="notranslate">Malware Scanner</span> scanning. Go to the <span class="notranslate">Imunify360 → Malware Scanner → Ignore List</span> tab to see the table with a list of folders and files within all domains.

![](/images/malwarescanner_ignorelist.png)

The table has the following columns:

* <span class="notranslate">**Added**</span> — the date when the file was added to Ignore List.
* <span class="notranslate">**Path**</span> — path to the file starting from the root.
* <span class="notranslate">**Actions**</span>:
  * <span class="notranslate">**Remove from Ignore List**</span> — click <span class="notranslate">_Bin_</span> symbol ![](/images/bin_symbol.png) to remove the file from the Ignore List and start scanning.
  * <span class="notranslate">**Add new file, database or directory**</span> — click <span class="notranslate">_Plus_</span> symbol ![](/images/plus_symbol.png) to add a new file or directory to the <span class="notranslate">Ignore List</span>. In the opened pop-up enter the path to be added and click <span class="notranslate">_Add_</span>. 

  ::: tip Note 
  Databases can be added to the Ignore List via the regular procedure by choosing the DB type of the file: 

  ![](/images/ignoredb.png) 
  
  In order to add a database, provide a path to the application root. For example, you have a website stored in the `public_html` directory that contains the `wp-config.php` file – then the "Application path" to add will be: 
  ```
  /home/testuser/public_html
  ```
  :::
   
::: tip Note
Wildcards are not supported when adding paths to the <span class="notranslate">Ignore List</span>. For example, the following paths are not supported:
* <span class="notranslate">`/home/*/mail/`</span>
* <span class="notranslate">`/home/user/*.html`</span>
* <span class="notranslate">`/home/*`</span>
:::

To perform a bulk action, tick required files and click the corresponding button above the table.
The following filters are available:

* <span class="notranslate">**Timeframe**</span> — displays the results filtered by chosen period or date.
* <span class="notranslate">**Items per page**</span> — click the number at the table bottom.

The table can be sorted by <span class="notranslate">_Added_</span> and <span class="notranslate">_Path_</span>. By default, it is sorted from newest to oldest.

To search file or folder in the <span class="notranslate">Ignore List</span> use <span class="notranslate">_Search_</span> input field above the table.

See also: [How to edit watched and excluded patterns for Malware Scanner?](/faq_and_known_issues/#_22-how-to-edit-watched-and-excluded-patterns-for-malware-scanner)


## Proactive Defense


### Overview

 
<span class="notranslate">Proactive Defense</span> is a unique Imunify360 feature that can prevent malicious activity through PHP scripts. It is available as a PHP module for Apache and LiteSpeed web servers and analyzes script activity using known patterns like obfuscated command injection, malicious code planting, sending spam, SQL injection etc.

:::tip Note
Proactive Defense requires [Hardened PHP](/dashboard/#installation) (alt-php) to operate.
:::

### User Interface

Go to <span class="notranslate">Imunify360 → Proactive Defense</span>.

![](/images/proactivedefensemain_zoom70.png)

Here you can set a mode, view detected events and perform actions on them.

![](/images/proactivedefensegeneralui_zoom70.png)

#### Mode Settings

The following <span class="notranslate">Proactive Defense</span> modes are available:
* <span class="notranslate">Disabled</span> — means that <span class="notranslate">Proactive Defense</span> feature is not working and a system is not protected enough
* <span class="notranslate">Log Only</span> — means that possible malicious activity is only logged, no actions are performed (default mode)
* <span class="notranslate">Kill Mode</span> — the highest level of protection — the script is terminated as soon as malicious activity is detected

To select a mode, tick the desired checkbox. When an action is completed, you will see a pop-up with the successful mode changing message.
![](/images/proactivedefensemodesettings_zoom70.png)

::: tip Note
* Data is logged in all modes except <span class="notranslate">Disabled</span>.
* A user can disable <span class="notranslate">Proactive Defense</span> anytime. Any mode that is not disabled (for user’s hosting account) by admin can be activated by user.
:::

#### Detected Events

The <span class="notranslate">Detected Events</span> table displays all the necessary information about PHP scripts with malicious activity detected by Imunify360 <span class="notranslate">Proactive Defense</span>.
![](/images/proactivedefensedetectedevents_zoom70.png)

You can filter items by time frame in a <span class="notranslate">_Timeframe_</span> dropdown and search a certain entity in a search field.

The items in the <span class="notranslate">_Detected Events_</span> table are displayed per 25 on a page. To change a number of items displayed, click the number at the bottom right corner <span class="notranslate">_Items per page_</span> and select a desired number in the dropdown.

To go to the next or the previous page click >> or << button or click a desired page number.


The <span class="notranslate">_Detected Events_</span> table includes the following columns:
* <span class="notranslate">Group/individual action</span> checkbox — allows to perform actions on one or several desired entities
* <span class="notranslate">Detection Date/Time</span> — displays the date and the exact time of event detected. To view the exact time click the clock icon in the desired event line. To order the events from the last to the first or vice versa click the ▲ icon in the <span class="notranslate">Date/Time</span> of detection column header
* <span class="notranslate">Description</span> — displays a special Proactive Defense rule according to which a suspicious activity was detected
* <span class="notranslate">Script Path</span> — displays the path to the suspicious script. A number near the path describes how many times this event has repeated
* <span class="notranslate">Host</span> — displays the host of the script
* First script call from — displays the IP in which the first call of the script was detected.
  * White color means that this IP is whitelisted
  * Black color means that this IP is blacklisted
  * Gray color means that this IP is graylisted
  * All the others IPs are blue colored
* <span class="notranslate">Action</span> — displays the current mode
* <span class="notranslate">Actions</span> — allows to view details and perform actions on the event

#### Actions

The following actions are available for the detected event:
* View file content
* Move IP to the <span class="notranslate">Black List</span>
* Move file to <span class="notranslate">Ignore List</span> (ignore detected rule) — allows a user to exclude a file from <span class="notranslate">Proactive Defense</span> analysis for a particular rule
* Move file to <span class="notranslate">Ignore List</span> (ignore all rules) — allows a user to exclude a file from <span class="notranslate">Proactive Defense</span> analysis for all rules
* Remove file from <span class="notranslate">Ignore List</span> — allows a user to include ignored file to <span class="notranslate">Proactive Defense</span> analysis again.

**View file content**

This action can be performed in two ways.

**The first way**

Click the _View details_ icon in the row of the desired event. Here you can see the same information as in the table and plus all environment variables and their values. Then, click <span class="notranslate">_View file content_</span> button. The file content will be displayed in a new pop-up.

![](/images/proactivedefenseviewfilecontent_zoom70.png)

**The second way**
Click _Cog_ icon in the row of the desired event and choose <span class="notranslate">_View file content_</span>.

![](/images/proactivedefenseviewfilecontentway2_zoom70.png)

The file content will be displayed in a new pop-up.
![](/images/proactivedefensefilecontent_zoom70.png)
The group action is not available for this action.

**Move IP to the Black List**

Click _View details_ icon in the row of the desired event. Then, click <span class="notranslate">_Block IP_</span> button. To move the IP to the Black list click <span class="notranslate">_Yes, move to Black list_</span>. In the pop-up displayed click <span class="notranslate">_Yes, move to black list_</span> to complete the action or <span class="notranslate">_Cancel_</span> to return to the <span class="notranslate">_Details_</span> window. When a file is added to the <span class="notranslate">Black List</span>, you will see the confirmation pop-up.

![](/images/proactivedefenseblockip_zoom70.png)

#### Move file to Ignore List (ignore detected rule)

**The first way**
Click _Cog_ icon in the row of the desired event and choose <span class="notranslate">_Ignore detected rule for the file_</span>. Click <span class="notranslate">_Yes, add to Ignore List_</span> in the confirmation pop-up or click <span class="notranslate">_Cancel_</span> to close pop-up. Now you can see this file on the <span class="notranslate">Ignore List</span> tab.
![](/images/proactivedefenseignoredetectedruleforfile_zoom70.png)

**The second way**
Click _View details_ icon and then in the file details pop-up click <span class="notranslate">_Ignore detected rule for this file_</span>. Click <span class="notranslate">_Yes, add to Ignore List_</span> in the confirmation pop-up or click <span class="notranslate">_Cancel_</span> to close the pop-up. Now you can see this file on the <span class="notranslate">Ignore List</span> tab.

![](/images/proactivedefenseignoredetectedruleforfile1_zoom70.png)

#### Move file to Ignore List (ignore all rules)

**The first way**
Click _Cog_ icon in the row of the desired event and choose <span class="notranslate">_Ignore all rules for the file_</span>. Click <span class="notranslate">_Yes, add to Ignore List_</span> in the confirmation pop-up or click <span class="notranslate">_Cancel_</span> to close pop-up. The file will be moved to <span class="notranslate">Ignore List</span> tab.
![](/images/proactivedefenseignoreallrulesforfile_zoom70.png)

**The second way**
Click _View details_ icon and then in the file details pop-up click <span class="notranslate">_Ignore all rules for this file_</span>. Click <span class="notranslate">_Yes, add to Ignore List_</span> in the confirmation pop-up or click <span class="notranslate">_Cancel_</span> to close the pop-up. Now you can see this file on the <span class="notranslate">Ignore List</span> tab.

![](/images/proactivedefenseignoreallrulesforfile1_zoom70.png)

**Remove file from Ignore List**

On the Ignore List tab click _Bin_ icon and confirm the action.
![](/images/proactivedefenseignorelistbin_zoom70.png)

To perform bulk action, tick required checkboxes and click <span class="notranslate">_Remove from ignore list_</span> at the top of the table, then confirm the action in the pop-up.

**Ignore List tab**

Here, there is a table with files with ignored rules. If file is added to <span class="notranslate">Ignore List, Proactive Defense</span> will not analyze scripts activity from this file for all or specified rule.
![](/images/proactivedefenseignorelist_zoom70.png)

The <span class="notranslate">_Ignore List_</span> table includes the following columns:

* <span class="notranslate">Add Date/Time</span> — displays the date and the exact time of adding a file. To view the exact time click the clock icon in the desired file line. To order the files from the last to the first or vice versa click the ▲ icon in the <span class="notranslate">Add Date/Time</span> column header.
* <span class="notranslate">Script Path</span> — displays the path to the script.
* <span class="notranslate">Rules to ignore</span> — displays the pattern to be ignored.
* <span class="notranslate">Actions</span> — allows to view details and perform actions on the file.

See also: [How to edit watched and excluded patterns for Malware Scanner?](/faq_and_known_issues/#_22-how-to-edit-watched-and-excluded-patterns-for-malware-scanner).

#### How to test Proactive Defense

1. Set <span class="notranslate">Proactive Defense</span> to <span class="notranslate">_Log only_</span> mode (requests will not be blocked) or to <span class="notranslate">_Kill mode_</span> to kill all requests.
2. Add the following row in order to enable test mode rules:

<div class="notranslate">
	
```	
echo 'check_mode = -10' >> /usr/share/i360-php-opts/module.ini
```
</div>

3. Create a file with the following content:

<div class="notranslate">

``` PHP
<?php
$pattern = 'TEST-FILE';
$external_code = @file_get_contents('https://secure.eicar.org/eicar.com.txt');
if (strpos($external_code,$pattern)){
    print "Poactive Defence DOESN'T work or NOT in KILL mode";
}
else {
    print "Proactive Defence works fine - file_get_contents function has been BLOCKED, please check Imunify360 Proactive Defence tab for corresponding BLOCK event";
}
?>
```
</div>

:::tip Note
This script is available starting from Imunify360 v. 4.10.2  
This script will only check for PD if file_get_contents is not disabled and allow_url_fopen is enabled in the PHP settings on the server.
:::

4. Place this file on the server.
5. Call a test page with the script from the point 2.
6. If <span class="notranslate">Proactive Defense</span> is disabled, you will see "PD doesn't work or not in KILL mode" message after calling the script and no records will appear in "Incident" tab.
7. If <span class="notranslate">Proactive Defense</span> is enabled and <span class="notranslate">_Log only_</span> mode is set, you will see "PD doesn't work or not in KILL mode" message after calling the script and a new event with description "Blamer detection" in the <span class="notranslate">_Detected Events_</span> table with "LOG" action.
8. If <span class="notranslate">Proactive Defense</span> is enabled and <span class="notranslate">_Kill mode_</span> is set, the test page returns an error.And a new event with description "Blamer detection" in the <span class="notranslate">_Detected Events_</span> table with "KILL" action.
9. Remove the following row from the <span class="notranslate">`/usr/share/i360-php-opts/module.ini`</span> in order to disable test mode rules

<div class="notranslate">
	
```
check_mode = -10
```
</div>

::: tip Note
the number of triggered rule is 77777 and it is possible to check it via CLI
<div class="notranslate">

```
imunify360-agent proactive list
```
</div>
:::

#### opcache.jit in PHP8 and the Proactive Defense module

Starting from PHP 8, the interpreter supports `opcache.jit` option to enable just-in-time compilation of the code. 

When the <span class="notranslate">Proactive Defense</span> extension (or any other PHP extensions that use the hooks to intercept function calls) is enabled, opcache engine disables `opcache.jit` automatically and reports it into the error log. It does not affect the stability and performance of websites running PHP 8 when both `opcache.jit` and the <span class="notranslate">Proactive Defense</span> module are enabled, but the JIT will be off.

To keep `opcache.jit` forcibly enabled and keep the <span class="notranslate">Proactive Defense</span> module enabled, one needs to add the following config option:

```
jit_compatible_mode=on
```

in the `/usr/share/i360-php-opts/module.ini` file.


## Reputation Management

Choose <span class="notranslate">_Reputation Management_</span> in the main menu of the Imunify360 admin interface to get to the <span class="notranslate">Reputation Management</span> page.

<span class="notranslate">Reputation Management</span> allows to check if a domain registered on your server is safe or not based on the following reputation engines:

* [Yandex Safe Browsing](https://tech.yandex.com/safebrowsing/)
* [PhishTank](https://www.phishtank.com/)
* [OpenPhish](https://openphish.com/)
* [Mitchellkrogz](https://github.com/mitchellkrogza/Phishing.Database/)

How does it work:

* We get a list of domains periodically (via crontab)
* Send it to the central Imunify360 server
* Get results from it
* Add bad domains to the list of <span class="notranslate">Reputation Management</span>

If a domain or an IP is blocked, then this information will be available in the table below. If a user’s website appears in this table, then it would be useful to send [this link](https://developers.google.com/webmasters/hacked/) to the user. This instruction can help to solve problems with the domain.

At the top of the page (also in the main menu near <span class="notranslate">Reputation Management</span> item), Imunify360 shows the number of affected domains. This number is a quantity of affected domains that exist on the server.

The table shows:

* <span class="notranslate">_ID_</span> – domain owner username
* _URL_ – the affected domain link
* <span class="notranslate">_Type_</span> – read more about types [on the link](https://developers.google.com/safe-browsing/v4/reference/rest/v4/ThreatType) (we still do not support <span class="notranslate">THREAT_TYPE_UNSPECIFIED</span> and <span class="notranslate">POTENTIALLY_HARMFUL_APPLICATION</span>).
* <span class="notranslate">_Detection time_</span> – exact time when the <span class="notranslate">Reputation Management</span> has detected the domain

![](/images/reputation_zoom73.png) 

Click link icon in the <span class="notranslate">_Action_</span> column to copy the URL to the clipboard.

::: tip Note
<span class="notranslate">Reputation Management</span> online and browser look may differ. This is because Google Safe Browsing has an issue described on github.
:::


## KernelCare Integration


Imunify360 has [KernelCare](https://www.kernelcare.com) KernelCare integration. To install KernelCare go to the [Settings](/dashboard/#settings) tab and click <span class="notranslate">_Install KernelCare_</span>.

![](/images/kc_int.jpg)

To observe current KernelCare status in the Imunify360 main menu choose _KernelCare_ tab.

Here you can check:

* <span class="notranslate">Effective Kernel Version</span> – version of the kernel that KernelCare enable on the server
* <span class="notranslate">Real Kernel Version</span> – real version of the kernel
* <span class="notranslate">Update mode</span> – auto updated mode On or Off
* <span class="notranslate">Uptime</span> – uptime of the kernel in days

To disable auto update mode toggle the <span class="notranslate">`Update mode`</span> switch to <span class="notranslate">`No`</span>.


![](/images/kcint.jpg)

::: tip Note
If you have KernelCare license(s) on the same server(s), then cancel this license in CLN because KernelCare will be free for that server. If you do not know how to cancel licenses then follow [this link](https://www.cloudlinux.com/getting-started-with-cloudlinux-os/43-getting-more-information/938-billing-faq#8) for details.
:::

::: tip Note
KernelCare tab can load slowly on highly loaded systems.
:::

Read more about KernelCare [on the link](https://www.kernelcare.com).

## Settings


Choose <span class="notranslate">_Settings_</span> in the main menu to get to the Imunify360 settings page.
The following tabs are available:

* <span class="notranslate">[General](/dashboard/#general)</span>
* <span class="notranslate">[Malware](/dashboard/#malware)</span>
* <span class="notranslate">[Backups](/dashboard/#backups)</span>
* <span class="notranslate">[Disables Rules](/dashboard/#disabled-rules)</span>
* <span class="notranslate">[Attributions](/dashboard/#attributions)</span>
* <span class="notranslate">[Notifications](/features/#notifications)</span>

### General

Go to <span class="notranslate">_Imunify360 → Settings → General_</span>. The following sections are available:

* <span class="notranslate">[Installation](/dashboard/#installation)</span>
* <span class="notranslate">[WAF Settings](/dashboard/#waf-settings)</span>
* <span class="notranslate">[DoS Protection](/dashboard/#dos-protection)</span>
* <span class="notranslate">[SMTP Traffic Manager](/dashboard/#smtp-traffic-manager)</span>
* <span class="notranslate">[3-rd Party Integration](/dashboard/#_3-rd-party-integration)</span>
* <span class="notranslate">[Auto White List](/dashboard/#auto-white-list)</span>
* <span class="notranslate">[Incidents Logging](/dashboard/#incidents-logging)</span>
* <span class="notranslate">[WebShield](/dashboard/#webshield)</span>
* <span class="notranslate">[Anti-bot protection](/dashboard/#anti-bot-protection)</span>
* <span class="notranslate">[OSSEC](/dashboard/#ossec)</span>
* <span class="notranslate">[PAM](/dashboard/#pam)</span>
* <span class="notranslate">[Error Reporting](/dashboard/#error-reporting)</span>
* <span class="notranslate">[WordPress plugin](/dashboard/#wordpress-plugin)</span>
* <span class="notranslate">[Contact Details](/dashboard/#contact-details)</span>

#### Installation

Here you can install and uninstall the following components:
* HardenedPHP
* KernelCare

If you want to install it using CLI, please follow [this article](/command_line_interface/#features).
![](/images/settingsgeneralinstallation.png)


#### HardenedPHP

To install or uninstall HardenedPHP click on a button related. Please find additional information about HardenedPHP in [this article](https://docs.cloudlinux.com/cloudlinuxos/cloudlinux_os_components/#php-selector).
During HardenedPHP installation process the installation log will appear and will update automatically.

::: tip Note
HardenedPHP is free on the servers with Imunify360 installed.
:::

![](/images/kc_install_log_zoom91.png)


#### KernelCare

To install or uninstall KernelCare click on a button related. Please find additional information about KernelCare [here](https://www.kernelcare.com).

::: tip Note
KernelCare is free on the servers with Imunify360 installed.
:::

#### Privilege escalation detection & protection <Badge text="Deprecated" type="error" vertical="top"/>

:::warning Warning!
This feature is deprecated.
:::

The KernelCare extension for Imunify360 allows tracing malicious invocations to detect privilege escalation attempts.

You can find these attempts on the [Incidents tab](/dashboard/#incidents) (as part of the OSSEC log). The incidents can be seen by filtering events with the `EDF` label. 

To enable the feature, tick the <span class="notranslate">_Privilege escalation detection & protection_</span> checkbox.

![](/images/pep_kernelcare.png)

:::warning Note
The _Privilege escalation detection & protection_ feature is implemented for CentOS 7 only.
:::

Or you can enable it via CLI using the following command:

<div class="notranslate">

```
imunify360-agent config update '{"KERNELCARE": {"edf": true}}'
```
</div>


Click <span class="notranslate">_Save changes_</span> button on the bottom of the section to save changes.

#### WAF Settings

When the <span class="notranslate">_Minimized ModSec Ruleset_</span> option is on, it disables Imunify WAF rules with a high memory footprint, yet leaves critical ruleset enabled. It is recommended for the servers with a small amount of RAM. It is enabled by default for the installations with low RAM.

You can switch back to the normal mode by enabling WebShield or unchecking <span class="notranslate">_Minimized ModSec Ruleset_</span> in Settings | General | WAF Settings


![](/images/waf_wordpress_acp.png)


Click <span class="notranslate">_Save changes_</span> button on the bottom of the section to save changes.

#### WordPress Account Brute-force Protection

We have two protection features against brute-force - one, Weak Password Login Prevention - prevents any logins with a weak password (e.g. "1234"), and the other Compromised Account Login Detection redirects known compromised accounts to reset their passwords.

Server admin can enable an option to prevent access to WordPress accounts with well-known (trivial) passwords.
When the option is enabled, all end-users that are trying to log into the admin account with weak/trivial or well-known passwords from the dictionary used by brute-forcers will be taken to the special alert page with an appeal to change their current password.

This feature can be enabled by setting <span class="notranslate">`cms_account_compromise_prevention` to `true`</span> in MOD_SEC [config file section](/config_file_description/#config-file-description)

:::tip Note
This feature is implemented via modsec rule and could be [disabled on a per-domain basis](/command_line_interface/#rules) (the rule id is 33355)
:::

![](/images/WAF_Weak_Password_Login_Prevention.png)

The alert page supports localization and is displayed in the language of the browser (on an external Imunify domain).

The WordPress Compromised Account Detection works independently of the Weak Passwords Prevention feature utilizing Cloud Based heuristic analysis. 

Our heuristics analyze suspicions actions of the accounts such as malware drops, malicious plugins installation, other account actions and deliver a verdict to the specific host that are considered compromised. When account tries to login on the host, it will be redirected to the reminder to change the password. This feature does not have a switch in our settings and will produce alerts until the breach is fixed.

It employs the RBL system, and there is currently no settings switch to enable/disable it.

![](/images/WAF_Compromised_Account_Login_Prevention.png) 

#### CMS-specific WAF Rules

WAF Rules Auto-Configurator generates a set of rules on a per-domain basis, considering the Content Management System (CMS), that the website is running (WordPress, Joomla, Drupal etc).

It allows making WAF rules more effective to protect websites and reduce the number os false positives.

It works in the background and scans domains for installed CMS daily, after that rebuilds ModSec configuration based on detected software.

![](/images/cms-specific_waf_rules.png)

:::tip Note
This feature is only available for the Apache 2.4 web server
:::

#### DoS Protection

<span class="notranslate">DoS Protection</span> section allows to enable or disable DoS protection. DoS protection works by counting connections from each remote IP address per local port separately.
To enable/disable it, tick the <span class="notranslate">_Enable Dos Protection_</span> checkbox. Or you can enable it using the following CLI command:

<div class="notranslate">

```
imunify360-agent config update '{"DOS": {"enabled": true}}'
```
</div>

It is possible to configure how Imunify360 will behave:

* <span class="notranslate">_Max Connections_</span>– allows to setup the number of simultaneous connections allowed before IP will be blocked. Cannot be set lower than 100.
* <span class="notranslate">_Check delay_</span> – allows to setup period in seconds between each DoS detection system activation that will check a server for DoS attack. Also, it is possible to set different limits for different local ports by editing the [configuration file](/config_file_description/) directly.

**The minimum values**: 

* Max Connections = 100
* Check delay = 30

:::tip Note
_Check delay_ is limited by the minimum value of 30, lower values can cause "false positives" triggering.
:::

:::tip Note
Although DoS protection works on the TCP level, it is not the same as http request rate - even if there is large number of http connections, the number of TCP connections can be relatively low.
:::

:::tip Note
Imunify360 DoS protection is automatically disabled if CSF is active - a warning is shown in Imunify360 UI in that case
:::
	
![](/images/DosProtection.png)

Click <span class="notranslate">_Save changes_</span> button on the bottom of the section to save changes.

#### Enhanced DOS Protection

The Enhanced DOS Protection feature forms an additional layer of protection, increasing the stability of servers facing DOS attacks. It takes a different approach than our existing [DOS Protection feature](/dashboard/#dos-protection), which focuses on monitoring the number of simultaneous connections. Enhanced DOS Protection, on the other hand, monitors the rate of requests originating from attacker IP addresses per unit of time.

The new feature works better against attacks based on short-living connections and against attacks where the number of requests grows fast (hundreds of requests per second). As Enhanced DOS Protection monitors the number of requests in real-time, it reacts to the threats almost instantly, greylisting the detected IPs and redirecting their requests to the Anti-Bot challenge. However, it can also be configured to blacklist the IP immediately, completely dropping all further packets.

Standard DoS protection, in turn, will block attacks that use long-lived connections (e.g. Slowloris attacks), so these functions complement each other perfectly.

You can find all incidents related to the new feature in the incidents table by the description: 

```
“Denial of Service (DoS) attack was discovered from %IP%: %threshold% connections per %timeframe% seconds to %port% port”.
```

<h4>Activating and fine-tuning Enhanced DOS Protection</h4>

The feature is switched off by default. You can activate Enhanced DOS Protection in Imunify360 using the following CLI command:

```
imunify360-agent config update '{"ENHANCED_DOS":{"enabled":true}}'
```

<h4>Configure the Protective Action</h4>

You can define the action taken against an attacking IP. The default action is graylist.
```
imunify360-agent config update '{"ENHANCED_DOS":{"action":"blacklist"}}'
```
* `"graylist"` (Default): The attacker's IP is added to the Graylist. Their requests are redirected to a splashscreen challenge, and they can regain access by solving it.
* `"blacklist"`: The attacker's IP is added to the Blacklist, completely blocking them from accessing the server. They will not be presented with a challenge.

<h4>Adjust Thresholds and Timeframe</h4>

The default timeframe (seconds) and threshold of request (number) could be changed by the following CLI commands:

```
imunify360-agent config update '{"ENHANCED_DOS":{"timeframe":60}}'
```
```
imunify360-agent config update '{"ENHANCED_DOS":{"default_limit":500}}'
```

Request limits for different ports could be set separately, using the following CLI commands:

```
imunify360-agent config update '{"ENHANCED_DOS": {"port_limits": {"80": 150}}}'
```

We also recommend checking and configuring the CAPTCHA_DOS section of [parameters](/config_file_description) to blacklist IPs after repetitive requests to the captcha.

#### SMTP Traffic Manager

SMTP traffic management provides more control over SMTP traffic.

An administrator can redirect mail traffic to the local MTA, block it completely, or keep it available for local mails only. Administrators can also block particular ports and whitelist specific users or groups for outgoing mail.

This feature extends the existing cPanel <span class="notranslate">“Block SMTP”</span> functionality, albeit with more control and capabilities, and replaces the similar functionality from CSF. 

You can enable the <span class="notranslate">SMTP Traffic Management</span> in the <span class="notranslate">Settings</span>:

![](/images/SMTPSettings.png)

* <span class="notranslate">**SMTP ports**</span> - a list of the ports to be blocked. The defaults are: 25, 587,465
* <span class="notranslate">**Allow users**</span> a list of the users to be ignored (not blocked). By default it is empty. Including Unix and CPanel users (if a process that sends an email has a UID of one of the <span class="notranslate">`allow_users`</span>, it will not be blocked)
* <span class="notranslate">**Allow groups**</span> - a list of the groups to be ignored (not blocked). By default it is empty. Including Unix and CPanel users (if a process that sends an email has a UID of one of the <span class="notranslate">`allow_users`</span>, it will not be blocked)
* <span class="notranslate">**Allow local**</span> - block all except the local SMTP (localhost). By default it is disabled.
* <span class="notranslate">**Redirect to local**</span> - enable automatic redirection to the local ports for outgoing mail traffic. By default it is disabled.

::: warning 
Note that the term "group" here means the primary group of UNIX users. 

For example, we have a user "john" whose primary group is "john" and the supplementary group is "admin":
* If you add a rule for the group "john", it'd match (the user would be allowed to send emails).
* If a rule is added for the group "admin", it wouldn't match (the user would be denied sending emails) because "admin" isn't a primary group of user "john". 
:::

::: tip Note
The following is added by default into the _Allow users_ and the _Allow groups_ for cPanel:
* UIDs - 0 (root), 202 (cpanel)
* GIDs - 12 (mail) 
:::

To enable these settings via direct config file update or a command-line interface, use this command: 

<div class="notranslate">

```
imunify360-agent config update '{"SMTP_BLOCKING": {"allow_local": true, "enable": true}}'
```
</div>

The config file should show:

<div class="notranslate">

```
SMTP_BLOCKING:
 allow_groups:
 - mailacc
 allow_local: true
 allow_users: []
 enable: true
 ports:
 - 25
 - 587
 - 465
 redirect: true
```
</div>

#### What if the Conflict with WHM >> SMTP Restrictions message is shown?

![](/images/SMTPFAQ.png)

<span class="notranslate">_WHM SMTP Restrictions_</span> requires to be disabled at the cPanel to get <span class="notranslate">_SMTP Traffic Management_</span> working.

To disable it, log in to the cPanel WHM portal, select <span class="notranslate">_SMTP Restrictions_</span> on the left sidebar and disable it.

#### 3-rd Party Integration

Tick the <span class="notranslate">_Manage CSF Events and Lists_</span> checkbox to enable/disable the integration between CSF and Imunify360.
	
![](/images/3rd_party_protection.png)

This settings is explained in more detail [here](/ids_integration/#_3-rd-party-integration-mode)

#### Auto White List
 
<span class="notranslate">Auto White List</span> section allows to automatically add admin IP to the <span class="notranslate">White List</span> each time when he logs in to hosting panel and enters Imunify360 admin interface.
In <span class="notranslate">_Timeout_</span> field enter the number of minutes – the IP will be removed from the white list automatically after this time.

::: tip Note
0 means adding IP to the <span class="notranslate">White List</span> permanently.
:::

![](/images/auto-whitelist.png)

Click <span class="notranslate">_Save changes_</span> button on the bottom of the section to save changes.

#### Incidents Logging
 
In this section it is possible to control what kind of incidents will be shown on the [Incidents page](/dashboard/#incidents).
Move the slider to change your preferences.

There are 15 available levels related to [OSSEC](https://www.ossec.net/docs/manual/rules-decoders/rule-levels.html) and [ModSecurity](https://github.com/SpiderLabs/ModSecurity/wiki/Reference-Manual#severity) severity levels:

**OSSEC**

| Severity (Level) range  | Agent's action  | Notes  |
|---|---|---|
| 0  | Ignored by agent  | No action taken  |
| 1  | Ignored by agent  | None  |
| 2  | Ignored by agent  | System low priority notifications or status messages. No security relevance.  |
| 3  | Just shows in reports  | Successful/Authorized events (successful login attempts, firewall allow events, etc.)  |
| 4  | Just shows in reports  | System low priority error (related to bad configurations or unused devices/applications). No security relevance, usually caused by default installations or software testing. Default to be seen in Imunify360 UI on the fresh installation. |
| 5  | Just shows in reports  | User generated error (missed passwords, denied actions, etc., no security relevance). Used in [Active Response](/dashboard/#ossec) rules that are blocking specific ports.  |
| 6  | Blocking with greylists  | Low relevance attack. They indicate a worm or a virus that have no affect to the system (like code red for Apache servers, etc). They also include frequent IDS events and errors.  |
| 7  | Blocking with greylists  | “Bad word” matching. |
| 8  | Blocking with greylists  | Include first time seen events. First time an IDS event is fired or the first time an user logged in. If you just started using OSSEC HIDS, these messages will probably be frequent.  |
| 9  | Blocking with greylists  | Error from invalid source. Include attempts to login as an unknown user or from an invalid source. May have security relevance (specially, if repeated). |
| 10  | Blocking with greylists  | Multiple user generated error. They include multiple bad passwords, multiple failed logins, etc. They may indicate an attack or may just be that a user just forgot their credencials.  |
| 11  | Blocking with greylists  | Integrity checking warning. Includes messages regarding the modification of binaries or the presence of rootkits (by rootcheck).  |
| 12  | Blocking with greylists  | High importancy event. They include error or warning messages from the system, kernel, etc. They may indicate an attack against a specific application.  |
| 13  | Blocking with greylists  | Unusual error (high importance). Most of the times, it matches a common attack pattern.  |
| 14  | Blocking with greylists  | High importance security event. Most of the times, done with correlation and it indicates an attack.  |
| 15  | Blocking with greylists  | Severe attack. No chances of false positives. Immediate attention is necessary.  |

**ModSecurity** 

| Severity (Level) range  | Incident type  | Notes  |
|---|---|---|
| 7  | <span class="notranslate">DEBUG</span>  | Used for monitoring  |
| 6  | <span class="notranslate">INFO</span>  | Used for monitoring  |
| 5  | <span class="notranslate">NOTICE</span>  | Used for monitoring  |
| 4  | <span class="notranslate">WARNING</span>  | Generated by malicious client rules. Used for monitoring.  |
| 3  | <span class="notranslate">ERROR</span>  | Mostly generated from outbound leakage rules. Used for greylisting.  |
| 2  | <span class="notranslate">CRITICAL</span>  | Generated by the web attack rules. Used for greylisting.  |
| 1  | <span class="notranslate">ALERT</span>  | Generated from correlation where there is an inbound attack and an outbound application level error.  |
| 0  | <span class="notranslate">EMERGENCY</span>  | Generated from correlation of anomaly scoring data where there is an inbound attack and an outbound leakage.  |

Autocleanup configuration allows to keep the <span class="notranslate">Incidents</span> page clean by default. The possible settings are as follows:

* <span class="notranslate">_Keep incidents for the last days_</span> – set the number of days Imunify360 will keep the incidents
* <span class="notranslate">_Keep maximum incidents count_</span> – set maximum quantity of the incidents to keep on the server
* <span class="notranslate">_Auto-refresh time for Incidents page_</span> – set <span class="notranslate">Incidents</span> page auto-refresh time in seconds

![](/images/incidents-logging.png)
	
Click <span class="notranslate">_Save changes_</span> button on the bottom of the section to save changes.
	
#### WebShield

![](/images/webshield.png)

* <span class="notranslate">_Enable WebShield_</span>. When the option is off, disable WebShield, GreyList, and Anti-bot Challenge. A disabled state is recommended for servers with a small amount of RAM. A disabled option along with enabled "Minimized WAF Ruleset" will switch Imunify360 to the "Low Resource Usage" mode.  
* <span class="notranslate">_Detect IPs behind CDN_</span> feature allows to recognize and block IPs with suspicious activity behind supported CDN providers.
  
  To enable/disable it, tick the <span class="notranslate">_Detect IPs behind CDN_</span> checkbox.

  Or you can enable it using the following CLI command:

  <div class="notranslate">

  ```
  imunify360-agent config update '{"WEBSHIELD": {"known_proxies_support": true}}'
  ```
  </div>

  Supported CDN providers:

  * Cloudflare
  * MaxCDN
  * StackPath CDN
  * KeyCDN
  * Dartspeed.com
  * QUIC.cloud CDN

Click <span class="notranslate">_Save changes_</span> button on the bottom of the section to save changes.

#### Anti-bot protection

Tick the <span class="notranslate">_Anti-bot protection_</span> checkbox to enable the JavaScript challenge – "Splash Screen."

You can read more about Anti-bot protection [here](/features/#anti-bot-protection).
	
![](/images/AntiBotProtection.png)

Click <span class="notranslate">_Save changes_</span> button on the bottom of the section to save changes.

#### cPanel account protection

Tick the checkbox next to the <span class="notranslate">_cPanel account protection_</span> option to enable the JavaScript challenge for users trying to access the cPanel interface.

More about the feature [here](/features/#cpanel-account-protection).

![](/images/cPanelAccountProtectionFeatureWebshield.png)


#### OSSEC

Tick the <span class="notranslate">_Active response_</span> checkbox to block access to a specific server port being attacked. 
The purpose of the feature is to significantly reduce the false-positive rate while increasing its capabilities to detect and block aggressive brute-force requests.
	
![](/images/ossec_tick.png)

Click <span class="notranslate">_Save changes_</span> button on the bottom of the section to save changes.

:::tip Note
For now, the feature covers the following ports:
* FTP - 21 port, 
* SSH - 22 port, and any other one manually defined starting from version 5.7 
* SMTP - 25, 465, 587 ports
:::

#### PAM

#### PAM brute-force attack protection

Tick the <span class="notranslate">_PAM brute-force attack protection_</span> checkbox to enable an advanced brute-force protection technique based on the combination of PAM module authorization, RBL check, and IP blacklisting. 
	
![](/images/pam_module.png)

You can also enable it via CLI with the following command:

<div class="notranslate">

```
imunify360-agent config update '{"PAM": {"enable": true}}'
```
</div>

Click <span class="notranslate">_Save changes_</span> button at the bottom of the section to apply changes. This will enable protection for SSH/FTP protocols.

#### Exim+Dovecot brute-force attack protection

:::tip Note
This protection type is available only in cPanel/WHM.
:::

Tick the <span class="notranslate">_Exim+Dovecot brute-force attack protection_</span> checkbox to enable advanced protection against Dovecot brute-force attacks. PAM module protects against IMAP/POP3 brute-force attacks and prevents mail accounts from being compromised via brute-forcing.

![](/images/dovecot.png)

You can also enable it via CLI with the following command: 

<div class="notranslate">

```
imunify360-agent config update '{"PAM": {"exim_dovecot_protection": true}}'
```
</div>

Click <span class="notranslate">_Save changes_</span> button at the bottom of the section to apply changes.


#### FTP brute-force attack protection 

:::tip Note
This protection type is available only in cPanel/WHM for the proftpd and pureftpd daemons.
:::

Tick the <span class="notranslate">_FTP brute-force attack protection_</span> checkbox to enable protection for the ftpd server against FTP brute-force attacks. It uses a time-proven algorithm that we’ve been using in the SSH PAM extension.
	
![](/images/ftpBruteForceAttackProtection.png)

You can also enable it via CLI with the following command:

<div class="notranslate">

```
imunify360-agent config update '{"PAM": {"ftp_protection": true}}'
```
</div>

Click <span class="notranslate">_Save changes_</span> button on the bottom of the section to save changes. This will enable protection for SSH/FTP protocols.

#### WordPress plugin

:::warning
The WordPress plugin installation is currently allowed only if _Settings > Malware > General > Default action on detect_ is set to _Cleanup_. Other installation options will be introduced in the future release.
:::

Tick the <span class="notranslate">_Install WordPress plugin_</span> checkbox to install the Imunify Security WP plugin on all WordPress sites.

![](/images/wordpress-plugin/panel-settings.png)

You can also enable it via CLI with the following command:

<div class="notranslate">

```
imunify360-agent config update '{"WORDPRESS":{"security_plugin_enabled": true}}'
```
</div>

#### Error Reporting
 
Tick <span class="notranslate">_Enable Sentry error reporting_</span> checkbox to send reports to the Imunify360 error reports server.

![](/images/error-reporting.png)

Click <span class="notranslate">_Save changes_</span> button on the bottom of the section to save changes.

#### Contact Details
 
Type your email into the <span class="notranslate">_Email_</span> field to receive email reports about critical issues, security alerts or system misconfigurations detected on your servers.

::: tip Note
This email address is used ONLY for receiving server reports.
:::

![](/images/contact_details.png)

Click <span class="notranslate">_Save changes_</span> button at the bottom of the section to save changes.

### Malware

Go to the _Imunify360 → Settings → Malware_. The following sections are available:

Here you can configure the following:
* [<span class="notranslate">Resource consumption</span>](/dashboard/#resource-consumption)
* [<span class="notranslate">General</span>](/dashboard/#general-1)
* [<span class="notranslate">Background Scanning</span>](/dashboard/#background-scanning)
* [<span class="notranslate">Cleanup</span>](/dashboard/#cleanup)
* [<span class="notranslate">Proactive Defense</span>](/dashboard/#proactive-defense-2)
* [<span class="notranslate">Malware Database Scanner</span>](/dashboard/#malware-database-scanner)


::: tip Note
Read [CXS integration](/ids_integration/#cxs-integration) documentation carefully to make Malware Scanner work properly if you decided to use the former instead of Imunify360 anti-malware protection.
:::


#### Resource consumption

![](/images/SettingsMalwareResourceConsumption.png)

* <span class="notranslate">_CPU consumption_</span> – allows setting a level of CPU usage by Malware Scanner.
    ::: tip Note
    Low CPU usage means low scanning speed
    :::
* <span class="notranslate">_I/O consumption_</span> – allows setting a level of I/O usage by Malware Scanner.
    :::tip Note
    Low I/O usage means low scanning speed
    :::

    :::tip Note
    If Imunify360 is running on CloudLinux OS, LVE is used to manage scan intensity. If it is running on other operating systems, “nice” is used to control the CPU and “ionice” is used when the I/O scheduler is CFQ.
    :::

#### General

![](/images/SettingsMalware2.png)

* <span class="notranslate">_Automatically scan all modified files_</span> – enables real-time scanning for modified files using [inotify](https://en.wikipedia.org/wiki/Inotify) library. The Scanner searches for modified files in user’s DocumentRoot directories.
  ::: tip Note
  It requires inotify to be installed and may put an additional load on a system.
  :::
* <span class="notranslate">_Optimize real-time scan_</span> – enables the [File Change API](https://docs.cloudlinux.com/cloudlinux_os_kernel/#file-change-api) and **fanotify** support to reduce the system load while watching for file changes in comparison with inotify watchs.
    :::tip Note
    File change API can work only with ext4 file system.
    :::

  |                          |             |              |                     |
  |--------------------------|:-----------:|:------------:|:-------------------:|
  |                          | **inotify** | **fanotify** | **File change API** |
  | CentOS 6                 |      ✓      |      x       |          x          |
  | CentOS 7                 |      ✓      |      ✓       |          x          |
  | CentOS 8 / AlmaLinux 8   |      ✓      |      ✓       |          x          |
* | AlmaLinux 9              |      ✓      |      ✓       |          x          |
  | AlmaLinux 10             |      ✓      |      ✓       |          x          |
  | CloudLinux OS 6          |      ✓      |      x       |          x          |
  | CloudLinux OS 7          |      ✓      |      ✓       |          ✓          |
  | CloudLinux OS 7 hybryd   |      ✓      |      ✓       |      ✓ (6.8+)       |
  | CloudLinux OS 8          |      ✓      |      ✓       |          ✓          |
  | CloudLinux OS Solo       |      ✓      |      ✓       |          x          |
  | Ubuntu 16.04 / Debian 9  |      ✓      |      ✓       |          x          |
  | Ubuntu 18.04 / Debian 10 |      ✓      |      ✓       |          x          |
  | Ubuntu 20.04             |      ✓      |      ✓       |          x          |
  | Ubuntu 22.04             |      ✓      |      ✓       |          x          |
  | Debian 11                |      ✓      |      ✓       |          x          |
  | Debian 12                |      ✓      |      ✓       |          x          |
  | Debian 13                |      ✓      |      ✓       |          x          |
  | Rocky Linux 8            |      ✓      |      ✓       |          x          |

* <span class="notranslate">_Automatically scan any file uploaded using web_</span> – enables real-time scanning of all the files that were uploaded via http/https.
  ::: tip Note
  It requires [ModSecurity](https://modsecurity.org/) to be installed.
  :::
* <span class="notranslate">_Automatically scan any file uploaded using ftp_</span> – enables real-time scanning of all the files that were uploaded via ftp.
  ::: tip Note
  It requires [Pure-FTPd](https://www.pureftpd.org/project/pure-ftpd) to be used as FTP service.
  :::
* <span class="notranslate">_Automatically send suspicious and malicious files for analysis_</span> – malicious and suspicious files will be sent to the Imunify360 Team for analysis automatically.
* <span class="notranslate">_Try to restore from backup first_</span> – allows to restore file as soon as it was detected as malicious from backup if a clean copy exists. If a clean copy does not exist or it is outdated, default action will be applied. See also <span class="notranslate">[CloudLinux Backup](/dashboard/#backups)</span>.
* <span class="notranslate">_Block malicious file uploads via cPanel File Manager_</span><sup>_Experimental_</sup> – enable blocking malicious file uploads via cPanel File Manager. Also, the file operations via cPanel File Manager that turn out to be malicious are blocked. The type of operations processed are: edits and saves.
* <span class="notranslate">_Use backups not older than (days)_</span> – allows to set the a maximum age of a clean file.
* <span class="notranslate">_Default action on detect_</span> – configure Malware Scanner actions when detecting malicious activity:
  * <span class="notranslate">Just display in dashboard</span>
  * <span class="notranslate">Cleanup</span> (default)

  :::warning Warning
  Starting from ImunifyAV(+) v.6.2, the _Quarantine_ and _Delete_ actions were removed permanently from the UI as well as the CLI in ImunifyAV(+). Previously quarantined files are also subject to deletion. After this change is implemented, the restoration of the previously quarantined files will become impossible. For more information see this [this blog post](https://blog.imunify360.com/file-quarantine-is-no-longer-effective).
  :::


:::tip Note
Those options may be hidden for end-user if Cleanup is disabled in Features Management.
:::

* <span class="notranslate">_Enable RapidScan_</span> – dramatically speeds up repeated scans based on smart re-scan approach, local result caching and cloud-assisted scan. When you first enable the RapidScan feature, the first scan will run as before. But subsequent scans will see a dramatic speed improvement, anywhere between 5 to 20 times faster. You can find details [here](/features/#rapidscan).
* <span class="notranslate">_Binary (ELF) malware detection_</span> – this option allows to search for any binaries (ELF files) in the user home directories and consider them malicious.
* <span class="notranslate">_Enable Hyperscan_</span> – this option allows to use the regex matching Hyperscan library in Malware Scanner to greatly improve the scanning speed. Hyperscan requires its own signatures set that will be downloaded from the files.imunify360.com and compiled locally. 
There are few platform requirements to use this feature:
  * Hyperscan supports Debian, Ubuntu and CentOS/CloudLinux 7 and later.
  * SSE3 processor instructions support. It is quite common nowadays, but may be lacking in virtual environments or in some rather old servers.

#### Crontab files Scanning

This is the mechanism allowing to address Crontab infections with our powerful Malware scanner. Enabled, it will catch any event of Crontab file modification on the fly in seconds and keep them malware-free in real-time.

<img src="/images/crontabScanning.png" border="1px solid grey"/>

The cleanup results are available on the *Malware* and *History* tabs of the Imunify360 interface as for any other type of malware.

Tick required checkboxes and click <span class="notranslate">_Save changes_</span> button.

#### Background Scanning

Allows to set up automatic, scheduled, background scanning of user accounts.

* <span class="notranslate">_Run scanning_</span> — select the desired period:
  * <span class="notranslate">Never</span>
  * <span class="notranslate">Daily</span>
  * <span class="notranslate">Weekly</span>
  * <span class="notranslate">Monthly</span>

![](/images/background_scanning1.png)

Depending on the selected period, precise settings.

* If <span class="notranslate">_Run scanning_</span> is set to <span class="notranslate">_Daily_</span>, choose the exact time at the <span class="notranslate">_Run at_</span> dropdown.

* If <span class="notranslate">_Run scanning_</span> is set to <span class="notranslate">_Weekly_</span>, choose the day of the week at the <span class="notranslate">_Run on_</span> dropdown and exact time at the <span class="notranslate">_Run at_</span> dropdown.

* If <span class="notranslate">_Run scanning_</span> is set to <span class="notranslate">_Monthly_</span>, choose the day of the month at the <span class="notranslate">_Day of month to run_</span> dropdown and exact time at the <span class="notranslate">_Run at_</span> dropdown.

You can track the scanning activity at the <span class="notranslate">[Malware Scanner](#malware-scanner)</span> tab.


#### Cleanup

* <span class="notranslate">_Trim file instead of removal_</span> — do not remove infected file during cleanup but make the file zero-size (for malware like web-shells);
* <span class="notranslate">_Keep original files for … days_</span> — the original infected file is available for restoration within the defined period. The default is 14 days.

![](/images/malwarescannersettings_zoom70.png)


#### Proactive Defense

* <span class="notranslate">_Enable Blamer_</span> — tick to allow Imunify360 to find a root cause of how infection got injected into the server through PHP. Blamer pinpoints the exact URL, PHP script & PHP execution path that allowed a hacker to inject malware onto the server.
Imunify360 security team will use that information to prevent future infections from happening.

![](/images/SettingsBlamer.png)

To reduce the number of blamer events, similar events are combined by default into a single one. In order to disable it, specify the <span class="notranslate">`filter_messages=off`</span> in the <span class="notranslate">_/usr/share/i360-php-opts/module.ini_</span>

* <span class="notranslate">_PHP Immunity_</span> — tick to allow Imunify360 automatically detect and patch vulnerabilities in software at the Proactive Defense level preventing re-infections through the same vulnerability.

Once a vulnerable script or unknown malware executes any malicious flow which in turn leads to a malware drop, it causes the auto-generate rule to be released for the Proactive Defence. Ultimately, it will stop any further attempts to exploit the vulnerability or drop malware. Any dropped malware will be also auto-cleaned by the real-time malware scanner keeping the system clean and protected.

![](/images/SettingsPHPImmunity.png)

By enabling this feature Blamer will be enabled as well and Proactive Defence switched into the KILL mode.


Click <span class="notranslate">_Save changes_</span> at the page bottom to apply all changes.

#### Malware Database Scanner

![](/images/MDSSetUI.png)

Enable <span class="notranslate">_Malware Database Scanner_</span> – a database antivirus: automated malware detection and clean-up of web applications.

:::tip Note
Requires MariaDB/MySQL DB management system version 5.5. The recommended version is 5.6+. Note, that only WordPress, Joomla, and Magento databases are supported now.
:::


Click <span class="notranslate">_Save changes_</span> to apply changes.


### Backups

#### Overview

Imunify360 provides customers with the ability to integrate with backup providers and automatically or manually restore files from their backup if they have become infected. Only the administrator can choose a backup provider but the end-user has the ability to backup and restore files within this selected backup provider.

The following integrated with Imunify360 backup providers are available:
* Hosting panel Backup (cPanel, Plesk, or DirectAdmin)

:::warning Warning
**JetBackup**: The Imunify360 integration is implemented on the JetBackup side. JetBackup server backup application is not available right now because of the rework. 
:::


<!-- Imunify360 is integrated with the JetBackup server backup application. Anyone using JetBackup with WHM or cPanel can elect to use Imunify360. You can find more details [here](https://blog.imunify360.com/imunify360-now-integrated-with-jetbackup). -->

**Requirements**

* Imunify360 version 2.7.0 and later
* For the hosting panel backup, it is required that the backup option is configured by the administrator of the hosting panel

#### How to enable backups

To enable backups log in to a hosting panel as administrator, go to the Imunify360 plugin and do the following.
* Go to <span class="notranslate">_Imunify360 → Settings → Backups_</span>. If the feature is not currently used the <span class="notranslate">_Backup and restore_</span> is <span class="notranslate">_Disabled_</span>.
* To enable it, select the backup provider from the dropdown:
  * <span class="notranslate">[cPanel Plesk or DirectAdmin Backup](/dashboard/#cpanel-plesk-or-directadmin-backup)</span>

![](/images/settingsbackup.png)


#### cPanel Plesk or DirectAdmin Backup

* Choose cPanel/Plesk/DirectAdmin backup
* Select <span class="notranslate">_cPanel/Plesk/DirectAdmin Backup_</span>
* Click <span class="notranslate">_Connect Backup_</span> button

![](/images/backuprestorecpanel.png)

After the successful connection, Imunify360 will return the appropriate message.

#### How to disable backups

To disable backups do the following:
* Go to <span class="notranslate">_Imunify360 → Settings → Backups_</span>
* Move the slider to <span class="notranslate">_Disabled_</span>
* Imunify360 returns confirmation pop-up
* Click <span class="notranslate">_Yes, disable backup_</span> to disable backups or click <span class="notranslate">_Cancel_</span> to close the pop-up.

#### How to restore file

To restore a file do the following:

* Go to <span class="notranslate">_Imunify360 → Malware Scanner_</span>.
* Find the file to restore in the table and click _Cog_ icon, then click <span class="notranslate">_Try to restore clean version from backup_</span>.
* In the pop-up confirm the action by clicking <span class="notranslate">_Yes, restore from backup_</span> or click <span class="notranslate">_Cancel_</span> to close the pop-up.

You can configure the automatic restore. Please find more details [here](/dashboard/#malware).


### Disabled Rules

#### Editing in UI

Go to <span class="notranslate">_Settings_</span> page and choose <span class="notranslate">_Disabled rules_</span>. This page allows users to manage disabled rules which have already been added.

::: tip Note
You can also add a new rule to the <span class="notranslate">Disabled Rules</span> list on the [Incidents](/dashboard/#incidents) page.
:::
The list of disabled rules contains:

* <span class="notranslate">_Rule ID_</span> — ID number of the rule provided by the plugin
* <span class="notranslate">_Plugin_</span> — the name of the firewall plugin of the added rule
* <span class="notranslate">_Description_</span> — rule description or details of the rule from ModSecurity or OSSEC
* <span class="notranslate">_Domains_</span> — the list of the domains for which the rule is disabled (blank field means all domains)

To add a new rule click <span class="notranslate">_Add Rule_</span> button.

![](/images/disabledrulesaddbutton_zoom70.png)

In the pop-up specify the following:

* <span class="notranslate">_Rule ID_</span> — ID provided by firewall plugin;
* Select firewall plugin from the drop-down (ossec for OSSEC, modsec for ModSecurity)
* <span class="notranslate">_Description_</span> — rule description or details from ModSecurity or OSSEC
* <span class="notranslate">_Domains_</span> — this option is available only for modsec firewall plugin. Specify a comma-separated list of domains for which this rule will be disabled. Leave empty to disable for all domains

Click <span class="notranslate">_Add Rule_</span> to add rule to the list or <span class="notranslate">_Cancel_</span> to close the pop-up.

![](/images/addrule_zoom90.png)

To edit the list of domains where the rule should be disabled, click the edit icon in the row of the rule and enter domains registered on the server separated by a comma.

::: tip Note
It is possible to specify domains only for ModSecurity rules. For OSSEC rules it always applies to all domains.
:::

![](/images/disabledruleseditbutton_zoom70.png)

To remove the rule from the disabled list click <span class="notranslate">_Enable_</span> and confirm the action in the pop-up.

![](/images/disabledrulesenablepopup_zoom60.png)

:::tip Note
To prevent managing the rules there's an option [allow_local_rules_management](/config_file_description/).
:::

#### Config file

An alternative way to disable rules is to use the config file `/etc/imunify360/rules/disabled-rules`. It's especially usable with provisioning tools like Ansible, Puppet, Chef, etc.

:::tip Note
Please note that all rules in the config file are not visible in the UI above.
:::

The config file contains lines in the following format:

`MODULE_ID:RULE_ID:Description`

Where:

- `MODULE_ID` can have one of the following values:

  - `modsec` for ModSecurity rules
  - `ossec` for OSSEC rules
  - `cphulk` for cpHulkd rules
  - `lfd` for Login Failuer daemon rules

- `RULE_ID` is the rule id for the module and it is mandatory.

- `Description` - text string without specialized symbols.

Example:

```text
modsec:1010:
ossec:1008
modsec:1001:this is why
```

### Features Management

**Overview**

<span class="notranslate">Features Management</span> allows hosters to enable/disable Imunify360 features for each customer. On <span class="notranslate">Features Management</span> it is possible to manage <span class="notranslate">Proactive Defense</span> and <span class="notranslate">Malware Cleanup</span> for each customer account.
If a feature is enabled for the user in the hoster’s account, the user will be able to see and use it in his account.

::: tip Note
Default settings in <span class="notranslate">Features Management</span> are inherited by newly created user accounts only.
:::

:::tip Note
Features are enabled/disabled account-wide.
:::

![](/images/FeaturesManagementGeneral.png)

Below, there is a table with all users and their domains and features for each user.

![](/images/FeaturesManagementTable.png)

* <span class="notranslate">**Name**</span> — username or path to a user;
* <span class="notranslate">**Domains**</span> — a list of user’s domains; 
* <span class="notranslate">**Proactive Defense**</span> — a slider to enable/disable the feature for a specific user.
  Move a slider in feature column to enable/disable that feature for a specific user. After that, this specific feature tab will be displayed/hid in that user’s account.
* <span class="notranslate">**Malware Cleanup**</span> — a slider to enable/disable the feature for a specific user.
  Move a slider in feature column to enable/disable that feature for a specific user. After that, the <span class="notranslate">Cleanup</span> button will be available in the Malicious files list in that user’s account.

**Group Action**
To perform a group action tick the users and move sliders for them.

![](/images/FeaturesManagementGroupAction.png)

**How to enable/disable <span class="notranslate">Proactive Defense</span>**

The <span class="notranslate">Proactive Defense</span> feature is enabled by default account-wide. So, all newly created user accounts will have <span class="notranslate">Proactive Defence</span> tab in their Imunify360 Section. 

![](/images/FeaturesManagementProactiveDefense.png)

To disable <span class="notranslate">Proactive Defense</span> account-wide just move the slider to <span class="notranslate">_Turned Off_</span>. And confirm the action in the popup by clicking <span class="notranslate">_Yes, disable Proactive Defense for new users_</span> or click <span class="notranslate">_Cancel_</span> to close the popup.

![](/images/FeaturesManagementProactiveDefenseConfirmation.png)

**How to enable/disable <span class="notranslate">Malware Cleanup</span>**

The <span class="notranslate">Malware Cleanup</span> feature is enabled by default account-wide. So, all newly created user accounts will have <span class="notranslate">Malware Cleanup</span> feature in their Imunify360. 

![](/images/FeaturesManagementMalwareCleanup.png)

To disable <span class="notranslate">Malware Cleanup</span> account-wide just move the slider to <span class="notranslate">_Turned Off_</span>. And confirm the action in the popup by clicking <span class="notranslate">_Yes, disable Malware Cleanup for new users_</span> or click <span class="notranslate">_Cancel_</span> to close the popup.

![](/images/FeaturesManagementMalwareCleanupConfirmation.png)

You can perform all these actions via [CLI](/command_line_interface/).

<div class="notranslate">

### Native Feature Management

</div>

<span class="notranslate">Feature Management</span> allows a hoster to enable/disable different Imunify360 features for server users. Using this functionality, hosting companies may resell chosen Imunify360 features as a part of hosting packages to end-users as well as make features available/unavailable for a group of end-users.

### WHM/cPanel

<span class="notranslate">WHM/cPanel Feature Management</span> is now available under <span class="notranslate">WHM/cPanel Package Manager</span> via <span class="notranslate">Package Extension (PE)</span>.
Using <span class="notranslate">WHM/cPanel Native Feature Management</span> a hoster can enable/disable <span class="notranslate">Malware Scanner</span> and <span class="notranslate">Proactive Defense</span> for all users with the same package (service plan) instantly.

::: tip Note
When switched to <span class="notranslate">WHM/cPanel Feature Management</span>, the same functionality will be disabled in the Imunify360 UI. The previous Feature Management config becomes overridden by defaults.
:::

**How to switch to WHM/cPanel Feature Management**

Go to <span class="notranslate">Imunify360 → Settings → Features Management</span>. You will see the following.

![](/images/NativeFeaturesManagement.png)

Click <span class="notranslate">_Details_</span>. You will see the following pop-up.


![](/images/SwitchToNativeFeaturesManagement.png)

Click <span class="notranslate">_Agree and Switch_</span> to confirm the action or click <span class="notranslate">_Cancel_</span> to close the popup.

:::tip Note
Note that current Imunify360 settings will be reset to default values after switching to <span class="notranslate">WHM/cPanel Feature Management</span> mode. You can switch back to in-app <span class="notranslate">Imunify360 Feature Management</span> mode at any time via CLI command. The end-user values will be reset to default values upon any mode switching.
:::

When switched, you will see the following.

![](/images/SwitchedFM.png)

**How to configure Imunify360 Features using WHM/cPanel Package Extensions**

Go to <span class="notranslate">WHM/cPanel → Add a Package → Package Extensions</span> and tick <span class="notranslate">Imunify360 Features</span> (if it’s not selected).

![](/images/WHMPackageExtension.png)

Choose an option for each feature.

<span class="notranslate">**Malware Scanner**</span>
* <span class="notranslate">_View reports + Cleanup_</span> – a user can view scanning reports and cleanup found malware
* <span class="notranslate">_View reports only_</span> – a user can view scanning reports but can't cleanup found malware
* <span class="notranslate">_Not available_</span> – the <span class="notranslate">Malware Scanner</span> is not available for a user, and its tab is hidden on the Imunify360 main menu
:::tip Note
The last option is available in the WHM/cPanel Package Manager only and is not available via Imunify360 UI or CLI.
:::  
:::warning Note
When the **Malware Scanner is not available** for the end-user, it doesn't exclude user folders from scanning, so his files will be scanned and the results will be listed in an admin UI as usual.
:::

<span class="notranslate">**Proactive Defense**</span>
* <span class="notranslate">_Available_</span> – the <span class="notranslate">Proactive Defense</span> feature is available for a user
* <span class="notranslate">_Not available_</span> – the <span class="notranslate">Proactive Defense</span> is deactivated for a user: the feature does not run and its UI is hidden from the Imunify360 main menu

Click <span class="notranslate">_Add_</span> to apply changes.

See also: [CLI](/command_line_interface/). 

### Attributions

Click <span class="notranslate">_Settings_</span> and choose <span class="notranslate">_Attributions_</span> tab to observe a list of [IDS](/terminology/) install on the server.

* <span class="notranslate">_Name_</span> – name of the IDS
* <span class="notranslate">_Version_</span> – IDS version
* <span class="notranslate">_License_</span> – under which licenses this IDS is working
* <span class="notranslate">_Link_</span> – URL to the IDS official page

![](/images/pfattr.jpg)

Country-based white or blacklisting includes GeoLite2 data created by MaxMind, available from
[https://www.maxmind.com](https://www.maxmind.com).

#### Hosting panels specific settings

**cPanel**

It is possible to enable the Service Status checker for Imunify360. Perform the following steps:

* Go to <span class="notranslate">_Service Configuration_</span> and choose <span class="notranslate">_Service Manager_</span>.
* In <span class="notranslate">_Additional Services_</span> section tick <span class="notranslate">`imunify360`</span> checkbox.
* Click <span class="notranslate">_Save_</span> and wait until cPanel enables the Service Status checker for Imunify360.

![](/images/ServiceManagercPanel1.png)

If succeeded, the status of the Imunify360 service will be displayed at the Service Status section of Server Status.

![](/images/service_status.jpg)
