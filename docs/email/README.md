# Email

#### Imunify Email compatibility

Imunify Email has been checked for compatibility with following tools and mail gateways:

* Config Server Services
  * [MailScanner](https://configserver.com/cp/osm.html)
  * [Firewall](https://configserver.com/cp/csf.html)
* [MailChannels](https://www.mailchannels.com/) from IE 0.6 version
* SpamAssassin (incoming and outgoing configuration)
* [Smtp2go](https://www.smtp2go.com/)

### Installation

:::danger Note
Hosting administrator only.
:::

:::danger Important
Imunify Email beta is available for installation for registered beta testers only. Make sure you have subscribed as beta tester using [https://imunifyemail.com/](https://imunifyemail.com/) and followed the instructions sent by email.
:::

Imunify Email Beta is simple to install. 

At the moment, it runs on the following distributions:

* CentOS 7,8 with support of cPanel/WHM control panel.
* CloudLinux OS 7,8 with support of cPanel/WHM control panel.
* AlmaLinux 8 with support of cPanel/WHM control panel.

Minimum system requirements for installation:
* x64 | 512 Mb** | 20 Gb disk space ***

:::tip Note
** Imunify Email RAM consumption depends on the mail traffic. In a waiting state it consume little RAM, however for scanning large mails temporary increase of RAM consumption can be observed.

*** Used disk space depends on the number of accounts on a server. By default, each account will have 100 MB limitation for quarantine space. This limit can be adjusted using UI later.
:::

To install Imunify360, open an SSH connection to your server using your preferred SSH console application. You will need to have the root level access in order to proceed.

To start installation, run the following script with your activation key:

```
wget https://repo.imunify360.cloudlinux.com/defence360/imunifyemail-deploy.sh
bash imunifyemail-deploy.sh
```

### Installation details

#### Users created

During installation, the following users will be created: 

* _rspamd
* _imunifyemail

The `_imunifyemai` user will also be added to the `_imunify` group.

#### Directories

Imunify Email has following components:

* Imunify RSpamd 
* Imunify Quarantine 

Imunify RSpamd acts as an email filter and is installed in system directories such as:

* /etc/rspamd
* /usr/bin
* /usr/lib
* /usr/share/rspamd

Imunify Quarantine is installed in the following directory: `/var/imunifyemail/quarantine`.

#### Quarantine directories

Imunify Quarantine component keeps all quarantine content, including emails and meta data in the following directory: 
`/var/imunifyemail/quarantine/storage/`.


#### Exim configuration modifications

Imunify Email modifies Exim MTA configuration, adding RSpamd as a filter for email. 
It is done automatically during installation. In case if filtering needs to be disabled, see [Disable Imunify Email](/email/#disable-imunify-email). When disabled, Exim configuration will not contain an RSpamd filter. To re-able Imunify Email, see [Enable Imunify Email](/email/#enable-imunify-email).

The configuration change is compatible with WHM Advanced Editor, you can continue using it for other modifications. 

### User interface access

In order to access the UI as a hosting administrator, navigate to WHM -> Plugins -> Imunify360 -> Email tab. 

Your clients will be able to access the Imunify Email Quarantine under: cPanel -> Security -> Imunify360 -> Email.

### Managing Imunify Email

#### Check Imunify Email version

To find out which version of Imunify Email is installed, run the following command as root:

```
ie-config version
```

#### Check status

In order to check status of Imunify Email, run the following command as root:

```
ie-config status
```

#### Disable Imunify Email

In order to disable Imunify Email, run following command as root:

```
ie-config disable
```

It will remove filter configuration and stop Imunify Email services.


#### Enable Imunify Email

If Imunify Email was installed, but then disabled it can be re-enabled using the following command, run as root: 

```
ie-config enable
```


### WHM user interface

:::danger Note
Hosting administrator only.
:::

Imunify Email scans the outbound emails on the server and allows to identify viral mailings and other viral outbound mail content for all accounts on the server.

Click <span class="notranslate">_Email_</span> in the main menu of the Imunify360 admin interface.

![](/images/EmailMain.png)

The following tabs are available:

* <span class="notranslate">[Quarantine](/email/#quarantine)</span>
* <span class="notranslate">[Settings](/email/#settings)</span>

### Quarantine

Go to <span class="notranslate">Imunify360 → Email → Quarantine</span> tab. Here, there are emails that are considered viral or malicious for all accounts on the server. You can decline or confirm the Imunify Email decision and either release and send emails or remove them completely.

![](/images/EmailQuarantineTab.png)

The table has the following columns:

* <span class="notranslate">**Account**</span> — account name
* <span class="notranslate">**Received Date**</span> — when an email was received by the server for sending
* <span class="notranslate">**Sender (From)**</span> — the user who sent the email
* <span class="notranslate">**Recipients**</span> — recipients (including CC and BCC)
* <span class="notranslate">**Subject**</span> — a subject from an email
* <span class="notranslate">**Actions**</span>
  * <span class="notranslate">**Release & Send**</span> — hosting admin can use multi-select and release & send several emails at once

   ![](/images/EmailRelease.png)

  * <span class="notranslate">**Delete**</span> — delete email permanently

    ![](/images/EmailDelete.png)

  * <span class="notranslate">**View Email**</span> — view email content

    ![](/images/EmailView1.png)

    * Body - decoded email content with tags removed
    * Header - email Headers section
    * Plain text - headers plus original email body

:::tip Note
In this Beta release, the notifications are not sent both when deleting or releasing an email. Will be added in the next release.
:::

### Settings

:::danger Note
Hosting administrator only.
:::

Go to <span class="notranslate">Imunify360 → Email → Settings</span> tab. The settings allow managing the space for quarantine. An administrator can increase or decrease the space for the user's quarantine. If all space is consumed, the oldest emails in quarantine will be permanently deleted.

:::danger Note
By default, the space for the user's quarantine is 100 MB.
:::

![](/images/EmailSettings.png)

The table has the following columns:

* <span class="notranslate">**Account**</span> — user account name
* <span class="notranslate">**Limit (MB)**</span> — the space for the user's quarantine limit (default is 100 MB)
* <span class="notranslate">**Used Space (MB)**</span> — the space used by files in quarantine (slight excess of the limit is possible)
* <span class="notranslate">**State**</span> — the state of the user's quarantine. In the Beta version it is **Active** only
* <span class="notranslate">**Details**</span> — emails deleted permanently for the last hour
* <span class="notranslate">**Actions**</span>
  * <span class="notranslate">**Purge quarantine**</span> — purge all quarantine for an account

    ![](/images/EmailPurge.png)

  * <span class="notranslate">**Add**</span> — change the limit of the space for the user's (account) quarantine

   ![](/images/EmailAdd.png)

### Imunify Email Command Line Interface

The Command Line Interface (CLI) is designed to simplify usage of Imunify Email and as an enabler for integration with other tools and platforms.

Main command for all operations with Imunify Email: 

```
ie-cli 
```

#### Basic usage

Imunify Email quarantine CLI application

**Usage**:

```
ie-cli [command]
```

**Available Commands**:

| | |
|-|-|
|`accounts`|For working with accounts|
|`completion`|Generate the auto-completion script for the specified shell|
|`emails`|For working with emails|
|`help`|Help about any command|
|`settings`|Settings command|
|`whitelist-authusers`|Manage whitelist authusers|
|`whitelist-recipients`|Manage whitelist recipients|
|`whitelist-senders`|Manage whitelist senders|

**Flags**:

| | |
|-|-|
|`-h`, `--help`|Help for ie-cli|
|`-t`, `--toggle`|Help message for toggle|


### Operations with emails in the quarantine

Emails marked as spam by Imunify Email are stored in the quarantine. The following section describes CLI for operating with emails. 

:::tip Note
The quarantine is keeping email for various users separately, but root users can see all the emails and perform any operations on them.
:::

:::tip Note
Almost all CLI commands support output in plain text and JSON format. For switching output to JSON use `--json`
:::

#### List emails in quarantine

In order to see all emails stored use the following command. By default 'root' account is used, so the command shows the whole content of the quarantine.

**Command**

```
ie-cli emails list -a <ACCOUNT_NAME> [--json]
```

**Example**

```
ie-cli emails list -a root
```

**Output**

```
-----------------------------------------------------------------------------------------------------------
Email_ID ef69f707-d547-4b29-b8f0-f5331821c930 
Size_Bytes	      8190 
Account_Name	  mws 
Recipients	      me@somehost.com
Subject        	  Ge t G:eneric V1agra f:or as 1ow as $2.50 per 50 mg

----------------------------------------------------------------------------------------------------------
Email_ID faf96a73-5be4-481a-9c6c-7ab8fb2e3cf0 
Size_Bytes	      8534 
Account_Name	  mws 
Recipients	      frank@yahooo.com
Subject           FWD: Want Pills V|AgR@ % Xan_a_x ^ Valiu|m| # At|v@`n \ Pn+ermin ' So+m+a  lNmAL

-----------------------------------------------------------------------------------------------------------
Email_ID fbc2efd0-1808-4e54-99ce-3082708b28ee 
Size_Bytes	      8971 
Account_Name	  oregdent 
Recipients	      steve@hillcabinet.com
Subject        	  FWD:Xanax.x Valium.m Xanax.x Vicodin.n h ogzmwggi

-----------------------------------------------------------------------------------------------------------
Max Count	     3
```

**Example with JSON as output format**

```
ie-cli emails list -a root –-json
```

**Output**

```json
{
   "items": [ 
 		{
 			"email_id": "ef69f707-d547-4b29-b8f0-f5331821c930",
 			"size_bytes": 8190,
 			"account_name": "mws",
 			"recipients": [
 				"me@somehost.com"
 			],
 			"subject": "Ge t G:eneric V1agra f:or as 1ow as $2.50 per 50 mg",
 			"script_header": {
 				"raw": "",
 				"domain": "",
 				"path": ""
 			}
 		},
 		{
 			"email_id": "faf96a73-5be4-481a-9c6c-7ab8fb2e3cf0",
 			"size_bytes": 8534,
 			"account_name": "mws",
 			"recipients": [
 				"frank@yahooo.com"
 			],
 			"subject": "FWD: Want Pills V|AgR@ % Xan_a_x ^ Valiu|m|  lNmAL",
 			"script_header": {
 				"raw": "",
 				"domain": "",
 				"path": ""
 			}
 		},
 		{
 			"email_id": "fbc2efd0-1808-4e54-99ce-3082708b28ee",
 			"size_bytes": 8971,
 			"account_name": "oregdent",
 			"recipients": [
 				"steve@hillcabinet.com"
 			],
 			"subject": "FWD:Xanax.x Valium.m Xanax.x Vicodin.n h ogzmwggi",
 			"script_header": {
 				"raw": "",
 				"domain": "",
 				"path": ""
 			}
 		}
 	],
 	"max_count": 3
```

### Show Email message

Root user, if needed, can see any message held in a quarantine. In order to do this email ID is needed. It can be taken from the list command above.

:::tip Note
Don’t forget to specify a user account. For root user use `-a root`.
:::

**Command**

```
ie-cli emails show <EMAIL_ID> [-a <ACCOUNT_NAME>] [--json]
```

**Example**

```
ie-cli emails show f3367f1b-4216-4f4f-9617-f8be9f5a6e76 -a root
```

**Output**

```
EmailID:                      f3367f1b-4216-4f4f-9617-f8be9f5a6e76
SizeBytes:                    8534
AccountName:                  mws
Sender:                       mws@mywebsite.com
Recipients:                   me@somehost.com
ReceivedDate:                 1643805800
Subject:                      FWD: Want Pills V|AgR@ % Xan_a_x ^ Valiu|m| # At|v@`n \ Pn+ermin ' So+m+a  lNmAL

Content-Transfer-Encoding:    quoted-printable
Content-Type:                 text/html; charset="iso-8859-7"
Date:                         Fri, 13 Feb 2019 04:48:28 +0300
From:                         "wilhelmina rivard" <rivard1792@hinet.net>
MIME-Version:                 1.0
Received:                     from [70.100.200.300] (port=56330 helo=Myaccout) by 70.100.200.300.cprapid.com with esmtpsa  (TLS1.2) tls TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (Exim 4.94.2) (envelope-from <mws@mydomain.com>) id 1nFEym-0005TO-Qs for me@somehost.com; Wed, 02 Feb 2022 12:43:20 +0000
To:                           <abazis@iit.demokritos.gr>

X-ImunifyEmail-Filter-Action: reject
X-ImunifyEmail-Filter-Score:  6.1
X-Mimeole:                    Produced By Microsoft MimeOLE V6.00.2900.2527
X-Msmail-Priority:            Normal
X-Priority:                   3
X-Failed-Recipients:          []

Body: PCFET0NUWVBFIGh0bWwgcHVibGljICItLy9XM0MvL0RURCBIVE1MIDQuMDEgVHJhbnNpdGlvbmFsLy9FTiIgPQoiaHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDQvbG9vc2UuZHRkIj4KPEhUTUw+CjxIRUFEPgo8VElUTEU+QWxsIFlvdXIgTWVkcyBIZXJlPC9USVRMRT4KPE1FVEEgaHR0cC1lcXVpdj0zRCJDb250ZW50LXR5cGUiIGNvbnRlbnQ9M0QidGV4dC9odG1sOyA9CmNoYXJzZXQ9M0RJU08tODg1OS0xIj4KPFNUWUxFIHR5cGU9M0QidGV4dC9jc3MiPgo8IS0tIC5zdHlsZTUge2ZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmOyBmb250LXNpemU6ID0KMTRweDsgfT0yMAo8IS0tIC5zdHlsZTgge2ZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmOyBmb250LXNpemU6IDhweDsgPQp9PTIwCi0tPjwvU1RZTEU
```

### Release or Delete a message from the quarantine

Messages can be released from the quarantine and sent to recipients if they are false positives. They can also be deleted if needed to free up space. 

:::tip Note
The quarantine will automatically delete the oldest messages when the user's quarantine limit is reached. The limit can be adjusted in settings.
:::

#### Release

**Command**

```
ie-cli emails edit -i '{"ids": ["<EMAIL_ID, EMAIL_ID>"], "operation": "release"}' [-a 'account_name']
```

**Example**

```
ie-cli emails edit -a root -i '{ "ids": ["fb7c3537-8e5e-43d8-bc66-bd954c22d587"], "operation":"delete" }'
```

**Output**

```
OK
```

#### Delete

**Command**

```
ie-cli emails edit -i '{"ids": ["<EMAIL_ID, EMAIL_ID>"], "operation": "delete"}' -a 'account_name' 
```

**Output**

```
OK
```

### Accounts settings

ImunifyEmail stores emails marked as spam in a quarantine space. The space is divided into virtual subspaces for every system account. Subspace is created when the first spam message is quarantined. It is filled with spam messages for a particular account until the size limitation is reached. When the size limitation is reached most old messages will be automatically deleted. 

:::tip Note
Default limit for a quarantine subspace is 100 MB.
:::

:::tip Note
In some cases ImunifyEmail can’t attribute an email to a system account. In such cases the email will be stored under root user quarantine space.
:::

There are command line commands for managing quarantine space. 

#### List all accounts in the quarantine

**Command**

```
ie-cli accounts list [--json]
```

**Output**

```
Name      	     LimitBytes	     UsedBytes	     State	
mysite           125829120  	 810692     	 active 	
dentistcenter    104857600  	 0          	 active 	

Max Count 2	 
```

**Output (JSON)**

```json
{
   "items":[
      {
         "name":"mysite",
         "limit_bytes":125829120,
         "used_bytes":810692,
         "state":"active"
      },
      {
         "name":"dentistcenter",
         "limit_bytes":104857600,
         "used_bytes":0,
         "state":"active"
      }
   ],
   "max_count":2
}
```

#### Edit account size limit

Sometimes it is necessary to give more (or less) space for some user accounts. It is possible to do using the following command.

**Command**

```
ie-cli settings edit -a '<ACCOUNT_NAME>' -i '{"state": "active", "limit_bytes": 1234}'
```

**Example**

```
ie-cli settings edit -a 'mydomain' -i '{"state": "active", "limit_bytes": 8096}'
```

**Output (JSON)**

```
Name       LimitBytes	 UsedBytes	 State	
mws        8096          810692      active 	
```

**Output** 

```json
{
   "name":"mws",
   "limit_bytes":8096,
   "used_bytes":160461,
   "state":"active"
}
```

#### Clean all quarantine for an account

If needed all quarantine for an account can be cleaned with one command. 

**Command**

```
ie-cli settings rm <ACCOUNT_NAME>
```

**Example**

```
ie-cli settings rm root
```

**Output**

```
OK
```

### Whitelisting

Imunify Email supports whitelisting configuration. It is possible to whitelist domains and/or email addresses of a sender. 

:::warning Warning
When sender is whitelisted Imunify Email bypasses it’s emails without filtering. It may affect hosting reputation if a whitelisted sender will send spam.
:::

#### See all whitelist senders

**Command**

```
ie-cli wl-recipients list [--json]
```

**Output**

```
[root@77-79-198-14 ie-cli]# ie-cli wl-authusers list
EMAILS
1@example5.com
pp@ppp.com
qq@qq.com
me@mydomain.com

DOMAINS
No available data
```

**Output (JSON)**

```json
{
 	"success": true,
 	"emails": [
 		"1@example5.com",
 		"pp@ppp.com",
 		"qq@qq.com",
 		"me@mydomain.com"
 	],
 	"domains": []
 }
```

#### Whitelist a sender

To whitelist a domain or an email address use the following command.

**Command**

```
ie-cli wl-senders add -i  (--input) '[  { "type": "domain", "value": "domain.com" } ]'
```

**Example: whitelisting sender email address**

```
ie-cli wl-senders add -i '[  { "type": "email", "value": "me@domain1.com" } ]'
```

**Example: whitelisting sender email address**

```
ie-cli wl-senders add -i '[  { "type": "domain", "value": "crm.myshop.com" } ]'
```

**Output** 

```
OK
```

#### Remove whitelist for a sender

If needed, the sender can be removed from the whitelist. See the following commands.

**Command**

```
ie-cli wl-senders delete -i (--input) '[ { "type": "domain", "value": "domain.com" } ]'
```

**Example: whitelisting sender email address**

```
ie-cli wl-senders delete -i '[ { "type": "email", "value": "me@domain1.com" } ]'
```

**Example: whitelisting sender email address**

```
ie-cli wl-senders delete -i '[ { "type": "domain", "value": "crm.myshop.com" } ]'
```

**Output** 

```
OK
```

### Activity Monitor and Sender limits

#### Activity monitor

Go to Imunify360 → Email → Activity Monitor. Activity Monitor provides a way to observe, control and regulate the flow of mail. From this tab the messages can be whitelisted or chosen to be explored in the Quarantine tab.

The table lists the following columns:

* **Sender Object** - a set of origination information that can be identified about an email is shown here. The four possible categories are:
	* WHM account
	* Domain
	* PHP Script (able to send an email)
	* Email address of a user
* **Ham/Sent out** - quantity of a non-spam emails that were sent out is shown corresponding to a Sender Object in a first column.
* **Limit** - the number of emails that corresponding Sender Object will be allowed to send out in a space of one hour. This number turns red and a warning sign is displayed as soon as the limit is exceeded.
* **Whitelisted** - the records in this column only have two states "true" and "false" and show if the whitelisting is **on** or **off** for a particular Sender Object.
* **Quarantined** - reflects emails from a particular Sender Object and their quantity.
* **Actions** - several actions to perform on a particular Sender Object are available:
	* **Go to quarantine** allows to explore a particular Sender Object in a Quarantine tab.
	* **Update sender limit** allows to enable/disable granular limits for a particular Sender Object that override limits set in the Settings tab.
	* **Whitelist sender** allows to remove any limit on sending out emails for a particular Sender Object.

![](/images/EmailActivityMonitor.png)

The **Timeframe** setting for the records visible in the table can be chosen from the following options under the **Timeframe** button.

![](/images/EmileTimeframeBtn.png)

Records in the table are searchable and the parameters of the search can be narrowed down by using the Account name, Sender address, Domain, and Script filters.

![](/images/EmailAdvSearch.png)

#### Setting sender limits

Setting up limits for sending out the messages for all of the Sender Objects adopts a 3-tier approach that is aimed to provide granular control over the outgoing messages to the administrator.

#### 1. Settings tab

This is the first level of control for sender limits. The values set at this level will be default for an entire server and will be applied by default to all Sender Objects.
Go to Imunify360 → Email →Settings tab. Here, set a limit on the number of emails that can be sent by a particular entity - WHM account, domain, PHP Script, or email address of a user.

* The limit is set for the number of messages within the space of the last 60 minutes.
* The limits can be applied either to a number of emails or a number of recipients.

![](/images/EmailSettingsTab.png)

Once the values are chosen, press **Save Changes** to apply them.

#### 2. Sender limits at the Activity monitor tab

This is the second level of control for sender limits. Limits set for a particular Sender Object here override the limits set on the previous stage.

Go to Imunify360 → Email → Activity Monitor → Actions → Update sender limit. For a particular Sender Object the limit can be switched on and off. The limit value can be set higher or lower than the value in the Setting tab. This setting is aimed at providing a way to set needed exceptions from the general rules.

![](/images/EmailUpdSenderLimit.png)

#### 3. Whitelisting

This is the third level of control for sender limits. Limits set via this control override the limits set at the two the previous stages.
Go to Imunify360 → Email → Activity Monitor → Actions → Whitelist sender. A particular Sender Object can be whitelisted, which means that the Sender limits will no longer be applied to this Sender Object - so it will be able to send out an unlimited number of messages. Only the **domain** and **email of the user** Sender Objects can be whitelisted, **WHM account** and **PHP script** cannot be whitelisted.

![](/images/EmailWhitelist.png)

To confirm whitelisting for a particular Sender Object click **Yes, add to whitelist**.

![](/images/EmailYesAdd.png)