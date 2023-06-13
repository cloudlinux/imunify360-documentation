# Config File Description


ImunifyAV(+) config file is available on the following location after installation:

_/etc/sysconfig/imunify360/imunify360.config_

In the config file it is possible to set up ImunifyAV(+) configuration. The following options are available:

<table>
<tr>
<th colspan="2" align="left"><span class="notranslate">MALWARE_SCANNING:</span></th></tr>
<tr><td><span class="notranslate">max_signature_size_to_scan: 1048576</span></td>
<td># max file size to scan in the standard mode; value is set in bytes</td></tr>
<tr><td><span class="notranslate">max_cloudscan_size_to_scan: 10485760</span></td>
<td># max file size to scan in the cloud-assisted (by hashes) mode; value is set in bytes</td></tr>
<tr><td><span class="notranslate">max_mrs_upload_file: 10485760</span></td>
<td># max file size to upload to CloudLinux malware research service; value is set in bytes</td></tr>
<tr><td><span class="notranslate">detect_elf: False</span></td>
<td># enable (<span class="notranslate">True</span>) or disable (<span class="notranslate">False</span>) (default value) binary (ELF) malware detection</td></tr>
<tr><td><span class="notranslate">sends_file_for_analysis: True</span></td>
<td># send (<span class="notranslate">True</span>) (default value) or not (<span class="notranslate">False</span>) malicious and suspicious files to the Imunify team for analysis</td></tr>
<tr><td><span class="notranslate">cloud_assisted_scan: True</span></td>
<td># speed up scans by check file hashes using cloud database</td></tr>
<tr><td><span class="notranslate">rapid_scan: True</span></td>
<td># speeds up (<span class="notranslate">True</span>) (default value) ot not (<span class="notranslate">False</span>) repeated scans based on smart re-scan approach, local result caching and cloud-assisted scan.</td></tr>
<tr><td><span class="notranslate">rapid_scan_rescan_unchanging_files_frequency: null</span></td>
<td># defines what part of all files will be rescanned during each scan. For example, if set 10 then 1/10 part of all files will be rescanned. The default value `null` - means "choose frequency based on scan schedule". E.g. month - 1, week - 5, day - 10.</td></tr>
<tr><td><span class="notranslate">hyperscan: True</span></td>
<td># allows to use (True) the regex matching Hyperscan library in Malware Scanner to greatly improve the scanning speed. True is the default value. Hyperscan requires its own signatures set that will be downloaded from the files.imunify360.com and compiled locally.<br><b>Platform requirements</b>:<br>* Hyperscan supports Debian, Ubuntu and CentOS/CloudLinux 7 and later.<br>* SSE3 processor instructions support. It is quite common nowadays, but may be lacking in virtual environments or in some rather old servers.</td></tr>
<tr><td><span class="notranslate">crontabs: True</span></td>
<td># enable (<span class="notranslate">True</span>) scan of the system and user crontab files for malicious jobs. The default value is <span class="notranslate">True</span>.</td></tr>
<th colspan="2" align="left"><span class="notranslate">ERROR_REPORTING:</span></th></tr>
<tr><td><span class="notranslate">enable: True</span></td>
<td># automatically report errors to the Imunify team</td></tr>
<tr>
<th colspan="2" align="left"><span class="notranslate">MALWARE_SCAN_INTENSITY:</span></th></tr>
<tr><td><span class="notranslate">cpu: 2</span></td>
<td># intensity level for CPU consumption. Can be set from 1 to 7, default is 2</td></tr>
<tr><td><span class="notranslate">io: 2</span></td>
<td># intensity level for file operations. Can be set from 1 to 7, default is 2</td></tr>
<tr><td><span class="notranslate">ram: 2048</span></td>
<td># intensity level for RAM consumption. Minimum value is 1024, default is 2048</td></tr>
<tr>
<th colspan="2" align="left"><span class="notranslate">MALWARE_SCAN_SCHEDULE:</span></th></tr>
<tr><td><span class="notranslate">day_of_month: &lt;next day after installation&gt;</span></td>
<td># when the background scan shall start, day of the month. Can be from 1 to 31, the default value is the &lt;next day after installation&gt;.</td></tr>
<tr><td><span class="notranslate">day_of_week: 0</span></td>
<td># when the background scan shall start, day of the week. Can be from 0 to 7 (0 for Sunday, 1 for Monday..., 7 for Sunday (again)), the default value is 0</td></tr>
<tr><td><span class="notranslate">hour: 3</span></td>
<td># when the background scan shall start, hour. Can be from 0 to 23, the default value is 3</td></tr>
<tr><td><span class="notranslate">interval: MONTH</span></td>
<td># interval of scan. Supported values: strings <span class="notranslate">`NONE`</span> (no scan), <span class="notranslate">`DAY`</span>, <span class="notranslate">`WEEK`</span>, <span class="notranslate">`MONTH`</span>, the default value is <span class="notranslate">`MONTH`</span></td></tr>
<tr><th colspan="2" align="left"><span class="notranslate">MALWARE_CLEANUP:</span></th></tr>
<tr><td><span class="notranslate">trim_file_instead_of_removal: True</span></td>
<td># do not remove infected file during cleanup but make the file zero-size (for malwares like web-shells) (<span class="notranslate">True</span>) (default value)</td></tr>
<tr><td><span class="notranslate">keep_original_files_days: 14</span></td>
<td># the original infected file is available for restore within the defined period. The default is 14 days. The minimum value is one day.</td></tr>
<tr><th colspan="2" align="left"><span class="notranslate">ADMIN_CONTACTS:</span></th></tr>
<tr><td><span class="notranslate">emails: youremail@email.com</span></td>
<td># your email to receive reports about critical issues, security alerts or system misconfigurations detected on your servers.</td></tr>
<tr><td><span class="notranslate">enable_icontact_notifications: True</span></td>
<td># receive notifications about malicious activity detected (no more than once in 24h) and when malware scan was not performed for not more than once per week (once a week). Available for cPanel and cPanel-supported OSes. Default value is True.</td></tr>
<tr><th colspan="2" align="left"><span class="notranslate">PERMISSIONS:</span></th></tr>
<tr><td><span class="notranslate">support_form: True</span></td>
<td># show (<span class="notranslate">True</span>) (the default value) or hide (<span class="notranslate">False</span>) the Support icon in the ImunifyAV(+) UI.</td></tr>
<tr><td><span class="notranslate">user_ignore_list: True</span></td>
<td># show (<span class="notranslate">True</span>) (the default value) or hide (<span class="notranslate">False</span>) the Ignore List tab for end-users in the ImunifyAV(+) UI.</td></tr>
<tr><td><span class="notranslate">allow_malware_scan: False</span></td>
<td># enable (<span class="notranslate">True</span>) or disable (<span class="notranslate">False</span>) (the default value) “scan” action in the UI of the end-user.</td></tr>
<tr>
<td width="250px;"><span class="notranslate">upgrade_button: True</span></td><td># enable (<span class="notranslate">True</span> - the default value) or disable (<span class="notranslate">False</span>) the Imunify upgrade button.</td></tr>
<tr>
<th colspan="2" align="left"><span class="notranslate">RESOURCE_MANAGEMENT:</span></th></tr>
<tr><td><span class="notranslate">ram_limit: 500</span></td>
<td># set RAM consumption limit for ImunifyAV(+) in MB</td></tr>
<tr><td><span class="notranslate">io_limit: 2</span></td>
<td># set IO consumption limit for ImunifyAV(+) in MB</td></tr>
<tr><td><span class="notranslate">cpu_limit: 2</span></td>
<td># set CPU consumption limit for ImunifyAV(+) in MB.</td></tr>
</table>

