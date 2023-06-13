# Stand-alone version of ImunifyAV(+) (non-panel, generic panel integration)

Below you can find the steps to install and run ImunifyAV(+), in stand-alone mode, or within any hosting panel.


#### Requirements

**Operating system**

* CentOS/RHEL 6/7/8
* CloudLinux OS 6/7/8
* Ubuntu 16.04 (LTS only), 18.04, 20.04, and 22
* Debian 9 (supported up to Imunify v6.11 (including)) /10/11
* Rocky Linux 8

#### Prerequisites

* PHP with `proc_open` function enabled (remove it from the `disable_functions` list in `php.ini`)


There are some basic steps to run ImunifyAV as a stand-alone application:

1. Define a way to serve web-based UI
2. Provide ImunifyAV with an actual list of users in the system
3. Configure a user authentication process

:::warning Warning
Imunify Web-UI PHP code has to be executed under a non-root user which has access to `/var/run/defence360agent/non_root_simple_rpc.sock`. If it runs in CageFS, you'll need to configure it accordingly.
:::

To allow non-root user in CageFS access to the socket, this workaround should be applied:

```sh
# create directory for moun-point
mkdir /imunify-ui-shared
# add symlink for user which belong to UI backend `imunify-web` in this example)
ln -s /var/run/defence360agent /imunify-ui-shared/imunify-web
# add symlink to cagefs skeleton
rm -f /usr/share/cagefs-skeleton/var/run/defence360agent
ln -s /imunify-ui-shared/imunify-web /usr/share/cagefs-skeleton/var/run/defence360agent
# add mount point to cagefs
echo "%/imunify-ui-shared" >> /etc/cagefs/cagefs.mp
# remount all
cagefsctl --remount-all
```

#### How to configure ImunifyAV UI

ImunifyAV UI is implemented as a single-page application (SPA) and requires a web server to serve it. It’s required to specify a path to the web server directory, where the ImunifyAV UI SPA application will be installed and served.

Example:

``` json
[paths]
ui_path = /var/www/vhosts/imav/imav.example-hosting.com/html/imav
```


Ensure that the domain you are going to use for the ImunifyAV web-based UI refers to this path and that there are no other scripts or files under `ui_path`, as they might be overridden by ImunifyAV installation.


#### How to provide ImunifyAV with an actual list of users (optional)

By default, ImunifyAV will use Linux system users, limited by `uid_min` and `uid_max` from `/etc/login.defs`.

If you want to see a specific list of users (note, that all of them must be real linux users accessible via PAM), you can specify the `users` option in `/etc/sysconfig/imunify360/integration.conf`:

```json
[integration_scripts]
users = /path/to/get-users-script.sh
```

