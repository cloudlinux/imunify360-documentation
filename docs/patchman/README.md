# Patchman 

## Introduction 

**Patchman** is a powerful, automated security solution developed to protect Linux-based shared hosting environments. It’s designed with web hosts in mind, helping them secure customer websites by detecting and patching vulnerabilities, removing malware, and keeping systems clean with minimal manual intervention.

Patchman continuously scans for known vulnerabilities in popular Content Management Systems (CMS) such as **WordPress**, **Joomla**, and **Drupal**. It applies source code patches to vulnerable files without modifying core functionality or interrupting the user experience, making it an ideal solution for maintaining secure and stable hosting platforms.

**Key Features** 

* **Automatic Vulnerability Detection**: Identifies security flaws in popular CMS platforms and third-party plugins.

* **Source Code Patching**: Applies lightweight, non-intrusive patches to vulnerable files, reducing the risk of exploitation without requiring full upgrades.

* **Malware Detection and Quarantine**: Scans websites for malware and isolates infected files to prevent further damage or spread.

* **Outdated Software Detection**: Notifies administrators and users about outdated CMS installations and plugins to encourage timely updates.

* **Automated Cleanup**: Removes known malware patterns and reintegrates cleaned files into the hosting environment.

* **User Notifications**: Sends customizable alerts to end users, prompting action when needed (e.g., outdated software or detected threats).

* **Seamless Integration**: Compatible with major hosting control panels, including cPanel, Plesk, and DirectAdmin, for easy deployment and management.

Patchman helps reduce support requests related to malware infections and outdated software, improves server reputation, and enhances customer trust. It’s a low-maintenance, high-impact solution that fits seamlessly into modern web hosting operations.

**Getting started**

