# Upgrade Guide

## Overview

This guide provides step-by-step instructions for upgrading the CloudLinux Monetize WHMCS module. Following these steps will ensure a smooth upgrade process while minimizing the risk of data loss or unexpected issues.

:::warning Important
Always back up your WHMCS installation and database before proceeding with any upgrade.
:::

## Prerequisites

Before starting the upgrade, make sure you have:

- Complete backup of your WHMCS files and database
- Close all tabs with WHMCS admin in your browser
- Full administrator access to your WHMCS installation
- Access to download the latest module version from the [CloudLinux repository](https://repo.whmcs.cloudlinux.com/whmcs-cloudlinux-monetize-plugin-latest.zip) or from the [CloudLinux website](https://repo.whmcs.cloudlinux.com/)

## Upgrade Steps

### Step 1: Download Latest Version

Download the latest version of the CloudLinux Monetize module from the [CloudLinux repository](https://repo.whmcs.cloudlinux.com/whmcs-cloudlinux-monetize-plugin-latest.zip) or select a specific version from the [CloudLinux website](https://repo.whmcs.cloudlinux.com/)

Extract the archive to a temporary location on your computer.
The extracted files should contain:
   - `modules/addons/CloudLinuxMonetize/` directory
   - `modules/servers/CloudLinuxMonetize/` directory

### Step 2: Enable Maintenance Mode (Optional but Recommended)

**We suggest enabling Maintenance Mode in WHMCS** to prevent users from accessing the system during the upgrade process.

1. Log in to your WHMCS admin area
2. Navigate to **Setup > General Settings > General**
3. Enable **Maintenance Mode**
4. Optionally, configure a maintenance message for your users

![](/images/whmcs_cloudlinux_monetize/enable_maintenance_mode.png)

:::tip Note
Maintenance mode prevents client access during upgrade, reducing the risk of data inconsistencies.
:::

### Step 3: Delete Old Module Files

**Delete or rename module files from modules/addons and modules/servers.**

   - Navigate to your WHMCS root directory
   - Delete the entire `modules/addons/CloudLinuxMonetize/` directory
   - Navigate to your WHMCS root directory
   - Delete the entire `modules/servers/CloudLinuxMonetize/` directory

### Step 4: Upload New Module Files

:::warning Important
Before you begin, close all open WHMCS browser tabs. Once the file upload is complete, immediately log into the WHMCS Admin Dashboard and navigate directly to the Module Dashboard first (this is critical to trigger the upgrade).
:::

1. **Upload Addon Module:**
   - Upload the contents of `modules/addons/CloudLinuxMonetize/` from the downloaded archive to:
     ```
     /path/to/whmcs/modules/addons/CloudLinuxMonetize/
     ```

2. **Upload Server Module:**
   - Upload the contents of `modules/servers/CloudLinuxMonetize/` from the downloaded archive to:
     ```
     /path/to/whmcs/modules/servers/CloudLinuxMonetize/
     ```

### Step 5: Trigger Module Upgrade

**Enter the Admin area dashboard to trigger the upgrade. Successful upgrade should leave a note in logs.**

1. Log in to your WHMCS admin area

2. Navigate to **Addons > CloudLinux Monetize** (the module dashboard)

3. The module will automatically detect the version change and trigger the upgrade process

4. **Verify Upgrade Success:**
   - Check **Utilities > Logs > Module Log** for upgrade confirmation
   - Look for a log entry indicating successful upgrade from the previous version to the new version
   - The log entry should read: *"Module has been upgraded successfully from version X.X.X to Y.Y.Y"*

   ![](/images/whmcs_cloudlinux_monetize/log_module_upgrade.png)

5. If the upgrade was successful, you should see the module listed with the new version number

   ![](/images/whmcs_cloudlinux_monetize/addon_module_list_after_upgrade.png)

:::tip Note
The upgrade function is automatically triggered when WHMCS detects a version change. No manual deactivation/reactivation is required.
:::

### Step 6: Register New Hooks

Navigate to **Setup > Addon Modules** (or **System Settings > Addon Modules**)

Locate **CloudLinux Monetize** in the list

Click **Configure** next to CloudLinux Monetize

Click **Save Changes** (even if no configuration changes are needed)

:::tip Note
This step ensures that any new or modified hooks introduced in the upgrade are properly registered with WHMCS. WHMCS registers hooks when module configuration is saved.
:::

### Step 7: Disable Maintenance Mode

If you enabled maintenance mode in Step 2:

1. Navigate to **Setup > General Settings > Other**
2. Disable **Maintenance Mode**
3. Verify your WHMCS installation is accessible to clients

## Post-Upgrade

### Clear WHMCS Cache

After upgrading, it's recommended to clear WHMCS cache:

1. Navigate to **Utilities > System > Clear Cache**
2. Or manually delete contents of `/path/to/whmcs/templates_c/` directory (except `index.php`)

---

**Last Updated:** 08 Feb 2026
