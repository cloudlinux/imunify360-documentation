---
title: 'Imunify Security Plugin for WordPress: Site Owner Guide'
description: What the Imunify Security plugin for WordPress does, why your hosting provider installed it, how to use its malware, firewall, and bot protection features, and answers to common questions from WordPress administrators.
---

# Site Owner Guide

[[toc]]

::: tip Are you a hosting provider or server administrator?
This page is written for **WordPress site owners**. It explains what the plugin does, what you see in your WordPress dashboard, and what you can change yourself.

If you run the server, see the <span class="notranslate">[Hosting Provider Guide](/wordpress_plugin/hosting_providers/)</span> for requirements, installation, and server-wide settings.
:::

## What the plugin does

The **Imunify Security plugin for WordPress** shows the security status of your website directly in the WordPress dashboard. It reports what the Imunify security software on your hosting server found and cleaned, and it adds two protection layers that run inside WordPress itself.

You do not need to buy, download, or configure anything. The plugin works together with the Imunify product your hosting provider already runs on the server (<span class="notranslate">ImunifyAV</span>, <span class="notranslate">ImunifyAV+</span>, or <span class="notranslate">Imunify360</span>).

### Why the plugin is on your site

Your hosting provider installed the plugin for you, as part of the security service included with your hosting plan. This is why it appears in your plugin list without you installing it, and why you cannot find it in the WordPress.org plugin directory — it is delivered by the hosting server, not from the public repository.

### What it protects you from

