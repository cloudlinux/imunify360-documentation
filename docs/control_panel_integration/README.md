# Generic panels and no-panel installation and integration

[[TOC]]

## Introduction

Imunify360 can be installed directly on the server, independent of any panel, regardless of the administrative interface. It is also called stand-alone, non-panel, generic panel integration.

#### Limitations

* No support for managing disabled rules yet. See also: [Disabled rules](/dashboard/#disabled-rules)


#### Requirements

**Operating system**

* CentOS 6/7/8
* RHEL 6/7
* CloudLinux OS 
* Ubuntu 16.04/18.04/20.04/22
* Debian 9/10
* Rocky Linux 8/9

**Web servers**

* Apache >= 2.4.30
* LiteSpeed
* Nginx

#### There are four main steps in general required for having Imunify360 Stand-alone running on your server:

1. Install and configure the [prerequisites](/control_panel_integration/#prerequisites) like like ModSecurity, PHP with JSON support, and other common WEB server packages.
2. Create [integration.conf](https://cloudlinux.zendesk.com/hc/en-us/article_attachments/10897631373852?_gl=1*24p3t*_ga*MTM5OTQ3NjE3OC4xNjk3NjM2MDk2*_up*MQ..*_ga_8LBSSX7VQX*MTY5NzYzNjA5NC4xLjAuMTY5NzYzNjA5NC4wLjAuMA..*_ga_1RCQ134PYC*MTY5NzYzNjA5NC4xLjAuMTY5NzYzNjA5NC4wLjAuMA..*_ga_V4QHJSZM47*MTY5NzYzNjA5NC4xLjAuMTY5NzYzNjA5NC4wLjAuMA..) file to configure Imunify360 integrations such as authentication,  <span class="notranslate">`mod_security`</span> settings and WEB server scripts.
3. Install Imunify360 using the [deploy script](https://docs.imunify360.com/control_panel_integration/#install-imunify360)
4. Check the [installed modules work](https://docs.imunify360.com/faq_and_known_issues/#_15-how-to-check-modsecurity-scan-works) and change the Imunify360 settings to reflect your needs.

:::warning Warning
Imunify Web-UI PHP code has to be executed under a non-root user which has access to `/var/run/defence360agent/non_root_simple_rpc.sock`. If it runs in CageFS, you'll need to configure it accordingly.
:::

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

## Prerequisites

Imunify360 Stand-alone version requires the following components installed or enabled at the server:

* ModSecurity 2.9.x for Apache or ModSecurity 3.0.x for Nginx
* Apache module <span class="notranslate">`mod_remoteip`</span> or nginx module <span class="notranslate">`ngx_http_realip_module`</span>
* PHP with <span class="notranslate">`json`</span> extension loaded and <span class="notranslate">`proc_open`</span> function enabled (remove it from the <span class="notranslate">`disable_functions`</span> list in <span class="notranslate">`php.ini`</span>)

:::warning Warning
We recommend using the stable versions of ModSecurity3 (i.e. 3.0.4), because developing versions (i.e. master) can have
stability issues (see [https://github.com/SpiderLabs/ModSecurity/issues/2381](https://github.com/SpiderLabs/ModSecurity/issues/2381) for example).
:::


## Configure Imunify360 integrations

The Imunify360 Stand-alone version requires the following integrations before installation:

* Specifying panel information
* Integration with web server for serving UI
* Interaction with ModSecurity
* Integration with WebShield
* Integration with Malware Scanner
* Integration with authentication service
* Define administrators for Imunify360

All integrations set in the integration config file like <span class="notranslate">`/etc/sysconfig/imunify360/integration.conf`</span>. You can find more details on the config file [here](/control_panel_integration/#integration-config-file), get a [template](https://cloudlinux.zendesk.com/guide-media/01HD1FQ947RNZB4PYXRVA3PMM0) or check the [Knoledgebase article](https://cloudlinux.zendesk.com/hc/en-us/articles/4716287786396).

#### Specifying panel information

To specify information about your hosting panel in Imunify360/ImunifyAV, use the `panel_info` option in the `[integration_scripts]` section of `integration.conf` file.

:::warning
This is a mandatory field and must be specified prior to the start of the installation.
:::

<div class="notranslate">

```
[integration_scripts]
panel_info = /path/to/info/script.sh
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


#### Integration with web server
      
Imunify360 UI is implemented as a single-page application (SPA) and requires a web server to serve it.
It’s required to specify a path to the web server directory, where the Imunify360 UI SPA application will be installed and served.
     
Example

<div class="notranslate">

```
[paths]
ui_path = /var/www/vhosts/imunify360/imunify360.hosting.example.com/html/im360
```
</div>

Ensure that the domain you are going to use for the Imunify360 web-based UI refers to this path and that there are no other scripts or files under <span class="notranslate">`ui_path`</span>, as they might be overridden by Imunify360 installation.


#### Apache and LiteSpeed

Configure [ModSecurity configuration directives](https://github.com/SpiderLabs/ModSecurity/wiki/Reference-Manual-%28v2.x%29#Configuration_Directives) (so that it can block):

<div class="notranslate">

```
SecAuditEngine RelevantOnly
SecConnEngine Off
SecRuleEngine On
```
</div>

Create the empty file <span class="notranslate">`/etc/sysconfig/imunify360/generic/modsec.conf`</span> and include it into the web server config as <span class="notranslate">`IncludeOptional`</span>. The file would be replaced with the actual config during the first Imunify360 installation or you can fill it via calling the Imunify360 ModSec ruleset installation <span class="notranslate">`imunify360-agent install-vendors`</span>.

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


#### Imunify360 integration configuration

Set the path and graceful restart script in the <span class="notranslate">`integration.conf`</span>

* <span class="notranslate">`[web_server].graceful_restart_script`</span> – a script that restarts the web server to be called after any changes in web server config or ModSecurity rules
* <span class="notranslate">`[web_server].config_test_script`</span> – a script that checks the web server's config to be called after any changes in the web server config or ModSecurity rules (optional)
* <span class="notranslate">`[web_server].modsec_audit_log`</span> – a path to ModSecurity audit log file
* <span class="notranslate">`[web_server].modsec_audit_logdir`</span> – a path to ModSecurity audit log directory (required when the <span class="notranslate">`SecAuditLogType`</span> set to the <span class="notranslate">`Concurrent`</span>)

Example

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

#### Integration with WebShield

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

Format of JSON file:

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

#### Non-SNI requests

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

#### Integration with Malware Scanner

To scan files uploaded via FTP, configure [PureFTPd](https://www.pureftpd.org/project/pure-ftpd/). Write in the <span class="notranslate">`pure-ftp.conf`</span>:

<div class="notranslate">

```
CallUploadScript             yes
```
</div>

To scan files for changes (to detect malware) using inotify, configure which directories to watch and which to ignore in the <span class="notranslate">`integration.conf`</span> file:

* configure <span class="notranslate">`[malware].basedir`</span> – a root directory to watch (recursively)
* configure <span class="notranslate">`[malware].pattern_to_watch`</span> – only directories that match this ([Python](https://docs.python.org/3/howto/regex.html#regex-howto)) regex in the basedir are actually going to be watched

Example

<div class="notranslate">

```
[malware]
basedir = /home
pattern_to_watch = ^/home/.+?/(public_html|public_ftp|private_html)(/.*)?$
```
</div>

#### Integration with authentication service

Imunify360 Stand-alone version can use PAM service to authenticate users for the Imunify360 UI application.

You can specify which PAM service Imunify360 should use with the <span class="notranslate">`service_name`</span> option:

<div class="notranslate">

```
[pam]
service_name = system-auth
```
</div>

You can get a token which can be used for authentication using the [<span class="notranslate">`login`</span> command](/command_line_interface/#login). 

#### Define administrators for Imunify360

The administrators have full access to Imunify360 UI and its settings.

By default, <span class="notranslate">`root`</span> is considered to be the only <span class="notranslate">`admin`</span> user. 

To add more administrators, list them in the <span class="notranslate">`/etc/sysconfig/imunify360/auth.admin`</span> file 
or specify the admins option in the <span class="notranslate">`/etc/sysconfig/imunify360/integration.conf`</span>

Admin users will be merged from three sources: <span class="notranslate">`/etc/sysconfig/imunify360/auth.admin`</span> list and scripts defined in the
<span class="notranslate">`/etc/sysconfig/imunify360/integration.conf`</span> or <span class="notranslate">`/opt/cpvendor/etc/integration.ini`</span> that return user lists.

<div class="notranslate">

```
[integration_scripts]
admins = /path/to/get-admins-script.sh
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


## Install Imunify360

The installation instructions are the same as for cPanel/Plesk/DirectAdmin version and can be found in the [Imunify360 documentation](/installation/#installation-instructions).

## Settings related to Stand-alone version

The web-based UI is available via the domain configured in the <span class="notranslate">`ui_path`</span>.

::: tip Note
No files should be located in the folder configured with <span class="notranslate">`ui_path`</span>. We do not recommend using a directory in which any files are stored as a directory for Imunify UI files.  
:::

For example, if <span class="notranslate">`/var/www/vhosts/imunify360/imunify360.hosting.example.com/html/im360`</span> is the document root folder for the <span class="notranslate">`imunify360.hosting.example.com`</span> domain, then you could open Imunify360 with the following URL:

* <span class="notranslate">`https://imunify360.hosting.example.com/`</span> (when you have TLS certificate configured for the domain) or
* <span class="notranslate">`http://imunify360.hosting.example.com/`</span>


#### Use a specific list of users in Imunify360

By default, Imunify360 will use Linux system users, limited by <span class="notranslate">`uid_min`</span> and <span class="notranslate">`uid_max`</span> from the <span class="notranslate">`/etc/login.defs`</span>.

If you want to see a specific list of users (note, that all of them must be real Linux users accessible via PAM), you can specify the <span class="notranslate">`users`</span> option in the <span class="notranslate">`/etc/sysconfig/imunify360/integration.conf`</span>:


<div class="notranslate">

```
[integration_scripts]
users = /path/to/get-users-script.sh
```
</div>


It should point to an executable file that generates a JSON file similar to the following (see details [here](/stand_alone/#integration-config-file)):


<div class="notranslate">

```
{
  "data": [
    {
      "id": 1000,
      "username": "ins5yo3",
      "owner": "root",
      "domain": "ins5yo3.com",
      "package": {
        "name": "package",
        "owner": "root"
      },
      "email": "ins5yo3@ins5yo3.com",
      "locale_code": "EN_us"
    },
    {
      "id": 1001,
      "username": "ins5yo4",
      "owner": "root",
      "domain": "ins5yo4.com",
      "package": {
        "name": "package",
        "owner": "root"
      },
      "email": "ins5yo4@ins5yo4.com",
      "locale_code": "EN_us"
    }
  ],
  "metadata": {
    "result": "ok"
  }
}
```
</div>

#### Use server domains

To provide a list of domains for Imunify360, specify the script that generates a JSON file in the <span class="notranslate">`/etc/sysconfig/imunify360/integration.conf`</span>:

<div class="notranslate">

```
[integration_scripts]
domains = /path/to/get-domains-script.sh
```
</div>

A JSON file should be similar to the following:

<div class="notranslate">

```
{
  "data": {
    "example.com": {
      "document_root": "/home/username/public_html/",
      "is_main": true,
      "owner": "username",
    },
    "subdomain.example.com": {
      "document_root": "/home/username/public_html/subdomain/",
      "is_main": false,
      "owner": "username",
    }
  },
  "metadata": {
    "result": "ok"
  }
}
```
</div>


<span class="notranslate">`web_server_config_path`</span> should point to a path that is added as <span class="notranslate">`IncludeOptional`</span> in this domain's virtual host e.g., <span class="notranslate">`/path/to/example.com/specific/config/to/include`</span> path should be added for the <span class="notranslate">`example.com`</span> domain.

## Integration config file

The documentation for the Imunify360 Stand-alone version integration configuration file format.

**Location** <span class="notranslate">`/etc/sysconfig/imunify360/integration.conf`</span>

**Parameters**

<div class="notranslate">

```
[paths]
ui_path = /var/www/vhosts/imunify360/imunify360.hosting.example.com/html/im360
```
</div>

The path to the web server directory, where Imunify360 will be installed and served by web server. Need to be defined before Imunify360 installation.

<div class="notranslate">

```
[paths]
ui_path_owner = panel_user:web_server_group
```
</div>

Allows executing `chown` to that owner for files after installation. The parameter is optional, if it is absent, `chown` doesn't execute.

<div class="notranslate">

```
[pam]
service_name = system-auth
```
</div>

The PAM service is used for user authentication in the Imunify360 UI application.
By default the <span class="notranslate">`system-auth`</span> service is used.

<div class="notranslate">

```
[integration_scripts]
panel_info = /path/to/panel_info.sh
```
</div>

The path to the executable script that generates a JSON file with the information about hosting panel.

<div class="notranslate">

```
{
  "data": {
      "name": "CustomHostingPanel",
      "version": "admin",
  },
  "metadata": {
    "result": "ok"
  }
}
```
</div>


<div class="notranslate">

```
[integration_scripts]
admins = /path/to/get-admins-script.sh
```
</div>

The path to the executable script that generates a JSON file with the list of admin accounts.

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
    }
  ],
  "metadata": {
    "result": "ok"
  }
}
```
</div>

<div class="notranslate">

```
[integration_scripts]
users = /path/to/get-users-script.sh
```
</div>

The script to provide the specific list of users used by Imunify360.

It should point to an executable file that generates a JSON file similar to the following (domains are optional):

<div class="notranslate">

```
{
  "data": [
    {
      "id": 1000,
      "username": "ins5yo3",
      "owner": "root",
      "domain": "ins5yo3.com",
      "package": {
        "name": "package",
        "owner": "root"
      },
      "email": "ins5yo3@ins5yo3.com",
      "locale_code": "EN_us"
    },
    {
      "id": 1001,
      "username": "ins5yo4",
      "owner": "root",
      "domain": "ins5yo4.com",
      "package": {
        "name": "package",
        "owner": "root"
      },
      "email": "ins5yo4@ins5yo4.com",
      "locale_code": "EN_us"
    }
  ],
  "metadata": {
    "result": "ok"
  }
}
```
</div>

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
