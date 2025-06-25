# Imunify Security WordPress Plugin

## Overview

The **Imunify Security WordPress plugin** is available to all Imunify customers (ImunifyAV, ImunifyAV+, and Imunify360). It provides WordPress administrators with a modern interface, real-time malware and security status, and a seamless upgrade path from AV to 360. The plugin is designed to enhance your website's security and user experience directly from the WordPress dashboard.

## Prerequisites

* **WordPress Version**: 5.0.0 or higher
* **PHP Version**: 5.6 or higher
* **Imunify360**: 8.4.1 or higher
* **ImunifyAV**: 8.6.0 or higher

## Installation

The plugin is not available in the WordPress plugin repository. To install:

1. Navigate to Imunify settings in your hosting control panel (e.g., cPanel).
2. Scroll to the `WordPress Plugin` section.
3. Tick the `Install WordPress plugin` checkbox and click `Save changes`.
4. The plugin will be installed in the background to all active WordPress installations on the server.

![](/images/wordpress-plugin/panel-settings.png)
*Plugin installation settings in the control panel*

## Features

### Dashboard Widget

The plugin adds a dashboard widget that helps administrators keep track of their site's security status:

- Real-time security status
- Proactive Defense status
- Timestamps for last and next scheduled scans
- Detailed list of detected and cleaned malware (file path, signature, detection or clean-up time)

![](/images/wordpress-plugin/widget-no-malware-v2.png)
*Widget - no malware found*

![](/images/wordpress-plugin/widget-malware-cleaned-v2.png)
*Widget - all malware cleaned*

![](/images/wordpress-plugin/widget-for-imunify-av-v2.png)
*Widget - Imunify AV*

![](/images/wordpress-plugin/widget-not-protected.png)
*Widget - Imunify not installed*

### Notice

The plugin adds a notice to the WordPress admin dashboard for non-administrator users. This notice informs users about the security status of the website and provides a link to the Imunify360 dashboard for more information.

### Plugin Page

The plugin provides a dedicated page within the WordPress admin area where you can view more granular details about your website's security. Here, you can:
- See an overview of your site's protection status
- Access scan results and malware details
- Find recommendations for improving your site's security
- For ImunifyAV users, see information about upgrading to Imunify360 for additional features

![](/images/wordpress-plugin/plugin-page-malware-scanner-tab.png)
*Malware Scanner tab on the plugin page: view and manage detected threats.*

![](/images/wordpress-plugin/plugin-page-proactive-defense-tab.png)
*Proactive Defense tab: monitor and configure proactive protection.*

![](/images/wordpress-plugin/plugin-page-imunify-av-malware-scanner.png)
*Malware Scanner as seen by ImunifyAV users.*

### Upgrade Prompt

ImunifyAV users are shown a limited interface and prompted to upgrade to Imunify360 for full protection and advanced features.

![](/images/wordpress-plugin/upgrade-page.png)
*Upgrade prompt encouraging users to switch to Imunify360 for more features.*
