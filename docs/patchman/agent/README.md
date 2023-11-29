# Agent (patchman-client) 

[[TOC]]

## Where can I find the software changelog?

### Online changelog

You can find the central Patchman software changelog at the following URL:

[https://download.patchman.co/changelog](https://download.patchman.co/changelog)

In addition to the above, the changelog for each software update is also available through your system package manager.

### CentOS / CloudLinux

Use the RPM package management utility with the following command:

```
rpm -q --changelog patchman-client
```

### Debian / Ubuntu

The apt package manager installs the changelog in a fixed location. You can read the changelog in this location with the following command:

```
zcat /usr/share/doc/patchman-client/changelog.Debian.gz
```

* * *

## Tuning the Patchman agent

The Patchman agent process allows for multiple tuning options. This article serves as a collection of available tuning methods and where to find them.

### Scanning limits

Scanning limits allow you to set restrictions on full server scans. Setting an option will apply the scanning limit after a certain event is triggered. Disabling the scanning limit will make sure that the limit will not be applied. Scanning limits can be disabled for manual server scans triggered through the Portal. Scanning limits will only apply to full server scans and therefore will not affect manual end user scans.

You can configure this on the server group ([https://portal.patchman.co/servers/group/](https://portal.patchman.co/servers/group/))

The following limits and triggers can be configured:

* Throttle dynamic malware scanning by only scanning changed files
* Disable dynamic malware scanning altogether
* Abort all scanning

The following triggers can be configured:

* Disabled
* After scanning N users
* After scanning N directories
* After scanning one in N users
* After scanning one in N directories
* After scanning for N hours total (since the beginning of the server-wide scan)
* After surpassing the time of day

### Scanning interval

Scanning interval enables you to choose to run Dynamic malware scanning not on every scan, but only on certain intervals, for instance, on certain days of the week. 

You can configure this on the server group ([https://portal.patchman.co/servers/group/](https://portal.patchman.co/servers/group/))

The following options can be configured:

* During every scan, scan every file dynamically
* During every scan, scan files that have changed since the last dynamic scan
* Only when the scan is in the configurable interval, scan every file dynamically
* Scan every file dynamically when the scan is in the configurable interval, during all other scans only scan changed files dynamically
* Never perform dynamic scanning

Further reading:  
More information about configuring scanning limits and interval can be found in the main Patchman CLEAN article, here: [What is Patchman CLEAN, and how do I enable & configure it?](/patchman/frequently_asked_questions/#what-is-patchman-clean-and-how-do-i-enable-configure-it)

### Maximum file size 

Additionally, scanning limits offer a maximum file size setting, allowing you do determine the cut-off for scanning large files:

![](/images/Max_filesize.png)

### CPU Nice value and I/O Priority

The agent also allows you to configure CPU and IO resource priorities, through nice values for CPU, and Best effort priority for CFQ I/O scheduling

You can configure this on the server group ([https://portal.patchman.co/servers/group/](https://portal.patchman.co/servers/group/))

![](/images/niceio-priority.png)

### Multi-threaded scanning configuration

With the introduction of multithreading, multithreading settings can be configured for the agent. You can configure this on the server group ([https://portal.patchman.co/servers/group/](https://portal.patchman.co/servers/group/)). The following settings can be configured:

**Absolute (thread count)**  
Configure the exact number of threads to use for multithreaded scanning.

**CPU Ratio**  
Allocate a percentage of total available CPU threads to use for multi-threaded scanning. As this is a percentage, it is worth noting that it **rounds down**, to whole threads.

**CPU Reservation**  
Allocate the number of CPU threads for the Patchman daemon to leave unused. Note that there is a **minimum thread allocation of 1**. If a user configures a lower limit, for example 0, or -4 (an 8 thread reservation on a 4 core machine), the Patchman agent logs at `info` level and instead uses 1 thread.

* * * 

## Multi-threaded scanning, what is it and how do I configure it?

### What is multithreaded scanning?

While older versions were entirely single-threaded, version 1.12.0-1 introduces multi-threaded scanning to the Patchman agent. 

Multithreaded scanning enables the Patchman agent process (patchmand) to create multiple worker threads, allowing it to perform multiple tasks concurrently. This allows the agent to better scale performance with the resources available (and allocated) on a hosting platform, and perform far better on tasks that are (mostly) CPU-bound.

### How does multithreaded scanning benefit me?

While multithreading does affect most tasks performed by the agent, the most drastic benefit is seen with the use of [Patchman CLEAN](/patchman/frequently_asked_questions/#what-is-patchman-clean-and-how-do-i-enable-configure-it)'s rule-scanning mechanism. Where before customers who used Patchman CLEAN could see longer scanning times depending on the size and density of their platform (and would likely have configured scanning limits to mitigate them), the introduction of multithreading—if employed and configured properly—will drastically improve scan times, allowing users to be far less restrictive in scanning configuration. This, in turn, greatly benefits the effective coverage of the CLEAN solution.  

### Where do I configure multithreaded scanning?

You can configure the agent's multithreaded scanning settings on the server group (once logged in; [https://portal.patchman.co/servers/group/](https://portal.patchman.co/servers/group/)) which allows you to easily manage it across multiple servers. 

### What can I configure, and what do the settings mean?

With the introduction of multithreading, the following settings can be configured for the agent:

#### Absolute (thread count)

Configure the exact number of threads to use for multithreaded scanning.

#### CPU Ratio

Allocate a percentage of total available CPU threads to use for multi-threaded scanning. As this is a percentage, it is worth noting that it **rounds down**, to whole threads.

#### CPU Reservation

Allocate the number of CPU threads for the Patchman daemon to leave unused. Note that there is a **minimum thread allocation of 1**. If a user configures a lower limit, for example 0, or -4 (an 8 thread reservation on a 4 core machine), the Patchman agent logs at `info` level and instead uses 1 thread.

### Defaults, upon release and after

Upon release of the multithreading feature, the 'Absolute' setting will be used as the default for all existing customers' server groups, and set to 1 core, meaning that for existing users, agent behaviour is unchanged until they explicitly increase the thread count. For _new_ server groups created after the feature is live, a sensible default is chosen that does allow users to benefit from multithreading out of the box; CPU Ratio, set to 50%.

* * * 

## Multi-threaded scanning, what is it and how do I configure it?

### What is multithreaded scanning?

While older versions were entirely single-threaded, version 1.12.0-1 introduces multi-threaded scanning to the Patchman agent. 

Multithreaded scanning enables the Patchman agent process (patchmand) to create multiple worker threads, allowing it to perform multiple tasks concurrently. This allows the agent to better scale performance with the resources available (and allocated) on a hosting platform, and perform far better on tasks that are (mostly) CPU-bound.

### How does multithreaded scanning benefit me?

While multithreading does affect most tasks performed by the agent, the most drastic benefit is seen with the use of [Patchman CLEAN](/patchman/frequently_asked_questions/#what-is-patchman-clean-and-how-do-i-enable-configure-it)'s rule-scanning mechanism. Where before customers who used Patchman CLEAN could see longer scanning times depending on the size and density of their platform (and would likely have configured scanning limits to mitigate them), the introduction of multithreading—if employed and configured properly—will drastically improve scan times, allowing users to be far less restrictive in scanning configuration. This, in turn, greatly benefits the effective coverage of the CLEAN solution.  

### Where do I configure multithreaded scanning?

You can configure the agent's multithreaded scanning settings on the server group (once logged in; [https://portal.patchman.co/servers/group/](https://portal.patchman.co/servers/group/)) which allows you to easily manage it across multiple servers. 

### What can I configure, and what do the settings mean?

With the introduction of multithreading, the following settings can be configured for the agent:

#### Absolute (thread count)

Configure the exact number of threads to use for multithreaded scanning.

#### CPU Ratio

Allocate a percentage of total available CPU threads to use for multi-threaded scanning. As this is a percentage, it is worth noting that it **rounds down**, to whole threads.

#### CPU Reservation

Allocate the number of CPU threads for the Patchman daemon to leave unused. Note that there is a **minimum thread allocation of 1**. If a user configures a lower limit, for example 0, or -4 (an 8 thread reservation on a 4 core machine), the Patchman agent logs at `info` level and instead uses 1 thread.

### Defaults, upon release and after

Upon release of the multithreading feature, the 'Absolute' setting will be used as the default for all existing customers' server groups, and set to 1 core, meaning that for existing users, agent behaviour is unchanged until they explicitly increase the thread count. For _new_ server groups created after the feature is live, a sensible default is chosen that does allow users to benefit from multithreading out of the box; CPU Ratio, set to 50%.

* * *

## How do automatic agent updates work?

:::tip 
If you have installed the package for [real-time scanning](/patchman/frequently_asked_questions/#real-time-scanning-what-is-it-and-how-do-i-configure-it), automatic updates will also apply to that package. If you don’t have it installed yet, you need to manually install it first - Patchman can’t automatically perform this installation for you, for security reasons. 
:::

The Patchman agent is capable of performing unattended automated updates. This saves you time and effort whenever we release a new version, and ensures that all your servers are always running the latest version with both the newest features and the latest bugfixes.

### Configuring automatic updates

#### Disabling automatic updates

Automatic updates are switched on by default, and are available for agents with version 1.7.0-1 and higher.

If you do not wish to benefit from automatic updates, you can opt out through an option in the Portal. The option for controlling the automatic updates can be configured per server group. To disable automatic updates for a server group, navigate to "Server > Server groups", and then select the relevant server group in the list. Scroll down to "Miscellaneous settings" and deselect "Automatic updates".

![](/images/auto-update.png)

#### Repository name modifications

By default we assume the repository is named "patchman", as will be the case if you use our installation script to install the repository on your system. If you decided to rename the repository definition, you can configure the alternative repository name by adding the following data to the file /etc/patchman/patchman.ini (create it if it does not yet exist):

```
[updates]
repository = patchman
```

Naturally, replace "patchman" with the appropriate value. Make sure to reload the daemon after modifying the file:

```
service patchman reload
```

Our update process will use the new repository name where appropriate.

### Under the hood: steps in automatic updating

As a system administrator you may want to know how the updates are performed. In particular, you may be interested to know what checks we perform to ensure successful updates, what rollback procedures are involved if an update fails, and how the validity of each update is verified. This section lists all the steps the agent takes including some background information regarding the how and why for each step.

When building the updating procedure, our goal was to simulate the steps and checks involved in any manual update, and you'll notice that we're closely following the steps you might take if you manually performed an update of our software on your system. In particular, we made sure that we relied on the system package managers as much as possible (since that is what these systems were built for) which means we can delegate package signature validation and repository downloading to those proven tools. Additionally, we picked the steps involved in such a way that it will never update anything other than the patchman-client and patchman-client-realtime package, even if an update dependency requires it. If we ever update our dependencies, we will require a manual (attended) upgrade from you. All of this is done to ensure we don't modify anything on your systems that is not strictly required for purely updating our own software.

:::tip 
In the steps below, wherever actions are performed for the patchman-client package, they are repeated for the patchman-client-realtime package if (and only if) you have that installed. 
:::

#### CentOS/CloudLinux

1. Clean the cached metadata for the patchman repository to ensure issuing an install command will result in new metadata being downloaded from our repository
    1. On CentOS 6 and 7:
        ```
        yum clean all --disablerepo="*" --enablerepo="patchman"
        ```
    2. On CentOS 8:
        ```
        dnf clean all --disablerepo="*" --enablerepo="patchman"
        ```
2. Download the most recent version of the patchman-client package into the cache directory (and parse the associated filename). If no new version is available, stop the update procedure.
    1. On CentOS 6 and 7:
        ```
        yum install -y --downloadonly --downloaddir=<patchman tmp dir> patchman-client
        ```
    2. On CentOS 8
        ```
        dnf install -y --downloadonly --downloaddir=<patchman tmp dir> --verbose patchman-client
        ```
3. Determine the filename of the downloaded package using the filename from step 2.
4. Install the downloaded package using rpm. Since rpm is not able to download any potentially missing dependencies, this step will automatically fail if any unforeseen dependency problems arise.
    ```
    rpm -U /<patchman tmp dir>/patchman-client-1.2.3-1.rpm
    ```
5. Parse the output from the rpm command to check whether the update succeeded.
6. If the update is successful, the agent will restart itself after completion of the update procedure, ensuring the server is running the newly installed version afterwards.

#### Debian/Ubuntu

1. Read the filename that contains our repository definition and the path to the cache directory. This means parsing Dir, Dir::Etc, Dir::Etc::sourceparts, Dir::Cache and Dir::Cache::archives from:
    ```
    apt-config dump
    ```
2. Update the cached metadata for only the patchman repository. This is done by telling apt to perform the update while thinking our repository is the only repository definition.
    ```
    apt-get update -o Dir::Etc::sourcelist="/etc/apt/sources.list.d/patchman.repo" -o Dir::Etc::sourceparts="-" -o APT::Get::List-Cleanup="0"
    ```
3. Check whether a new update for patchman-client is available by parsing the output from:
    ```
    apt-cache policy patchman-client
    ```
4. If a new update is available, download it (and parse the associated filename).
    ```
    apt-get -d install patchman-client
    ```
5. Determine the filename of the downloaded package using the cache directory and the filename from step 4.
6. Install the downloaded package using dpkg. Since dpkg is not able to download any potentially missing dependencies, this step will automatically fail if any unforeseen dependency problems arise.
    ```
    dpkg -i /var/cache/apt/archives/patchman-client_1.2.3-1.deb
    ```
7. Parse the output from the dpkg command to check whether the update succeeded.
8. If the update is successful, the agent will restart itself after completion of the update procedure, ensuring the server is running the newly installed version afterwards.

:::tip 
In step 3, we used `apt-cache madison patchman-client` until version 1.14.0-1. 
:::

* * *

## Updating the Patchman agent

:::tip 
We strongly suggest using the auto-update feature, as described in [this article](https://patchman.atlassian.net/wiki/spaces/PT/pages/113410280). Relying on auto-update decreases maintenance and ensures you will always automatically use the most up-to-date version of the Patchman software. 
:::

The Patchman agent, running on the servers you add to the Portal, is updated regularly to resolve bugs and introduce new features. Updating the Patchman agent only requires you to update the package using your package manager. 

We recommend adding the updating of the Patchman agent to your regular update schedule. However, if you need to manually update the agent, you can use the following commands:

If you are using CentOS, you can use:

```
yum update patchman-client
```

or

```
dnf update patchman-client
```

If you are using Debian or Ubuntu, you can use:

```
apt-get update
apt-get install patchman-client
```

After updating the agent, the service should restart automatically and you should see the new version number appear in the Portal (under Servers). 

On rare occasions customers reported that the agent refuses to stop, in that case a manual restart is required.

```
service patchman restart
```

If the restart fails, there is probably a long-running task that prevents the agent from restarting immediately. The logfiles in /var/log/patchman/ will point out that the shutdown signal was received by the process, and will be processed as soon as possible. If the process hasn't restarted after 10 minutes, please contact [support@patchman.co](mailto:support@patchman.co) and send along the logfiles for further inspection.

Although we strive to maximize compatibility, we may occassionally drop support for outdated agent versions. Your agent will then not be able to connect to the Portal, meaning that new detections will not be reported and existing detections can't be resolved.

* * * 

## Uninstalling the Patchman agent

Patchman is installed on your system using the standard package manager. This means that you can easily uninstall the software using this package manager.

### CentOS / CloudLinux

Use the yum package management utility with the following command:

```
yum remove patchman-client
```

or

```
dnf remove patchman-client
```

### Debian / Ubuntu

Use the apt package management utility with the following command:

```
apt-get remove patchman-client
```

### Cancelling the server license

Make sure to cancel the server license in the Patchman Portal. We strongly suggest you do this **_after_** the removal of the software from your system, because if the software is still running it may automatically request a new license on your account (according to the standard installation procedure).

In the Patchman Portal, go to the server configuration page under Servers. If your plan requires advance notice for cancelling servers, click the red Cancel button to cancel your license and deactivate it per the renewal date. Otherwise, click the red Delete button to immediately remove the server license from your account. This will make sure you are no longer billed for this server.