---
title: 'Imunify Security Plugin for WordPress: Hosting Provider Guide'
description: How hosting providers and server administrators install the Imunify Security plugin for WordPress, check a rollout, and control its Web Application Firewall and AI Bot Management.
---

# Hosting Provider Guide

[[toc]]

::: tip Are you a WordPress site owner?
This page is written for **hosting providers and server administrators**. It covers requirements, installation on your servers, and the settings you control.

If you manage a WordPress site and want to know what the plugin does and what you can change in the WordPress dashboard, see the <span class="notranslate">[Site Owner Guide](/wordpress_plugin/)</span>.
:::

## Overview

The **Imunify Security plugin for WordPress** brings the protection your Imunify product already provides into the WordPress dashboard of every site on your servers. It is available to all Imunify customers (<span class="notranslate">ImunifyAV</span>, <span class="notranslate">ImunifyAV+</span>, and <span class="notranslate">Imunify360</span>).

For your customers, the plugin:

* shows the security status of their site, including malware detected and cleaned;
* adds a **Web Application Firewall (virtual patching)** that blocks attempts to exploit known vulnerabilities in plugins, themes, and WordPress core;
* adds **AI Bot Management**, which rate-limits crawlers, scrapers, and AI bots;
* gives <span class="notranslate">ImunifyAV</span> and <span class="notranslate">ImunifyAV+</span> users an upgrade path to <span class="notranslate">Imunify360</span>.

The plugin is not published in the WordPress.org plugin directory. It is delivered and updated by the Imunify agent on the server.

For what your customers see and can change themselves, send them to the <span class="notranslate">[Site Owner Guide](/wordpress_plugin/)</span>.

## Requirements

**On each WordPress site:**

* **WordPress version**: 5.0.0 or higher
* **PHP version**: 5.6 or higher

**On the server:**

* <span class="notranslate">Imunify360</span> <span class="notranslate">`8.4.1`</span> or higher, or
* <span class="notranslate">ImunifyAV</span>/<span class="notranslate">AV+</span> <span class="notranslate">`8.6.0`</span> or higher

Individual features need newer versions of both the plugin and the Imunify agent:

