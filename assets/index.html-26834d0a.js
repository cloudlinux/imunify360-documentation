import{_ as n,V as i,n as s,p as o,q as t,J as e,C as r,A as l,a7 as c}from"./framework-85f3efd9.js";const d={},u=c('<h1 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h1><p>Imunify360 is the security solution for Linux web servers based on machine learning technology which utilizes a multi-layer approach to provide total protection against any types of malicious attacks or abnormal behavior including distributed brute force attacks.</p><p>Imunify360 provides:</p><ul><li><p>Advanced firewall with cloud heuristics and artificial intelligence for detecting new threats and protecting all servers that run the software -  capable of defending against brute force attacks, DoS attacks, and port scans.</p></li><li><p>Intrusion Detection and Protection System -  comprehensive collection of “deny” policy rules for blocking all known attacks.</p></li><li><p>Malware Scanning - automatic scanning file systems for malware injection and cleaning up infected files.</p></li><li><p>Patch Management - rebootless Secure Kernel powered by KernelCare keeps the server secure by automatically patching kernels without having to reboot the server.</p></li><li><p>Website Reputation Monitoring - analyzing if web-site or IPs are blocked by any blacklists and notifying if they are.</p></li><li><p>Proactive Defense - Proactive Defense protects websites running PHP, against zero-day attacks by blocking potentially malicious executions automatically and with zero latency.</p></li></ul><p>If a user violates Imunify360 security rules (trying to enter a wrong password, etc.), then Imunify360 will automatically block the access to this user IP-address, adding the IP-address to the <span class="notranslate">Gray List</span>.</p>',5),h=t("span",{class:"notranslate"},"Gray List",-1),p=t("span",{class:"notranslate"},"Gray List",-1),f=t("p",null,[e("An administrator can remove any IP-address from the "),t("span",{class:"notranslate"},"Gray List"),e(" and add to the "),t("span",{class:"notranslate"},"White List"),e(" if needed. In this case, the user will not be blocked when attempting to violate Imunify360 security rules.")],-1);function y(m,g){const a=i("RouterLink");return s(),o("div",null,[u,t("p",null,[e("If, after that, a user will try to access the HTTP/S port (#80/443), he will see the "),r(a,{to:"/features/#captcha"},{default:l(()=>[e("CAPTCHA")]),_:1}),e(". After entering the CAPTCHA correctly, Imunify360 will remove that user from the "),h,e(". In a case of repeated violation, the IP address will be automatically added to the "),p,e(" again.")]),f])}const w=n(d,[["render",y],["__file","index.html.vue"]]);export{w as default};