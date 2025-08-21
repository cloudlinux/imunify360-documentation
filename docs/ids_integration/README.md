# Other Integrations

[[toc]]

## IDS Integration 

:::tip Note 
Please be aware that *firewalld* is not fully compatible with Imunify360.
While it is possible to use Imunify360 and firewalld on the same server, you may need to duplicate certain rules or permissions and manually implement changes to configure both Imunify360 and firewalld. Therefore, we recommend utilizing either the Imunify360 firewall exclusively or Imunify360 in conjunction with CSF.  
:::

### CSF Integration


It is possible to use <span class="notranslate">[ConfigServer Security & Firewall (CSF)](https://www.configserver.com/cp/csf.html)</span>  along with Imunify360.

Imunify360 automatically detects that CSF is running (you can enable it anytime). Imunify360 [Blocked Ports](/dashboard/#blocked-ports), [DoS Protection](/dashboard/#dos-protection) and [SMTP Traffic Manager](/dashboard/#smtp-traffic-manager) features are automatically disabled in this case. In general:

* <span class="notranslate">Black List, Gray List</span>, and <span class="notranslate">White List</span> can be managed in Imunify360 regardless of <span class="notranslate">CSF</span>.
* <span class="notranslate">CSF Allow, Deny</span> and <span class="notranslate">Ignore Lists</span> are not automatically imported from <span class="notranslate">CSF</span>. They can still be managed using <span class="notranslate">CSF</span> interface.
* Imunify360 will not block addresses from <span class="notranslate">CSF Allow</span> and <span class="notranslate">Ignore Lists</span>.

To check that running <span class="notranslate">CSF</span> is detected, go to <span class="notranslate">Imunify360 → Firewall tab → White List</span> section and check if there is a warning message <span class="notranslate">"_CSF is enabled. Please manage IPs whitelisted in CSF using CSF user interface or config file_"</span>. 

![](/images/firewallblacklistwarning_zoom70.png)

**<span class="notranslate">Mod_security</span> recommendations**

When <span class="notranslate">mod_security</span> is configured with <span class="notranslate">SecRuleEngine On</span> (blocking mode), <span class="notranslate">CSF</span> blocks IP addresses by <span class="notranslate">mod_security</span> events. The number of events to block IP address is defined by <span class="notranslate">` LF_MODSEC`</span> variable in <span class="notranslate">`csf.conf`</span>. This can lead to a large number of false positives.

We recommend to set <span class="notranslate">`LF_MODSEC`</span> variable to 0.

In this case, Imunify360 will block IPs only by <span class="notranslate">mod_security</span> events with high severity.

#### 3-rd Party Integration mode

The main setting that defines how Imunify360 works along with CSF is [3-rd Party Integration](https://docs.imunify360.com/dashboard/#_3-rd-party-integration) switch. (The [config file](/config_file_description/) equivalent is `CSF_INTEGRATION.catch_lfd_events`). When this mode is **disabled** (default), CSF and Imunify360 work as two independent solutions (with redundant modules disabled on the Imunify360 side - see above).

When 3-rd Party Integration mode is **enabled** Imunify360 uses <span class="notranslate">Login Failure Daemon (LFD)</span> as source for security events instead of <span class="notranslate">[OSSEC](https://www.ossec.net)</span>. To get events from <span class="notranslate">Login Failure Daemon (LFD)</span>, Imunify360 automatically replaces <span class="notranslate">`BLOCK_REPORT`</span> variable to the file path of Imunify360 script.
When some IP address is blocked by <span class="notranslate">LFD, Imunify360</span> adds this IP address to its <span class="notranslate">Graylist</span> and then **removes it from <span class="notranslate">CSF deny/tempdeny lists</span>**. The latter is done to unblock IP by passing Anti-Bot Challenge and to store all automatically blocked IP addresses in a single place. Thus, no IP is automatically added to <span class="notranslate">CSF deny/tempdeny lists</span>. 

### CXS Integration

<span class="notranslate">[ConfigServer eXploit Scanner](https://configserver.com/cp/cxs.html) (CXS)</span> has different types of malware scanning, which affects <span class="notranslate">Imunify360 Malware Scanner</span> functionality. Below we describe how to make <span class="notranslate">Imunify360 Malware Scanner</span> work properly. These functionalities can be configured at <span class="notranslate">[Malware Scanner settings](/dashboard/#settings)</span> page, but <span class="notranslate">CXS</span> itself must be configured  as follows:

1. <span class="notranslate">_Automatically scan all modified files_</span>

   <span class="notranslate">CXS Watch</span> daemon must be disabled.

<details> 
<summary>Click here for more guidelines.</summary>

```
# stop and disable the service so it won’t start on boot
systemctl stop cxswatch
systemctl disable cxswatch

# hard-prevent other units from starting it
systemctl mask cxswatch

# (optional) to allow it again later, unmask it:
systemctl unmask cxswatch
```
:::tip Note: 
You normally don’t need to chmod or rename `/etc/cxs/cxswatch.sh`. Masking the unit already prevents activation by other services. (If you do want an extra safety lock, you can `chmod 000 /etc/cxs/cxswatch.sh` and revert with `chmod 755` later. The script path is standard for CXS. 
::: 
</details>

2. <span class="notranslate">_Automatically scan any files uploaded using web_</span>

   <span class="notranslate">CXS ModSecurity</span> vendor should be disabled.

<details>
<summary>You can do this by CLI (preferred for repeatability) or via WHM UI. Click here for more guidelines.</summary>

**CLI (root)** 

The vendor short name for CXS is `configserver` (per vendor metadata). Use either the helper script or WHM API:

```
# Using cPanel helper script (works on all supported versions)
# Disable the ConfigServer (CXS) ModSecurity vendor
/usr/local/cpanel/scripts/modsec_vendor disable configserver

# (optional) also disable that vendor’s individual config files & updates via API:
whmapi1 modsec_disable_vendor_configs vendor_id=configserver
whmapi1 modsec_disable_vendor_updates vendor_id=configserver

# Apply ModSecurity settings and restart Apache
whmapi1 modsec_deploy_settings_changes
/usr/local/cpanel/scripts/restartsrv_httpd
```

**WHM UI (if you prefer)** 

WHM » Security Center » ModSecurity® Vendors → find **ConfigServer (CXS)** → toggle `Enabled` to `Off.` (You may also click Delete to remove it entirely.) 
</details>

4. <span class="notranslate">_Automatically scan any file uploaded using ftp_</span>

   Imunify360 supports only <span class="notranslate">[Pure-FTPd](https://www.pureftpd.org)</span>. For <span class="notranslate">Pure-FTPd CXS</span> launches pure-uploadscript for the scan. Any pure-uploadscript used by <span class="notranslate">CXS</span> must be disabled. You can use the following commands to do that:
   
  <div class="notranslate">

  ```
  systemctl stop pure-uploadscript.service
  ```
  </div>

  <div class="notranslate">

  ```
  systemctl disable pure-uploadscript.service
  ```
  </div>

  <div class="notranslate">
   
  ```
  systemctl restart imunify360
  ```
  </div>

4. <span class="notranslate">_On-Demand scanning_</span>

   This type of scanning can be always run by Imunify360 and <span class="notranslate">CXS</span> separately. No special actions required.

::: tip Note
Imunify360 doesn’t make any imports from <span class="notranslate">CXS</span>.
:::

## Backup Providers Integration

### Overview

<span class="notranslate">**Restore_infected**</span> is a library written in <span class="notranslate">Python 3</span>. It allows to restore files from backups. It supports several backup backends. Each backend is represented as a plugin which uses a particular API to the backup server and provides a user with a common interface to restore individual files regardless of backup backend selected. In addition to the existing backends custom ones can be added.

If one of the files is infected with malware the library can also search for the last uninfected revision of this file in available backups and restore it. By default it uses <span class="notranslate">_imunify360-agent_</span> to detect infected files but a custom algorithm can be used instead.

![](/images/restoreinfectedscheme_zoom70.png)

From the figure above can see that the user of the library is supposed to reference it either using command line interface or calling library functions directly. The CLI supports interaction with the <span class="notranslate">_restore algorithm_</span> but not with the backend API. <span class="notranslate">_Restore algorithm_</span> doesn’t have a functionality to restore a file from any backup but is capable of restoring files infected with malware instead. It treats absent files as infected ones therefore restores the last revision of those.

### Command Line Usage

A command line interface to <span class="notranslate">**restore_infected**</span> library is present in the file <span class="notranslate">**restore_infected_cli.py**</span>. If installed from the RPM, the binary is located in <span class="notranslate">_/usr/bin/restore_infected_</span> and can be used as <span class="notranslate">_“restore_infected”_</span> . To use the CLI a backend and an action should be specified.

The library includes the following backup backend plugins:

* Acronis
* cPanel
* Plesk

#### Synopsis

<div class="notranslate">

```
restore_infected BACKEND ACTION
```

</div>

Where <span class="notranslate">`BACKEND`</span> is one of the backends - predefined or custom and <span class="notranslate">`ACTION`</span> is one of the actions described below.

#### Actions

#### <span class="notranslate">init</span>

The first step most of the plugins will need is initialization. The most common use of it is to save credentials for the backup server.

<div class="notranslate">

```
init arg0 arg1 ...
```

</div>

The arguments may vary depending on the backend used. To see which arguments are needed for the particular plugin you can call <span class="notranslate">`init`</span> with no arguments:

<div class="notranslate">

```
restore_infected acronis init
usage: restore_infected [-h] BACKEND {init,list,restore,cleanup} ...
restore_infected: error: init arguments required: username password
```

</div>

To install Acronis backup agent, pass <span class="notranslate">`--provision`</span> option to <span class="notranslate">`init`</span> command. To force installation when agent is present use <span class="notranslate">`--force`</span> option.

#### <span class="notranslate">list</span>

list shows available backups sorted by date starting with the newest.

<div class="notranslate">

```
list [--until]
```

</div>

If a date string is passed as <span class="notranslate">`--until`</span>, list all backups from now up to that date or all backups otherwise. The date for <span class="notranslate">`--until`</span> parameter can be in any format that python-dateutil can parse, e.g. _2017-08-01_, _01 Aug 2017_, etc.

Example:

<div class="notranslate">

```
restore_infected acronis list --until "01 Aug 2017"
2017-08-06T10:22:00
2017-08-05T06:00:00
2017-08-03T12:32:00
```

</div>

#### <span class="notranslate">restore</span>

<div class="notranslate">

```
restore files [--until]
```

</div>

Restore files from backup. <span class="notranslate">`restore`</span> takes a list of files (paths to them) which are considered infected, searches for the first uninfected entry of each file in backups and restores it. Backups older than the date set in <span class="notranslate">`--until`</span> are not considered.

Example:

<div class="notranslate">

```
restore_infected acronis restore "/root/file1" "/root/file2" --until "01 Aug 2017"
```

</div>

#### <span class="notranslate">cleanup</span>

The most common use is to delete any temporary files created by the plugin. Depending on the backend the functionality may vary or such function might not be present at all.

Example:

<div class="notranslate">

```
restore_infected plesk cleanup
```

</div>

<span class="notranslate">**extra**</span>

This is for acrivity not connected to restoring from backups.

Currently supported options are
* <span class="notranslate">`login_url`</span> (for Acronis backend). This option returns url to log in to Acronis cloud web interface.
* <span class="notranslate">`refresh_token`</span> (for Acronis backend). This option refreshes authentication token to keep it valid.


### Using as Library

#### Restoring Infected Files

The main purpose of the library is to search for uninfected files and to restore them as a replacement for infected ones. The function responsible for that is located in a module <span class="notranslate">`restore_infected.restore`</span>:

<div class="notranslate">

```
restore_infected(backend, files, until=None, scan_func=scan)
```

</div>

Where:

* <span class="notranslate">`backend`</span> is a backend plugin module;
* <span class="notranslate">`files`</span> is a list of files to scan and restore;
* <span class="notranslate">`until`</span> filters the backups before specified date;
* <span class="notranslate">`scan_func`</span> is a function that scans files for malware. It takes a list of files and returns the list of infected ones, by default it uses the function <span class="notranslate">`scan`</span> from the same module.

For example <span class="notranslate">`restore_infected`</span> can be called like this:

<div class="notranslate">

```
from restore_infected import backup_backends
from restore_infected.restore import restore_infected
from restore_infected.helpers import DateTime
 
plesk = backup_backends.backend('plesk')
 
def my_scan(files):
  infected = []
  # scan files here
  return infected
 
restore_infected(
plesk,
"/var/www/vhosts/u1.pl7.cloudlinux.com/httpdocs/index.php",
until=DateTime("9 Aug 2017"),
scan_func=my_scan)
```
</div>

#### Operating With Backend

A backend plugin can be imported directly from <span class="notranslate">`restore_infected.backup_backends`</span>. Every plugin has a function called <span class="notranslate">`backups`</span> which returns the list of objects each of which is representing a backup, and might have optional functions <span class="notranslate">`init`</span> and/or <span class="notranslate">`cleanup`</span> which initialize and cleanup the plugin respectively.

In the following example let’s print out all backups. For <span class="notranslate">`plesk`</span> in the following example the <span class="notranslate">`init`</span> function is not needed so we can call backups right away:

<div class="notranslate">

```
from restore_infected import backup_backends
plesk = backup_backends.backend('plesk')
for backup in plesk.backups():
       print(backup)
```

</div>

This will give us the following list of backups:

<div class="notranslate">

```
/var/lib/psa/dumps/clients/u3/domains/u3.pl7.cloudlinux.com/backup_info_1708080701_1708090501.xml
/var/lib/psa/dumps/clients/u1/domains/u1.pl7.cloudlinux.com/backup_info_1708090500.xml
<...>
/var/lib/psa/dumps/clients/u1/domains/u1.pl7.cloudlinux.com/backup_info_1707070347_1707070353.xml
/var/lib/psa/dumps/clients/u1/domains/u1.pl7.cloudlinux.com/backup_info_1707070347.xml
```

</div>

<span class="notranslate">`backups`</span> has an optional parameter <span class="notranslate">`until`</span> of <span class="notranslate">`restore_infected.helpers.DateTime`</span>. To filter out backups from 9 Aug 2017 till now the code can be changed like this:

<div class="notranslate">

```
from restore_infected import backup_backends
plesk = backup_backends.backend('plesk')
from restore_infected.helpers import DateTime
for backup in plesk.backups(DateTime("9 Aug 2017")):
       print(backup)
```

</div>

#### Operating With Backup
 
In the previous step we printed out some backups. Every backup entry regardless of the plugin also has a field <span class="notranslate">`created`</span> which tells when the actual backup was created. It makes backups comparable.

Example:

<div class="notranslate">

```
backups = plesk.backups()
print(backups[4].created)
print(backups[5].created)
print(backups[4] > backups[5])
Which gives us:
2017-08-08 07:01:00
2017-08-08 07:00:00
True
```

</div>

#### Operating With File in Backup

A method <span class="notranslate">`file_data`</span> returns a representation of a file in this backup as an instance of a class (hereafter, this class is referenced to <span class="notranslate">`FileData`</span>):

<div class="notranslate">

```
print(backup.file_data('/var/www/vhosts/u1.pl7.cloudlinux.com/httpdocs/index.php'))
```

</div>

Output:

<div class="notranslate">

```
<FileData(
fileobj=<ExFileObject name='/var/lib/psa/dumps/clients/u1/domains/u1.pl7.cloudlinux.com/backup_user-data_1708080700.tgz'>,
filename='/var/www/vhosts/u1.pl7.cloudlinux.com/httpdocs/index.php',
size=418,
mtime=datetime.datetime(2013, 9, 24, 20, 18, 11)
> 
```

</div>

where <span class="notranslate">`mtime`</span> is the time of the last modification of a file.

Besides these fields, FileData also has a method <span class="notranslate">`restore`</span>. If <span class="notranslate">`destination`</span> is passed as a parameter then the file is restored and saved in specified folder saving the directory hierarchy. The default <span class="notranslate">`destination`</span> is `/` which means that the file is restored to the place of its origin.

Example:

<div class="notranslate">

```
from restore_infected import backup_backends
plesk = backup_backends.backend('plesk')
backups = plesk.backups()
filedata = \
backups[5].file_data('/var/www/vhosts/u1.pl7.cloudlinux.com/httpdocs/index.php')
filedata.restore('/home/user/restored_files')
```

</div>

It gives no output if zero errors occurred and creates <span class="notranslate">`'var/...'`</span> directories in <span class="notranslate">`'/home/user/restored_files'`</span> with a restored file.

From now on Acronis backend supports <span class="notranslate">`provision=True/False`</span> (by default <span class="notranslate">`False`</span>) and <span class="notranslate">`force=True/False`</span> (by default <span class="notranslate">`False`</span>) options for <span class="notranslate">`init`</span> action, to install Acronis backend agent. Use <span class="notranslate">`force`</span> to reinstall agent if it is already present.

As of version 1.2-1, Acronis <span class="notranslate">`init`</span> takes optional argument <span class="notranslate">`tmp_dir`</span> to specify temporal directory for installing Acronis backup client.

Example:

<div class="notranslate">

```
from restore_infected import backup_backends
acronis = backup_backends.backend('acronis')
acronis.init(name, password, provision=True, force=True, tmp_dir=None)
```

</div>

* <span class="notranslate">`login_url`</span> action for return URL to log in to Acronis web interface.

   Example:

   <div class="notranslate">

   ```
   from restore_infected import backup_backends
    acronis = backup_backends.backend('acronis')
    token = acronis.login_url()
    ```

    </div>

* <span class="notranslate">`login_url`</span> action for refreshing authentication token.

   Example:

   <div class="notranslate">

   ```
    from restore_infected import backup_backends
     acronis = backup_backends.backend('acronis')
    acronis.refresh_token()
   ```

   </div>

* <span class="notranslate">`info`</span> action to return region, schedule and used storage space in JSON format.

   Example:

   <div class="notranslate">

   ```
    from restore_infected import backup_backends
    acronis = backup_backends.backend('acronis')
    info = acronis.info()
    {'schedule': {...}, 'usage': 17890969600, 'region': 'eu2'}
   ```

   </div>

* <span class="notranslate">`make_initial_backup`</span> makes initial backup after Acronis backup client is installed. By default it does not wait for the backup completion. To wait for the backup to be completed use option <span class="notranslate">`trace=True`</span> . When such an option is on, current completion percentage is being outputted to log file (by default <span class="notranslate">_/var/restore_infected/acronis_backup.log_</span>. Returns <span class="notranslate">`True`</span> if backup is successful and <span class="notranslate">`False`</span> otherwise.

   Example:

   <div class="notranslate">

   ```
    from restore_infected import backup_backends
    acronis = backup_backends.backend('acronis')
    acronis.make_initial_backup(trace=False)
   ```

   </div>

### Creating Custom Backup Backend Plugin

#### Creating Module
 
To create a plugin for a particular backup backend a python module should be created in <span class="notranslate">`backup_backends`</span> folder. The plugin will be registered automatically when a function <span class="notranslate">`backend(name)`</span> from <span class="notranslate">`backup_backends`</span> module is called.
If the plugin should be used only in some appropriate systems environment <span class="notranslate">`is_suitable`</span> function could be implemented, which should return Boolean. It will be called during <span class="notranslate">`backend(name)`</span> from <span class="notranslate">`backup_backends`</span> function call and if <span class="notranslate">`is_suitable False`</span>, then <span class="notranslate">`BackendNonApplicableError`</span> exception will be raised.

Here is an example of <span class="notranslate">`is_suitable`</span> function for DirectAdmin module:

<div class="notranslate">

```
def is_suitable():
return os.path.isfile('/usr/local/directadmin/directadmin')
```

</div>

#### Defining Classes

There are two mandatory classes that have to be implemented in the plugin.

#### <span class="notranslate">Backup</span> Class

This class represents a backup. It can have any name since it is not directly referenced to from the outside of the module. It can either be inherited from

<div class="notranslate">

```
backup_backends_lib.BackupBase
```

</div>

which already have some features (e.g. comparison) implemented or it can be written from scratch. The class must define a method <span class="notranslate">`file_data`</span> that returns a <span class="notranslate">FileData</span> object (described below). Objects of this class should also be comparable by the date created as if they were actual backups.

#### <span class="notranslate">FileData</span> Class

The second class that has to be implemented is <span class="notranslate">`FileData`</span> which represents a file in a backup. It must have file size, modify time and a method <span class="notranslate">`restore`</span>.

#### Implementing API Functions

There are 3 functions in the plugin, but only one of them is mandatory - <span class="notranslate">`backups`</span>. This function returns a list of Backup instances. Optional functions are <span class="notranslate">`init`</span>, <span class="notranslate">`cleanup`</span>, and <span class="notranslate">`info`</span> that are responsible for the initialization, cleanup and getting some information of the plugin respectively.

<div class="notranslate">

```
def init(*args):
...
def backups(until=None):
...
def cleanup():
   …
def info():
   ... 
```

</div>

Depending on the features of the backend being integrated, the plugin might have one or more classes and functions responsible to authorise on the backup server and retrieve data from it, however only functions <span class="notranslate">`init`</span>, <span class="notranslate">`backups`</span>, <span class="notranslate">`cleanup`</span>, and <span class="notranslate">`info`</span> are called from the outside of the module.

To check that the plugin works as intended try passing your plugin name to the CLI for example like this:

<div class="notranslate">

```
restore_infected <your_backend_name> list
```

</div>

To be used in asynchronous libraries <span class="notranslate">`async_restore_infected`</span> routine has been added. Typical use case:

<div class="notranslate">

```
import logging
from restore_infected import backup_backends
from restore_infected.restore import async_restore_infected
from defence360agent.malscan.scanner import MalwareScanner
 
async def _custom_scan_function(files):
    if not files:
        return []
    still_infected = []
    scanner = MalwareScanner().scan_filelist()
    scanner.start(files)
    result = await scanner.async_wait()
    if result['results']:
        still_infected = list(result['results'].keys())
    return still_infected
 
class DummyDumper:
    @classmethod
    async def do_restore(cls, files):
        backend = backup_backends.backend('cpanel')
        return await async_restore_infected(
            backend, files, scan_func=_custom_scan_function
```

</div>

For Acronis backup two restore modes are available:
* **<span class="notranslate">Download</span> mode** – a file to be restored is simply pulled by HTTP from backup server
* **<span class="notranslate">Recovery</span> mode**  – <span class="notranslate">`restore_infected`</span> just sends command to backup server and then waits for the file to be restored is actually placed to expected folder. Its size is equal to expected one.
  
Recovery mode is used by default because it restores file owner and permissions, too. Though downloading mode can be enabled with passing <span class="notranslate">`use_download`</span> option to <span class="notranslate">`restore_infected`</span> function. The second optional parameter - <span class="notranslate">`timeout`</span> can be passed to <span class="notranslate">`restore_infected`</span> function to change the default waiting time (time to wait while a file to be restored is being pulled by recovery agent). By default timeout is 600 seconds.

---
title: Hosting Panels Firewall Rulesets Specific Settings & ModSec
meta:
  - name: description
    content: Discover Hosting Panels Firewall Rulesets specific settings including modsec rules in Imunify360 security suite.
---

## Hosting Panels Firewall Rulesets Specific Settings & ModSecurity

This section includes specific settings for each hosting panel that Imunify360 supports. It is important to follow these instructions to setup Imunify360 plugin properly.

::: tip Note
<span class="notranslate">mod_security</span>, the important software for Imunify360, is not installed automatically during Imunify360 installation process. Without <span class="notranslate">mod_security</span>, Imunify360 will lack the following features:

* Web application firewall
* Malware scanning of files uploaded using web
::: 

<span class="notranslate">Mod_security</span> installation process is specific for different panels:

* Find the official cPanel documentation [here](https://documentation.cpanel.net/display/EA4/Apache+Module%3A+ModSecurity#ApacheModule:ModSecurity-InstallModSecHowtoinstalloruninstallmod_security2)

* Find the official Plesk documentation [here](https://docs.plesk.com/en-US/onyx/administrator-guide/server-administration/web-application-firewall-modsecurity.73383/)

::: danger Important!
If <span class="notranslate">mod_security</span> is installed after Imunify360, it is important to execute the following command to add <span class="notranslate">mod_security</span> ruleset to Imunify360:

For cPanel/Plesk/DirectAdmin/Stand-alone:

<div class="notranslate">

```
imunify360-agent install-vendors
```
</div>

:::

If <span class="notranslate">mod_security</span> is installed before Imunify360, the rules will be installed automatically.

::: tip Note
If Imunify360 installer detects any existing ruleset, it installs only minimal set of its rules. So, you need to disable all third-party rulesets prior to Imunify360 installation to get the full ruleset installed automatically.
::: 

### cPanel

It is possible to enable <span class="notranslate">Service Status</span> checker for Imunify360. To do so, perform the following steps:

1. Go to <span class="notranslate">_Service Configuration_</span> and choose <span class="notranslate">_Service Manager_</span>.

2. In <span class="notranslate">_Additional Services_</span> section tick the <span class="notranslate">`imunify360`</span> checkbox.

3. Click <span class="notranslate">_Save_</span> and wait until cPanel enables the <span class="notranslate">Service Status</span> checker for Imunify360.

![](/images/cpanel_set01.png)

If succeeded, the status of Imunify360 service will be displayed at <span class="notranslate">Service Status</span> section of <span class="notranslate">Server Status</span>.

![](/images/cpanel_set02.png)

#### ModSecurity Settings

:::warning Note
Since version 92, cPanel is adding experimental support of ModSecurity 3.x and starting from version 5.7, we implement **experimental** support of ModSecurity version 3 on cPanel. Since the support is experimental, there are some limitations. Please find them [here](/ids_integration/#modsecurity-3-apache-limitations).
:::
 
Recommended <span class="notranslate">mod_security</span> settings are:

* <span class="notranslate">Audit Log Level – Only log noteworthy transactions</span>
* <span class="notranslate">Connections Engine – Do not process the rules</span>
* <span class="notranslate">Rules Engine – Process the rules</span>

![](/images/modsecuritysettings.png)

It’s also recommended to disable any third-party <span class="notranslate">mod_security</span> vendors except Imunify360 ruleset (especially **OWASP** and **Comodo** ). These rulesets can cause large number of false-positives and duplicate Imunify360 ruleset.

To do so, go to <span class="notranslate">ModSecurity Vendors</span> section of cPanel main menu, and switch to <span class="notranslate">`Off`</span> all enabled vendors except Imunify360 ruleset.
If there is no Imunify360 ruleset installed, run <span class="notranslate">` imunify360-agent install-vendors`</span> command.

![](/images/ModSecVendors.png)

* Enable rules auto-update. Otherwise, you won't get important updates of ModSecurity ruleset in time
    * For Apache run the following command:
    
        <div class="notranslate">
 
        ```
        /usr/local/cpanel/scripts/modsec_vendor enable-updates imunify360-full-apache
        ```
        </div>
    * For LiteSpeed run the following command:
    
        <div class="notranslate">
 
        ```
        /usr/local/cpanel/scripts/modsec_vendor enable-updates imunify360-full-litespeed 
        ```
        </div>

    See details [here](https://documentation.cpanel.net/display/82Docs/ModSecurity+Vendors#ModSecurityVendors-Enableordisableupdates).

    Or you can use [WHMAPI1](https://documentation.cpanel.net/display/DD/WHM+API+1+Functions+-+modsec_enable_vendor_updates) to enable vendor auto-updates.

* It is possible to block ModSecurity rules only for IPs that belong to some country. More info can be found in [FAQ](/faq_and_known_issues/#_9-disabling-waf-rules-for-certain-countries)

#### ModSecurity 3 + Apache limitations

Since version 92, cPanel is adding experimental support of ModSecurity 3.x and starting from version 5.7, we implement **experimental** support of ModSecurity version 3 on cPanel. There are still some issues that prevent some Imunify360 features from working property. The feature limitations are:

* working with mod_ruid2
* working with mod_remoteip
* app-specific ruleset feature
* HackerTrap
* uploaded files scanning
* simple password redirect

### Plesk

It is not recommended to use firewalld and Plesk Firewall simultaneously, because Plesk does not fully support such configuration. We recommend to disable firewalld by running the command on the server:

<div class="notranslate">

```
systemctl disable firewalld
```

</div>

Read more about the problem at Plesk Help Center in this [thread](https://support.plesk.com/hc/en-us/articles/115000905285-Plesk-Firewall-and-firewalld).

#### ModSecurity Configuration

* <span class="notranslate">Web application firewall mode – On</span>

![](/images/modsecurityconfigurationpleskonyx.png)

If any <span class="notranslate">mod_security</span> ruleset was installed during Imunify360 installation, Imunify360 will not install its own ruleset, because Plesk supports only one ruleset at once.

To check, if Imunify360 ruleset is installed, run the following as root:

<div class="notranslate">

```
# plesk bin server_pref --show-web-app-firewall | grep "\[waf-rule-set\]" -A2
[waf-rule-set]
custom
```

</div>

If the output does not contain imunify360, for example:

<div class="notranslate">

```
# plesk bin server_pref --show-web-app-firewall | grep "\[waf-rule-set\]" -A2
[waf-rule-set]
comodo_free
```

</div>

Then install Imunify360 ruleset and check it again:

<div class="notranslate">

```
# imunify360-agent install-vendors
OK
# plesk bin server_pref --show-web-app-firewall | grep "\[waf-rule-set\]" -A2
[waf-rule-set]
custom
```

</div>

::: tip Note
Please make sure that <span class="notranslate">_Update rule sets_</span> option is disabled in your Plesk <span class="notranslate">_Web Application Firewall_</span> interface on the <span class="notranslate">_Settings_</span> tab.
:::
::: tip Note 
Note that in the current version of Plesk, <span class="notranslate">_Update rule sets_</span> option is available if one of the <span class="notranslate">_Atomic Basic ModSecurity/Advanced ModSecurity Rules by Atomicorp/Comodo ModSecurity_</span> Rule Set is enabled.
:::


### DirectAdmin


During installation on DirectAdmin, Imunify360 will try to install <span class="notranslate">mod_security</span> automatically using custombuild 2.0.

::: tip Note
Automatic installation of Imunify360 ruleset is only supported with custombuild 2.0.
:::
   
The following values in the custombuild configuration are required for the installation of Imunify360 ModSecurity ruleset:

```
modsecurity=yes
modsecurity_ruleset=no
```