It should point to an executable file that generates a JSON file similar to the following (see details [here](/stand_alone_mode/#integration-config-file)):

```json
{
  "data": [
    {
      "id": 1000,
      "username": "ins5yo3",
      "owner": "root",
      "domain": "ins5yo3.com",
      "package": {
        "name": "package",
        "owner": "root"
      },
      "email": "ins5yo3@ins5yo3.com",
      "locale_code": "EN_us"
    },
    {
      "id": 1001,
      "username": "ins5yo4",
      "owner": "root",
      "domain": "ins5yo4.com",
      "package": {
        "name": "package",
        "owner": "root"
      },
      "email": "ins5yo4@ins5yo4.com",
      "locale_code": "EN_us"
    }
  ],
  "metadata": {
    "result": "ok"
  }
}
```

#### How to configure authentication for ImunifyAV (optional) 

ImunifyAV can use PAM to authenticate users.

Once the UI is opened, the user sees a sign-in form. The credentials are checked via PAM.

You can specify which PAM service ImunifyAV should use with the `service_name` option:

```json
[pam]
service_name = system-auth
```

If it is not specified, the “`system-auth`” service is used.

By default, `root` is considered to be the only "admin" user.


#### How to define administrators for ImunifyAV


The administrators have full access to ImunifyAV UI and its settings.

By default, root is considered to be the only admin user.

To add more administrators, list them in the `/etc/sysconfig/imunify360/auth.admin` file or specify the admins option in the `/etc/sysconfig/imunify360/integration.conf`.

Admin users will be merged from three sources: `/etc/sysconfig/imunify360/auth.admin` list and scripts defined in the `/etc/sysconfig/imunify360/integration.conf` or `/opt/cpvendor/etc/integration.ini` that return user lists.

```json
[integration_scripts]
admins = /path/to/get-admins-script.sh
```
It should point to an executable file that generates a JSON file similar to the following:

```json
{
  "data": [
    {
      "name": "admin1",
      "unix_user": "admin",
      "locale_code": "EN_us",
      "email": "admin1@domain.zone",
      "is_main": true
    },
	{
      "name": "admin2",
      "unix_user": "admin",
      "locale_code": "Ru_ru",
      "email": "admin2@domain.zone",
      "is_main": false
    },
  ],
  "metadata": {
    "result": "ok"
  }
}
```

#### How to provide a list of domains for ImunifyAV (optional)

To provide a list of domains for ImunifyAV, specify the script that generates a JSON file in the `/etc/sysconfig/imunify360/integration.conf`:

```json
[integration_scripts]
domains = /path/to/get-domains-script.sh
```
A JSON file should be similar to the following:

```json
{
  "data": {
    "example.com": {
      "document_root": "/home/username/public_html/",
      "is_main": true,
      "owner": "username",
    },
    "subdomain.example.com": {
      "document_root": "/home/username/public_html/subdomain/",
      "is_main": false,
      "owner": "username",
    }
  },
  "metadata": {
    "result": "ok"
  }
}
```


#### How to install ImunifyAV

Now everything is ready to install ImunifyAV.

The installation instructions are the same as for cPanel/DirectAdmin version, and can be found in the technical documentation: [https://docs.imunifyav.com/imunifyav/#installation-instructions](/imunifyav/#installation-instructions).

#### How to open ImunifyAV UI

Once ImunifyAV is installed, the web-based UI is available via the domain configured in `ui_path`.

For example, if `/var/www/vhosts/imav/imav.example-hosting.com/html/imav` is the document root folder for the imav.example-hosting.com domain, then you could open ImunifyAV with the following URL:

* `https://imav.example-hosting.com/` (when you have TLS certificate configured for the domain)
or 
* `http://imav.example-hosting.com/`

## Integration config file
The documentation for the ImunifyAV stand-alone version integration configuration file format.

**Location** `/etc/sysconfig/imunify360/integration.conf`

**Parameters**

```json
[paths]
ui_path = /var/www/vhosts/imunifyAV/imunifyAV.hosting.example.com/html/imav
```

The path to the web server directory, where ImunifyAV will be installed and served by web server. Need to be defined before ImunifyAV installation.

```json
[paths]
ui_path_owner = panel_user:web_server_group
```

Allows executing `chown` to that owner for files after installation. The parameter is optional, if it is absent, `chown` doesn't execute.

```json
[pam]
service_name = system-auth
```

The PAM service is used for user authentication in the ImunifyAV UI application. By default, the `system-auth` service is used.

```json
[integration_scripts]
admins = /path/to/get-admins-script.sh
```

The path to the executable script that generates a JSON file with the list of admin accounts.


```json
{
  "data": [
    {
      "name": "admin1",
      "unix_user": "admin",
      "locale_code": "EN_us",
      "email": "admin1@domain.zone",
      "is_main": true
    },
	{
      "name": "admin2",
      "unix_user": "admin",
      "locale_code": "Ru_ru",
      "email": "admin2@domain.zone",
      "is_main": false
    }
  ],
  "metadata": {
    "result": "ok"
  }
}
```

```json
[integration_scripts]
users = /path/to/get-users-script.sh
```

The script to provide the specific list of users used by ImunifyAV.

It should point to an executable file that generates a JSON file similar to the following (domains are optional):

```json
{
  "data": [
    {
      "id": 1000,
      "username": "ins5yo3",
      "owner": "root",
      "domain": "ins5yo3.com",
      "package": {
        "name": "package",
        "owner": "root"
      },
      "email": "ins5yo3@ins5yo3.com",
      "locale_code": "EN_us"
    },
    {
      "id": 1001,
      "username": "ins5yo6",
      "owner": "root",
      "domain": "ins5yo6.com",
      "package": {
        "name": "package",
        "owner": "root"
      },
      "email": "ins5yo4@ins5yo6.com",
      "locale_code": "EN_us"
    }
  ],
  "metadata": {
    "result": "ok"
  }
}
```

#### Data description

| | | |
|-|-|-|
|Key|Nullable|Description|
|`id`|`False`|ID of the UNIX account in the system.|
|`username`|`False`|The name of the UNIX account in the system.|
|`owner`|`True`|The name of the account owner. The owner can be an administrator (in this case he should be included in the `admins()` output).|
|`locale_code`|`True`|The locale selected by a user.|
|`email`|`True`|Email of the account user. If there is no email, it should return null.|
|`domain`|`True`|The main domain of a user.|
|`package`|`True`|Information about the package to which a user belongs to. If the user doesn’t belong to any package, it should return null.|
|`package.name`|`False`|The name of the package to which a user belongs to.|
|`package.owner`|`True`|The owner of the package to which a user belongs to (administrator).|

```json
[integration_sctipts]
domains = /path/to/get-domains-script.sh
```

It should point to an executable file that generates a JSON file similar to the following

```json
{
  "data": {
    "example.com": {
      "document_root": "/home/username/public_html/",
      "is_main": true,
      "owner": "username"
    },
    "subdomain.example.com": {
      "document_root": "/home/username/public_html/subdomain/",
      "is_main": false,
      "owner": "username"
    }
  },
  "metadata": {
    "result": "ok"
  }
}
```






