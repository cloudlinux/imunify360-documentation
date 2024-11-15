# Config File Description


Imunify360 config file is available on the following location after installation:

<span class="notranslate">_/etc/sysconfig/imunify360/imunify360.config_</span>

In the config file it is possible to set up Imunify360 configuration. The following options are available: 

:::tip 
Note that if YAML is used, it accepts any format: `True`/`true`/`yes`/`y`, etc. However, the CLI uses JSON which is strict – only lowercase `true`/`false`. Thus, if you are using the `imunify360-agent` CLI tool to make changes to the configuration, make sure you are using the lowercase. 
:::

<table>
<tr>
<th colspan="2" align="left"><span class="notranslate">AUTO_WHITELIST:</span></th>
</tr>
<tr>
<td width="250px;"><span class="notranslate">timeout: 1440</span></td><td># set in minutes how long to keep automatically whitelisted IP</td></tr>
<tr><td><span class="notranslate">after_unblock_timeout: 1440</span></td><td>
# set in minutes for how long IP will be added to the <span class="notranslate">White List</span> after it passes Imunify360 Anti-bot challenge</td></tr>
<tr>
<th colspan="2" align="left"><span class="notranslate">DOS:</span></th>
</tr>
<tr>
<td width="250px;"><span class="notranslate">enabled: True</span></td><td># allows to enable (<span class="notranslate">True</span>, the default value) or disable (<span class="notranslate">False</span>) DOS detection</td></tr>
<tr><td><span class="notranslate">interval: 30</span></td><td># interval in seconds between DoS detection system activation</td></tr>
<tr><td><span class="notranslate">default_limit: 250</span></td><td># maximum default limit of connections from remote IP to local port before DoS protection will be triggered. Cannot be set lower than 100</td></tr>
<tr>
<td><span class="notranslate">port_limits:</span>
</td><td># allows to set limits per local port</td>
</tr>
<tr>
<td>80: 150
</td><td># limit on port 80 is set to 150 connections</td>
</tr>
<tr>
<th colspan="2" align="left"><span class="notranslate">ENHANCED_DOS:</span></th>
</tr>
<tr>
<td width="250px;"><span class="notranslate">enabled: True</span></td><td># allows to enable or disable (<span class="notranslate">False</span>) the Enhanced DOS protection</td></tr>
<tr><td><span class="notranslate">time_frame: 60</span></td><td># the default timeframe in seconds between the Enhanced DoS detection system activation</td></tr>
<tr><td><span class="notranslate">default_limit: 500</span></td><td># the threshold of requests (their number) from remote IP to local port before the Enhanced DoS protection will be triggered.</td></tr>
<tr>
<td><span class="notranslate">port_limits:</span>
</td><td># allows to set requests limits for different ports</td>
</tr>
<tr>
<td>80: 300
</td><td># limit on port 80 is set to 300 connections</td>
</tr>
<tr>
<th colspan="2" align="left"><span class="notranslate">FIREWALL:</span></th>
</tr>
<tr>
<td width="250px;"><span class="notranslate">port_blocking_mode: ALLOW</span></td><td># allows to set firewall port blocking mode.<br><br>
<b>ALLOW (default)</b> - allow all except specified.<br>
<b>DENY</b> - block all except specified.<br><br>
Exact ports and port-ranges to be allowed can be configured by the following fields in the config file:<br>
- FIREWALL.TCP_IN_IPv4<br>
- FIREWALL.TCP_OUT_IPv4<br>
- FIREWALL.UDP_IN_IPv4<br>
- FIREWALL.UDP_OUT_IPv4<br><br>
Changes of config files will be applied automatically. You don’t need to restart the server or Imunify360.<br><br>
<em><b>Please note, the feature doesn’t support IPv6 addresses at this moment and CSF needs to be disabled due to conflicts.</b></em></td></tr>
<tr>
<th colspan="2" align="left"><span class="notranslate">INCIDENT_LOGGING:</span></th>
</tr>
<tr>
<td width="250px;"><span class="notranslate">min_log_level: 4</span></td><td># minimum severity level for incidents displayed in UI. Please find the levels description <a href="/dashboard/#incidents-logging">here</a></td></tr>
<tr><td><span class="notranslate">num_days: 100</span></td><td># incidents older than <span class="notranslate"><em>num_days</em></span> are automatically deleted</td></tr>
<tr><td><span class="notranslate">limit: 100000</span></td><td># how many incidents should be stored in Imunify360 log file</td></tr>
<tr><td><span class="notranslate">ui_autorefresh_timeout: 10</span></td><td># set auto refresh time for incidents in user interface</td></tr>
<tr>
<th colspan="2" align="left"><span class="notranslate">LOGGER:</span></th>
</tr>
<tr>
<td width="250px;"><span class="notranslate">max_log_file_size: 62914560</span></td><td># defines the maximum size of the log file in bytes (default is 60 MB)</td></tr>
<tr>
<td width="250px;"><span class="notranslate">backup_count: 5</span></td><td># defines how many log files to store. If 5, it will store <span class="notranslate"><em>app.log</em>, <em>app.log.1</em></span>, and up to <span class="notranslate"><em>app.log.5</em></span>.</td></tr>
<tr>
<td width="250px;"><span class="notranslate">syscall_monitor: False</span></td>
<td>
  <p>Collect and report the source of suspicious actions using Syscall Monitor (<span class="notranslate">True</span>).</p>
  Supported operating systems:
  <ul>
    <li>CentOS 6/7</li>
    <li>CloudLinux OS 6/7.</li>
  </ul>
  Additional requirements:
  <ul>
    <li><b>auditd</b> needs to be installed</li>
    <li><b>auditsp</b> needs to be switched off.</li>
  </ul>
  <p>
    Imunify360 uses auditd to discover malicious cron jobs that are not detected by other methods yet and thus block them much faster.
  </p>
  <p>
    Additionally, it's also used for internal quality control and monitoring - e.g. if auditd records that PHP processes drop malware, but there are no related events/blocks from Proactive Defense, Imunify team receives an alert prompting an investigation.
  </p>
