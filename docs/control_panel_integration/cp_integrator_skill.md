# Integrate your panel with the cp-integrator skill

The [cp-integrator skill](https://github.com/cloudlinux/imunify360-cp-integrator) lets an AI agent build the [generic panel integration](/control_panel_integration/) for a control panel that Imunify360 does not support natively. The agent studies your panel on a test server, writes the integration scripts and `integration.conf`, installs Imunify360, checks that it works, and gives you an installable package.

The skill's [README](https://github.com/cloudlinux/imunify360-cp-integrator#readme) explains how to install and run it.

## What you need

* An AI agent that runs skills, such as Claude Code.
* A disposable test server with your panel, reachable over SSH as root. The run creates panel accounts and websites, installs packages, and changes the web server configuration. Never use a production server.
* An Imunify360 license key. A trial key works.

## What you get

* `facts.md`. It lists what the agent found about your panel, each fact with the server output that proves it, and the plan of what the agent will install and change. You review and approve it before the agent installs anything.
* `report.md`. It shows that Imunify360 sees the panel's users and domains, detects malware in their sites, serves its UI to panel users, and applies its WAF.
* An installable integration package with install, update, and uninstall steps, configuration recommendations, and known limits.

The run directory quotes live server output. Keep it private.

## Who owns the integration

You own the integration that you build with the skill. CloudLinux does not ship, own, or support it. Report problems with the skill itself in the [skill's GitHub issues](https://github.com/cloudlinux/imunify360-cp-integrator/issues).
