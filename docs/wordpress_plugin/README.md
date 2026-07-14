# Imunify Security Plugin for WordPress

[[toc]]

## Overview

The **Imunify Security plugin for WordPress** is available to all Imunify customers (ImunifyAV, ImunifyAV+, and Imunify360). It provides WordPress administrators with a modern interface, real-time malware and security status, and a seamless upgrade path from AV to 360. The plugin is designed to enhance your website's security and user experience directly from the WordPress dashboard.

## Prerequisites

* **WordPress Version**: 5.0.0 or higher
* **PHP Version**: 5.6 or higher
* **Imunify360**: 8.4.1 or higher
* **ImunifyAV/AV+**: 8.6.0 or higher

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
- Bot Protection status and recent bot activity (see <span class="notranslate">[AI Bot Management](/wordpress_plugin/#ai-bot-management)</span>)
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
The <span class="notranslate">Web Application Firewall</span> (virtual patching) described below requires the <span class="notranslate">Imunify Security</span> WordPress plugin (<span class="notranslate">`imunify-wp-security`</span>) <span class="notranslate">`wp-3.0.1-2`</span> or later, together with a supported Imunify agent — <span class="notranslate">ImunifyAV/AV+</span> (<span class="notranslate">`imunify-antivirus`</span>) <span class="notranslate">`av-8.7.1-2`</span> or later, or <span class="notranslate">Imunify360</span> (<span class="notranslate">`imunify360-firewall`</span>) <span class="notranslate">`8.12.5-3`</span> or later.

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

## AI Bot Management

<span class="notranslate">Imunify Security</span> includes **AI Bot Management** — a layer that identifies automated traffic (search-engine crawlers, AI/LLM crawlers, scrapers, and malicious bots) *before WordPress finishes loading* and applies a per-minute request limit to each kind of bot, while leaving real visitors untouched. It protects sites from aggressive crawling and bot-driven resource abuse — increasingly from the wave of AI training and scraping crawlers — without slowing down legitimate users.

::: tip Note
AI Bot Management requires the <span class="notranslate">Imunify Security</span> WordPress plugin (<span class="notranslate">`imunify-wp-security`</span>) <span class="notranslate">`wp-4.0.2-2`</span> or later, together with a supported Imunify agent — <span class="notranslate">ImunifyAV/AV+</span> (<span class="notranslate">`imunify-antivirus`</span>) <span class="notranslate">`av-8.8.3-6`</span> or later, or <span class="notranslate">Imunify360</span> (<span class="notranslate">`imunify360-firewall`</span>) <span class="notranslate">`8.13.6-6`</span> or later. It is a separate layer from the server-side <span class="notranslate">[WAF (ModSecurity)](/dashboard/#waf-settings)</span>, from <span class="notranslate">[WordPress Account Brute-force Protection](/dashboard/#wordpress-account-brute-force-protection)</span>, and from the plugin's own <span class="notranslate">[Web Application Firewall](#web-application-firewall-virtual-patching)</span>. In the WordPress dashboard it appears as <span class="notranslate">_Bot Protection_</span>.
:::

### How it works

The feature runs as a *must-use* plugin, so it evaluates each request before the rest of WordPress (and other plugins) load. For every request it:

1. **Classifies** the visitor into one category — a verified search engine, a verified AI crawler, an unknown automated client, an unverified bot, a malicious bot, or a human. Clients that claim to be a known crawler (for example, Googlebot) are confirmed by *forward-confirmed reverse DNS*, so a spoofed user-agent does not earn a crawler's higher limit.
2. **Applies the category's limit.** Each non-human category has a requests-per-minute allowance set by the active preset. Requests over the limit are refused with <span class="notranslate">HTTP 429 (Too Many Requests)</span> and a <span class="notranslate">`Retry-After`</span> hint; malicious bots are blocked outright with <span class="notranslate">HTTP 403 (Forbidden)</span>. Clients that keep exceeding their limit can be escalated to a temporary block.

Human visitors are never rate-limited. The check is *fail-open*: if anything goes wrong (for example, the backing storage is unavailable), the request is allowed through, so the feature can never take a site down.

### Bot categories

| Category | What it is |
|---|---|
| <span class="notranslate">_Verified search engines_</span> | Crawlers confirmed by reverse DNS to belong to a search engine (Google, Bing, and similar). Given a high allowance so indexing is never disrupted. |
| <span class="notranslate">_Verified AI crawlers_</span> | Confirmed crawlers from AI/LLM providers (training or retrieval). |
| <span class="notranslate">_Unknown automated_</span> | Automated clients that do not match a known, verified crawler. |
| <span class="notranslate">_Unverified bots_</span> | Clients claiming to be a known bot but failing reverse-DNS verification. |
| <span class="notranslate">_Malicious bots_</span> | Known-bad clients, and clients caught by the honeypot. Blocked in every preset except <span class="notranslate">_Monitor only_</span>. |
| <span class="notranslate">_Humans_</span> | Regular visitors. Never rate-limited. |

### Protection presets

The active **preset** decides the per-minute limits. <span class="notranslate">_Balanced_</span> is the default.

| Category (requests / minute) | <span class="notranslate">_Balanced_</span> | <span class="notranslate">_Strict_</span> | <span class="notranslate">_Monitor only_</span> |
|---|---|---|---|
| Verified search engines | 300 | 300 | Not enforced |
| Verified AI crawlers | 10 | 3 | Not enforced |
| Unknown automated | 5 | 2 | Not enforced |
| Unverified bots | 2 | 1 | Not enforced |
| Malicious bots | Blocked | Blocked | Not enforced |

* <span class="notranslate">_Balanced_</span> — sensible limits for a typical site. Recommended for most sites.
* <span class="notranslate">_Strict_</span> — tighter limits for sites under heavy bot pressure.
* <span class="notranslate">_Monitor only_</span> — classifies traffic but does not block or limit anything. Useful for trying the feature out before enforcing it.

### In the WordPress dashboard widget

Once your hosting provider has enabled AI Bot Management, the <span class="notranslate">Imunify Security</span> dashboard widget shows a <span class="notranslate">_Bot Protection_</span> row with the current status, the active preset, and the number of requests blocked in the last 24 hours.

<img src="/images/wordpress-plugin/bot-widget.png" alt="The Imunify Security dashboard widget with the Bot Protection row" width="420">

*The <span class="notranslate">Imunify Security</span> dashboard widget. The <span class="notranslate">_Bot Protection_</span> row shows the active preset and the number of requests blocked in the last 24 hours.*

Click the row to open the detail pane, where you can:

* see the current <span class="notranslate">_Status_</span> and <span class="notranslate">_Blocked (24h)_</span> count;
* view the active **preset** and its live <span class="notranslate">_Rate limits (requests / minute)_</span> table, and switch preset with <span class="notranslate">_change_</span> → <span class="notranslate">_Save_</span>;
* turn protection **off for this site** — or back on.

<img src="/images/wordpress-plugin/bot-widget-pane.png" alt="The Bot Protection detail pane inside the Imunify Security widget" width="420">

*The detail pane: status, the 24-hour blocked counter, the preset picker, and the per-category rate limits for the selected preset.*

Only WordPress administrators (users who can <span class="notranslate">_manage options_</span>) can change these settings.

::: tip Note
If your site cannot reach itself over HTTP, the pane shows a <span class="notranslate">_"Your site can't reach itself"_</span> warning — scheduled tasks, including automatic bot-data updates, may not run. Fix the loopback connectivity (for example, a local DNS or firewall issue) and click <span class="notranslate">_Re-check_</span>.
:::

### Turning it on or off

AI Bot Management is controlled at three levels:

1. **Hosting provider (server-wide).** The provider enables the feature and sets the default preset. When it is off at the server level, the <span class="notranslate">_Bot Protection_</span> row does not appear. Providers control it from the command line — see the <span class="notranslate">[configuration file reference](/config_file_description/)</span> (<span class="notranslate">`ai_bot_protection`</span>, <span class="notranslate">`ai_bot_protection_preset`</span>) and the <span class="notranslate">[command-line reference](/command_line_interface/#wordpress-plugin)</span>.
2. **Site owner (WordPress admin).** Once the provider has enabled it, the WordPress administrator turns it on or off for their own site and chooses the preset from the <span class="notranslate">_Bot Protection_</span> widget.
3. **`wp-config.php` (advanced).** Definitions in <span class="notranslate">`wp-config.php`</span> override the widget:

<div class="notranslate">

```php
// Force AI Bot Management off for this site (overrides the widget):
define( 'IMUNIFY_AI_BOT_PROTECTION', false );

// Force a specific preset (balanced | strict | monitor):
define( 'IMUNIFY_AI_BOT_PROTECTION_PRESET', 'strict' );
```

</div>

When AI Bot Management is disabled in <span class="notranslate">`wp-config.php`</span>, the widget shows <span class="notranslate">_Disabled in wp-config.php_</span> and the controls are locked.
