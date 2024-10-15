import{_ as d,V as o,n as r,p as c,a5 as l,q as i,J as n,C as a,A as s}from"./framework-dd0d5e46.js";const u="/images/EmailMain.png",m="/images/EmailQuarantineTab.png",v="/images/EmailRelease.png",p="/images/EmailDelete.png",h="/images/EmailView1.png",b="/images/EmailActivityMonitor.png",g="/images/EmileTimeframeBtn.png",f="/images/EmailAdvSearch.png",q="/images/EmailUpdSenderLimit.png",x="/images/EmailWhitelist.png",y="/images/EmailYesAdd.png",w="/images/EmailActivityMonitorDefaultsTab.png",I="/images/EmailQuarantineDefaultsTab.png",E="/images/EmailPurge.png",_="/images/EmailAdd.png",T={},S={class:"notranslate"},C={class:"notranslate"},A={class:"notranslate"};function M(j,e){const t=o("RouterLink");return r(),c("div",null,[e[8]||(e[8]=l(`<h1 id="email" tabindex="-1"><a class="header-anchor" href="#email" aria-hidden="true">#</a> Email</h1><h4 id="imunify-email-compatibility" tabindex="-1"><a class="header-anchor" href="#imunify-email-compatibility" aria-hidden="true">#</a> Imunify Email compatibility</h4><p>Imunify Email has been checked for compatibility with following tools and mail gateways:</p><ul><li>Config Server Services <ul><li><a href="https://configserver.com/cp/osm.html" target="_blank" rel="noopener noreferrer">MailScanner</a></li><li><a href="https://configserver.com/cp/csf.html" target="_blank" rel="noopener noreferrer">Firewall</a></li></ul></li><li><a href="https://www.mailchannels.com/" target="_blank" rel="noopener noreferrer">MailChannels</a> from IE 0.6 version</li><li>SpamAssassin (incoming and outgoing configuration)</li><li><a href="https://www.smtp2go.com/" target="_blank" rel="noopener noreferrer">Smtp2go</a></li></ul><h3 id="installation" tabindex="-1"><a class="header-anchor" href="#installation" aria-hidden="true">#</a> Installation</h3><div class="danger custom-block"><p class="custom-block-title">Note</p><p>Hosting administrator only.</p><p>Imunify Email requires Imunify360 to be installed on the server.</p></div><p>Imunify Email is simple to install.</p><p>At the moment, it runs on the following distributions:</p><ul><li>CentOS 7, 8 with support of cPanel/WHM control panel.</li><li>CloudLinux OS 7, 8, 9 with support of cPanel/WHM control panel.</li><li>AlmaLinux 8, 9 with support of cPanel/WHM control panel.</li></ul><p>Minimum system requirements for installation:</p><p><strong>x64 | 512 Mb | 20 Gb disk space</strong></p><div class="tip custom-block"><p class="custom-block-title">Note</p><ul><li><p>Imunify Email RAM consumption depends on the mail traffic. In a waiting state it consumes little RAM, however for scanning large mails temporary increase of RAM consumption can be observed.</p></li><li><p>Used disk space depends on the number of accounts on a server. By default, each account will have 100 MB limitation for quarantine space. This limit can be adjusted using UI later.</p></li></ul></div><p>To install ImunifyEmail, you need to enable the corresponding option in your CLN account. After that the product will be installed automatically within 24 hours. To install it immediately you can use on of the following command as root user:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/usr/bin/imunify360-agent update-license
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>or</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>wget https://repo.imunify360.cloudlinux.com/defence360/imunifyemail-deploy.sh
bash imunifyemail-deploy.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="installation-details" tabindex="-1"><a class="header-anchor" href="#installation-details" aria-hidden="true">#</a> Installation details</h3><h4 id="users-created" tabindex="-1"><a class="header-anchor" href="#users-created" aria-hidden="true">#</a> Users created</h4><p>During installation, the following users will be created:</p><ul><li>_rspamd</li><li>_imunifyemail</li></ul><p>The <code>_imunifyemail</code> user will also be added to the <code>_imunify</code> group.</p><h4 id="components-and-resources" tabindex="-1"><a class="header-anchor" href="#components-and-resources" aria-hidden="true">#</a> Components and resources</h4><p>Imunify Email has the following components:</p><ul><li><strong>Imunify RSpamd</strong><ul><li>acts as an email filter</li><li>it is installed in system directories such as /etc/rspamd, /usr/bin, /usr/lib, /usr/share/rspamd, as a part of <code>imunify-email-rspamd</code> RPM package and brings <code>rspamd</code> service</li></ul></li><li>Quarantine (ie-quarantine) <ul><li>acts as a storage for quarantined emails and as a back-end for the user interface (UI) and CLI</li><li>it is installed in the /var/imunifyemail/quarantine directory, as a part of <code>imunify-email-quarantine</code> RPM package and brings <code>ie-quarantine</code> and <code>ie-notification</code> service.</li></ul></li><li>CLI (ie-cli) <ul><li>it is a command line interface for managing Quarantine and Activity Monitor that is installed as a part of <code>imunify-email-cli</code> RPM package</li></ul></li><li>Dec Node (ie-dec-node) <ul><li>it is a statistical component that helps to improve the filtering quality</li><li>it is installed in the /var/imunifyemail/dec-node directory, as a part of <code>imunify-email-dec-node</code> RPM package and brings <code>ie-dec-node</code> service</li></ul></li></ul><p>All these packages are installed as part of <code>imunify-email</code> RPM package.</p><h4 id="exim-configuration-modifications" tabindex="-1"><a class="header-anchor" href="#exim-configuration-modifications" aria-hidden="true">#</a> Exim configuration modifications</h4>`,26)),i("p",null,[e[2]||(e[2]=n("Imunify Email modifies Exim MTA configuration, adding RSpamd as a filter for email. It is done automatically during installation. In case if filtering needs to be disabled, see ")),a(t,{to:"/email/#disable-imunify-email"},{default:s(()=>e[0]||(e[0]=[n("Disable Imunify Email")])),_:1}),e[3]||(e[3]=n(". When disabled, Exim configuration will not contain an RSpamd filter. To re-able Imunify Email, see ")),a(t,{to:"/email/#enable-imunify-email"},{default:s(()=>e[1]||(e[1]=[n("Enable Imunify Email")])),_:1}),e[4]||(e[4]=n("."))]),e[9]||(e[9]=l(`<p>The configuration change is compatible with WHM Advanced Editor, you can continue using it for other modifications.</p><h3 id="user-interface-access" tabindex="-1"><a class="header-anchor" href="#user-interface-access" aria-hidden="true">#</a> User interface access</h3><p>In order to access the UI as a hosting administrator, navigate to WHM -&gt; Plugins -&gt; Imunify360 -&gt; Email tab.</p><p>Your clients will be able to access the Imunify Email Quarantine under: cPanel -&gt; Security -&gt; Imunify360 -&gt; Email.</p><h3 id="managing-imunify-email" tabindex="-1"><a class="header-anchor" href="#managing-imunify-email" aria-hidden="true">#</a> Managing Imunify Email</h3><h4 id="check-imunify-email-version" tabindex="-1"><a class="header-anchor" href="#check-imunify-email-version" aria-hidden="true">#</a> Check Imunify Email version</h4><p>To find out which version of Imunify Email is installed, run the following command as root:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ie-config version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="check-status" tabindex="-1"><a class="header-anchor" href="#check-status" aria-hidden="true">#</a> Check status</h4><p>In order to check status of Imunify Email, run the following command as root:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ie-config status
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="disable-imunify-email" tabindex="-1"><a class="header-anchor" href="#disable-imunify-email" aria-hidden="true">#</a> Disable Imunify Email</h4><p>In order to disable Imunify Email, you need to disable the corresponding option in your CLN account. Imunify Email will be disabled automatically within 24 hours. To disable it immediately, run following command as root:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/usr/bin/imunify360-agent update-license
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>It will remove filter configuration and stop Imunify Email services.</p><h4 id="enable-imunify-email" tabindex="-1"><a class="header-anchor" href="#enable-imunify-email" aria-hidden="true">#</a> Enable Imunify Email</h4><p>If Imunify Email was installed, but then disabled it can be re-enabled in CLN.</p><h3 id="whm-user-interface" tabindex="-1"><a class="header-anchor" href="#whm-user-interface" aria-hidden="true">#</a> WHM user interface</h3><div class="danger custom-block"><p class="custom-block-title">Note</p><p>Hosting administrator only.</p></div><p>Imunify Email scans the outbound emails on the server and allows to identify viral mailings and other viral outbound mail content for all accounts on the server.</p><p>Click <span class="notranslate"><em>Email</em></span> in the main menu of the Imunify360 admin interface.</p><p><img src="`+u+'" alt=""></p><p>The following tabs are available:</p>',23)),i("ul",null,[i("li",null,[i("span",S,[a(t,{to:"/email/#quarantine"},{default:s(()=>e[5]||(e[5]=[n("Quarantine")])),_:1})])]),i("li",null,[i("span",C,[a(t,{to:"/email/#activity-monitor-and-sender-limits"},{default:s(()=>e[6]||(e[6]=[n("Activity Monitor")])),_:1})])]),i("li",null,[i("span",A,[a(t,{to:"/email/#settings"},{default:s(()=>e[7]||(e[7]=[n("Settings")])),_:1})])])]),e[10]||(e[10]=l('<h3 id="quarantine" tabindex="-1"><a class="header-anchor" href="#quarantine" aria-hidden="true">#</a> Quarantine</h3><p>Go to <span class="notranslate">Imunify360 → Email → Quarantine</span> tab. Here, there are emails that are considered viral or malicious for all accounts on the server. You can decline or confirm the Imunify Email decision and either release and send emails or remove them completely.</p><p><img src="'+m+'" alt=""></p><p>The table has the following columns:</p><ul><li><p><span class="notranslate"><strong>Account</strong></span> — account name</p></li><li><p><span class="notranslate"><strong>Received Date</strong></span> — when an email was received by the server for sending</p></li><li><p><span class="notranslate"><strong>Reasons</strong></span> — the reason why message has been quarantined</p><ul><li><span class="notranslate"><strong>spam</strong></span> — means that a message has been classified as a spam</li><li><span class="notranslate"><strong>winexec</strong></span> — means that a message contains windows executable attachments (you can allow that using ie-cli)</li><li><span class="notranslate"><strong>ratelimit</strong></span> — means that a message exceeded a limit per hour for one of the Account/Domain/Sender email/Script. You might adjust the limit using the &quot;Activity Monitor&quot; tab.</li></ul></li><li><p><span class="notranslate"><strong>Sender (From)</strong></span> — the user who sent the email</p></li><li><p><span class="notranslate"><strong>Recipients</strong></span> — recipients (including CC and BCC)</p></li><li><p><span class="notranslate"><strong>Subject</strong></span> — a subject from an email</p></li><li><p><span class="notranslate"><strong>Actions</strong></span></p><ul><li><span class="notranslate"><strong>Release &amp; Send</strong></span> — hosting admin can use multi-select and release &amp; send several emails at once</li></ul><p><img src="'+v+'" alt=""></p><ul><li><p><span class="notranslate"><strong>Delete</strong></span> — delete email permanently</p><p><img src="'+p+'" alt=""></p></li><li><p><span class="notranslate"><strong>View Email</strong></span> — view email content</p><p><img src="'+h+'" alt=""></p><ul><li>Body - decoded email content with tags removed</li><li>Header - email Headers section</li><li>Plain text - headers plus original email body</li></ul></li></ul></li></ul><div class="tip custom-block"><p class="custom-block-title">Note</p><p>In this release, the notifications are not sent both when deleting or releasing an email. Will be added in the next release.</p></div><h3 id="activity-monitor-and-sender-limits" tabindex="-1"><a class="header-anchor" href="#activity-monitor-and-sender-limits" aria-hidden="true">#</a> Activity Monitor and Sender limits</h3><p>Go to <span class="notranslate">Imunify360 → Email → Activity Monitor</span>. Activity Monitor provides a way to observe, control and regulate the flow of mail. From this tab the messages can be whitelisted or chosen to be explored in the Quarantine tab.</p><p>The table lists the following columns:</p><ul><li><strong>Sender Object</strong> - a set of origination information that can be identified about an email is shown here. The four possible categories are: <ul><li>WHM account</li><li>Domain</li><li>PHP Script (able to send an email)</li><li>Email address of a user</li></ul></li><li><strong>Ham/Sent out</strong> - quantity of a non-spam emails that were sent out is shown corresponding to a Sender Object in a first column.</li><li><strong>Limit</strong> - the number of emails that corresponding Sender Object will be allowed to send out in a space of one hour. This number turns red and a warning sign is displayed as soon as the limit is exceeded.</li><li><strong>Whitelisted</strong> - the records in this column only have two states &quot;true&quot; and &quot;false&quot; and show if the whitelisting is <strong>on</strong> or <strong>off</strong> for a particular Sender Object.</li><li><strong>Quarantined</strong> - reflects emails from a particular Sender Object and their quantity.</li><li><strong>Actions</strong> - several actions to perform on a particular Sender Object are available: <ul><li><strong>Go to quarantine</strong> allows to explore a particular Sender Object in a Quarantine tab.</li><li><strong>Update sender limit</strong> allows to enable/disable granular limits for a particular Sender Object that override limits set in the Settings tab.</li><li><strong>Whitelist sender</strong> allows to remove any limit on sending out emails for a particular Sender Object.</li></ul></li></ul><p><img src="'+b+'" alt=""></p><p>The <strong>Timeframe</strong> setting for the records visible in the table can be chosen from the following options under the <strong>Timeframe</strong> button.</p><p><img src="'+g+'" alt=""></p><p>Records in the table are searchable and the parameters of the search can be narrowed down by using the Account name, Sender address, Domain, and Script filters.</p><p><img src="'+f+'" alt=""></p><h4 id="sender-limits" tabindex="-1"><a class="header-anchor" href="#sender-limits" aria-hidden="true">#</a> Sender limits</h4><p>This is the second level of control for sender limits. Limits set for a particular Sender Object here override the limits set on the previous stage.</p><p>Go to Imunify360 → Email → Activity Monitor → Actions → Update sender limit. For a particular Sender Object the limit can be switched on and off. The limit value can be set higher or lower than the value in the Setting tab. This setting is aimed at providing a way to set needed exceptions from the general rules.</p><p><img src="'+q+'" alt=""></p><h4 id="whitelisting" tabindex="-1"><a class="header-anchor" href="#whitelisting" aria-hidden="true">#</a> Whitelisting</h4><p>This is the third level of control for sender limits. Limits set via this control override the limits set at the two the previous stages. Go to Imunify360 → Email → Activity Monitor → Actions → Whitelist sender. A particular Sender Object can be whitelisted, which means that the Sender limits will no longer be applied to this Sender Object - so it will be able to send out an unlimited number of messages. Only the <strong>domain</strong> and <strong>email of the user</strong> Sender Objects can be whitelisted, <strong>WHM account</strong> and <strong>PHP script</strong> cannot be whitelisted.</p><p><img src="'+x+'" alt=""></p><p>To confirm whitelisting for a particular Sender Object click <strong>Yes, add to whitelist</strong>.</p><p><img src="'+y+'" alt=""></p><h3 id="settings" tabindex="-1"><a class="header-anchor" href="#settings" aria-hidden="true">#</a> Settings</h3><div class="danger custom-block"><p class="custom-block-title">Note</p><p>Hosting administrator only.</p></div><p>Go to <span class="notranslate">Imunify360 → Email → Settings</span> tab. The settings allow managing the space for quarantine and setting up limits for sending out the messages(set up a rate-limit) for all the Sender Objects adopts a 3-tier approach that is aimed to provide granular control over the outgoing messages to the administrator. An administrator can increase or decrease the space for the user&#39;s quarantine. If all space is consumed, the oldest emails in quarantine will be permanently deleted.</p><h4 id="activity-monitor-settings" tabindex="-1"><a class="header-anchor" href="#activity-monitor-settings" aria-hidden="true">#</a> Activity Monitor Settings</h4><p>This is the first level of control for sender limits. The values set at this level will be default for an entire server and will be applied by default to all Sender Objects. Go to Imunify360 → Email →Settings tab. Here, set a limit on the number of emails that can be sent by a particular entity - WHM account, domain, PHP Script, or email address of a user.</p><ul><li>The limit is set for the number of messages within the space of the last 60 minutes.</li><li>The limits can be applied either to a number of emails or a number of recipients.</li></ul><p><img src="'+w+'" alt=""></p><p>Once the values are chosen, press <strong>Save Changes</strong> to apply them.</p><h4 id="quarantine-settings" tabindex="-1"><a class="header-anchor" href="#quarantine-settings" aria-hidden="true">#</a> Quarantine Settings</h4><div class="danger custom-block"><p class="custom-block-title"></p><p>You can modify the default settings for storage capacity and release limits for all accounts.</p><p><strong>Note</strong>: If you change these settings in an individual account, the default settings will no longer apply to that account.</p><p>To revert to the default settings, refer to the CLI section.</p></div><p><img src="'+I+'" alt=""></p><p>The table has the following columns:</p><ul><li><p><span class="notranslate"><strong>Account</strong></span> — user account name</p></li><li><p><span class="notranslate"><strong>Storage Capacity MB</strong></span> — the space for the user&#39;s quarantine limit (default is 100 MB)</p></li><li><p><span class="notranslate"><strong>Used Space MB</strong></span> — the space used by files in quarantine (slight excess of the limit is possible)</p></li><li><p><span class="notranslate"><strong>Releases limit</strong></span> — limit for releases per hour for non-root user</p></li><li><p><span class="notranslate"><strong>State</strong></span> — the state of the user&#39;s quarantine.</p></li><li><p><span class="notranslate"><strong>Details</strong></span> — emails deleted permanently for the last hour</p></li><li><p><span class="notranslate"><strong>Actions</strong></span></p><ul><li><p><span class="notranslate"><strong>Purge quarantine</strong></span> — purge all quarantine for an account</p><p><img src="'+E+'" alt=""></p></li><li><p><span class="notranslate"><strong>Add</strong></span> — change the limit of the space for the user&#39;s (account) quarantine</p></li></ul><p><img src="'+_+`" alt=""></p></li></ul><h3 id="imunify-email-command-line-interface" tabindex="-1"><a class="header-anchor" href="#imunify-email-command-line-interface" aria-hidden="true">#</a> Imunify Email Command Line Interface</h3><p>The Command Line Interface (CLI) is designed to simplify usage of Imunify Email and as an enabler for integration with other tools and platforms.</p><p>Main command for all operations with Imunify Email:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ie-cli
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="basic-usage" tabindex="-1"><a class="header-anchor" href="#basic-usage" aria-hidden="true">#</a> Basic usage</h4><p>Imunify Email quarantine CLI application</p><p><strong>Usage</strong>:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ie-cli [command] [arguments]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Use <code>--help</code> key to get list of the available commands and to get help for the particular command, e.g. <code>ie-cli whitelist sender --help</code> .</p><p><strong>Available Commands</strong>:</p><table><thead><tr><th></th><th></th></tr></thead><tbody><tr><td><code>accounts</code></td><td>interaction with accounts in the quarantine</td></tr><tr><td><code>am</code></td><td>interaction with the Activity Monitor, same API as in ActivityMonitor UI</td></tr><tr><td><code>emails</code></td><td>interaction with emails in the quarantine</td></tr><tr><td><code>filter-settings</code></td><td>toggle the filter settings, without any parameters - returns the current settings</td></tr><tr><td><code>quarantine-defaults</code></td><td>interaction with default settings in the Quarantine</td></tr><tr><td><code>version</code></td><td>print the ImunifyEmail CLI version</td></tr><tr><td><code>whitelist</code></td><td>interaction with the whitelist of authenticated users, senders and recipients</td></tr></tbody></table><p><strong>Flags</strong>:</p><table><thead><tr><th></th><th></th></tr></thead><tbody><tr><td><code>-h</code>, <code>--help</code></td><td>Help for ie-cli</td></tr></tbody></table><h3 id="operations-with-emails-in-the-quarantine" tabindex="-1"><a class="header-anchor" href="#operations-with-emails-in-the-quarantine" aria-hidden="true">#</a> Operations with emails in the quarantine</h3><p>Emails marked as spam by Imunify Email are stored in the quarantine. The following section describes CLI for operating with emails.</p><div class="tip custom-block"><p class="custom-block-title">Note</p><p>The quarantine is keeping email for various users separately, but root users can see all the emails and perform any operations on them.</p></div><div class="tip custom-block"><p class="custom-block-title">Note</p><p>Almost all CLI commands support output in plain text and JSON format. For switching output to JSON use <code>--json</code></p></div><h4 id="list-emails-in-quarantine" tabindex="-1"><a class="header-anchor" href="#list-emails-in-quarantine" aria-hidden="true">#</a> List emails in quarantine</h4><p>In order to see all emails stored use the following command. By default &#39;root&#39; account is used, so the command shows the whole content of the quarantine.</p><p><strong>Command</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ie-cli emails list --help

list emails in the quarantine, order by quarantined date descending

Usage:
  ie-cli emails list [flags]

Flags:
  -a, --account string   an account name
  -h, --help             help for list
      --json             output in json format
  -l, --limit int        The maximum count of items to return (default 25)
  -s, --since string     show entries starting from [now - since] time
                         format: [DIGIT(s)][MODIFIER]
                         	supported modifiers &#39;s&#39; - seconds, &#39;m&#39; - minutes, &#39;h&#39; - hours, &#39;d&#39; - days, e.g. 1h, 2d
                         	examples: 100s, 5m, 1h, 5d (default &quot;30d&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Example</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ie-cli emails list -a root --since 24h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>That command shows all the quarantined emails for all accounts that have been quarantined within last 24 hours.</p><p><strong>Output</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>-----------------------------------------------------------------------------------------------------------
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
Subject           FWD: Want Pills V|AgR@ % Xan_a_x ^ Valiu|m| # At|v@\`n \\ Pn+ermin &#39; So+m+a  lNmAL

-----------------------------------------------------------------------------------------------------------
Email_ID fbc2efd0-1808-4e54-99ce-3082708b28ee
Size_Bytes	      8971
Account_Name	  oregdent
Recipients	      steve@hillcabinet.com
Subject        	  FWD:Xanax.x Valium.m Xanax.x Vicodin.n h ogzmwggi

-----------------------------------------------------------------------------------------------------------
Max Count	     3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Example with JSON as output format</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ie-cli emails list -a root –-json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Output</strong></p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>{
  &quot;items&quot;: [
    {
      &quot;email_id&quot;: &quot;ef69f707-d547-4b29-b8f0-f5331821c930&quot;,
      &quot;size_bytes&quot;: 8190,
      &quot;account_name&quot;: &quot;mws&quot;,
      &quot;recipients&quot;: [
        &quot;me@somehost.com&quot;
      ],
      &quot;subject&quot;: &quot;Ge t G:eneric V1agra f:or as 1ow as $2.50 per 50 mg&quot;,
      &quot;script_header&quot;: {
        &quot;raw&quot;: &quot;&quot;,
        &quot;domain&quot;: &quot;&quot;,
        &quot;path&quot;: &quot;&quot;
      }
    },
    {
      &quot;email_id&quot;: &quot;faf96a73-5be4-481a-9c6c-7ab8fb2e3cf0&quot;,
      &quot;size_bytes&quot;: 8534,
      &quot;account_name&quot;: &quot;mws&quot;,
      &quot;recipients&quot;: [
        &quot;frank@yahooo.com&quot;
      ],
      &quot;subject&quot;: &quot;FWD: Want Pills V|AgR@ % Xan_a_x ^ Valiu|m|  lNmAL&quot;,
      &quot;script_header&quot;: {
        &quot;raw&quot;: &quot;&quot;,
        &quot;domain&quot;: &quot;&quot;,
        &quot;path&quot;: &quot;&quot;
      }
    },
    {
      &quot;email_id&quot;: &quot;fbc2efd0-1808-4e54-99ce-3082708b28ee&quot;,
      &quot;size_bytes&quot;: 8971,
      &quot;account_name&quot;: &quot;oregdent&quot;,
      &quot;recipients&quot;: [
        &quot;steve@hillcabinet.com&quot;
      ],
      &quot;subject&quot;: &quot;FWD:Xanax.x Valium.m Xanax.x Vicodin.n h ogzmwggi&quot;,
      &quot;script_header&quot;: {
        &quot;raw&quot;: &quot;&quot;,
        &quot;domain&quot;: &quot;&quot;,
        &quot;path&quot;: &quot;&quot;
      }
    }
  ],
  &quot;max_count&quot;: 3
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="show-email-message" tabindex="-1"><a class="header-anchor" href="#show-email-message" aria-hidden="true">#</a> Show Email message</h3><p>Root user, if needed, can see any message held in a quarantine. In order to do this email ID is needed. It can be taken from the list command above.</p><div class="tip custom-block"><p class="custom-block-title">Note</p><p>Don’t forget to specify a user account. For root user use <code>-a root</code>.</p></div><p><strong>Command</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ie-cli emails show --id &lt;EMAIL_ID&gt; [-a &lt;ACCOUNT_NAME&gt;] [--json]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Example</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ie-cli emails show --id f3367f1b-4216-4f4f-9617-f8be9f5a6e76 -a root
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Output</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>EmailID:                      f3367f1b-4216-4f4f-9617-f8be9f5a6e76
SizeBytes:                    8534
AccountName:                  mws
Sender:                       mws@mywebsite.com
Recipients:                   me@somehost.com
ReceivedDate:                 1643805800
Subject:                      FWD: Want Pills V|AgR@ % Xan_a_x ^ Valiu|m| # At|v@\`n \\ Pn+ermin &#39; So+m+a  lNmAL

Content-Transfer-Encoding:    quoted-printable
Content-Type:                 text/html; charset=&quot;iso-8859-7&quot;
Date:                         Fri, 13 Feb 2019 04:48:28 +0300
From:                         &quot;wilhelmina rivard&quot; &lt;rivard1792@hinet.net&gt;
MIME-Version:                 1.0
Received:                     from [70.100.200.300] (port=56330 helo=Myaccout) by 70.100.200.300.cprapid.com with esmtpsa  (TLS1.2) tls TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (Exim 4.94.2) (envelope-from &lt;mws@mydomain.com&gt;) id 1nFEym-0005TO-Qs for me@somehost.com; Wed, 02 Feb 2022 12:43:20 +0000
To:                           &lt;abazis@iit.demokritos.gr&gt;

X-ImunifyEmail-Filter-Action: reject
X-ImunifyEmail-Filter-Score:  6.1
X-Mimeole:                    Produced By Microsoft MimeOLE V6.00.2900.2527
X-Msmail-Priority:            Normal
X-Priority:                   3
X-Failed-Recipients:          []

Body: PCFET0NUWVBFIGh0bWwgcHVibGljICItLy9XM0MvL0RURCBIVE1MIDQuMDEgVHJhbnNpdGlvbmFsLy9FTiIgPQoiaHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDQvbG9vc2UuZHRkIj4KPEhUTUw+CjxIRUFEPgo8VElUTEU+QWxsIFlvdXIgTWVkcyBIZXJlPC9USVRMRT4KPE1FVEEgaHR0cC1lcXVpdj0zRCJDb250ZW50LXR5cGUiIGNvbnRlbnQ9M0QidGV4dC9odG1sOyA9CmNoYXJzZXQ9M0RJU08tODg1OS0xIj4KPFNUWUxFIHR5cGU9M0QidGV4dC9jc3MiPgo8IS0tIC5zdHlsZTUge2ZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmOyBmb250LXNpemU6ID0KMTRweDsgfT0yMAo8IS0tIC5zdHlsZTgge2ZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmOyBmb250LXNpemU6IDhweDsgPQp9PTIwCi0tPjwvU1RZTEU
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="release-or-remove-a-message-from-the-quarantine" tabindex="-1"><a class="header-anchor" href="#release-or-remove-a-message-from-the-quarantine" aria-hidden="true">#</a> Release or Remove a message from the quarantine</h3><p>Messages can be released from the quarantine and sent to recipients if they are false positives. They can also be deleted if needed to free up space.</p><div class="tip custom-block"><p class="custom-block-title">Note</p><p>The quarantine will automatically delete the oldest messages when the user&#39;s quarantine limit is reached. The limit can be adjusted in settings.</p></div><div class="tip custom-block"><p class="custom-block-title">Note</p><p>Non-root users are currently limited to releasing only 5 messages from quarantine per hour. This limit can be adjusted using the ie-cli command-line interface (CLI) tool.</p></div><h4 id="release" tabindex="-1"><a class="header-anchor" href="#release" aria-hidden="true">#</a> Release</h4><p><strong>Command</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ie-cli emails release --ids EMAIL_ID_1,EMAIL_ID_2 -a root
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Example</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ie-cli emails release --ids fb7c3537-8e5e-43d8-bc66-bd954c22d587 -a root
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Output</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>OK
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="remove" tabindex="-1"><a class="header-anchor" href="#remove" aria-hidden="true">#</a> Remove</h4><p><strong>Command</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ie-cli emails remove --ids fb7c3537-8e5e-43d8-bc66-bd954c22d587 -a root
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Output</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>OK
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="accounts-settings" tabindex="-1"><a class="header-anchor" href="#accounts-settings" aria-hidden="true">#</a> Accounts settings</h3><p>ImunifyEmail stores emails marked as spam in a quarantine space. The space is divided into virtual subspaces for every system account. Subspace is created when the first spam message is quarantined. It is filled with spam messages for a particular account until the size limitation is reached. When the size limitation is reached most old messages will be automatically deleted.</p><div class="tip custom-block"><p class="custom-block-title">Note</p><p>Default limit for a quarantine subspace is 100 MB.</p></div><div class="tip custom-block"><p class="custom-block-title">Note</p><p>In some cases ImunifyEmail can’t attribute an email to a system account. In such cases the email will be stored under root user quarantine space.</p></div><p>There are command line commands for managing quarantine space.</p><h4 id="list-all-accounts-in-the-quarantine" tabindex="-1"><a class="header-anchor" href="#list-all-accounts-in-the-quarantine" aria-hidden="true">#</a> List all accounts in the quarantine</h4><p><strong>Command</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ie-cli accounts list [--json]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Output</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Name      	     LimitBytes	     UsedBytes	     State
mysite           125829120  	 810692     	 active
dentistcenter    104857600  	 0          	 active

Max Count 2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Output (JSON)</strong></p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>{
   &quot;items&quot;:[
      {
         &quot;name&quot;:&quot;mysite&quot;,
         &quot;limit_bytes&quot;:125829120,
         &quot;used_bytes&quot;:810692,
         &quot;state&quot;:&quot;active&quot;
      },
      {
         &quot;name&quot;:&quot;dentistcenter&quot;,
         &quot;limit_bytes&quot;:104857600,
         &quot;used_bytes&quot;:0,
         &quot;state&quot;:&quot;active&quot;
      }
   ],
   &quot;max_count&quot;:2
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="edit-account-size-limit" tabindex="-1"><a class="header-anchor" href="#edit-account-size-limit" aria-hidden="true">#</a> Edit account size limit</h4><p>Sometimes it is necessary to give more (or less) space in the quarantine for some user accounts. It is possible to do using the following command.</p><p><strong>Command</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ie-cli accounts edit -a ACCOUNT_NAME [--state=active|block] [--limit=1024]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Example</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ie-cli accounts edit -a mydomain --state=active --limit=8096
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Output (JSON)</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Name       LimitBytes	 UsedBytes	 State
mws        8096          810692      active
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Output</strong></p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>{
   &quot;name&quot;:&quot;mws&quot;,
   &quot;limit_bytes&quot;:8096,
   &quot;used_bytes&quot;:160461,
   &quot;state&quot;:&quot;active&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="edit-account-releases-limit" tabindex="-1"><a class="header-anchor" href="#edit-account-releases-limit" aria-hidden="true">#</a> Edit account releases-limit</h4><p>Users&#39; hourly <code>releases-limit</code> values can be adjusted according to your needs. This allows for a more dynamic and responsive management of user activity, ensuring optimal operational efficiency.</p><p>To view the current account settings, use the following command:</p><p><strong>Command</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ie-cli accounts list --name=imunifyemail
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Output</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Name             LimitBytes      UsedBytes       State   ReleasesLimit (hourly)
imunifyemail     104857600       8324            active          5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>To modify the release limit, use the <code>ie-cli accounts edit</code> command followed by the <code>--name</code> parameter (to specify the account) and the <code>--releases-limit</code> parameter (to set the new limit). For example:</p><p><strong>Command</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ie-cli accounts edit --name=imunifyemail --releases-limit=50
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Output</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Name             LimitBytes      UsedBytes       State   ReleasesLimit (hourly)
imunifyemail     104857600       8324            active          50
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="clean-all-quarantine-for-an-account" tabindex="-1"><a class="header-anchor" href="#clean-all-quarantine-for-an-account" aria-hidden="true">#</a> Clean all quarantine for an account</h4><p>If needed all quarantine for an account can be cleaned with one command.</p><p><strong>Command</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ie-cli accounts remove -a &lt;ACCOUNT_NAME&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Example</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ie-cli accounts remove -a root
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Output</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>OK
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="whitelisting-1" tabindex="-1"><a class="header-anchor" href="#whitelisting-1" aria-hidden="true">#</a> Whitelisting</h3><p>Imunify Email supports whitelisting configuration. It is possible to whitelist domains and/or email addresses of a sender.</p><div class="warning custom-block"><p class="custom-block-title">Warning</p><p>When sender is whitelisted Imunify Email bypasses it’s emails without filtering. It may affect hosting reputation if a whitelisted sender will send spam.</p></div><h4 id="available-commands" tabindex="-1"><a class="header-anchor" href="#available-commands" aria-hidden="true">#</a> Available commands</h4><p>In general, all whitelisting operations could be described by the next pattern:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ie-cli whitelist WHO OPERATION [value1 value2 ... valueN]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Where <code>WHO</code> is one of:</p><ul><li>authuser (only email address)</li><li>sender (email address or domain name)</li></ul><p><code>OPERATION</code> is one of:</p><ul><li>add</li><li>list</li><li>remove</li></ul><p><code>value1 valu2 ... valueN</code> - email addresses and domains (actual for the <code>add</code> and <code>remove</code> commands)</p><p><strong>Command</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ie-cli whitelist --help
List/Add/Delete authenticated users, senders and recipients to/from whitelist.
Where :
    - authenticated user could be only an email address
    - sender and recipient could be one of domain or email address

Usage:
  ie-cli whitelist [command]

Available Commands:
  authuser    operation with the whitelist of the authenticated users (email addresses)
  sender      operation with the whitelist of senders (email addresses and domains)

Flags:
  -h, --help   help for whitelist

Use &quot;ie-cli whitelist [command] --help&quot; for more information about a command.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="see-all-whitelist-senders" tabindex="-1"><a class="header-anchor" href="#see-all-whitelist-senders" aria-hidden="true">#</a> See all whitelist senders</h4><p><strong>Command</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ie-cli whitelist authuser list  [--json]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Output</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>EMAILS
1@example5.com
pp@ppp.com
qq@qq.com
me@mydomain.com

DOMAINS
No available data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Output (JSON)</strong></p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>{
 	&quot;success&quot;: true,
 	&quot;emails&quot;: [
 		&quot;1@example5.com&quot;,
 		&quot;pp@ppp.com&quot;,
 		&quot;qq@qq.com&quot;,
 		&quot;me@mydomain.com&quot;
 	],
 	&quot;domains&quot;: []
 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="whitelist-a-sender" tabindex="-1"><a class="header-anchor" href="#whitelist-a-sender" aria-hidden="true">#</a> Whitelist a sender</h4><p>To whitelist a domain or/and an email address use the following command.</p><p><strong>Command</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ie-cli whitelist sender add domain.com some_email@domain.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Output</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Adding sender(s) to the whitelist:
1. domain    domain.com
2. email     some_email@domain.com
OK
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="remove-sender-from-the-whitelist" tabindex="-1"><a class="header-anchor" href="#remove-sender-from-the-whitelist" aria-hidden="true">#</a> Remove sender from the whitelist</h4><p>If needed, the sender can be removed from the whitelist. See the following commands.</p><p><strong>Command</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ie-cli whitelist sender remove domain.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Output</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Removing sender(s) from the whitelist:
1. domain    domain.com
OK
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="quarantine-default-settings-releases-limit-and-storage-capacity" tabindex="-1"><a class="header-anchor" href="#quarantine-default-settings-releases-limit-and-storage-capacity" aria-hidden="true">#</a> Quarantine default settings (releases limit and storage capacity)</h3><p>Two commands are available: set and edit Please run with <code>--help</code> flag to get more info</p><p><strong>Command</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ie-cli quarantine-defaults --help
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="list-command" tabindex="-1"><a class="header-anchor" href="#list-command" aria-hidden="true">#</a> <code>list</code> Command</h4><p><strong>Note</strong>: The --json flag is available to output in JSON format.</p><p><strong>Example</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ie-cli quarantine-defaults list
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Output</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Setting          IntValue
limit_bytes      104857600
releases_limit   5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="set-command" tabindex="-1"><a class="header-anchor" href="#set-command" aria-hidden="true">#</a> <code>set</code> Command</h4><p><strong>Command</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ie-cli quarantine-defaults set --help

Set default settings for accounts. Use -1 to set common default value.

Usage:
ie-cli quarantine-defaults set [flags]

Flags:
-h, --help help for set
--json output in json format
-r, --releases-limit Limit for releases per hour for non-root user
-s, --storage-capacity Limit in MB for the storage in the Quarantine for the account
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Example</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ie-cli quarantine-defaults set --releases-limit 50 --storage-capacity 120
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>That command sets the releases limit to 50 per hour and storage capacity to 120 MB.</p><p><strong>Output</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Setting          IntValue
limit_bytes      125829120
releases_limit   50
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="activity-monitor" tabindex="-1"><a class="header-anchor" href="#activity-monitor" aria-hidden="true">#</a> Activity Monitor</h3><p>To get understanding of Activity Monitor see the next section. <code>ie-cli</code> provides and API to get the same information as UI does from the Activity Monitor. <code>ie-cli</code> allows to</p><ol><li>get the Activity Monitor statistics</li><li>set/remove/update sender limits for the particular account/domain/email/script</li><li>get/update server limits that applied by default</li></ol><p><strong>Command</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ie-cli am --help

This subcommand interacts with the Activity Monitor to return statistics, get/set settings for
the sender objects.
Activity Monitor operates by the sender objects. Sender object is an object on behalf of which
client sends email. It could be one of: &quot;account&quot;, &quot;domain&quot;, &quot;script&quot; or &quot;sender_email&quot;

Usage:
  ie-cli am [command]

Available Commands:
  limit           The limit value of sender object can be applied on particular domain, sender email and account
  server-settings Operates by the server sender limit settings and allows to set default limit that is applied for all sender objects
  stats           stats (statistics) returns the aggregated view of senders objects with various filters

Flags:
  -h, --help   help for am

Use &quot;ie-cli am [command] --help&quot; for more information about a command.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="usage-of-limit-subcommand" tabindex="-1"><a class="header-anchor" href="#usage-of-limit-subcommand" aria-hidden="true">#</a> Usage of limit subcommand</h4><p>The <code>ie-cli am limit</code> command is a versatile tool that enables you to assign a limit value to any sender object. This object could be an <code>account</code>, <code>domain</code>, <code>sender email</code>, or <code>script</code>. The command can be further customized with the use of specific flags and subcommands.</p><p>The set subcommand is available for use with this command. Its primary function is to establish a limit for the designated sender object(s).</p><p>In the context of the <code>&quot;ie-cli am limit set&quot;</code> command, the flags that can be used include <code>&quot;--id string&quot;</code>, <code>&quot;--limit int&quot;</code>, and <code>&quot;--so-type string&quot;</code>.</p><div class="tip custom-block"><p class="custom-block-title">Note</p><p>In order to set a limit, it&#39;s essential to know the sender object&#39;s id. This id can be obtained from the <code>ie-cli am stats</code> subcommand. For guidance on how to obtain the sender object id, please refer to the <a href="#usage-of-stats-subcommand"><code>ie-cli am stats</code> documentation provided below.</a></p></div><p><strong>Command</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ie-cli am limit set --help
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Output</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>set limit for the sender object(s)

Usage:
  ie-cli am limit set [flags]

Flags:
  -h, --help             help for set
      --id string        The id of sender object
      --limit int        The limit value, 0 means unlimited (default -1)
      --so-type string   supported values: [account domain sender_email script]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The utilization of the limit subcommand varies according to the sender-object types (--so-type);</p><p><strong>Command usage with <code>--so-type=&quot;account&quot;</code> for set limit</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ie-cli am limit set --id=&quot;11111111-1111-1111-1111-11111111111&quot; --limit=3 --so-type=&quot;account&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Command usage with <code>--so-type=&quot;domain&quot;</code> for set limit</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ie-cli am limit set --id=&quot;22222222-2222-2222-2222-222222222222&quot; --limit=5 --so-type=&quot;domain&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Command usage with <code>--so-type=&quot;sender_email&quot;</code> for set limit</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ie-cli am limit set --id=&quot;33333333-3333-3333-3333-333333333333&quot; --limit=7 --so-type=&quot;sender_email&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Output</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>OK
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="tip custom-block"><p class="custom-block-title">Note</p><p>Modifications can be tracked by navigating through the User Interface (UI) via <code>Imunify360 -&gt; Email -&gt; Activity Monitor</code>.</p></div><h4 id="usage-of-server-settings-subcommand" tabindex="-1"><a class="header-anchor" href="#usage-of-server-settings-subcommand" aria-hidden="true">#</a> Usage of server-settings subcommand</h4><p>The <code>ie-cli am server-settings</code> command is designed to manage server sender limit settings, allowing you to establish a default limit that is applied to any sender object by default. This command can be further customized with the use of specific flags and subcommands.</p><p>The <code>ie-cli am server-settings set</code> command is designed to modify the server sender limit settings. This command can be paired with specific flags to establish the limit mode and eliminate limits for certain sender objects.</p><p>The <code>--limit-mode int</code> flag is utilized to define the limit mode. The limit mode can be either 1 or 2, where 1 signifies limit mode by sender and 2 denotes limit mode by the number of recipients.</p><p>To eliminate the limit for any sender object, a value of 0 can be used. For instance, to remove the limit for an account, the <code>--account=0</code> command can be employed. A value of 0 indicates that the sender object will have no restrictions, effectively rendering it unlimited.</p><p>Additional flags encompass <code>--account int</code>, <code>--domain int</code>, <code>--script int</code>, and <code>--sender-email int</code>. These are utilized to establish the threshold for any account, domain, script, or sender email, correspondingly. The default value for these flags is set to -1.</p><p>The existing <code>server-settings</code> can be accessed by utilizing the <code>ie-cli am server-settings</code> command.</p><p><strong>Command</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ie-cli am server-settings
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Output</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
    &quot;account&quot;: 0,
    &quot;domain&quot;: 1,
    &quot;limit_mode&quot;: 1,
    &quot;script&quot;: 0,
    &quot;sender_email&quot;: 0
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>To establish the limit mode to 2 (limit by the number of recipients) and designate any limit for a domain, the subsequent command could be utilized: <code>ie-cli am server-settings set --limit-mode=2 --domain=100</code>.</p><p><strong>Command</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ie-cli am server-settings set --limit-mode=2 --domain=100
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Output</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>New server settings is:
{
    &quot;account&quot;: 0,
    &quot;domain&quot;: 100,
    &quot;limit_mode&quot;: 2,
    &quot;script&quot;: 0,
    &quot;sender_email&quot;: 0
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>For instance, to configure the limit mode to 1 (limit by sender) and eliminate the limit for any account, the following command could be employed: <code>ie-cli am server-settings set --limit-mode=1 --account=0</code>.</p><p><strong>Command</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ie-cli am server-settings set --limit-mode=1 --account=0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Output</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>New server settings is:
{
    &quot;account&quot;: 0,
    &quot;domain&quot;: 100,
    &quot;limit_mode&quot;: 1,
    &quot;script&quot;: 0,
    &quot;sender_email&quot;: 0
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="usage-of-stats-subcommand" tabindex="-1"><a class="header-anchor" href="#usage-of-stats-subcommand" aria-hidden="true">#</a> Usage of stats subcommand</h4><p>The <code>ie-cli am stats</code> command provides a consolidated view of sender objects, complete with a variety of filters. This command can be paired with specific flags to refine the results.</p><p>The flags include <code>--account-name string</code>, <code>--domain string</code>, <code>--limit int</code>, <code>--offset int</code>, <code>--script-name string</code>, <code>--sender-email string</code>, and <code>--since string</code>. These are employed to filter by account name, domain, limit the quantity of results, set the offset for results, filter by script name, filter by sender email, and set the duration in seconds that has elapsed from the flag value until the present moment, respectively.</p><p>The <code>--limit int</code> flag also indicates that the limit applied pertains solely to the number of accounts in the response, with a default of 25.</p><p>The <code>--since string</code> flag defaults to a value of 1 hour - <code>1h</code>.</p><div class="tip custom-block"><p class="custom-block-title">Note</p><p>The functionality mirrors that of the ActivityMonitor user interface.</p></div><p><strong>Command</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ie-cli am stats --help
stats (statistics) returns the aggregated view of senders objects with various filters

Usage:
  ie-cli am stats [flags]

Flags:
      --account-name string   Account name to filter
      --domain string         Domain to filter
  -h, --help                  help for stats
      --limit int             How many results to return (pagination). The limit applied only for number of accounts in response (default 25)
      --offset int            From which offset results to return (pagination)
      --script-name string    Script name to filter
      --sender-email string   Sender email to filter
      --since string          show entries starting from [now - since] time
                              format: [DIGIT(s)][MODIFIER]
                              	supported modifiers &#39;s&#39; - seconds, &#39;m&#39; - minutes, &#39;h&#39; - hours, &#39;d&#39; - days, e.g. 1h, 2d
                              	examples: 100s, 5m, 1h, 5d (default &quot;1h&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>By using the stats command directly, all sender objects are returned as follows. The <code>--since</code> flag can be used to retrieve sender objects within a certain period of time.</p><p><strong>Command</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ie-cli am stats --since 10h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Output</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &quot;accounts&quot;: [
    {
        &quot;domains&quot;: [
            {
                &quot;account_id&quot;: &quot;11111111-1111-1111-1111-11111111111&quot;,
                &quot;exclusion&quot;: false,
                &quot;id&quot;: &quot;22222222-2222-2222-2222-222222222222&quot;,
                &quot;limit&quot;: 0,
                &quot;messages&quot;: 1,
                &quot;name&quot;: &quot;domain.com&quot;,
                &quot;quarantined&quot;: 1,
                &quot;rateLimited&quot;: false,
                &quot;sender_emails&quot;: [
                    {
                        &quot;account_id&quot;: &quot;11111111-1111-1111-1111-11111111111&quot;,
                        &quot;domain_id&quot;: &quot;22222222-2222-2222-2222-222222222222&quot;,
                        &quot;exclusion&quot;: false,
                        &quot;id&quot;: &quot;33333333-3333-3333-3333-333333333333&quot;,
                        &quot;limit&quot;: 0,
                        &quot;messages&quot;: 1,
                        &quot;name&quot;: &quot;test@domain.com&quot;,
                        &quot;quarantined&quot;: 1,
                        &quot;rateLimited&quot;: false,
                        &quot;whitelisted&quot;: false
                    }
                ],
                &quot;whitelisted&quot;: false
            },
        ],
        &quot;exclusion&quot;: false,
        &quot;id&quot;: &quot;11111111-1111-1111-1111-11111111111&quot;,
        &quot;limit&quot;: 0,
        &quot;messages&quot;: 1,
        &quot;name&quot;: &quot;domain&quot;,
        &quot;quarantined&quot;: 1,
        &quot;rateLimited&quot;: false,
        &quot;scripts&quot;: null,
        &quot;whitelisted&quot;: false
    }
  ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Command usage with <code>--sender-email</code> for get sender-object id</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ie-cli am stats --sender-email=test@domain.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Command usage with <code>--account-name</code> for get sender-object id</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ie-cli am stats --account-name=domain --since 30d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Output</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &quot;accounts&quot;: [
    {
        &quot;domains&quot;: [
            {
                &quot;account_id&quot;: &quot;11111111-1111-1111-1111-11111111111&quot;,
                &quot;exclusion&quot;: false,
                &quot;id&quot;: &quot;22222222-2222-2222-2222-222222222222&quot;,
                &quot;limit&quot;: 0,
                &quot;messages&quot;: 1,
                &quot;name&quot;: &quot;domain.com&quot;,
                &quot;quarantined&quot;: 1,
                &quot;rateLimited&quot;: false,
                &quot;sender_emails&quot;: [
                    {
                        &quot;account_id&quot;: &quot;11111111-1111-1111-1111-11111111111&quot;,
                        &quot;domain_id&quot;: &quot;22222222-2222-2222-2222-222222222222&quot;,
                        &quot;exclusion&quot;: false,
                        &quot;id&quot;: &quot;33333333-3333-3333-3333-333333333333&quot;,
                        &quot;limit&quot;: 0,
                        &quot;messages&quot;: 1,
                        &quot;name&quot;: &quot;test@domain.com&quot;,
                        &quot;quarantined&quot;: 1,
                        &quot;rateLimited&quot;: false,
                        &quot;whitelisted&quot;: false
                    }
                ],
                &quot;whitelisted&quot;: false
            },
        ],
        &quot;exclusion&quot;: false,
        &quot;id&quot;: &quot;11111111-1111-1111-1111-11111111111&quot;,
        &quot;limit&quot;: 0,
        &quot;messages&quot;: 1,
        &quot;name&quot;: &quot;domain&quot;,
        &quot;quarantined&quot;: 1,
        &quot;rateLimited&quot;: false,
        &quot;scripts&quot;: null,
        &quot;whitelisted&quot;: false
    }
  ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="uninstallation" tabindex="-1"><a class="header-anchor" href="#uninstallation" aria-hidden="true">#</a> Uninstallation</h3><p>To remove Imunify Email from your system, you need to disable the corresponding option in your CLN account. That will <strong>disable</strong> Imunify Email on the server, but rpm packages still will be presented. To remove them as well, execute the following command as root:</p><p><strong>Command</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>yum autoremove imunifyemail
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>This command ensures the removal of all associated components related to Imunify Email from your system.</p>`,253))])}const k=d(T,[["render",M],["__file","index.html.vue"]]);export{k as default};
