# Installation Guide

[[TOC]]

## Requirements

**Supported operating systems**

* <span class="notranslate">CentOS/RHEL</span> 6,7,8,9
* <span class="notranslate">CloudLinux</span> OS 6,7,8,9
* <span class="notranslate">Ubuntu</span> 16.04 (LTS only), 18.04, 20.04 (LTS), and 22 (Plesk, DirectAdmin, and standalone)
* <span class="notranslate">Debian</span> 9 (up to Imunify v6.11 (including)), 10 (requires buster-backports), 11 & 12 (Plesk, DirectAdmin, and stand-alone)
* <span class="notranslate">AlmaLinux</span> 8,9
* <span class="notranslate">Rocky Linux</span> 8,9 (cPanel, Plesk, and standalone)


**Virtualization**

<span class="notranslate">OpenVZ</span> - works for <span class="notranslate">Virtuozzo</span> 7 with kernel 3.10.0-1160.80.1.vz7.191.4 or newer.

**Hardware**

* <span class="notranslate">RAM: 1GB</span>
* <span class="notranslate">HDD: 20GB</span> available disk space
* <span class="notranslate">CPU: 64bit</span> version on <span class="notranslate">x86_64</span> processors only

**Supported hosting panels**

* <span class="notranslate">cPanel</span>
* <span class="notranslate">Plesk (Plesk</span> 17.5 or newer)
* <span class="notranslate">DirectAdmin</span>
* <span class="notranslate">CyberPanel</span> (only CloudLinux OS 7 and 8). See [3rd party integration guide from CyberPanel](https://community.cyberpanel.net/docs?category=49&tags=cloudlinux&topic=172)
* <span class="notranslate">Webuzo</span> ([Imunify360 installation guide](https://webuzo.com/docs/installing-webuzo/install-imunify360/))
* For other Generic hosting panels or no-panel configurations, the [dedicated Stand-Alone installation documentation](/control_panel_integration/#settings-related-to-stand-alone-version/) should be used

**Required browsers**

* <span class="notranslate">Safari</span> version 10 or later
* <span class="notranslate">Chrome</span> version 39 or later
* <span class="notranslate">Firefox</span> version 28 or later
* <span class="notranslate">Edge</span> version 17 or later

**Supported Web-servers**
* <span class="notranslate">Apache</span>
* <span class="notranslate">LiteSpeed</span>
* <span class="notranslate">Nginx</span> (fully supported in the [<span class="notranslate">Standalone mode</span>](/control_panel_integration/#introduction); for supported control panels – with ModSec 3 only for now)


## Installation Instructions


:::tip
**No hosting panel installation note:** 

This instruction is intended for supported panels such as cPanel, Plesk, DirectAdmin, etc. from the list above. If you are currently using a non-supported control panel, please proceed with the [Stand-Alone documentation section](/control_panel_integration).
:::

1. Get your license key at [https://www.imunify360.com/](https://www.imunify360.com/). You can purchase it or get a trial key from a received email.

2. Log in with root privileges to the server where Imunify360 should be installed.

3. Go to your home directory and run the commands:

<div class="notranslate">

```
wget https://repo.imunify360.cloudlinux.com/defence360/i360deploy.sh -O i360deploy.sh
bash i360deploy.sh --key YOUR_KEY
```

</div>

where <span class="notranslate">`YOUR_KEY`</span> is your license key. Replace <span class="notranslate">`YOUR_KEY `</span> with the actual key - trial or purchased at [https://www.imunify360.com/](https://www.imunify360.com/).

To install Imunify360 beta version add argument <span class="notranslate">`--beta`</span> . For example:

<div class="notranslate">

```
bash i360deploy.sh --key YOUR_KEY --beta
```

</div>

If you have an IP-based license, run the same script with no arguments:

<div class="notranslate">

```
bash i360deploy.sh
```

</div>

To view available options for installation script run:

<div class="notranslate">

```
bash i360deploy.sh -h
```

</div>

### Registering

In a case of registration key is passed later, then you can register an activation key via the <span class="notranslate">Imunify360-agent</span> command:

<div class="notranslate">

```
imunify360-agent register YOUR_KEY
```

</div>

Where <span class="notranslate">`YOUR_KEY`</span> is your activation key.


If you have IP-based license, you can use the following command:

<div class="notranslate">

```
imunify360-agent register IPL
```

</div>

### SELinux support

If SELinux (Security-Enhanced Linux) is enabled on your server, you should install the Imunify360 SELinux policy module. You can check SELinux status by `sestatus` command. Policy is shipped with Imunify360 package and is located in the <span class="notranslate">`/opt/imunify360/venv/share/imunify360/imunify360.te`</span>

To apply it, run the following commands:

<div class="notranslate">

```
checkmodule -M -m -o /var/imunify360/imunify360.mod /opt/imunify360/venv/share/imunify360/imunify360.te
semodule_package -o /var/imunify360/imunify360.pp -m /var/imunify360/imunify360.mod
semodule -i /var/imunify360/imunify360.pp
```
</div>

After that, restart imunify360 and imunify360-webshield services.
For CentOS6/CloudLinux6:
<div class="notranslate">

```
service imunify360 restart
service imunify360-webshield restart
```

</div>

For other systems:

<div class="notranslate">

```
systemctl restart imunify360
systemctl restart imunify360-webshield
```
</div>

If <i>checkmodule</i> command is not found, please, install it:
For CentOS8/CloudLinux 8:

<div class="notranslate">

```
yum install policycoreutils-python-utils
```

</div>

### Troubleshooting

On DirectAdmin, Imunify UI requires the <span class="notranslate">`proc_open`</span> PHP function to be enabled. If you are unable to open the Imunify UI, you might see a related message in the web server error log. If so, please remove it from the <span class="notranslate">`disable_functions`</span> list in <span class="notranslate">`php.ini`</span>.

## Compatibility

**Compatible**

| | |
|-|-|
|**<span class="notranslate">IDS</span> name**| **Comment**|
|<span class="notranslate">LiteSpeed</span> | Integrates with version 5.1 or higher.|
|<span class="notranslate">EasyApache3</span> | Works only in cPanel.|
|<span class="notranslate">EasyApache4</span> | Works only in cPanel.|
|<span class="notranslate">CSF</span> | Integrated with <span class="notranslate">CSF</span>, more details [here](/ids_integration/#csf-integration).|
|<span class="notranslate">CWAF Agent</span> | No problems detected.|
|<span class="notranslate">Patchman</span> | No problems detected.|
|<span class="notranslate">Suhosin</span> | We are ignoring alerts by <span class="notranslate">Suhosin</span>.|
|<span class="notranslate">Cloudflare</span> | Imunify360 supports graylisting IP addresses behind <span class="notranslate">Cloudflare</span>. More details [here](/ids_integration/#cloudflare-support).|
|<span class="notranslate">CXS</span> | [Special actions required](/ids_integration/#cxs-integration) to use Imunify360 with <span class="notranslate">CXS</span> installed.|
|<span class="notranslate">cPHulk</span> | Imunify360 disables <span class="notranslate">cPHulk</span> during installation. However in case of enabling it back, Imunify360 integrates with it and shows <span class="notranslate">cPHulk</span> events in the incident screen.|
|<span class="notranslate">OpenVZ</span> | Works for <span class="notranslate">Virtuozzo</span> 7 with kernel 3.10.0-1160.80.1.vz7.191.4 or later.|
|<span class="notranslate">UptimeRobot</span>| No problems detected.|

**Incompatible**

| | |
|-|-|
|**<span class="notranslate">IDS</span> name** | **Comment**|
|<span class="notranslate">ASL (Atomicorp Secured Linux)</span> | <span class="notranslate">ASL</span> is not compatible with <span class="notranslate">Imunify360</span>, and cannot be run with <span class="notranslate">Imunify360</span> on the same server.|
|<span class="notranslate">fail2ban</span> | Imunify360 disables <span class="notranslate">fail2ban</span>: the latter resets chains of iptables rules which causes inconsistency with Imunify360|
