# Command-Line Interface

#### Description

ImunifyAV(+) command-line interface (CLI) makes working with ImunifyAV(+) basics and features from your terminal even simpler.

::: tip Note
CLI commands are available only for cPanel and DirectAdmin control panels. Plesk and ISPmanager CLI support is coming soon.
:::

#### Usage

For access to the ImunifyAV agent features from the command-line interface, use the following command:

```
imunify-antivirus
```

Basic usage:

```
imunify-antivirus [command] [--option1] [--option2]... 
```

#### Options

The following options are available for all commands.

| | |
|-|-|
|`-h`, `--help `|show this help message and exit|
|`--console-log-level {ERROR,WARNING,INFO,DEBUG}`|level of logging input to the console|
|`--json`|returns data in JSON format|
|`--verbose, -v`|allows to return data in good-looking view if option `--json` is used|

#### Examples

1. This command allows to show help for the `start` command:
    ```
    imunify-antivirus start [-h]
    ```


**Available commands:**

| | |
|-|-|
|[`add-sudouser`](/cli/#add-sudouser)|add a user with root privileges|
|[`checkdb`](/cli/#checkdb)|check database integrity|
|[`check-domains`](/cli/#check-domains)|send domain list check|
|[`config update`](/cli/#config-update)|update configuration file via CLI|
|[`delete-sudouser`](/cli/#delete-sudouser)|remove a user with root privileges|
|[`doctor`](/cli/#doctor)|collect info about the system and send it to ImunifyAV(+)|
|[`infected-domains`](/cli/#infected-domains)|returns infected domain list|
|[`feature-management`](/cli/#feature-management)|manage ImunifyAV(+) features available for users|
|[`hooks`](/cli/#hooks)|hooks-related operations|
|[`malware`](/cli/#malware)|malware-related operations|
|[`notifications-config`](/cli/#notifications-config)|allows to update notifications in the configuration file via CLI|
|[`register`](/cli/#register)|register the agent|
|[`rstatus`](/cli/#rstatus)|send a query to server to the check if the license is valid|
|[`start`](/cli/#start)|start the agent|
|[`submit false-positive/false-negative`](/cli/#submit-false-positive-false-negative)|allows to submit a file as false positive/false negative|
|[`unregister`](/cli/#unregister)|unregister the agent|
|[`update`](/cli/#update)|update malware signatures|
|[`update-license`](/cli/#update-license)|force license update|
|[`version`](/cli/#version)|show version|


## Add-sudouser

This command adds a user with root privileges to the server.

**Usage:**

```
imunify-antivirus add-sudouser <userID> [--optional arguments]
```

**Example:**

This command adds the user 11XXX111 with root privileges to the server:


```
imunify-antivirus add-sudouser 11XXX111
OK
```


## Checkdb

Checks database integrity. In case database is corrupt, then this command saves backup copy of the database at `/var/imunifyav` and tries to restore integrity of the original database.

:::tip Note
If this command cannot restore database integrity, then it will destroy the original broken database.
:::
 
**Usage:**

```
imunify-antivirus checkdb [--optional arguments]
```

**Example:**

The following command checks the database integrity:

```
imunify-antivirus checkdb
```

## Check-domains


Allows to send domains list to check on ImunifyAV central server. This command requires cPanel. After domains checked, the results is available via the `infected-domains` command.

::: tip Note
`check-domains` command may take a few minutes to complete.
:::

**Usage**:


```
imunify-antivirus check-domains [--optional arguments]
```

**Example:**

The following command sends the domains list for a check to the Imunify central server. In case there are no infected domains found on the server, you will see no output. If there are any, you will get the following output:

```
imunify-antivirus check-domains
'domain1.com'
'domain2.com'
```


## Config update

Allows to update configuration file via CLI.


**Usage:**

```
imunify-antivirus config update [configuration options]
```

You can find instructions on how to apply configuration changes from CLI [here](/cli/#how-to-apply-changes-from-cli) and configuration options can be taken from the `/etc/sysconfig/imunify360/imunify360.config` file.

**Example:**

Set the `MALWARE_SCAN_INTENSITY.cpu = 5` configuration option from a command line:

```
imunify-antivirus config update '{"MALWARE_SCAN_INTENSITY": {"cpu": 5}}'
```

The successful output should display the configuration file content.

## Delete-sudouser

This command removes a user with root privileges from the server.

**Usage:**

```
imunify-antivirus delete-sudouser <userID> [--optional arguments]
```

**Example:**

The following command removes the user 11XXX111 with root privileges from the server.

```
imunify-antivirus delete-sudouser 11XXX111
OK
```

## Doctor

This command collects information about ImunifyAV state, generates the report and sends it to the ImunifyAV Support Team. This command can be used in case of any troubles or issues with ImunifyAV. This command will generate a key to be sent to the ImunifyAV Support Team. With that key the ImunifyAV Support Team can help with any problem as fast as possible.

**Usage:**
 
```
imunify-antivirus doctor [--optional arguments]
```

The successful output will contain the unique set of symbols, for example:

```
imunify-antivirus doctor
Please, provide this key:
SSXX11xXXXxxxxXX.1a1bcd1e-222f-33g3-hi44-5551k5lmn555
to Imunify360 Support Team
```

## Infected-domains

Allows to retrieve infected domains list.

**Usage**:

```
imunify-antivirus infected-domains [-h] [--optional arguments]
```

Optional arguments for `list`:

| | |
|-|-|
|`--limit`|Limits the output with the specified number of domains.<br>Must be a number greater than zero. By default, equals 100.|
|`--offset`|Offset for pagination. By default, equals 0.|

**Example:**

The following command displays the results of the `check-domains` command. In case there are no infected domains found on the server, you will see no output. If there are any, you will get the following output:

```
imunify-antivirus infected-domains
'domain1.com'
'domain2.com'
```

## Feature-management

Allows to manage ImunifyAV features available for users.

**Usage:**

```
imunify-antivirus feature-management [command] [--optional argument]...
```

`Command` can be one of the following:

| | |
|-|-|
| `defaults`| show the default value for each feature that is applied for newly created user|
| `disable`| disable a feature for some or all users|
| `enable`| enable a feature for some or all users|
| `get`| obtains the status of all available features for a `USER`|
| `list`| list all available features|

`Optional argument` for the `enable/disable` commands can be one of the following:

| | |
|-|-|
|<span class="notranslate">`[--feature av]`</span>|enable/disable <span class="notranslate">Malware Cleanup</span>|
<span class="notranslate">`[--feature proactive]`</span>|enable/disable <span class="notranslate">Proactive Defense</span>|
| `[--users [USERS [USERS ...]]]`| specifies the list of users which will be affected, otherwise the default value will be changed|

The mandatory argument for the `get` command:

| | |
|-|-|
| `[--user USER]`| specifies a user name to obtain the status of features for|

**Example:**

The following command enables malware cleanup feature for the `user1`. If the operation is successful for the user ```user1```, you will receive the following reply:

```
imunify-antivirus feature-management enable --feature av --users user1
failed: []
succeeded:
- user1
```

## Hooks <Badge text="Deprecated" type="warning"/>

:::danger Warning!
You can use a new notification system via [CLI](/cli/#notifications-config).
:::

You can read more about hooks [here](/imunifyav/#hooks-cli).

This command allows to manage hooks.

**Usage:**

```
imunify-antivirus hook [command] --event [event_name|all] [--path </path/to/hook_script>]
```


`command` can be one of the following:

| | |
|-|-|
|`add`|register a new event handler|
|`delete`|unregister existing event handler|
|`list`|show existing event handlers|
|`add-native`|register a new native event handler|

| | |
|-|-|
|`--event [event_name|all]`|defines a particular event that invokes<br>a registered handler as opposed to all keyword|
|`--path </path/to/hook_script>`|shall contain a valid path to a handler of the event,<br>it shall be any executable or Python Native event handlers<br>that agent will run upon a registered event|

**Example:**

The following command shows existing event handlers. If you have any hooks configured, the output will include something similar to this:

```
imunify-antivirus hook list --event all
Event: malware-detected, Path: /root/directory/IMAVscannereventhooks/malware_detected.py
```


## Login

Allows to get a token which can be used for authentication in stand-alone Imunify UI.

**Usage**:

<div class="notranslate">

```
imunify-antivirus login [command] [--optional arguments]
```

</div>

<span class="notranslate">`command`</span> can be one of the following:

| | |
|-|-|
|<span class="notranslate">`get`</span>|returns a token for USERNAME (must be executed by root)|
|<span class="notranslate">`pam`</span>|uses PAM to check the provided credential and returns a token for USERNAME if PASSWORD is correct|

Optional arguments for <span class="notranslate">`get`</span>:

| |
|-|
|<span class="notranslate">`--username USERNAME`</span>|

Optional arguments for <span class="notranslate">`pam`</span>:

| |
|-|
|<span class="notranslate">`--username USERNAME`</span>|
|<span class="notranslate">`--password PASSWORD`</span>|

**Example**:

You can use the <span class="notranslate">`login get`</span> command to implement your own authorization mechanism for stand-alone ImunifyAV.
For example, you can generate tokens for users which are already authorized in your system/panel, and redirect to stand-alone Imunify UI with <span class="notranslate">`?token=<TOKEN>`</span> in URL. (You can also set it in localStorage: <span class="notranslate">`localStorage.setItem('I360_AUTH_TOKEN', '<TOKEN>');`</span>)

<div class="notranslate">

```
imunify-antivirus login get --username my-user1
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MDAyNDQwMTAuMDk5MzE5LCJ1c2VyX3R5cGUiOiJjbGllbnQiLCJ1c2VybmFtZSI6ImNsdGVzdCJ9.V_Q03hYw4dNLX5cewEb_h46hOw96KWBWP0E0ChbP3dA
```

</div>


## Malware

Allows to manage malware options.

**Usage**:

<div class="notranslate">

```
imunify-antivirus malware [command] [--optional arguments]
```

</div>

Available commands:

| | |
|-|-|
|<span class="notranslate">`ignore`</span>|malware Ignore List operations|
|<span class="notranslate">`malicious`</span>|malware Malicious List operations|
|<span class="notranslate">`on-demand`</span>|on-demand Scanner operations|
|<span class="notranslate">`suspicious`</span>|malware Suspicious List operations|
|<span class="notranslate">`cleanup status`</span>|show the status of the cleanup process|
|<span class="notranslate">`history list`</span>|lists the complete history of all malware-related incidents/actions (optional arguments available)|
|<span class="notranslate">`rebuild patterns`</span>|allows to save changes after editing the excluded patterns for Malware Scanner. See details [here](https://docs.imunify360.com/faq_and_known_issues/#_22-how-to-edit-watched-and-excluded-patterns-for-malware-scanner)|
|<span class="notranslate">`user`</span>|allows to perform Malware Scanner operations for a user|
 
Optional arguments:

| | |
|-|-|
|<span class="notranslate">`--limit LIMIT`</span>|Limits the output with the specified number of domains.<br>Must be a number greater than zero. By default, equals 100.|
|<span class="notranslate">`--offset OFFSET`</span>|Offset for pagination. By default, equals 0.|
|<span class="notranslate">`--since SINCE`</span>|Start date.|
|<span class="notranslate">`--to TO`</span>|End date.|
|<span class="notranslate">`--user USER`</span>|Returns results for a chosen user.|
|<span class="notranslate">`--order-by [ORDER_BY [ORDER_BY ...]]`</span>|Sorting order.|
|<span class="notranslate">`--by-status [BY_STATUS [BY_STATUS ...]]`</span>|Return items with selected status.|
|<span class="notranslate">`--by-scan-id BY_SCAN_ID`</span>|Return items with selected ID.|
|<span class="notranslate">`--items ITEMS`</span>|Return selected items.|
|<span class="notranslate">`--search SEARCH`</span>|Search query.|


<span class="notranslate">`action`</span> is the second positional argument for <span class="notranslate">`ignore`</span> and can be one of the following:

| | |
|-|-|
|<span class="notranslate">`add`</span>|add file PATHS to the <span class="notranslate">Ignore List</span>|
|<span class="notranslate">`delete`</span>|delete file PATHS from the <span class="notranslate">Ignore List</span>|
|<span class="notranslate">`list`</span>|shows <span class="notranslate">Ignore List</span> entries (optional arguments apply)|

where PATHS are the absolute paths to files or folders divided by a whitespace.

<span class="notranslate">`command2`</span> is the second positional argument for the <span class="notranslate">`malicious`</span> command and can be one of the following:

| | |
|-|-|
|<span class="notranslate">`cleanup`</span>|clean up infected ITEMS for a USER|
|<span class="notranslate">`cleanup-all`</span>|clean up all files that have been detected as infected for all users|
|<span class="notranslate">`restore-original`</span>|restore the original (malicious/infected) file to its original location|
|<span class="notranslate">`list`</span>|list malicious/infected files|
|<span class="notranslate">`move-to-ignore`</span>|move a <span class="notranslate">Malicious List</span> entry to the (malware) <span class="notranslate">Ignore List</span>|
|<span class="notranslate">`remove-from-list`</span>|remove malicious/infected files from the <span class="notranslate">Malicious List</span>|
|<span class="notranslate">`restore-from-backup`</span>|restore a clean version of infected file from backup|


<span class="notranslate">`action`</span> is the second positional argument for <span class="notranslate">`on-demand`</span> and can be one of the following:

| | |
|-|-|
|<span class="notranslate">`list`</span>|list all on-demand scans performed|
|<span class="notranslate">`start --path PATH`</span>|starts an on-demand scan for a specified PATH|
|<span class="notranslate">`status`</span>|show the on-demand malware scanner status|
|<span class="notranslate">`stop`</span>|stop on-demand malware scanner process|
|<span class="notranslate">`queue put`</span>|put file PATHS to the queue for on-demand scan|
|<span class="notranslate">`queue remove`</span>|remove scans from the queue for on-demand scan|

The optional arguments for <span class="notranslate">`on-demand start`</span> and <span class="notranslate">`on-demand queue put`</span> are:

| |
|-|
|<span class="notranslate">`--ignore-mask IGNORE_MASK`</span>|
|<span class="notranslate">`--follow-symlinks`</span>|
|<span class="notranslate">`--no-follow-symlinks`</span>|
|<span class="notranslate">`--file-mask FILE_MASK`</span>|
|<span class="notranslate">`--intensity-cpu {1 to 7}`</span> 1 means the lowest intensity, 7 means the highest intensity|
|<span class="notranslate">`--intensity-io {1 to 7}`</span> 1 means the lowest intensity, 7 means the highest intensity|

<span class="notranslate">`action`</span> is the second positional argument for <span class="notranslate">`suspicious`</span> and can be one of:

| | |
|-|-|
|<span class="notranslate">`list`</span>|obtain the list of <span class="notranslate">Suspicious List</span> entries|
|<span class="notranslate">`move-to-ignore`</span>|move a <span class="notranslate">Suspicious List</span> entry to the (malware) <span class="notranslate">Ignore List</span>|


<span class="notranslate">`action`</span> is the second positional argument for <span class="notranslate">`user`</span> and can be one of the following:

| | |
|-|-|
|<span class="notranslate">`cleanup USER`</span>|clean all infected files for a user|
|<span class="notranslate">`restore-original USER`</span>|restore all original files for a user|
|<span class="notranslate">`list`</span>|list all users and their current infection status|
|<span class="notranslate">`scan`</span>|scan all users|


**Examples**

1. The following command starts on-demand scanner for the path specified after the <span class="notranslate">`start`</span> command:

<div class="notranslate">

```
imunify-antivirus malware on-demand start --path /home/<username>/public_html/
```
</div>

2. The following command shows the example of the <span class="notranslate">`ignore-mask`</span> usage when you have to scan all `d*` folders except for the <span class="notranslate">`dixon77w.com`</span> and <span class="notranslate">`dunnrrr.com`</span>:

<div class="notranslate">

```
imunify-antivirus malware on-demand start --path='/var/www/vhosts/d*' --ignore-mask='/var/www/vhosts/dixon77w.com/*,/var/www/vhosts/dunnrrr.com/*'
```
</div>

3. The following command adds on-demand scans for the selected path(s) to the scan queue

<div class="notranslate">

```
imunify-antivirus malware on-demand queue put "/home/user1/some folder" "/home/user2" --file-mask="*.php"
```
</div>

4. The following command removes the selected scans from the scan queue

<div class="notranslate">

```
imunify-antivirus malware on-demand list        # get scan_ids for the selected scans from the malicious list
imunify-antivirus malware on-demand queue remove 84f043211dc045ae8e6d641f3b9fdb0a 8c4ee39d4d8f43e296e893940c8e791a
```
</div>

5. The following command stops the on-demand Malware Scanner process

<div class="notranslate">

```
imunify-antivirus malware on-demand stop
```
</div>

6. The following command stops the on-demand Malware Scanner process and clears the scan queue

<div class="notranslate">

```
imunify-antivirus malware on-demand stop --all
```
</div>

7. The following command shows how to get an extended list of malicious files for a particular user. By default, a limit value equals to 50


```
imunify-antivirus malware malicious list --user cltest --limit 500
CLEANED_AT  CREATED     EXTRA_DATA  FILE  HASH  ID  MALICIOUS  SCAN_ID  SCAN_TYPE  SIZE  STATUS  TYPE  USERNAME
None        1599955297  {}          /home/cltest/public_html/test/TsMeJD.php        275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f  1627  True       1996cd86e6b14b12a1c165e79e3540d9  background  68    found   SMW-SA-05057-eicar.tst-4  cltest   
None        1599955297  {}          /home/cltest/public_html/test/TZlfnU.php        275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f  1628  True       1996cd86e6b14b12a1c165e79e3540d9  background  68    found   SMW-SA-05057-eicar.tst-4  cltest   
None        1599955297  {}          /home/cltest/public_html/test/Ke7V8n.php        275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f  1629  True       1996cd86e6b14b12a1c165e79e3540d9  background  68    found   SMW-SA-05057-eicar.tst-4  cltest   
None        1599955297  {}          /home/cltest/public_html/yoUq0L.php             275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f  1630  True       1996cd86e6b14b12a1c165e79e3540d9  background  68    found   SMW-SA-05057-eicar.tst-4  cltest   
None        1599955297  {}          /home/cltest/public_html/test/PKiuhY.php        275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f  1631  True       1996cd86e6b14b12a1c165e79e3540d9  background  68    found   SMW-SA-05057-eicar.tst-4  cltest   
None        1599955297  {}          /home/cltest/public_html/public_html/Zqrsvh.php  275a021bbfb6489e54d471899f7db9d1663fc695
```
</div>

8. The following command adds the specified path to the Ignore List

<div class="notranslate">

```
imunify-antivirus malware ignore add /home/user1/public_html/ "/home/some user/public_html/index.php"
```
</div>

9. The following command lists all users and their current infection status

<div class="notranslate">

```
imunify-antivirus malware user list
```
</div>

The successful initiation/stopping of a scanning process or adding of ignore directories/files should give you ```OK``` in the output.


## Notifications config

Allows administrators to execute custom scripts on events execution.


**Usage:**

```
imunify-antivirus notifications-config [command] [configuration options]
```


<span class="notranslate">`command`</span> can be:

| | |
|-|-|
|<span class="notranslate">`show`</span>|returns the full config as a JSON|
|<span class="notranslate">`update`</span>|updates the config (partial update is supported) and returns the full updated config as a JSON|

We advise administrators to use the <span class="notranslate">`notifications-config show`</span> to get the full config, pick what they want to edit, and feed it to the <span class="notranslate">`notifications-config update`</span>.

The general structure of the <span class="notranslate">`imunify-antivirus notifications-config show`</span> command output:

<div class="notranslate">

```json
{
  "eula": null,
  "items": {
    "rules": {
      "CUSTOM_SCAN_FINISHED": {
        "SCRIPT": {
          "enabled": false,
          "scripts": [
            "/home/myhook"
          ]
        }
      },
      "CUSTOM_SCAN_MALWARE_FOUND": {
        "SCRIPT": {
          "enabled": true,
          "scripts": [
            "/home/myhook"
          ]
        }
      },
      "CUSTOM_SCAN_STARTED": {
        "SCRIPT": {
          "enabled": false,
          "scripts": []
        }
      },
      "USER_SCAN_FINISHED": {
        "SCRIPT": {
          "enabled": false,
          "scripts": []
        }
      },
      "USER_SCAN_MALWARE_FOUND": {
        "SCRIPT": {
          "enabled": true,
          "scripts": [
            "/home/myhook"
          ]
        }
      },
      "USER_SCAN_STARTED": {
        "SCRIPT": {
          "enabled": false,
          "scripts": []
        }
      }
    }
  },
```

</div>

Let's review all the options.

Rules:

* <span class="notranslate">USER_SCAN_FINISHED</span> – occurs immediately after the user scanning has finished, regardless the malware has found or not.
* <span class="notranslate">USER_SCAN_MALWARE_FOUND</span> – occurs when the malware scanning process of a user account has finished and malware found.
* <span class="notranslate">USER_SCAN_STARTED</span> – occurs immediately after the user scanning has started.
* <span class="notranslate">CUSTOM_SCAN_STARTED</span> – occurs immediately after on-demand (manual) scanning has started.
* <span class="notranslate">CUSTOM_SCAN_FINISHED</span> – occurs immediately after on-demand (manual) scanning has finished, regardless the malware has found or not.
* <span class="notranslate">CUSTOM_SCAN_MALWARE_FOUND</span> – occurs when the on-demand scanning process has finished and malware found.


**Examples**:

1. Enable "CUSTOM_SCAN_STARTED" triger:

<div class="notranslate">

```
# imunify-antivirus notifications-config update '{"rules": {"CUSTOM_SCAN_STARTED": {"SCRIPT": {"enabled": true}}}}'
```
</div>

After the successful execution, the <span class="notranslate">`imunify-antivirus notifications-config update`</span> command returns the full config with changes. 

The <span class="notranslate">`imunify-antivirus notifications-config show`</span> command output after applying the example 1:

<div class="notranslate">

```json
{
  "eula": null,
  "items": {
    "rules": {
      "CUSTOM_SCAN_FINISHED": {
        "SCRIPT": {
          "enabled": false,
          "scripts": [
            "/home/myhook"
          ]
        }
      },
      "CUSTOM_SCAN_MALWARE_FOUND": {
        "SCRIPT": {
          "enabled": true,
          "scripts": [
            "/home/myhook"
          ]
        }
      },
      "CUSTOM_SCAN_STARTED": {
        "SCRIPT": {
          "enabled": true,
          "scripts": []
        }
      },
      "USER_SCAN_FINISHED": {
        "SCRIPT": {
          "enabled": false,
          "scripts": []
        }
      },
      "USER_SCAN_MALWARE_FOUND": {
        "SCRIPT": {
          "enabled": true,
          "scripts": [
            "/home/myhook"
          ]
        }
      },
      "USER_SCAN_STARTED": {
        "SCRIPT": {
          "enabled": false,
          "scripts": []
        }
      }
    }
  },
```

</div>
    
**More examples**:

2. Run the custom script on the <span class="notranslate">USER_SCAN_FINISHED</span> event occurrence:

<div class="notranslate">

```
imunify-antivirus notifications-config update '{"rules": {"USER_SCAN_FINISHED": {"SCRIPT": {"scripts": ["/script/my-handler.py"], "enabled": true}}}}'
```
</div>


After the successful execution, the <span class="notranslate">`imunify-antivirus notifications-config update`</span> command returns the full config with changes. 

The <span class="notranslate">`imunify-antivirus notifications-config show`</span> command output after applying the example 2:

<div class="notranslate">

```json
{
  "eula": null,
  "items": {
    "rules": {
      "CUSTOM_SCAN_FINISHED": {
        "SCRIPT": {
          "enabled": false,
          "scripts": [
            "/root/myhook"
          ]
        }
      },
      "CUSTOM_SCAN_MALWARE_FOUND": {
        "SCRIPT": {
          "enabled": true,
          "scripts": [
            "/home/myhook"
          ]
        }
      },
      "CUSTOM_SCAN_STARTED": {
        "SCRIPT": {
          "enabled": true,
          "scripts": []
        }
      },
      "USER_SCAN_FINISHED": {
        "SCRIPT": {
          "enabled": true,
          "scripts": [
            "/script/my-handler.py"
          ]
        }
      },
      "USER_SCAN_MALWARE_FOUND": {
        "SCRIPT": {
          "enabled": true,
          "scripts": [
            "/home/myhook"
          ]
        }
      },
      "USER_SCAN_STARTED": {
        "SCRIPT": {
          "enabled": false,
          "scripts": []
        }
      }
    }
  },
```

</div>

#### Example of script to create custom scripts to use with notifications-config

There are two script examples you can download:

* [Shell script](/hook_script.sh)
* [Python script](/hook_script.py)

You can use these scripts as a reference and customize them.

:::warning Note
Set the `+x` bits to your script file to make it executable. Your script also has to be readable by the special <span class="notranslate">`_imunify`</span> user, so make sure of setting group's permission accordingly:

<div class="notranslate">

```
chown root:_imunify hook_script.sh
```
</div>
:::

#### Python script description

The agent generates messages of different types on hook events. The ‘if chain’ in the script calls the particular method corresponding to type of the event that came from the agent.

To unblock user sites which were scanned as clean, you can use the `handle_user_scan_finished` method.

Add your path to the related hook (or multiple hooks) and implement the custom logic of blocking and unblocking sites.

Also in this script you could find the way to parse JSON that come from ImunifyAV(+) and description of this JSON schema in every possible case. Such descriptions are provided by docstring of the <span class="notranslate">`handle`</span> methods.

## Register

Allows to register and activate ImunifyAV. You can use it in case if ImunifyAV was not activated during installation process or in case if activation key of the ImunifyAV was changed for any reason. If you do not know what is an activation key or have any problem with it then, please, read [Installation Guide](/imunifyav/#installation-guide) or [contact our support team](https://cloudlinux.zendesk.com/hc/requests/new).

**Usage:**
 
```
imunify-antivirus register [--optional arguments] [KEY]
```

`KEY` is a positional argument:

| | |
|-|-|
|`KEY`| register with activation key (use `IPL` to register by IP)|

If you will use this command without the `KEY` argument, then it will try to register and activate current activation key.

**Example 1:**
The following command will register and activate Imunify360 with the provided activation key:

```
imunify-antivirus register IMAV250jjRRjowbjk56dGN
OK
```

**Example 2:**
If you have an IP-based license, you can use `IPL` argument to register and activate ImunifyAV:

```
imunify-antivirus register IPL
OK
```


## Rstatus

Allows to check if ImunifyAV server license is valid.

**Usage:**

```
imunify-antivirus rstatus [--optional arguments]
```

An extended variation (otherwise, you receive ```OK``` if everything is fine with the license registered):

```
imunify-antivirus rstatus --json -v
{
  "expiration": null,
  "id": "SSXX11xXXXxxxxXX",
  "ip_license": false,
  "license": {
    "expiration": null,
    "id": "SSXX11xXXXxxxxXX",
    "ip_license": false,
    "license_type": "imunify-antivirus",
    "message": " ",
    "status": true,
    "upgrade_url": "  ",
    "user_count": 100,
    "user_limit": 2147483647
  },
  "license_type": "imunify-antivirus",
  "message": " ",
  "status": true,
  "upgrade_url": " ",
  "user_count": 100,
  "user_limit": 2147483647,
  "version": "5.1.2-1"
}
```

## Submit false-positive/false-negative

To submit file as false positive for analysis (if ImunifyAV considers file as a malicious but it actually isn't), you can use the following command (please make sure to specify the file name along with full path):

<div class="notranslate">

```
imunify-antivirus submit false-positive <file>
```

</div>

To submit file as false negative for analysis (if ImunifyAV considers file as a non-malicious but it actually does), you can use the following command (please make sure to specify the file name along with full path):

<div class="notranslate">

```
imunify-antivirus submit false-negative <file>
```

</div>
 
Optional arguments:

| | |
|-|-|
|<span class="notranslate">`-h`, `--help`</span>|show this help message and exit|




## Unregister


Allows to unregister and disable ImunifyAV on the server.

**Usage:**

```
imunify-antivirus unregister [--optional arguments]
OK
```

## Update

This command allows updating ImunifyAV malware signatures.

**Usage:**

```
imunify-antivirus update sign
OK
```

## Update-license

This command force updating the ImunifyAV license.

**Usage:**

```
imunify-antivirus update-license [--optional arguments]
OK
```


## Version

Allows to show the actual ImunifyAV version installed on the server.

**Usage:**

```
imunify-antivirus version [--optional arguments]
5.1.2-1
```

## How to apply changes from CLI

In order to apply changes via command-line interface (CLI), you can use the following command:

```
imunify-antivirus config update '{"SECTION": {"parameter": value}}'
```

For example, if you want to set `MALWARE_SCAN_INTENSITY.cpu = 5` from a command line, then you should execute the following command:

```
imunify-antivirus config update '{"MALWARE_SCAN_INTENSITY": {"cpu": 5}}'
imunify-antivirus config update '{"MALWARE_SCANNING": {"rapid_scan": true}}'
```

It is also possible to apply several parameters at once.

For example:

```
imunify-antivirus config update '{"MALWARE_SCAN_INTENSITY": {"cpu": 5, "io": 7}}'
```