* **Malware.** The Imunify scanner on the server checks your files, and the plugin shows you what was detected and cleaned.
* **Proactive Defense.** Blocks malicious PHP code at the moment it tries to run.
* **Web Application Firewall (virtual patching).** Blocks attempts to exploit known vulnerabilities in the plugins, themes, and WordPress core you use, without changing any of your files. See <span class="notranslate">[Web Application Firewall](#web-application-firewall-virtual-patching)</span>.
* **AI Bot Management.** Limits aggressive crawlers, scrapers, and AI bots, while leaving real visitors untouched. See <span class="notranslate">[AI Bot Management](#ai-bot-management)</span>.

Which of these are available depends on the Imunify product your hosting provider runs. <span class="notranslate">ImunifyAV</span> and <span class="notranslate">ImunifyAV+</span> users see a smaller set of features than <span class="notranslate">Imunify360</span> users.

## Features

### Dashboard Widget

The plugin adds a dashboard widget that helps administrators keep track of their site's security status:

- Real-time security status
- Proactive Defense status
- Web Application Firewall status and recent WAF incidents (see <span class="notranslate">[Web Application Firewall](#web-application-firewall-virtual-patching)</span>)
- Bot Protection status and recent bot activity (see <span class="notranslate">[AI Bot Management](#ai-bot-management)</span>)
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

The feature needs a recent version of the plugin and of the Imunify software on the server. Your hosting provider manages both — see <span class="notranslate">[Requirements](/wordpress_plugin/hosting_providers/#requirements)</span>.
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

Open the <span class="notranslate">Imunify Security</span> page from the WordPress admin menu to review WAF activity and manage rules. Everything on this page applies to the site you are currently in.

#### Incidents

The <span class="notranslate">_Incidents_</span> tab lists every request the WAF acted on:

| Column | Description |
|---|---|
| <span class="notranslate">_Date_</span> | When the incident occurred (newest first by default). |
| <span class="notranslate">_IP_</span> | Source IP address. Click it to filter the list by that IP. |
| <span class="notranslate">_Country_</span> | Country the IP resolves to. |
| <span class="notranslate">_Count_</span> | How many times the incident repeated. |
| <span class="notranslate">_Severity_</span> | Severity of the matched rule (0–3 low, 4–6 medium, 7–10 high). |
| <span class="notranslate">_Rule_</span> | The rule that matched. When it references a CVE, it links to the CVE record. |

You can filter incidents by date range, or search by rule, description, or IP. Click a row to expand it and see the <span class="notranslate">_Sensor_</span>, <span class="notranslate">_Rule_</span>, and <span class="notranslate">_Abuser_</span> (source IP) details.

![](/images/wordpress-plugin/cms-waf-incidents.png)
*The Incidents tab.*

#### Disabling a rule

If a WAF rule interferes with legitimate traffic, you can disable it. On the <span class="notranslate">_Incidents_</span> tab, click <span class="notranslate">_Disable rule_</span> for the incident, then click <span class="notranslate">_Yes, disable_</span> to confirm. The rule is turned off for your site. The change may take a few minutes to take effect.

<img src="/images/wordpress-plugin/cms-waf-disable-rule-modal.png" alt="Disable rule confirmation modal" width="520">

*Confirming that a WAF rule should be disabled.*

#### Disabled Rules

The <span class="notranslate">_Disabled Rules_</span> tab lists the rules you have turned off, showing the affected <span class="notranslate">_Component_</span>, <span class="notranslate">_Version_</span>, and <span class="notranslate">_Rule_</span>. To turn a rule back on, click <span class="notranslate">_Enable_</span> and confirm.

![](/images/wordpress-plugin/cms-waf-disabled-rules.png)
*Re-enabling a previously disabled rule.*

### Turning the WAF on or off

Your hosting provider decides whether the WAF runs on the server, and can turn it on or off for individual hosting accounts. If you need it changed for your site, contact your provider. See <span class="notranslate">[Web Application Firewall](/wordpress_plugin/hosting_providers/#web-application-firewall)</span> in the hosting provider guide.

## AI Bot Management

<span class="notranslate">Imunify Security</span> includes **AI Bot Management** — a layer that identifies automated traffic (search-engine crawlers, AI/LLM crawlers, scrapers, and malicious bots) *before WordPress finishes loading* and applies a per-minute request limit to each kind of bot, while leaving real visitors untouched. It protects sites from aggressive crawling and bot-driven resource abuse — increasingly from the wave of AI training and scraping crawlers — without slowing down legitimate users.

::: tip Note
AI Bot Management is a separate layer from the server-side <span class="notranslate">[WAF (ModSecurity)](/dashboard/#waf-settings)</span>, from <span class="notranslate">[WordPress Account Brute-force Protection](/dashboard/#wordpress-account-brute-force-protection)</span>, and from the plugin's own <span class="notranslate">[Web Application Firewall](#web-application-firewall-virtual-patching)</span>. In the WordPress dashboard it appears as <span class="notranslate">_Bot Protection_</span>.

The feature needs a recent version of the plugin and of the Imunify software on the server. Your hosting provider manages both — see <span class="notranslate">[Requirements](/wordpress_plugin/hosting_providers/#requirements)</span>.
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

1. **Hosting provider (server-wide).** The provider enables the feature and sets the default preset. When it is off at the server level, the <span class="notranslate">_Bot Protection_</span> row does not appear. See <span class="notranslate">[AI Bot Management](/wordpress_plugin/hosting_providers/#ai-bot-management)</span> in the hosting provider guide.
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

## Frequently asked questions

### Why did the Imunify Security plugin appear on my site? I did not install it

Your hosting provider installed it for you. The Imunify security software on the server adds the plugin to the WordPress sites it protects, so you get the security information of your site inside the WordPress dashboard. It is part of your hosting plan, not something you bought or downloaded.

### Why is the plugin not in the WordPress.org plugin directory?

The plugin only works together with the Imunify software running on the hosting server, so it is delivered by that software instead of the public directory. This is also why it is updated automatically, without an update notice in WordPress.

### Do I have to pay extra for the plugin?

No. It is included in the Imunify security service your hosting provider already runs. Some features depend on which Imunify product your provider uses — see <span class="notranslate">[Protection modes](#protection-modes-enabled-vs-monitoring)</span>.

### Can I deactivate or delete the plugin? Will it come back?

Yes, you can deactivate or delete it like any other WordPress plugin.

Deleting it also removes the data it stored for your site. A job on the server does this clean-up once a day, so it can take up to 24 hours. The same job records that you removed the plugin, so the server does not install it again by itself.

If you want the plugin back later, ask your hosting provider — they can restore it for your site.

Deactivating or deleting the plugin turns off the protection it provides inside WordPress — the <span class="notranslate">[Web Application Firewall](#web-application-firewall-virtual-patching)</span> and <span class="notranslate">[AI Bot Management](#ai-bot-management)</span> stop working for your site. Malware scanning on the server continues, but you no longer see the results in your WordPress dashboard.

### Does the plugin slow down my website?

The plugin is built to keep the work inside WordPress small:

* Malware scanning runs on the server, not inside WordPress.
* The Web Application Firewall only loads rules for the plugins, themes, and WordPress version you actually have installed.
* The bot check runs before the rest of WordPress loads. It costs very little compared to building the page for that visitor, so every request it blocks saves your site far more work than the check itself uses.

### Do I still need my other security plugin?

Imunify Security does not replace a general-purpose security plugin, and it does not require you to remove one. It adds protection layers that run on the hosting server and inside WordPress. If you run another security plugin, both may report the same event, so check both before you decide something is wrong.

### Does the plugin work on a WordPress multisite network?

Multisite is only partly supported today, and it has not been fully tested. Some features may not behave as described on a multisite network. If you run multisite, check with your hosting provider before you rely on the plugin there.

### Where do I manage the settings?

It depends on the setting:

* In the **WordPress dashboard**, the <span class="notranslate">Imunify Security</span> widget shows the security status, and lets WordPress administrators change <span class="notranslate">[AI Bot Management](#ai-bot-management)</span> for the site.
* On the **<span class="notranslate">Imunify Security</span> page** in the WordPress admin menu, you review WAF incidents and disable individual rules for your site. See <span class="notranslate">[Managing WAF incidents](#managing-waf-incidents)</span>.
* Some settings are controlled by your hosting provider only. If a control is missing, or you cannot change it, contact them.

### What information does the plugin send?

The plugin reads the security information of your site from the Imunify software running on the same server, over a local connection that does not leave the machine. It does not send your site's files, database, or page content anywhere.

To keep protection current, it downloads updated data, such as the list of known crawlers used by <span class="notranslate">[AI Bot Management](#ai-bot-management)</span>.

Imunify also collects security information from your site to improve protection:

* **WAF incidents** — the exploit attempts the <span class="notranslate">[Web Application Firewall](#web-application-firewall-virtual-patching)</span> acted on. A record includes the rule that matched, the IP address the request came from, and partial details of the request.
* **Traffic classification summary** — once a day, how much traffic fell into each bot category, together with the 50 most active IP addresses per category. This data is used only to make the classification more accurate and to identify sources that abuse sites.

If your hosting provider has enabled error reporting, technical error reports may also be sent to Imunify.

### A visitor to my site got an error page. What happened?

Two protections can refuse a request:

* <span class="notranslate">HTTP 429 (Too Many Requests)</span> — AI Bot Management refused a request from an automated client that went over its per-minute limit. Real visitors are never rate-limited.
* <span class="notranslate">HTTP 403 (Forbidden)</span> — either the Web Application Firewall matched the request against a known vulnerability in a plugin, theme, or WordPress core, or AI Bot Management blocked a client that kept sending requests after it was already refused with <span class="notranslate">HTTP 429</span>. See <span class="notranslate">[Managing WAF incidents](#managing-waf-incidents)</span> to check what the WAF blocked and why.

### A WAF rule blocks legitimate traffic. How do I stop it?

Open the <span class="notranslate">Imunify Security</span> page in the WordPress admin menu, go to the <span class="notranslate">_Incidents_</span> tab, find the incident, and click <span class="notranslate">_Disable rule_</span>. The rule is turned off for your site — there is no list of domains to choose from, because the page only covers the site you are in. The change may take a few minutes to take effect.

If the rule keeps blocking traffic after that, ask your hosting provider.

### Bot Protection blocks something I need. How do I stop it?

Real visitors are never rate-limited, but a tool that calls your site — an uptime monitor, a backup or SEO service, or a plugin that fetches pages — is an automated client, so it can be refused with <span class="notranslate">HTTP 429</span>.

Open the <span class="notranslate">_Bot Protection_</span> row in the <span class="notranslate">Imunify Security</span> dashboard widget and choose one of these:

* **Switch to a softer preset.** Click <span class="notranslate">_change_</span>, pick a preset, and click <span class="notranslate">_Save_</span>. <span class="notranslate">_Monitor only_</span> still classifies traffic but does not block or limit anything, which is the quickest way to confirm that Bot Protection is the cause.
* **Turn protection off for this site.** The row has a switch that disables Bot Protection for your site only. You can turn it back on at any time.

See <span class="notranslate">[Turning it on or off](#turning-it-on-or-off)</span> for the <span class="notranslate">`wp-config.php`</span> settings that override the widget, and <span class="notranslate">[Protection presets](#protection-presets)</span> for what each preset allows.

If the <span class="notranslate">_Bot Protection_</span> row is missing, see the next question. If the controls are locked, the feature is set in <span class="notranslate">`wp-config.php`</span> — see <span class="notranslate">[Turning it on or off](#turning-it-on-or-off)</span>.

### Why do I not see the Web Application Firewall or Bot Protection in the widget?

Your hosting provider turns these features on for the server, and they need recent versions of both the plugin and the Imunify software. If a row is missing from the widget, ask your provider whether the feature is enabled for your account.

### The widget says my site cannot reach itself. What does it mean?

WordPress needs to be able to open its own address over HTTP to run scheduled tasks. When it cannot, scheduled tasks — including automatic updates of the bot data — may not run. This is usually caused by a local DNS or firewall setting on the server. Report it to your hosting provider, then click <span class="notranslate">_Re-check_</span>.

### Who do I contact for help?

**Contact your hosting provider first.** The plugin is part of the security service they run, so they can check the server side, enable or disable features for your account, and escalate to Imunify if needed.