</td>
</tr>
<tr>
<th align="left"><span class="notranslate">MOD_SEC:</span></th>
<th align="left"><span class="notranslate"># defines ModSecurity settings</span></th>
</tr>
<tr>
<td width="250px;"><span class="notranslate">ruleset: FULL</span></td><td># defines what ruleset to use: <span class="notranslate">FULL</span> (default value) or <span class="notranslate">MINIMAL</span>. If the amount of RAM on the server is less than 2.1GB, the ruleset value is automatically set to <span class="notranslate">MINIMAL</span>.</td></tr>
<tr>
<td width="250px;"><span class="notranslate">cms_account_compromise_prevention: False</span></td><td># enables WordPress account brute-force protection. Default is False.</td></tr>
<tr>
<td width="250px;"><span class="notranslate">app_specific_ruleset: True</span></td><td># enables WAF Rules Auto-Configurator. Default is True.</td></tr>
<tr>
<td width="250px;"><span class="notranslate">prev_settings: </span></td><td># for internal usage, do not edit</td></tr>
<tr>
<th colspan="2" align="left"><span class="notranslate">MOD_SEC_BLOCK_BY_SEVERITY:</span></th></tr>
 <tr><td><span class="notranslate">enable: True</span></td><td># allows to enable or disable option that moves IPs to <span class="notranslate">Gray List</span> if the ModSecurity rule is triggered</td></tr>
