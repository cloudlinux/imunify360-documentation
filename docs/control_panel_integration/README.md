# Generic panels and no-panel installation and integration

[[TOC]]

## Introduction

Imunify360 can be installed directly on the server, independent of any panel, regardless of the administrative interface. It is also called stand-alone, non-panel, generic panel integration.

#### Limitations

* No support for managing disabled rules yet. See also: [Disabled rules](/dashboard/#disabled-rules)


#### Requirements

**Supported Operating Systems**

* The same list as [here](/installation/#requirements).

**Web Servers**

* Apache >= 2.4.30
* LiteSpeed
* Nginx

#### There are four main steps in general required for having Imunify360 Stand-alone running on your server:

1. Install and configure the [prerequisites](/control_panel_integration/#prerequisites) such as ModSecurity, PHP with JSON support, and other common WEB server packages.
2. Download and edit [integration.conf](https://raw.githubusercontent.com/cloudlinux/imunify360-documentation/master/docs/control_panel_integration/integration.conf) file to configure Imunify360 required integrations BEFORE running the installation script.
3. Install Imunify360 using the [deploy script](https://repo.imunify360.cloudlinux.com/defence360/i360deploy.sh)
4. Check the [installed modules work](https://docs.imunify360.com/faq_and_known_issues/#_15-how-to-check-modsecurity-scan-works) and change the Imunify360 settings to reflect your needs.

<details>
  <summary>CageFS Warning</summary>
If Imunify360 runs in CageFS, you'll need to configure it accordingly. It is required to make sure Imunify Web-UI PHP code can be executed under a non-root user and grant access to `/var/run/defence360agent/non_root_simple_rpc.sock`. 

To allow non-root user in CageFS access to the socket, this workaround should be applied:

```
# create directory for moun-point
mkdir /imunify-ui-shared
# add symlink for user which belong to UI backend `imunify-web` in this example)
ln -s /var/run/defence360agent /imunify-ui-shared/imunify-web
# add symlink to cagefs skeleton
rm -f /usr/share/cagefs-skeleton/var/run/defence360agent
ln -s /imunify-ui-shared/imunify-web /usr/share/cagefs-skeleton/var/run/defence360agent
# add mount point to cagefs
echo "%/imunify-ui-shared" >> /etc/cagefs/cagefs.mp
# remount all
cagefsctl --remount-all
```
</details>

## 1. Install and configure the prerequisites

Imunify360 Stand-alone version requires the following components installed or enabled at the server:

* **ModSecurity 2.9.x** for Apache or **ModSecurity 3.0.x** for Nginx
* Apache module <span class="notranslate">`mod_remoteip`</span> or nginx module <span class="notranslate">`ngx_http_realip_module`</span>
* PHP with <span class="notranslate">`json`</span> extension loaded and <span class="notranslate">`proc_open`</span> function enabled (remove it from the <span class="notranslate">`disable_functions`</span> list in <span class="notranslate">`php.ini`</span>)

:::warning Warning
We recommend using the stable versions of ModSecurity3 (i.e. 3.0.4), because developing versions (i.e. master) can have
stability issues (see [https://github.com/SpiderLabs/ModSecurity/issues/2381](https://github.com/SpiderLabs/ModSecurity/issues/2381) for example).
:::


## 2. Download and edit integration.conf file to set required integrations

The Imunify360 Stand-alone version requires the following integrations before installation:

* 2.1 Specifying panel information
* 2.2 Integration with WEB server for serving UI
* 2.3 Interaction with ModSecurity
* 2.4 Integration with Authentication Service
* 2.5 Integration with Malware Scanner

All integrations set in the integration config file like <span class="notranslate">`/etc/sysconfig/imunify360/integration.conf`</span>. You can find more details on the config file [here](/control_panel_integration/#integration-config-file), get a [template](https://github.com/cloudlinux/imunify360-documentation/blob/master/docs/control_panel_integration/integration.conf) or check the [Knoledgebase article](https://cloudlinux.zendesk.com/hc/en-us/articles/4716287786396).

#### 2.1 Specifying panel information

To specify information about your hosting panel in Imunify360/ImunifyAV, use the `panel_info` option in the `[integration_scripts]` section of `integration.conf` file.

:::warning
This is a mandatory field and must be specified prior to the start of the installation.
:::

<div class="notranslate">

```
[integration_scripts]
panel_info = /etc/sysconfig/imunify360/get-panel-info.sh
```
</div>

The option should contain a full path to the executable that prints JSON data in the following format:

<div class="notranslate">

```
{
    "data": {
        "name": "MyHostingPanel",
        "version": "1.23.4"
    },
    "metadata": {
        "result": "ok"
    }
}
```
</div>

The script can echo or print this information in JSON format, or you could configure the file in order to receive the actual information about the hosting panel in use. In case you don’t have a hosting panel at all, use the following stub file: [get-panel-info.sh](https://github.com/cloudlinux/imunify360-documentation/blob/master/docs/control_panel_integration/get-panel-info.sh)

#### 2.2 Integration with web server for serving UI
      
Imunify360 UI is implemented as a single-page application (SPA) and requires a web server to serve it.
It’s required to specify a path to the web server directory, where the Imunify360 UI SPA application will be installed and served.
     
**Example:**

<div class="notranslate">

```
[paths]
ui_path = /var/www/vhosts/imunify360/imunify360.hosting.example.com/html/im360
```
</div>

Ensure that the domain you are going to use for the Imunify360 web-based UI refers to this path and that there are no other scripts or files under <span class="notranslate">`ui_path`</span>, to avoid overwriting the files Imunify360 installation will abort.

#### 2.3 Web engine and Interaction with ModSecurity

It is required to set the web server graceful restart script ang paths in the <span class="notranslate">`integration.conf`</span>

* <span class="notranslate">`graceful_restart_script`</span> – a script that restarts the web server to be called after any changes in web server config or ModSecurity rules
* <span class="notranslate">`config_test_script`</span> – a script that checks the web server's config to be called after any changes in the web server config or ModSecurity rules (optional)
* <span class="notranslate">`modsec_audit_log`</span> – a path to ModSecurity audit log file
* <span class="notranslate">`modsec_audit_logdir`</span> – a path to ModSecurity audit log directory (only required when the <span class="notranslate">`SecAuditLogType`</span> set to the <span class="notranslate">`Concurrent`</span>)

**Example:**

<div class="notranslate">

```
[web_server]
server_type = apache
graceful_restart_script = /usr/sbin/apachectl restart
config_test_script = /usr/sbin/apachectl -t
modsec_audit_log = /var/log/httpd/modsec_audit.log
modsec_audit_logdir = /var/log/modsec_audit
```
</div>

#### Apache and LiteSpeed
Configure [ModSecurity configuration directives](https://github.com/SpiderLabs/ModSecurity/wiki/Reference-Manual-%28v2.x%29#Configuration_Directives) (so that it can block):

<div class="notranslate">

```
SecAuditEngine RelevantOnly
SecConnEngine Off
SecRuleEngine On
```
</div>

Create the empty file <span class="notranslate">`/etc/sysconfig/imunify360/generic/modsec.conf`</span> and include it into the web server config as <span class="notranslate">`IncludeOptional`</span>. To do this you need to find your web server config file, like **/etc/httpd/conf/httpd.conf** and add a line to it:
<div class="notranslate">

```
IncludeOptional /etc/sysconfig/imunify360/generic/modsec.conf
```
</div>

The file would be replaced with the actual config during the first Imunify360 installation or you can fill it via calling the Imunify360 ModSec ruleset installation <span class="notranslate">`imunify360-agent install-vendors`</span>.

#### Nginx

:::tip Note
ModSecurity has different syntax comparing to Nginx configuration, thus ModSecurity directives can not be directly included to the Nginx config files.
:::

Create a separate file (i.e. <span class="notranslate">`/etc/nginx/modsec.conf`</span>) and set the following ModSecurity directives in it:

<div class="notranslate">

```
SecAuditEngine RelevantOnly
SecConnEngine Off
SecRuleEngine On
SecAuditLogFormat JSON
# should match modsec_audit_log option in integration.conf (see below)
SecAuditLog /var/log/nginx/modsec_audit_log
```
</div>

:::danger Warning
ModSecurity on Nginx does not properly re-opens audit log on SIGHUP/SIGUSR1, which can cause logrotate to break integration with Imunify360. See [https://github.com/SpiderLabs/ModSecurity-nginx/issues/121](https://github.com/SpiderLabs/ModSecurity-nginx/issues/121) for details.
:::

Create an empty file <span class="notranslate">`/etc/sysconfig/imunify360/generic/modsec.conf`</span>. The file would be replaced with the actual config during the first Imunify360 installation or you can fill it via calling the Imunify360 ModSec ruleset installation <span class="notranslate">`imunify360-agent install-vendors`</span>.

Then enable ModSecurity and include both files into Nginx configuration using the <span class="notranslate">`modsecurity_rules_file`</span> directive:

```
modsecurity on;
modsecurity_rules_file /etc/nginx/modsec.conf;
modsecurity_rules_file /etc/sysconfig/imunify360/generic/modsec.conf;
```

#### 2.4 Integration with authentication service

Imunify360 Stand-alone version can use PAM service to authenticate users for the Imunify360 UI application.

You can specify which PAM service Imunify360 should use with the <span class="notranslate">`service_name`</span> option:

<div class="notranslate">

```
[pam]
service_name = system-auth
```
</div>

You can get a token which can be used for authentication using the [<span class="notranslate">`login`</span> command](/command_line_interface/#login). The administrators have full access to Imunify360 UI and its settings.

By default, root is considered to be the only admin user.

#### 2.5 Integration with Malware Scanner

To scan files for changes (to detect malware) using inotify, configure which directories to watch and which to ignore in the <span class="notranslate">`integration.conf`</span> file:

* configure <span class="notranslate">`[malware].basedir`</span> – a root directory to watch (recursively)
* configure <span class="notranslate">`[malware].pattern_to_watch`</span> – only directories that match this ([Python](https://docs.python.org/3/howto/regex.html#regex-howto)) regex in the basedir are actually going to be watched

**Example:**

<div class="notranslate">

```
[malware]
basedir = /home
pattern_to_watch = ^/home/.+?/(public_html|public_ftp|private_html)(/.*)?$
```
</div>


## 3. Install Imunify360
3.1. **Get your license key:** Visit https://www.imunify360.com/. You can purchase it or get a trial key from a received email.
3.2. **Log in with root privileges:** Access the server where Imunify360 should be installed with root privileges.
3.3. **Run the installation commands:** Navigate to your home directory and execute the following commands:
```
wget https://repo.imunify360.cloudlinux.com/defence360/i360deploy.sh -O i360deploy.sh
bash i360deploy.sh --key YOUR_KEY
```

Where YOUR_KEY is your license key. Replace YOUR_KEY with the actual key - trial or purchased one. The installation instructions are the same as for cPanel/Plesk/DirectAdmin version and can be found in the [Imunify360 documentation](/installation/#installation-instructions).

After the successful installation, **you can reach the Imunify360 UI at the URL specified by the ui_path parameter** of the configuration file.

## 4. Set up modules and integrations and change other Imunify360 settings to reflect your needs

#### 4.1 Define list of administrators for Imunify360

The administrators have full access to Imunify360 UI and its settings. To grant non-root users full access add more administrators by listing them in the them in the <span class="notranslate">`/etc/sysconfig/imunify360/auth.admin`</span> file or specify the [integration scripts](https://cloudlinux.zendesk.com/hc/en-us/articles/4840433434524-How-to-filter-the-number-of-users-by-using-integration-scripts?_gl=1*1dtmkmt*_up*MQ..*_ga*ODUwMjA5NDYyLjE2OTkyMTAwOTI.*_ga_1RCQ134PYC*MTY5OTIxMDA4OS4xLjAuMTY5OTIxMDA4OS4wLjAuMA..*_ga_V4QHJSZM47*MTY5OTIxMDA4OS4xLjAuMTY5OTIxMDA4OS4wLjAuMA..*_ga_8LBSSX7VQX*MTY5OTIxMDA4OS4xLjAuMTY5OTIxMDA4OS4wLjAuMA..) admin scetion. 

Admin users will be merged from three sources: 
* /etc/sysconfig/imunify360/auth.admin list 
* scripts defined in the /etc/sysconfig/imunify360/integration.conf 
* /opt/cpvendor/etc/integration.ini that return user lists.

<details>
  <summary>JSON data sample admin script should return</summary>

<div class="notranslate">

```
[integration_scripts]
admins = /etc/sysconfig/imunify360/get-admins-script.sh
```
</div>

It should point to an executable file that generates a JSON file similar to the following:


<div class="notranslate">

```
{
  "data": [
    {
      "name": "admin1",
      "unix_user": "admin",
      "locale_code": "EN_us",
      "email": "admin1@domain.zone",
      "is_main": true
    },
	{
      "name": "admin2",
      "unix_user": "admin",
      "locale_code": "Ru_ru",
      "email": "admin2@domain.zone",
      "is_main": false
    },
  ],
  "metadata": {
    "result": "ok"
  }
}
```
</div>
</details>

#### 4.2 FTP uploads scan
To scan files uploaded via FTP, configure [PureFTPd](https://www.pureftpd.org/project/pure-ftpd/). Write in the <span class="notranslate">`pure-ftp.conf`</span>:

<div class="notranslate">

```
CallUploadScript             yes
```
</div>

#### 4.3 Per-domain rules constrol
To enable domain-specific ModSecurity configuration, specify the <span class="notranslate">`modsec_domain_config_script`</span> in the <span class="notranslate">`integration.conf`</span>.

<div class="notranslate">

```
[integration_scripts]
modsec_domain_config_script = /path/to/inject/domain/specific/config/script.sh
```
</div>
 
It should point to an executable file that accepts as an input a list of domain-specific web server settings and injects them into the server config. The standard input (stdin) is given in the [JSON Lines](http://jsonlines.org/) format similar to the following:

<div class="notranslate">

```
{"user": "username", "domain": "example.com", "content": "modsec config text"}
{"user": "another", "domain": "another.example.com", "content": "..."}
```
</div>
 
Each line contains config for a single domain e.g., it may contain rule tags excluded for the domain.
The script should also restart the web server to apply the configuration. This should be done so that the script could implement the check that web server comes up after config change, and reset configuration if it doesn't.

If configuration change failed, the script should return 1, and in the standard error stream (stderr) it should return the reason for failure. On success, the script should return 0.
In a single run of the script, we might update a single domain/user, as well as multiple users (all users) on the system.

#### 4.4 Integration with WebShield

WebShield consists of four services:

* WebShield itself
* Shared memory daemon makes it easier to deal with certain aspects of Nginx configuration without reloading
* SSL-caching daemon watches changes to host SSL certificate sets (for known hosting panels only: cPanel, Plesk, DirectAdmin) and updates the WebShield SSL cache when a certificate is added, updated or removed
* Sentrylogs daemon watches WebShield log files to detect errors

The configuration of WebShield is done by an agent, and direct editing of WebShield configuration files is generally not recommended. This is mainly because after the next reconfiguration all custom changes would be lost. However, a host administrator is allowed to set a certificate as the default one for WebShield to return.

#### How to enable WebShield in the Imunify360 config file and start the service

When Imunify360 stand-alone is installed, WebShield is disabled by default.

You can enable it only via CLI. To do so, run the following commands:


1. ```
    imunify360-agent config update '{"WEBSHIELD": {"enable": true, "known_proxies_support": true}}'
   ```
2. ```
    systemctl enable imunify360-webshield
   ```
3. ```
    systemctl restart imunify360-webshield
   ```

#### Set default SSL certificate explicitly

1. Place a certificate and a key into the <span class="notranslate">`/etc/imunify360-webshield/ssl_certs`</span> folder
2. If required, in the <span class="notranslate">`/etc/imunify360-webshield/ssl.conf`</span> file, change the following directives according to your changes:
 
  <div class="notranslate">

  ```
  ssl_certificate             ssl_certs/dummy.pem;

  ssl_certificate_key         ssl_certs/dummy.pem;
  ```
  </div>

If you want to provide intermediate certificates, they are to be appended to the certificate file.

These settings require WebShield to be restarted/reloaded.

#### Manage WebShield SSL cache manually

To manually manage the certificate cache, use the <span class="notranslate">`/usr/sbin/im360-ssl-cache`</span> utility.

To add certificates to the cache, a user would run the command:

<div class="notranslate">

```
im360-ssl-cache --add /path/to/certs.json
```
</div>

The <span class="notranslate">`--add`</span> parameter accepts exactly one value. If the parameter value is not `-`, it is taken as a path to a file in JSON format with a list of certificates and private keys to be added. Otherwise, if the parameter value is `-`, data is expected to be sent in JSON format to STDIN as in the following example:

<div class="notranslate">

```
cat certs.json | im360-ssl-cache --add -
```
</div>

<details>
  <summary>Format of JSON file:</summary>

<div class="notranslate">

```
[
  {
      "domain": "john.example.com",
      "key": "-----BEGIN PRIVATE KEY-----\nM...O\n-----END PRIVATE KEY-----\n",
      "certificate": "-----BEGIN CERTIFICATE-----\nMI...Y=\n-----END CERTIFICATE-----\n",
      "chain": "-----BEGIN CERTIFICATE-----\nM...I=\n-----END CERTIFICATE-----\n-----BEGIN CERTIFICATE-----\nM...U=\n-----END CERTIFICATE-----\n"
    },
    {
      "domain": "bob.example.com",
      "key": "...",
      "certificate": "...",
      "chain": "..."
    }
]
```
</div>

:::tip Note
As JSON text is not allowed to have line breaks, all newline symbols must be escaped as in the example above.
:::
</details>

To remove certificate(s) from the cache, a user is expected to run the command:

<div class="notranslate">

```
im360-ssl-cache --remove example.org example.com …
```
</div>

The <span class="notranslate">`--remove`</span> parameter expects one or more space-separated domain names, for which certificates are to be removed from the cache.

When no parameters are passed, the <span class="notranslate">`im360-ssl-cache`</span> simply lists all domain names of certificates in the cache.

:::warning Note
Passing certificates data in JSON format is done to put data flow in good order, to avoid excessive checks of data. No certificate checks are made.
:::

<details>
<summary>Non-SNI requests</summary>

When a request without Server Name Indication (SNI) comes, WebShield has to guess what certificate from the cache to serve.

To allow WebShield to handle non-SNI requests properly, include an `ip` field in the JSON that you pass to the <span class="notranslate">`im360-ssl-cache`</span>.

<div class="notranslate">

```
[
    {
        "domain": "...",
        "key": "...",
        "certificate": "...",
        "chain": "...",
        "ip": "..."  // NEW, optional, NOT UNIQUE
    },..
]
```
</div>

WebShield will use this data to decide which certificate to serve if a request without Server Name Indication (SNI) arrives. If there are several domains with the specified IPs, WebShield will use the first one alphabetically.
</details>

#### How to test SSL configuration
Administrators should see a warning in Settings in UI if no certificates are added:
WebShield SSL-Cache is not configured. Although, even if a certificate is added, it doesn’t guarantee that the website is working correctly. The certificate may be outdated, invalid, or not applicable to that domain name.

The worst scenario when SSL certificate is not cached or recognised by the WebShield is that the SSL certificate of the Captcha page redirect will not match the initial site the user was visiting. The WebShield will serve it's default that not likely to match with the domain name, or an outdated certificate and this may not be trusted. Thus SSL certificate waning will appear.

To make sure WebShield can serve the Captcha page smoothly the relevant domain name (certificates cache) should be in the output of thec cache tool, e.g.:
<div class="notranslate">
	
```
im360-ssl-cache
bob.example.com
john.example.com
```
</div>
If the domain name is presented, its certificate content with it's key should be written in cache, WebShield's pick up algorithm will find this match to serve with domain's Captcha page. 

To attest this mechanisms, it is required:

1. While using non-whitelisted IP (ideally an another machine that is not used to login), get the Graylist verdict.
2. Visit the site and validate that no SSL errors occurred while Captcha is shown.

The first step can be achieved in various ways, the one that is also checks the ModSecurity layer is to send specific test tags, as [per link](https://docs.imunify360.com/faq_and_known_issues/#_15-how-to-check-modsecurity-scan-works) describes. The approach is to send specific tags towards you site, trigger the test rule and get IP greylisted:
<div class="notranslate">
	
```
for i in {1..5} ; do curl -ks https://example.com/?i360test=88ff0adf94a190b9d1311c8b50fe2891c85af732 > /dev/null; echo $i; done
```
</div>

As well as without testing the ModSec layer, it is possible to add IP to the manual Greylist as per:
<div class="notranslate">
	
```
imunify360-agent graylist ip add 1.1.1.3 --comment "Greylisting my test IP" --expiration $(($(date "+%s")+3600))
```
</div>

Subsequently, the curl results should return WebShield have no errors:
<div class="notranslate">
	
```
curl -iv --ssl-reqd https://example.com
```
</div>

#### Required web server configuration to correctly detect client IP addresses from headers

To ensure WebShield and Graylist are working correctly (e.g. a correct IP is passed to ModSecurity), the server must recognize WebShield as an internal proxy. For example, for Apache, `mod_remoteip` must be installed and configured like this:

<div class="notranslate">

```
<IfModule remoteip_module>
    RemoteIPInternalProxy 127.0.0.1
    RemoteIPInternalProxy ::1
    RemoteIPHeader X-Forwarded-For
</IfModule>
```
</div>

For Nginx, the <span class="notranslate">`ngx_http_realip_module`</span> module should be configured in the following way:

<div class="notranslate">

```
real_ip_header X-Forwarded-For;
set_real_ip_from 127.0.0.1;
set_real_ip_from ::1;
```
</div>

WebShield passes the real client IP in the <span class="notranslate">`X-Forwarded-For`</span> header.

:::tip Note
In the Apache LogFormat configuration strings for correct representation of a remote host IP address it is required using:

<div class="notranslate">

```
%a	Client IP address of the request
```
</div>

instead of

<div class="notranslate">

```
%h	Remote hostname
```
</div>

You can find more details at [http://httpd.apache.org/docs/current/mod/mod_log_config.html](http://httpd.apache.org/docs/current/mod/mod_log_config.html).
:::

#### Use a specific list of users in Imunify360

By default, Imunify360 will use Linux system users, limited by <span class="notranslate">`uid_min`</span> and <span class="notranslate">`uid_max`</span> from the <span class="notranslate">`/etc/login.defs`</span>.

#### Data description

| | | |
|-|-|-|
|Key|Nullable|Description|
|<span class="notranslate">`id`</span>|<span class="notranslate">`False`</span>|ID of the UNIX account in the system.|
|<span class="notranslate">`username`</span>|<span class="notranslate">`False`</span>|The name of the UNIX account in the system.|
|<span class="notranslate">`owner`</span>|<span class="notranslate">`True`</span>|The name of the account owner. The owner can be an administrator (in this case he should be included in the <span class="notranslate">`admins()`</span> output) or a reseller (in this case he should be included in the <span class="notranslate">`resellers()`</span> output).|
|<span class="notranslate">`locale_code`</span>|<span class="notranslate">`True`</span>|The locale selected by a user.|
|<span class="notranslate">`email`</span>|<span class="notranslate">`True`</span>|Email of the account user. If there is no email, it should return null.|
|<span class="notranslate">`domain`</span>|<span class="notranslate">`True`</span>|The main domain of a user.|
|<span class="notranslate">`package`</span>|<span class="notranslate">`True`</span>|Information about the package to which a user belongs to. If the user doesn’t belong to any package, it should return null.|
|<span class="notranslate">`package.name`</span>|<span class="notranslate">`False`</span>|The name of the package to which a user belongs to.|
|<span class="notranslate">`package.owner`</span>|<span class="notranslate">`True`</span>|The owner of the package to which a user belongs to (reseller or administrator).|

<div class="notranslate">

```
[integration_sctipts]
domains = /path/to/get-domains-script.sh
```
</div>

It should point to an executable file that generates a JSON file similar to the following

<div class="notranslate">

```
{
  "data": {
    "example.com": {
      "document_root": "/home/username/public_html/",
      "is_main": true,
      "owner": "username"
    },
    "subdomain.example.com": {
      "document_root": "/home/username/public_html/subdomain/",
      "is_main": false,
      "owner": "username"
    }
  },
  "metadata": {
    "result": "ok"
  }
}
```
</div>

<span class="notranslate">`web_server_config_path`</span> should point to a path that is added as <span class="notranslate">`IncludeOptional`</span> in this domain's virtual host e.g., <span class="notranslate">`/path/to/example.com/specific/config/to/include`</span> path should be added for the <span class="notranslate">`example.com`</span> domain.
