# Portal

[[TOC]]

## What permissions do the different user roles have?

Permissions in the Portal are managed by three roles. These roles are:

* Owner
* Manager
* Staff

Owners have full permissions. Managers have the limitation that they cannot view billing related pages and that they cannot manage sub-organizations. Staff users can only view detections and perform actions on them (i.e. patch, undo, etc.).

|     | **Staff** | **Manager** | **Owner** |
| --- | --- | --- | --- |
| **Billing** |     |     |     |
| View invoice | ✗   | ✗   | ✓   |
| Change credit card | ✗   | ✗   | ✓   |
| **Sub-organizations** |     |     |     |
| Add | ✗   | ✗   | ✓   |
| Change | ✗   | ✗   | ✓   |
| Delete | ✗   | ✗   | ✓   |
| **User accounts (for organization Portal access)** |     |     |     |
| Add | ✗   | ✓   | ✓   |
| Change | ✗   | ✓   | ✓   |
| Delete | ✗   | ✓   | ✓   |
| **Approved e-mail domains** |     |     |     |
| Add | ✗   | ✓   | ✓   |
| Delete | ✗   | ✓   | ✓   |
| **Servers** |     |     |     |
| Add | ✗   | ✓   | ✓   |
| Change | ✗   | ✓   | ✓   |
| Delete | ✗   | ✓   | ✓   |
| **Server groups** |     |     |     |
| Add | ✗   | ✓   | ✓   |
| Change | ✗   | ✓   | ✓   |
| Delete | ✗   | ✓   | ✓   |
| **Policies** |     |     |     |
| Add | ✗   | ✓   | ✓   |
| Change | ✗   | ✓   | ✓   |
| Delete | ✗   | ✓   | ✓   |
| Change e-mail templates | ✗   | ✓   | ✓   |
| Change default e-mail template | ✗   | ✓   | ✓   |
| **Event log** |     |     |     |
| View | ✗   | ✓   | ✓   |
| **End users** |     |     |     |
| Change | ✓   | ✓   | ✓   |
| **Detections** |     |     |     |
| View | ✓   | ✓   | ✓   |

* * * 

## What are the minimum browser requirements for the Patchman Portal?

In order to make optimal use of the Patchman Portal, the following minimum browser versions are required. Note that if you are using an unlisted browser or an older browser version, we cannot guarantee full Portal functionality.

|     |     |     |
| --- | --- | --- |
| **Browser** | **Version** | **Date** |
| Chrome | 58  | Apr 2017 |
| Firefox | 54  | Jun 2017 |
| Edge | 15  | Aug 2016 |
| Safari | 10  | Sep 2016 |
| Opera | 55  | Aug 2017 |

* * *

## Reporting malware to Patchman

You can report malicious files that the solution does not currently detect to Patchman in a variety of ways. By doing this, you're helping us protect your platform, but also those of other Patchman users through the concept of herd immunity; if only a single Patchman customer finds and reports a malicious file, it may end up (if valid) being quarantined / cleaned across all servers protected by Patchman. 

:::tip 
Regardless of the submission method, malware will be thoroughly checked and tested before being added to our detection database (either as a file hash for exact matching, or as a dynamic signature in CLEAN). 
:::

Once it is, Patchman will be able to detect & quarantine/clean said across your entire platform.

### How to report a malicious file

#### Via the command-line using patchman-report

You can report malware to us directly on the command line on any server that has the Patchman agent installed. In order do do this, simply call the command 'patchman-report' followed by the path to the malicious file:

```
patchman-report /path/to/file.php
```

#### Via the API

