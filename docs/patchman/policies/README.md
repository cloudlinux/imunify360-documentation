# Policies

[[TOC]]

## Policy notification settings

The policy settings in the Patchman backend dictate when a user is notified of actions taken regarding detections of malware and vulnerabilities. Emails are sent every 30 minutes and always group the actions taken in the last 30 minutes. In the case that multiple detections for the same user are not registered in the same half hour window, the user may receive multiple notifications in a short period of time. Actions are only grouped by their action type (i.e. applicable template); users may receive multiple notifications at the same time if different actions were taken.

You can specify the email templates when adding or modifying a policy. Each action can have their own notification email template in all supported Patchman languages.

* Some actions are instructions to the server, for instance the instruction to patch a vulnerability or quarantine malware. You can schedule these actions to automatically take place several hours after a detection. If you set a notification for these kinds of actions, the notification is sent after the action was reported as completed by the server. Note, however, that no notification is sent of any action manually issued through the Patchman web interface.
* The second kind of actions are those that are not instructions to the server and are typically status updates from the server, e.g. when a new detection was made. You can't schedule these, but you can specify in the policy that you want to send a notification when these actions occur.
* Finally, you can send reminders for detections. These can be scheduled and complete automatically after the set amount of hours.

**General notification limitations**

Notifications are not sent in several cases. These relate to the presence of the email template and the source of the action. Listed below are the exclusion criteria for email notifications:

1. Users are never notified of actions taken in the Patchman web interface, independent of who performed this action. Please note that detections resulting from manual scan tasks are _not_ considered manual actions and may result in notifications.
2. A user is not notified if there is no valid email address known at the time of notification.
3. A user is not notified if there was no appropriate email template present for the policy at the time of detection, even if one is present at the time of sending the notification.
4. A user is not notified if the email template that was assigned at the time of detection, was deleted afterwards. Creating a replacement template does not reassign it to previous detections.
5. A user is not notified if the email template is not active at the time of sending the notification. It does not matter what the state was at the time of detection.

All detections use the policy that applied at the time of detection. Therefore, changing the policy of a user, does not change the applicable email template. However, changing the previously applicable policy _does_ update the email template for past detections.

**Advanced policy tasks**

When enabling "Show advanced tasks", you get the option of setting a task for handling retracted definitions for both Vulnerabilities and Malware.

The "definition retracted" state is triggered when our definitions have changed. This means that we have decided that a detection should no longer be considered as vulnerability or malware.

This option has been placed under the advanced tasks section, because under normal circumstances this state should not be triggered. Our team takes much care reviewing every vulnerability and malware before releasing the definitions, to prevent cases where unnecessary detections are made.

**Notified user level settings**

A policy allows you to set the 'notified user level'. This is used to determine which user receives the notification. While you may choose to always send the notification to the affected user, you may also want to send the reseller of this user, or even the administrator in the panel of choice.

The following table lists four different types of users: the administrator user, the reseller user, users created by resellers (not the admin) and (non-reseller) users created by the administrator (i.e. where the adminstrator acted as reseller).

| **Notified user level** | **Detection in admin** | **Detection in reseller** | **Detection in user of reseller** | **Detection in user of admin** |
| --- | --- | --- | --- | --- |
| **admin** | admin | admin | admin | admin |
| **reseller** | admin | reseller | reseller | admin |
| **user** | admin | reseller | user | user |
| **descendant of admin** | admin | reseller | reseller | user |

While determining the notified user, the user tree is traversed bottom-up, i.e. if the user is lower than the required level, the parent of this user is inspected. This repeats until at least the requested level is found. If no appropriate parent is found, the highest parent is used instead.

For instance, if you have selected 'admin' as the notified user level, but you only have reseller users, resellers will receive notifications instead.

If you wish to use other combinations, you should choose different default policies for users and resellers in the server group settings.

The applicable notified user level is taken from the policy that applied at the time of detection. Changing policies does not change the applicable notified user level, while changing the settings in the original policy does update the setting for existing detections.

## Policy applicability

You can use policies to determine how your end users are getting notified of new detections and which actions you wish to automatically execute for your end users.

