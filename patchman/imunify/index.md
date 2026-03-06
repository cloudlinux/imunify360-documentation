# Migrating to new agent

[[TOC]]

## Overview

Patchman now offers enhanced malware scanning capabilities powered by Imunify360 technology. This migration is voluntary and provides advanced malware detection and cleanup capabilities while maintaining the familiar Patchman portal experience.

## What's New

- Enhanced malware detection and cleanup.
- Integration with Imunify360 scanning technology.
- Full retention of Patchman portal functionality.

## Important Migration Notes
- Migration is optional and not automatic.
- After migration, files cannot be restored from the Patchman quarantine.
- Imunify creates backups of all cleaned files.
- Patchman portal functionality remains unchanged.

## Migration Process

**Prerequisites**  

- SSH access to the server with root privileges.
- Active Patchman installation.

**Migration Steps**  

Download the Imunify deployment script:
```
wget https://repo.imunify360.cloudlinux.com/defence360/imav-deploy.sh -O imav-deploy.sh
```

Run the script:
```
bash imav-deploy.sh
```

**Post-Migration Verification**

After installation is complete, verify that:
- Server agent has been successfully upgraded.
- Patchman portal shows the correct server status.
- Scanning features are accessible through the control panel.

## Frequently Asked Questions

**Q: Do I have to migrate?**  
A: No, migration is entirely optional. You can continue using your current version of Patchman.

**Q: Will the Patchman portal experience change?**  
A: No, the Patchman portal interface and functionality remain exactly the same.

**Q: Can I migrate multiple servers at once?**  
A: No, the migration script must be run individually on each server.

**Q: What happens to my existing security settings?**  
A: Your current security configurations will be preserved while gaining access to enhanced scanning capabilities.

## Support

If you have questions or need assistance with the migration process, please contact Patchman support team.

