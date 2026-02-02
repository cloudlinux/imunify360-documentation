# Features

[[toc]]

## External Black/Whitelist Management

To use external files with the list of <span class="notranslate">Black/White IPs</span>, place this list into the following directory:

* for the White List:

<div class="notranslate">

```
/etc/imunify360/whitelist/*.txt
```
</div>

* for the Black List:

<div class="notranslate">

```
/etc/imunify360/blacklist/*.txt
```
</div>

The files may have IP addresses or subnet in [CIDR notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing).

In order to apply the IP lists, run the following command:

<div class="notranslate">

```
imunify360-agent reload-lists
```
</div>

Or restart the agent.

:::tip Note
Starting with imunify360-firewall-8.2.0 all IP lists are applied automatically. Manual reloading is no longer required.
:::

:::warning Warning
Specifying IPs in those files will not prevent Imunify from adding the same IPs to dynamic lists (like Grey list), but all White lists always have the priority over Black lists when it comes to actual filtering of requests/packages.
:::


## Global Ignore List

The Global Ignore List feature allows you to exclude files from malware scanning based on their content instead of location.

The following file contains the list of file hashes to be excluded:

<div class="notranslate">

```
/etc/imunify360/malware-ignore-hashes.txt
```
</div>

The file format requires one SHA256 hash per line. Comments can also be included. Here's an example:

<div class="notranslate">

```
# PHP file managers, added 1/10/2024
f157c3ede78333087829cdd211c55822e635d6c419606c3675bc8201b556bc9f
8f6b0462e1ee9c498fe6ae055419eb79b5ef0e8cb359a6d991dbeffa0589ce9b

# Adminer, added 14/09/2024
dcfd0433dc46bd82ec5aa7c9998b4ae7087731a45d3a443e3724da7aabe1e4c5
```
</div>

A regular path-based ignore list is also functional.


## RapidScan

The RapidScan feature increases scanning speed by lowering system resource usage. Increased scanning speeds and a higher scanning rate further hardens system security posture.

#### RapidScan techniques

* **Faster File Integrity Checking**. File metadata - file hashes are stored locally. This means that if the file didn't change since the last scan it won't need to be re-scanned.
* **Efficient Cloud-assisted Scanning**. Imunify360 stores its malicious file hash database in the cloud. Cloud assistance helps to detect malicious files and skip well known files that were white-listed. This means that only unfamiliar files remain to be scanned locally, resulting in significantly reduced scan times.
* **Optimized Malware Signatures**. Our malware signature database continually grows to reflect the ever-expanding variety of malicious software. As the database becomes more accurate and comprehensive, it also becomes larger and more cumbersome to index. We tackle this by actively curating the database and re-evaluating complex signatures, recasting any of them that could be improved in order to make a positive effect on scanning performance.
 
#### What does it mean for you?

After enabling  the RapidScan feature, the next scan runs with the usual speed. However, the subsequent scans speeds will improve, and they will run anywhere between 5 to 20 times faster. This is the case for both on-demand and scheduled scans, and it means, among other things, you can can increase scan frequency without affecting system performance.

