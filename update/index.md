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
release-upgrade will require manually edit Imunify repositories before enabling them.

Debian 9 (supported up to Imunify v6.11 (including)), 10, and 11 systems:

```
apt-get update
apt-get install --only-upgrade imunify360-firewall
```



