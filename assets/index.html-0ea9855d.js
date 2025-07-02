import{_ as d,S as u,n as l,p as r,q as i,J as n,C as t,A as s,a2 as a}from"./framework-dff324c3.js";const c={};function m(v,e){const o=u("RouterLink");return l(),r("div",null,[e[9]||(e[9]=i("h1",{id:"stand-alone-version-of-imunifyav-non-panel-generic-panel-integration",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#stand-alone-version-of-imunifyav-non-panel-generic-panel-integration"},"#"),n(" Stand-alone version of ImunifyAV(+) (non-panel, generic panel integration)")],-1)),e[10]||(e[10]=i("p",null,"Below you can find the steps to install and run ImunifyAV(+), in stand-alone mode, or within any hosting panel.",-1)),e[11]||(e[11]=i("h4",{id:"requirements",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#requirements"},"#"),n(" Requirements")],-1)),e[12]||(e[12]=i("p",null,[i("strong",null,"Operating system")],-1)),i("ul",null,[i("li",null,[e[1]||(e[1]=n("The same list as ")),t(o,{to:"/imunifyav/#requirements"},{default:s(()=>e[0]||(e[0]=[n("here")])),_:1,__:[0]}),e[2]||(e[2]=n("."))])]),e[13]||(e[13]=a(`<h4 id="prerequisites" tabindex="-1"><a class="header-anchor" href="#prerequisites">#</a> Prerequisites</h4><ul><li>PHP with <code>proc_open</code> function enabled (remove it from the <code>disable_functions</code> list in <code>php.ini</code>)</li></ul><p>There are some basic steps to run ImunifyAV as a stand-alone application:</p><ol><li>Define a way to serve web-based UI</li><li>Provide ImunifyAV with an actual list of users in the system</li><li>Configure a user authentication process</li></ol><div class="warning custom-block"><p class="custom-block-title">Warning</p><p>Imunify Web-UI PHP code has to be executed under a non-root user which has access to <code>/var/run/defence360agent/non_root_simple_rpc.sock</code>. If it runs in CageFS, you&#39;ll need to configure it accordingly.</p></div><p>To allow non-root user in CageFS access to the socket, this workaround should be applied:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># create directory for moun-point
mkdir /imunify-ui-shared
# add symlink for user which belong to UI backend \`imunify-web\` in this example)
ln -s /var/run/defence360agent /imunify-ui-shared/imunify-web
# add symlink to cagefs skeleton
rm -f /usr/share/cagefs-skeleton/var/run/defence360agent
ln -s /imunify-ui-shared/imunify-web /usr/share/cagefs-skeleton/var/run/defence360agent
# add mount point to cagefs
echo &quot;%/imunify-ui-shared&quot; &gt;&gt; /etc/cagefs/cagefs.mp
# remount all
cagefsctl --remount-all
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="how-to-configure-imunifyav-ui" tabindex="-1"><a class="header-anchor" href="#how-to-configure-imunifyav-ui">#</a> How to configure ImunifyAV UI</h4><p>ImunifyAV UI is implemented as a single-page application (SPA) and requires a web server to serve it. It’s required to specify a path to the web server directory, where the ImunifyAV UI SPA application will be installed and served.</p><p>Example:</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>[paths]
ui_path = /var/www/vhosts/imav/imav.example-hosting.com/html/imav
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Ensure that the domain you are going to use for the ImunifyAV web-based UI refers to this path and that there are no other scripts or files under <code>ui_path</code>, as they might be overridden by ImunifyAV installation.</p><h4 id="how-to-provide-imunifyav-with-an-actual-list-of-users-optional" tabindex="-1"><a class="header-anchor" href="#how-to-provide-imunifyav-with-an-actual-list-of-users-optional">#</a> How to provide ImunifyAV with an actual list of users (optional)</h4><p>By default, ImunifyAV will use Linux system users, limited by <code>uid_min</code> and <code>uid_max</code> from <code>/etc/login.defs</code>.</p><p>If you want to see a specific list of users (note, that all of them must be real linux users accessible via PAM), you can specify the <code>users</code> option in <code>/etc/sysconfig/imunify360/integration.conf</code>:</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>[integration_scripts]
users = /path/to/get-users-script.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,16)),i("p",null,[e[4]||(e[4]=n("It should point to an executable file that generates a JSON file similar to the following (see details ")),t(o,{to:"/stand_alone_mode/#integration-config-file"},{default:s(()=>e[3]||(e[3]=[n("here")])),_:1,__:[3]}),e[5]||(e[5]=n("):"))]),e[14]||(e[14]=a(`<div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>{
  &quot;data&quot;: [
    {
      &quot;id&quot;: 1000,
      &quot;username&quot;: &quot;ins5yo3&quot;,
      &quot;owner&quot;: &quot;root&quot;,
      &quot;domain&quot;: &quot;ins5yo3.com&quot;,
      &quot;package&quot;: {
        &quot;name&quot;: &quot;package&quot;,
        &quot;owner&quot;: &quot;root&quot;
      },
      &quot;email&quot;: &quot;ins5yo3@ins5yo3.com&quot;,
      &quot;locale_code&quot;: &quot;EN_us&quot;
    },
    {
      &quot;id&quot;: 1001,
      &quot;username&quot;: &quot;ins5yo4&quot;,
      &quot;owner&quot;: &quot;root&quot;,
      &quot;domain&quot;: &quot;ins5yo4.com&quot;,
      &quot;package&quot;: {
        &quot;name&quot;: &quot;package&quot;,
        &quot;owner&quot;: &quot;root&quot;
      },
      &quot;email&quot;: &quot;ins5yo4@ins5yo4.com&quot;,
      &quot;locale_code&quot;: &quot;EN_us&quot;
    }
  ],
  &quot;metadata&quot;: {
    &quot;result&quot;: &quot;ok&quot;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="how-to-configure-authentication-for-imunifyav-optional" tabindex="-1"><a class="header-anchor" href="#how-to-configure-authentication-for-imunifyav-optional">#</a> How to configure authentication for ImunifyAV (optional)</h4><p>ImunifyAV can use PAM to authenticate users.</p><p>Once the UI is opened, the user sees a sign-in form. The credentials are checked via PAM.</p><p>You can specify which PAM service ImunifyAV should use with the <code>service_name</code> option:</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>[pam]
service_name = system-auth
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>If it is not specified, the “<code>system-auth</code>” service is used.</p><p>By default, <code>root</code> is considered to be the only &quot;admin&quot; user.</p><h4 id="how-to-define-administrators-for-imunifyav" tabindex="-1"><a class="header-anchor" href="#how-to-define-administrators-for-imunifyav">#</a> How to define administrators for ImunifyAV</h4><p>The administrators have full access to ImunifyAV UI and its settings.</p><p>By default, root is considered to be the only admin user.</p><p>To add more administrators, list them in the <code>/etc/sysconfig/imunify360/auth.admin</code> file or specify the admins option in the <code>/etc/sysconfig/imunify360/integration.conf</code>.</p><p>Admin users will be merged from three sources: <code>/etc/sysconfig/imunify360/auth.admin</code> list and scripts defined in the <code>/etc/sysconfig/imunify360/integration.conf</code> or <code>/opt/cpvendor/etc/integration.ini</code> that return user lists.</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>[integration_scripts]
admins = /path/to/get-admins-script.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>It should point to an executable file that generates a JSON file similar to the following:</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>{
  &quot;data&quot;: [
    {
      &quot;name&quot;: &quot;admin1&quot;,
      &quot;unix_user&quot;: &quot;admin&quot;,
      &quot;locale_code&quot;: &quot;EN_us&quot;,
      &quot;email&quot;: &quot;admin1@domain.zone&quot;,
      &quot;is_main&quot;: true
    },
	{
      &quot;name&quot;: &quot;admin2&quot;,
      &quot;unix_user&quot;: &quot;admin&quot;,
      &quot;locale_code&quot;: &quot;Ru_ru&quot;,
      &quot;email&quot;: &quot;admin2@domain.zone&quot;,
      &quot;is_main&quot;: false
    },
  ],
  &quot;metadata&quot;: {
    &quot;result&quot;: &quot;ok&quot;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="how-to-provide-a-list-of-domains-for-imunifyav-optional" tabindex="-1"><a class="header-anchor" href="#how-to-provide-a-list-of-domains-for-imunifyav-optional">#</a> How to provide a list of domains for ImunifyAV (optional)</h4><p>To provide a list of domains for ImunifyAV, specify the script that generates a JSON file in the <code>/etc/sysconfig/imunify360/integration.conf</code>:</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>[integration_scripts]
domains = /path/to/get-domains-script.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>A JSON file should be similar to the following:</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>{
  &quot;data&quot;: {
    &quot;example.com&quot;: {
      &quot;document_root&quot;: &quot;/home/username/public_html/&quot;,
      &quot;is_main&quot;: true,
      &quot;owner&quot;: &quot;username&quot;,
    },
    &quot;subdomain.example.com&quot;: {
      &quot;document_root&quot;: &quot;/home/username/public_html/subdomain/&quot;,
      &quot;is_main&quot;: false,
      &quot;owner&quot;: &quot;username&quot;,
    }
  },
  &quot;metadata&quot;: {
    &quot;result&quot;: &quot;ok&quot;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="how-to-install-imunifyav" tabindex="-1"><a class="header-anchor" href="#how-to-install-imunifyav">#</a> How to install ImunifyAV</h4><p>Now everything is ready to install ImunifyAV.</p>`,23)),i("p",null,[e[7]||(e[7]=n("The installation instructions are the same as for cPanel/DirectAdmin version, and can be found in the technical documentation: ")),t(o,{to:"/imunifyav/#installation-instructions"},{default:s(()=>e[6]||(e[6]=[n("https://docs.imunifyav.com/imunifyav/#installation-instructions")])),_:1,__:[6]}),e[8]||(e[8]=n("."))]),e[15]||(e[15]=a(`<h4 id="how-to-open-imunifyav-ui" tabindex="-1"><a class="header-anchor" href="#how-to-open-imunifyav-ui">#</a> How to open ImunifyAV UI</h4><p>Once ImunifyAV is installed, the web-based UI is available via the domain configured in <code>ui_path</code>.</p><p>For example, if <code>/var/www/vhosts/imav/imav.example-hosting.com/html/imav</code> is the document root folder for the imav.example-hosting.com domain, then you could open ImunifyAV with the following URL:</p><ul><li><code>https://imav.example-hosting.com/</code> (when you have TLS certificate configured for the domain) or</li><li><code>http://imav.example-hosting.com/</code></li></ul><h2 id="integration-config-file" tabindex="-1"><a class="header-anchor" href="#integration-config-file">#</a> Integration config file</h2><p>The documentation for the ImunifyAV stand-alone version integration configuration file format.</p><p><strong>Location</strong> <code>/etc/sysconfig/imunify360/integration.conf</code></p><p><strong>Parameters</strong></p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>[paths]
ui_path = /var/www/vhosts/imunifyAV/imunifyAV.hosting.example.com/html/imav
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>The path to the web server directory, where ImunifyAV will be installed and served by web server. Need to be defined before ImunifyAV installation.</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>[paths]
ui_path_owner = panel_user:web_server_group
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Allows executing <code>chown</code> to that owner for files after installation. The parameter is optional, if it is absent, <code>chown</code> doesn&#39;t execute.</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>[pam]
service_name = system-auth
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>The PAM service is used for user authentication in the ImunifyAV UI application. By default, the <code>system-auth</code> service is used.</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>[integration_scripts]
admins = /path/to/get-admins-script.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>The path to the executable script that generates a JSON file with the list of admin accounts.</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>{
  &quot;data&quot;: [
    {
      &quot;name&quot;: &quot;admin1&quot;,
      &quot;unix_user&quot;: &quot;admin&quot;,
      &quot;locale_code&quot;: &quot;EN_us&quot;,
      &quot;email&quot;: &quot;admin1@domain.zone&quot;,
      &quot;is_main&quot;: true
    },
	{
      &quot;name&quot;: &quot;admin2&quot;,
      &quot;unix_user&quot;: &quot;admin&quot;,
      &quot;locale_code&quot;: &quot;Ru_ru&quot;,
      &quot;email&quot;: &quot;admin2@domain.zone&quot;,
      &quot;is_main&quot;: false
    }
  ],
  &quot;metadata&quot;: {
    &quot;result&quot;: &quot;ok&quot;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>[integration_scripts]
users = /path/to/get-users-script.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>The script to provide the specific list of users used by ImunifyAV.</p><p>It should point to an executable file that generates a JSON file similar to the following (domains are optional):</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>{
  &quot;data&quot;: [
    {
      &quot;id&quot;: 1000,
      &quot;username&quot;: &quot;ins5yo3&quot;,
      &quot;owner&quot;: &quot;root&quot;,
      &quot;domain&quot;: &quot;ins5yo3.com&quot;,
      &quot;package&quot;: {
        &quot;name&quot;: &quot;package&quot;,
        &quot;owner&quot;: &quot;root&quot;
      },
      &quot;email&quot;: &quot;ins5yo3@ins5yo3.com&quot;,
      &quot;locale_code&quot;: &quot;EN_us&quot;
    },
    {
      &quot;id&quot;: 1001,
      &quot;username&quot;: &quot;ins5yo6&quot;,
      &quot;owner&quot;: &quot;root&quot;,
      &quot;domain&quot;: &quot;ins5yo6.com&quot;,
      &quot;package&quot;: {
        &quot;name&quot;: &quot;package&quot;,
        &quot;owner&quot;: &quot;root&quot;
      },
      &quot;email&quot;: &quot;ins5yo4@ins5yo6.com&quot;,
      &quot;locale_code&quot;: &quot;EN_us&quot;
    }
  ],
  &quot;metadata&quot;: {
    &quot;result&quot;: &quot;ok&quot;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="data-description" tabindex="-1"><a class="header-anchor" href="#data-description">#</a> Data description</h4><table><thead><tr><th></th><th></th><th></th></tr></thead><tbody><tr><td>Key</td><td>Nullable</td><td>Description</td></tr><tr><td><code>id</code></td><td><code>False</code></td><td>ID of the UNIX account in the system.</td></tr><tr><td><code>username</code></td><td><code>False</code></td><td>The name of the UNIX account in the system.</td></tr><tr><td><code>owner</code></td><td><code>True</code></td><td>The name of the account owner. The owner can be an administrator (in this case he should be included in the <code>admins()</code> output).</td></tr><tr><td><code>locale_code</code></td><td><code>True</code></td><td>The locale selected by a user.</td></tr><tr><td><code>email</code></td><td><code>True</code></td><td>Email of the account user. If there is no email, it should return null.</td></tr><tr><td><code>domain</code></td><td><code>True</code></td><td>The main domain of a user.</td></tr><tr><td><code>package</code></td><td><code>True</code></td><td>Information about the package to which a user belongs to. If the user doesn’t belong to any package, it should return null.</td></tr><tr><td><code>package.name</code></td><td><code>False</code></td><td>The name of the package to which a user belongs to.</td></tr><tr><td><code>package.owner</code></td><td><code>True</code></td><td>The owner of the package to which a user belongs to (administrator).</td></tr></tbody></table><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>[integration_sctipts]
domains = /path/to/get-domains-script.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>It should point to an executable file that generates a JSON file similar to the following</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>{
  &quot;data&quot;: {
    &quot;example.com&quot;: {
      &quot;document_root&quot;: &quot;/home/username/public_html/&quot;,
      &quot;is_main&quot;: true,
      &quot;owner&quot;: &quot;username&quot;
    },
    &quot;subdomain.example.com&quot;: {
      &quot;document_root&quot;: &quot;/home/username/public_html/subdomain/&quot;,
      &quot;is_main&quot;: false,
      &quot;owner&quot;: &quot;username&quot;
    }
  },
  &quot;metadata&quot;: {
    &quot;result&quot;: &quot;ok&quot;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,26))])}const b=d(c,[["render",m],["__file","index.html.vue"]]);export{b as default};
