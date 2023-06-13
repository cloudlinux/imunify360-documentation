# Uninstall

#### How to stop Imunify360

For CentOS6/CloudLinux6, run the following command:

<div class="notranslate">

```
service imunify360 stop
```
</div>

For all other operating systems, run the following command:

<div class="notranslate">

```
systemctl stop imunify360
```
</div>

#### How to uninstall Imunify360

To uninstall Imunify360, run:

<div class="notranslate">

```
bash i360deploy.sh --uninstall
```

</div>

If you have already deleted <span class="notranslate">`i360deploy.sh`</span> then download it by running:

<div class="notranslate">

```
wget https://repo.imunify360.cloudlinux.com/defence360/i360deploy.sh
```

</div>

and proceed to the directory with the script.


For CloudLinux OS, please run the following commands:

<div class="notranslate">

```
/usr/sbin/cagefsctl  --force-update
/usr/sbin/cagefsctl  --remount-all
```

</div>

to remount <span class="notranslate">CageFS</span> and remove files from user's local directories as after uninstalling these files are not removed automatically and can generate errors to Apache log.

See also: [Imunify360/AV uninstallation FAQ](https://cloudlinux.zendesk.com/hc/en-us/articles/360016144139-Imunify360-AV-uninstallation-FAQ).

#### How to disable updates

Starting from Imunify360 v.4.10, if you need to disable Imunify360 then you need to disable updates as well by editing cron file and comment out the update command.

CloudLinux OS/CentOS 

<div class="notranslate">

```
/etc/cron.daily/imunify360.cron
```
</div>

Ubuntu

<div class="notranslate">

```
/etc/cron.daily/imunify360-firewall
```
</div>


