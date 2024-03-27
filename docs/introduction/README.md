# Introduction


Imunify360 is the security solution for Linux web servers based on machine learning technology which utilizes a multi-layer approach to provide total protection against any types of malicious attacks or abnormal behavior including distributed brute force attacks.

Imunify360 provides:

 * Advanced firewall with cloud heuristics and artificial intelligence for detecting new threats and protecting all servers that run the software -  capable of defending against brute force attacks, DoS attacks.

 * Intrusion Detection and Protection System -  comprehensive collection of “deny” policy rules for blocking all known attacks.

 * Malware Scanning - automatic scanning file systems for malware injection and cleaning up infected files.

 * Patch Management - rebootless Secure Kernel powered by KernelCare keeps the server secure by automatically patching kernels without having to reboot the server.

 * Website Reputation Monitoring - analyzing if web-site or IPs are blocked by any blacklists and notifying if they are.

 * Proactive Defense - Proactive Defense protects websites running PHP, against zero-day attacks by blocking potentially malicious executions automatically and with zero latency.

If a user violates Imunify360 security rules (trying to enter a wrong password, etc.), then Imunify360 will automatically block the access to this user IP-address, adding the IP-address to the <span class="notranslate">Gray List</span>.

If, after that, a user will try to access the HTTP/S port (#80/443), he will see the [CAPTCHA](/features/#captcha). After entering the CAPTCHA correctly, Imunify360 will remove that user from the <span class="notranslate">Gray List</span>. In a case of repeated violation, the IP address will be automatically added to the <span class="notranslate">Gray List</span> again.

An administrator can remove any IP-address from the <span class="notranslate">Gray List</span> and add to the <span class="notranslate">White List</span> if needed. In this case, the user will not be blocked when attempting to violate Imunify360 security rules.