| Feature | Plugin (<span class="notranslate">`imunify-wp-security`</span>) | <span class="notranslate">Imunify360</span> (<span class="notranslate">`imunify360-firewall`</span>) | <span class="notranslate">ImunifyAV</span>/<span class="notranslate">AV+</span> (<span class="notranslate">`imunify-antivirus`</span>) |
|---|---|---|---|
| Base plugin (dashboard widget, plugin page) | — | <span class="notranslate">`8.4.1`</span> | <span class="notranslate">`8.6.0`</span> |
| <span class="notranslate">[Web Application Firewall](#web-application-firewall)</span> | <span class="notranslate">`wp-3.0.1-2`</span> | <span class="notranslate">`8.12.5-3`</span> | <span class="notranslate">`av-8.7.1-2`</span> |
| <span class="notranslate">[AI Bot Management](#ai-bot-management)</span> | <span class="notranslate">`wp-4.0.2-2`</span> | <span class="notranslate">`8.13.6-6`</span> | <span class="notranslate">`av-8.8.3-6`</span> |

The plugin is updated by the Imunify agent, so keeping the agent current is enough.

::: warning
WordPress multisite networks are only partly supported and have not been fully tested. Some features may not behave as documented on multisite.
:::

## Installing the plugin

Installation is a single server-wide switch. Once it is on, the plugin is installed in the background on every active WordPress installation on the server, and new WordPress sites are picked up by the daily job that scans for them.

### From the control panel

1. Navigate to Imunify settings in your hosting control panel (e.g., cPanel).
2. Open the `General` tab.
3. Scroll to the `WordPress Plugin` section.
4. Tick the `Install WordPress plugin` checkbox and click `Save changes`.

![](/images/wordpress-plugin/panel-settings.png)

*Plugin installation settings in the control panel*

### From the command line

<div class="notranslate">

```
imunify360-agent config update '{"WORDPRESS":{"security_plugin_enabled": true}}'
```

</div>

On <span class="notranslate">ImunifyAV</span> and <span class="notranslate">ImunifyAV+</span>, use <span class="notranslate">`imunify-antivirus`</span> instead of <span class="notranslate">`imunify360-agent`</span>.

<span class="notranslate">`security_plugin_enabled`</span> is the master switch for the plugin, its Web Application Firewall, and AI Bot Management. Setting it to <span class="notranslate">`false`</span> removes the plugin from the sites again.

See also <span class="notranslate">[WordPress plugin settings in the admin interface](/dashboard/#wordpress-plugin)</span>.

### Checking the result

After a rollout, list the WordPress sites where the plugin is installed:

<div class="notranslate">

```
imunify360-agent wordpress-plugin list-sites
```

</div>

To check whether the WAF is on for each hosting account, and whether that comes from the server default or a per-account override:

<div class="notranslate">

```
imunify360-agent wordpress-plugin waf status
```

</div>

Both commands accept filters and paging — see the <span class="notranslate">[command-line reference](/command_line_interface/#wordpress-plugin)</span>.

### When a site owner removes the plugin

A site owner can delete the plugin from their WordPress site like any other plugin. A daily job then records the site as removed by the user, cleans up the data kept for it, and stops managing it. The server does **not** install the plugin on that site again, and turning <span class="notranslate">`security_plugin_enabled`</span> off and on again does not bring it back.

To put the plugin back on such a site, contact Imunify support for the steps. A command for this is planned for a future release.

## Web Application Firewall

The WordPress WAF provides virtual patching against known vulnerabilities (CVEs) in WordPress plugins, themes, and core, without modifying site files. In <span class="notranslate">Imunify360</span> matching requests are blocked with <span class="notranslate">HTTP 403</span>; in <span class="notranslate">ImunifyAV</span> and <span class="notranslate">ImunifyAV+</span> they are logged only.

For how the WAF works and how site owners review incidents and disable individual rules, see <span class="notranslate">[Web Application Firewall (Virtual Patching)](/wordpress_plugin/#web-application-firewall-virtual-patching)</span>.

::: tip Note
This WordPress WAF is a separate layer from the server-side <span class="notranslate">[WAF (ModSecurity)](/dashboard/#waf-settings)</span> and from <span class="notranslate">[WordPress Account Brute-force Protection](/dashboard/#wordpress-account-brute-force-protection)</span>.
:::

### Server-wide settings

In the control panel, the WAF is controlled from <span class="notranslate">_Settings_ | _General_ | _WordPress plugin_</span>:

* <span class="notranslate">_Enable WordPress WAF_</span> — turns the WAF on for WordPress sites on this server. When it is disabled, WAF rules are removed from all sites, and site owners no longer see the WAF views in WordPress.
* <span class="notranslate">_Enable WAF for new accounts by default_</span> — automatically enables the WAF for newly created hosting accounts.

<img src="/images/wordpress-plugin/waf-panel-settings.png" alt="WordPress plugin settings in the control panel: Install WordPress plugin, Enable WordPress WAF, and Enable WAF for new accounts by default" width="520">

The same settings from the command line:

<div class="notranslate">

```
imunify360-agent config update '{"WORDPRESS":{"waf_enabled": true}}'
imunify360-agent config update '{"WORDPRESS":{"waf_default": true}}'
```

</div>

::: tip Note
The WAF is enabled by default for hosting accounts that already existed when it was first rolled out. Newly created accounts follow the <span class="notranslate">_Enable WAF for new accounts by default_</span> setting.
:::

### Per-account settings

Change the WAF for hosting accounts in bulk:

<div class="notranslate">

```
imunify360-agent wordpress-plugin waf set --status enabled --all-users
imunify360-agent wordpress-plugin waf set --status disabled --users user1 user2
```

</div>

Or for a single account:

<div class="notranslate">

```
imunify360-agent config update --user user1 '{"WORDPRESS":{"waf_enabled": false}}'
```

</div>

For all options, and for enabling or disabling individual WAF rules server-side, see the <span class="notranslate">[WordPress plugin CLI commands](/command_line_interface/#wordpress-plugin)</span>.

## AI Bot Management

AI Bot Management classifies incoming traffic (verified search engines, verified AI crawlers, unknown automated clients, unverified bots, malicious bots, and humans) before WordPress finishes loading, and applies a per-minute request limit to each non-human category. Human visitors are never rate-limited, and the check is fail-open.

For the categories, the preset limits, and what site owners see, see <span class="notranslate">[AI Bot Management](/wordpress_plugin/#ai-bot-management)</span>.

### Server-wide settings

AI Bot Management is controlled through configuration keys rather than the control panel. Enable or disable it server-wide:

<div class="notranslate">

```
imunify360-agent config update '{"WORDPRESS":{"ai_bot_protection": true}}'
imunify360-agent config update '{"WORDPRESS":{"ai_bot_protection": false}}'
```

</div>

Set the default preset applied to sites that have not chosen their own — one of <span class="notranslate">`balanced`</span>, <span class="notranslate">`strict`</span>, or <span class="notranslate">`monitor`</span>:

<div class="notranslate">

```
imunify360-agent config update '{"WORDPRESS":{"ai_bot_protection_preset": "strict"}}'
```

</div>

While the feature is off server-wide, the <span class="notranslate">_Bot Protection_</span> row does not appear in the WordPress dashboard widget.

### Per-site control

AI Bot Management is a server-wide setting. Unlike the WAF, it cannot be enabled or disabled for a single hosting account. Once it is on for the server, control belongs to the site:

* the WordPress administrator turns it on or off for their own site, and picks a preset, from the <span class="notranslate">_Bot Protection_</span> row of the dashboard widget;
* a <span class="notranslate">`define()`</span> in <span class="notranslate">`wp-config.php`</span> overrides the widget.

See <span class="notranslate">[Turning it on or off](/wordpress_plugin/#turning-it-on-or-off)</span>.

## What site owners can change

| Setting | Controlled by you | Site owner can override |
|---|---|---|
| Plugin installed (<span class="notranslate">`security_plugin_enabled`</span>) | Server-wide | No |
| Web Application Firewall | Server-wide and per hosting account | The hosting account owner can turn it off for their own account, unless you have locked it server-wide. The setting then shows *This value is set by server administrator*. |
| AI Bot Management | Server-wide only | Yes — the WordPress administrator turns it on or off for their own site from the widget. A <span class="notranslate">`define()`</span> in <span class="notranslate">`wp-config.php`</span> overrides both. |
| AI Bot Management preset | You set the server default | Yes — from the widget, or by <span class="notranslate">`define()`</span> in <span class="notranslate">`wp-config.php`</span>. |
| Individual WAF rules | You can disable rules server-side | A site owner can disable a rule for their own site from the <span class="notranslate">Imunify Security</span> page in WordPress. |

## Reference

* <span class="notranslate">[WordPress plugin settings in the admin interface](/dashboard/#wordpress-plugin)</span>
* <span class="notranslate">[WordPress plugin CLI commands](/command_line_interface/#wordpress-plugin)</span>
* <span class="notranslate">[Configuration file: WORDPRESS section](/config_file_description/)</span>
* <span class="notranslate">[Site Owner Guide](/wordpress_plugin/)</span>