## How to apply changes from CLI

In order to apply changes via command-line interface (CLI), you can use the following command:

<div class="notranslate">

```
imunify-antivirus config update '{"SECTION": {"parameter": value}}'
```
</div>

For example, if you want to set <span class="notranslate">`MALWARE_SCAN_INTENSITY.cpu = 5`</span> from a command line, then you should execute the following command:

<div class="notranslate">

```
imunify-antivirus config update '{"MALWARE_SCAN_INTENSITY": {"cpu": 5}}'
```
</div>

## Overridable config

Starting from ImunifyAV(+) v.5.8, we introduce the overridable config which provides the ability to provision default config for the whole fleet of Imunify servers and keep the ability for fine-tuning each particular server depending on its requirements.

**Configs organization**:

* A new directory for custom configs. The local overrides of the main config are put there: <span class="notranslate">`/etc/sysconfig/imunify360/imunify360.config.d/`</span>
* The old config <span class="notranslate">`/etc/sysconfig/imunify360/imunify360.config`</span> is now linked to the <span class="notranslate">`imunify360.config.d/90-local.config`</span>. It contains changes made through UI as well as through CLI.
* Configs in that directory will override the <span class="notranslate">`imunify360-base.config`</span> and each other in lexical order. First-level "sections" (like <span class="notranslate">`FIREWALL`</span>) are merged, while second-level "options" (like <span class="notranslate">`FIREWALL.TCP_IN_IPv4`</span>) are replaced completely.

This way you can keep your local customizations, but still be able to rollout the main config.

The CLI command to check the default configuration before merging with <span class="notranslate">`90-local.config`</span>:

<div class="notranslate">

```
imunify-antivirus config show defaults
```
</div>

Here is an example of custom server configuration:

| | |
|-|-|
|<span class="notranslate">`imunify360-base.config`</span><br><br>Provided by Imunify installation. Contains default recommended configuration|<span class="notranslate">`FIREWALL:`</span><br><span class="notranslate">`TCP_IN_IPv4:`</span><br>`- '20'`<br>`- '8880'`<br><span class="notranslate">`port_blocking_mode: ALLOW`</span>|
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

