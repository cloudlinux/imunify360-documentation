# FAQ and Known Issues


### "Imunify agent is not running" troubleshooting

Having the Imunify service installed, you may come across the situation when the message <span class="notranslate">"Imunify agent is not running"</span> is displayed when you try to access the Dashboard:

![](/images/ImunifyAgentNotRunning.png)

First of all, try to check the status of the service via the command line using the following command:

<div class="notranslate">

```
# service imunify-antivirus status
```
</div>

In case you see the agent is inactive:

<div class="notranslate">

```
[root@host ~]# service imunify360 status


Redirecting to /bin/systemctl status imunify360.service
● imunify360.service - Imunify360 agent
Loaded: loaded (/usr/lib/systemd/system/imunify360.service; disabled; vendor preset: disabled)
Active: inactive (dead)
```
</div>

try to start it via the following command:

<div class="notranslate">

```
# service imunify-antivirus start
```
</div>

It may also occur that despite the Imunify’s Dashboard showing the <span class="notranslate">"agent is not running"</span>, the service itself is loaded and active.

You can check it with the following command:

<div class="notranslate">

```
# service imunify-antivirus status -l
```
</div>

Example output:

<div class="notranslate">

```
[root@host ~]# service imunify360 status -l

Redirecting to /bin/systemctl status -l imunify360.service
● imunify360.service - Imunify360 agent
Loaded: loaded (/usr/lib/systemd/system/imunify360.service; enabled; vendor preset: disabled)
Active: active (running) since Mon 2020-05-13 02:58:43 WIB; 3min 54s ago
Main PID: 1234567 (python3)
Status: "Demonized"
CGroup: /system.slice/imunify360.service
├─1234567 /opt/alt/python35/bin/python3 -m im360.run --daemon --pidfile /var/run/imunify360.pid
├─1234568 /usr/bin/tail --follow=name -n0 --retry /usr/local/cpanel/logs/cphulkd.log
├─1234569 /usr/bin/tail --follow=name -n0 --retry /etc/apache2/logs/modsec_audit.log
├─1234570 /usr/bin/tail --follow=name -n0 --retry /var/ossec/logs/alerts/alerts.json
└─1234571 /opt/alt/python27/bin/python2.7 -s /usr/sbin/cagefsctl --wait-lock --force-update-etc
May 13 02:58:39 host.domain.com systemd[1]: Starting Imunify360 agent…
May 13 02:58:43 host.domain.com systemd[1]: Started Imunify360 agent.
May 13 02:58:43 host.domain.com imunify-service[4072717]: Starting migrations
May 13 02:58:43 host.domain.com imunify-service[4072717]: There is nothing to migrate
```
</div>

Most often, such circumstances attest that the Imunify service has been recently installed on the server. Sometimes, a desynchronization between the agent and the web interface may occur in such cases, and it can take a bit of time for the database to be integrated completely.

In case the issue is still the same after 60 minutes, you can try creating the backup of the Imunify files and do the service restart to force the sync process:

<div class="notranslate">

```
# service imunify-antivirus stop
# mv /var/imunify360/files /var/imunify360/files_backup
# service imunify-antivirus start
```
</div>

After these actions, wait until the files downloading and the migration process are complete – the agent will synchronize with the web interface and start working normally. You can monitor this process via

<div class="notranslate">

```
# tail -f /var/log/imunify360/console.log
```
</div>

Another similar workaround may be handy in case you locate some database-related error inside the <span class="notranslate">`/var/log/imunify360/error.log`</span> – by renaming the database file and restarting the service. There may be errors like

<div class="notranslate">

```
"Imunify360 database is corrupt. Application cannot run with corrupt database."
```
</div>

or some lines with

<div class="notranslate">

```
"sqlite3.DatabaseError".
```
</div>

The `imunify360.db` file is an sqlite3 database the Imunify relies on; it contains incidents, malware hits/lists, settings, etc. Using this workaround will force the database recreation:

<div class="notranslate">

```
# service imunify-antivirus stop
# mv /var/imunify360/imunify360.db /var/imunify360/imunify360.db_backup
# service imunify-antivirus start
```
</div>

If you face any difficulties during the progress or simply cannot make the agent start, please run

<div class="notranslate">

```
# imunify-antivirus doctor
```
</div>

and provide the output to our Support Team at [https://cloudlinux.zendesk.com/hc/requests/new](https://cloudlinux.zendesk.com/hc/requests/new).


### How to enable/disable the "Start scanning" button for ImunifyAV\AV+

To enable the "Start scanning" button, run the following command: 

```
# imunify-antivirus config update '{"PERMISSIONS": {"allow_malware_scan": true}}'
```

To disable the "Start scanning" button, run the following command: 

```
# imunify-antivirus config update '{"PERMISSIONS": {"allow_malware_scan": false}}'
```

### Our customers are getting emails about infections. How can we disable that? The "Notify on website infection via email" setting is already disabled

Try to switch off the "Send notifications" option in the "Users" menu as shown on the screenshot below:

![](/images/SendNotifications.png)

:::tip Note
Please note that the "Adjust alert" parameter prevents the user from changing the notification settings.
:::