To take advantage of this feature, go to your Imunify360 control panel and enable RapidScan in Settings→Malware Scanner. Please see the details
 [here](/dashboard/#malware).

## Low Resource Usage mode

This is a special operation mode where Imunify360 consumes less CPU and RAM. It is intended for servers with limited resources.

This mode disables <span class="notranslate">[WebShield](/webshield/)</span> switching off GreyList and Anti-bot Challenge. 

<span class="notranslate">_Low Resource Usage_</span> mode also enables the <span class="notranslate">_[Minimized Modsec Ruleset](/dashboard/#waf-settings)_</span> option that disables Imunify WAF rules with a high memory footprint, leaving critical rulesets enabled. 

When the <span class="notranslate">_Low Resource Usage_</span> mode is activated it is reflected on the UI: an Imunify main menu changes color to light green, and an appropriate label appears on the top right.

![](/images/LowResourceUsage.png)

#### How to switch from the Low Resource Usage mode to the normal resource usage mode

You can switch the mode via CLI and in the UI.

In CLI, run the following commands:

<div class="notranslate">

```
imunify360-agent config update '{"WEBSHIELD": {"enable": true}}'
imunify360-agent config update '{"MOD_SEC": {"ruleset": "FULL"}}'
```
</div>

In the UI, do the following steps:

1. Go to <span class="notranslate">_Settings_ | _General_ | _WebShield_</span> and enable _WebShield_:

  ![](/images/WebShieldEnabled.jpeg)

2. Go to <span class="notranslate">_Settings_ | _General_ | _WAF Settings_</span> and disable _Minimized ModSec Ruleset_:

  ![](/images/MinimazedModSecRulesetDisable.jpeg)
  

## Exim+Dovecot brute-force attack protection

:::tip Note
cPanel only, other panels will be added later
:::

Exim+Dovecot brute-force attack protection is an advanced protection against Dovecot brute-force attacks. PAM module protects against IMAP/POP3 brute-force attack and prevents mail account from being compromised via brute-forcing.

**How to enable Dovecot**

We recommend using Imunify360 agent config to enable Dovecot because this allows to correctly switch OSSEC rules/configs:

<div class="notranslate">

```
imunify360-agent config update '{"PAM": {"enable": true, "exim_dovecot_protection": true}}'
```
</div>

**How to disable Dovecot**

To disable all PAM module via config file:

<div class="notranslate">

```
imunify360-agent config update '{"PAM": {"enable": false, "exim_dovecot_protection": false}}'
```
</div>

To disable only Exim+Dovecot via config file:

<div class="notranslate">

```
imunify360-agent config update '{"PAM": {"exim_dovecot_protection": false}}'
```
</div>


The options of the `pam_imunufy` are placed in the file: <span class="notranslate">`/etc/pam_imunify/i360.ini`</span>

**Values**

| | |
|-|-|
|<span class="notranslate">`USER_LOCK_TIMEOUT=5`</span>|a period of time during which a user should be blocked (minutes)|
|<span class="notranslate">`USER_LOCK_ATTEMPTS=10`</span>|a number of attempts after which a user should be blocked|
|<span class="notranslate">`USER_LOCK_MINUTES=5`</span>|a period of time (minutes) during which violation attempts from a user are counted; all attempts earlier than <span class="notranslate">`USER_LOCK_MINUTES`</span> are not counted|
|<span class="notranslate">`USER_IP_LOCK_TIMEOUT=5`</span>|a period of time during which a user + IP should be blocked (minutes)|
|<span class="notranslate">`USER_IP_LOCK_ATTEMPTS=10`</span>|a number of attempts after which a user + IP should be blocked|
|<span class="notranslate">`USER_IP_LOCK_MINUTES=5`</span>|a period of time (minutes) during which violation attempts from a user + IP are counted; all attempts earlier than <span class="notranslate">`USER_IP_LOCK_MINUTES`</span> are not counted|
|<span class="notranslate">`IP_LOCK_TIMEOUT=5`</span>|a period of time during which an IP should be blocked (minutes)|
|<span class="notranslate">`IP_LOCK_ATTEMPTS=10`</span>|a number of attempts after which an IP should be blocked|
|<span class="notranslate">`IP_LOCK_MINUTES=5`</span>|a period of time during which violation attempts from an IP are counted; all attempts earlier than <span class="notranslate">`IP_LOCK_MINUTES`</span> are not counted|
|<span class="notranslate">`rbl=net-brute.rbl.imunify.com.`</span>| RBL DNS Zone |
|<span class="notranslate">`RBL_timeout=5`</span>|this is the wait time for a response from RBL|
|<span class="notranslate">`RBL_nameserver=ns1-rbl.imunify.com:53`</span>|NS Server|


:::tip Notes

Default RBL block time for IP = 4 hours.

:::


**How to apply settings**

In order to apply new settings in the <span class="notranslate">`/etc/pam_imunify/i360.ini`</span>, run the following command:

<div class="notranslate">

```
systemctl restart imunify360-pam
```
</div>

#### How it works

During the last <span class="notranslate">`XXX_LOCK_MINUTES`</span> we count the number of login failures (unsuccessful login attempts). If the number of attempts exceeds the specified threshold <span class="notranslate">`XXX_LOCK_ATTEMPTS`</span>, the PAM plugin blocks access for <span class="notranslate">`XXX_LOCK_TIMEOUT`</span> minutes. After that, the counter is reset and the process repeats. 
Note that the plugin has three separate counters and a set of settings for USER/IP/USER+IP management regarding brute-force attacks (see the table above).


:::tip Notes
* If a user is blocked by <span class="notranslate">`USER_LOCK_ATTEMPTS`</span>, then this user will not have access to the server from any IP
* If a user is blocked by <span class="notranslate">`USER_IP_LOCK_ATTEMPTS`</span>, then this user will not have access to the server from that specific IP
* If an IP is blocked by <span class="notranslate">`IP_LOCK_ATTEMPTS`</span>, then all users will not have access to the server from that specific blocked IP
:::

### Dovecot native brute force protection

Dovecot native brute force protection module improves stability and resolves issues that standard PAM caused in some cases

There were situations when login with enabled PAM would produce log messages like these:

```
Jun 9 14:45:04 Hostl6 dovecot: auth-worker(31382): Error: pam(user@example.org,<IP>,<SESSION>): Multiple password values not supported
```
```
Jun 9 14:45:10 Hostl6 dovecot: pop3-login: Disconnected (auth failed, 1 attempts in 6 secs): user=<user@example.org>, method=PLAIN, rip=<IP>, lip=<IP>, TLS, session=<SESSION>
```

This happened due to the specificity of PAM’s architecture and the way it processes such cases. We decided to develop a completely new native module for Dovecot with brute force protection functionality. With the new module, Dovecot will not produce any more error messages similar to shown above.

Since the module is fresh, it is in experimental mode – disabled by default for now. This will be changed to “enabled by default” state in later releases.

Now two options can be used to control how brute force protection works for Dovecot:

<table>
  <thead>
    <tr>
      <th colspan="2">Condition</th>
      <th rowspan="2">Behavior</th>
    </tr>
    <tr>
      <td>PAM.exim_dovecot_protection</td>
      <td>PAM.exim_dovecot_native</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><center>false</center></td>
      <td><center>any</center></td>
      <td>Dovecot protection <b>disabled</b></td>
    </tr>
    <tr>
      <td><center>true</center></td>
      <td><center>false</center></td>
      <td>
        Dovecot protection <b>enabled</b> (default)
        <ul>
          <li>PAM-based module</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><center>true</center></td>
      <td><center>true</center></td>
      <td>
        Dovecot protection <b>enabled</b>
        <ul>
          <li>Native module ON</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

The following commands can be used to control the Dovecot native module:

Enable:
```
# imunify360-agent config update '{"PAM": {"exim_dovecot_native": true}}'
```
Disable (default):
```
# imunify360-agent config update '{"PAM": {"exim_dovecot_native": false}}'
```



## Notifications

Starting from version 4.10, an administrator is able to configure email addresses to submit reports and execute custom scripts. Go to <span class="notranslate">_Settings_</span> and choose <span class="notranslate">_Notifications_</span> tab.

![](/images/notifications.png)

* <span class="notranslate">**Default admin emails**</span>: specify the default list of emails used for all enabled admin email notifications. 
* <span class="notranslate">**From**</span>: specify a sender of all emails sent by the Hooks. 

The following events are available.

#### Real-Time scan: malware detected

Occurs when malware is detected during the real-time scanning.

![](/images/RealTimeScanDetected.png)

* <span class="notranslate">**Enable email notifications for admin**</span>: move the slider to <span class="notranslate">ON</span> to notify the administrator and a custom user list via email upon event occurrence. To notify the administrator on the default admin email, tick the <span class="notranslate">_Default admin emails_</span> checkbox. 
* <span class="notranslate">**Notify every (mins)**</span>: set a notification interval in minutes. The data for all events that happened within the interval will be accumulated and sent altogether.
* <span class="notranslate">**Admin emails**</span>: tick the <span class="notranslate">_Default admin emails_</span> and/or specify your emails for notifications.
* <span class="notranslate">**Enable script execution**</span>: move the slide to <span class="notranslate">ON</span> to run a script (event handler) upon event occurrence. 
* <span class="notranslate">**Notify every (sec)**</span>: set a notification interval in seconds. The data for all events that happened within the interval will be accumulated and sent altogether. 
* <span class="notranslate">**Run a script**</span>: specify the full path to the script(s) or any other Linux executable to be launched on event occurrence. Make sure that the script has an executable bit (+x) on. A line-separated list of scripts is supported. 

#### User scan: started

Occurs immediately after the user scanning has started.

![](/images/UserScanStarted.png)


#### Custom scan: started

![](/images/CustomScanStarted.png)

Occurs immediately after on-demand (manual) scanning has started.


#### User scan: finished

Occurs immediately after the user scanning has finished, regardless the malware has found or not.

![](/images/UserScanFinished.png)

#### Custom scan: finished

![](/images/CustomScanFinished.png)

Occurs immediately after on-demand (manual) scanning has finished, regardless the malware has found or not.


#### Custom scan: malware detected

Occurs when the on-demand scanning process has finished and malware found.

![](/images/CustomScanDetected.png)


#### User scan: malware detected

Occurs when the malware scanning process of a user account has finished and malware found.

![](/images/UserScanDetected.png)


#### Script blocked

Occurs when the Proactive Defense has blocked malicious script.

![](/images/ScriptBlocked.png)

Click <span class="notranslate">_Save changes_</span> at the bottom to apply all changes.


## Malware Database Scanner (MDS)

<span class="notranslate">Malware Database Scanner (MDS)</span> is designed to solve all malware related problems in the database.

:::tip Note
Version Imunify360 6.0 or later supports the use of MDS in UI.
:::

:::danger Warning
For now, Malware Database Scanner (MDS) supports WordPress, Joomla, and Magento 2 databases only.
:::

### How to use Malware Database Scanner (MDS)

To provide safe work with database MDS supports several methods:

* <span class="notranslate">`--scan`</span> - only scan the database, no changes will be applied
* <span class="notranslate">`--clean`</span> - scan database and clean-up malicious
* <span class="notranslate">`--restore`</span> - restore data affected by clean-up from the backup CSV file

:::tip Note
“Clean” operation includes “scan”, so you don’t need to run a scan before the cleanup. Whereas the “scan” can be used for non-disruptive checks of the database. Cleanup mode creates a backup file that can be used to rollback all changes back. It makes MDS safe to use and prevents websites from breaking and data loss.
:::

The easiest way to use MDS is to run it with  <span class="notranslate">`--search-configs`</span> argument: MDS will try to find the config files and print out database credentials that should be later specified for scanning. 

<span class="notranslate">`--creds-from-xargs`</span> argument can be used to run MDS without a need to manually enter credentials. It allows automating the process of credentials discovery and the scan process.

#### Usage

<div class="notranslate">

```
/opt/ai-bolit/wrapper /opt/ai-bolit/imunify_dbscan.php [OPTIONS] [PATH]
```
</div>

**Options**

| | |
|-|-|
|<span class="notranslate">`--host=<host>`</span>|Database host|
|<span class="notranslate">`--port=<port>`</span>|Database port|
|<span class="notranslate">`--login=<username>`</span>|Database username|
|<span class="notranslate">`--password=<password>`</span>|Database password|
|<span class="notranslate">`--password-from-stdin`</span>|Get database password from stdin|
|<span class="notranslate">`--database=<db_name>`</span>|Database name|
|<span class="notranslate">`--prefix=<prefix>`</span>|Prefix for table|
|<span class="notranslate">`--scan`</span>|Do scan|
|<span class="notranslate">`--clean`</span>|Do clean|
|<span class="notranslate">`--search-configs`</span>|Find the config files and print out database credentials|
|<span class="notranslate">`--creds-from-xargs`</span>|Discover credentials and do scan|
|<span class="notranslate">`--report-file=<filepath>`</span>|Filepath where to put the report|
|<span class="notranslate">`--signature-db=<filepath>`</span>|Filepath with signatures|
|<span class="notranslate">`--progress=<filepath>`</span>|Filepath with progress|
|<span class="notranslate">`--shared-mem-progress=<shmem_id>`</span>|ID of shared memory segment|
|<span class="notranslate">`--create-shared-mem`</span>|MDS create own shared memory segment|
|<span class="notranslate">`--status=<filepath>`</span>|Filepath with status for control task|
|<span class="notranslate">`--avdb=<filepath>`</span>|Filepath with ai-bolit signatures database|
|<span class="notranslate">`--procudb=<filepath>`</span>|Filepath with procu signatures database|
|<span class="notranslate">`--state-file=<filepath>`</span>|Filepath with info about state (content: <span class="notranslate">`new`/`working`/`done`/`canceled`</span>). You can change it on <span class="notranslate">`canceled`</span>.|
|<span class="notranslate">`--restore=<filepath>`</span>|Filepath to restore CSV file|
|<span class="notranslate">`-h, --help`</span>|Display this help and exit|
|<span class="notranslate">`-v, --version`</span>|Show version|

#### Example of usage

#### Scan database

<div class="notranslate">

```
# /opt/ai-bolit/wrapper /opt/ai-bolit/imunify_dbscan.php --port=3306 --login=user --password-from-stdin --database=$DATABASE --avdb=/var/imunify360/files/sigs/v1/aibolit/mds-ai-bolit-hoster.db --report-file=`pwd`/report.json --scan
```
</div>

Scan results will be stored in the <span class="notranslate">`report.json`</span>.

#### Scan & Clean-up database

<div class="notranslate">

```
#  /opt/ai-bolit/wrapper /opt/ai-bolit/imunify_dbscan.php --port=3306 --login=user --password-from-stdin --database=$DATABASE --avdb=/var/imunify360/files/sigs/v1/aibolit/mds-ai-bolit-hoster.db --procudb=/var/imunify360/files/sigs/v1/aibolit/mds-procu2.db --report-file=`pwd`/report.json --clean
```
</div>

Cleanup results will be stored in the <span class="notranslate">`results.json`</span>. Also, backup of the affected data will be created with a filename similar to the <span class="notranslate">`mds_backup_1597223818.csv`</span>.


#### Undo changes (restore)

<div class="notranslate">

```
# /opt/ai-bolit/wrapper /opt/ai-bolit/imunify_dbscan.php --port=3306 --login=user --password-from-stdin --database=$DATABASE --report-file=$REPORT --restore=`pwd`/mds_backup_1597223818.csv
```
</div>




## Detect Admin Tools

Imunify360 can automatically detect admin tools (such as Adminer or TinyFileManager) uploaded to user folders and treat them as malicious. When detected, these files will be zeroed for security.

**Default:** Enabled

### How to enable or disable

To enable the feature via CLI:

```
imunify360-agent config update '{"MALWARE_SCANNING": {"detect_admin_tools": true}}'
```

To disable the feature via CLI:

```
imunify360-agent config update '{"MALWARE_SCANNING": {"detect_admin_tools": false}}'
```



## Webshield


:::warning Warning
When the interface IP address is added to or deleted from the system, the restart of the webshield is required for the latter to recognize the new IP.
:::

<div class="notranslate">

```
service imunify360-webshield restart
```
</div>


### Greylist and Anti-Bot Challenge

The Greylist is a feature intended to distinguish human from machine input and protect websites from the spam and different types of automated abuse.

:::warning Warning
Please note that the WebShield Anti-Bot Challenge is not compatible with aggressive CDN caching modes, like Cloudflare "Browser Cache TTL" or "cache everything" with "Edge Cache TTL". If the Сaptcha page is cached by CDN, a visitor will see the Anti-Bot challenge from CDN cache disregarding it has been passed or not. In order to fix that, either disable the aggressive CDN caching or the Anti-Bot Challenge functionality in the Imunify360.
:::

::: tip Note: Handling Non-Text Requests for Greylisted IPs
When a source IP address is added to the Greylist, WebShield typically presents an HTML-based Anti-Bot Challenge page (splashscreen) to verify the user. However, displaying this HTML page is not appropriate for requests explicitly asking for non-text content types.

For requests from greylisted IPs, if the `Accept` header is present and does not start with `text/` (this includes headers like `Accept: application/json` or `Accept: */*`), WebShield returns an **HTTP 415 Unsupported Media Type** error instead of the HTML challenge page, as the challenge is unsuitable for non-text responses.

**Workarounds:**
If legitimate traffic is being blocked with a 415 error due to this behavior, consider the following:
* **Adjust the Client's Request:** Modify the application or client making the request to send a more specific `Accept` header (like `text/html`) or omit the `Accept` header entirely if appropriate for the expected response.
* **Whitelist the Source IP:** Add the source IP address to the Imunify360 Whitelist to prevent it from being greylisted.
:::

There are two layers in GreyList behavior:

1. If a user of a website is added to the <span class="notranslate">Grey List</span> (the access is blocked), then the GreyList behavior allows him to unblock himself. When he tries to get to the website he receives the JS challenge. If the challenge is solved by the browser successfully (a human user is not required to go through human confirmation - the process will pass under the hood), a user is redirected to the website, which means that the access is unblocked and the IP address of this user is removed from the <span class="notranslate">Grey List</span>.

2. The GreyList behavior is always on guard of the websites and checks the activity of each IP, constantly adding suspicious IPs to the global GreyList. 

### CDN Support
	
Imunify360 correctly greylists and blocks IPs behind Cloudflare and other CDNs (see [here](/features/#supported-cdn-providers) for the full list).
	
Imunify360 passes all requests from CDN through <span class="notranslate">WebShield</span>, and uses <span class="notranslate">CF-Connecting-IP</span> and <span class="notranslate">X-Forwarded-For</span> headers to identify real IPs.
	
To enable it now, run the command:
	
<div class="notranslate">

```
imunify360-agent config update '{"WEBSHIELD": {"known_proxies_support": true}}'
```

</div>

::: tip Note
If you are using cPanel/EasyApache3, Imunify360 will not automatically deploy _mod_remoteip_, and log files will show local server IP for visitors coming from CDN. EasyApache 3 is EOL since December 2018, and we don't plan to add automated _mod_remoteip_ setup and configuration for it.
:::
:::tip Note
For cPanel/EasyApache 4, Plesk, DirectAdmin and LiteSpeed _mod_remoteip_ will be automatically installed and configured.
:::
	
#### Supported CDN providers:

* Cloudflare
* MaxCDN
* StackPath CDN
* KeyCDN
* Dartspeed.com
* QUIC.cloud CDN
* NuCDN
* Google CDN
* CloudFront CDN
* GoCache CDN
* Opera
* QUANTIL
* BunnyCDN
* Sucuri WAF
* Ezoic
* Fastly
* OGO CDN

#### How to trust all IPs that are specified by Ezoic CDN

The “trust_ezoic” option for WebShield allows you to trust all IPs that are specified by Ezoic CDN as their own servers. By default the option is switched off, but it can be switched on in a straightforward way. Be aware when using this option, at this moment the list of Ezoic CDN servers is quite big and includes ranges that can be controlled by someone else in Amazon EC2.

To enable it, open the `/etc/imunify360-webshield/virtserver.conf` file, find the directive set

<div class="notranslate">

```
$trust_ezoic 0;
```
</div>

replace `0` with `1`, save the file and restart WebShield, using the following command: 

<div class="notranslate">

```
# service imunify360-webshield restart
```
</div>

#### How to block attacks from a particular country in WebShield

Country blocking is available in both [Admin UI](/dashboard/#black-list) and [CLI](/command_line_interface/#blacklist)


### Using Cloudflare “Edge Cache TTL“, “Cache Everything”, and “Browser Cache TTL” with Imunify360

According to the [Cloudflare documentation](https://developers.cloudflare.com/support/page-rules/understanding-and-configuring-cloudflare-page-rules-page-rules-tutorial/#summary-of-page-rules-settings), **Cache Everything** with **Edge Cache TTL** enabled makes Cloudflare ignore all origin cache-related headers (see attached screenshots) which in the past, caused issues by custom cache settings in the Cloudflare control panel resulting in the inability to pass the Anti-Bot Challenge causing an endless loop:

![](/images/new_cache_everything.png)

::: tip Quote:
Level **“Cache Everything”** – Treats all content as static and caches all file types beyond the [Cloudflare default cached content](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/). Respects cache headers from the origin web server unless **Edge Cache TTL** is also set in the Page Rule. When combined with an **Edge Cache TTL** > 0, **Cache Everything** removes cookies from the origin web server response.
:::

Setting Edge Cache TTL along with the Cache Everything option is not recommended.

Similarly, [Browser Cache TTL](https://developers.cloudflare.com/cache/how-to/edge-browser-cache-ttl/#browser-cache-ttl) overrides the original `Cache-Control` and `Expires` headers served to the browser. We recommend setting it to "Respect Existing Header".

Instead consider using [Cache Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/settings/#edge-ttl), that respect cache headers of the origin response, as shown on the screenshot below:
![](/images/new_cache_control.png)

### Anti-bot protection


Starting from version 5.6, Imunify360 distinguishes bots from real visitors using the Anti-Bot Challenge. Most bots don’t solve the challenge, and their requests will not reach web applications such as WordPress, Drupal, and others. This can save the server’s resources and protects websites from scanners, automated attacks, and web-spammers.

Only bad actors will be redirected to the Imunify360 <span class="notranslate">Anti-Bot Challenge</span> page. Legitimate visitors get original content without any verification page nor any delay. Cookies and JavaScript support are required in a browser to successfully pass the challenge of <span class="notranslate">Anti-bot protection</span>.

The “Anti-bot protection” feature will not block legitimate bots (e.g., Google crawler).

You can enable <span class="notranslate">Anti-bot protection</span>, in the UI. Go to the <span class="notranslate">General</span> tab -> <span class="notranslate">Settings</span> and check the <span class="notranslate">Anti-bot protection</span> checkbox. You can find the details [here](/dashboard/#anti-bot-protection).

Or via CLI. To do so, run the following command:

<div class="notranslate">

```
# imunify360-agent config update '{"WEBSHIELD": {"splash_screen": true}}'
```
</div>

#### cPanel account protection

Starting from v7.1, Imunify360 includes the extended the well-established [Anti-bot protection](/features/#anti-bot-protection) functionality to cPanel to ensure that users are protected from bot attacks. All users trying to log in to cPanel will face up with the “Anti-Bot Challenge”. 

Most bots are unable to solve the challenge, and their requests will not reach the cPanel login page. All users using regular browsers may pass the challenge automatically. After passing the Anti-Bot challenge, a user receives a cookie for 24 hours and does not need to pass it again for the whole session. 

As bots and other automation are not supposed to pass the challenge, all legitimate automation should be [whitelisted by IPs](/command_line_interface/#whitelist).

The feature is switched off by default. To switch the feature on, use the following CLI command:
```
# imunify360-agent config update '{"WEBSHIELD":{"panel_protection":true}}'
```
To switch it off:
```
# imunify360-agent config update '{"WEBSHIELD":{"panel_protection":false}}'
```

:::warning Note
1. You can find WebShield and Anti-bot related logs in the **/var/log/imunify360-webshield** directory.
2. The feature works with the standard cPanel ports (2082, 2083). _Contact Support if you have a non-standard cPanel ports configuration or need the feature for other ports._
:::

<!-- ## How to write custom code on WebShield

Starting from Imunify360 v.5.7, users can change WebShield configuration by creating custom configuration files, which will be included in general config once WebShield will start.

To enable it, open the `/etc/imunify360-webshield/virtserver.conf` file, find the directive `set $trust_ezoic 0;`.

Replace `0` with `1`, save the file and restart WebShield by running the following command:

<div class="notranslate">

```
# service imunify360-webshield restart
```
</div>

Example of the code on Lua:

<div class="notranslate">

```lua
header_filter_by_lua_block {
   local args = ngx.var.query_string
   if args == nil then
       if ngx.req.get_method() == 'GET' then ngx.header.set_cookie = nil
end
}
```
</div>

### How to disable a specific request method

Following is an example of customizing WebShield by disabling a specific request method.

In the example the <span class="notranslate">`OPTIONS`</span> method is disabled.

1. Place the following code into the <span class="notranslate">`/etc/imunify360-webshield/webshield-captcha.conf.d/no-options.conf`</span>
   <div class="notranslate">

   ```lua
   if ($request_method = OPTIONS) {
      return 403;
   }
   ```
   </div>
2. Restart WebShield by running the following command:
   <div class="notranslate">

   ```
   service imunify360-webshield restart
   ```
   </div>
3. Check that the <span class="notranslate">`OPTIONS`</span> method is disabled correctly by running the following command:
   <div class="notranslate">

   ```
   curl -i -X OPTIONS http://[server IP]:52224
   ```
   </div>

   You should get the following status code:
   <div class="notranslate">

   ```
   HTTP/1.1 403 Forbidden
   ```
   </div>
-->

### Special flags

#### Prevent endless loop in Anti-Bot Challenge

In some very rare cases Anti-Bot Challenge falls into an endless loop, preventing the browser from redirect to the originally requested URL. The reason is too aggressive web page caching. To fix that, follow the steps below:

* Open config <span class="notranslate">`/etc/imunify360-wafd/wafd.conf`</span> for editing.
* Put the option <span class="notranslate">`append_random_query=yes`</span> and save changes.
* Reload systemd unit: <span class="notranslate">`systemctl reload imunify360-wafd`</span>

After that a random argument will be appended to every URL. Possible downside of this change is some sites and web applications have strict URL arguments validation and may not work properly.

## Overridable config

Starting from Imunify360 v.5.8, we introduce the overridable config which provides the ability to provision default config for the whole fleet of Imunify servers and keep the ability for fine-tuning each particular server depending on its requirements.

**Configs organization**:

* A new directory for custom configs. The local overrides of Imunify360 config are put there: <span class="notranslate">`/etc/sysconfig/imunify360/imunify360.config.d/`</span>
* The old config <span class="notranslate">`/etc/sysconfig/imunify360/imunify360.config`</span> is now linked to the <span class="notranslate">`imunify360.config.d/90-local.config`</span>. It contains changes made through UI as well as through CLI.
* Default Imunify360 configuration is written at `imunify360.config.defaults.example`. Modifying this config won't affect config merging behavior in any way, so please refrain from changing it.
* Configs in that directory will override the <span class="notranslate">`imunify360.config.defaults.example`</span> and each other in lexical order. First-level "sections" (such as <span class="notranslate">`FIREWALL`</span>) are merged, while second-level "options" (such as <span class="notranslate">`FIREWALL.TCP_IN_IPv4`</span>) are replaced completely.
* <span class="notranslate">`imunify360.config.d/10_on_first_install.config`</span> is a config that is supplied by Imunify360. Its purpose is to let us - Imunify360 developers - enable new features only on new installations without forcing existing installation to see new feature enabled on the update. This config should not be modified manually.

:::tip Note
The config file named starting from 90 and later will override values set via UI or CLI.
:::

:::danger Warning
Ensure you are using the correct order for your config files to be allocated:
```
100-host_custom.config # custom config that would not override the main one due to the lexicographic naming
101-xmlrpc.config # custom config that contains settings that also will not override the config 90-local* and so on
90-local.config -> ../imunify360.config # contains settings configured via the UI/CLI
95-host-TCPPORTS.config # will override 90-local*
96-host-UDPPORTS.config # will override the above loaded
```

Below is an example of the **INCORRECT** assumption of the config loading order:
```
90-local.config -> ../imunify360.config
95-host-TCPPORTS.config
96-host-UDPPORTS.config
100-host_custom.config
101-xmlrpc.config
```
:::

:::danger Upon the config changes, no Imunify services restart is needed.
You may verify the changes in `/etc/sysconfig/imunify360/imunify360-merged.config`.
:::

This way you can keep your local customizations, and still be able to rollout your main config. 

The following CLI command can be used to check current server configuration:

<div class="notranslate">

```
imunify360-agent config show
```
</div>
	
Current server configuration is also present at <span class="notranslate">`/etc/sysconfig/imunify360/imunify360-merged.config`</span> path.
	
The following CLI command:

<div class="notranslate">

```
imunify360-agent config show defaults
```
</div>
	
can be used to check server configuration in the following states:

- <span class="notranslate">`mutable_config`</span> represents config state before applying <span class="notranslate">`imunify360.config.d/90-local.config`</span>,
- <span class="notranslate">`local_config`</span> represents parsed <span class="notranslate">`imunify360.config.d/90-local.config`</span> config,
- <span class="notranslate">`immutable_config`</span> represents merged configs which come after <span class="notranslate">`imunify360.config.d/90-local.config`</span> in lexical order.
	
Here is an example of custom server configuration:

| | |
|-|-|
|<span class="notranslate">`imunify360.config.defaults.example`</span><br><br>Provided by Imunify installation. Contains default recommended configuration|<span class="notranslate">`FIREWALL:`</span><br><span class="notranslate">`TCP_IN_IPv4:`</span><br>`- '20'`<br>`- '8880'`<br><span class="notranslate">`port_blocking_mode: ALLOW`</span>|
|<span class="notranslate">`imunify360.config.d/50-common.config`</span><br><br>Provisioned by server owner to the fleet of servers.|<span class="notranslate">`FIREWALL:`</span><br><span class="notranslate">`TCP_IN_IPv4:`</span><br>`- '20'`<br>`- '21'`<br><span class="notranslate">`port_blocking_mode: DENY`</span>|
|<span class="notranslate">`imunify360.config.d/90-local.config`</span><br><br>Contains local customization per server individually.|<span class="notranslate">`FIREWALL:`</span><br><span class="notranslate">`TCP_IN_IPv4:`</span><br>`- '20'`<br>`- '22'`<br>`- '12345'`|

The resulting (merged) configuration will look like this:

<div class="notranslate">

```
FIREWALL:
  TCP_IN_IPv4:
  - '20'
  - '22'
  - '12345'
  port_blocking_mode: DENY
```
</div>

The mechanics is as follows: first-level "sections" - for example <span class="notranslate">`FIREWALL`</span> are merged, while second-level "options" - for example <span class="notranslate">`FIREWALL.TCP_IN_IPv4`</span> are replaced completely. 

Those who don’t need this type of overridable configs can continue using custom configurations in the <span class="notranslate">`/etc/sysconfig/imunify360/imunify360.config`</span>.

This feature is backward compatible.

## Performance Tuning for High-Traffic Environments

By default webshield uses one worker, which is suitable for most cases and maintains a balance between resource consumption and performance. However, for high-load environments this might not be sufficient. To increase the number of workers, create a file with `.conf` extension in `/etc/imunify360-webshield/webshield-main.conf.d` folder, for instance, `/etc/imunify360-webshield/webshield-main.conf.d/tuning.conf` with the following content:
<div class="notranslate">

```
worker_processes auto;
```
</div>

:::warning Warning
Make sure to keep the trailing semicolon.
:::

Value `auto` seems to be a reasonable choice, as it will try to autodetect the number of CPU cores and set the value according to the number. Instead of `auto` you can set the number you find reasonable (typical value 2-8). After the file was created, reload webshield configuration with:

<div class="notranslate">

```
# service imunify360-webshield reload
```
</div>

To make sure that the changes took effect, the following command can be used:

<div class="notranslate">

```
ps aux | grep im360
```
</div>


## Scan of the system and user crontab files for malicious jobs <Badge text="Experimental" type="note"/>

On the web server, the user’s Crontab files are notoriously tricky to maintain secure because of specific format and various placement of the files outside of users’ home directories depending on specific OS and platform, which makes them a compelling target for malicious actors.

This feature detects any Crontab infection among the files that are owned by users of the server for every role that has access to run the scans on that server. 

The feature is available as experimental starting from Imunify360 version 6.10 and switched off by default.

The setting `MALWARE_SCANNING.crontabs` allows you to enable or disable scan of the system and user crontab files for malicious jobs. 

Manage it through CLI:

To switch it on:

```
# imunify360-agent config update '{"MALWARE_SCANNING": {"crontabs": true}}' 
```

And to switch it off:

```
# imunify360-agent config update '{"MALWARE_SCANNING": {"crontabs": false}}'
```



## Hooks <Badge text="Deprecated" type="warning"/>

You can use a new notification system via [CLI](/command_line_interface/#notifications-config) and [UI](/features/#notifications).

### Overview

Hooks are introduced as a script-based interface for various application events. This is a simple and effective way to automate Imunify360 alerts and event processing.
For example, an administrator can have Imunify360 calling his own script when malicious files are detected or misconfigurations are detected and perform a custom processing or specific actions, for example, create a ticket.
Hooks are available only via CLI.

#### Requirements

* You can use any programming language to create a hook script
* A hook script should be executable
* For Native hooks, you should use Python 3.5 only

### How to start using hooks

Start using hooks with three simple steps:

1) Create a script to handle an event (a hook handler):

   * you can use our [scripts example](/features/#structure-and-examples-of-a-hook-script) as a template
   * [the following events are available](/features/#available-events-and-their-parameters)

2) Register your hook handler in Imunify360 agent - use registration command:

<div class="notranslate">

```
imunify360-agent hook add --event <event name> --path </path/to/hook_script>
```

</div>

3) Once the event added - check results and the [log file](/features/#log-file)

### Available events and their parameters

#### agent

* subtype ( started | misconfig )
  * started - the event is generated each time the Imunify agent is started/restarted
    * params[]
      * version / string / version of agent

    <div class="notranslate">

    ```
    {"version": "4.6.2-2"}
    ```

    </div>

  * misconfig - the event is generated when the agent detects agent misconfiguration / broken settings / etc.
    * params[]
      * error / string / error message where / what type of misconfiguration was detected and some details

    <div class="notranslate">

    ```
    {
    "error": "ValidationError({'SMTP_BLOCKING': [{'allow_groups': ['must be of list type']}]},)"
    }
    ```

    </div>

#### malware-scanning

* subtype ( started | finished )


  * **started** - the event is generated when the malware scanning process is started (for on-demand and background scans only, yet not the ftp / waf / inotify)

    * params[]
      * scan_id / string / identifier of running scan
      * path / string / path that’s scanning
      * started / int / unixtime when scan started
      * scan_type / string / type of scanning (“on-demand”, “background”, “ftp”, “rescan“)
      * scan_params[]  / initial scanning params
        * file_patterns / string / file mask to scan
        * exclude_patterns / string / file mask to ignore
        * follow_symlinks / boolean / shall scanner follow symlinks
        * intensity_cpu / int / intensity for cpu operations (from 1 to 7)
        * intensity_io / int / intensity for IO operations (from 1 to 7)
        * intensity_ram / int / amount of memory allocated to the scan process in MB

    <div class="notranslate">

    ```
    {
        "scan_id": "dc3c6061c572410a83be19d153809df1",
        "home": "/home/a/abdhf/",
        "user": "abdhf",
        "type": "background",
        "scan_params": {
            "file_patterns": "*",
            "exclude_patterns": null,
            "follow_symlinks": true,
            "intensity_cpu": 2
            "intensity_io": 2
            "intensity_ram": 2048
        }
    }
    ```

    </div>

  * **finished** - the event is generated when the malware scanning process is finished (for on-demand and background scans only, yet not the ftp / waf / inotify)

    * params[]
      * scan_id / string / identifier of running scan
      * path / string / path that’s scanned
      * started / int / unixtime when scan started
      * scan_type / string / type of scanning (“on-demand”, “background”, “ftp”, “rescan“)
      * total_files / int / total number of files that were scanned
      * total_malicious / int / number of detected malicious files
      * error / string / error message if any occurred during scanning
      * status / string / status of scan (“ok”, “failed”)
      * users[] / string array/ user that’s scanned
      * scan_params[]  / initial scanning params
        * file_patterns / string / file mask to scan
        * exclude_patterns / string / file mask to ignore
        * follow_symlinks / boolean / shall scanner follow symlinks
        * intensity_cpu / int / intensity for cpu operations (from 1 to 7)
        * intensity_io / int / intensity for IO operations (from 1 to 7)
        * intensity_ram / int / amount of memory allocated to the scan process in MB

    <div class="notranslate">

    ```
    {
        "scan_id": "dc3c6061c572410a83be19d153809df1",
        "path": "/home/a/abdhf/",
        "started": 1587365282,
        "scan_type": "background",
        "total_files": 873535,
        "total_malicious": 345,
        "error": null,
        "status": "ok",
        "users": ["abdhf"],
        "scan_params": {
            "file_patterns": "*",
            "exclude_patterns": null,
            "follow_symlinks": true,
            "intensity_cpu": 2
            "intensity_io": 2
            "intensity_ram": 2048
        }
    }
    ```

    </div>



#### malware-detected

* subtype ( critical )
  * **critical**

    * params[]
      * scan_id / string / unique id of the scan
      * scan_type / string / type of scanning (“on-demand”, “background”, “ftp”, “rescan“)
      * error / string / error message if any occurred during scanning
      * started / int / unixtime when the scan was started
      * path / string / path that was scanned
      * users[] / string array / users that have been scanned (if any)
      * total_files / int / number of files checked within the last scanning
      * total_malicious / int / number of detected malicious files
      * tmp_filename / string / path to a temporary file with a list of detected threads. The list of threads is in the format of the following command: <span class="notranslate"> `imunify360-agent malware malicious list --by-scan-id=... --json` </span>

    <div class="notranslate">

    ```
    {
        "scan_id": "dc3c6061c572410a83be19d153809df1",
        "scan_type": "on-demand",
        "path": "/home/a/abdhf/",
        "users": [
            "imunify",
            "u1"
        ],
        "started": 1587365282,
        "total_files": 873535,
        "total_malicious": 345,
        "error": null,
        "tmp_filename": "/var/imunify360/tmp/malware_detected_critical_sldkf2j.json"
    }
    ```

    ```
    [
        {
          "scan_id": "dc3c6061c572410a83be19d153809df1",
          "username": "imunify",
          "hash": "17c1dd3659578126a32701bb5eaccecc2a6d8307d8e392f5381b7273bfb8a89d",
          "size": "182",
          "cleaned_at": 1553762878.6882641,
          "extra_data": {


          },
          "malicious": true,
          "id": 32,
          "status": "cleanup_removed",
          "file": "/home/imunify/public_html/01102018_2.php",
          "type": "SMW-INJ-04174-bkdr",
          "scan_type": "on-demand",
          "created": 1553002672
        },
        {
          "scan_id": "dc3c6061c572410a83be19d153809df1",
          "username": "imunify",
          "hash": "04425f71ae6c3cd04f8a7f156aee57096dd658ce6321c92619a07e122d33bd32",
          "size": "12523",
          "cleaned_at": 1553762878.6882641,
          "extra_data": {


          },
          "malicious": true,
          "id": 33,
          "status": "cleanup_done",
          "file": "/home/imunify/public_html/22.js",
          "type": "SMW-INJ-04346-js.inj",
          "scan_type": "on-demand",
          "created": 1553002672
        },
    ...
    ]
    ```
    </div>


::: tip Note
All results can be saved in a temporary file before handler invocation and then remove the file after the event is being processed
:::

#### malware-cleanup

* subtype ( started | finished )

  * **started** - the event is generated when the malware cleanup process is started (for on-demand and background cleanup only, background auto-cleanup will be implemented later)
    * params[]
      * cleanup_id / string / unique id of the cleanup
      * started / int / unixtime when the cleanup was started
      * tmp_filename / string / path to a temporary file with a scanning report. The list is in the format of the following command: <span class="notranslate"> `imunify360-agent malware malicious list --by-scan-id=... --json` </span>. See malware-detected hook section for details.
      * total_files / int / number of files that were sent for cleanup

    <div class="notranslate">

    ```
    {
        "cleanup_id": "dc3c6061c572410a83be19d153809df1",
        "started": 1587365282,
        "total_files": 873535,
        "tmp_filename": "/var/imunify/tmp/hooks/tmp_02q648234692834698456728439587245.json",
    }
    ```

    </div>

  * **finished** - the event is generated when the malware scanning process is finished (for on-demand and background cleanup only, background auto-cleanup will be implemented later)
    * params[]
      * cleanup_id / string / identifier of running cleanup
      * started / int / unixtime when cleanup started
      * total_files / int / number of files that were sent for cleanup
      * total_cleaned / int / number of files that were successfully cleaned
      * tmp_filename / string / path to a temporary file with a list of results.
      * error / string / error message if any occurred during cleanup
      * status / string / status of scan (“ok”, “failed”)

    <div class="notranslate">

    ```
    {
        "cleanup_id": "dc3c6061c572410a83be19d153809df1",
        "started": 1587365282,
        "total_files": 873535,
        "total_cleaned": 872835,
        "tmp_filename": "/var/imunify/tmp/malware_cleanup_finished_slkj2f.json",
        "error": null,
        "status": "ok"
    }
    ```

    </div>


#### license

* subtype ( expiring | expired | renewed )

  * **expiring** - the event is generated when license is about to expire, the even should be sent 3 days prior to expiration
    * params[]
      * **exp_time** / int / unixtime data when the license expired

      <div class="notranslate">

      ```
      {"exp_time": 1587365282}
      ```
      </div>
  * **expired** - the event is generated when license has expired
    * params[]
      * **exp_time** / int / unixtime data when the license is expired
      
      <div class="notranslate">

      ```
      {"exp_time": 1587365282}
      ```
      </div>
  * **renewed** - the event is generated when the license is updated (renewed)
    * params[]
      * **exp_time** / int / unixtime data when the license will expire
      * **license** / string / license type

       <div class="notranslate">

      ```
      {
        "exp_time": 1587365282,
        "license": "imunify360"
      }
      ```
      </div>



### CLI

The following CLI command is used to manage hooks:

<div class="notranslate">

```
imunify360-agent hook [command] --event [event_name|all] [--path </path/to/hook_script>]
```

</div>

The following commands are supported:

* <span class="notranslate"> **add** </span> - register a new event handler
* <span class="notranslate"> **delete** </span> - unregister existing event handler
* <span class="notranslate"> **list** </span> - show existing event handlers
* <span class="notranslate"> **add-native** </span> - register a new native event handler

The third parameter <span class="notranslate"> _event_name_ </span> defines a particular event that invokes a registered handler as opposed to <span class="notranslate"> **all** </span> keyword.
The fourth parameter `/path/to/hook_script` shall contain a valid path to a handler of the event, it shall be any executable or Python Native event handlers that agent will run upon a registered event.

### Native

Native hook is a script written on Python 3.5 and allows to quickly process events. The Python file should contain only one method that customer would implement:

<div class="notranslate">

```
def im_hook(dict_param):
  …
  pass
```

</div>

where `dict_param` would hold the same data as JSON that non-Native hook would get.

### Log File

You can see all hook data in the log file. It is located at <span class="notranslate"> _/var/log/imunify360/hook.log_ </span> .
When the event comes, the data is recorded to the log file in the following format:

<div class="notranslate">

```
timestamp event : id : started [native:] name :  subtype : script_path
```

</div>

* <span class="notranslate"> **native** </span> is prepended for the Native hook implementation
* <span class="notranslate"> **id** </span> is a unique ID for each event

Once the listener is done, the data is recorded to the log file in the following format:

<div class="notranslate">

```
timestamp event : id : done [native:] script_path [OK|ERROR:code]
```

</div>

In case of an error, you can see the error code you have specified.

### Structure and examples of a hook script

Regular (non-native) hook:

<div class="notranslate">

```
#!/bin/bash

data=$(cat)

event=$(jq -r '.event' <<< ${data})
subtype=$(jq -r '.subtype' <<< ${data})

case ${event} in
    malware-scanning)
        case ${subtype} in
            started)
                # do stuff here
            ;;
            *)
                echo "Unhandled subtype: ${subtype}" 1>&2
                exit 1
        esac
        ;;
    *)
        echo "Unhandled event: ${event}/${subtype}" 1>&2
        exit 2
esac
```

</div>

Native hook:

<div class="notranslate">

```
def im_hook(dict_param):
   event = dict_param['event']
   subtype = dict_param['subtype']

   if event == 'malware-scanning':
       if subtype == 'started':
           # do stuff here
           pass
       elif subtype == 'finished':
           # do other stuff here
           pass
       else:
           raise Exception('Unhandled subtype {}'.format(subtype))
   else:
       raise Exception('Unhandled event {}'.format(event))
```

</div>

## Manual ModSec rules update management

Since v8.6.0 imunify360-firewall, we introduced a new way to control ModSecurity rules updates. Right now, it is possible to disable automatic updates and add the ability to manually choose the exact version of the rules.
To disable autoupdate, `disabled_types`  should be set to `["modsec-rules"]`, the default is an empty list (autoupdate enabled). 

```
FILES_UPDATE:
  disables_types: ["modsec-rules"]
  days_to_keep: 30
```
*`days_to_keep` - allows control over how long rules will be stored on disk; when expired, they will be automatically deleted.

In this mode, the Imunify agent downloads new rules, but does not apply them automatically.

To manage rules, we extended `imunify360-agent update modsec-rules` command:

1. Get a list of available rules `imunify360-agent update modsec-rules --list`

```
# example of output
$ imunify360-agent update modsec-rules --list
6.80 (latest)
6.79
6.78 (current)
```

2. Update to exact version `imunify360-agent update modsec-rules --version x.x`

This approach allows customers to set up test servers where they can check new rules and then update them on all servers when the tests pass.
