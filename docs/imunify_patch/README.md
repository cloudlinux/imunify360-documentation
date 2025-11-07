# Imunify Patch

## Introduction

Imunify Patch is a vulnerability-patching tool that available with ImunifyAV, ImunifyAV+, and Imunify360, and it fixes PHP vulnerabilities for every website associated with the same system account.

Imunify Patch continuously scans WordPress, Joomla, Drupal, Magento, WooCommerce and more, then back‑ports the official security fixes directly into the installed files — no full version upgrade required. Sites stay online and intact while the risk is removed.

## Installation

There is no installation required. Imunify Patch is available on servers protected by ImunifyAV, ImunifyAV+, and Imunify360.


## Licensing

Imunify Patch requires activation with your CloudLinux Account. You can activate it using the page link shown in the control-panel plugin (ImunifyAV, ImunifyAV+, or Imunify360); the same link is also sent to site owners via control-panel notifications or the Imunify Security plugin.


## Usage

When you have an active subscription, vulnerabilities are patched automatically on detection - no manual intervention needed. With scheduled scanning enabled as well, you also don’t have to manually initiate scans - the feature is designed to work in the background without taking much of your time.

However, Imunify also provides CLI and UI controls in case if you do want to dive into the details, run unscheduled scans, or apply/revert patches for individual files.

### Usage from CLI

Imunify Patch vulnerabilities scan for all users can be started with the following command:

```
$ imunify-antivirus malware scan user
```

Imunify Patch vulnerabilities scan for a specific files path can be started with the following command:

```
$ imunify-antivirus malware on-demand queue put "/home/user1/*"
```

To see the list of vulnerabilities use following command:

```
$ imunify-antivirus vulnerabilities file list
```

Expected output should look like this:

```
APP_NAME   FILE_PATH                             ID  IMUNIFY_PATCH_USER_ID             PURCHASE_URL                                                                                                                                                                                       STATUS      SUBSCRIBED  USERNAME  VULNERABILITIES
WordPress  /home/user1/public_html/filename.php  1   35e75187d8ad4244bc5757edf26ed2b2  https://www.cloudlinux.com/purchase-imunify-patch?iaid=...&imunify_patch_user_id=...&server_ip=...&username=user1&websites=user1.com&total_websites=1&vulnerable_domains=1&vulnerabilities=%7B%7D  vulnerable  False       user1     [{'cve_id': '', 'vulnerability_type': 'XSS', 'vulnerability_description': 'XSS affecting the HTML API'}]
```

If you need to get JSON response, use the `--json` flag:

```
$ imunify-antivirus vulnerabilities file list --json
{"max_count": 1, "items": [{"id": 1, "username": "user1", "file_path": "/home/user1/public_html/wp-includes/html-api/class-wp-html-tag-processor.php", "status": "vulnerable", "app_name": "WordPress", "imunify_patch_user_id": "...", "subscribed": false, "purchase_url": "https://www.cloudlinux.com/purchase-imunify-patch?iaid=...&imunify_patch_user_id=...&server_ip=...&username=user1&websites=user1.com&total_websites=1&vulnerable_domains=1&vulnerabilities=%7B%7D", "vulnerabilities": [{"cve_id": "", "vulnerability_type": "XSS", "vulnerability_description": "XSS affecting the HTML API"}]}], "warnings": [], "version": "8.5.4", "eula": null, "license": {"status": true, "expiration": null, "user_limit": 2147483647, "id": "...", "user_count": 1, "message": "", "license_type": "imunifyAVPlus", "upgrade_url": "https://cln.cloudlinux.com/console/imunify360/servers/.../products/IMAVP/convert", "upgrade_url_360": "https://www.cloudlinux.com/upgrade-imunify-1/?iaid=...&users=1", "ip_license": false, "eligible_for_imunify_patch": false}}
```

To patch a specific file from the list of vulnerable files, use the `patch` command:

```
$ imunify-antivirus vulnerabilities file patch <path-to-file1> <path-to-file2> ...
```

where `<path-to-file1>` and `<path-to-file2>` are the paths to the files you want to patch.

for example:

```
$ imunify-antivirus vulnerabilities patch file /home/user1/public_html/wp-includes/html-api/class-wp-html-tag-processor.php
```

To restore original state of a patched file, use the `revert` command:

```
$ imunify-antivirus vulnerabilities file revert <path-to-file1> <path-to-file2> ...
```

where `<path-to-file1>` and `<path-to-file2>` are the paths to the files you want to restore.

for example:

```
$ imunify-antivirus vulnerabilities file revert /home/user1/public_html/wp-includes/html-api/class-wp-html-tag-processor.php
```

### Usage from hosting panel web UI

To start vulnerabilities scan navigate to imunifyAV plugin in your hosting panel web UI, click on `Malware Scanner` tab and click on `Scan for malware` action button.

![](/images/imunify.patch/01-scan.png)

Confirm scan action in the opened popup dialog.

![](/images/imunify.patch/02-scan-confirm.png)


Wait for the scan completion.

![](/images/imunify.patch/03-wait-for-scan-complete.png)

Click on `Vulnerabilities` tab to view the results.

![](/images/imunify.patch/04-vulnerabilities-tab.png)

### Patch vulnerable file(s).

To patch a specific file from the list use `Apply patch` button.

![](/images/imunify.patch/05-apply-patch-button.png)

If you don't have an Imunify Patch subscription yet, you will be redirected in new browser tab to the CloudLinux Store to purchase it.

![](/images/imunify.patch/06-purchase-imunify-patch.png)

After purchasing Imunify Patch license, you can switch back to the hosting panel tab.
Please note, that all vulnerable files will be patched automatically soon.

![](/images/imunify.patch/07-success-purchase.png)
![](/images/imunify.patch/08-autopatch.png)

### Vulnerability details

To see a vulnerability details, click on the table row where filename is displayed.
![](/images/imunify.patch/09-cve-details.png)

### Reverting patched file(s)

To revert patch for a patched file use `Revert patch` action button.

![](/images/imunify.patch/10-revert-patch.png)


### Bulk operations

To patch all vulnerable files at once use `Apply patch` button.

![](/images/imunify.patch/12-patch-all.png)

To revert patch for all patched files use `Revert patch` button.

![](/images/imunify.patch/11-revert-all.png)
