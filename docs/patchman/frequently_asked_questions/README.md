# Frequently Asked Question

[[TOC]]

## Which applications does Patchman detect and fix?

:::tip
If you want to be notified every time we add new patches and signatures, please see [Can you notify me every time a new vulnerability patch is released?](./#can-you-notify-me-every-time-a-new-vulnerability-patch-is-released) 
:::

Currently, Patchman has two types of definitions.

* When a version is supported by patches, fixes are available for most security flaws in these applications. This means that vulnerabilities in these applications are automatically fixed.
* When only detection support is available, Patchman is able to detect installed versions of this application, which allows you to notify your users of outdated applications.

Patch and detection support for various versions of the supported applications are listed below. If you think there is a vulnerability in one of these applications that Patchman does not patch, please check [Why is vulnerability X not fixed by Patchman?](./#why-is-vulnerability-x-not-fixed-by-patchman) for more information.

| **Application** | **Patches** | **Bundle / Plan (for patching)** | **Version detection (all plans)** |
| --- | --- | --- | --- |
| WordPress | 3.6 and later | Patchman CORE,  <br>Patchman COVERAGE,  <br>Patchman COVERAGE+CLEAN | all |
| Joomla | 2.5 and later | Patchman CORE,  <br>Patchman COVERAGE,  <br>Patchman COVERAGE+CLEAN | all |
| Drupal | 6.0 and later | Patchman CORE,  <br>Patchman COVERAGE,  <br>Patchman COVERAGE+CLEAN | all |
| Magento | 1.9.2.0 and later | Patchman COVERAGE,  <br>Patchman COVERAGE+CLEAN | all |
| WooCommerce | 2.1.0 and later | Patchman COVERAGE,  <br>Patchman COVERAGE+CLEAN | all |
| PrestaShop | 1.6.0.1 and later | Patchman COVERAGE,  <br>Patchman COVERAGE+CLEAN | all |
| Coppermine |     |     | all |
| Dolibarr |     |     | all |
| Dotproject |     |     | all |
| Feng Office |     |     | all |
| FrontAccounting |     |     | all |
| Gallery |     |     | all |
| LifeType |     |     | all |
| LimeSurvey |     |     | all major releases  <br>(some plus versions) |
| LinPHA |     |     | all |
| LiveHelperChat |     |     | all |
| MailPoet | Specific, see below | Specific, see below | none |
| MediaWiki |     |     | all |
| MODX |     |     | all |
| Nextcloud |     |     | 9.0.54 and later |
| NOCC |     |     | all |
| OpenBiblio |     |     | all |
| OpenCart |     |     | all |
| OrangeHRM |     |     | all |
| osCommerce | Specific, see below | Specific, see below | 2.2 - 2.4 |
| ownCloud |     |     | all |
| phpBB |     |     | all |
| phpESP |     |     | all |
| PHPFusion |     |     | all |
| phpList |     |     | all |
| phpMyChat |     |     | all |
| PhpWiki |     |     | all |
| Pligg |     |     | all |
| PyroCMS |     |     | all |
| SquirrelMail |     |     | all |
| TYPO3 |     |     | all |
| vTiger |     |     | all |
| Wikiwig |     |     | all |
| XOOPS |     |     | all |
| YourLS |     |     | all |
| ZenPhoto |     |     | all |

### Plugins and libraries

A list of plugins fully supported by Patchman for patching and/or version detection is included below. If you are wondering why a specific plugin is not part of our coverage, please check [Why is plugin X not patched by Patchman?](./#why-is-plugin-x-not-patched-by-patchman) for more information.



| **Plugin** | **Version(s)** | **Bundle / Plan (for patching)** | **Version detection (all plans)** |
| --- | --- | --- | --- |
| WordPress Plugin:  <br>Advanced Editor Tools / TinyMCE | 3.5.9 and later | COVERAGE, COVERAGE+CLEAN | all |
| WordPress Plugin:  <br>Akismet | 5.0 and later |  COVERAGE, COVERAGE+CLEAN   | all |
| WordPress Plugin:  <br>All in One SEO Pack | 2.3.9.2 and later | COVERAGE, COVERAGE+CLEAN | all |
| WordPress Plugin:  <br>Contact Form 7 | 3.6 and later | COVERAGE, COVERAGE+CLEAN | all |
| WordPress Plugin:  <br>Duplicator | Specific, see below | Specific, see below | all |
| WordPress Plugin:  <br>Easy WP SMTP | Specific, see below | Specific, see below | all |
| WordPress Plugin:  <br>Elementor Website Builder | 3.17.0 and later    |  COVERAGE, COVERAGE+CLEAN   | all |
| WordPress Plugin:  <br>GDPR Cookie Consent | Specific, see below | Specific, see below | all |
| WordPress Plugin:  <br>Google XML Sitemaps | 4.0.8 and later | COVERAGE, COVERAGE+CLEAN | all |
| WordPress Plugin:  <br>InfiniteWP Client | Specific, see below | Specific, see below | all |
| WordPress Plugin:  <br>Jetpack | 2.7 and later | COVERAGE, COVERAGE+CLEAN | all |
| WordPress Plugin:  <br>Popup Builder | Specific, see below | Specific, see below | all |
| WordPress Plugin:  <br>ThemeGrill Demo Importer | Specific, see below | Specific, see below | all |
| WordPress Plugin:  <br>WordPress Importer | 0.6.2 and later | COVERAGE, COVERAGE+CLEAN | all |
| WordPress Plugin:  <br>Yoast SEO | 1.6.1 and later | COVERAGE, COVERAGE+CLEAN | all | 
| WordPress Plugin:  <br>Classic Editor | 1.6 and later | COVERAGE, COVERAGE+CLEAN | all |
| WordPress Plugin:  <br>Really Simple SSL | 7.2.2 and later | COVERAGE, COVERAGE+CLEAN | all |
| WordPress Plugin:  <br>Updraft Plus | 1.23.13 and later | COVERAGE, COVERAGE+CLEAN | all |
| WordPress Plugin:  <br>Duplicate pages | 4.5 and later | COVERAGE, COVERAGE+CLEAN | all |
| WordPress Plugin:  <br>Classic Widgets | 0.3 and later | COVERAGE, COVERAGE+CLEAN | all |
| WordPress Plugin:  <br>Popup Builder by OptinMonster | 1.15.0 and later | COVERAGE, COVERAGE+CLEAN | all |
| WordPress Plugin:  <br>Smush | 3.15.2 and later | COVERAGE, COVERAGE+CLEAN | all |
| WordPress Plugin:  <br>Popup Builder by Fooking Forward | 4.2.3 and later | COVERAGE, COVERAGE+CLEAN | all |
| WordPress Plugin:  <br>Rank Math SEO | 1.0.215 and later | COVERAGE, COVERAGE+CLEAN | all |
| WordPress Plugin:  <br>WP super Cache | 1.5.0+ | COVERAGE, COVERAGE+CLEAN | all |
| WordPress Plugin:  <br>GDPR cookie consent | 1.5.3+ | COVERAGE, COVERAGE+CLEAN | all |
| WordPress Plugin:  <br>LimitLoginAttempts | 1.7.2+ | COVERAGE, COVERAGE+CLEAN | all |
| WordPress Plugin:  <br>ThemeGrill demo importer | 1.0+ | COVERAGE, COVERAGE+CLEAN | all |
| WordPress Plugin:  <br>ND shortcuts | 1.1+ | COVERAGE, COVERAGE+CLEAN | all |
| WordPress Plugin:  <br>InfiniteWP client | 1.6.0+ | COVERAGE, COVERAGE+CLEAN | all |
| WordPress Plugin:  <br>Duplicator | 1.2.0+ | COVERAGE, COVERAGE+CLEAN | all |
| Joomla! Plugin:  <br>Akeeba Backup |     |     | all |
| Joomla! Plugin:  <br>Joomla Content Editor (JCE) |     |     | all |

| **Library** | **Version(s)** | **Bundle / Plan (for patching)** | **Version detection (all plans)** |
| --- | --- | --- | --- |
| PhpUnit | Specific, see below | Specific, see below | all |

### Specific (critical) vulnerabilities

Some select vulnerabilities patched in plugins due to their critical nature, but aren't covered by full patch support. A list of these can be found below:

| **Application** | **Vulnerability / Fix** | **Bundle / Plan** | **Version(s) covered by patches** |
| --- | --- | --- | --- |
| MailPoet | Vulnerability in privilege checking | CORE, COVERAGE, COVERAGE+CLEAN | 2.x |
| osCommerce | File Manager upload  <br>Script/basename  <br>Language Manager CSRF | CORE, COVERAGE, COVERAGE+CLEAN | 2.2 |

| **Plugin** | **Vulnerability / Fix** | **Bundle / Plan** | **Version(s) covered by patches** |
| --- | --- | --- | --- |
| WordPress Plugin:  <br>Duplicator | Adding hashes to file path to avoid arbitrary file download. | COVERAGE, COVERAGE+CLEAN | 1.3.26 - 1.3.24 |
| WordPress Plugin:  <br>Easy WP SMTP | Unauthenticated user to modify WordPress options | COVERAGE, COVERAGE+CLEAN | 1.3.9 - 1.2.8 |
| WordPress Plugin:  <br>GDPR Cookie Consent | Added check if user can manage options to prevent privilege escalation | COVERAGE, COVERAGE+CLEAN | 1.8.2 - 1.6.6 |
| WordPress Plugin:  <br>InfiniteWP Client | Check added for add_site and read_site to avoid authentication bypass | COVERAGE, COVERAGE+CLEAN | 1.9.4.4 - 1.8.1 |
| WordPress Plugin:  <br>Popup Builder | Added authorization check to AJAX actions<br><br>Unauthenticated Stored Cross-Site Scripting / Authenticated Settings Modification, Configuration Disclosure, and User Data Export | COVERAGE, COVERAGE+CLEAN | 3.72 - 3.0.5 <br><br>  <br>3.63 - 3.0.5 |
| WordPress Plugin:  <br>ThemeGrill Demo Importer | Added check if user can manage options to prevent privilege escalation | COVERAGE, COVERAGE+CLEAN | 1.6.1 - 1.3.4 |
| WordPress Plugin:  <br>WP Supercache | Added checks in settings page to prevent authenticated remote code execution (RCE)<br><br>Persistent XSS on cached page | CORE, COVERAGE, COVERAGE+CLEAN | 1.7.1 - 1.4.5<br><br>  <br>  <br>  <br>0.x, 1.0, 1.1, 1.2, 1.3.x and 1.4.x |
| Drupal Module:  <br>Coder | SA-CONTRIB-2016-039 | CORE, COVERAGE, COVERAGE+CLEAN | 7.x and 8.x |
| Drupal Module:  <br>RESTWS | SA-CONTRIB-2016-040 | CORE, COVERAGE, COVERAGE+CLEAN | 7.x |
| Drupal Module:  <br>Webform Multifile | SA-CONTRIB-2016-038 | CORE, COVERAGE, COVERAGE+CLEAN | 6.x and 7.x |

| **Library** | **Vulnerability / Fix** | **Bundle / Plan** | **Version(s) covered by patches** |
| --- | --- | --- | --- |
| Genericons | XSS in Genericons example file | CORE, COVERAGE, COVERAGE+CLEAN | WordPress 4.0.x and Genericons 3.1 |
| PHPMailer | CVE-2020-36326  <br>CVE-2018-19296  <br>CVE-2016-10033  <br>CVE-2016-10045 | CORE, COVERAGE, COVERAGE+CLEAN | 5.2.4 - 6.4.0  <br>5.2.4 - 6.4.0  <br>5.0.0 - 5.2.18  <br>5.0.0 - 5.2.20 |
| PhpUnit | Prevent remote code execution of Util/PHP/eval-stdin.php via HTTP POST data beginning with "<?php " substring | COVERAGE, COVERAGE+CLEAN | 8.5.0 - 2.2.0 |# Why is a NAT environment not supported?

* * * 

## What does the error "Registration key required but not present!" mean? 

You may see the following error in the logfiles at /var/log/patchman/patchman.log:

```
ERROR: Registration key required but not present! Please enter your key for registration purposes (/etc/patchman/license/key)
```

This error means that the agent does not have a valid license file to connect to the Patchman services.

### Why am I seeing this error?

Usually the cause is one of these situations:

* This is a newly (re-)installed agent
* The configuration files for the agent got discarded
* You copied the license file from another server to this one, where it doesn’t match the server IP

:::tip
In all of these cases, the solution is simple: perform the registration procedure for this agent as described below.

If this server has already been registered to your Portal account, don’t worry, the registration procedure will automatically pull in the pre-existing license; we will never create or bill duplicate licenses for any single server. If this is a new server, make sure to approve the new server registration on the Portal dashboard afterwards. 
:::

* The server had a valid license but you changed its outbound IP

:::warning
In this case, do not perform the registration procedure; it risks creating two licenses for the same server (under two different IPs). If this is your situation, please [contact support](./getting-started/#contact-us) so we can help you transfer your existing license to the new IP address.
:::

* The license file expired

:::tip
This means that your server was disconnected from the platform for at least several weeks, and it is probably too late to figure out why this happened. To prevent this from occurring, immediately investigate if you notice a server is disconnected for more than 24 hours (as shown on the Portal dashboard and included in the weekly email notifications) and resolve the issue before your license expires. If you wait too long with investigating those notifications, it will no longer be possible to find the root cause.  
  
To fix the license, perform the re-registration procedure described below. Your existing license will be re-used. 
:::

### Performing (re-)registration of a server

Registration is done using the following easy steps:

1. In the Portal, go to Servers → Add Server
2. Copy the text string under step 2 (this is your registration key)
3. On the server, create a file /etc/patchman/license/key and paste the registration key into that file, on a single uninterrupted line
4. Wait for the agent to pick up the new registration key (at most one minute)

If all goes well, you should see the following lines show up in your logfile:

```
Starting license check
No valid license present; will request one
License installed
Finished license check
```

In case you are still having trouble, please [contact support](./getting-started/#contact-us) for further troubleshooting.

* * *

## How do I report an incorrect detection / false positive?

We do a thorough screening and testing of every single signature before it is pushed out to customers, to make sure we never create so-called false positives (i.e. detections of something that isn’t malicious). However, we do have procedures in place if something does slip through.

If you believe that a detection is a false positive, please follow the following steps to report this to us:

* Get a copy of the exact file on your website that is flagged for detection by Patchman
* Make note of the affected website, which server it is detected on, and the full file path of that file
* Send an email to [support@patchman.co](mailto:support@patchman.co) in which you mention all the above details, and include the exact file as an attachment.

:::warning
Please do not copy-paste the file’s contents into the email body. Some data may be lost which slows down our ability to help you. It must be included as an attachment. 
::: 

Based on all this information, we will investigate the detection. If it is considered a legitimate detection, we will explain why that is. If it is indeed an incorrect detection, we will retract the signature, which would lead to automatically retracting all detections based on that signature.

* * *

## I'm changing my server's IP address. How do I make sure Patchman knows this?

Patchman licenses are bound to IP addresses. In other words, an IP address is the unique identifier for Patchman to figure out which server it’s talking to. When you change the IP of your server, this can lead to problems, because the new IP address will be seen by Patchman as a new server. To make sure this doesn’t happen, please take special care with the Patchman licenses if you have to change the IP address of your server.

:::tip 
The license identifier is only the primary IPv4 address of the server. IPv6 addresses are not relevant and can safely be changed or swapped out without any impact to the Patchman licenses. 
:::

### How do I change the IP address on my Patchman license?

If you intend to change the IP address on your server, you will need to contact customer support.

1. Before changing IP addresses, send an email to [support@patchman.co](mailto:support@patchman.co) with information on the servers you’re talking about, and for each server list the current IP address and the intended new IP address. For example:
    ```
    I wish to change the IP address on my servers, as described below: 

    test-server-1.patchman.co, currently 1.2.3.4, will become 11.22.33.44
    test-server-2.patchman.co, currently 5.6.7.8, will become 55.66.77.88
    ```
2. Customer support will modify the IP addresses on your licenses based on your request, and confirm this in an email response.
3. Change the IP addresses on your servers as intended.
4. On each server, perform the registration procedure again. This is necessary because the old license files belong to the old IP, and are invalid for requesting license files on the new IP. This will only involve the following steps:
    1. Get the registration key from the Patchman Portal, under Servers → Add Server → Step 2
    2. Create the file `/etc/patchman/license/key` and paste the registration key in it
    3. Either wait or restart the Patchman agent (`server patchman restart`)
    4. Check the logfiles (`/var/log/patchman/patchman.log`) for confirmation that the license files are successfully installed

:::warning 
You should not have to confirm new server registrations in the Patchman Portal! If a server shows up in the Patchman Portal and is requesting confirmation, it means that the new IP address is different from the license, and unknown to the Portal. Please [contact customer support](./getting-starter/#contact-us) for assistance if this happens, to prevent possible duplicate registrations. 
:::

### What if I already changed my IP addresses before contacting customer support?

If you perform step 3 before step 1, you will see your servers in the Patchman Portal as pending new registrations. While not ideal, this isn’t necessarily a problem. In the email you send to customer support, mention that you already changed the IPs on your servers, and they will be able to clean up this situation for you.

:::danger 
Never approve these new registrations! If you do approve these new registrations, the new IP address will be registered as a new license. In other words, you then have two licenses for the same server, on two different IPs, and you will be billed for two licenses as well. 
:::

### Can’t I just delete the old licenses and register new licenses?

Technically, you can do this, but there are a couple of major downsides to this:

* You will lose all detection history on the server in the Patchman Portal; that is discarded when you delete the old license. This also means you (and your customers) can no longer revert any patches performed by Patchman.
* The old license is paid forward for an entire month, and any remaining unused days are not refunded upon deletion. In other words, if you do this on the 15th of the month, you will pay double for the second half of the month: both the old license and the new license are billed for that period.

In short, we highly recommend you follow the steps above to avoid all these complications.

* * *

## Can you notify me every time a new vulnerability patch is released?

:::tip
For a general overview of all applications for which we maintain vulnerabilities, please see [Which applications does Patchman scan and fix?](./#which-applications-does-patchman-detect-and-fix)
:::

You can track all our latest definitions through these two RSS feeds, which are public to everyone:

[https://portal.patchman.co/detections/rss/vulnerabilities/](https://portal.patchman.co/detections/rss/vulnerabilities/)  
[https://portal.patchman.co/detections/rss/malware/](https://portal.patchman.co/detections/rss/malware/)

If you want to be notified of new vulnerability patches or malware signatures as soon as we push them out to your servers, set up your favorite RSS client with the above feeds. The latest 10 entries are also always shown on the Portal dashboard, in the bottom-right corner.

* * *

## Does the Patchman Portal have an API I can leverage for deeper integration?

Yes! You can find our portal API and its documentation here: [https://portal.patchman.co/api/](https://portal.patchman.co/api/).

* * *

## What is Patchman CLEAN, and how do I enable & configure it?

A recent addition to the Patchman product portfolio, Patchman CLEAN is the name of the dynamic malware removal capabilities added on top of Patchman's standard signature-based malware removal.

On the detection end, Patchman CLEAN leverages more advanced scanning to not just match full file signatures, but detect malware based on matched patterns, making it more powerful and effective at finding polymorphic or injected malware, even in legitimate files.

On the remediation end, Patchman CLEAN adds new functionality capable of safely and automatically excising malicious code from legitimate files without compromising their functionality. As with all Patchman mechanisms, automated behaviour is fully configurable through policies. 

### How do I gain access to Patchman CLEAN?

Patchman CLEAN is part of the Patchman COVERAGE+ package, available through traditional upgrade paths. In order to enable it, you can navigate to the billing section of your Patchman Portal account, and choose the 'Change' option next to your current plan. This will show you an overview of available plans you can switch to. 

If you are on a plan that supports an upgrade to Patchman COVERAGE+ (From CORE or COVERAGE respectively), you can select the plan here and upgrade. 

### How do I enable Patchman CLEAN? 

Once you've gained access to a plan that supports the Patchman CLEAN functionality, you are able to configure the option in a number of ways. The first is determining cleaning behaviour and (optional) messaging to end-users within the policy. In order to do this, you can navigate to the policy page ([https://portal.patchman.co/policies](https://portal.patchman.co/policies)) and select the policy for which you'd like to configure CLEAN. You can then scroll down to the Patchman CLEAN section:

![](/images/Policy_Patchman_CLEAN.png)

This shows various options, and will be familiar if you've used policies before. Essentially, after ticking 'Enable dynamic malware scanning' To activate the feature for the selected policy, you can configure when actions are scheduled (for reminders and cleans), whether they should trigger a notification to the end-user to which the detections apply, and if so, what e-mail template should be used. As with other sections, the e-mail templates are fully customisable. 

The option 'Allow manual clean actions', if enabled, allows an end-user to manually trigger Patchman CLEAN actions from within their detection overview (if made available to them via End user login). When disabled, cleans are only triggered automatically. 

### Additional configuration options

Because the more comprehensive file scanning features added with Patchman CLEAN do introduce more performance impact (see also: [What are the minimal requirements for running Patchman?](./#what-are-the-minimal-requirements-for-running-patchman)), additional configuration options have been added to allow more control over scanning behaviour. These can be found on the server group settings.

#### Dynamic file scanning

:::tip 
This configuration only applies to daily scans, and not to real-time scanning. 
:::

![](/images/Dynamic_scanning_behaviour.png)

This setting allows you to determine scanning behaviour. Dynamic scans, in this context, refer to Patchman CLEAN's pattern based scanning functionality. Available options include:

* During every scan, scan every file dynamically
* During every scan, dynamically scan files that have changed since the last dynamic scan
* Only when the scan is in the configurable interval, scan every file dynamically
* Scan every file dynamically when the scan is in the configurable interval, during all other scans only dynamically scan files that have changed since the last dynamic scan
* Never perform dynamic scanning

If you select an option that includes the 'configurable interval', a further section appears below the drop-down that allows you to select which daily scans are part of the interval. This allows you to restrict dynamic scans to certain days, for example if you only wish to do a dynamic scan once or twice weekly:

:::warning 
When using the option to only scan changed files, bear in mind that this does not have optimal interaction with new malware detection definitions being added to Patchman CLEAN over time, as a file that has already been scanned will not be scanned again with the new definitions unless it changes. 
:::

![](/images/Configurable_interval.png)

#### Scanning limits

In addition to setting behaviour surrounding dynamic scanning, you can also configure throttling to ensure that the more rigorous dynamic scans are cut short if exceeding certain conditions.

Three options are provided:

![](/images/Scanning_limits.png)

These options allow you to:

* Throttle dynamic scanning by reverting to dynamically scanning changed files only after scanning for X hours.
* Disable dynamic malware scanning and fall back to traditional scanning only after Y hours.
* Abort all scans after Z hours.

This allows for control over the scanning cycles and their runtime.

#### Real-time scanning

For the best results, we recommend using the real-time scanning feature. This will catch malware as soon as it appears on your system, and remove it before it can be executed. For more information, see [Real-time scanning, what is it and how do I configure it?](./#real-time-scanning-what-is-it-and-how-do-i-configure-it) .

#### Maximum file size 

Additionally, scanning limits offer a maximum file size setting, allowing you do determine the cut-off for scanning large files:

![](/images/Max_filesize.png)

* * *

## What IP addresses does the Patchman agent connect to? 

The Patchman agent connects to several servers to provide its functionality. The following is a list of hostnames and IP addresses that are currently used:

| **Hostname**              | **IP Address**  | **Port** |
|---------------------------|-----------------|----------|
| [license.patchman.co](http://license.patchman.co/)       |  176.58.126.250 |    443   |
| [client-portal.patchman.co](http://client-portal.patchman.co/) | 139.162.216.201 |    443   |
| [agentapi.patchman.co](http://agentapi.patchman.co/)      | 139.162.217.245 |    443   |
| [definitions.patchman.co](http://definitions.patchman.co/)   |  212.71.255.138 |    443   |

Please be advised that these IP-addresses might be subject to change in the future. This article will be updated to reflect any changes.

* * *

## What are the minimal requirements for running Patchman?

#### Operating system

Patchman runs on CentOS, Red Hat Enterprise Linux, Debian and Ubuntu Linux servers. Both 32-bit and 64-bit systems are supported.

The following minimum operating system versions are supported:

| **OS** | **Minimal supported version** |
| --- | --- |
| CentOS/RHEL | 6 (up to 8) |
| Debian | 8, Jessie (up to 10, Buster) |
| Ubuntu | 14.04 (Trusty Tahr) up to 20.04 (Focal Fossa) |

#### Control panel

Patchman requires a control panel by default. The supported control panels are cPanel, Plesk and DirectAdmin. The minimum supported versions are as follows:

| **Control Panel** | **Minimal supported version** |
| --- | --- |
| Plesk | 17.0 |
| cPanel | 11.38.1 |
| DirectAdmin | 1.45.3 |

Please [get in touch](/patchman/gettings-started/#contact-us) if you want to deploy Patchman on a platform without one of these supported control panels. More information about that option is available in [this article](/patchman/platform_integrations/#using-patchman-with-a-non-standard-control-panel).

If you are using Plesk, please make sure you have not disabled XML-RPC API access on the localhost interface (127.0.0.1). If allowing access on localhost is not an option, please refer to [this page](/patchman/platform_integrations/#why-does-my-directory-synchronization-fail-on-plesk) for more information on how to configure Patchman for your specific situation.

#### PHP version for websites

We guarantee that our patches are compatible with every PHP version that is officially supported by the application version you are using, with a minimum of PHP 5.4. In other words, if the application version you are using officially supports an older version than PHP 5.4, we do **not** guarantee compatibility of our patches with that older PHP version.

See the following examples for reference:

| **Application** | **Vendor minimum requirement** | **Patchman minimum requirement** |
| --- | --- | --- |
| Wordpress 5.1 | 5.2.4 | 5.4 (Patchman is stricter than vendor) |
| Wordpress 5.2 | 5.6.20 | 5.6.20 (vendor minimum) |

#### System resources

Patchman is designed to have a low resource footprint, but does allow for the configuration of scheduling priorities and scanning behaviour to help manage any noticeable impact on server resources. The configurable options can be found in the 'server group' settings, and include:

* Nice value
* I/O priority
* Maximum scan duration
* Maximum file size
* Parallel scanning (multi-threading)
* Scanning behavior and limits (for dynamic scanning, part of Patchman CLEAN, see [this article](./#what-is-patchman-clean-and-how-do-i-enable-configu))
* Note that using Patchman CLEAN's dynamic scanning might see an increase in resource footprint. While every system is tuned differently, we recommend having a minimum of **300MB** available RAM for dynamic scanning, and properly configuring the scanning behaviour and limits to ensure optimal performance.

* * *

## Why is a NAT environment not supported?

### What is Network Address Translation (NAT)?

Network Address Translation or in short NAT, is a common use case is to be able to have multiple servers behind a single external IP address. See [Wikipedia](https://en.wikipedia.org/wiki/Network_address_translation) for more technical details on this.

### Why doesn't Patchman support NAT?

The mechanism used to a server's identity is based on (among other things) the external IP address of a server. In a NAT environment, there is no guarantee that a server has a unique external IP address, so we don't support it to avoid obscure errors. It also makes binding to a source address difficult, meaning that in case of a server with multiple outgoing interfaces the connection to our management server may go over different interfaces on different occasions, leading to licensing troubles. The ideal solution is to provide the server with an interface that provides direct outgoing connectivity, even if only for Patchman.

### Overriding the NAT check

If this is not possible and you are certain that each server has a fixed unique external IP address, you can override the NAT check by providing the software with that IP address. For this, you need to create the file `/etc/patchman/patchman.ini` with the following contents:

```
[network]
ip=1.2.3.4
```

Where you replace 1.2.3.4 with the server's external facing IP.

* * *

## Why is vulnerability X not fixed by Patchman?

:::tip 
Not all applications have patching support. For a comprehensive list of our coverage, please refer to [Which applications does Patchman detect and fix?](./#which-applications-does-patchman-detect-and-fix) 
:::

:::tip 
For plugin vulnerabilities, please see the companion page [Why is plugin X not patched by Patchman?](./#why-is-plugin-x-not-patched-by-patchman) 
:::

We aim to fix all vulnerabilities found in our covered applications as soon as possible. However, there are a couple of exceptions which we have decided to not support. This page documents these exceptions with a background of why no patches were created for these issues and why we consider it safe to leave these issues unaddressed.

### WordPress

#### RCE POP Chains vulnerability

**Vulnerability details**  
WordPress uses the library Requests which is also used by some other applications. Unserialized objects can lead to remote code execution, allowing an attacker to take control of all the properties of the deserialized object.

**Affected versions**  
WordPress 4.1 - 6.3.1

**Fix complications**  
Not all versions of WordPress have been patched because the library affects some other applications that fall outside the scope of our responsibility. Therefore, to prevent unforeseen issues, we have decided not to patch those versions that extend to other applications.

**Mitigating factors**  
N/A

#### Preventing prototype pollution in Query String Modification and Creation for jQuery

**Vulnerability details**  
_Query String Modification and Creation for jQuery_ released version 2.2.3 containing 1 security fix for 1 vulnerability:

* [Preventing prototype pollution](https://github.com/alrusdi/jquery-plugin-query-object/commit/816b875dc6251d7303533916dfbf8eb158e6f474)

**Affected versions**  
WordPress! 3.6 - 5.9.1

**Fix complications**  
This doesn’t concern a WordPress! core vulnerability. If we would patch this vulnerability, we would also affect projects that depend on this library other than WordPress! We want to avoid that because we can’t guarantee that those other projects will be compatible with our changes to the code.

**Mitigating factors**  
N/A

#### Update Lodash library to incorporate upstream security fixes

**Vulnerability details**  
Several branches have been updated from 4.17.11, 4.17.15 and 4.17.19 to 4.17.21 to incorporate upstream security fixes in the Lodash library. Multiple security issues have been fixed.

**Affected versions**  
WordPress 5.8  
WordPress 5.7 - 5.7.2  
WordPress 5.6 - 5.6.4  
WordPress 5.5 - 5.5.5  
WordPress 5.4 - 5.4.6  
WordPress 5.3 - 5.3.8  
WordPress 5.0 - 5.2.11

**Fix complications**  
This doesn’t concern WordPress core vulnerabilities. If we would patch these vulnerabilities, we would also affect projects other than WordPress. We want to avoid that, because we can’t guarantee that those other projects will be compatible with our changes to the code.

**Mitigating factors**  
N/A

#### External library getID3 vulnerable to XXE

**Vulnerability details**  
WordPress uses the library getID3, which uses the PHP method simplexml_load_string() with the parameter LIBXML_NOENT set.

Used in this way, it makes the application vulnerable to XXE (XML external entity) attacks, because it can be abused to load unauthorized external entities. This can lead to other attack vectors such as cross-site scripting (XSS), remote file inclusion, or code injection.

**Affected versions**  
WordPress 3.6 - 5.7

**Fix complications**  
This doesn’t concern a WordPress core vulnerability. If we would patch this vulnerability, we would also affect projects other than WordPress. We want to avoid that because we can’t guarantee that those other projects will be compatible with our changes to the code.

**Mitigating factors**  
N/A

#### FilteredIterator.php

**Vulnerability details**  
An external library exposes a deserialization function for serialized request data, which is vulnerable to code execution through unsafe unserialization. Since the deserialization is not used, the patch would simply disable this.

**Affected versions**  
WordPress 4.6 - 5.5.1

**Fix complications**  
The library itself has no versioning and is maintained by WordPress, but other projects also use this library and it is therefore considered a non-core component.

This doesn’t concern a WordPress core vulnerability. If we would patch this vulnerability, we would also affect projects other than Wordpress. We want to avoid that, because we can’t guarantee that those other projects will be compatible with our changes to the code.

**Mitigating factors**  
N/A

### Joomla!

#### [20230502] Bruteforce prevention within the mfa screen

**Vulnerability details**  
The lack of rate limiting allows brute force attacks against MFA methods.

**Affected versions**  
Joomla! 4.2.0-4.3.2

**Fix complications**  
The patch introduced a change in the database schema. Patching the database is not a capability Patchman has, so these changes can’t be applied through our vulnerability patching system.

**Mitigating factors**  
N/A

#### [20230102] Missing ACL checks for com_actionlogs

**Vulnerability details**  
A missing ACL check allows non super-admin users to access com_actionlogs.

**Affected versions**  
Joomla! 4.0.0-4.2.6

**Fix complications**  
The code is introduced in new files which have to be at a specific location. For security reasons, we intentionally limit Patchman’s capability to only modify existing files, and not be able to create new files. We would thus be unable to create this new file.

**Mitigating factors**  
N/A

#### [20221001] Disclosure of critical information in debug mode

**Vulnerability details**  
Joomla 4 sites with publicly enabled debug mode exposed data of previous requests

**Affected versions**  
Joomla! 4.0.0-4.2.3

**Fix complications**  
The code is introduced in new files which have to be at a specific location. For security reasons, we intentionally limit Patchman’s capability to only modify existing files, and not be able to create new files. We would thus be unable to create this new file.

**Mitigating factors**  
This vulnerability occurs only if the debug mode is enabled publicly. It is not expected debug mode to be enabled publicly in production websites, decreasing the likelihood of this vulnerability.

#### [20220801] Multiple Full Path Disclosures because of missing '_JEXEC or die check'

**Vulnerability details**  
Multiple Full Path Disclosures because of missing ‘_JEXEC or die’ check caused by the PSR12 changes done in 4.2.0.

**Affected versions**  
Joomla! 4.2.0

**Fix complications**  
Variable _JEXEC is a constant which is generally defined in the “index.php” file which usually sits at the root of the Joomla! installation. This variable is being used as a marker of a secure entry point into Joomla!. However index.php files are also the files where we see the most changes when developers want to make tweaks in CMSs. Applying this patch can break websites on servers where index.php files are tweaked. As we can not guarantee that index.php files are untouched on our users' servers we can not proceed with this patch safely.

**Mitigating factors**  
Upon PSR12 changes introduced in Joomla 4.2.0, multiple files were missed to include '_JEXEC or die’ check. This can lead to full path disclosure when one of the mentioned files is accessed directly by the end user which can create an error because of lack of an expected variable in the accessed function in the file. This can only happen on servers where .htaccess file is not properly configured to disable direct access to the PHP files by end users. Usual ACL configurations expected on a production server configuration decrease the probability of this path disclosure vulnerability to a minimum. In addition, this vulnerability only affects one Joomla! version, namely 4.2.0. All other versions are unaffected.

#### [20220309] XSS attack vector through SVG

**Vulnerability details**  
Possible XSS attack vector through SVG embedding in com_media.

**Affected versions**  
Joomla! 4.0.0 - 4.1.0

**Fix complications**  
The code is introduced in a new file which has to be at a specific location. Moreover, the new file is a third-party file installed as a Composer dependency. For security reasons, we intentionally limit Patchman’s capability to only modify existing files, and not be able to create new files. We would thus be unable to create this new file.

**Mitigating factors**  
N/A

#### [20220304] Missing input validation within com_fields class inputs

**Vulnerability details**  
Lack of input validation could allow an XSS attack using com_fields.

**Affected versions**  
Joomla! 3.7.0 - 3.10.6

**Fix complications**  
The code is introduced in a new file which has to be at a specific location. For security reasons, we intentionally limit Patchman’s capability to only modify existing files, and not be able to create new files. We would thus be unable to create this new file.

**Mitigating factors**  
N/A

#### [20210402] Inadequate filters on module layout settings

**Vulnerability details**  
Inadequate filters on module layout settings could lead to LFI (Local File Inclusion).

**Affected versions**  
Joomla! 2.5.0 - 3.9.25

**Fix complications**  
The fix for this vulnerability consists of 2 separate independent fixes. The security fix for ModuleHelper.php can be backported and is patched by Patchman.

However, the other fix adds a new regular expression for validating the module layout field value. The reason why we can’t backport this security fix is exactly the same as for **[2021103] Path traversal in mod_random_image** below.

The Joomla! logic requires the file to be added (containing the regular expression) with this exact filename. Since creating files is not a possibility for Patchman, we are unable to provide this fix.

**Mitigating factors**  
The module that contains this feature is managed from the admin section. That means the attacker requires a functional user account with access to the admin section in order to exploit this.

#### [20201103] Path traversal in mod_random_image

**Vulnerability details**  
The folder parameter of mod_random_image lacks input validation which could lead to a path traversal vulnerability.

**Affected versions**  
Joomla! 2.5.0 - 3.9.22

**Fix complications**  
The official fix for this problem (in the file modules/mod_random_image/mod_random_image.xml) would also require a change in a dependent file libraries/src/Form/Rule/FilePathRule.php. Unfortunately, this file does not exist in versions prior to 3.9.21.

Our product is designed specifically to only be able to modify files which are marked by our own signature set as being vulnerable - that means we've intentionally limited our software to not be able to modify random files, let alone create or delete them. In the vast majority of cases, this doesn't matter. Many vulnerabilities don't actually require new files to be added - new code to pre-existing files is far more common. Unfortunately, this is the exception.

Due to our self-imposed restrictions, we are unable to properly make this vulnerability patch available to our customers in a way that is compatible with all Joomla! versions.

**Mitigating factors**  
The module that contains this feature is managed from the admin section. That means the attacker requires a functional user account with access to the admin section in order to exploit this.

#### [20200602] Inconsistent default textfilter

**Vulnerability details**  
The default settings of the global "textfilter" configuration doesn't block HTML inputs for 'Guest' users. With 3.9.19, the textfilter for new installations has been set to 'No HTML' for the groups 'Public', 'Guest' and 'Registered'.

**Affected versions**  
Joomla! 2.5.0 - 3.9.18

**Fix complications**  
The code is introduced in a new file which has to be at a specific location. For security reasons, we intentionally limit Patchman’s capability to only modify existing files, and not be able to create new files. We would thus be unable to create this new file.

**Mitigating factors**  
The official patch only changes defaults, which only affects newly installed Joomla! sites. For existing sites, this patch would not change the required settings.

However, those settings can be changed manually to “No HTML” by site administrators through System -> Global -> Text Filters.

#### [20200604] XSS in jQuery.htmlPrefilter

**Vulnerability details**  
jQuery released version 3.5.0 containing 2 security fixes for 2 vulnerabilities:

* [Passing HTML from untrusted sources](https://github.com/jquery/jquery/security/advisories/GHSA-gxr4-xjj5-5px2)
* [Passing HTML containing `option` elements from untrusted sources](https://github.com/jquery/jquery/security/advisories/GHSA-jpcq-cgw6-v4j6)

**Affected versions**  
Joomla! 3.0.0 - 3.9.18

**Fix complications**  
This doesn’t concern a Joomla! core vulnerability. If we would patch this vulnerability, we would also affect projects other than Joomla! We want to avoid that, because we can’t guarantee that those other projects will be compatible with our changes to the code.

**Mitigating factors**  
N/A

#### [CVE-2015-8566] Remote code execution via php_var_unserialize

**Vulnerability details**  
Several PHP bugs relating to unserialization functions ([#70172](https://bugs.php.net/bug.php?id=70172) and [#70219](https://bugs.php.net/bug.php?id=70219)) were exploitable through the Joomla! Session Framework, allowing arbitrary remote code execution through specially forged requests.

**Affected versions**  
Joomla! 1.5 - 3.4.6

**Fix complications**  
The official fix for the problem released by the Joomla! Project modified the session serialization handlers the Joomla! Session Framework. For any code that uses the official API functions provided by the JSF this doesn't matter. However, many custom extensions try accessing the session variables directly, which would break after applying this update. Since Patchman wants to only provide fixes that do not break a website under any circumstances (regardless of which extensions are installed) this is a blocking problem for releasing the fix.

**Mitigating factors**  
The vulnerability in PHP that allows the remote code execution was fixed in PHP versions 5.4.45, 5.5.29, 5.6.13 and 7. Several other sources also provided backported security fixes for PHP 5.3. If you are running a PHP version that is still under security support (official or third-party) the vulnerability has been patched in PHP itself and is no longer exploitable regardless of the use of unserialization functions in Joomla.

#### [20160803] Cross-site request forgery in com_joomlaupdate

**Vulnerability details**  
The Joomla! Update Component does not perform CSRF token checks, allowing attackers to trick site administrators in triggering automatic Joomla! updates.

**Affected versions**  
Joomla! 2.5.4 - 3.6.0

**Fix complications**  
The official fix for the problem released by the Joomla! Project introduced checks on a new CSRF token, but also required such a token to be generated by the update migration path. Even for a regular update, this introduced complications (see [this official announcement](https://www.joomla.org/announcements/release-news/5666-the-joomla-3-6-1-update.html)). It would be very complicated for us to backport this security fix while maintaining functional equivalence of the older installs of the Joomla! Update Component.

**Mitigating factors**  
The worst case scenario that the vulnerability allows is triggering an automatic update from an official upstream source. This may be bad for website owners as it may break compatibility with themes and extensions, but by no means allows malicious attacks such as spam attacks or phishing site uploads (the kind of attacks Patchman prevents). From a server security standpoint, this vulnerability is harmless.

### Drupal

#### [SA-CORE-2022-011] Third-party libraries

**Vulnerability details**  
Drupal uses the third-party Guzzle library for handling HTTP requests and responses to external services. Guzzle has released a security update that may affect some Drupal sites.

This update contains the following security fixes:

* [Failure to strip the Cookie header on change in host or HTTP downgrade](https://github.com/guzzle/guzzle/security/advisories/GHSA-f2wf-25xc-69c9)
* [Fix failure to strip Authorization header on HTTP downgrade](https://github.com/guzzle/guzzle/security/advisories/GHSA-w248-ffj2-4v5q)

**Affected versions**  
Drupal 9.3.0 - 9.3.15  
Drupal 9.0.0 - 9.2.20  
Drupal 8.x

**Fix complications**  
This doesn’t concern a Drupal core vulnerability. If we would patch this vulnerability, we would also affect projects other than Drupal. We want to avoid that because we can’t guarantee that those other projects will be compatible with our changes to the code.

**Mitigating factors**  
N/A

#### [SA-CORE-2022-010] Third-party libraries

**Vulnerability details**  
Drupal uses the third-party Guzzle library for handling HTTP requests and responses to external services. Guzzle has released a security update that may affect some Drupal sites.

Guzzle released an update containing the following security fixes:

* [https://github.com/guzzle/guzzle/security/advisories/GHSA-cwmx-hcrq-mhc3](https://github.com/guzzle/guzzle/security/advisories/GHSA-cwmx-hcrq-mhc3)
* [https://nvd.nist.gov/vuln/detail/CVE-2022-29248](https://nvd.nist.gov/vuln/detail/CVE-2022-29248)

**Affected versions**  
Drupal 9.3.0 - 9.3.13  
Drupal 9.0.0 - 9.2.19  
Drupal 8.x

**Fix complications**  
This doesn’t concern a Drupal core vulnerability. If we would patch this vulnerability, we would also affect projects other than Drupal. We want to avoid that because we can’t guarantee that those other projects will be compatible with our changes to the code.

**Mitigating factors**  
N/A

#### [SA-CORE-2022-006] Third-party libraries

**Vulnerability details**  
Drupal uses the third-party Guzzle library for handling HTTP requests and responses to external services. Guzzle has released a security update that may affect some Drupal sites.

Guzzle released an update containing the following security fixes:

* [https://github.com/guzzle/psr7/security/advisories/GHSA-q7rv-6hp3-vh96](https://github.com/guzzle/psr7/security/advisories/GHSA-q7rv-6hp3-vh96)
* [https://nvd.nist.gov/vuln/detail/CVE-2022-24775](https://nvd.nist.gov/vuln/detail/CVE-2022-24775)

**Affected versions**  
Drupal 9.3.0 - 9.3.9  
Drupal 9.0.0 - 9.2.16  
Drupal 8.x

**Fix complications**  
This doesn’t concern a Drupal core vulnerability. If we would patch this vulnerability, we would also affect projects other than Drupal. We want to avoid that because we can’t guarantee that those other projects will be compatible with our changes to the code.

**Mitigating factors**  
N/A

#### [SA-CORE-2022-005] Third-party libraries

**Vulnerability details**  
Drupal core uses the third-party CKEditor library for WYSIWYG editing. A potential vulnerability has been discovered in CKEditor 4 HTML processing core module. The vulnerability allowed to inject malformed HTML bypassing content sanitization, which could result in executing JavaScript code. Another vulnerability discovered in CKEditor 4 dialog allowed an attacker to abuse a dialog input validator regular expression, which could cause a significant performance drop resulting in a browser tab freeze. It affects all users using the CKEditor 4 at version < 4.18.0. Drupal included these fixes in [SA-CORE-2022-005](https://www.drupal.org/sa-core-2022-005).

CKEditor released 4.18 containing the following security fixes:

* [CVE-2022-24728: HTML processing vulnerability allowing to execute JavaScript code](https://github.com/ckeditor/ckeditor4/security/advisories/GHSA-4fc4-4p5g-6w89)
* [CVE-2022-24729: Regular expression Denial of Service in dialog plugin](https://github.com/ckeditor/ckeditor4/security/advisories/GHSA-f6rf-9m92-x2hh)

**Affected versions**  
Drupal 9.3.0 - 9.3.7  
Drupal 9.0.0 - 9.2.14  
Drupal 8.x

**Fix complications**  
This doesn’t concern a Drupal core vulnerability. If we would patch this vulnerability, we would also affect projects other than Drupal. We want to avoid that because we can’t guarantee that those other projects will be compatible with our changes to the code.

**Mitigating factors**  
N/A

#### [SA-CORE-2022-001] [SA-CORE-2022-002] Cross Site Scripting

**Vulnerability details**  
jQuery UI released version 1.13.0 containing  the following security fixes:

* CVE-2021-41183: [XSS in the of option of the .position() util](https://github.com/jquery/jquery-ui/security/advisories/GHSA-j7qv-pgf6-hvh4)
* CVE-2021-41182: [XSS in the altField option of the Datepicker widget](https://github.com/jquery/jquery-ui/security/advisories/GHSA-9gj3-hwp5-pmwc)
* CVE-2021-41183: [XSS in *Text options of the Datepicker widget](https://github.com/jquery/jquery-ui/security/advisories/GHSA-j7qv-pgf6-hvh4)

Drupal included these fixes in:

* [https://www.drupal.org/sa-core-2022-001](https://www.drupal.org/sa-core-2022-001)
* [https://www.drupal.org/sa-core-2022-002](https://www.drupal.org/sa-core-2022-002)

vAffected versions**  
Drupal 9.0.0 - 9.3.2  
Drupal 7.0.0 - 7.86

**Fix complications**  
This doesn’t concern a Drupal core vulnerability. If we would patch this vulnerability, we would also affect projects other than Drupal. We want to avoid that, because we can’t guarantee that those other projects will be compatible with our changes to the code.

**Mitigating factors**  
N/A

#### [SA-CORE-2021-011] Cross Site Scripting

**Vulnerability details**  
Drupal core uses the third-party CKEditor library for WYSIWYG editing. When capable of creating or editing content, an attacker could exploit one or more Cross-Site Scripting (XSS) vulnerabilities to target users with or without access to the WYSIWYG CKEditor. These vulnerabilities affect CKEditor 4.16.2 and older.

**Affected versions**  
Drupal 9.2.0 - 9.2.8  
Drupal 9.1.0 - 9.1.13  
Drupal 9.0.0 - 9.0.14  
Drupal 8.0.0 - 8.9.19

**Fix complications**  
This doesn’t concern a Drupal core vulnerability. If we would patch this vulnerability, we would also affect projects other than Drupal. We want to avoid that, because we can’t guarantee that those other projects will be compatible with our changes to the code.

**Mitigating factors**  
Vulnerabilities are only possible if an attacker has create or edit content rights and Drupal is configured to allow use of the CKEditor library for WYSIWYG editing.

#### [SA-CORE-2021-005] Third party libraries

**Vulnerability details**  
Drupal core uses the third-party CKEditor library for WYSIWYG editing. When capable of creating or editing content, an attacker could exploit one or more Cross-Site Scripting (XSS) vulnerabilities to target users with access to the WYSIWYG CKEditor. This vulnerability affects CKEditor 4.16.1 and older.

**Affected versions**  
Drupal 9.2.0 - 9.2.3  
Drupal 9.1.0 - 9.1.11  
Drupal 9.0.0 - 9.0.14  
Drupal 8.0.0 - 8.9.17

**Fix complications**  
This doesn’t concern a Drupal core vulnerability. If we would patch this vulnerability, we would also affect projects other than Drupal. We want to avoid that, because we can’t guarantee that those other projects will be compatible with our changes to the code.

**Mitigating factors**  
Vulnerabilities are only possible if Drupal is configured to allow use of the CKEditor library for WYSIWYG editing.

#### [SA-CORE-2021-004] Third party libraries (8.x and 9.x branches only)

**Vulnerability details**  
The Drupal project uses the PEAR Archive_Tar library, which released a security update.

**Affected versions**  
Drupal 9.2.0 - 9.2.1  
Drupal 9.0.0 - 9.1.10  
Drupal 8.0.0 - 8.9.16  
Drupal 7.0 - 7.81 (see Notes below)

**Fix complications Drupal 8 and 9**  
This doesn’t concern a Drupal core vulnerability. If we would patch this vulnerability, we would also affect projects other than Drupal. We want to avoid that, because we can’t guarantee that those other projects will be compatible with our changes to the code.

**Mitigating factors**  
Exploitation was only possible if contribution or custom code uses the library to extract tar archives (for example .tar, .tar.gz, .bz2, or .tlz) which come from a potentially untrusted source.

**Note for Drupal 7.x**  
The vulnerability is patchable for affected versions in the 7.x branch (Drupal 7.0 - 7.81) because this branch includes a copy of the library which is specific to Drupal, and thus can be safely patched without risking modification to unrelated applications.

#### [SA-CORE-2021-003] Cross Site Scripting

**Vulnerability details**  
Drupal core uses the third-party CKEditor library. This library has an error in parsing HTML that could lead to an XSS attack. This vulnerability affects CKEditor 4.16.0 and older.

**Affected versions**  
Drupal 9.1.0 - 9.1.8  
Drupal 9.0.0 - 9.0.13  
Drupal 8.0.0 - 8.9.15

**Fix complications**  
This doesn’t concern a Drupal core vulnerability. If we would patch this vulnerability, we would also affect projects other than Drupal. We want to avoid that, because we can’t guarantee that those other projects will be compatible with our changes to the code.

**Mitigating factors**  
This only affects sites with CKEditor enabled.

#### [SA-CORE-2021-001] Third party libraries

**Vulnerability details**  
The Drupal project uses the PEAR Archive_Tar library. The PEAR Archive_Tar library has released a security update that impacts Drupal. For more information please see:

* [CVE-2020-36193](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-36193)

Drupal included these fixes in [SA-CORE-2021-001](https://www.drupal.org/sa-core-2021-001).

**Affected versions**  
Drupal 9.1.0 - 9.1.2  
Drupal 9.0.0 - 9.0.10  
Drupal 8.0.0 - 8.9.12  
Drupal 7.0 - 7.77

**Fix complications**  
This doesn’t concern a Drupal core vulnerability, but a library which is installed through package manager composer. Thus, introducing the official change in a composer file would not do anything to fix this problem.

As we currently do not offer patching support for the PEAR Archive_Tar library, this vulnerability in the library itself is out of scope.

**Mitigating factors**  
The vulnerability is only exploitable if Drupal is configured so that untrusted users are allowed to upload files with the extensions .tar, .tar.gz, .bz2 or .tlz.

#### [SA-CORE-2020-013] Arbitrary PHP code execution

**Vulnerability details**  
The Drupal project uses the PEAR Archive_Tar library. The PEAR Archive_Tar library has released a security update that impacts Drupal. For more information please see:

* [CVE-2020-28948](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-28948)
* [CVE-2020-28949](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-28949)

Drupal included these fixes in [SA-CORE-2020-013](https://www.drupal.org/sa-core-2020-013).

**Affected versions**  
Drupal 9.0.0 - 9.0.8  
Drupal 8.9.0 - 8.9.9  
Drupal 8.0.0 - 8.8.11  
Drupal 7.0 - 7.74

**Fix complications**  
This doesn’t concern a Drupal core vulnerability, but a library which is installed through package manager composer. Thus, introducing the official change in a composer file would not do anything to fix this problem.

As we currently do not offer patching support for the PEAR Archive_Tar library, this vulnerability in the library itself is out of scope.

**Mitigating factors**  
The vulnerability is only exploitable if Drupal is configured so that untrusted users are allowed to upload files with the extensions .tar, .tar.gz, .bz2 or .tlz.

#### [SA-CORE-2020-002] Cross Site Scripting

**Vulnerability details**  
jQuery released version 3.5.0 containing 2 security fixes for 2 vulnerabilities:

* [Passing HTML from untrusted sources](https://github.com/jquery/jquery/security/advisories/GHSA-gxr4-xjj5-5px2)
* [Passing HTML containing `option` elements from untrusted sources](https://github.com/jquery/jquery/security/advisories/GHSA-jpcq-cgw6-v4j6)

Drupal included these fixes in [SA-CORE-2020-002](https://www.drupal.org/sa-core-2020-002).

**Affected versions**  
Drupal 8.8.0 - 8.8.5  
Drupal 8.0.0 - 8.7.13  
Drupal 7.0 - 7.69

**Fix complications**  
This doesn’t concern a Drupal core vulnerability. If we would patch this vulnerability, we would also affect projects other than Drupal. We want to avoid that, because we can’t guarantee that those other projects will be compatible with our changes to the code.

**Mitigating factors**  
N/A

#### [SA-CORE-2020-001] Third party libraries

**Vulnerability details**  
The Drupal project uses the third-party library [CKEditor](https://github.com/ckeditor/ckeditor4). That library released a [security improvement](https://ckeditor.com/blog/CKEditor-4.14-with-Paste-from-LibreOffice-released/#security-issues-fixed) in order to protect some Drupal configurations. Drupal included these fixes in [SA-CORE-2020-001](https://www.drupal.org/sa-core-2020-001).

**Affected versions**  
Drupal 8.8.0 - 8.8.3  
Durpal 8.0.0 - 8.7.11

**Fix complications**  
This doesn’t concern a Drupal core vulnerability. If we would patch this vulnerability, we would also affect projects other than Drupal. We want to avoid that, because we can’t guarantee that those other projects will be compatible with our changes to the code.

**Mitigating factors**  
N/A

* * * 

## Why is plugin X not patched by Patchman?

:::tip 
Plugin vulnerability coverage is only provided for customers on the COVERAGE plan. For a comprehensive list of our patching services in each of the plans, please refer to [Which applications does Patchman scan and fix?](./#which-applications-does-patchman-detect-and-fix) 
:::

:::tip 
For non-plugin vulnerabilities, please see the companion page [Why is vulnerability X not fixed by Patchman?](./#why-is-vulnerability-x-not-fixed-by-patchman) 
:::

Aside from the plugins we provide full patching support for, we also monitor newly discovered vulnerabilities in plugins we don’t yet cover. If a new vulnerability is discovered in one of those plugins, we make a careful assessment of the impact it will have for our customers. When we deem the risk to be substantial, and the fix to be feasible, we will add coverage for that specific vulnerability to our coverage.

:::warning 
Note that adding such a one-time patch to our coverage does not mean that we will continue to provide patches for all future vulnerabilities in that plugin. Unfortunately, it is infeasible for us to provide full continuous support for all the plugins out there, so we are forced to select those vulnerabilities for which patching will provide you with significant security benefits. 
:::

Sometimes, we take a plugin vulnerability in consideration, but we are unable to provide patches for it for technical reasons. On this page, we provide you all the information for those plugins we have considered but not been able to add to our coverage.

#### WordPress plugin: Easy WP SMTP

**Vulnerability details**  
The plugin creates a debug log in the installation folder when SMTP settings are configured and the debug log feature is enabled in the plugin. All emails sent by the site are recorded in the log from that moment onwards. Hackers could initiate an admin password reset and grab the reset link from the debug log - which is unintentionally publicly accessible for servers that have directory listing enabled.

**Affected versions**  
Easy WP SMTP <= 1.4.3

**Fix complications**  
An important part of the security fix is that the log file must be stored in the newly created "/logs" folder, which is protected against file listing by an .htaccess file containing `Deny from all` and an empty index.html.

Our product can only modify files and can't create folders and files. We are thus unable to create this folder and its default files to offer the required protections. By that limitation, we are unable to provide a fix through Patchman.

**Note:** We are aware of other security updates - related to this vulnerability - that have been made in various other versions (1.4.3 and 1.4.5). Security fixes coming from these versions are based on the core changes described here above and/or require a new file being added. Therefore, we can't backport those changes either.

**Mitigating factors**  
This only affects websites that have directory listings enabled by default. Most hosting environments disable this behavior by default because it can cause various security risks such as this; as a result, many websites will not expose the log file to the public internet.

#### WordPress plugin: WPBakery

**Vulnerability details**  
This flaw made it possible for authenticated attackers with contributor-level or above permissions to inject malicious JavaScript in posts.

**Affected versions**  
WPBakery <= 6.4

**Fix complications**  
There is no available archive of previous versions, which means we would be unable to backport the fix to older versions. Since this is considered an essential part of the security service our product provides, we feel that being unable to provide patches for older versions means we are unable to provide decent security for this plugin.

**Mitigating factors**  
This is a premium plugin, meaning its users pay to have access to the plugin. We believe that in general, when people are paying for the service of updates from the maintainer, they are more inclined to use it. This, combined with the relatively small install base, means that we consider the attack surface to be limited.

#### WordPress plugin: File Manager

**Vulnerability details**  
Improper image validation allows uploading malicious scripts as payload in image uploads. This provides attackers with a means to execute those scripts on target websites.

**Affected versions**  
WordPress File Manager 6.0 - 6.8

**Fix complications**  
The vulnerability is in a library file which is also used outside this plugin. If we would patch this vulnerability, we would also affect projects. We want to avoid that, because we can’t guarantee that those other projects will be compatible with our changes to the code.

**Mitigating factors**  
N/A

* * *

## How do I interpret the statistics shown on the Portal Dashboard?

The Patchman Dashboard shows four distinct metrics to provide a high level overview on the state and health of your platform. This data aggregates detections and detection states from across all added servers. Because it is not always obvious how these are constructed or how they should be interpreted, this article hopes to shed further light by breaking them down. 

### Unpatched files

The top number is a straightforward counter of the total number of unresolved vulnerability detections— or more simply, unpatched files.

The bottom numbers show a breakdown of the underlying _vulnerabilities_, by type, listing the top 4 vulnerability types present on the platform. There may be vulnerability types present on the platform but not listed here, if they are not in the top 4 types. 

An important point is that the top number lists unpatched files, and a detection/patch for a file can incorporate fixes for multiple vulnerabilities. The breakdown by type looks at those vulnerabilities, meaning one detection in the top counter could be broken down into multiple vulnerabilities in the breakdown.  

### Unresolved malware threats

The top number is a counter of the total number of unresolved malware detections. This incorporates both 'full-file' malware and dynamic malware detections stemming from Patchman CLEAN. 

The bottom numbers show a breakdown of the underlying malware detections, by type, listing the top 4 malware types present on the platform. There may be malware types present on the platform but not listed here, if they are not in the top 4 types. 

### Malware detections (past 30 days)

An overview of all malware found on the platform in the past 30 days, regardless of the detection state. As this includes both resolved and unresolved detections, it does not reflect the extent to which issues were addressed (as that's what the second counter is for); merely the number and type of 'recent' malware detections. 

### Vulnerable servers

This section lists up to four servers which are most vulnerable, based on the number of vulnerable end-users on each server. A vulnerable end-user, in this context, is an end-user with an open issue of any type, including both vulnerabilities and malware. The number of open issues per end-user is not taken into account.

### General notes

All counters on the Dashboard include metrics for any added sub-organizations. 

The statistics on the dashboard are cached for a period of 5 minutes.

* * * 

## How do I enable / manage access to the Patchman portal for my hosting customers?

It is possible to grant end-users within your integrated control panel environment access to the Patchman Portal, allowing them to review detections for their account, as well as interact with Patchman in order to execute or block actions, or— for example— set a custom email address as an override.  
  
You can enable the end-user login option on the Policy view, and it affects all users to whom said policy applies. This allows you to manage this flexibly for your platform.

You can find the policy view by logging onto the Portal and visiting Management > Policies in the lefthand menu. Once there, you can scroll down to the option called ‘End user login’. See the screenshot below:  

![](/images/end-user-login-patchman.png)

This will show you which user segments currently have access to the end user login option. To review what these groups (administrators, resellers, users) mean, see [this article](/patchman/portal/#control-panel-user-level-equivalents).

To change the setting, hit the edit icon, which will open the policy edit view. Once there, you can navigate to the following section:  

![](/images/end-user-login-settings.png)

Here you can choose whom to enable end user login for. It is also possible to disable this option entirely.

* * *

## Real-time scanning, what is it and how do I configure it?

Real-time scanning is only available to customers with [Patchman CLEAN](/patchman/frequently_asked_questions/#what-is-patchman-clean-and-how-do-i-enable-configure-it).

### What is real-time scanning?

Traditionally, Patchman mainly performs daily scans to find vulnerabilities and malware on your server. With the addition of real-time scanning, Patchman is able to monitor all file changes for all websites in real time. This means that as soon as a file is created or modified, Patchman immediately scans the file and is able to take appropriate action if necessary.

### How does real-time scanning benefit me?

Our traditional scanning approach is optimized for vulnerability scanning. Vulnerabilities don’t suddenly appear on your server - instead, they are usually there for some time in a file, until someone discovers that that file actually contains a vulnerability. Our traditional scanning mechanism is able to very quickly find out which files on your server are vulnerable once such a new vulnerability is discovered, due to our combination of daily scanning, intelligent ad hoc scanning and file state caching.

Malware, however, usually appears suddenly. Relying on daily scanning here means that a malware file can be on your server for hours before we find it, and in many cases, the damage of that malware has already been done. For this reason, we need to be able to find out about a file as soon as it appears, so that we can immediately scan it for malware, and don’t have to wait for the next daily scan.

The real-time scanning in Patchman relies on the Linux Audit Framework, which keeps track of all file changes across your entire server. As soon as a file change is spotted that we are interested in, the file is scanned by Patchman. If the file indeed contains malware, the appropriate remediation action will be taken immediately, per your policy configuration.

While this mechanism can also pick up vulnerabilities faster, we don’t consider this to be an impactful application of real-time scanning. It is thus primarily of use for malware detection, which is why it is a part of our advanced malware remediation package, Patchman CLEAN.

### How do I enable real-time scanning?

For technical reasons, a key piece of functionality has to be installed separately from the main patchman-client package. Our automatic installation script can handle this for you, both on new servers and those that already have Patchman installed. Simply re-run the command listed in the Portal (under Servers -> Add Server) and you will be asked whether you want real-time scanning enabled.

```
Do you also want to use real-time scanning? (Note this feature requires a plan that supports real-time scanning.)

Install? [y/N]
```

Real-time scanning will automatically start within 5 minutes of this installation.

### What is required for real-time scanning?

This feature requires the Linux Audit Framework to be enabled, which is part of the Linux kernel by default on all our supported distributions. It might be disabled if you use a custom kernel; in that case, refer to your compilation parameters.

Most configurations (including defaults) for the Linux Audit Framework are safe to use with Patchman real-time scanning. However, if you have customized it, we strongly recommend you check the following 2 settings:

* Depending on your distribution, check /etc/audit/auditd.conf or /etc/audispd/audispd.conf for a setting called `overflow_action`. The values `ignore` or `syslog` are safe. We do not support this value being set to `suspend`, `single` or `halt`.
* Check the output of the command `auditctl -s`, and verify that the line starting with `failure` is set to either `0` or `1`. We do not support this value being set to `2`.

Configuring the above against our recommendations would risk inadvertent halting or suspension of your server as an unwanted side effect, and as such we strongly advise against such configuration if you are using Patchman real-time scanning. We can’t provide support for problems of any sorts if your configuration goes against the above recommendations.

### Which limitations does real-time scanning have?

In our initial release, real-time scanning is not always able to properly resolve events in chrooted environments. The most common scenario affected by this is uploading a file by FTP, if the FTP daemon is configured to use chroots, as is common across control panel software. We are currently working on improvements in our next release which will capture such events correctly.

If you are unsure whether our implementation is catching or missing events, feel free to [contact us](/patchman/getting_started/#contact-us) so we can take a look if we can do more to improve our solution for your needs!