Each server group has default reseller and default user policy settings. The default reseller policy applies to all reseller users and to all users of resellers. The default user policy applies to all users that have no intermediate reseller user. This distinction allows for the common case where the users of a reseller should be handled more conservatively. The admin user itself will use the default user policy (and not the default reseller policy as one might expect).

It is possible to override the policy on a per-user basis. This policy then applies to the user itself, but also for all children of this end user, e.g. if a reseller has policy A set, policy A will also apply to the reseller's users.

| **User level** | **Applicable policy (tried in order)** |
| --- | --- |
| admin | 1. Admin policy<br>2. Default user policy |
| reseller | 1. Reseller policy<br>2. Default reseller policy |
| user of reseller | 1. User policy<br>2. Reseller policy<br>3. Default reseller policy |
| user of admin | 1. User policy<br>2. Admin policy<br>3. Default user policy |

## Email template editing

For each message that is sent out by Patchman on behalf of your organization, you can fully customize the layout and contents. The layout and contents are specified on a per-policy basis, giving you the flexibility to provide different experiences for different users.

Each template consists of two parts:

* **A HTML template.** This is the message most users will see when they open their email client and gives you the ability to include images and rich text layouts. However, note that most email clients are very limited in their HTML capabilites. By default, we will inline all CSS for you when rendering the email, but you should still verify the emails render like you expect them to in the most popular email clients.
* **A text template.** This is the simplified version of your HTML template and can only contain simple text. This is used by all clients that don't support HTML. When editing your HTML template (base templates excluded), we will automatically try to get a text template out of it.

When editing your template, you can choose between a simple rich text editor and an HTML editor. While the rich text editor can be useful, it could get complex when using lots of Mustache tags (see below). If this is the case, we recommend switching to the HTML editor when you want more advanced capabilities.

Please note that due to safety concerns, JavaScript and linking to external stylesheets is not allowed within a template. It is not possible to save your template as long as there is disallowed code in the HTML.

We show a live preview for the template using an example Mustache context, but note that this rendering is only indicative and the actual email may look different (due to email client limitations, but also due to CSS inlining). To more accurately verify the rendering of your email templates, you could use the 'Send test email' option. This will send a message to your own email address, allowing you to view how your email is actually rendered.

**Base templates**

Since you may want to use the same base template for all mails in the same policy, we offer you the ability to specify a base template for both HTML and text templates. This allows you to dumb-down the actual mail templates to the message itself and focus less on its presentation.

Base templates must contain a placeholder for the actual message contents and a placeholder for the Patchman branding. Please ensure that the branding is visible and not obscured by any other element.

