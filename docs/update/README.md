# Update Guide

:::tip Note
Updates are unconditionally enabled and the Imunify360 service starts during the package update.
:::

## Gradual roll-out

New stable Imunify360 versions are scheduled for the gradual roll-out from our production repository and are available for all customers in about two weeks or less from the release.

If you do not want to wait for the gradual roll-out, you can update Imunify360 to the latest version by running the following commands:

<div class="notranslate">

```
wget -O imunify-force-update.sh https://repo.imunify360.cloudlinux.com/defence360/imunify-force-update.sh
bash imunify-force-update.sh
```
</div>

## Beta

To upgrade Imunify360 on CentOS/CloudLinux/AlmaLinux systems, run the command:

```
yum update imunify360-firewall --enablerepo=imunify360-testing
```

To upgrade Imunify360 on Ubuntu 16.04, run the following command:

```
echo 'deb https://repo.imunify360.cloudlinux.com/imunify360/ubuntu-testing/16.04/ xenial main' > /etc/apt/sources.list.d/imunify360-testing.list
apt-get update
apt-get install --only-upgrade imunify360-firewall
```

To upgrade Imunify360 on Ubuntu 18.04, run the following command:

```
echo 'deb https://repo.imunify360.cloudlinux.com/imunify360/ubuntu-testing/18.04/ bionic main' > /etc/apt/sources.list.d/imunify360-testing.list
apt-get update
apt-get install --only-upgrade imunify360-firewall
```

To upgrade Imunify360 on Ubuntu 20.04, run the following command:

```
echo 'deb https://repo.imunify360.cloudlinux.com/imunify360/ubuntu-testing/20.04/ focal main' > /etc/apt/sources.list.d/imunify360-testing.list
apt-get update
apt-get install --only-upgrade imunify360-firewall
```

To upgrade Imunify360 on Ubuntu 22.04, run the following command:

```
echo 'deb https://repo.imunify360.cloudlinux.com/imunify360/ubuntu-testing/22.04/ jammy main' > /etc/apt/sources.list.d/imunify360-testing.list
apt-get update
apt-get install --only-upgrade imunify360-firewall
```

To upgrade Imunify360 on Ubuntu 24.04, run the following command:

```
echo 'deb https://repo.imunify360.cloudlinux.com/imunify360/ubuntu-testing/24.04/ noble main' > /etc/apt/sources.list.d/imunify360-testing.list
apt-get update
apt-get install --only-upgrade imunify360-firewall
```

To upgrade Imunify360 on Ubuntu 26.04, run the following command:

```
echo 'deb https://repo.imunify360.cloudlinux.com/imunify360/ubuntu-testing/26.04/ resolute main' > /etc/apt/sources.list.d/imunify360-testing.list
apt-get update
apt-get install --only-upgrade imunify360-firewall
```

To upgrade Imunify360 on Debian 9 (supported up to Imunify v6.11 (including)), run the following command:

```
echo 'deb https://repo.imunify360.cloudlinux.com/imunify360/debian-testing/9/ stretch main'  > /etc/apt/sources.list.d/imunify360-testing.list
apt-get update
apt-get install --only-upgrade imunify360-firewall
```

To upgrade Imunify360 on Debian 10, run the following command:

```
echo 'deb https://repo.imunify360.cloudlinux.com/imunify360/debian-testing/10/ buster main'  > /etc/apt/sources.list.d/imunify360-testing.list
apt-get update
apt-get install --only-upgrade imunify360-firewall
``` 

To upgrade Imunify360 on Debian 11, run the following command:

```
echo 'deb https://repo.imunify360.cloudlinux.com/imunify360/debian-testing/11/ bullseye main' > /etc/apt/sources.list.d/imunify360-testing.list
apt-get update
apt-get install --only-upgrade imunify360-firewall
``` 

To upgrade Imunify360 on Debian 12, run the following command:

```
echo 'deb https://repo.imunify360.cloudlinux.com/imunify360/debian-testing/12/ bookworm main' > /etc/apt/sources.list.d/imunify360-testing.list
apt-get update
apt-get install --only-upgrade imunify360-firewall
``` 

To upgrade Imunify360 on Debian 13, run the following command:

```
echo 'deb https://repo.imunify360.cloudlinux.com/imunify360/debian-testing/13/ trixie main' > /etc/apt/sources.list.d/imunify360-testing.list
apt-get update
apt-get install --only-upgrade imunify360-firewall
``` 

## Production

CentOS/CloudLinux/AlmaLinux systems:

```
yum update imunify360-firewall
```

Ubuntu 16.04, 18.04, 20.04, and 22* systems:

```
apt-get update
apt-get install --only-upgrade imunify360-firewall
```

:::tip Note
If you have upgraded the underlying OS (for example, Ubuntu 22.04 → 24.04), the Imunify repository `.list` files still point at the previous OS version and `apt-get update` will fail. Run the deploy script with `--post-os-upgrade` to refresh the repositories — see [Host OS upgrade](#host-os-upgrade) below.
:::

Debian 9 (supported up to Imunify v6.11 (including)), 10, and 11 systems:

```
apt-get update
apt-get install --only-upgrade imunify360-firewall
```

## Host OS upgrade

When you upgrade the underlying operating system (for example, Ubuntu 22.04 → 24.04) on a server where Imunify360 or ImunifyAV is installed, the APT repository `.list` files keep pointing at the **previous** OS version. As a result `apt-get update` will either return 404 errors or pull packages built for the old OS, and the daily update cron will silently install the wrong packages.

This applies only to **Debian/Ubuntu** systems. RPM-based systems (CentOS / CloudLinux / AlmaLinux) are unaffected because `yum`/`dnf` resolve the OS version dynamically.

To recover after a host OS upgrade, run the deploy script with the `--post-os-upgrade` flag.

For Imunify360:

<div class="notranslate">

```
bash i360deploy.sh --post-os-upgrade -y
```
</div>

For ImunifyAV:

<div class="notranslate">

```
bash imav-deploy.sh --post-os-upgrade -y
```
</div>

The flag requires deploy script version **2.152** or later. It performs the following steps automatically:

1. Reinstalls `imunify-release` for the OS currently reported by `/etc/os-release`, which rewrites the repository `.list` files to the new OS version.
2. Handles the GPG key `.dpkg-dist` edge case introduced by Ubuntu 24.04 and later.
3. Re-enables the beta/testing repository if it was active before the upgrade.
4. Runs `apt-get update` and reinstalls the product package to pick up binaries built for the new OS.
5. Restarts the Imunify service so that the in-memory cache of `/etc/os-release` is refreshed.

:::tip Note
Run `--post-os-upgrade` only **after** the host OS upgrade has completed and the new OS has booted. The flag is intended for recovery; it cannot be combined with `--uninstall`. On RPM-based systems the flag exits early with an informational message.
:::

