# Imunify Security Plugin for WordPress

[[toc]]

## Overview

The **Imunify Security plugin for WordPress** is available to all Imunify customers (ImunifyAV, ImunifyAV+, and Imunify360). It provides WordPress administrators with a modern interface, real-time malware and security status, and a seamless upgrade path from AV to 360. The plugin is designed to enhance your website's security and user experience directly from the WordPress dashboard.

## Prerequisites

* **WordPress Version**: 5.0.0 or higher
* **PHP Version**: 5.6 or higher
* **Imunify360**: 8.4.1 or higher
* **ImunifyAV/AV+**: 8.6.0 or higher

::: tip Note
The <span class="notranslate">Web Application Firewall</span> (virtual patching) described below requires the <span class="notranslate">Imunify Security</span> WordPress plugin (<span class="notranslate">`imunify-wp-security`</span>) <span class="notranslate">`wp-3.0.1-2`</span> or later, together with a supported Imunify agent — <span class="notranslate">ImunifyAV/AV+</span> (<span class="notranslate">`imunify-antivirus`</span>) <span class="notranslate">`av-8.7.1-2`</span> or later, or <span class="notranslate">Imunify360</span> (<span class="notranslate">`imunify360-firewall`</span>) <span class="notranslate">`8.12.5-3`</span> or later.
:::

## Installation

The plugin is not available in the WordPress plugin repository. To install:

1. Navigate to Imunify settings in your hosting control panel (e.g., cPanel).
2. Open the `General` tab.
3. Scroll to the `WordPress Plugin` section.
4. Tick the `Install WordPress plugin` checkbox and click `Save changes`.
5. The plugin will be installed in the background to all active WordPress installations on the server.

![](/images/wordpress-plugin/panel-settings.png)

*Plugin installation settings in the control panel*

## Features

### Dashboard Widget

The plugin adds a dashboard widget that helps administrators keep track of their site's security status:

- Real-time security status
- Proactive Defense status
- Web Application Firewall status and recent WAF incidents (see <span class="notranslate">[Web Application Firewall](/wordpress_plugin/#web-application-firewall-virtual-patching)</span>)
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

## Web Application Firewall (Virtual Patching)

The <span class="notranslate">Imunify Security</span> plugin includes a **Web Application Firewall (WAF)** that provides *virtual patching* for WordPress. It protects your sites against known vulnerabilities (CVEs) in WordPress plugins, themes, and core — **without modifying any of your site's files**. When a plugin or theme you use has a known security flaw, the WAF blocks attempts to exploit it, giving you time to apply the real update.

::: tip Note
This WordPress WAF is a separate layer from the server-side <span class="notranslate">[WAF (ModSecurity)](/dashboard/#waf-settings)</span> and from <span class="notranslate">[WordPress Account Brute-force Protection](/dashboard/#wordpress-account-brute-force-protection)</span>. It runs inside the WordPress plugin and focuses on blocking exploit attempts against vulnerable plugins and themes. In the Imunify control panel it is presented on the <span class="notranslate">_CMS WAF_</span> tab.
:::

### How it works

The Imunify agent regularly delivers an up-to-date set of virtual patches to each protected WordPress site. On every request, the plugin checks whether the request matches a rule for a component (plugin, theme, or core) that is actually installed on the site, and acts before the vulnerable code can run:

* In <span class="notranslate">Imunify360</span>, matching requests are **blocked** with an <span class="notranslate">HTTP 403</span> response.
* In <span class="notranslate">ImunifyAV</span> and <span class="notranslate">ImunifyAV+</span>, matching requests are **logged only** — see [Protection modes](#protection-modes-enabled-vs-monitoring).

Every match is recorded as an *incident*. Because rules are matched only against the versions actually installed, protection adapts automatically as you install, update, or remove plugins and themes.

### Protection modes: Enabled vs Monitoring

The WAF works in one of two modes depending on your Imunify product. There is no manual switch — the mode follows the product:

| Product | Mode | Status shown | Behavior |
|---|---|---|---|
| <span class="notranslate">Imunify360</span> | Active protection | <span class="notranslate">_Enabled_</span> | Exploit attempts are blocked (<span class="notranslate">HTTP 403</span>). |
| <span class="notranslate">ImunifyAV</span> / <span class="notranslate">ImunifyAV+</span> | Monitoring | <span class="notranslate">_Monitoring_</span> | Exploit attempts are logged but **not** blocked. |

In monitoring mode, the widget shows the message *"Attacks are logged but not blocked. Upgrade to Imunify360 to enable full WAF protection."* with an <span class="notranslate">_Upgrade now_</span> link.

### In the WordPress dashboard widget

The <span class="notranslate">Imunify Security</span> dashboard widget includes a <span class="notranslate">_Web Application Firewall_</span> row showing the current status (<span class="notranslate">_Enabled_</span> or <span class="notranslate">_Monitoring_</span>) and the number of recent incidents. Below it, a <span class="notranslate">_Latest incidents (7 days)_</span> table lists the most recent detections, together with the current ruleset version:

* <span class="notranslate">_Date_</span> — when the incident occurred
* <span class="notranslate">_Component_</span> — the vulnerable plugin, theme, or core
* <span class="notranslate">_CVE_</span> — the vulnerability the rule addresses
* <span class="notranslate">_Severity_</span> — severity of the rule
* <span class="notranslate">_Count_</span> — how many times it was triggered

Use <span class="notranslate">_Show more results_</span> to open the full incident list on the <span class="notranslate">_CMS WAF_</span> tab.

<img src="/images/wordpress-plugin/waf-widget-enabled.png" alt="Web Application Firewall row showing Enabled" width="420">

*The Web Application Firewall row in the dashboard widget, showing <span class="notranslate">_Enabled_</span> with no recent detections (Imunify360).*

<img src="/images/wordpress-plugin/waf-widget-enabled-has-incidents.png" alt="Web Application Firewall row showing a recent-incident count" width="420">

*When there are recent detections, the row shows the incident count (here, 34); expand it to see the <span class="notranslate">_Latest incidents (7 days)_</span> list.*

<img src="/images/wordpress-plugin/waf-widget-monitoring.png" alt="Web Application Firewall row showing Monitoring" width="420">

*In ImunifyAV and ImunifyAV+, the WAF runs in Monitoring mode with a prompt to upgrade.*

### Managing WAF incidents

The <span class="notranslate">_CMS WAF_</span> tab in the Imunify control panel is where you review WAF activity and manage rules.

::: tip Note
The <span class="notranslate">_CMS WAF_</span> tab appears only when the WordPress WAF is enabled and the account has at least one WordPress site.
:::

#### Incidents

The <span class="notranslate">_Incidents_</span> sub-tab lists every request the WAF acted on:

| Column | Description |
|---|---|
| <span class="notranslate">_Date_</span> | When the incident occurred (newest first by default). |
| <span class="notranslate">_Domain_</span> | The WordPress site that was targeted. |
| <span class="notranslate">_IP_</span> | Source IP address. Click it to filter the list by that IP. |
| <span class="notranslate">_Country_</span> | Country the IP resolves to. |
| <span class="notranslate">_Count_</span> | How many times the incident repeated. |
| <span class="notranslate">_Severity_</span> | Severity of the matched rule (0–3 low, 4–6 medium, 7–10 high). |
| <span class="notranslate">_Rule_</span> | The rule that matched. When it references a CVE, it links to the CVE record. |

You can filter incidents by date range and domain, or search by rule, description, or IP. Click a row to expand it and see the <span class="notranslate">_Sensor_</span>, <span class="notranslate">_Rule_</span>, <span class="notranslate">_Abuser_</span> (source IP), and <span class="notranslate">_Domain_</span> details.

![](/images/wordpress-plugin/cms-waf-incidents.png)
*The Incidents sub-tab on the CMS WAF tab.*

#### Disabling a rule

If a WAF rule interferes with legitimate traffic, you can disable it. On the <span class="notranslate">_Incidents_</span> sub-tab, click <span class="notranslate">_Disable rule_</span> for the incident and confirm in the dialog:

* By default, the rule is disabled for **all** of your domains.
* If you manage more than one WordPress site, you can instead pick specific domains from the <span class="notranslate">_Select domains_</span> list.

Click <span class="notranslate">_Yes, disable_</span> to confirm. The change may take a few minutes to take effect across your sites.

<img src="/images/wordpress-plugin/cms-waf-disable-rule-modal.png" alt="Disable rule confirmation modal" width="520">

*Disabling a WAF rule for all domains or for selected domains.*

#### Disabled Rules

The <span class="notranslate">_Disabled Rules_</span> sub-tab lists the rules you have turned off, showing the affected <span class="notranslate">_Component_</span>, <span class="notranslate">_Version_</span>, <span class="notranslate">_Rule_</span>, and <span class="notranslate">_Domains_</span>. To turn a rule back on, click <span class="notranslate">_Enable_</span> and confirm.

![](/images/wordpress-plugin/cms-waf-disabled-rules.png)
*Re-enabling a previously disabled rule.*

### Enabling or disabling the WAF

The WordPress WAF requires the <span class="notranslate">Imunify Security</span> plugin to be installed, and is controlled from <span class="notranslate">_Settings_ | _General_ | _WordPress plugin_</span> in the Imunify control panel:

* **Server administrators** enable or disable the WAF server-wide, and can choose whether it is on by default for new hosting accounts. See <span class="notranslate">[WordPress plugin settings](/dashboard/#wordpress-plugin)</span> and the <span class="notranslate">[command-line reference](/command_line_interface/#wordpress-plugin)</span>.
* **Hosting-account owners** can turn the WAF off for their own account, unless the administrator has locked it server-wide (shown as *This value is set by server administrator*).