Since base templates can get very complex, we do not offer a full editor for these kind of templates. If you do not know anything about HTML, you could stick to the default template we provided for you, or build one yourself, for instance using [Zurb's Ink](http://zurb.com/ink/).

**Special tags**

To include information in the email templates, we use Mustache, which is a very simple template engine. Below you'll find a short primer on Mustache's syntax. If you need more information, you can find the full documentation [online](http://mustache.github.io/mustache.5.html).

|  Tag Type   |  Description   |
| --- | --- |
| **Variables** | Using `{{var}}` will display the value of the variable. If it is not available, an empty string will be displayed instead:<br><br>```bash<br>Dear {{username}},<br>``` |
| **Verbatim** | If you need to include a variable unescaped (e.g. in text templates), use `{{&var}}` instead. |
| **Sections: list** | When the variable is a list, you can use sections to repeat the same block multiple times. Inside the section, you can access the attributes of the individual list items:<br><br>```bash<br>{{#detections}}<br>We found a detection of {{name}}.<br>{{/detections}}<br>``` |
| **Sections: conditional** | Similarly, sections work as conditional statements. When a variable is optional, the data within the section is only shown when the variable is available:<br><br>```bash<br>{{#definition_multiple}}<br>The detection consists of {{definition_count}} vulnerabilities<br>{{/definition_multiple}}<br>``` |
| **Sections: invert** | If you need to invert the statement, i.e. show a message in the case of an empty list or untrue variable, you can use the caret:<br><br>```bash<br>{{^definition_multiple}}<br>The detection consists of only one vulnerability.<br>{{/definition_multiple}}<br>``` |
| **Comments** | If you need to place a comment in your template, you can do so using `{{! comment }}` |
| **Partials** | You can include partials using `{{>partial}}`. A partial is a subtemplate and is used only by the policy generic templates to include the sub-templates.<br><br>You must always include the `{{>content}}` and `{{>branding}}` partial in your templates. |

**Template Context**

The following data is available in all templates:

|     |     |
| --- | --- |
| username | The username of the affected user |
| domains | A list of all domains of this user |
| domain | A single comma-separated string of affected domains |
| affected_domains | A list of all domains with detections of this user |
| affected_domain | A single comma-separated string of affected domains |
| server_hostname | The hostname of the detection's server |
| server_ip_address | The IP address of the detection's server |
| detections | A list of detections |
| .domains | A list of domains affected by this detection |
| .domain | A single comma-separated string of affected domains |
| .definitions | A list of definitions that are found in this file |
| .name | The name of this definition |
| .type | The type of this definition |
| .definition_count | The amount of definitions |
| .definition_multiple | A boolean indicating whether multiple definitions were found |
| .directory | A single comma-separated strin gof affected directories |
| .directories | A list of all directories affected |
| .applications | A list of all software applications |
| .application | A single comma-separated string of applications |
| .files | A list of affected file paths |
| .file | A single comma-separated string of file paths |

## Setting operational hours

By default, policy notifications can be sent 24/7 by Patchman. The exact time a notification is sent is determined by the time the detection was originally made, and by the relative delay settings in your policy. This means that detections can very well be patched at night, or in the weekend, and notifications could be sent at those times as well.

This behavior can be undesirable in some situations. You may not have support staff on hand to deal with questions following a detection in the weekend, for example. For this reason, we have a feature that allows you to set your operational hours. This feature defines the time ranges in which actions can be executed by Patchman. You are able to configure a time range per day of the week, including options for "all day" and "not at all".

![](/images/edit_operational_hours.png)

The operational hours are based on the time zone for the organization or suborganization that owns the policy. This timezone can be set in the Company Profile page.

To set up the operational hours for a policy, go to the Policies page, select the policy you want to edit and go to the "Operational hours" section. Here, you can enable this feature, and configure the custom schedule.

Please note that the operational hours come with trade-offs in efficacy and resource management. Vulnerabilities and malware detections will not be resolved outside of operational hours, which means that your servers and users will stay vulnerable until the next window of operational hours.

Secondly, shifting Patchman's operational hours to align with your business hours means that actions can be concentrated and executed during the hours that your server is busiest. Consider if this change in load distribution is acceptable for your situation, and disable or adjust the operational hours accordingly.

## Modifications to server groups and policies

When you are managing your servers, server groups and policies through the Patchman web interface, you may be warned that some actions apply immediately, while others apply only for new detections. 

**Server group modifications**

The following applies when:

* updating a server group, or
* modifying the server group to which a server belongs

Note that a server group only specifies default settings and these can be overridden for individual users. These settings will never affect individual settings.

|  Setting   |  Description   |
| --- | --- |
| **Language override** | If set: Effective immediately.<br><br>If unset: Requires a user refresh from the server before all language settings are updated, retaining the previous value until this refresh has occurred. This refresh is _not_ automatically scheduled. |
| **Default policy** | See below. |

**Policy modifications**

By modifying a policy, some settings will apply immediately and others will only affect new detections. The following list shows which settings are affected:

|  Settings   |  Description   |
| --- | --- |
| **Notification parent** | Effective immediately for all future notifications based on this policy. |
| **End user login** | Effective immediately. |
| **Block suspended** | Is only applied after the suspension state at the server is updated. This means that existing suspended users will not have their tasks automatically blocked when changing (or conversely, that currently blocked tasks are not automatically unblocked).<br><br>Furthermore, if this setting is set to _off_, currently blocked tasks are never automatically unblocked, even if the user's suspension state is modified. |
| **Automatic actions** | Effective only for new detections. |
| **Notifications enabled** | Effective immediately to all existing detections. This setting is only inspected at the moment of notification.<br><br>Changing the policy of the user does not affect this setting. |
| **Email template** | If the template is created, it applies only to new detections.<br><br>If the template is modified, it applies immediately to all notifications that were created based on this template.<br><br>If the template is deleted, it is deleted for all pending notifications. No notification will be sent anymore for these.<br><br>Changing the policy of the user does not affect the email template. |