You can also report malware via the Patchman portal API, using the following endpoint. Note that this can also be used to submit malware via the browser: [https://portal.patchman.co/api/v1/report/](https://portal.patchman.co/api/v1/report/)

* * * 

## Detection states and actions

In the Patchman Portal, every detection has their own state. The following states are defined:

| State | Description |
| --- | --- |
| UNRESOLVED | The detection is new or no action has been taken yet. |
| RESOLVED | The detection has been resolved. |
| BLOCKED | No automatically scheduled actions will be executed for this detection. (Manual actions will still be executed.) |
| REVERTED | The detection was resolved, but the fix has been reverted putting the file back in its original state. |
| RETRACTED | The detection has been resolved, because the file was changed (outside of Patchman) or has been removed. Most likely the end user has updated his CMS to a newer version. |
| **Exclusive to** [Patchman CLEAN](/patchman/frequently_asked_questions/#what-is-patchman-clean-and-how-do-i-enable-configure-it) |     |
| PENDING CHANGE | Detection of malicious code occurred and clean scheduled, but pending review by Patchman. |
| REQUIRES ATTENTION | Detection of malicious code occurred and clean scheduled, but unable to clean automatically. Review by website owner required. |

The following actions are available for detections:

| Action    | Description    |
| --- | --- |
| Patch | Resolve the vulnerability by patching the file. |
| Quarantine | Resolve the malware detection by moving it to quarantine. |
| Delete | Resolve the malware detection by removing the file.<br><br>_NB! This action is permanent and cannot be reverted._ |
| Undo patch | Revert the vulnerability fix by restoring the original file. |
| Undo quarantine | Revert the malware by fix restoring the original file. |
| Block | Block all automatically scheduled tasks of the detection. |
| Unblock | Resume all automatically schedule tasks of the detection. |
| **Exclusive to** [Patchman CLEAN](/patchman/frequently_asked_questions/#what-is-patchman-clean-and-how-do-i-enable-configure-it) |     |
| Clean | Remove detected malicious code from the file, leaving the file in place. |
| Undo clean | Revert the removal of detected malicious code from the file. |

* * *

## Organization identifier

Every organization in the Portal has its own organization identifier. This identifier consists of a unique combination of letters (a-z), numbers (0-9), underscores (_) and hyphens (-). The maximum length of the identifier is 50 characters.

The organization identifier is automatically generated based on the name of your organization. You can check the generated identifier in your [organization profile](https://portal.patchman.co/user/organization/) in the Portal. If you are not satisfied with the identifier that was generated for your organization, you can always update it in this view.

![](/images/company_profile_identifier_2.png)

You are required to enter this identifier alongside your password and email address during the login process for the Patchman Portal. The identifier is also a part of your login URL. This enables you to bookmark the page, in order to avoid having to enter your organization identifier each time you want to log in.

If you did not receive an email containing your organization's identifier, or in case you lose the email and do not remember the identifier, please reach out to our [support department](/patchman/getting-started/#contact-us) for assistance.

* * *

## Status page subscriptions

Any incidents regarding the services of Patchman will be communicated through our [status page](http://status.patchman.co/). If you subscribe to our status page you will receive email notifications with updates about the status of our services, including information about planned maintenance.

The subscriptions to our status page can now be managed from the Portal. Each Portal user can subscribe to the notifications, and users with the "owner" role can manually add email addresses in the organization management page. Organization owners can also manage subscriptions by unsubscribing users.

**Subscribing as a user**

You can subscribe to our status page updates by going to your profile (under "My account") and check or uncheck the "Get notifications from the status page" option. The notifications will be sent to the email address set in your profile. Please note that you will receive an email which contains instructions on how to confirm your subscription.

![](/images/status_page_notification_checkbox.png)

**Manual subscriptions**

Organization owners can manually add email addresses to receive updates of our status page. This enables users without a Portal account to receive our status page notifications. All subscriptions for an organization can be managed in the status page view, under the Company section of the Portal.

Please note that our subscription system checks for duplicate email addresses. If a user subscribed to the notifications, but his/her email address gets added manually as well, the updates will only be sent to that address once.

* * *

## Control panel user level equivalents

Patchman gathers some metadata from each end user of your servers to determine its permission level. This concerns the user level (e.g. reseller or admin) and the parent user (e.g. a reseller or admin user).

If a user acts on multiple user levels, e.g. reseller and user, or admin and reseller, Patchman considers the highest level the user level.

Patchman itself considers the following user levels:

| **Patchman level** | **DirectAdmin equivalent** | **CPanel equivalent** | **Plesk equivalent** |
| --- | --- | --- | --- |
| admin | admin | admin | admin |
| reseller | reseller | reseller | reseller |
| user | user | user | customer |