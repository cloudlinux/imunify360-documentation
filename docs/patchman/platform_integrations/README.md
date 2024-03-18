# Platform Integrations

[[TOC]]

## Using Patchman with a non-standard control panel

Patchman provides out-of-the-box integrations for the cPanel, DirectAdmin and Plesk control panels. If you are not using one of these panels, Patchman will show the following message in the logs:

```
ERROR: Could not determine platform software, unable to activate integrations
```

You will still be able to use Patchman, but rather than use one of our standard integration methods you will have to provide some data to Patchman yourself, using our API.

**Why does Patchman need to integrate with my control panel?**

The integration is required to associate appropriate metadata with the files and directories Patchman scans. Using this metadata, the Patchman Portal is able to provide a per-user detailed overview of detections, giving you insight into the detections for each customer. On top of that, you are able to configure specific details easily based on e.g. the user level or the reseller that owns a certain customer. If you use the notification system offered by Patchman, the software also needs to know which e-mail addresses to use when sending e-mails regarding certain files.

In the control panel itself, Patchman can offer a single sign-on button for customers to provide them access to the Patchman detection overview for their webhosting account. You configure the access to this button in the Portal, but the buttons themselves are made available in the panel using this integration.

For the most common control panels, we maintain these integrations ourselves and ship them with Patchman by default. If you are running a different panel, you will need to provide the required data and integration interfaces yourself.

**How do I enable custom integration methods for my account?**

Use of the custom integration method needs to be enabled by the Patchman staff. Please contact [support@patchman.co](mailto:support@patchman.co) with information about your control panel and platform, so we can help you with setting up and configuring the integration method on your servers.

**Developing the integration**

The manual for developing all components required for the integration is attached below. It contains all steps required for creating the different components, and contains illustrative examples to help you get started.

[PDF: "Patchman Custom Integration"](/Patchman_custom_integration.pdf)

In the sections below, you can find a quick overview of the general steps involved in integrating Patchman with your control panel. For any technical details, please refer to the attached manual. If you still have questions after reading the documentation, please contact [support@patchman.co](mailto:support@patchman.co) for more information.

**Providing data to Patchman**

The following information needs to be provided to Patchman for each user in your control panel:

* Username
* User language
* E-mail addresses

:::tip 
E-mail addresses are only required when using notifications 
:::

* Home directory

:::tip 
Home directory is only required when using per-user audit logging 
:::

* User level
* Parent user
* Domains
* Directories per domain

The data needs to be provided in JSON format. You have the option of writing scripts that provide the JSON data directly on demand, or generating JSON files in a predetermined location for Patchman to read. 

Note that these scripts or files are always stored on the webserver for which they provide metadata, and are always called locally by the patchmand process. 

**Handling data provided by Patchman**

For the single sign-on buttons, Patchman generates data on the webserver in question that you can use when creating the buttons in your control panel. This concerns a file specifying which users are granted access to the Portal based on your policy settings, and on which level they have access.

* * * 

## Why does my directory synchronization fail on Plesk?

The directory tracking database is synchronized with Plesk using the Plesk XML-RPC API. Under certain circumstances, this API may produce errors that Patchman can't resolve or work around, and require manual action to solve within Plesk. If you think that directory synchronization isn’t working correctly, check the relevant logging in `/var/log/patchman/patchman.log` for more information.