<tr><td><span class="notranslate">max_incidents: 2</span></td><td># set a number of repeats of the ModSecurity incident from the same IP for adding it to <span class="notranslate">Gray List</span></td></tr>
<tr><td><span class="notranslate">denied_num_limit: 2</span></td>
<td># set a number of repeats of the ModSecurity incidents that got Access Denied error from the same IP for adding it to <span class="notranslate">Gray List</span></td></tr>
<tr><td><span class="notranslate">check_period: 120</span></td>
<td># set a period in seconds during which incident from the same IP will be recorded as a repeat</td></tr>
<tr><td><span class="notranslate">severity_limit: 2</span></td>
<td># set a level of severity for DOS detection sensitivity. <a href="/dashboard/#settings">Read more</a> about severity levels</td></tr>
<tr>
<th align="left"><span class="notranslate">MOD_SEC_BLOCK_BY_CUSTOM_RULE:</span></th><th  align="left"># this section allows to add custom configuration for blocking by ModSecurity incidents</th></tr>
<tr><td>33332:</td>
<td># set ModSecurity rule ID</td></tr>
<tr><td><span class="notranslate">check_period: 120</span></td>
<td># set a period in seconds during which incident from the same IP will be recorded as a repeat</td></tr>
<tr><td><span class="notranslate">max_incidents: 10</span></td>
<td># set a number of repeats of the ModSecurity incident from the same IP for adding it to <span class="notranslate">Gray List</span></td></tr>
<tr>
<th colspan="2" align="left"><span class="notranslate">MALWARE_SCANNING:</span></th></tr>
<tr><td><span class="notranslate">try_restore_from_backup_first: False</span></td>
<td># allows to enable (<span class="notranslate">True</span>) or disable (<span class="notranslate">False</span> – the default value) automatic malicious file restore from backup if a clean copy exists,
otherwise <span class="notranslate"><em>default_action</em></span> is applied</td></tr>
<tr><td><span class="notranslate">default_action: cleanup</span></td>
<td># default action on malicious file detected.<br>
Available options:
<ul>
<li><span class="notranslate"><b>notify</b></span> – just display in dashboard</li>
<li><span class="notranslate"><b>cleanup</b></span> – cleanup malicious file (default)</li></ul></td></tr>
<tr><td><span class="notranslate">enable_scan_inotify: True</span></td>
<td># enable (<span class="notranslate">True</span> (default)) or disable (<span class="notranslate">False</span>) real-time scanning for modified files using <a href="https://en.wikipedia.org/wiki/Inotify" target="_blank">inotify</a> library</td></tr>
<tr><td><span class="notranslate">enable_scan_pure_ftpd: True</span></td>
<td># enable (<span class="notranslate">True</span> (default)) or disable (<span class="notranslate">False</span>) real-time scanning for files uploaded through PureFTPd</td></tr>
<tr><td><span class="notranslate">enable_scan_modsec: True</span></td>
<td>#  enable (<span class="notranslate">True</span> (default) or disable (<span class="notranslate">False</span>) real-time scanning of all the files
that were uploaded via http/https. Note that it requires <a href="https://modsecurity.org" target="_blank">ModSecurity</a> to be installed</td></tr>
<tr><td><span class="notranslate">max_signature_size_to_scan: 1048576</span></td>
<td># max file size to scan in the standard mode; value is set in bytes</td></tr>
<tr><td><span class="notranslate">max_cloudscan_size_to_scan: 10485760</span></td>
<td># max file size to scan in the cloud-assisted (by hashes) mode; value is set in bytes</td></tr>
<tr><td><span class="notranslate">max_mrs_upload_file: 10485760</span></td>
<td># max file size to upload to CloudLinux malware research service; value is set in bytes</td></tr>
<tr><td><span class="notranslate">detect_elf: True</span></td>
<td># enable (<span class="notranslate">True</span>) (default value) or disable (<span class="notranslate">False</span>) binary (ELF) malware detection</td></tr>
<tr><td><span class="notranslate">notify_on_detect: False</span></td>
<td># notify (<span class="notranslate">True</span>) or not (<span class="notranslate">False</span>) (default value) an admin when malware is detected</td></tr>
<tr><td><span class="notranslate">optimize_realtime_scan: True</span></td>
<td># enable (<span class="notranslate">True</span>) (default value) or disable (<span class="notranslate">False</span>) the  <a href="https://docs.cloudlinux.com/cloudlinux_os_kernel/#file-change-api" target="_blank">File Change API</a> and <b>fanotify</b> support to reduce the system load while watching for file changes in comparison with inotify watch. You can find the comparison table <a href="/dashboard/#general-2">here</a></td></tr>
<tr><td><span class="notranslate">sends_file_for_analysis: True</span></td>
<td># send (<span class="notranslate">True</span>) (default value) or not (<span class="notranslate">False</span>) malicious and suspicious files to the Imunify team for analysis</td></tr>
<tr><td><span class="notranslate">i360_clamd: False</span></td>
<td># obsolete (not used)</td></tr>
<tr><td><span class="notranslate">show_clamav_results: False</span></td>
<td># obsolete (not used)</td></tr>
<tr><td><span class="notranslate">clamav_binary: True</span></td>
<td># obsolete (not used)</td></tr>
<tr><td><span class="notranslate">scan_modified_files: Null</span></td>
<td># enable (<span class="notranslate">True</span>) or disable (<span class="notranslate">False</span>) (default is not set). If disabled, it checks the file's timestamps (c/mtime) before scanning, and if the timestamp is not changed since the last scan, the file is skipped.
Scanner's behaviour is based on other scan optimizations, therefore it is better to rely on default values and UI, although this parameter provides an option to overwrite this behaviour. This option is not available within UI.</td></tr>
<tr><td><span class="notranslate">cloud_assisted_scan: True</span></td>
<td># speed up scans by check file hashes using cloud database</td></tr>
<tr><td><span class="notranslate">rapid_scan: True</span></td>
<td># speeds up (<span class="notranslate">True</span>) (default value) ot not (<span class="notranslate">False</span>) repeated scans based on smart re-scan approach, local result caching and cloud-assisted scan.</td></tr>
<tr><td><span class="notranslate">rapid_scan_rescan_unchanging_files_frequency: null</span></td>
<td># defines what part of all files will be rescanned during each scan. For example, if set 10 then 1/10 part of all files will be rescanned. The default value `null` - means "choose frequency based on scan schedule". E.g. month - 1, week - 5, day - 10.</td></tr>
<tr><td><span class="notranslate">hyperscan: True</span></td>
<td># allows to use (<span class="notranslate">True</span>) the regex matching Hyperscan library in Malware Scanner to greatly improve the scanning speed. <span class="notranslate">True</span> is the default value. Hyperscan requires its own signatures set that will be downloaded from the files.imunify360.com and compiled locally.<br><b>Platform requirements</b>:<br>* Hyperscan supports Debian, Ubuntu and CentOS/CloudLinux 7 and later.<br>* SSE3 processor instructions support. It is quite common nowadays, but may be lacking in virtual environments or in some rather old servers.</td></tr>
<tr><td><span class="notranslate">enable_scan_cpanel: False</span></td>
<td># enable (<span class="notranslate">True</span>) blocking malicious file uploads via cPanel File Manager. The default value is <span class="notranslate">False</span>. The type of operations processed are: edits and saves</td></tr>
<tr><td><span class="notranslate">crontabs: True</span></td>
<td># enable (<span class="notranslate">True</span>) scan of the system and user crontab files for malicious jobs. The default value is <span class="notranslate">True</span>.</td></tr>
<tr><td><span class="notranslate">db_timeout: 15</span></td>
<td># set the maximum time in seconds for connecting to or reading from a database during a scan/clean/restore operation.</td></tr>
<tr>
<th colspan="2" align="left"><span class="notranslate">CAPTCHA:</span></th></tr>
<tr><td><span class="notranslate">cert_refresh_timeout: 3600</span></td>
<td># set in seconds how often SSL certificate will be refreshed</td></tr>
<tr>
<th colspan="2" align="left"><span class="notranslate">CONTROL_PANEL:</span></th></tr>
<tr><td><span class="notranslate">compromised_user_password_reset: True</span></td>
<td># enables resetting passwords for compromised cPanel accounts. Upon activating this functionality, our platform will detect instances where a cPanel account password has been breached and will subsequently prevent access using the previous password. End-users will then be prompted to create a new password via the <a href="https://docs.cpanel.net/knowledge-base/security/how-to-reset-a-cpanel-account-password/" target="_blank">cPanel password reset process</a>.</td></tr>
<tr>
<th colspan="2" align="left"><span class="notranslate">ERROR_REPORTING:</span></th></tr>
<tr><td><span class="notranslate">enable: True</span></td>
<td># automatically report errors to imunify360 team</td></tr>
<tr>
<th colspan="2" align="left"><span class="notranslate">SEND_ADDITIONAL_DATA:</span></th></tr>
<tr><td><span class="notranslate">enable: True</span></td>
<td># send anonymized data from query string/post parameters and cookies. True is the default value.</td></tr>
<tr>
<th align="left"><span class="notranslate">NETWORK_INTERFACE:</span></th>
<th aligh="left"># manages for what network interfaces Imunify360 rules will be applied</th></tr>
<tr>
<td><span class="notranslate">eth_device: None</span></td>
<td># by default, Imunify360 will auto-configure iptables to filter all traffic. 
If you want iptables rules to be applied to a specific NIC only, list them here (e.g. <span class="notranslate">eth1</span>)</td></tr>
<tr><td><span class="notranslate">eth6_device: None</span></td>
<td># it is the same as <span class="notranslate"><em>eth_device</em></span>, but configures ip6tables to use specific device</td></tr>
<tr><td><span class="notranslate">eth_device_skip: []</span></td>
<td># if you don't want iptables\ip6tables rules to be applied to specific NICs, list them here (e.g <span class="notranslate">[eth1, eth2]</span>)</td></tr>
<tr>
<th colspan="2" align="left"><span class="notranslate">BACKUP_RESTORE:</span></th></tr>
<tr><td><span class="notranslate">max_days_in_backup: 90</span></td>
<td># restore from backup files that are not older than <span class="notranslate"><em>max_days_in_backup</em></span></td></tr>
<th colspan="2" align="left"><span class="notranslate">CAPTCHA_DOS:</span></th>
<tr><td><span class="notranslate">enabled: True</span></td>
<td># enable (<span class="notranslate">True</span> (default) or disable (<span class="notranslate">False</span>) Anti-bot Challenge Dos protection</td></tr>
<tr><td><span class="notranslate">time_frame: 21600</span></td>
<td># set a period in seconds during which requests to Anti-bot Challenge from the same IP
will be recorded as repeated</td></tr>
<tr><td><span class="notranslate">max_count: 100</span></td>
<td># set the maximum number of repeated Anti-bot Challenge requests after which IP is moved
to the Anti-bot Challenge Dos list without an ability to request Anti-bot Challenge again</td></tr>
<tr><td><span class="notranslate">timeout: 864000</span></td>
<td># set in seconds the time on which to add the IP in Anti-bot Challenge Dos list without an ability
to request Anti-bot Challenge again</td></tr>
<tr>
<th colspan="2" align="left"><span class="notranslate">BLOCKED_PORTS:</span></th></tr>
<tr><td><span class="notranslate">default_mode: allowed</span></td>
<td># defines the default state of ports which is not explicitly set by user (<span class="notranslate"><em>denied</em></span> by default or <span class="notranslate"><em>allowed</em></span> by default). Currently only <span class="notranslate"><em>allowed</em></span> is supported</td></tr>
<tr>
<th colspan="2" align="left"><span class="notranslate">WEBSHIELD:</span></th></tr>
<tr><td><span class="notranslate">known_proxies_support: True</span></td>
<td># enable CDN support, treat IPs behind CDN as any other IPs. (True is the default value).</td></tr>
<tr><td><span class="notranslate">enable: True</span></td>
<td># enable (True) (default value) or disable (False) WebShield</td></tr>
<tr><td><span class="notranslate">splash_screen: True</span></td>
<td># enable (<span class="notranslate">True</span>) or disable (<span class="notranslate">False</span>) Anti-bot protection</td></tr>
<tr>
<th colspan="2" align="left"><span class="notranslate">PROACTIVE_DEFENCE:</span></th></tr>
<tr><td><span class="notranslate">blamer: True</span></td>
<td># enable (<span class="notranslate">True</span> (default)) or disable (<span class="notranslate">False) Blamer</span>. See also: <a href="https://blog.imunify360.com/forcibly-enable-blamer" target="_blank">How to forcibly enable Blamer for all users on the server</a>.</td></tr>
<tr><td><span class="notranslate">mode: LOG</span></td>
<td># available modes:<ul><li><span class="notranslate">KILL</span></li><li><span class="notranslate">DISABLED</span></li><li><span class="notranslate">LOG</span> (default)</li></ul></td></tr>
<tr><td><span class="notranslate">php_immunity: False</span></td>
<td># enable (<span class="notranslate">True</span>) or disable (<span class="notranslate">False (default)) PHP Immunity </span> (allows to automatically detect & patch vulnerabilities in software at the Proactive Defense level preventing re-infections through the same vulnerability). By enabling this feature, Blamer will be enabled as well and Proactive Defence switched into the KILL mode.</td></tr>
<tr>
<th colspan="2" align="left"><span class="notranslate">MALWARE_SCAN_INTENSITY:</span></th></tr>
<tr><td><span class="notranslate">cpu: 2</span></td>
<td># intensity level for CPU consumption. Can be set from 1 to 7, default is 2</td></tr>
<tr><td><span class="notranslate">io: 2</span></td>
<td># intensity level for file operations. Can be set from 1 to 7, default is 2</td></tr>
<tr><td><span class="notranslate">ram: 1024</span></td>
<td># intensity level for RAM consumption. The default value is 1024</td></tr>
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
<tr>
<th align="left"><span class="notranslate">PAM:</span></th>
<th align="left"># effective way to prevent brute-force attacks against FTP/SSH</th></tr>
<tr><td><span class="notranslate">enable: False</span></td>
<td># enable (<span class="notranslate">True</span>) or disable (<span class="notranslate">False</span>) (default value) PAM brute-force attack protection</td></tr>
<tr><td><span class="notranslate">exim_dovecot_protection: False</span></td>
<td># enable (<span class="notranslate">True</span>) or disable (<span class="notranslate">False</span>) (default value) Exim+Dovecot brute-force attack protection against Dovecot brute-force attacks.</td></tr>
<tr><td><span class="notranslate">ftp_protection: False</span></td>
<td># enable (<span class="notranslate">True</span>) or disable (<span class="notranslate">False</span>) (default value) FTP brute-force attack protection.</td></tr>
<tr><td><span class="notranslate">exim_dovecot_native: True</span></td>
<td># enable (<span class="notranslate">True</span>) (default value) or disable (<span class="notranslate">False</span>) the Dovecot native module.</td></tr>
<tr>
<th align="left"><span class="notranslate">KERNELCARE:</span> (<b><font color="Red">deprecated</font></b>)</th>
<th align="left"># KernelCare extension for Imunify360 which allows tracing malicious invocations to detect privilege escalation attempts</th></tr>
<tr><td><span class="notranslate">edf: False</span> (<b><font color="Red">deprecated</font></b>)</td>
<td># enable (<span class="notranslate">True</span>) or disable (<span class="notranslate">False</span>) (default value) exploit detection framework</td></tr>
<tr><th colspan="2" align="left"><span class="notranslate">MALWARE_CLEANUP:</span></th></tr>
<tr><td><span class="notranslate">trim_file_instead_of_removal: True</span></td>
<td># do not remove infected file during cleanup but make the file zero-size (for malwares like web-shells) (<span class="notranslate">True</span>) (default value)</td></tr>
<tr><td><span class="notranslate">keep_original_files_days: 14</span></td>
<td># the original infected file is available for restore within the defined period. The default is 14 days. The minimum value is one day.</td></tr>
<tr><th colspan="2" align="left"><span class="notranslate">OSSEC:</span></th></tr>
<tr><td><span class="notranslate">active_response: False</span></td>
<td># block (<span class="notranslate">True</span>) access to a specific server port being attacked. The ports include FTP (21), SSH (any port) and SMTP (25, 465, 587). The default value is <span class="notranslate">False</span>.</td></tr>
<tr><th colspan="2" align="left"><span class="notranslate">ADMIN_CONTACTS:</span></th></tr>
<tr><td><span class="notranslate">emails: youremail@email.com</span></td>
<td># your email to receive reports about critical issues, security alerts or system misconfigurations detected on your servers.</td></tr>
<tr><th colspan="2" align="left"><span class="notranslate">SMTP_BLOCKING:</span></th></tr>
<tr><td><span class="notranslate">enable: False</span></td>
<td># enable (<span class="notranslate">True</span>) or disable (<span class="notranslate">False</span>) (default value) SMTP Traffic Management. When enabled, the outgoing SMTP traffic would be blocked according to the settings.</td></tr>
<tr><td><span class="notranslate">ports: 25,587,465</span></td>
<td># a list of the ports to be blocked. The defaults are: 25, 587,465.</td></tr>
<tr><td><span class="notranslate">allow_users:</span></td>
<td># a list of users to be ignored (not blocked). By default it is empty. Including Unix and cPanel users (if a process that sends an email has a UID of one of the `allow_users`, it will not be blocked).</td></tr>
<tr><td><span class="notranslate">allow_groups: mail</span></td>
<td># a list of the groups to be ignored (not blocked). By default it is empty. Including Unix and cPanel users (if a process that sends an email has a UID of one of the `allow_users`, it will not be blocked).</td></tr>
<tr><td><span class="notranslate">allow_local: False</span></td>
<td># block (<span class="notranslate">True</span>) all, except the local SMTP (localhost). <span class="notranslate">False</span> is the default value.</td></tr>
<tr><td><span class="notranslate">redirect: False</span></td>
<td># enable (<span class="notranslate">True</span>) or disable (<span class="notranslate">False</span>) (the default value) automatic redirection to the local ports for outgoing mail traffic.</td></tr>
<tr><th colspan="2" align="left"><span class="notranslate">CSF_INTEGRATION:</span></th></tr>
<tr><td><span class="notranslate">catch_lfd_events: False</span></td>
<td># let (<span class="notranslate">True</span>) Imunify360 use Login Failure Daemon (LFD) as a source for security events. Default is False.</td></tr>
<tr><th colspan="2" align="left"><span class="notranslate">PERMISSIONS:</span></th></tr>
<tr><td><span class="notranslate">support_form: True</span></td>
<td># show (<span class="notranslate">True</span>) (the default value) or hide (<span class="notranslate">False</span>) the Support icon in the Imunify360 UI.</td></tr>
<tr><td><span class="notranslate">user_ignore_list: True</span></td>
<td># show (<span class="notranslate">True</span>) (the default value) or hide (<span class="notranslate">False</span>) the Ignore List tab for end-users in the Imunify360 UI.</td></tr>
<tr><td><span class="notranslate">allow_malware_scan: False</span></td>
<td># enable (<span class="notranslate">True</span>) or disable (<span class="notranslate">False</span>) (the default value) “scan” action in the UI of the end-user.</td></tr>
<tr>
<td width="250px;"><span class="notranslate">advisor: True</span></td><td># enable (<span class="notranslate">True</span> - the default value) or disable (<span class="notranslate">False</span>) the Imunify Advisor.</td></tr>
<tr>
<td width="250px;"><span class="notranslate">user_override_malware_actions: False</span></td><td># <span class="notranslate">"True"</span> allows overriding of actions applied to malware by a regular user. E.g., users will be able to disable automatic cleanup for their own files even if it was enabled by the admin.</td></tr>
<tr>
<td width="250px;"><span class="notranslate">user_override_proactive_defense: False</span></td><td># <span class="notranslate">"True"</span> allows overriding of Proactive Defense work mode by a regular user. E.g., users will be able to switch Proactive Defense mode to <span class="notranslate">LOG</span> for their websites even if the admin has set it to <span class="notranslate">KILL</span>.</td></tr>
<tr><th colspan="2" align="left"><span class="notranslate">STOP_MANAGING:</span></th></tr>
<tr><td><span class="notranslate">modsec_directives: False</span></td>
<td># for internal usage, do not edit</td></tr>
<tr><th colspan="2" align="left"><span class="notranslate">WEB_SERVICES:</span></th></tr>
<tr><td><span class="notranslate">http_ports: </span></td>
<td># additional http ports for Anti-bot Challenge</td></tr>
<tr><td><span class="notranslate">https_ports: </span></td>
<td># additional https ports for Anti-bot Challenge</td></tr>
<tr><th colspan="2" align="left"><span class="notranslate">MALWARE_DATABASE_SCAN:</span></th></tr>
<tr><td><span class="notranslate">enable: True</span></td>
<td># enable (<span class="notranslate">True</span>) the Malware Database Scanner - a database antivirus with automated malware detection and clean-up of web applications. Requires MariaDB/MySQL DB management system version 5.5. Recommended version is 5.6+. Note, only WordPress databases are supported as for now.</td></tr>
</table>

