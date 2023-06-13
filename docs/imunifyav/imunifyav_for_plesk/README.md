# ImunifyAV(+) for Plesk

ImunifyAV for Plesk is an intelligent antivirus and security monitoring tool designed to work with Plesk CMS. It performs one-click automatic malware cleanup, domain reputation monitoring as well as blacklist status check and is available as a Free and a Premium (ImunifyAV+) version.

* [Quick introduction for server admins](/imunifyav_for_plesk/#quick-introduction-for-server-admins)
    * [Premium (ImunifyAV+) version and automatic malware cleanup](/imunifyav_for_plesk/#premium-imunifyav-version-and-automatic-malware-cleanup)
    * [Video](/imunifyav_for_plesk/#video)
* [Quick introduction for users](/imunifyav_for_plesk/#quick-introduction-for-users)
* [Explanations](/imunifyav_for_plesk/#explanations)
    * [Explaining the Domain tab](/imunifyav_for_plesk/#explaining-the-domain-tab)
    * [Explaining the Settings tab](/imunifyav_for_plesk/#explaining-the-settings-tab)
    * [How to activate a license key (for paid versions)](/imunifyav_for_plesk/#how-to-activate-a-license-key-for-paid-versions)
    * [How the Antivirus removes malware](/imunifyav_for_plesk/#how-the-antivirus-removes-malware)
* [FAQ](/imunifyav_for_plesk/#faq)
* [Troubleshooting](/imunifyav_for_plesk/#troubleshooting)
* [Removing ImunifyAV for Plesk](/imunifyav_for_plesk/#removing-imunifyav-for-plesk)
* [Extension diagnostics](/imunifyav_for_plesk/#extension-diagnostics)
    * [How to collect Plesk debug log](/imunifyav_for_plesk/#how-to-collect-plesk-debug-log)

## Quick introduction for server admins

In order to scan your websites for malware using the ImunifyAV all you need is to install the extension from Plesk Marketplace, open the _Domains_ tab and click the _Scan All_.

![](/images/PleskAVScanAll.png)

It will queue tasks to scan a complete list of websites for viruses, backdoors, web-shells, hacker’s scripts, phishing pages and other malware and run the process of websites scanning depending on specified number of concurrent scanning threads (1, 2 or 4) in the _Settings_ tab. Also it will check each domain for blacklist status in search engines and antivirus services.

Another option is to click the _Scan_ button next to the particular website to check the single website for malware and blacklist status.

![](/images/PleskAVActions.png)

In order to prevent server resources overload during scanning a set of websites the antivirus extension queues the scanning tasks and runs them with respect to the configured resources limitations (_Max working threads_ in the _Settings_ tab).

![](/images/PleskAVActionStatus.png)

Take into consideration that default settings may not be optimal in terms of scanning speed so we would recommend to check the _Settings_ tab before start and adjust the following parameters manually to set optimal values for better performance (or less server load).

![](/images/PleskAVSettings.png)

:::tip Note
The _Max working threads_ is limited by a half of CPU core number on server. So the 1 or 2 CPU cores gives one working thread as maximum.
:::

When the scanning process is finished, check infection statuses of your websites. If everything in the report is green, congrats! It usually means your websites are neither compromised nor infected and blacklisted.

![](/images/PleskAVStatusGreen.png)

If you’ve noticed some “red alerts” next to the domain most likely it means the particular website is compromised and infected. Click the _View Report_ button and see the details.

If you see some “orange alerts” next to the domain and _Domain blacklisted_ notice it means the domain is blacklisted in either search engines or antivirus services. Click the _View Report_ button to see blacklist status details.

![](/images/PleskAVStatusDifferent.png)

The detailed report shows you the list of detected malware and domain blacklist status.

![](/images/PleskAVScanningReport.png)

### Premium (ImunifyAV+) version and automatic malware cleanup

In the Premium version of the Antivirus you can clean the malware automatically using the _Clean Malware_ button.

### Video

Watch the quick demo on how it works and then try it on your own.


<iframe width="560" height="315" src="https://www.youtube.com/embed/esQRNFLB-fQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Quick introduction for users

In order to scan your websites for malware using the ImunifyAV all you need is to click the _ImunifyAV_ icon under the particular domain and then click the _Scan_ button.

![](/images/PleskAVForUser.png)

![](/images/PleskAVForUserDomain.png)

When you click the _Scan_ button the Antivirus queues a scanning task and runs it when server resources are available (it may start immediately or with some delay). The resources are configured by server admin so there might be a queue for the scanning process. The queue lets all users checking their websites on demand without server overload. Thus if you see _Queued_ in the status column – everything is OK, scanning will start as soon as the resources are available or another scanning is finished.

![](/images/PleskAVQueued.png)

Upon completion check the status. If the report shows a green icon, congrats, it usually means your website is not compromised and clean.

![](/images/PleskAVStatusOK.png)

If you’ve noticed some “red alerts” next to the domain most likely it means the particular website is compromised and infected. Click the _View Report_ button and see the details.

If you see some “orange alerts” next to the domain and _Domain blacklisted_ notice it means the domain is blacklisted in either search engines or antivirus services. Click the _View Report_ button to see blacklist status details.

![](/images/PleskAVViewReport.png)

Watch the quick demo on how it works.

<iframe width="560" height="315" src="https://www.youtube.com/embed/kfJeerML_ng?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Explanations

### Explaining the _Domain_ tab

The screen below explains controls on the _Domain_ tab.

![](/images/PleskAVDomainTab.png)

### Explaining the _Settings_ tab

![](/images/PleskAVSettingsTab.png)

* **Quick Scan mode**
    It configures antivirus to check critical files only: ph*, js, htm*, .htaccess, txt, tpl and some others. It will not scan media files (.png, .jpg, …), documents (.docx, .xlsx, .pdf, ..), and some other types. This helps to reduce server load and increase scanning speed dramatically.
* **Skip images and other media files**
    It configures antivirus to check all files besides media files and documents. This also helps to reduce server load and increase scanning speed dramatically. The difference between previous option is that enabled _Skip images…_ makes antivirus scan unknown extensions, but _Quick scan_ will skip them.
* **Optimize scanning by speed**
    It configures antivirus to turn on an “intelligent mode” while scanning cache folders. It will scan files from cache folders selectively which sometimes dramatically speed up the scanning process with the same level of malware detection.
* **Max working threads**
    It specifies the amount of concurrent scanning threads, i.e how many websites will be scanned or cleaned concurrently. By default it is limited by a half of CPU core number. So if your server has 8 cores, the antivirus allows you to configure 4 concurrent threads as maximum. But you can set it to 1 or 2 just to reduce server load during the scanning process.
* **Scheduled rescanning**
    It configures the interval of automatic website rescanning: once a day, once a week, once a month or never.  We recommend to set it to “Daily” to be notified ASAP about any security issues. This option is available in the Premium version of antivirus.
* **Start automatic scanning at**
    It configures the exact time of automatic website scanning.
* **Notify on website infection via email**
    It configures antivirus to send out an email notification after scheduled scanning if websites are infected or blacklisted.This option is available in the Premium version of antivirus.
* **Max allocated memory…**
    It configures how much memory is allowed for a single scanning process. If some websites fail to scan try to increase this value. It is limited by 1GB.
* **Number of days to keep…**
    It configures antivirus to keep backup versions of cleaned files. During this period you can restore these files back using “Undo” button.
* **Trim malicious files instead of deleting it**
    It configures antivirus do not delete files when malware is detected but trim it instead. So the file will be 0 length but kept in the file system. If you are 100% sure that all detected malicious files are not included into another files or database so you can uncheck this option and run _Cleanup_.
* **Update antivirus database automatically**
    It configures antivirus to update malware database automatically every day. We recommend to enable this option.
* **Allow users to use files ignore list**
    It allows common users to add files that should be omitted by the scanner to the Ignore list.
* **Enable antivirus warning banners**
    It configures antivirus to show warnings.
* **Enable ImunifyAV menu shortcut**
* **Scanning timeout**
    It configures antivirus to update/increase scan time. Sometimes there are situations when the site is too large or the server is loaded and the scanning process can be terminated due to timeout. It means that the scanner did not have time to complete the scan.
* **Log level**


### How to activate a license key (for paid versions)

Once you have paid for the Premium version of antivirus in [Plesk Extension](https://ext.plesk.com/packages/b71916cf-614e-4b11-9644-a5fe82060aaf-revisium-antivirus) directory you receive a confirmation mail with details and activation link. If you have already followed those steps and still have not got the Premium version try manual activation:

1. Login in as Administrator to the Plesk panel. Go to _Tools & Settings -> License Management_ 

    ![](/images/PleskAVToolsAndSettings.png)

2. Click the _Retrieve Keys_

    ![](/images/PleskAVRetrieveKeys.png)

3. You will see the screen like below

    ![](/images/PleskAVKeyUpdateStatus.png)

4. Ensure that you have a license for the `ext-revisium-antivirus` under the _Additional License Keys_ tab

5. Congrats! Now you are ready to experience Premium version of the ImunifyAV. Check the _About_ tab to ensure that the Premium version is enabled.

    ![](/images/PleskAVAboutTab.png)

In case of any issues with purchasing or activating extension contact Support at [https://cloudlinux.zendesk.com/hc/en-us/requests/new](https://cloudlinux.zendesk.com/hc/en-us/requests/new).


### How the Antivirus removes malware

ImunifyAV works as a regular antivirus: it looks for the malicious piece of code in the files of a website while scanning and shows infected files in the report when the scanning finishes. If the user selects to cleanup malware, then the antivirus either removes a piece of malicious injection in the file or removes the entire file depending on the detected threat.

If the entire file is a web-shell or doorway or some other type of malicious file, then antivirus removes it entirely. If there’s only a small injection at the beginning or at the end, or somewhere in the middle of the file, the exact malicious piece of code will be removed, but the rest content is left unchanged. Generally, the antivirus removes the malware and keeps a website up and running.

There’s an option in the settings which defines whether the file is to be removed or just truncated (content of the file is completely removed but the file itself is left on the file system empty and has zero file length).

The truncation is safer than removal because if the file is included in a database template or some other system file or a config file then the website might become broken after a cleanup. Therefore the antivirus uses a safer cleanup by default to keep the website working properly all the time. But one can disable this option in the Settings so the antivirus will remove the file completely in case the entire file is malware.


## FAQ

### Does ImunifyAV protect websites?

ImunifyAV is a comprehensive malware detection and removal tool. Website protection is not a part of the Antivirus.

ImunifyAV can effectively detect any type of website malware and remove it automatically using “one-click” cleanup, but it does not provide a proactive protection from future hacks and web-attacks. Therefore we strongly recommend to “harden” your websites after malware removal:

* Update CMS version and update every plugin
* Enable two-factor authentication for web hosting panel and CMS admin panel
* Setup a Web Application Firewall or corresponding plugin for your CMS
* Set new strong and random passwords for every account (FTP, SSH, ISP, Admin panel)
* Isolate websites from each other under single hosting account or place them on different accounts to prevent cross-contamination
* For VPS admins: update OS and service components of your server, disable any unused services and components


### My websites are clean, what to do next?

It is good to hear that everything in the report has “green” status.

![](/images/PleskAVReportGreen.png)

Just follow the recommendations on websites security to keep them safe and secured. And do not forget to re-scan your websites on a regular basis.

If you are server admin we recommend to schedule re-scanning in the _Settings_ tab so the Antivirus will be checking websites for malware automatically with selected interval. This option is available in the Premium version of the extension.

### My websites are infected, what to do next?

First of all – keep calm and check the detailed report.

Click the _View Report_ button next to the “red” mark and check the list of detected malware.

![](/images/PleskAVReportRed.png)

Depending on your expertise and experience in web development you may resolve it in different ways.

Check the options below.

* Option 1: In the Premium version of the ImunifyAV you can click the _Clean Malware_ button and it will remove the malware automatically. The Antivirus will keep your website up and running after the malware cleanup. It keeps original files for configured period of time (7 days by default) in its backup folder so you can restore them via the _Undo_ button next to the website.

    ![](/images/PleskAVUnduBtn.png)

    The cleanup report looks like this:

    ![](/images/PleskAVMalwareReport.png)

    So try automatic one-button malware cleanup in the Premium version of the ImunifyAV.

* Option 2: If you are an experienced webmaster and using the Free version of the Antivirus you can manually check the files one-by-one in the Plesk File Explorer or in your favourite FTP software to be sure that the listed files are not legitimate and contain the viruses. Just remove the malicious injections or entire file if it’s malicious.
We recommend to create a backup of the entire website before any changes just to be sure that you could restore any changed file when needed.

### What to do when antivirus has detected malware in the legitimate file?

There's a small chance that you may face so-called “false-positives” while scanning the websites for malware i.e. when antivirus software marks a legitimate file as malicious because the file may contain some specific piece of code previously noticed in malware.

Just send us the file and we will include it into the exceptions list of the Antivirus so it will never show up in the report after the antivirus update.

### How to speed up the Antivirus?

The Antivirus scanning performance mostly depends on server performance. But the default configuration of the Antivirus may not be optimal so we would recommend server admins to adjust the default settings for better performance. Just open the _Settings_ tab and check the current parameters.

![](/images/PleskAVSettings1.png)

* **Quick Scan mode** – if checked, the antivirus scans critical files only (php, js, html, htaccess, txt and some others). If you need to scan all files, uncheck the option.
* **Skip images and other media** – if checked, it will skip jpg, png, gif, avi, mpg, mov, bmp, tiff, docx, xlsx, pptx, pdf, and some others. if you need to scan all files, uncheck the option.
* **Optimize by speed** – if checked, the antivirus will do intelligent scanning of cache folders of CMS to speed up overall process. Uncheck the option for careful scanning.
* **Max working threads** – how many websites are to be scanned simultaneously.

Strong recommendation for server admins managing servers with 4 or more number of CPU cores or lots of websites installed to change the _Max working threads_ option.

As the opposite, if you feel that the Antivirus consumes lots of server resources just decrease the _Max working threads_ parameters and the _Max allocated memory…_ parameter.


### How to update the Antivirus?

In the _Settings_ tab you can enable the auto-update option of the Antivirus databases.

![](/images/PleskAVAutoUpdate.png)

Another way for quick update of the ImunifyAV(+) databases is to open the _About_ tab and click the _Update Databases_.

![](/images/PleskAVUpdateDatabases.png)

Also we recommend for server admins checking the ImunifyAV extension for a newer version just to keep the core files up-to-date.

### What if the Antivirus has not detected some malicious files?

We do our best to keep the Antivirus database frequently updated and complete in order to detect as many threats as possible. But still there might be a small chance that some newly released malicious files are not yet in the database. Or there might be also another drawbacks:

1. Check if you’re using the latest version of the ImunifyAV (check for the extension updates)
2. Check if you’re using the latest version of the Antivirus database (check it in the _About_ tab)
3. Check current settings in the _Settings_ tab. By default the Antivirus scans for critical extensions only (php, js, html, and some others). It provides a better performance while scanning everything besides the media files and documents. But the viruses may be located in those files either. So you may want to try the Antivirus in the _full scan_ mode by switching the scanning option.
4. If you try everything above but the Antivirus still does not see the infected file, please, send us the file. We will analyse it and add to the Antivirus database for the next update.

If you found a malicious file which has not been detected by antivirus, please send it to us via [https://cloudlinux.zendesk.com/hc/en-us/requests/new](https://cloudlinux.zendesk.com/hc/en-us/requests/new).

Thanks!

### Where can I find the ImunifyAV log file on Plesk?

You can find the ImunifyAV log file here: `/usr/local/psa/var/modules/revisium-antivirus/revisium-antivirus-local.log`


### Dashboard says "scan failed" with no related error message

Sometimes you can face the issue that during scanning the scan process failed on one domain. And Dashboard says "scan failed" without an error message.

In most cases, the site is large and the scan was terminated due to timeout.

You can try to check records in the `/usr/local/psa/admin/logs/panel.log` and in the `/usr/local/psa/var/modules/revisium-antivirus/revisium-antivirus-local.log` log files.

Please consider increasing the `Scanning timeout` value in the ImunifyAV settings and re-run the scan engine.


## Troubleshooting

### I payed for the extension, but it is not yet Premium

If you purchased the license for the Premium version and cannot activate the key, check [this section](/imunifyav_for_plesk/#how-to-activate-a-license-key-for-paid-versions).

### I click the _Scan_ button, but it doesn’t start scanning

When you click the _Scan_ button it doesn’t start immediately, it queues the task to scan the website. You should see the **Queued** status in the line. Once the server resources are available it starts scanning and displaying a progress.

![](/images/PleskAVScan.png)

### The Antivirus doesn’t cleanup some of malicious files

Check the Malware Removal report to see the details. There might be the following reasons:

* Malicious file is write-protected or a folder of the file is write-protected so the antivirus cannot write or delete it. Check it with the server administrator.
* Malicious file was missed or not readable at the time of cleanup.
* Malicious file is not in the cleanup database of the Antivirus. In this case you can see the **Manual cleanup required** status next to the file. Please, send it to us and we will check and add it for automatic cleanup.

###  I scheduled re-scanning for today but it does not start at specified time

Scheduled re-scanning of files starts at specified time only if it’s been more than 24 hours since last website scanning. So if you would not scan it manually it will be checked the day after.

### When I click the _Scan All_ button the websites start scanning in random order

Order of websites scanning depends on two things:

* selected order in the table
* order of domains registration

For your convenience we would recommend sorting the table by the _State_ column. Just click it to reorder.

### When I click _Scan_ or _Clean_ it fails

Please, follow the [steps to gather information](/imunifyav_for_plesk/#extension-diagnostics) for analysis and send it to us.

### Problem with websites cleanup

This topic explains how to resolve the issue with one-click automatic cleanup in the 2.0-x version.

#### Issue description

When administrator of server purchased the license and tries to cleanup malware within 24 hours since the purchase it gets “Failed to remove malware…”.

#### Root cause

Background process is restarted every 24 hours and updates the license information on restart. So until restart it will keep old license type.

#### Resolution

Administrator needs to restart the background process. There’re several ways to do this:
* Wait for 24 hours, or
* Change the _Max working threads_ under the _Settings_ tab and _Save_ settings, or
  
    ![](/images/PleskAVChangeMaxWorkingThreads.png)

* Re-install ImunifyAV, or
* Kill the process named `ra_executor.php`, it will be restarted in a couple of minutes.
  
    ```
    kill -9 `ps aux | grep 'ra_exec' | awk {'print$2'}`
    ```

All these actions will restart the background process of antivirus and reload the license.
This issue will be fixed in the upcoming release. We’re already working on it.

## Removing ImunifyAV for Plesk

ImunifyAV for Plesk is managed as a common Plesk extension. It could be removed from _Extensions -> My Extensions -> Remove_

![](/images/PleskAVRemove.png)

## Extension diagnostics

If you’ve experiencing some unusual behavior or faced with issues we appreciate if you could provide details on the issue for analysis at [https://cloudlinux.zendesk.com/hc/en-us/requests/new](https://cloudlinux.zendesk.com/hc/en-us/requests/new):

1. Screenshots of the issue (e.g. screenshot before action and the result)
2. Steps to reproduce if possible: how we could repeat the actions to see the issue
3. The following files for analysis:
   * `/usr/local/psa/admin/logs/panel.log` – Plesk panel debug log ([see below how to collect it](/imunifyav_for_plesk/#how-to-collect-plesk-debug-log))
   * `/usr/local/psa/var/modules/revisium-antivirus/ra.db` (antivirus database)
   * `/usr/local/psa/var/modules/revisium-antivirus/ra_cache.db` (antivirus database cache)
   * `/usr/local/psa/var/modules/revisium-antivirus/revisium-antivirus-local.log` (antivirus log)

### How to collect Plesk debug log

Open Plesk config file `/usr/local/psa/admin/conf/panel.ini` and add the following lines:

```
[log]

filter.priority=7
```

* You might also need to enable the Plesk debug mode. You can do so by adding the following lines:

    ```
    [debug]
    ; Enable debug mode (do not use in production environment)
    enabled = on
    ```

* You might also need to enable logging of utilities calls. You can do so by adding the following lines:

    ```
    ; Enable logging of external utilities calls
    show.util_exec = on

    ; Enable logging of stdin and stdout for external utilities calls (do not use in production environment)
    show.util_exec_io = on
    ```

    See the Plesk's KB for more information: [https://support.plesk.com/hc/en-us/articles/213408889-How-to-enable-disable-Plesk-debug-mode](https://support.plesk.com/hc/en-us/articles/213408889-How-to-enable-disable-Plesk-debug-mode)

It may look like this:

![](/images/PleskAVConfig.png)

If you do not have the `/usr/local/psa/admin/conf/panel.ini` file, just create an empty one and add the lines as described above.
After that, reproduce the issue and send us a packed (zipped) log located at the `/usr/local/psa/admin/logs/panel.log`.

If you have huge log (greater than 50Mb), you can obtain the last 15000 lines using the command:

```
tail -15000 /usr/local/psa/admin/logs/panel.log > debug_log.txt
```

then just zip the file `debug_log.txt` and send us the `debug_log.zip` file.

After that, remove the lines from the `plesk.ini`:

```
[log]

filter.priority=7
```

or change the value to the default one (usually – `filter.priority=3`).