* [Logging into the Patchman Portal](/patchman/getting_started/#logging-into-the-patchman-portal)
* [Adding your first server](/patchman/getting_started/#adding-your-first-server)
* [Insights Quick Start Guide](/patchman/getting_started/#insights-quick-start-guide)
* [Contact us](/patchman/getting_started/#contact-us)

* * *

**Frequently Asked Questions**

   * [Which applications does Patchman detect and fix?](/patchman/frequently_asked_questions/#which-applications-does-patchman-detect-and-fix)
   * [What does the error "Registration key required but not present!" mean? ](/patchman/frequently_asked_questions/#what-does-the-error-registration-key-required-but-not-present-mean)
   * [How do I report an incorrect detection / false positive?](/patchman/frequently_asked_questions/#how-do-i-report-an-incorrect-detection-false-positive)
   * [I'm changing my server's IP address. How do I make sure Patchman knows this?](/patchman/frequently_asked_questions/#im-changing-my-servers-ip-address-how-do-i-make-sure-patchman-knows-this)
   * [Can you notify me every time a new vulnerability patch is released?](/patchman/frequently_asked_questions/#can-you-notify-me-every-time-a-new-vulnerability-patch-is-released)
   * [Does the Patchman Portal have an API I can leverage for deeper integration?](/patchman/frequently_asked_questions/#does-the-patchman-portal-have-an-api-i-can-leverage-for-deeper-integration)
   * [What is Patchman CLEAN, and how do I enable & configure it?](/patchman/frequently_asked_questions/#what-is-patchman-clean-and-how-do-i-enable-configure-it)
   * [What IP addresses does the Patchman agent connect to? ](/patchman/frequently_asked_questions/#what-ip-addresses-does-the-patchman-agent-connect-to)
   * [What are the minimal requirements for running Patchman?](/patchman/frequently_asked_questions/#what-are-the-minimal-requirements-for-running-patchman)
   * [Why is a NAT environment not supported?](/patchman/frequently_asked_questions/#why-is-a-nat-environment-not-supported)
   * [Why is vulnerability X not fixed by Patchman?](/patchman/frequently_asked_questions/#why-is-vulnerability-x-not-fixed-by-patchman)
   * [Why is plugin X not patched by Patchman?](/patchman/frequently_asked_questions/#why-is-plugin-x-not-patched-by-patchman)
   * [How do I interpret the statistics shown on the Portal Dashboard?](/patchman/frequently_asked_questions/#how-do-i-interpret-the-statistics-shown-on-the-portal-dashboard)
   * [How do I enable / manage access to the Patchman portal for my hosting customers?](/patchman/frequently_asked_questions/#how-do-i-enable-manage-access-to-the-patchman-portal-for-my-hosting-customers)
   * [Why was my card declined with the reason "the transaction requires authentication"?](/patchman/frequently_asked_questions/#why-was-my-card-declined-with-the-reason-the-transaction-requires-authentication)
   * [Real-time scanning, what is it and how do I configure it?](/patchman/frequently_asked_questions/#real-time-scanning-what-is-it-and-how-do-i-configure-it)

* * * 

**Policies**

   * [Policy notification settings](/patchman/policies/#policy-notification-settings)
   * [Policy applicability](/patchman/policies/#policy-applicability)
   * [Email template editing](/patchman/policies/#email-template-editing)
   * [Setting operational hours](/patchman/policies/#setting-operational-hours)
   * [Modifications to server groups and policies](/patchman/policies/#modifications-to-server-groups-and-policies)

* * *

**Portal**

   * [What permissions do the different user roles have?](/patchman/portal/#what-permissions-do-the-different-user-roles-have)
   * [What are the minimum browser requirements for the Patchman Portal?](/patchman/portal/#what-are-the-minimum-browser-requirements-for-the-patchman-portal)
   * [Reporting malware to Patchman](/patchman/portal/#reporting-malware-to-patchman)
      + [How to report a malicious file](/patchman/portal/#how-to-report-a-malicious-file)
   * [Detection states and actions](/patchman/portal/#detection-states-and-actions)
   * [Organization identifier](/patchman/portal/#organization-identifier)
   * [Status page subscriptions](/patchman/portal/#status-page-subscriptions)
   * [Control panel user level equivalents](/patchman/portal/#control-panel-user-level-equivalents)

* * *

**Agent (patchman-client)**

   * [Where can I find the software changelog?](/patchman/agent/#where-can-i-find-the-software-changelog)
   * [Tuning the Patchman agent](/patchman/agent/#tuning-the-patchman-agent)
   * [Multi-threaded scanning, what is it and how do I configure it?](/patchman/agent/#multi-threaded-scanning-what-is-it-and-how-do-i-configure-it)
      + [What is multithreaded scanning?](/patchman/agent/#what-is-multithreaded-scanning)
      + [How does multithreaded scanning benefit me?](/patchman/agent/#how-does-multithreaded-scanning-benefit-me)
      + [Where do I configure multithreaded scanning?](/patchman/agent/#where-do-i-configure-multithreaded-scanning)
      + [What can I configure, and what do the settings mean?](/patchman/agent/#what-can-i-configure-and-what-do-the-settings-mean)
      + [Defaults, upon release and after](/patchman/agent/#defaults-upon-release-and-after)
   * [Multi-threaded scanning, what is it and how do I configure it?](/patchman/agent/#multi-threaded-scanning-what-is-it-and-how-do-i-configure-it-1)
      + [What is multithreaded scanning?](/patchman/agent/#what-is-multithreaded-scanning-1)
      + [How does multithreaded scanning benefit me?](/patchman/agent/#how-does-multithreaded-scanning-benefit-me-1)
      + [Where do I configure multithreaded scanning?](/patchman/agent/#where-do-i-configure-multithreaded-scanning-1)
      + [What can I configure, and what do the settings mean?](/patchman/agent/#what-can-i-configure-and-what-do-the-settings-mean-1)
      + [Defaults, upon release and after](/patchman/agent/#defaults-upon-release-and-after-1)
   * [How do automatic agent updates work?](/patchman/agent/#how-do-automatic-agent-updates-work)
   * [Updating the Patchman agent](/patchman/agent/#updating-the-patchman-agent)
   * [Uninstalling the Patchman agent](/patchman/agent/#uninstalling-the-patchman-agent)

* * *

**Platform Integrations**

   * [Using Patchman with a non-standard control panel](/patchman/platform_integrations/#using-patchman-with-a-non-standard-control-panel)
   * [Why does my directory synchronization fail on Plesk?](/patchman/platform_integrations/#why-does-my-directory-synchronization-fail-on-plesk)
      + [API key is not found](/patchman/platform_integrations/#api-key-is-not-found)
      + [API access is blocked](/patchman/platform_integrations/#api-access-is-blocked)
      + [Timeout](/patchman/platform_integrations/#timeout)
      + [Domain.php errors](/patchman/platform_integrations/#domainphp-errors)
      + [API version is too old](/patchman/platform_integrations/#api-version-is-too-old)
   * [How do I activate my Plesk-bought Patchman license?](/patchman/platform_integrations/#how-do-i-activate-my-plesk-bought-patchman-license)
      + [Linking your first license](/patchman/platform_integrations/#linking-your-first-license)
      + [Linking more licenses](/patchman/platform_integrations/#linking-more-licenses)
      + [Potential problems](/patchman/platform_integrations/#potential-problems)
      + [Additional help](/patchman/platform_integrations/#additional-help)

* * *

**Imunify integration**
   * [Installing imunify-antivirus with Patchman support](/patchman/agent/#installin-imunify-antivirus-with-patchman-support)