<span class="notranslate">Active Response</span> is an ossec-driven (IDS) feature of Imunify360 which has been re-engineered to make it capable of blocking access to a specific server port being attacked.

The purpose of the feature is significantly reducing false positive rate while increasing its capabilities to detect and block aggressive brute force requests.

In order to activate <span class="notranslate">Active Response, </span>the following lines should be added into <span class="notranslate">_/etc/sysconfig/imunify360/imunify360.config_</span>:
<div class="notranslate">

```
OSSEC:
  active_response: True
```

</div>
and then restart Imunify360 service:
<div class="notranslate">

```
systemctl restart imunify360
```

</div>

#### How to apply changes from CLI

In order to apply changes via command-line interface (CLI), you can use the following command:

<div class="notranslate">

```
imunify360-agent config update '{"SECTION": {"parameter": value}}'
```
</div>

For example, if you want to set <span class="notranslate">`MALWARE_SCAN_INTENSITY.cpu = 5`</span> from a command line, then you should execute the following command:

<div class="notranslate">

```
imunify360-agent config update '{"MALWARE_SCAN_INTENSITY": {"cpu": 5}}'
```
</div>

It is also possible to apply several parameters at once. For example:

<div class="notranslate">

```
imunify360-agent config update '{"PAM": {"exim_dovecot_protection": false, "enable":true}}'
```
</div>

For string configuration values, such as the administrator's email address, it is necessary to use the following command format:

<div class="notranslate">

```
imunify360-agent config update '{"ADMIN_CONTACTS": {"emails": ["email@domain.com"]}}'
```
</div>