This article lists some known error messages and resolutions. If you are encountering an error that is not listed here, please [contact us](/patchman/getting_started/#contact-us) and include the messages themselves.

### API key is not found

```
ERROR: Plesk returned error code 11003 in checkup phase
ERROR: Plesk response: '<?xml version="1.0"?>
    <packet version="1.6.6.0">
            <system>
                    <status>error</status>
                    <errcode>11003</errcode>
                    <errtext>PleskAPIInvalidSecretKeyException : key is not found</errtext>
            </system>       </packet>'

```

This error surfaced as a result of an unexpected and undocumented change in behavior in Plesk 18.0.33. If you see this error, please check if you recently performed an upgrade to this Plesk version.

Update your version of Patchman to at least 1.13.0 to resolve this problem.

### API access is blocked

```
ERROR: Plesk returned error code 1006 in checkup phase
ERROR: Plesk response: '<?xml version="1.0"?>
	<packet version="1.6.6.0">
		<system>
			<status>error</status>
			<errcode>1006</errcode>
			<errtext>Access to API is disabled for 127.0.0.1</errtext>
		</system>	</packet>'
```

In this case, Plesk has been configured to not allow access to the Plesk API from localhost (127.0.0.1). This address is considered the default API availability and thus is what Patchman will try. There are two possible resolutions for this problem:

1. Change the Plesk API ACL to allow requests from 127.0.0.1. In the Plesk interface, this can be found under Tools & Settings > IP Access Restriction Management > IP allow/deny list.
2. Change the address Patchman uses to access the API. This approach is only useful if the API is made available on an external interface instead of an internal one - it won’t work if you made the API completely unavailable. To achieve this, add the following to `/etc/patchman/patchman.ini` (create the file if it doesn’t exist yet):  
    ```
    [plesk]
    api_address=<IP>
    ```
    Afterwards, reload the settings in Patchman using `service patchman reload`.

### Timeout

```
ERROR: Could not query Plesk, Timeout was reached
```

The Plesk API is not responding fast enough. It is strongly recommended to check if Plesk is working correctly; the default timeout for Patchman is 15 minutes, so if the API is indeed slower than that, it is probably having performance problems. Also note that the longer such interaction takes, the more it will delay other routine tasks like scans and definition updates.

If you really want to increase the timeout, add the following to `/etc/patchman/patchman.ini` (create the file if it does not exist yet):

```
[plesk]
api_timeout=<timeout in seconds> 
```

Afterwards, reload the settings in Patchman using `service patchman reload`.

### Domain.php errors

```
ERROR: Call to a member function isDefault() on null (Domain.php:748)
```

This problem is caused by database inconsistency in the Plesk database, particularly in PHP setting configuration. You can fix this problem by manually running the following command (as root), executing a fixing query on the Plesk backend database:

```
plesk db "insert into PhpSettings (id, noteId) (select value, 0 from SubscriptionProperties where name = 'phpSettingsId' and value not in (select id from PhpSettings));"
```

In older versions of patchman-client, this error was incorrectly ignored and various directories and users may not have been synchronized to the Patchman directory tracking database. Starting with version 1.5.0, this error produces failure warnings in the Patchman logfile (/var/log/patchman/patchman.log) for the directory synchronization task.

### API version is too old

```
ERROR: Plesk returned error code 1005 in checkup phase
ERROR: Plesk response: '<?xml version="1.0"?>
	<packet version="1.6.6.0">
		<system>
			<status>error</status>
			<errcode>1005</errcode>
			<errtext>Protocol version '1.6.6.0' is not supported. Current protocol version is '1.6.3.5'</errtext>
		</system>	</packet>'
```

Your version of Plesk is too old for Patchman integration. Please refer to [What are the minimal requirements for running Patchman?](/patchman/frequently_asked_questions/#what-are-the-minimal-requirements-for-running-patchman)

* * * 

## How do I activate my Plesk-bought Patchman license?

### Linking your first license

When purchasing a license for Patchman through the Plesk extensions catalog, it needs to be linked to an account in the Patchman Portal to start using it. However, in order to link a Patchman Portal account, there are some requirements.

A Portal account will only be eligible for linking when:

* It is still on the Patchman Insights trial
* It does not have any registered servers yet, except (optionally) the server for which you are linking a license

:::tip 
If you are unsure of whether you have registered servers, You can check this by viewing the server overview: [https://portal.patchman.co/servers/](https://portal.patchman.co/servers/) 
:::

In many cases, if you don’t already have an active Portal account that is eligible for linking, a straightforward solution is to simply create a new one. This can be done through the Portal signup page, [here](https://portal.patchman.co/user/signup/).

Once you have an account that can be linked, you can open the extension in Plesk and it will ask you for the [organization identifier](/patchman/portal/#organization-identifier) of your account. Enter the identifier in the extension, and the linking will automatically be completed.

### Linking more licenses

Once you have an account that has one Plesk-bought license linked to it, you can safely link more. This way, you can manage all servers with licenses bought through Plesk easily in one single Portal account. There is no need to create a separate account for each individual license/server.

### Potential problems

If you get an error during linking, please check the following:

* Is the [organization identifier](/patchman/portal/#organization-identifier) used during the activation process typed correctly? Make sure you are using the identifier, and not your email address, name or business name.
* Is the server for which you’re trying to activate a Plesk-bought license already registered to a different Patchman Portal account? In this case, you need to remove the server from the existing account first.
* Is your Portal account currently on a paid plan, such as CORE, COVERAGE or COVERAGE+CLEAN? Unfortunately, you can’t mix licenses from Plesk with licenses bought through the Portal. You need to create a new, separate account to link the Plesk-bought license to.
* Does your Portal account currently have multiple registered servers, which you all want to link to Plesk-bought licenses? Unfortunately, it is not possible to link multiple licenses at the same time. Please remove all servers from the Portal first, and then complete the linking process for one server at a time.

:::warning 
If you have to remove a server from the Portal for any of the above reasons, please note that historical detection data will be permantently destroyed. It is not possible to retain history for servers when transitioning between accounts, or from a Portal-bought license to a Plesk-bought license. 
:::

### Additional help

Naturally, if you run into trouble during this process, you can always [contact us](/patchman/getting_started/#contact-us) for help. When doing so, we recommend expediting the support process by supplying:

* the **IP address of the server** you are attempting to activate the license for, as well as
* the **organization identifier** of the Portal account you are attempting to add it to.

This will enable us to offer swift assistance.

* * * 