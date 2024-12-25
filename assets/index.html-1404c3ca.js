import{_ as s,V as i,n as u,p as h,q as t,J as r,C as n,A as a,a5 as l}from"./framework-a3ae02e1.js";const m="/images/company_profile_identifier_2.png",p="/images/status_page_notification_checkbox.png",g={},f={class:"table-of-contents"};function c(b,e){const d=i("router-link"),o=i("RouterLink");return u(),h("div",null,[e[37]||(e[37]=t("h1",{id:"portal",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#portal","aria-hidden":"true"},"#"),r(" Portal")],-1)),t("nav",f,[t("ul",null,[t("li",null,[n(d,{to:"#what-permissions-do-the-different-user-roles-have"},{default:a(()=>e[0]||(e[0]=[r("What permissions do the different user roles have?")])),_:1})]),t("li",null,[n(d,{to:"#what-are-the-minimum-browser-requirements-for-the-patchman-portal"},{default:a(()=>e[1]||(e[1]=[r("What are the minimum browser requirements for the Patchman Portal?")])),_:1})]),t("li",null,[n(d,{to:"#reporting-malware-to-patchman"},{default:a(()=>e[2]||(e[2]=[r("Reporting malware to Patchman")])),_:1}),t("ul",null,[t("li",null,[n(d,{to:"#how-to-report-a-malicious-file"},{default:a(()=>e[3]||(e[3]=[r("How to report a malicious file")])),_:1})])])]),t("li",null,[n(d,{to:"#detection-states-and-actions"},{default:a(()=>e[4]||(e[4]=[r("Detection states and actions")])),_:1})]),t("li",null,[n(d,{to:"#organization-identifier"},{default:a(()=>e[5]||(e[5]=[r("Organization identifier")])),_:1})]),t("li",null,[n(d,{to:"#status-page-subscriptions"},{default:a(()=>e[6]||(e[6]=[r("Status page subscriptions")])),_:1})]),t("li",null,[n(d,{to:"#control-panel-user-level-equivalents"},{default:a(()=>e[7]||(e[7]=[r("Control panel user level equivalents")])),_:1})])])]),e[38]||(e[38]=l(`<h2 id="what-permissions-do-the-different-user-roles-have" tabindex="-1"><a class="header-anchor" href="#what-permissions-do-the-different-user-roles-have" aria-hidden="true">#</a> What permissions do the different user roles have?</h2><p>Permissions in the Portal are managed by three roles. These roles are:</p><ul><li>Owner</li><li>Manager</li><li>Staff</li></ul><p>Owners have full permissions. Managers have the limitation that they cannot view billing related pages and that they cannot manage sub-organizations. Staff users can only view detections and perform actions on them (i.e. patch, undo, etc.).</p><table><thead><tr><th></th><th><strong>Staff</strong></th><th><strong>Manager</strong></th><th><strong>Owner</strong></th></tr></thead><tbody><tr><td><strong>Billing</strong></td><td></td><td></td><td></td></tr><tr><td>View invoice</td><td>✗</td><td>✗</td><td>✓</td></tr><tr><td>Change credit card</td><td>✗</td><td>✗</td><td>✓</td></tr><tr><td><strong>Sub-organizations</strong></td><td></td><td></td><td></td></tr><tr><td>Add</td><td>✗</td><td>✗</td><td>✓</td></tr><tr><td>Change</td><td>✗</td><td>✗</td><td>✓</td></tr><tr><td>Delete</td><td>✗</td><td>✗</td><td>✓</td></tr><tr><td><strong>User accounts (for organization Portal access)</strong></td><td></td><td></td><td></td></tr><tr><td>Add</td><td>✗</td><td>✓</td><td>✓</td></tr><tr><td>Change</td><td>✗</td><td>✓</td><td>✓</td></tr><tr><td>Delete</td><td>✗</td><td>✓</td><td>✓</td></tr><tr><td><strong>Approved e-mail domains</strong></td><td></td><td></td><td></td></tr><tr><td>Add</td><td>✗</td><td>✓</td><td>✓</td></tr><tr><td>Delete</td><td>✗</td><td>✓</td><td>✓</td></tr><tr><td><strong>Servers</strong></td><td></td><td></td><td></td></tr><tr><td>Add</td><td>✗</td><td>✓</td><td>✓</td></tr><tr><td>Change</td><td>✗</td><td>✓</td><td>✓</td></tr><tr><td>Delete</td><td>✗</td><td>✓</td><td>✓</td></tr><tr><td><strong>Server groups</strong></td><td></td><td></td><td></td></tr><tr><td>Add</td><td>✗</td><td>✓</td><td>✓</td></tr><tr><td>Change</td><td>✗</td><td>✓</td><td>✓</td></tr><tr><td>Delete</td><td>✗</td><td>✓</td><td>✓</td></tr><tr><td><strong>Policies</strong></td><td></td><td></td><td></td></tr><tr><td>Add</td><td>✗</td><td>✓</td><td>✓</td></tr><tr><td>Change</td><td>✗</td><td>✓</td><td>✓</td></tr><tr><td>Delete</td><td>✗</td><td>✓</td><td>✓</td></tr><tr><td>Change e-mail templates</td><td>✗</td><td>✓</td><td>✓</td></tr><tr><td>Change default e-mail template</td><td>✗</td><td>✓</td><td>✓</td></tr><tr><td><strong>Event log</strong></td><td></td><td></td><td></td></tr><tr><td>View</td><td>✗</td><td>✓</td><td>✓</td></tr><tr><td><strong>End users</strong></td><td></td><td></td><td></td></tr><tr><td>Change</td><td>✓</td><td>✓</td><td>✓</td></tr><tr><td><strong>Detections</strong></td><td></td><td></td><td></td></tr><tr><td>View</td><td>✓</td><td>✓</td><td>✓</td></tr></tbody></table><hr><h2 id="what-are-the-minimum-browser-requirements-for-the-patchman-portal" tabindex="-1"><a class="header-anchor" href="#what-are-the-minimum-browser-requirements-for-the-patchman-portal" aria-hidden="true">#</a> What are the minimum browser requirements for the Patchman Portal?</h2><p>In order to make optimal use of the Patchman Portal, the following minimum browser versions are required. Note that if you are using an unlisted browser or an older browser version, we cannot guarantee full Portal functionality.</p><table><thead><tr><th></th><th></th><th></th></tr></thead><tbody><tr><td><strong>Browser</strong></td><td><strong>Version</strong></td><td><strong>Date</strong></td></tr><tr><td>Chrome</td><td>58</td><td>Apr 2017</td></tr><tr><td>Firefox</td><td>54</td><td>Jun 2017</td></tr><tr><td>Edge</td><td>15</td><td>Aug 2016</td></tr><tr><td>Safari</td><td>10</td><td>Sep 2016</td></tr><tr><td>Opera</td><td>55</td><td>Aug 2017</td></tr></tbody></table><hr><h2 id="reporting-malware-to-patchman" tabindex="-1"><a class="header-anchor" href="#reporting-malware-to-patchman" aria-hidden="true">#</a> Reporting malware to Patchman</h2><p>You can report malicious files that the solution does not currently detect to Patchman in a variety of ways. By doing this, you&#39;re helping us protect your platform, but also those of other Patchman users through the concept of herd immunity; if only a single Patchman customer finds and reports a malicious file, it may end up (if valid) being quarantined / cleaned across all servers protected by Patchman.</p><div class="tip custom-block"><p class="custom-block-title"></p><p>Regardless of the submission method, malware will be thoroughly checked and tested before being added to our detection database (either as a file hash for exact matching, or as a dynamic signature in CLEAN).</p></div><p>Once it is, Patchman will be able to detect &amp; quarantine/clean said across your entire platform.</p><h3 id="how-to-report-a-malicious-file" tabindex="-1"><a class="header-anchor" href="#how-to-report-a-malicious-file" aria-hidden="true">#</a> How to report a malicious file</h3><h4 id="via-the-command-line-using-patchman-report" tabindex="-1"><a class="header-anchor" href="#via-the-command-line-using-patchman-report" aria-hidden="true">#</a> Via the command-line using patchman-report</h4><p>You can report malware to us directly on the command line on any server that has the Patchman agent installed. In order do do this, simply call the command &#39;patchman-report&#39; followed by the path to the malicious file:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>patchman-report /path/to/file.php
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="via-the-api" tabindex="-1"><a class="header-anchor" href="#via-the-api" aria-hidden="true">#</a> Via the API</h4><p>You can also report malware via the Patchman portal API, using the following endpoint. Note that this can also be used to submit malware via the browser: <a href="https://portal.patchman.co/api/v1/report/" target="_blank" rel="noopener noreferrer">https://portal.patchman.co/api/v1/report/</a></p><hr><h2 id="detection-states-and-actions" tabindex="-1"><a class="header-anchor" href="#detection-states-and-actions" aria-hidden="true">#</a> Detection states and actions</h2><p>In the Patchman Portal, every detection has their own state. The following states are defined:</p>`,23)),t("table",null,[e[19]||(e[19]=t("thead",null,[t("tr",null,[t("th",null,"State"),t("th",null,"Description")])],-1)),t("tbody",null,[e[12]||(e[12]=t("tr",null,[t("td",null,"UNRESOLVED"),t("td",null,"The detection is new or no action has been taken yet.")],-1)),e[13]||(e[13]=t("tr",null,[t("td",null,"RESOLVED"),t("td",null,"The detection has been resolved.")],-1)),e[14]||(e[14]=t("tr",null,[t("td",null,"BLOCKED"),t("td",null,"No automatically scheduled actions will be executed for this detection. (Manual actions will still be executed.)")],-1)),e[15]||(e[15]=t("tr",null,[t("td",null,"REVERTED"),t("td",null,"The detection was resolved, but the fix has been reverted putting the file back in its original state.")],-1)),e[16]||(e[16]=t("tr",null,[t("td",null,"RETRACTED"),t("td",null,"The detection has been resolved, because the file was changed (outside of Patchman) or has been removed. Most likely the end user has updated his CMS to a newer version.")],-1)),t("tr",null,[t("td",null,[e[9]||(e[9]=t("strong",null,"Exclusive to",-1)),e[10]||(e[10]=r()),n(o,{to:"/patchman/frequently_asked_questions/#what-is-patchman-clean-and-how-do-i-enable-configure-it"},{default:a(()=>e[8]||(e[8]=[r("Patchman CLEAN")])),_:1})]),e[11]||(e[11]=t("td",null,null,-1))]),e[17]||(e[17]=t("tr",null,[t("td",null,"PENDING CHANGE"),t("td",null,"Detection of malicious code occurred and clean scheduled, but pending review by Patchman.")],-1)),e[18]||(e[18]=t("tr",null,[t("td",null,"REQUIRES ATTENTION"),t("td",null,"Detection of malicious code occurred and clean scheduled, but unable to clean automatically. Review by website owner required.")],-1))])]),e[39]||(e[39]=t("p",null,"The following actions are available for detections:",-1)),t("table",null,[e[33]||(e[33]=t("thead",null,[t("tr",null,[t("th",null,"Action"),t("th",null,"Description")])],-1)),t("tbody",null,[e[24]||(e[24]=t("tr",null,[t("td",null,"Patch"),t("td",null,"Resolve the vulnerability by patching the file.")],-1)),e[25]||(e[25]=t("tr",null,[t("td",null,"Quarantine"),t("td",null,"Resolve the malware detection by moving it to quarantine.")],-1)),e[26]||(e[26]=t("tr",null,[t("td",null,"Delete"),t("td",null,[r("Resolve the malware detection by removing the file."),t("br"),t("br"),t("em",null,"NB! This action is permanent and cannot be reverted.")])],-1)),e[27]||(e[27]=t("tr",null,[t("td",null,"Undo patch"),t("td",null,"Revert the vulnerability fix by restoring the original file.")],-1)),e[28]||(e[28]=t("tr",null,[t("td",null,"Undo quarantine"),t("td",null,"Revert the malware by fix restoring the original file.")],-1)),e[29]||(e[29]=t("tr",null,[t("td",null,"Block"),t("td",null,"Block all automatically scheduled tasks of the detection.")],-1)),e[30]||(e[30]=t("tr",null,[t("td",null,"Unblock"),t("td",null,"Resume all automatically schedule tasks of the detection.")],-1)),t("tr",null,[t("td",null,[e[21]||(e[21]=t("strong",null,"Exclusive to",-1)),e[22]||(e[22]=r()),n(o,{to:"/patchman/frequently_asked_questions/#what-is-patchman-clean-and-how-do-i-enable-configure-it"},{default:a(()=>e[20]||(e[20]=[r("Patchman CLEAN")])),_:1})]),e[23]||(e[23]=t("td",null,null,-1))]),e[31]||(e[31]=t("tr",null,[t("td",null,"Clean"),t("td",null,"Remove detected malicious code from the file, leaving the file in place.")],-1)),e[32]||(e[32]=t("tr",null,[t("td",null,"Undo clean"),t("td",null,"Revert the removal of detected malicious code from the file.")],-1))])]),e[40]||(e[40]=t("hr",null,null,-1)),e[41]||(e[41]=t("h2",{id:"organization-identifier",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#organization-identifier","aria-hidden":"true"},"#"),r(" Organization identifier")],-1)),e[42]||(e[42]=t("p",null,"Every organization in the Portal has its own organization identifier. This identifier consists of a unique combination of letters (a-z), numbers (0-9), underscores (_) and hyphens (-). The maximum length of the identifier is 50 characters.",-1)),e[43]||(e[43]=t("p",null,[r("The organization identifier is automatically generated based on the name of your organization. You can check the generated identifier in your "),t("a",{href:"https://portal.patchman.co/user/organization/",target:"_blank",rel:"noopener noreferrer"},"organization profile"),r(" in the Portal. If you are not satisfied with the identifier that was generated for your organization, you can always update it in this view.")],-1)),e[44]||(e[44]=t("p",null,[t("img",{src:m,alt:""})],-1)),e[45]||(e[45]=t("p",null,"You are required to enter this identifier alongside your password and email address during the login process for the Patchman Portal. The identifier is also a part of your login URL. This enables you to bookmark the page, in order to avoid having to enter your organization identifier each time you want to log in.",-1)),t("p",null,[e[35]||(e[35]=r("If you did not receive an email containing your organization's identifier, or in case you lose the email and do not remember the identifier, please reach out to our ")),n(o,{to:"/patchman/getting-started/#contact-us"},{default:a(()=>e[34]||(e[34]=[r("support department")])),_:1}),e[36]||(e[36]=r(" for assistance."))]),e[46]||(e[46]=l('<hr><h2 id="status-page-subscriptions" tabindex="-1"><a class="header-anchor" href="#status-page-subscriptions" aria-hidden="true">#</a> Status page subscriptions</h2><p>Any incidents regarding the services of Patchman will be communicated through our <a href="http://status.patchman.co/" target="_blank" rel="noopener noreferrer">status page</a>. If you subscribe to our status page you will receive email notifications with updates about the status of our services, including information about planned maintenance.</p><p>The subscriptions to our status page can now be managed from the Portal. Each Portal user can subscribe to the notifications, and users with the &quot;owner&quot; role can manually add email addresses in the organization management page. Organization owners can also manage subscriptions by unsubscribing users.</p><p><strong>Subscribing as a user</strong></p><p>You can subscribe to our status page updates by going to your profile (under &quot;My account&quot;) and check or uncheck the &quot;Get notifications from the status page&quot; option. The notifications will be sent to the email address set in your profile. Please note that you will receive an email which contains instructions on how to confirm your subscription.</p><p><img src="'+p+'" alt=""></p><p><strong>Manual subscriptions</strong></p><p>Organization owners can manually add email addresses to receive updates of our status page. This enables users without a Portal account to receive our status page notifications. All subscriptions for an organization can be managed in the status page view, under the Company section of the Portal.</p><p>Please note that our subscription system checks for duplicate email addresses. If a user subscribed to the notifications, but his/her email address gets added manually as well, the updates will only be sent to that address once.</p><hr><h2 id="control-panel-user-level-equivalents" tabindex="-1"><a class="header-anchor" href="#control-panel-user-level-equivalents" aria-hidden="true">#</a> Control panel user level equivalents</h2><p>Patchman gathers some metadata from each end user of your servers to determine its permission level. This concerns the user level (e.g. reseller or admin) and the parent user (e.g. a reseller or admin user).</p><p>If a user acts on multiple user levels, e.g. reseller and user, or admin and reseller, Patchman considers the highest level the user level.</p><p>Patchman itself considers the following user levels:</p><table><thead><tr><th><strong>Patchman level</strong></th><th><strong>DirectAdmin equivalent</strong></th><th><strong>CPanel equivalent</strong></th><th><strong>Plesk equivalent</strong></th></tr></thead><tbody><tr><td>admin</td><td>admin</td><td>admin</td><td>admin</td></tr><tr><td>reseller</td><td>reseller</td><td>reseller</td><td>reseller</td></tr><tr><td>user</td><td>user</td><td>user</td><td>customer</td></tr></tbody></table>',16))])}const w=s(g,[["render",c],["__file","index.html.vue"]]);export{w as default};